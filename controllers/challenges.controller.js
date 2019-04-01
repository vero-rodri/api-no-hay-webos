const createError = require('http-errors');
const { Challenge, PunctualChallenge, PeriodicChallenge, ExpirationChallenge } = require('../models/challenge.model');
const UserChallenge = require('../models/userChallenge.model');
const Evidence = require('../models/evidence.model');

module.exports.list = (req, res, next) => {
  Challenge.find()
    .populate('usersChallenge')
    .then(challenges => res.status(200).json(challenges))
    .catch(next)
}

module.exports.create = (req, res, next) => {
  let challenge;
  switch ( req.body.type ) {
    case 'default': {
       challenge = new Challenge({...req.body, owner:req.user.id});
      break;
    }
    case 'punctual': {
      challenge = new PunctualChallenge({...req.body, owner:req.user.id});
      break;
    }
    case 'periodic': {
      challenge = new PeriodicChallenge({...req.body, owner:req.user.id});
      break;
    }
    case 'expiration': {
      challenge = new ExpirationChallenge({...req.body, owner:req.user.id});
      break;
    }
  }

  if (req.file) {
    challenge.photo = req.file.secure_url;
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


