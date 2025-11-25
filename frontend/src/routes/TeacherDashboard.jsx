import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sampleLessons } from '../data/sampleData'

export default function TeacherDashboard(){
  const nav = useNavigate()
  const logout = ()=> nav('/login')

  const [lessons,setLessons] = useState(sampleLessons)
  const [newLesson,setNewLesson] = useState({ title:'', description:'', assigned_class:'' })
  const [quiz,setQuiz] = useState({ title:'', lesson_id:'', questions:'' })
  const [challenge,setChallenge] = useState({ title:'', description:'' })

  const addLesson = (e)=>{
    e.preventDefault()
    setLessons(prev=> [...prev, { id:Date.now(), ...newLesson }])
    setNewLesson({title:'', description:'', assigned_class:''})
  }

  const addQuiz = (e)=>{
    e.preventDefault()
    alert("Quiz added locally! (Backend available later)")
    setQuiz({title:'', lesson_id:'', questions:''})
  }

  const addChallenge = (e)=>{
    e.preventDefault()
    alert("Challenge added locally!")
    setChallenge({title:'', description:''})
  }

  return (
    <div className='container'>
      <div className='header-bar'>
        <h2>Teacher Dashboard</h2>
        <span className='logout' onClick={logout}>Sign out</span>
      </div>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20}}>

        <div className='card'>
          <h3>Create Lesson</h3>
          <form onSubmit={addLesson}>
            <input placeholder='Title' value={newLesson.title} onChange={e=>setNewLesson({...newLesson,title:e.target.value})} />
            <textarea placeholder='Description' value={newLesson.description} onChange={e=>setNewLesson({...newLesson,description:e.target.value})} />
            <input placeholder='Assign to class' value={newLesson.assigned_class} onChange={e=>setNewLesson({...newLesson,assigned_class:e.target.value})} />
            <button className='button'>Add Lesson</button>
          </form>
        </div>

        <div className='card'>
          <h3>Create Quiz</h3>
          <form onSubmit={addQuiz}>
            <input placeholder='Quiz title' value={quiz.title} onChange={e=>setQuiz({...quiz,title:e.target.value})} />
            <input placeholder='Lesson ID' value={quiz.lesson_id} onChange={e=>setQuiz({...quiz,lesson_id:e.target.value})}/>
            <textarea placeholder='Questions (one per line)' value={quiz.questions} onChange={e=>setQuiz({...quiz,questions:e.target.value})}/>
            <button className='button'>Add Quiz</button>
          </form>
        </div>

        <div className='card'>
          <h3>Create Challenge</h3>
          <form onSubmit={addChallenge}>
            <input placeholder='Challenge title' value={challenge.title} onChange={e=>setChallenge({...challenge,title:e.target.value})}/>
            <textarea placeholder='Description' value={challenge.description} onChange={e=>setChallenge({...challenge,description:e.target.value})}/>
            <button className='button'>Add Challenge</button>
          </form>
        </div>

      </div>

      <h3>Your Lessons</h3>
      <div className='lesson-grid'>
        {lessons.map(l=> (
          <div className='card' key={l.id}>
            <div className='card-title'>{l.title}</div>
            <div className='small'>{l.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
