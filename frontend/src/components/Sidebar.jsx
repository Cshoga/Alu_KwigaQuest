import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Sidebar({ role }){
  const nav = useNavigate()

  return (
    <div className='sidebar'>
      <h3>{role} Menu</h3>
      <a onClick={()=>nav('/' + role.toLowerCase() + '-dashboard')}>Dashboard</a>
      {role==='Teacher' && <a onClick={()=>nav('/teacher-dashboard')}>Manage Lessons</a>}
      {role==='Student' && <a onClick={()=>nav('/student-dashboard')}>My Learning</a>}
      <a onClick={()=>nav('/login')}>Logout</a>
    </div>
  )
}
