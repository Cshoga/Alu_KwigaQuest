import React, {useState} from 'react'
import api from '../api'
export default function QuizCard({quiz}){
  const qs = JSON.parse(quiz.questions)
  const [answers,setAnswers] = useState({})
  const handle = (i,v)=> setAnswers(a=>({...a,[i]:v}))
  const submit = ()=>{api.post('/quizzes/'+quiz.id+'/submit',{answers}).then(res=>alert('Score: '+res.data.score)).catch(()=>alert('error'))}
  return (
    <div className="w3-card card w3-margin-bottom">
      <div className="w3-container">
        <h3>{quiz.title}</h3>
        {qs.map((q,i)=>(
          <div key={i} className="w3-margin-bottom">
            <p><strong>{i+1}.</strong> {q.q}</p>
            {q.options.map((opt,j)=>(
              <label key={j} className="w3-block"><input type="radio" name={"q"+i} onChange={()=>handle(String(i),opt)} /> {opt}</label>
            ))}
          </div>
        ))}
        <button className="w3-button w3-green" onClick={submit}>Submit Quiz</button>
      </div>
    </div>
  )
}
