import React, {useEffect, useState} from 'react'
import api from '../api'
import LessonCard from '../components/LessonCard'
export default function Lessons(){
  const [lessons,setLessons] = useState([])
  useEffect(()=>{api.get('/lessons').then(res=>setLessons(res.data)).catch(()=>{})},[])
  const mark = (id)=>{api.post('/progress/mark_lesson',{lesson_id:id}).then(()=>alert('marked')).catch(()=>alert('error'))}
  return (
    <div className="container">
      <h2>Lessons</h2>
      <div className="grid">
        {lessons.map(l=> <LessonCard key={l.id} lesson={l} onMark={mark} />)}
      </div>
    </div>
  )
}
