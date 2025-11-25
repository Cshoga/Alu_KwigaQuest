import React from 'react'
import { sampleLessons, sampleQuizzes, sampleChallenges, sampleBadges } from '../data/sampleData'

function LessonCard({l}){
  return (<div className='card'><div className='card-title'>{l.title}</div><div className='small'>{l.description}</div></div>)
}
function QuizCard({q}){return (<div className='card'><div className='card-title'>{q.title}</div><div className='small'>{q.questions.length} questions</div></div>)}
function ChallengeCard({c}){return (<div className='card'><div className='card-title'>{c.title}</div><div className='small'>{c.description}</div></div>)}
function BadgeCard({b}){return (<div className='card'><div className='card-title'>{b.name}</div><div className='small'>{b.requirement}</div></div>)}

export default function StudentDashboard(){
  return (
    <div className='container'>
      <div className='header'><h2>Student Dashboard</h2></div>

      <h3>Lessons</h3>
      <div className='lesson-grid'>{sampleLessons.map(l=> <LessonCard key={l.id} l={l} />)}</div>

      <h3 style={{marginTop:18}}>Quizzes</h3>
      <div className='lesson-grid'>{sampleQuizzes.map(q=> <QuizCard key={q.id} q={q} />)}</div>

      <h3 style={{marginTop:18}}>Challenges</h3>
      <div className='lesson-grid'>{sampleChallenges.map(c=> <ChallengeCard key={c.id} c={c} />)}</div>

      <h3 style={{marginTop:18}}>My Badges</h3>
      <div style={{display:'flex',gap:12}}>{sampleBadges.map(b=> <BadgeCard key={b.id} b={b} />)}</div>
    </div>
  )
}
