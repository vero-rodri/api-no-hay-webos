const createError = require('http-errors')
const { Challenge, PunctualChallenge, PeriodicChallenge, ExpirationChallenge } = require('../models/challenge.model');
const UserChallenge = require('../models/userChallenge.model')

module.exports.list = (req, res, next) => {
  Challenge.find()
    .then(challenges => res.status(200).json(challenges))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  let challenge;
  switch ( req.body.type ) {
    case 'default': {
       challenge = new Challenge(req.body);
      break;
    }
    case 'punctual': {
      challenge = new PunctualChallenge(req.body);
      break;
    }
    case 'periodic': {
      challenge = new PeriodicChallenge(req.body);
      break;
    }
    case 'expiration': {
      challenge = new ExpirationChallenge(req.body);
      break;
    }
  }
  challenge.save()
    .then(challenge => res.status(201).json(challenge))
    .catch(next)
}

module.exports.detail = (req, res, next) => {
  Challenge.findById(req.params.id)
    .populate('usersChallenge')
    .then(challenge => res.status(200).json(challenge))
    .catch(next)
}

module.exports.createUserChallenge = (req, res, next) => {
  const userChallenge = new UserChallenge({
    challengeId: req.params.id,
    userId: req.user.id
  })

  userChallenge.save()
    .then( userChallenge => res.status(201).json(userChallenge))
    .catch(next)
}

module.exports.deleteUserChallenge = (req, res, next) => {
  UserChallenge.findOneAndDelete({challengeId: req.params.id, userId: req.body.userId })
    .then(() => res.status(204).json())
    .catch(next)
}
