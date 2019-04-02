const createError = require('http-errors');
const UserChallenge = require('../models/userChallenge.model');
//const Evidence = require('../models/evidence.model');

module.exports.list = (req, res, next) => {
  console.log("ENTRO EN LIST");
  UserChallenge.find({isFinished: true})
    .populate('challengeId')
    .populate('userId')
    .populate('evidences')
    .then(userChallenges => res.status(200).json(userChallenges))
    .catch(next)
}

