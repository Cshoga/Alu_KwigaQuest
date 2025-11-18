import React, { useState, useEffect } from 'react';
import { useAuth } from '../utils/AuthContext';
import '../styles/Dashboard.css';

const StudentDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('lessons');
  const [lessons, setLessons] = useState([]);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setLessons([
      { id: 1, title: 'Introduction to Computers', progress: 75, completed: false },
      { id: 2, title: 'Basic Coding Concepts', progress: 25, completed: false },
      { id: 3, title: 'Internet Safety', progress: 0, completed: false }
    ]);

    setBadges([
      { id: 1, name: 'Quick Learner', description: 'Complete 5 lessons', earned: true },
      { id: 2, name: 'ICT Explorer', description: 'Complete first ICT lesson', earned: true },
      { id: 3, name: 'Quiz Master', description: 'Score 100% on any quiz', earned: false }
    ]);
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>ICT Learning Platform</h1>
          <div className="user-info">
            <span>Welcome, {user?.username}!</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'lessons' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('lessons')}
          >
            📚 Lessons
          </button>
          <button 
            className={activeTab === 'badges' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('badges')}
          >
            🏆 Badges
          </button>
          <button 
            className={activeTab === 'progress' ? 'nav-btn active' : 'nav-btn'}
            onClick={() => setActiveTab('progress')}
          >
            📊 Progress
          </button>
        </nav>

        <main className="main-content">
          {activeTab === 'lessons' && (
            <div className="lessons-grid">
              {lessons.map(lesson => (
                <div key={lesson.id} className="lesson-card">
                  <h3>{lesson.title}</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                  <p>{lesson.progress}% Complete</p>
                  <button className="start-btn">
                    {lesson.progress > 0 ? 'Continue' : 'Start'} Lesson
                  </button>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'badges' && (
            <div className="badges-grid">
              {badges.map(badge => (
                <div key={badge.id} className={`badge-card ${badge.earned ? 'earned' : 'locked'}`}>
                  <div className="badge-icon">
                    {badge.earned ? '🏆' : '🔒'}
                  </div>
                  <h4>{badge.name}</h4>
                  <p>{badge.description}</p>
                  <span className="badge-status">
                    {badge.earned ? 'Earned!' : 'Locked'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="progress-section">
              <h3>Your Learning Progress</h3>
              <div className="progress-stats">
                <div className="stat-card">
                  <h4>Lessons Completed</h4>
                  <p className="stat-number">2/10</p>
                </div>
                <div className="stat-card">
                  <h4>Quizzes Passed</h4>
                  <p className="stat-number">5</p>
                </div>
                <div className="stat-card">
                  <h4>Badges Earned</h4>
                  <p className="stat-number">2</p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
