import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LandingPage(){
  const nav = useNavigate()
  return (
    <div className='container center' style={{height:'60vh',flexDirection:'column'}}>
      <h1 style={{fontSize:38,marginBottom:16}}>KwigaQuest</h1>
      <button className='button' onClick={()=>nav('/login')}>Let's Get Started</button>
    </div>
  )
}
