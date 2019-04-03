const mongoose = require('mongoose');
const constants = require('../constants.js');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  nickName: {
    type: String,
    required: [true, 'user_required'],
    unique: [true, 'nickName_unique']
  },
  email: {
    type: String,
    required: [true, 'email_required'],
    unique: [true, 'email_unique'],
    match: constants.EMAIL_PATTERN
  },
  password: {
    type: String,
    required: [true, 'password_required'],
    match: constants.PASSWORD_PATTERN
  },
  avatarURL: {
    type: String,
    default: constants.DEFAULT_AVATAR
  },
  followed : {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  challengesLiked: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Challenge'
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.password;
    }
  }
});

UserSchema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) {
    next();
  } else {
    bcrypt.genSalt(constants.SALT_WORK_FACTOR)
    .then( salt => {
      return bcrypt.hash(user.password, salt)
      .then(hash => {
        user.password = hash;
        console.log('user password => ', user.password);
          next();
        })
    })
    .catch(next)
  }
})

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password)
}


const User = mongoose.model('User', UserSchema);

module.exports = User;