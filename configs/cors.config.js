const createError = require('http-errors');
const cors = require('cors');
const constants = require('../constants');

module.exports = cors({
  origin: (origin, next) => {
    const allowed = !origin || constants.ALLOWED_ORIGINS.indexOf(origin) !== -1;
    if (allowed) {
      next(null, allowed)
    } else {
      next(createError(401, 'not allowed by Cors'))
    }
  },
  credentials: true
})
