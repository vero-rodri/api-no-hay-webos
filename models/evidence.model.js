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

evidenceSchema.index({location: '2dsphere'});


evidenceSchema.pre('save', function(next) {
  if (this.location.coordinates.length === 0) {
    this.location = undefined;
  }
  next();
});


const Evidence = mongoose.model('Evidence', evidenceSchema);

module.exports = Evidence;
