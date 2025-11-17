const express = require('express');
const { protect, restrictTo } = require('../middleware/auth');
const User = require('../models/User');
const Class = require('../models/Class');

const router = express.Router();

// All routes protected and restricted to admin only
router.use(protect);
router.use(restrictTo('admin'));

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({
      status: 'success',
      results: users.length,
      data: { users }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create teacher account
router.post('/teachers', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const teacher = await User.create({
      name,
      email,
      password,
      role: 'teacher'
    });

    res.status(201).json({
      status: 'success',
      data: { teacher }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Create class
router.post('/classes', async (req, res) => {
  try {
    const { name, subject, teacherId } = req.body;
    
    // Generate unique join code
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const classObj = await Class.create({
      name,
      subject,
      teacher: teacherId,
      joinCode
    });

    res.status(201).json({
      status: 'success',
      data: { class: classObj }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all classes
router.get('/classes', async (req, res) => {
  try {
    const classes = await Class.find()
      .populate('teacher', 'name email')
      .populate('students', 'name email');
    
    res.json({
      status: 'success',
      results: classes.length,
      data: { classes }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get platform statistics
router.get('/stats', async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: 'student' });
    const totalTeachers = await User.countDocuments({ role: 'teacher' });
    const totalClasses = await Class.countDocuments();
    const totalLessons = await require('../models/Lesson').countDocuments();
    
    res.json({
      status: 'success',
      data: {
        stats: {
          totalStudents,
          totalTeachers,
          totalClasses,
          totalLessons
        }
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete user
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({
      status: 'success',
      message: 'User deleted successfully'
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
