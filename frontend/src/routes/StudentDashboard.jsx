import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Toast from '../components/Toast'
import { sampleLessons, sampleQuizzes, sampleChallenges, sampleBadges } from '../data/sampleData'

export default function StudentDashboard() {
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    setTimeout(() => setLoading(false), 700)
  }, [])

  if (loading) return (
    <div className="center-loading">
      <h2>Loading Dashboard...</h2>
    </div>
  )

  return (
    <div className="dashboard-container">

      <Sidebar role="Student" />

      <div className="dashboard-content">

        {toast && <Toast message={toast} />}

        <h2 className="welcome-title">Welcome, Student 🎓</h2>

        <section>
          <h3 className="section-title">
            <i className="fa fa-book"></i> Lessons
          </h3>

          <div className="section-grid">
            {sampleLessons.map(l => (
              <div className="card" key={l.id}>
                <h4>{l.title}</h4>
                <p>{l.description}</p>

                <button
                  className="btn-primary"
                  onClick={() => setToast(`Starting lesson: ${l.title}`)}
                >
                  Start Lesson
                </button>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="section-title">
            <i className="fa fa-question-circle"></i> Quizzes
          </h3>

          <div className="section-grid">
            {sampleQuizzes.map(q => (
              <div className="card" key={q.id}>
                <h4>{q.title}</h4>
                <p>{q.description}</p>

                <button
                  className="btn-secondary"
                  onClick={() => setToast(`Taking quiz: ${q.title}`)}
                >
                  Take Quiz
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- CHALLENGES ---------------- */}
        <section>
          <h3 className="section-title">
            <i className="fa fa-trophy"></i> Challenges
          </h3>

          <div className="section-grid">
            {sampleChallenges.map(c => (
              <div className="card" key={c.id}>
                <h4>{c.title}</h4>

                <div className="progress-wrapper">
                  <div className="progress-bar" style={{ width: `${c.progress}%` }}>
                    {c.progress}%
                  </div>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => setToast(`Continuing challenge: ${c.title}`)}
                >
                  Continue
                </button>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3 className="section-title">
            <i className="fa fa-medal"></i> Badges
          </h3>

          <div className="badges-grid">
            {sampleBadges.map(b => (
              <div
                className={`badge ${b.earned ? 'earned' : 'locked'}`}
                key={b.id}
              >
                {b.earned ? '🏆' : '🔒'}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
