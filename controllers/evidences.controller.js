const createError = require('http-errors')
const Evidence = require('../models/evidence.model')

module.exports.list = (req, res, next) => {
  Evidence.find({ userChallengeId: req.params.userChallengeId })
    .then(evidences => {
      console.log("las evidencias del controller son: ", evidences)
      res.status(200).json(evidences)
    })
    .catch(next)
}

module.exports.create = (req, res, next) => {
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
