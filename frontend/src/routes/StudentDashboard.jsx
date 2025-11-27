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

  if (loading) return <div className='container'><h2>Loading...</h2></div>

  return (
    <div className='dashboard-container'>
      <Sidebar role="Student" />
      <div className='dashboard-content'>
        <h2>Welcome Student</h2>
        {toast && <Toast message={toast} />}

        <h3><i className='fa fa-book'></i> Lessons</h3>
        {sampleLessons.map(l => (
          <div className='lesson-card' key={l.id}>
            <div>
              <h4>{l.title}</h4>
              <p>{l.description}</p>
            </div>
            <button onClick={() => setToast(`Starting lesson: ${l.title}`)}>Start Lesson</button>
          </div>
        ))}

        <h3><i className='fa fa-pen'></i> Quizzes</h3>
        {sampleQuizzes.map(q => (
          <div className='quiz-card' key={q.id}>
            <div>
              <h4>{q.title}</h4>
              <p>{q.description}</p>
            </div>
            <button onClick={() => setToast(`Taking quiz: ${q.title}`)}>Take Quiz</button>
          </div>
        ))}

        <h3><i className='fa fa-trophy'></i> Challenges</h3>
        {sampleChallenges.map(c => (
          <div className='challenge-card' key={c.id}>
            <div className='challenge-title'>{c.title}</div>
            <div className='challenge-progress'>
              <div
                className='challenge-progress-bar'
                style={{ width: `${c.progress}%` }}
              ></div>
            </div>
          </div>
        ))}

        <h3><i className='fa fa-medal'></i> Badges</h3>
        <div className='badges-container'>
          {sampleBadges.map(b => (
            <div
              className={`badge ${b.earned ? 'earned' : 'locked'}`}
              key={b.id}
              title={b.name}
            >
              {b.earned ? '🏅' : '🔒'}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
