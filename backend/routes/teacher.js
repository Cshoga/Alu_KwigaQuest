const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Challenge = require('../models/Challenge');
const Class = require('../models/Class');
const User = require('../models/User');

const router = express.Router();

router.use(protect);
router.use(restrictTo('teacher'));

// Get teacher's classes
router.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find({ teacher: req.user._id })
      .populate('students', 'name email points level');
    
    res.json({
      status: 'success',
      results: classes.length,
      data: { classes }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create lesson
router.post('/lessons', async (req, res) => {
  try {
    const lesson = await Lesson.create({
      ...req.body,
      teacher: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: { lesson }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get teacher's lessons
router.get('/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.find({ teacher: req.user._id })
      .populate('class', 'name');
    
    res.json({
      status: 'success',
      results: lessons.length,
      data: { lessons }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create quiz
router.post('/quizzes', async (req, res) => {
  try {
    const quiz = await Quiz.create({
      ...req.body,
      teacher: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: { quiz }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create challenge
router.post('/challenges', async (req, res) => {
  try {
    const challenge = await Challenge.create({
      ...req.body,
      teacher: req.user._id
    });

    res.status(201).json({
      status: 'success',
      data: { challenge }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get challenge submissions
router.get('/challenges/:id/submissions', async (req, res) => {
  try {
    const challenge = await Challenge.findById(req.params.id)
      .populate('submissions.student', 'name email');
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    res.json({
      status: 'success',
      data: { submissions: challenge.submissions }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Evaluate challenge submission
router.patch('/challenges/:challengeId/submissions/:submissionId', async (req, res) => {
  try {
    const { status, feedback } = req.body;
    const challenge = await Challenge.findById(req.params.challengeId);
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    const submission = challenge.submissions.id(req.params.submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }

    submission.status = status;
    submission.feedback = feedback;

    // If approved, award points and badge
    if (status === 'approved') {
      const student = await User.findById(submission.student);
      student.points += challenge.points;
      
      if (challenge.badgeReward) {
        student.badges.push({
          name: challenge.badgeReward.name,
          description: challenge.badgeReward.description,
          earnedAt: new Date()
        });
      }
      
      await student.save();
    }

    await challenge.save();

    res.json({
      status: 'success',
      data: { submission }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
