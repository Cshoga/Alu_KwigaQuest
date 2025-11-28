import React, { useState, useEffect } from 'react'
import Studentsidebar from '../components/Studentsidebar'
import Toast from '../components/Toast'
import { sampleLessons, sampleQuizzes, sampleChallenges, sampleBadges } from '../data/sampleData'

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  useEffect(() => {
    setTimeout(() => setLoading(false), 700)
  }, [])

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  if (loading) return (
    <div className="center-loading">
      <h2>Loading Dashboard...</h2>
    </div>
  )

  return (
    <div className={`dashboard-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-wrapper">
        {/* FIXED: Changed Sidebar to Studentsidebar and removed role prop */}
        <Studentsidebar collapsed={sidebarCollapsed} />
        <button 
          className="sidebar-toggle-btn"
          onClick={toggleSidebar}
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {sidebarCollapsed ? '➡️' : '⬅️'}
        </button>
      </div>

      <div className="dashboard-content">
        {toast && <Toast message={toast} />}

        <div className="dashboard-header">
          <h2 className="welcome-title">Welcome, Student 🎓</h2>
          <p className="welcome-subtitle">Continue your learning journey</p>
        </div>

        <div className="dashboard-grid">
          <section className="dashboard-section">
            <div className="section-header">
              <i className="fa fa-book section-icon"></i>
              <h3 className="section-title">Lessons</h3>
            </div>
            <div className="cards-grid">
              {sampleLessons.map(lesson => (
                <div className="card animated-card" key={lesson.id}>
                  <div className="card-header">
                    <h4 className="card-title">{lesson.title}</h4>
                    <div className="card-badge">New</div>
                  </div>
                  <p className="card-description">{lesson.description}</p>
                  <button
                    className="btn-primary shadow-hover"
                    onClick={() => setToast(`Starting lesson: ${lesson.title}`)}
                  >
                    Start Lesson
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <i className="fa fa-question-circle section-icon"></i>
              <h3 className="section-title">Quizzes</h3>
            </div>
            <div className="cards-grid">
              {sampleQuizzes.map(quiz => (
                <div className="card animated-card" key={quiz.id}>
                  <div className="card-header">
                    <h4 className="card-title">{quiz.title}</h4>
                    <div className="card-badge">Quiz</div>
                  </div>
                  <p className="card-description">{quiz.description}</p>
                  <button
                    className="btn-secondary shadow-hover"
                    onClick={() => setToast(`Taking quiz: ${quiz.title}`)}
                  >
                    Take Quiz
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <i className="fa fa-trophy section-icon"></i>
              <h3 className="section-title">Challenges</h3>
            </div>
            <div className="cards-grid">
              {sampleChallenges.map(challenge => (
                <div className="card animated-card" key={challenge.id}>
                  <div className="card-header">
                    <h4 className="card-title">{challenge.title}</h4>
                    <div className="progress-indicator">{challenge.progress}%</div>
                  </div>
                  <div className="progress-wrapper">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${challenge.progress}%` }}
                    ></div>
                  </div>
                  <button
                    className="btn-primary shadow-hover"
                    onClick={() => setToast(`Continuing challenge: ${challenge.title}`)}
                  >
                    Continue Challenge
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <i className="fa fa-medal section-icon"></i>
              <h3 className="section-title">Badges</h3>
            </div>
            <div className="badges-container">
              <div className="badges-grid">
                {sampleBadges.map(badge => (
                  <div
                    className={`badge-card animated-card ${badge.earned ? 'earned' : 'locked'}`}
                    key={badge.id}
                  >
                    <div className="badge-icon">
                      {badge.earned ? '🏆' : '🔒'}
                    </div>
                    <div className="badge-info">
                      <h5 className="badge-name">{badge.name}</h5>
                      <p className="badge-description">{badge.description}</p>
                      <span className="badge-status">
                        {badge.earned ? 'Earned' : 'Locked'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
