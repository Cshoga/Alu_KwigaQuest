const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');
const Challenge = require('../models/Challenge');
const User = require('../models/User');

const router = express.Router();

router.use(protect);
router.use(restrictTo('student'));

// Get available lessons
router.get('/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.find({
      $or: [
        { class: req.user.class },
        { class: null } // General lessons
      ]
    }).populate('teacher', 'name');
    
    res.json({
      status: 'success',
      results: lessons.length,
      data: { lessons }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get available quizzes
router.get('/quizzes', async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      $or: [
        { class: req.user.class },
        { class: null }
      ]
    }).populate('teacher', 'name');
    
    res.json({
      status: 'success',
      results: quizzes.length,
      data: { quizzes }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get available challenges
router.get('/challenges', async (req, res) => {
  try {
    const challenges = await Challenge.find({
      $or: [
        { class: req.user.class },
        { class: null }
      ]
    }).populate('teacher', 'name');
    
    res.json({
      status: 'success',
      results: challenges.length,
      data: { challenges }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Submit challenge
router.post('/challenges/:id/submit', async (req, res) => {
  try {
    const { submission } = req.body;
    const challenge = await Challenge.findById(req.params.id);
    
    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if already submitted
    const existingSubmission = challenge.submissions.find(
      sub => sub.student.toString() === req.user._id.toString()
    );

    if (existingSubmission) {
      return res.status(400).json({ message: 'Already submitted this challenge' });
    }

    challenge.submissions.push({
      student: req.user._id,
      submission,
      submittedAt: new Date()
    });

    await challenge.save();

    res.status(201).json({
      status: 'success',
      message: 'Challenge submitted successfully'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get student progress
router.get('/progress', async (req, res) => {
  try {
    const student = await User.findById(req.user._id)
      .select('points level badges')
      .populate('class', 'name');
    
    res.json({
      status: 'success',
      data: { progress: student }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
