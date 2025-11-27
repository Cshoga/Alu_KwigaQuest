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
     
      try {
        const res = await apiLogin(form.username, form.password)

        if (res.role === 'student') navigate('/student-dashboard')
        else if (res.role === 'teacher') navigate('/teacher-dashboard')
        else if (res.role === 'admin') navigate('/admin-dashboard')

        return
      } catch (err) {
        
      }

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
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f7fa",
        padding: 20
      }}
    >
      <div
        style={{
          background: "white",
          padding: "40px",
          borderRadius: "16px",
          width: "400px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Choose Your Role</h2>
        <p style={{ marginBottom: "25px", fontSize: "15px", color: "#555" }}>
          Select one of the roles below
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "12px",
            marginBottom: 25
          }}
        >
          {["Student", "Teacher", "Admin"].map((r) => (
            <div
              key={r}
              onClick={() => handleRole(r)}
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                cursor: "pointer",
                background: role === r ? "#4f46e5" : "#e5e7eb",
                color: role === r ? "white" : "black",
                boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
                transition: "0.25s",
                userSelect: "none",
                fontWeight: 600
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              {r}
            </div>
          ))}
        </div>
        {role && (
          <form onSubmit={handleSubmit}>
            <h3 style={{ marginBottom: 20 }}>Login as {role}</h3>

            <label className="small">Username</label>
            <input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 14,
                borderRadius: 8,
                border: "1px solid #ccc"
              }}
            />

            <label className="small">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={{
                width: "100%",
                padding: 10,
                marginBottom: 14,
                borderRadius: 8,
                border: "1px solid #ccc"
              }}
            />

            {role === "Student" && (
              <>
                <label className="small">Classroom</label>
                <input
                  value={form.classroom}
                  onChange={(e) =>
                    setForm({ ...form, classroom: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: 10,
                    marginBottom: 14,
                    borderRadius: 8,
                    border: "1px solid #ccc"
                  }}
                />
              </>
            )}

            <button
              type="submit"
              style={{
                width: "100%",
                padding: "12px",
                background: "#4f46e5",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                marginTop: 10,
                boxShadow: "0 3px 8px rgba(0,0,0,0.20)",
                transition: "0.3s"
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.03)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Login
            </button>

            {error && (
              <p style={{ color: "red", marginTop: 10 }}>{error}</p>
            )}

            <div className="small" style={{ marginTop: 15, fontSize: 13 }}>
              <strong>Sample Logins:</strong>
              <div>Student: student1 / pass123</div>
              <div>Teacher: teacher1 / teach123</div>
              <div>Admin: admin / admin123</div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
