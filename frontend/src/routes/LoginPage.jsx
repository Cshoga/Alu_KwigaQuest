import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleUsers } from "../data/sampleData";
import { login as apiLogin } from "../services/api";

export default function LoginPage() {
  const [role, setRole] = useState(null);
  const [form, setForm] = useState({ username: "", password: "", classroom: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRole = (r) => {
    setRole(r);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      try {
        const res = await apiLogin(form.username, form.password);
        if (res.role === "student") navigate("/student-dashboard");
        else if (res.role === "teacher") navigate("/teacher-dashboard");
        else if (res.role === "admin") navigate("/admin-dashboard");
        return;
      } catch {}

      let pool =
        role === "Student"
          ? sampleUsers.students
          : role === "Teacher"
          ? sampleUsers.teachers
          : [sampleUsers.admin];

      const match = pool.find(
        (u) => u.username === form.username && u.password === form.password
      );

      if (!match) {
        setError("Invalid credentials");
        return;
      }

      if (role === "Student") navigate("/student-dashboard");
      else if (role === "Teacher") navigate("/teacher-dashboard");
      else navigate("/admin-dashboard");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Choose Your Role</h2>
        <p className="login-subtitle">Select one of the roles below</p>

        <div className="role-select-row">
          {["Student", "Teacher", "Admin"].map((r) => (
            <div
              key={r}
              className={`role-option ${role === r ? "active-role" : ""}`}
              onClick={() => handleRole(r)}
            >
              {r}
            </div>
          ))}
        </div>

        {role && (
          <form onSubmit={handleSubmit} className="login-form-card">
            <h3>Login as {role}</h3>

            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                className="form-input"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            {role === "Student" && (
              <div className="form-group">
                <label className="form-label">Classroom</label>
                <input
                  className="form-input"
                  value={form.classroom}
                  onChange={(e) => setForm({ ...form, classroom: e.target.value })}
                />
              </div>
            )}

            <button type="submit" className="login-submit">
              Login
            </button>

            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
}
