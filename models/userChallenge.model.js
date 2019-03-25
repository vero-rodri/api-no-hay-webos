const mongoose = require('mongoose');

const userChallengeSchema = new mongoose.model({
  chanllengeId: {
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

userChallengeSchema.virtual('evidences', {
  ref:'Evidence',
  localField: '_id',
  foreignField: 'userChallengeId',
  justOne: false,
  options: { sort: { createdtAt: -1 }}
})

userChallengeSchema.index({userId: 1});

const UserChallenge = mongoose.model('UserChallenge', userChallengeSchema);

module.exports = UserChallenge;