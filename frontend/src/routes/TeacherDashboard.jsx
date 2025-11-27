import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Toast from '../components/Toast'

export default function TeacherDashboard() {
  const [activeView, setActiveView] = useState('createLesson')
  const [toast, setToast] = useState(null)

  const [lesson, setLesson] = useState({ subject: '', content: '', difficulty: 'medium', assigned_class: 'P6A' })
  const [quiz, setQuiz] = useState({ title: '', numQuestions: 1, questions: [], assigned_class: 'P6A' })
  const [student, setStudent] = useState({ fullname: '', email: '', studentID: '', assigned_class: 'P6A' })

  const notify = (msg, type) => {
    setToast({ message: msg, type })
    setTimeout(() => setToast(null), 1500)
  }


  const submitLesson = e => {
    e.preventDefault()
    console.log('Lesson submitted:', lesson)
    notify('Lesson created!')
    setLesson({ subject: '', content: '', difficulty: 'medium', assigned_class: 'P6A' })
  }

  const submitQuiz = e => {
    e.preventDefault()
    console.log('Quiz submitted:', quiz)
    notify('Quiz created!')
    setQuiz({ title: '', numQuestions: 1, questions: [], assigned_class: 'P6A' })
  }

  const submitStudent = e => {
    e.preventDefault()
    console.log('Student added:', student)
    notify('Student added to class!')
    setStudent({ fullname: '', email: '', studentID: '', assigned_class: 'P6A' })
  }

 
  const renderQuizQuestions = () => {
    let questionsArray = []
    for (let i = 0; i < quiz.numQuestions; i++) {
      questionsArray.push(
        <div key={i} className='card' style={{ marginBottom: '10px', padding: '10px' }}>
          <h4>Question {i + 1}</h4>
          <input
            placeholder='Question text'
            value={quiz.questions[i]?.text || ''}
            onChange={e => {
              const newQuestions = [...quiz.questions]
              newQuestions[i] = { ...newQuestions[i], text: e.target.value, answers: newQuestions[i]?.answers || ['', '', '', ''], correct: newQuestions[i]?.correct || '' }
              setQuiz({ ...quiz, questions: newQuestions })
            }}
          />
          {[0, 1, 2, 3].map(j => (
            <input
              key={j}
              placeholder={`Answer ${j + 1}`}
              value={quiz.questions[i]?.answers[j] || ''}
              onChange={e => {
                const newQuestions = [...quiz.questions]
                newQuestions[i].answers[j] = e.target.value
                setQuiz({ ...quiz, questions: newQuestions })
              }}
            />
          ))}
          <input
            placeholder='Correct Answer'
            value={quiz.questions[i]?.correct || ''}
            onChange={e => {
              const newQuestions = [...quiz.questions]
              newQuestions[i].correct = e.target.value
              setQuiz({ ...quiz, questions: newQuestions })
            }}
          />
        </div>
      )
    }
    return questionsArray
  }

  return (
    <>
      <Sidebar role="Teacher" />

      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className='dashboard-content'>
        <h2>Teacher Dashboard</h2>

     
        <div className='teacher-sidebar' style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          <button className='sidebar-btn' onClick={() => setActiveView('createLesson')}>Create Lessons</button>
          <button className='sidebar-btn' onClick={() => setActiveView('createQuiz')}>Create Quizzes</button>
          <button className='sidebar-btn' onClick={() => setActiveView('postChallenge')}>Post Challenge</button>
          <button className='sidebar-btn' onClick={() => setActiveView('viewProgress')}>View Student Progress</button>
          <button className='sidebar-btn' onClick={() => setActiveView('addStudent')}>Add Students</button>
        </div>

      
        {activeView === 'createLesson' && (
          <div className='card'>
            <h3>Create Lesson</h3>
            <form onSubmit={submitLesson} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input placeholder='Subject Name' value={lesson.subject} onChange={e => setLesson({ ...lesson, subject: e.target.value })} />
              <textarea placeholder='Subject Content' value={lesson.content} onChange={e => setLesson({ ...lesson, content: e.target.value })} style={{ height: '120px' }} />
              <select value={lesson.difficulty} onChange={e => setLesson({ ...lesson, difficulty: e.target.value })}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>
              <select value={lesson.assigned_class} onChange={e => setLesson({ ...lesson, assigned_class: e.target.value })}>
                <option value='P6A'>P6A</option>
                <option value='P6B'>P6B</option>
              </select>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className='create-btn'>Create</button>
                <button type='button' className='create-btn' onClick={() => setActiveView('')}>Cancel</button>
              </div>
            </form>
          </div>
        )}

       
        {activeView === 'createQuiz' && (
          <div className='card'>
            <h3>Create Quiz</h3>
            <form onSubmit={submitQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input placeholder='Quiz Title' value={quiz.title} onChange={e => setQuiz({ ...quiz, title: e.target.value })} />
              <input type='number' min='1' placeholder='Number of Questions' value={quiz.numQuestions} onChange={e => setQuiz({ ...quiz, numQuestions: parseInt(e.target.value), questions: [] })} />
              <select value={quiz.assigned_class} onChange={e => setQuiz({ ...quiz, assigned_class: e.target.value })}>
                <option value='P6A'>P6A</option>
                <option value='P6B'>P6B</option>
              </select>
              {renderQuizQuestions()}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className='create-btn'>Create Quiz</button>
                <button type='button' className='create-btn' onClick={() => setActiveView('')}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {activeView === 'postChallenge' && (
          <div className='card'><h3>Post Challenge</h3><p>Features coming soon</p></div>
        )}

        {activeView === 'viewProgress' && (
          <div className='card'><h3>View Student Progress</h3><p>Features coming soon</p></div>
        )}

        {activeView === 'addStudent' && (
          <div className='card'>
            <h3>Add Student to Class</h3>
            <form onSubmit={submitStudent} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <input placeholder='Full Names' value={student.fullname} onChange={e => setStudent({ ...student, fullname: e.target.value })} />
              <input placeholder='Student Email' value={student.email} onChange={e => setStudent({ ...student, email: e.target.value })} />
              <input placeholder='Student ID' value={student.studentID} onChange={e => setStudent({ ...student, studentID: e.target.value })} />
              <select value={student.assigned_class} onChange={e => setStudent({ ...student, assigned_class: e.target.value })}>
                <option value='P6A'>P6A</option>
                <option value='P6B'>P6B</option>
              </select>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button className='create-btn'>Add Student</button>
                <button type='button' className='create-btn' onClick={() => setActiveView('')}>Cancel</button>
              </div>
            </form>
          </div>
        )}

      </div>
    </>
  )
}
