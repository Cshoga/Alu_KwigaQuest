import React, {useEffect, useState} from 'react'
import api from '../api'
export default function Dashboard(){
  const user = JSON.parse(localStorage.getItem('user')||'null')
  const [progress,setProgress] = useState({lessons_completed:[],quiz_scores:[],badges:[]})
  useEffect(()=>{api.get('/progress').then(res=>setProgress(res.data)).catch(()=>{})},[])
  if (user && user.role==='teacher') window.location.href='/teacher'
  return (
    <div className="student-bg">
      <div className="container dashboard-box w3-card">
        <h1>Welcome back{user?', '+user.username:''}</h1>
        <p className="w3-light-grey w3-round w3-padding">Start with lessons, take quizzes and earn badges.</p>
        <div className="w3-margin-top">
          <h3>Your progress</h3>
          <p>Lessons done: {progress.lessons_completed.length}</p>
          <p>Badges: {progress.badges.length}</p>
        </div>
      </div>
    </div>
  )
}
