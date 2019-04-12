const createError = require('http-errors');
const UserChallenge = require('../models/userChallenge.model');
const User = require('../models/user.model')


module.exports.listFinished = (req, res, next) => {
  UserChallenge.find({isFinished: true})
    .populate('challengeId')
    .populate('userId')
    .populate('evidences')
    .then(userChallenges => {
      let userChallengesWithEvidences = userChallenges
        .filter(userChallenge => userChallenge.evidences.length)
      return res.status(200).json(userChallengesWithEvidences)
    })
    .catch(next)
}

module.exports.update = (req, res, next) => {
  UserChallenge.findByIdAndUpdate(req.params.id, { isFinished: req.body.isFinished })
    .then(() => res.status(204).json())
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  UserChallenge.findById(req.params.id)
    .populate('challengeId')
    .populate('evidences')
    .populate('owner')
    .populate('userId')
    .then(userChallenge => res.status(200).json(userChallenge))
    .catch(next)
}
  
const ObjectIdInArray = (objId, arr) => {
  let arrAux = arr.map(objId => JSON.stringify(objId))
  let objIdAux = JSON.stringify(objId);
  return (arrAux.includes(objIdAux))
}


module.exports.addToLikes = (req, res, next) => {
  console.log("add like userchallenge...")
  User.findById(req.user.id)
    .then(user => {
      if (!ObjectIdInArray(req.params.id, user.userChallengesLiked)) {
        console.log("no hay coincidencia en UC-likes....")
        user.userChallengesLiked.push(req.params.id);
      } else {
        throw createError(409, 'this user already did click like');
      }
      return user.save()
        .then(user => {
          return UserChallenge.findByIdAndUpdate(req.params.id, {
            $inc: {likes: 1}
            }, {new: true})
              .then(userChallenge => res.json({itemsLiked: user.userChallengesLiked, likes: userChallenge.likes}))
        })
    })
    .catch(next);
};


module.exports.removeFromLikes = (req, res, next) => {
  console.log("remove like userchallenge...")
  User.findById(req.user.id)
    .then(user => {
      if (ObjectIdInArray(req.params.id, user.userChallengesLiked)) {
        console.log("sí hay coincidencia en UC-likes....")
        user.userChallengesLiked = [...user.userChallengesLiked
          .filter(userChallenge => (JSON.stringify(userChallenge) != JSON.stringify(req.params.id)))]
      } else {
        throw createError(409, 'this user did not click like');   //ESTE ERROR LE HE PUESTO NUEVO, NO CAPTURADO EN EL FRONT..(PERO HARÏA FALTA?)
      }
      return user.save()
        .then(user => {
          return UserChallenge.findByIdAndUpdate(req.params.id, {
            $inc: {likes: -1}
            }, {new: true})
              .then(userChallenge => res.json({itemsLiked: user.userChallengesLiked, likes: userChallenge.likes}))
        })    
    })
    .catch(next)
};


module.exports.addToViews = (req, res, next) => {
  console.log("\n\nañadir +1 a las vistas...")
  UserChallenge.findByIdAndUpdate(req.params.id, {
    $inc: {views: 1}
    }, {new:true})
      .then(userChallenge => res.json(userChallenge))
      .catch(next)
}

module.exports.createUserChallengesByNotifications = (req, res, next) => {
  console.log("el req body lleva =>" , req.body)
  const {usersId, challengeId, message} = req.body;
  const promises = [];
  let userChallenge;

  UserChallenge.find({ challengeId: challengeId } )
    .then(userChallenges => {
      const usersIdInUserChallenges = userChallenges.map(userChallenge => userChallenge.userId);
      console.log ("con el challenge ", challengeId, " he encontrado los siguientes UC ", usersIdInUserChallenges);
        usersId.forEach(userId => {
          console.log ("el userId es ", userId)
          if (!ObjectIdInArray(userId, usersIdInUserChallenges)) {
            console.log(userId, " no incluido...guardo UC")
            userChallenge = new UserChallenge({
              sender: req.user.id,
              userId: userId,
              challengeId: challengeId,
              isPending: true,
              message: message
            });
            promises.push(userChallenge.save());
          } else {
            console.log(userId, " incluido....me lo salto!")
          }
        })
      })
    .catch(next);

  Promise.all(promises)
    .then(([...responses]) => res.status(201).json())
    .catch(next)
}


module.exports.listPendingBySession = (req, res, next) => {
  UserChallenge.find({ userId: req.user.id })
    .populate('sender')
    .populate('challengeId')
    .then(userChallenges => {
      // console.log("los userchLlenges pendientes son =>", userChallengesPending)
      return res.json(userChallenges.filter(userChallenge => userChallenge.isPending));
    })
    .catch(next);
}


module.exports.delete = (req, res, next) => {
  console.log("Eliminando UC...")
  UserChallenge.findByIdAndDelete(req.params.id)
    .then(userChallenge => res.status(204).json(userChallenge))
    .catch(next);
}

module.exports.accept = (req, res, next) => {
  UserChallenge.findByIdAndUpdate(req.params.id, { isPending: false })
    .then(userChallenge => res.status(200).json())
    .catch(next)
}

