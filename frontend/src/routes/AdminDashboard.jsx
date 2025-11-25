import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminDashboard(){
  const nav = useNavigate()
  const logout = ()=> nav('/login')

  return (
    <div className='container'>
      <div className='header-bar'>
        <h2>Admin Dashboard</h2>
        <span className='logout' onClick={logout}>Sign out</span>
      </div>

      <p>Admin controls coming soon!</p>
    </div>
  )
}
