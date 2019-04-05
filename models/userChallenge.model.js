const mongoose = require('mongoose');
const Evidence = require('./evidence.model');

const userChallengeSchema = new mongoose.Schema({
  challengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Challenge'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isFinished: {
    type: Boolean,
    default: false
  },
  peopleChallenged: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User'
  },
  likes: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number]
    }
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform : (doc, ret) => {
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
    return ret;
    }
  }
});

userChallengeSchema.virtual('evidences', {
  ref: Evidence.modelName,
  localField: '_id',
  foreignField: 'userChallengeId',
  justOne: false,
  options: { sort: { createdAt: -1 }}
})

userChallengeSchema.index({userId: 1, challengeId: 1}, {unique: true});

const UserChallenge = mongoose.model('UserChallenge', userChallengeSchema);


module.exports = UserChallenge;