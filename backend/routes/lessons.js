const express = require('express');
const { protect } = require('../middleware/auth');
const Lesson = require('../models/Lesson');

const router = express.Router();

// Get all lessons (public, but protected)
router.get('/', protect, async (req, res) => {
  try {
    let lessons;
    if (req.user.role === 'student') {
      lessons = await Lesson.find({
        $or: [
          { class: req.user.class },
          { class: null }
        ]
      }).populate('teacher', 'name');
    } else {
      lessons = await Lesson.find().populate('teacher', 'name');
    }
    
    res.json({
      status: 'success',
      results: lessons.length,
      data: { lessons }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get single lesson
router.get('/:id', protect, async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id)
      .populate('teacher', 'name')
      .populate('class', 'name');
    
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found' });
    }

    res.json({
      status: 'success',
      data: { lesson }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
