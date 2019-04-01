const createError = require('http-errors')
const Evidence = require('../models/evidence.model')

module.exports.list = (req, res, next) => {
  Evidence.find({ userChallengeId: req.params.userChallengeId })
    .then(evidences => res.status(200).json(evidences))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  console.log('entro en el controller de EvidenceCreate')
  const evidence = new Evidence({ ...req.body, userChallengeId: req.params.userChallengeId });
  if (req.file) {
    evidence.file = req.file.secure_url;
  }
  evidence.save()
    .then(evidence => res.status(201).json(evidence))
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  Evidence.findByIdAndDelete(req.params.id)
    .then(() => res.status(204).json())
    .catch(next);
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
