export const sampleUsers = {
students: [
{ username: 'student1', password: 'pass123', classroom: 'P6A' },
{ username: 'student2', password: 'pass123', classroom: 'P6B' },
{ username: 'student3', password: 'pass123', classroom: 'P6A' }
],
teachers: [
{ username: 'teacher1', password: 'teach123', classes: ['P6A'] },
{ username: 'teacher2', password: 'teach123', classes: ['P6B'] }
],
admin: { username: 'admin', password: 'admin123' }
}


export const sampleLessons = [
{ id:1, title: 'Introduction to Fractions', description: 'Learn the basics of fractions and how to simplify them.' },
{ id:2, title: 'Human Body Systems', description: 'Understand major systems like digestive, nervous, etc.' },
{ id:3, title: 'African Geography', description: 'Explore regions, countries, lakes, and rivers of Africa.' }
]


export const sampleQuizzes = [
{ id:1, title: 'Computer parts Quiz', lessonId:1, questions: [ 'What is 1/2 + 3/4?', 'Simplify 8/16' ] },
{ id:2, title: 'Computer systems Quiz', lessonId:2, questions: [ 'Identify organs and match systems' ] }
]


export const sampleChallenges = [
{ id:1, title:'7-Day Learning Streak', description:'Log in and complete 1 activity daily' },
{ id:2, title:'Perfect Score Challenge', description:'Score 100% in 3 quizzes' }
]


export const sampleBadges = [
{ id:'badge_quiz_master', name:'Quiz Master', requirement:'Get average quiz score ≥90' },
{ id:'badge_persistent_learner', name:'Persistent Learner', requirement:'3 lessons completed' }
]
