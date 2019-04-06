const createError = require('http-errors');
const { Challenge, PunctualChallenge, PeriodicChallenge, ExpirationChallenge } = require('../models/challenge.model');
const UserChallenge = require('../models/userChallenge.model');
const Evidence = require('../models/evidence.model');
const User = require('../models/user.model.js');

module.exports.list = (req, res, next) => {
  Challenge.find()
    .populate('owner')
    .populate('usersChallenge')
    .then(challenges => res.status(200).json(challenges))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  let challenge;
  switch ( req.body.type ) {
    case 'default': {
       challenge = new Challenge({...req.body, owner:req.user.id});
      break;
    }
    case 'punctual': {
      challenge = new PunctualChallenge({...req.body, owner:req.user.id});
      break;
    }
    case 'periodic': {
      challenge = new PeriodicChallenge({...req.body, owner:req.user.id});
      break;
    }
    case 'expiration': {
      challenge = new ExpirationChallenge({...req.body, owner:req.user.id});
      break;
    }
  }

  if (req.file) {
    challenge.photo = req.file.secure_url;
  }

  challenge.save()
    .then(challenge => res.status(201).json(challenge))
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Challenge.findById(req.params.id)
    .populate('usersChallenge')
    .populate('owner')
    .then(challenge => res.status(200).json(challenge))
    .catch(next)
}

const ObjectIdInArray = (objId, arr) => {
  let arrAux = arr.map(objId => JSON.stringify(objId))
  let objIdAux = JSON.stringify(objId);
  return (arrAux.includes(objIdAux))
}


module.exports.addToLikes = (req, res, next) => {
  console.log("lo que VIENE EN EL PARAMS ES", req.params);

  User.findByIdAndUpdate(req.user.id, {
    $addToSet: { challengesLiked: req.params.id }
  })
    .then(user => {
     // console.log("usuario del que queremos AÑADIR un like", user)
      if (ObjectIdInArray(req.params.id, user.challengesLiked)) { 
        throw createError(409, 'this user already did click like');
      } else {
        return Challenge.findByIdAndUpdate(req.params.id, {
          $inc: {likes: 1}
          }, {new: true})
            .then((challenge) => { 
              console.log("\nGHALLENGE DEVUELTO (al añadirrr like)", challenge)
              return res.json(challenge)
            }
            )
      }
    })
    .catch(next);
};


module.exports.removeFromLikes = (req, res, next) => {
  console.log("lo que VIENE EN EL PARAMS ES", req.params)
  User.findByIdAndUpdate(req.user.id, {
    $pull: { challengesLiked: req.params.id }
  })
    .then(user => {
      console.log("usuario del que queremos queitar un like", user)
      if (ObjectIdInArray(req.params.id, user.challengesLiked)) { 
      //if (user.challengesLiked.includes(req.params.id)) {
        Challenge.findByIdAndUpdate(req.params.id, {
          $inc: {likes: -1}
          }, {new: true})
            .then((challenge) => {
              console.log("\nCHALLENGE DEVUELTO (al eliminar like)", challenge)
              return res.json(challenge)
            })
      } else {
        throw createError(409, 'this user did not click like');   //ESTE ERROR LE HE PUESTO NUEVO, NO CAPTURADO EN EL FRONT..(PERO HARÏA FALTA?)
      }
    })
    .catch(next);
};

module.exports.addToViews = (req, res, next) => {
  Challenge.findByIdAndUpdate(req.params.id, {
    $inc: {views: 1}
    }, {new:true})
      .then(challenge => {
        console.log("el challenge devuelto al add VIEW", challenge)
        res.status(204).json(challenge)})
      .catch(next)
}





module.exports.addChallengeToFav = (req, res, next) => {
  console.log("lo que VIENE EN EL PARAMS ES", req.params);

  User.findByIdAndUpdate(req.user.id, {
  //User.findByIdAndUpdate(req.params.userId, {
    $push: { favorites: req.params.articleId }
  })
    .then(user => {
      //res.send(user);

      console.log("\nmeto en favoritos!!\n")
      next()
      //res.redirect(`/articles/${req.params.articleId}`);
    })
    .catch(err => next(err));

  /* User.findById(req.params.userId)
    .then(user => {
      console.log("LOS FAVORITOS ANTES DE INSERTAR SON...", user.favorites)
      if (!user.favorites.includes(req.params.articleId)) {
          user.favorites.push(req.params.articleId);
          console.log("LOS FAVORITOS DESPUESSSS DE INSERTAR SON...", user.favorites)
          return user.save()
            .then(user => {
              res.redirect('/articles/search');
            })
      } else {
        res.redirect('/articles/search');
      }
    })
    .catch(err => next(err)) */
};

module.exports.removeChallengeFromFav = (req, res, next) => {
  //console.log("lo que VIENE EN EL PARAMS ES", req.params)
  User.findByIdAndUpdate(req.user.id, {
  //User.findByIdAndUpdate(req.params.userId, {
    $pull: { favorites: req.params.articleId }
  })
    .then(user => {
      //res.send("yeahh");
      console.log("\nEXTRAIGO DE FAVORITOS\n")
      next()
      //let favorites = user.favorites;
      //res.redirect(`/users/favorites`);
    })
    .catch(err => next(err));
};



