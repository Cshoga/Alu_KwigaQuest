import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

function StudentDashboard() {
  const [lessons, setLessons] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchStudentData();
  }, []);

  const fetchStudentData = async () => {
    try {
      const [lessonsRes, quizzesRes, challengesRes] = await Promise.all([
        axios.get('/api/lessons'),
        axios.get('/api/quizzes'),
        axios.get('/api/challenges')
      ]);
      
      setLessons(lessonsRes.data.data);
      setQuizzes(quizzesRes.data.data);
      setChallenges(challengesRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <div className="user-stats">
          <div className="stat-card">
            <h3>Level</h3>
            <p className="stat-value">5</p>
          </div>
          <div className="stat-card">
            <h3>Points</h3>
            <p className="stat-value">1,250</p>
          </div>
          <div className="stat-card">
            <h3>Badges</h3>
            <p className="stat-value">8</p>
          </div>
        </div>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={activeTab === 'overview' ? 'tab-active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'lessons' ? 'tab-active' : ''}
          onClick={() => setActiveTab('lessons')}
        >
          Lessons
        </button>
        <button 
          className={activeTab === 'quizzes' ? 'tab-active' : ''}
          onClick={() => setActiveTab('quizzes')}
        >
          Quizzes
        </button>
        <button 
          className={activeTab === 'challenges' ? 'tab-active' : ''}
          onClick={() => setActiveTab('challenges')}
        >
          Challenges
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-grid">
            <div className="card">
              <h3>Recent Lessons</h3>
              {lessons.slice(0, 3).map(lesson => (
                <div key={lesson._id} className="lesson-item">
                  <h4>{lesson.title}</h4>
                  <span className={`difficulty ${lesson.difficulty}`}>
                    {lesson.difficulty}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="card">
              <h3>Available Quizzes</h3>
              {quizzes.slice(0, 3).map(quiz => (
                <div key={quiz._id} className="quiz-item">
                  <h4>{quiz.title}</h4>
                  <button className="btn-primary">Take Quiz</button>
                </div>
              ))}
            </div>
            
            <div className="card">
              <h3>Active Challenges</h3>
              {challenges.slice(0, 3).map(challenge => (
                <div key={challenge._id} className="challenge-item">
                  <h4>{challenge.title}</h4>
                  <p>Points: {challenge.points}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="lessons-grid">
            {lessons.map(lesson => (
              <div key={lesson._id} className="lesson-card">
                <h3>{lesson.title}</h3>
                <p>{lesson.subject}</p>
                <span className={`difficulty-badge ${lesson.difficulty}`}>
                  {lesson.difficulty}
                </span>
                <button className="btn-primary">Start Learning</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
