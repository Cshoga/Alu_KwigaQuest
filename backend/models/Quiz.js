const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please provide a question'],
    trim: true
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: [true, 'Please provide the correct answer index'],
    min: 0
  },
  explanation: {
    type: String,
    trim: true
  },
  points: {
    type: Number,
    default: 10
  }
});

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a quiz title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['programming', 'networking', 'databases', 'web_dev', 'security', 'hardware']
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    default: 'beginner'
  },
  questions: [questionSchema],
  timeLimit: {
    type: Number, // in seconds
    default: 900 // 15 minutes
  },
  maxAttempts: {
    type: Number,
    default: 3
  },
  xpReward: {
    type: Number,
    default: 50
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  tags: [String]
}, {
  timestamps: true
});

// Index for better query performance
quizSchema.index({ category: 1, difficulty: 1, isPublished: 1 });

module.exports = mongoose.model('Quiz', quizSchema);
