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

  console.log("\n EN EL MIDDLEWERE LLEGA...", req.params)

  console.log("el usuario de session es", req.user.id)
  console.log("\n y el USERCHALLENGE...", req.params.userChallengeId);

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

  //console.log("\n y el id CHALLENGE:...", req.params.challengeId);
  
  
  Challenge.findById(req.params.challengeId)
  .then(challenge => {
    console.log(challenge.owner.toString())
    console.log(req.user.id.toString())
    console.log(challenge.owner.toString() == req.user.id.toString())
      if (challenge.owner.toString() === req.user.id) {
        console.log("el reto es del usuario logado")
        next();
      } else {
        next(createError(403));
      }
    })
    .catch(error => next(createError("cacaaaaaaaaaaa")))
}