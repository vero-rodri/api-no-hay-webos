const mongoose = require('mongoose');
const constants = require('../constants.js');

const UserSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: constants.EMAIL_PATTERN
  },
  password: {
    type: String,
    required: true,
    match: constants.PASSWORD_PATTERN
  },
  avatarURL: {
    type: String,
    default: constants.DEFAULT_AVATAR
  },
  followed : {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete password;
    }
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;