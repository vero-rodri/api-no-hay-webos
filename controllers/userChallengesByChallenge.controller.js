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
  console.log("user:", req.user.id);
  const userChallenge = new UserChallenge({
    challengeId: req.params.challengeId,
    userId: req.user.id
  })

  userChallenge.save()
    .then( userChallenge => res.status(201).json(userChallenge))
    .catch(next)
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

