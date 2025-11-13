const mongoose = require('mongoose');

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a challenge title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a challenge description']
  },
  instructions: {
    type: String,
    required: [true, 'Please provide challenge instructions']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['programming', 'networking', 'databases', 'web_dev', 'security', 'hardware']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: true
  },
  xpReward: {
    type: Number,
    required: true
  },
  timeEstimate: {
    type: Number, // in minutes
    required: true
  },
  requirements: [String],
  resources: [{
    title: String,
    url: String,
    type: String // 'video', 'article', 'documentation'
  }],
  solutionTemplate: String, // For coding challenges
  testCases: [{
    input: String,
    expectedOutput: String,
    isHidden: {
      type: Boolean,
      default: false
    }
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Challenge', challengeSchema);
