const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
  userChallengeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserChallenge'
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  file: {
    type: String,
    required: true
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
});

evidenceSchema.index({location: '2dsphere'});

const Evidence = mongoose.model('Evidence', evidenceSchema);

module.exports = Evidence;
