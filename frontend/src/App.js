import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { GameProvider } from './contexts/GameContext';

// Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Pages
import Home from './pages/Home';
import StudentDashboard from './pages/student/Dashboard';
import TeacherDashboard from './pages/teacher/Dashboard';
import QuizInterface from './pages/student/QuizInterface';
import Challenges from './pages/student/Challenges';
import Badges from './pages/student/Badges';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  const [user, setUser] = useState(null);

  return (
    <AuthProvider>
      <GameProvider>
        <Router>
          <div className="App">
            <Header user={user} />
            <main className="main-content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Student Routes */}
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/quizzes" element={<QuizInterface />} />
                <Route path="/student/challenges" element={<Challenges />} />
                <Route path="/student/badges" element={<Badges />} />
                
                {/* Teacher Routes */}
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                
                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </GameProvider>
    </AuthProvider>
  );
}

export default App;
