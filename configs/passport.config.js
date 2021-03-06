const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model')

passport.serializeUser(function(user, next) {
  next(null, user.id);
});

passport.deserializeUser(function(id, next) {
  User.findById(id, function(err, user) {
    next(err, user);
  });
});


passport.use('auth-local', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  function(email, password, next) {
    User.findOne({ email: email }, function (err, user) {
      if (err) { return next(err); }
      if (!user) { return next(null, false, { message: 'non_existent_email'}); }
      if (!user.checkPassword(password)) { return next(null, false, { message: 'invalid_password'}); }
      return next(null, user);
    });
  }
));