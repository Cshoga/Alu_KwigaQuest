import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Toast from '../components/Toast'
import { sampleLessons } from '../data/sampleData'

export default function TeacherDashboard(){
  const [lessons,setLessons] = useState(sampleLessons)
  const [toast,setToast] = useState(null)

  const [lesson,setLesson] = useState({ title:'', description:'', assigned_class:'' })
  const [quiz,setQuiz] = useState({ title:'', lesson_id:'', questions:'' })
  const [challenge,setChallenge] = useState({ title:'', description:'' })

  const notify = (msg,type)=>{
    setToast({message:msg,type})
    setTimeout(()=>setToast(null),1500)
  }

  const submitLesson = (e)=>{
    e.preventDefault()
    setLessons(prev=>[...prev, {id:Date.now(), ...lesson}])
    setLesson({ title:'', description:'', assigned_class:'' })
    notify('Lesson added!')
  }

  const submitQuiz = (e)=>{
    e.preventDefault()
    notify('Quiz saved (local only)')
    setQuiz({ title:'', lesson_id:'', questions:'' })
  }

  const submitChallenge = (e)=>{
    e.preventDefault()
    notify('Challenge added!')
    setChallenge({ title:'', description:'' })
  }

  return (
    <>
      <Sidebar role="Teacher" />
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className='container' style={{marginLeft:220}}>
        <h2>Teacher Dashboard</h2>

        <div className='card'>
          <h3>Create Lesson</h3>
          <form onSubmit={submitLesson}>
            <input placeholder='Title' value={lesson.title} onChange={e=>setLesson({...lesson,title:e.target.value})}/>
            <textarea placeholder='Description' value={lesson.description} onChange={e=>setLesson({...lesson,description:e.target.value})}/>
            <input placeholder='Class' value={lesson.assigned_class} onChange={e=>setLesson({...lesson,assigned_class:e.target.value})}/>
            <button className='button'>Add</button>
          </form>
        </div>

        <div className='card'>
          <h3>Create Quiz</h3>
          <form onSubmit={submitQuiz}>
            <input placeholder='Quiz title' value={quiz.title} onChange={e=>setQuiz({...quiz,title:e.target.value})}/>
            <input placeholder='Lesson ID' value={quiz.lesson_id} onChange={e=>setQuiz({...quiz,lesson_id:e.target.value})}/>
            <textarea placeholder='Questions (one per line)' value={quiz.questions} onChange={e=>setQuiz({...quiz,questions:e.target.value})}/>
            <button className='button'>Add Quiz</button>
          </form>
        </div>

        <div className='card'>
          <h3>Create Challenge</h3>
          <form onSubmit={submitChallenge}>
            <input placeholder='Challenge title' value={challenge.title} onChange={e=>setChallenge({...challenge,title:e.target.value})}/>
            <textarea placeholder='Description' value={challenge.description} onChange={e=>setChallenge({...challenge,description:e.target.value})}/>
            <button className='button'>Add Challenge</button>
          </form>
        </div>
      </div>
    </>
  )
}
