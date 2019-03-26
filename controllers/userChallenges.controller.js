const createError = require('http-errors');
const UserChallenge = require('../models/userChallenge.model');
const Evidence = require('../models/evidence.model');

module.exports.list = (req, res, next) => {
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

module.exports.createUserChallenge = (req, res, next) => {
  const userChallenge = new UserChallenge({
    challengeId: req.params.id,
    userId: req.user.id
  })

  userChallenge.save()
    .then( userChallenge => res.status(201).json(userChallenge))
    .catch(next)
}

module.exports.createEvidence = (req, res, next) => {
  const evidence = new Evidence({ ...req.body, userChallengeId: req.params.id });
  evidence.save()
    .then(evidence => res.status(201).json(evidence))
    .catch(next)
}
