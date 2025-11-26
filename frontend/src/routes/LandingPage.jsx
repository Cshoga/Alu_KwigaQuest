import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage(){
  const nav = useNavigate()

  return (
    <div 
      className="container center" 
      style={{ height:'100vh', flexDirection:'column' }}
    >
      <h1 style={{ fontSize: '4rem', marginBottom: 20, fontWeight: 700 }}>
        KwigaQuest
      </h1>

      <button 
        className="button"
        style={{ marginTop: 20 }}
        onClick={() => nav('/login')}
      >
        Let's Get Started
      </button>
    </div>
  )
}

