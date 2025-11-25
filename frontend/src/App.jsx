import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './routes/LandingPage'
import LoginPage from './routes/LoginPage'
import StudentDashboard from './routes/StudentDashboard'
import TeacherDashboard from './routes/TeacherDashboard'
import AdminDashboard from './routes/AdminDashboard'


function App(){
return (
<Routes>
   <Route path='/' element={<LandingPage/>} />
   <Route path='/login' element={<LoginPage/>} />
   <Route path='/student-dashboard' element={<StudentDashboard/>} />
   <Route path='/teacher-dashboard' element={<TeacherDashboard/>} />
   <Route path='/admin-dashboard' element={<AdminDashboard/>} />
   <Route path='*' element={<Navigate to='/'/>} />
</Routes>
)
}


export default App
