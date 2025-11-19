import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar(){
  const user = JSON.parse(localStorage.getItem('user')||'null')
  const logout = ()=>{localStorage.removeItem('token');localStorage.removeItem('user');window.location.href='/' }
  return (
    <div className="w3-bar w3-theme-d3 w3-large w3-card">
      <span className="w3-bar-item nav-brand"><i className="fa fa-graduation-cap"></i> KwigaQuest</span>
      <Link to="/" className="w3-bar-item w3-button">Home</Link>
      <Link to="/lessons" className="w3-bar-item w3-button">Lessons</Link>
      <Link to="/quizzes" className="w3-bar-item w3-button">Quizzes</Link>
      <Link to="/badges" className="w3-bar-item w3-button">Badges</Link>
      <div style={{float:'right'}}>
        {user? <button onClick={logout} className="w3-button w3-right">Logout</button>: <Link to="/login" className="w3-bar-item w3-button">Login</Link>}
      </div>
    </div>
  )
}

----- FILE: frontend/src/components/LessonCard.jsx
import React from 'react'
export default function LessonCard({lesson, onMark}){
  return (
    <div className="w3-card card w3-margin-bottom">
      <div className="w3-container">
        <h3>{lesson.title}</h3>
        <p>{lesson.content.length>250?lesson.content.slice(0,250)+"...":lesson.content}</p>
        <button className="w3-button w3-blue w3-round" onClick={()=>onMark(lesson.id)}>Mark done</button>
      </div>
    </div>
  )
}
