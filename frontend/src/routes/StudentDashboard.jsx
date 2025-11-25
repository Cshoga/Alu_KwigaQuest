import React from 'react'
import { sampleLessons, sampleQuizzes, sampleChallenges, sampleBadges } from '../data/sampleData'
import { useNavigate } from 'react-router-dom'

function IconTitle({icon, text}){
  return <h3><i className={icon} style={{marginRight:8}}></i>{text}</h3>
}

export default function StudentDashboard(){
  const nav = useNavigate()
  const logout = ()=> nav('/login')

  return (
    <div className='container'>
      <div className='header-bar'>
        <h2>Student Dashboard</h2>
        <span className='logout' onClick={logout}>Sign out</span>
      </div>

      <IconTitle icon="fa fa-book" text="Lessons" />
      <div className='lesson-grid'>
        {sampleLessons.map(l=> (
          <div className='card' key={l.id}>
            <div className='card-title'>{l.title}</div>
            <div className='small'>{l.description}</div>
          </div>
        ))}
      </div>

      <IconTitle icon="fa fa-pen" text="Quizzes" />
      <div className='lesson-grid'>
        {sampleQuizzes.map(q=> (
          <div className='card' key={q.id}>
            <div className='card-title'>{q.title}</div>
            <div className='small'>{q.questions.length} questions</div>
          </div>
        ))}
      </div>

      <IconTitle icon="fa fa-trophy" text="Challenges" />
      <div className='lesson-grid'>
        {sampleChallenges.map(c=> (
          <div className='card' key={c.id}>
            <div className='card-title'>{c.title}</div>
            <div className='small'>{c.description}</div>
          </div>
        ))}
      </div>

      <IconTitle icon="fa fa-medal" text="Badges" />
      <div style={{display:'flex',gap:12}}>
        {sampleBadges.map(b=> (
          <div className='card' key={b.id}>
            <div className='card-title'>{b.name}</div>
            <div className='small'>{b.requirement}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
