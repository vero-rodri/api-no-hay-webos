const passport = require('passport');
const createError = require('http-errors')
const User = require('../models/user.model');

module.exports.register = (req, res, next) => {
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        const user = new User(req.body)
        if (req.file) {
          user.avatarURL = req.file.secure_url;
        }
        return user.save()
      } else {
        throw createError(409, 'email already registered');
      }
    })
    .then(user => res.status(201).json(user))
    .catch(next)
}

module.exports.authenticate = (req, res, next) => {
  passport.authenticate('auth-local', (error, user, message) => {
    if ( error ) {
      next(error);
    }
    if ( !user ) {
      next(createError(401, message));
    } 
    else {
      req.login(user, (err) => {
        if (err) { return next(error)}
        return res.status(201).json(user)
      })
    }
  })(req, res, next)
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204, 'User logout correctly').json()
}

module.exports.detail = (req, res, next) => {
  User.findById(req.params.userId)
    .then(user => res.status(200).json(user))
    .catch(next)
}

module.exports.getSession = (req, res, next) => {
  User.findById(req.user.id)
    .then(user => res.status(200).json(user))
    .catch(next)
}
