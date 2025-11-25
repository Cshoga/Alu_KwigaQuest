import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { sampleUsers } from '../data/sampleData'
import { login as apiLogin } from '../services/api'

export default function LoginPage() {
  const [role, setRole] = useState(null)
  const [form, setForm] = useState({ username: '', password: '', classroom: '' })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRole = (r) => {
    setRole(r)
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      // Try backend login
      try {
        const res = await apiLogin(form.username, form.password)

        if (res.role === 'student') navigate('/student-dashboard')
        else if (res.role === 'teacher') navigate('/teacher-dashboard')
        else if (res.role === 'admin') navigate('/admin-dashboard')

        return
      } catch (err) {
        // fallback if backend offline
      }

      // Local sample login
      let pool =
        role === 'Student'
          ? sampleUsers.students
          : role === 'Teacher'
          ? sampleUsers.teachers
          : [sampleUsers.admin]

      const match = pool.find(
        (u) => u.username === form.username && u.password === form.password
      )

      if (!match) {
        setError('Invalid credentials')
        return
      }

      if (role === 'Student') navigate('/student-dashboard')
      else if (role === 'Teacher') navigate('/teacher-dashboard')
      else navigate('/admin-dashboard')
    } catch (err) {
      setError('Login failed')
    }
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Choose Your Role</h2>
      </div>

      {/* Role Selection */}
      <div className="role-grid" style={{ marginBottom: 18 }}>
        {['Student', 'Teacher', 'Admin'].map((r) => (
          <div
            key={r}
            className="role card"
            onClick={() => handleRole(r)}
            style={{ borderColor: role === r ? '#2b7bff' : '#ddd' }}
          >
            <h3>{r}</h3>
          </div>
        ))}
      </div>

      {/* Login Form */}
      {role && (
        <form onSubmit={handleSubmit} className="card">
          <h3>Login as {role}</h3>

          <label className="small">Username</label>
          <input
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            style={{ width: '100%', padding: 8 }}
          />

          <label className="small" style={{ marginTop: 12 }}>
            Password
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            style={{ width: '100%', padding: 8 }}
          />

          {role === 'Student' && (
            <>
              <label className="small" style={{ marginTop: 12 }}>
                Classroom
              </label>
              <input
                value={form.classroom}
                onChange={(e) =>
                  setForm({ ...form, classroom: e.target.value })
                }
                style={{ width: '100%', padding: 8 }}
              />
            </>
          )}

          <button className="button" type="submit" style={{ marginTop: 16 }}>
            Login
          </button>

          {error && <p style={{ color: 'red' }}>{error}</p>}

          <div className="small" style={{ marginTop: 10 }}>
            <strong>Samples:</strong>
            <div>Students: student1/pass123</div>
            <div>Teachers: teacher1/teach123</div>
            <div>Admin: admin/admin123</div>
          </div>
        </form>
      )}
    </div>
  )
}
