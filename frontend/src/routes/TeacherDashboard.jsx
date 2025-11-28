import React, { useState } from 'react'
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
        <div key={i} className='card' style={{ marginBottom: '10px', padding: '12px' }}>
          <label>Question {i + 1}</label>
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
            <div key={j}>
              <label>Answer {j + 1}</label>
              <input
                placeholder={`Answer ${j + 1}`}
                value={quiz.questions[i]?.answers[j] || ''}
                onChange={e => {
                  const newQuestions = [...quiz.questions]
                  newQuestions[i].answers[j] = e.target.value
                  setQuiz({ ...quiz, questions: newQuestions })
                }}
              />
            </div>
          ))}
          <label>Correct Answer</label>
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
          <div className='form-wrapper'>
            <h3>Create Lesson</h3>
            <form onSubmit={submitLesson} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label>Subject Name</label>
              <input value={lesson.subject} onChange={e => setLesson({ ...lesson, subject: e.target.value })} />

              <label>Subject Content</label>
              <textarea value={lesson.content} onChange={e => setLesson({ ...lesson, content: e.target.value })} style={{ height: '120px' }} />

              <label>Difficulty Level</label>
              <select value={lesson.difficulty} onChange={e => setLesson({ ...lesson, difficulty: e.target.value })}>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>

              <label>Assigned Class</label>
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
        <div className='form-wrapper'>
            <h3>Create Quiz</h3>
            <form onSubmit={submitQuiz} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label>Quiz Title</label>
              <input value={quiz.title} onChange={e => setQuiz({ ...quiz, title: e.target.value })} />

              <label>Number of Questions</label>
              <input type='number' min='1' value={quiz.numQuestions} onChange={e => setQuiz({ ...quiz, numQuestions: parseInt(e.target.value), questions: [] })} />

              <label>Assigned Class</label>
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
         <div className='form-wrapper'>
            <h3>Add Student to Class</h3>
            <form onSubmit={submitStudent} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <label>Full Names</label>
              <input value={student.fullname} onChange={e => setStudent({ ...student, fullname: e.target.value })} />

              <label>Student Email</label>
              <input value={student.email} onChange={e => setStudent({ ...student, email: e.target.value })} />

              <label>Student ID</label>
              <input value={student.studentID} onChange={e => setStudent({ ...student, studentID: e.target.value })} />

              <label>Assigned Class</label>
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
