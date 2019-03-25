const mongoose = require('mongoose');
const constants = require('../constants')

mongoose.connect(constants.MONGODB_URI, {useNewUrlParser: true})
  .then(() => console.log('Successfully connected to no-hay-webos'))
  .catch((error => console.log(error)));