const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
  userChallengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserChallenge'
  },
  title: {
    type: String,
    required: [true, 'title_required']
  },
  description: {
    type: String
  },
  file: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});


const Evidence = mongoose.model('Evidence', evidenceSchema);

module.exports = Evidence;
