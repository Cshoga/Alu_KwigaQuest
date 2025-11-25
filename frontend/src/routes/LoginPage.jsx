import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sampleUsers } from '../data/sampleData'
import { login as apiLogin } from '../services/api'

export default function LoginPage(){
  const [role,setRole] = useState(null)
  const [form,setForm] = useState({ username:'', password:'', classroom:'' })
  const [error,setError] = useState('')
  const nav = useNavigate()

  const handleRole = (r)=>{ setRole(r); setError('') }

  const submit = async (e)=>{
    e.preventDefault()
    try{
      try{
        const res = await apiLogin(form.username, form.password)
        if(res.role === 'student') nav('/student-dashboard')
        else if(res.role === 'teacher') nav('/teacher-dashboard')
        else if(res.role === 'admin') nav('/admin-dashboard')
        return
      }catch(err)

      const pool = role === 'Student' ? sampleUsers.students : role === 'Teacher' ? sampleUsers.teachers : [sampleUsers.admin]
      const match = pool.find(u=>u.username === form.username && u.password === form.password)
      if(!match){ setError('Invalid credentials'); return }
      if(role === 'Student') nav('/student-dashboard')
      else if(role === 'Teacher') nav('/teacher-dashboard')
      else nav('/admin-dashboard')
    }catch(err){ setError('Login failed') }
  }

  return (
    <div className='container'>
      <div className='header'>
        <h2>Choose Your Role</h2>
      </div>
      <div className='role-grid' style={{marginBottom:18}}>
        {['Student','Teacher','Admin'].map(r=> (
          <div key={r} className='role card' onClick={()=>handleRole(r)} style={{borderColor: role===r ? '#2b7bff' : '#ddd'}}>
            <h3>{r}</h3>
          </div>
        ))}
      </div>

      {role && (
        <form onSubmit={submit} className='card'>
          <h3>Login as {role}</h3>
          <div style={{marginTop:12}}>
            <label className='small'>Username</label>
            <input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} style={{width:'100%',padding:8,marginTop:6}} />
          </div>
          <div style={{marginTop:12}}>
            <label className='small'>Password</label>
            <input type='password' value={form.password} onChange={e=>setForm({...form,password:e.target.value})} style={{width:'100%',padding:8,marginTop:6}} />
          </div>
          {role === 'Student' && <div style={{marginTop:12}}>
            <label className='small'>Classroom</label>
            <input value={form.classroom} onChange={e=>setForm({...form,classroom:e.target.value})} style={{width:'100%',padding:8,marginTop:6}} />
          </div>}

          <div style={{marginTop:12}}>
            <button className='button' type='submit'>Login</button>
          </div>
          {error && <p style={{color:'red'}}>{error}</p>}

          <div style={{marginTop:14}} className='small'>
            <strong>Sample Credentials:</strong>
            <div>Students: student1/pass123 (P6A), student2/pass123 (P6B)</div>
            <div>Teachers: teacher1/teach123, teacher2/teach123</div>
            <div>Admin: admin/admin123</div>
          </div>
        </form>
      )}
    </div>
  )
}
