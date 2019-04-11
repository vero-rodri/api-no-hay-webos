const passport = require('passport');
const createError = require('http-errors')
const User = require('../models/user.model');
const UserChallenge = require('../models/userChallenge.model');
const { Challenge } = require('../models/challenge.model');


const ObjectIdInArray = (objId, arr) => {
  let arrAux = arr.map(objId => JSON.stringify(objId))
  let objIdAux = JSON.stringify(objId);
  return (arrAux.includes(objIdAux))
}


module.exports.listUsersEnabledForSending = (req, res, next) => {
  const p1 = User.find({});
  const p2 = UserChallenge.find({ challengeId: req.params.challengeId });

  Promise.all([p1, p2])
    .then(([users, userChallenges]) => {
      const listUsersEnabled = [];
      const usersIdInUserChallenges = userChallenges.map(userChallenge => userChallenge.userId);
      users.forEach(user => {
          //console.log ("el userId es ", userId)
        if ((!ObjectIdInArray(user.id, usersIdInUserChallenges)) && (JSON.stringify(user.id) !== JSON.stringify(req.user.id))) {
          listUsersEnabled.push(user);
        } 
      })
      return res.status(200).json(listUsersEnabled)
    })
    .catch(next);
}


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