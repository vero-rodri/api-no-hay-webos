require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const session = require('./configs/session.config');
const cors = require('./configs/cors.config');

require('./configs/passport.config');
require('./configs/db.config');

const authRouter = require('./routes/auth.route');
const userRouter = require('./routes/user.route');
const challengeRouter = require('./routes/challenge.route');
const userChallengeRouter = require('./routes/userChallenge.route')
const userChallengeByChallengeRouter = require('./routes/userChallengeByChallenge.route');
const evidenceRouter = require('./routes/evidence.route');
const emailRouter = require('./routes/email.route');


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors);

app.use(session);
app.use(passport.initialize());
app.use(passport.session());

app.use('/user-challenges', userChallengeRouter);
app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/challenges', challengeRouter);
app.use('/challenges', userChallengeByChallengeRouter);
app.use('/user-challenges', userChallengeRouter);
app.use('/user-challenges', evidenceRouter);
app.use('/emails', emailRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message: err.message, error: err});
});

module.exports = app;
