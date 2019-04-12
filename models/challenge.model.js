const mongoose = require('mongoose');
const constants = require('../constants.js');
const UserChallenge = require('./userChallenge.model')

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: [50, 'maxLength_excedeed']
  },
  photo: {
    type: String,
    required: [true, 'photo_required']
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
  //     default: "Point"
  //   },
  //   coordinates: {
  //     type: [Number]
  //   }
  // },
  likes: {
    type: Number,
    default: 0
  },
  views: {
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
  toJSON: {
    virtuals: true,
    transform: (doc, ret) => {
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
    return ret;
    }
  }
});


const punctualChallengeSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: [true, 'date_required']
  }
}, {
  discriminatorKey: 'kind',
})

const periodicChallengeSchema = new mongoose.Schema({
  periodicity: {
    type: Number,
    required: [true, 'periodicity_required'],
    maxlength: 30
  },
  duration : {
    type: Number,
    required: [true, 'duration_required'],
    maxlength: 365
  }
}, {
  discriminatorKey: 'kind',
})

const expirationChallengeSchema = new mongoose.Schema({
  duration : {
    type: Number,
    required: [true, 'duration_required'],
    maxlength: 365
  }
}, {
  discriminatorKey: 'kind',
})


challengeSchema.virtual('userChallenges', {
  ref: UserChallenge.modelName,
  localField: '_id',
  foreignField: 'challengeId',
  justOne: false,
  options: { sort: { likes: -1, createdAt: -1}}
})

// challengeSchema.index({location: '2dsphere'});


const Challenge = mongoose.model('Challenge', challengeSchema);
const PunctualChallenge = Challenge.discriminator('PunctualChallenge', punctualChallengeSchema);
const PeriodicChallenge = Challenge.discriminator('PeriodicChallenge', periodicChallengeSchema);
const ExpirationChallenge = Challenge.discriminator('ExpirationChallenge', expirationChallengeSchema);


module.exports = { Challenge, PunctualChallenge, PeriodicChallenge, ExpirationChallenge };
