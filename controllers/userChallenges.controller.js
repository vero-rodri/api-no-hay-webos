const createError = require('http-errors');
const UserChallenge = require('../models/userChallenge.model');
//const Evidence = require('../models/evidence.model');

module.exports.list = (req, res, next) => {
  console.log("ENTRO EN LIST");
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