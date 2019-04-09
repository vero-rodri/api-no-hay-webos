const passport = require('passport');
const createError = require('http-errors')
const User = require('../models/user.model');
const UserChallenge = require('../models/userChallenge.model');
const { Challenge } = require('../models/challenge.model')



module.exports.listUserChallengesByUser = (req, res, next) => {
  console.log("entro en el uC by user con", req.params.userId);
  UserChallenge.find({ userId: req.params.userId })
  .populate('challengeId')
  .populate('evidences')
  .populate('userId')
    .then(userChallenges => res.status(200).json(userChallenges))
    .catch(next)
}

module.exports.listChallengesByUser = (req, res, next) => {
  console.log("entro en el challenge by user con", req.params.userId);
  Challenge.find({ owner: req.params.userId })
    .populate('owner')
    .then(challenges => res.status(200).json(challenges))
    .catch(next)
}