const createError = require('http-errors');
const UserChallenge = require('../models/userChallenge.model');

module.exports.list = (req, res, next) => {
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

module.exports.detail = (req, res, next) => {
  UserChallenge.findById(req.params.id)
    .populate('challengeId')
    .populate('evidences')
    .populate('owner')
    .then(userChallenge => res.status(200).json(userChallenge))
    .catch(next)
}

