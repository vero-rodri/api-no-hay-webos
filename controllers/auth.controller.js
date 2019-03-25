const express = require('express');
const createError = require('http-errors')
const User = require('../models/user.model');

module.exports.register = (req, res, next) => {
  res.send('entra a register');
  User.findOne({email: req.body.email})
    .then(user => {
      if (!user) {
        const user = new User(req.body)
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
      res.status(201).json(user);
    }
  })
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.status(204, 'User logout correctly')
}
