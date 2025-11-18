const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT CHECK(role IN ('admin', 'teacher', 'student')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Classes table
  db.run(`CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    teacher_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(teacher_id) REFERENCES users(id)
  )`);

  // Students table (class assignments)
  db.run(`CREATE TABLE IF NOT EXISTS student_classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    class_id INTEGER,
    FOREIGN KEY(student_id) REFERENCES users(id),
    FOREIGN KEY(class_id) REFERENCES classes(id)
  )`);

  // Lessons table
  db.run(`CREATE TABLE IF NOT EXISTS lessons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    teacher_id INTEGER,
    class_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(teacher_id) REFERENCES users(id),
    FOREIGN KEY(class_id) REFERENCES classes(id)
  )`);

  // Quizzes table
  db.run(`CREATE TABLE IF NOT EXISTS quizzes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    questions TEXT, -- JSON string of questions
    lesson_id INTEGER,
    teacher_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(lesson_id) REFERENCES lessons(id),
    FOREIGN KEY(teacher_id) REFERENCES users(id)
  )`);

  // Badges table
  db.run(`CREATE TABLE IF NOT EXISTS badges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    description TEXT,
    image_url TEXT,
    criteria TEXT
  )`);

  // Student badges table
  db.run(`CREATE TABLE IF NOT EXISTS student_badges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    badge_id INTEGER,
    earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES users(id),
    FOREIGN KEY(badge_id) REFERENCES badges(id)
  )`);

  // Student progress table
  db.run(`CREATE TABLE IF NOT EXISTS student_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    lesson_id INTEGER,
    quiz_id INTEGER,
    score INTEGER,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(student_id) REFERENCES users(id),
    FOREIGN KEY(lesson_id) REFERENCES lessons(id),
    FOREIGN KEY(quiz_id) REFERENCES quizzes(id)
  )`);

  // Insert default badges
  const defaultBadges = [
    ['Quick Learner', 'Complete 5 lessons', '/badges/quick-learner.png', 'complete_5_lessons'],
    ['Quiz Master', 'Score 100% on any quiz', '/badges/quiz-master.png', 'perfect_quiz_score'],
    ['ICT Explorer', 'Complete first ICT lesson', '/badges/explorer.png', 'first_lesson_complete'],
    ['Coding Star', 'Complete coding challenges', '/badges/coding-star.png', 'complete_coding_challenges']
  ];

  const insertBadge = db.prepare("INSERT OR IGNORE INTO badges (name, description, image_url, criteria) VALUES (?, ?, ?, ?)");
  defaultBadges.forEach(badge => {
    insertBadge.run(badge);
  });
  insertBadge.finalize();
});

module.exports = db;
