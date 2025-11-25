import React, { useState } from 'react'

export default function AdminDashboard(){
  const [classes, setClasses] = useState(['P6A','P6B'])
  const [newClass, setNewClass] = useState('')

  const addClass = (e)=>{ e.preventDefault(); if(newClass){ setClasses(prev=>[...prev,newClass]); setNewClass('') } }

  return (
    <div className='container'>
      <div className='header'><h2>Admin Dashboard</h2></div>
      <div style={{display:'flex',gap:12}}>
        <div className='card' style={{flex:1}}>
          <h3>Create Class</h3>
          <form onSubmit={addClass}>
            <input value={newClass} onChange={e=>setNewClass(e.target.value)} placeholder='Class name e.g. P6C' style={{width:'100%',padding:8,marginBottom:8}} />
            <button className='button' type='submit'>Create</button>
          </form>
        </div>

        <div className='card' style={{flex:2}}>
          <h3>Existing Classes</h3>
          <ul>
            {classes.map(c=> <li key={c} className='small' style={{marginBottom:6}}>{c}</li>)}
          </ul>
        </div>
      </div>
    </div>
  )
}
