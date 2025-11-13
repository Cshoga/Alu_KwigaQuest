const express = require('express');
const Quiz = require('../models/Quiz');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all quizzes (with filtering)
router.get('/', auth, async (req, res) => {
  try {
    const { category, difficulty, page = 1, limit = 10 } = req.query;
    
    const filter = { isPublished: true };
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    const quizzes = await Quiz.find(filter)
      .populate('createdBy', 'name')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Quiz.countDocuments(filter);

    res.json({
      success: true,
      data: {
        quizzes,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / limit)
        }
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get single quiz
router.get('/:id', auth, async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id)
      .populate('createdBy', 'name');
    
    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found'
      });
    }

    res.json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Create new quiz (Teachers only)
router.post('/', auth, async (req, res) => {
  try {
    if (req.user.role !== 'teacher' && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Only teachers can create quizzes'
      });
    }

    const quiz = await Quiz.create({
      ...req.body,
      createdBy: req.user.id
    });

    res.status(201).json({
      success: true,
      data: quiz
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
