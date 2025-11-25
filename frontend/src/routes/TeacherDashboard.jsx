import React, { useState } from 'react'
import { sampleLessons } from '../data/sampleData'

export default function TeacherDashboard(){
  const [lessons,setLessons] = useState(sampleLessons)
  const [form,setForm] = useState({ title:'', description:'', assigned_class:'' })

  const add = (e)=>{ e.preventDefault(); setLessons(prev=>[{ id:Date.now(), ...form }, ...prev]); setForm({ title:'', description:'', assigned_class:'' }) }

  return (
    <div className='container'>
      <div className='header'><h2>Teacher Dashboard</h2></div>

      <div style={{display:'flex',gap:12}}>
        <div style={{flex:1}} className='card'>
          <h3>Create Lesson</h3>
          <form onSubmit={add}>
            <input placeholder='Title' value={form.title} onChange={e=>setForm({...form,title:e.target.value})} style={{width:'100%',padding:8,marginBottom:8}} />
            <textarea placeholder='Description' value={form.description} onChange={e=>setForm({...form,description:e.target.value})} style={{width:'100%',padding:8,marginBottom:8}} />
            <input placeholder='Assign to class (eg P6A)' value={form.assigned_class} onChange={e=>setForm({...form,assigned_class:e.target.value})} style={{width:'100%',padding:8,marginBottom:8}} />
            <button className='button' type='submit'>Post Lesson</button>
          </form>
        </div>

        <div style={{flex:2}}>
          <h3>Your Lessons</h3>
          <div className='lesson-grid'>{lessons.map(l=> (
            <div key={l.id} className='card'><div className='card-title'>{l.title}</div><div className='small'>{l.description}</div></div>
          ))}</div>
        </div>
      </div>
    </div>
  )
}
