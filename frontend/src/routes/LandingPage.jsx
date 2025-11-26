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
      <h2> Welcome to KwigaQuest! every journey becomes an adventure.</h2>
      <h3>We make studying easier, more interactive, and more organized. Wether you're a student, teacher, admin, Kwigaquest brings everything you need in one seamless platform.
         Begin your journey today and explore learning in a whole new way.</h3>

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

