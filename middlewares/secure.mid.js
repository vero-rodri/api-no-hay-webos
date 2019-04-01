const createError = require('http-errors');
const UserChallenge = require('../models/userChallenge.model');
const { Challenge } = require('../models/challenge.model');

module.exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    next(createError(403));
  }
}

module.exports.isOwner = (req, res, next) => {

  UserChallenge.findById(req.params.userChallengeId)
    .then(userChallenge => {
      console.log("y el user id => ", userChallenge.userId)
      if (userChallenge.userId == req.user.id) {
        next();
      } else {
        next(createError(403));
      }
    })
}

module.exports.canDelete = (req, res, next) => {

  Challenge.findById(req.params.challengeId)
  .then(challenge => {
    console.log(challenge.owner.toString())
    console.log(req.user.id.toString())
    console.log(challenge.owner.toString() == req.user.id.toString())
      if (challenge.owner.toString() === req.user.id) {
        next();
      } else {
        next(createError(403));
      }
    })
    .catch(error => next(createError("cacaaaaaaaaaaa")))
}