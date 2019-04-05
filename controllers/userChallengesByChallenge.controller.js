const createError = require('http-errors');
const UserChallenge = require('../models/userChallenge.model');
const Evidence = require('../models/evidence.model');


module.exports.listByChallenge = (req, res, next) => {
  UserChallenge.find({ userId: req.user.id })
    .then(userChallenges => res.status(200).json(userChallenges))
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  UserChallenge.findById(req.params.id)
    .populate('evidences')
    .then(userChallenge => res.status(200).json(userChallenge))
    .catch(next)
}


module.exports.create = (req, res, next) => {
  const userChallenge = new UserChallenge({
    challengeId: req.params.challengeId,
    userId: req.user.id
  })

  userChallenge.save()
    .then( userChallenge => res.status(201).json(userChallenge))
    .catch(next)


  /* //ESTO ES UNA PRUEBA POSTERIOR PARA INTENTAR QUE UN MISMO USER SOLO PUEDA CREAR UN USERCHALLENGE....NO RULA (siempre userchallenge es null)
    UserChallenge.findOne({userId: req.userId, challengeId: req.params.challengeId})
    .then(userChallenge => {
      console.log("el UC encontrado al intentar crear uno nuevo es ", userChallenge)
      if (userChallenge) {
        throw createError(409, "you have already a userchallenge for this challenge")  //HAY QUE COGER ESTE ERRO EN EL FRONT....
      } else {
        const newUserChallenge = new UserChallenge({
          challengeId: req.params.challengeId,
          userId: req.user.id
        })
        return newUserChallenge.save()
          .then( userChallenge => res.status(201).json(userChallenge))
        }
      })
    .catch(next) */
}

module.exports.delete = (req, res, next) => {
  console.log("challenge ", req.params.challengeId);
  console.log("el user-challenge ", req.params.id);
  UserChallenge.findByIdAndDelete(req.params.id)
    .then(userChallenge => {
      console.log("el userChallenge es ", userChallenge)
      return Evidence.deleteMany({userChallengeId: userChallenge.id})
        .then(() => res.status(204).json())
    })
    .catch(next)
}

