import React, {useEffect, useState} from 'react'
import api from '../api'
export default function Badges(){
  const [badges,setBadges] = useState([])
  useEffect(()=>{api.get('/progress').then(res=>setBadges(res.data.badges||[])).catch(()=>{})},[])
  return (
    <div className="container">
      <h2>My Badges</h2>
      <div className="w3-row-padding">
        {badges.length? badges.map(b=>(
          <div key={b} className="w3-third">
            <div className="w3-card w3-padding w3-center">
              <i className="fa fa-medal fa-3x"></i>
              <h4>{b}</h4>
            </div>
          </div>
        )): <p>No badges yet.</p>}
      </div>
    </div>
  )
}
