const express = require('express');
const { protect } = require('../middleware/auth');
const Challenge = require('../models/Challenge');

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    let challenges;
    if (req.user.role === 'student') {
      challenges = await Challenge.find({
        $or: [
          { class: req.user.class },
          { class: null }
        ]
      }).populate('teacher', 'name');
    } else {
      challenges = await Challenge.find().populate('teacher', 'name');
    }
    
    res.json({
      status: 'success',
      results: challenges.length,
      data: { challenges }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
