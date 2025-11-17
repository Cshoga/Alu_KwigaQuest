const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.js'));
app.use('/api/admin', require('./routes/admin.js'));
app.use('/api/teacher', require('./routes/teacher.js'));
app.use('/api/student', require('./routes/student.js'));
app.use('/api/lessons', require('./routes/lessons.js'));
app.use('/api/quizzes', require('./routes/quizzes.js'));
app.use('/api/challenges', require('./routes/challenges.js'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/kwigaquest', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
