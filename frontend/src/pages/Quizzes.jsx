import React, {useEffect, useState} from 'react'
import api from '../api'
import QuizCard from '../components/QuizCard'
export default function Quizzes(){
  const [quizzes,setQuizzes] = useState([])
  useEffect(()=>{api.get('/quizzes').then(res=>setQuizzes(res.data)).catch(()=>{})},[])
  return (
    <div className="container">
      <h2>Quizzes</h2>
      {quizzes.map(q=> <QuizCard key={q.id} quiz={q} />)}
    </div>
  )
}
