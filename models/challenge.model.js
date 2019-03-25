const mongoose = require('mongoose');
const constants = require('../constants.js');

const chanllengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: 50,
  },
  photo: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.type.ObjectId,
    ref: 'User'
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  },
  likes: {
    type: Number,
    default: 0
  },
  isPrivate: {
    type: Boolean,
    default: false
  },
  categories: {
    type: String,
    enum: constants.CATEGORIES_CHALLENGE
  }
}, {
  timestamps: true,
  toJSON: (doc, ret) => {
    virtuals: true,
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

challengeSchema.virtual('usersChallenge', {
  ref: 'UserChallenge',
  localField: '_id',
  foreignField: 'challengeId',
  justOne: false,
  options: { sort: { likes: -1, createdAt: -1}}
})

challengeSchema.index({location: '2dsphere'});

const Challenge = mongoose.model('Challenge', chanllengeSchema);

module.exports = Challenge;