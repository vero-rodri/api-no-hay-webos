const createError = require('http-errors')
const Evidence = require('../models/evidence.model')

module.exports.list = (req, res, next) => {
  console.log(req.params)
  Evidence.find({ userChallengeId: req.params.userChallengeId })
    .then(evidences => res.status(200).json(evidences))
    .catch(next)
}


// module.exports.detail = (req, res, next) => {
//   UserChallenge.findById(req.params.id)
//     .then(userChallenge => res.status(200).json(userChallenge))
//     .catch(next)
// }

// module.exports.createUserChallenge = (req, res, next) => {
//   const userChallenge = new UserChallenge({
//     challengeId: req.params.id,
//     userId: req.user.id
//   })

//   userChallenge.save()
//     .then( userChallenge => res.status(201).json(userChallenge))
//     .catch(next)
// }
