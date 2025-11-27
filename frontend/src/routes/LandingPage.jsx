import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage(){
  const nav = useNavigate()

  return (
    <div className="center" style={{ height:'100vh', flexDirection:'column' }}>
      
      <div className="hero-text-container">
        
        <h1 className="hero-title">KwigaQuest</h1>

        <h2 className="hero-subtitle">
          Welcome to KwigaQuest! Every journey becomes an adventure.
        </h2>

        <h3 className="hero-description">
          We make studying easier, more interactive, and more organized. Whether you're 
          a student, teacher, or admin, KwigaQuest brings everything you need in one 
          seamless platform. Begin your journey today and explore learning in a whole 
          new way.
        </h3>

        <button 
          className="button"
          onClick={() => nav('/login')}
        >
          Let's Get Started
        </button>

      </div>

    </div>
  )
}
