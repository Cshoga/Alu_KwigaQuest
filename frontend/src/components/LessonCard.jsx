import React from 'react'
export default function LessonCard({lesson, onMark}){
  return (
    <div className="w3-card card w3-margin-bottom">
      <div className="w3-container">
        <h3>{lesson.title}</h3>
        <p>{lesson.content.length>250?lesson.content.slice(0,250)+"...":lesson.content}</p>
        <button className="w3-button w3-blue w3-round" onClick={()=>onMark(lesson.id)}>Mark done</button>
      </div>
    </div>
  )
}
