const mongoose = require('mongoose');
const constants = require('../constants.js');

const challengeSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  // location: {
  //   type: {
  //     type: String,
  //     default: 'Point'
  //   },
  //   coordinates: {
  //     type: [Number]
  //   }
  // },
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
  discriminatorKey: 'kind',
  timestamps: true,
  toJSON: (doc, ret) => {
    virtuals: true,
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});


const punctualChallengeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  }
}, {
  discriminatorKey: 'kind',
})

const periodicChallengeSchema = new mongoose.Schema({
  periodicity: {
    type: Number,
    required: true,
    maxlength: 30
  },
  duration : {
    type: Number,
    required: true,
    maxlength: 365
  }
}, {
  discriminatorKey: 'kind',
})

const expirationChallengeSchema = new mongoose.Schema({
  duration : {
    type: Number,
    required: true,
    maxlength: 365
  }
}, {
  discriminatorKey: 'kind',
})


challengeSchema.virtual('usersChallenge', {
  ref: 'UserChallenge',
  localField: '_id',
  foreignField: 'challengeId',
  justOne: false,
  options: { sort: { likes: -1, createdAt: -1}}
})

challengeSchema.index({location: '2dsphere'});


const Challenge = mongoose.model('Challenge', challengeSchema);
const PunctualChallenge = Challenge.discriminator('PunctualChallenge', punctualChallengeSchema);
const PeriodicChallenge = Challenge.discriminator('PeriodicChallenge', periodicChallengeSchema);
const ExpirationChallenge = Challenge.discriminator('ExpirationChallenge', expirationChallengeSchema);


module.exports = { Challenge, PunctualChallenge, PeriodicChallenge, ExpirationChallenge};
// module.exports = Challenge;