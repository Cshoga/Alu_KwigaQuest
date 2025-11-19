import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Lessons from './pages/Lessons'
import Quizzes from './pages/Quizzes'
import Badges from './pages/Badges'
import TeacherDashboard from './pages/TeacherDashboard'

export default function App(){
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/lessons" element={<Lessons />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/badges" element={<Badges />} />
      </Routes>
    </BrowserRouter>
  )
}
