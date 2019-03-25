const createError = require('http-errors')
const { Challenge } = require('../models/challenge.model');

module.exports.list = (req, res, next) => {
  Challenge.find()
    .then(challenges => res.status(200).json(challenges))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  const challenge = new Challenge(req.body);
  console.log('challenge =>', challenge)
  challenge.save()
    .then(challenge => res.status(201).json(challenge))
    .catch(next)
}