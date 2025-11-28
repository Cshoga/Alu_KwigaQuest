import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Toast from '../components/Toast'
import { sampleLessons, sampleQuizzes, sampleChallenges, sampleBadges } from '../data/sampleData'

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  const [openSection, setOpenSection] = useState({
    lessons: true,
    quizzes: true,
    challenges: true,
    badges: true,
  })

  const toggle = (key) => {
    setOpenSection(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 700)
  }, [])

  if (loading) return (
    <div className="center-loading">
      <h2>Loading Dashboard...</h2>
    </div>
  )

  return (
    <div className={`dashboard-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="sidebar-wrapper">
        <Sidebar role="Student" collapsed={sidebarCollapsed} />
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

        <h2 className="welcome-title">Welcome, Student 🎓</h2>
        
        <section className="dashboard-section">
          <h3 className="section-title collapsible" onClick={() => toggle('lessons')}>
            <i className="fa fa-book"></i> Lessons
            <span className="arrow">{openSection.lessons ? "▲" : "▼"}</span>
          </h3>

          {openSection.lessons && (
            <div className="section-grid">
              {sampleLessons.map(l => (
                <div className="card animated-card" key={l.id}>
                  <h4>{l.title}</h4>
                  <p>{l.description}</p>
                  <button
                    className="btn-primary shadow-hover"
                    onClick={() => setToast(`Starting lesson: ${l.title}`)}
                  >
                    Start Lesson
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-section">
          <h3 className="section-title collapsible" onClick={() => toggle('quizzes')}>
            <i className="fa fa-question-circle"></i> Quizzes
            <span className="arrow">{openSection.quizzes ? "▲" : "▼"}</span>
          </h3>

          {openSection.quizzes && (
            <div className="section-grid">
              {sampleQuizzes.map(q => (
                <div className="card animated-card" key={q.id}>
                  <h4>{q.title}</h4>
                  <p>{q.description}</p>
                  <button
                    className="btn-secondary shadow-hover"
                    onClick={() => setToast(`Taking quiz: ${q.title}`)}
                  >
                    Take Quiz
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-section">
          <h3 className="section-title collapsible" onClick={() => toggle('challenges')}>
            <i className="fa fa-trophy"></i> Challenges
            <span className="arrow">{openSection.challenges ? "▲" : "▼"}</span>
          </h3>

          {openSection.challenges && (
            <div className="section-grid">
              {sampleChallenges.map(c => (
                <div className="card animated-card" key={c.id}>
                  <h4>{c.title}</h4>
                  <div className="progress-wrapper">
                    <div className="progress-bar" style={{ width: `${c.progress}%` }}>
                      {c.progress}%
                    </div>
                  </div>
                  <button
                    className="btn-primary shadow-hover"
                    onClick={() => setToast(`Continuing challenge: ${c.title}`)}
                  >
                    Continue
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-section">
          <h3 className="section-title collapsible" onClick={() => toggle('badges')}>
            <i className="fa fa-medal"></i> Badges
            <span className="arrow">{openSection.badges ? "▲" : "▼"}</span>
          </h3>

          {openSection.badges && (
            <div className="badges-grid">
              {sampleBadges.map(b => (
                <div
                  className={`badge animated-card ${b.earned ? 'earned' : 'locked'}`}
                  key={b.id}
                >
                  {b.earned ? '🏆' : '🔒'}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
