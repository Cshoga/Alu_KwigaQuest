import React, { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Toast from '../components/Toast'
import { sampleLessons, sampleQuizzes, sampleChallenges, sampleBadges } from '../data/sampleData'

export default function StudentDashboard(){
  const [loading,setLoading] = useState(true)
  const [toast,setToast] = useState(null)

  useEffect(()=>{
    setTimeout(()=>setLoading(false), 700)
  },[])

  if(loading) return <div className='container'><h2>Loading...</h2></div>

  return (
    <>
      <Sidebar role="Student" />
      <div className='container' style={{marginLeft:220}}>
        <h2>Welcome Student</h2>
        {toast && <Toast message={toast} />}

        <h3><i className='fa fa-book'></i> Lessons</h3>
        <div className='lesson-grid'>
          {sampleLessons.map(l=>(
            <div className='card' key={l.id}>
              <h4>{l.title}</h4>
              <p>{l.description}</p>
            </div>
          ))}
        </div>

        <h3><i className='fa fa-pen'></i> Quizzes</h3>
        <div className='lesson-grid'>
          {sampleQuizzes.map(q=>(
            <div className='card' key={q.id}>
              <h4>{q.title}</h4>
            </div>
          ))}
        </div>

        <h3><i className='fa fa-trophy'></i> Challenges</h3>
        <div className='lesson-grid'>
          {sampleChallenges.map(c=>(
            <div className='card' key={c.id}>
              <h4>{c.title}</h4>
            </div>
          ))}
        </div>

        <h3><i className='fa fa-medal'></i> Badges</h3>
        <div style={{display:'flex',gap:12}}>
          {sampleBadges.map(b=>(
            <div className='card' key={b.id}>
              <h4>{b.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
