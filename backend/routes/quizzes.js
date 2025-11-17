const express = require('express');
const { protect } = require('../middleware/auth');
const Quiz = require('../models/Quiz');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    let quizzes;
    if (req.user.role === 'student') {
      quizzes = await Quiz.find({
        $or: [
          { class: req.user.class },
          { class: null }
        ]
      }).populate('teacher', 'name');
    } else {
      quizzes = await Quiz.find().populate('teacher', 'name');
    }
    
    res.json({
      status: 'success',
      results: quizzes.length,
      data: { quizzes }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
