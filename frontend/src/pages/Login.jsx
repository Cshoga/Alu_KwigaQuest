import React, {useState} from 'react'
import api from '../api'
export default function Login(){
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const submit = ()=>{
    api.post('/login',{username,password}).then(res=>{localStorage.setItem('token',res.data.token);localStorage.setItem('user',JSON.stringify(res.data.user));window.location.href='/dashboard'}).catch(()=>alert('invalid'))
  }
  return (
    <div className="w3-display-middle" style={{width:360}}>
      <div className="w3-card w3-padding">
        <h2 className="w3-center">Login</h2>
        <input className="w3-input w3-border w3-margin" placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
        <input className="w3-input w3-border w3-margin" placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w3-button w3-block w3-blue" onClick={submit}>Login</button>
      </div>
    </div>
  )
}
