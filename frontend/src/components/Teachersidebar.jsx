import React, { useState } from 'react';

const TeacherSidebar = ({ role = "Teacher", collapsed = false }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'courses', label: 'My Courses', icon: '📚' },
    { id: 'lessons', label: 'Lesson Plans', icon: '📖' },
    { id: 'quizzes', label: 'Quizzes', icon: '❓' },
    { id: 'assignments', label: 'Assignments', icon: '📝' },
    { id: 'gradebook', label: 'Gradebook', icon: '📋' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'students', label: 'Students', icon: '👨‍🎓' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'resources', label: 'Resources', icon: '🗂️' },
    { id: 'logout', label: 'Logout', icon: '🚪' }
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.label);
    if (item.id === 'logout') {
      // Handle logout logic here
      console.log('Logging out...');
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar teacher-sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="sidebar-title">
            <h2>{role} Portal</h2>
            <div className="user-info">
              <div className="user-avatar">👩‍🏫</div>
              <div className="user-details">
                <span className="user-name">Professor Smith</span>
                <span className="user-role">Mathematics Department</span>
              </div>
            </div>
          </div>
        )}
        {isCollapsed && (
          <div className="sidebar-title-collapsed">
            <div className="user-avatar-small">👩‍🏫</div>
          </div>
        )}
        
        <button 
          className="sidebar-collapse-btn"
          onClick={toggleSidebar}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? '›' : '‹'}
        </button>
      </div>

      {/* Quick Stats - Only show when not collapsed */}
      {!isCollapsed && (
        <div className="teacher-quick-stats">
          <div className="stat-item">
            <div className="stat-number">42</div>
            <div className="stat-label">Students</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">8</div>
            <div className="stat-label">Courses</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15</div>
            <div className="stat-label">Pending</div>
          </div>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeItem === item.label ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && (
                  <span className="nav-label">{item.label}</span>
                )}
                {/* Show badges for important items */}
                {!isCollapsed && (item.id === 'messages' || item.id === 'assignments') && (
                  <span className="nav-badge">
                    {item.id === 'messages' ? '3' : '5'}
                  </span>
                )}
                {activeItem === item.label && !isCollapsed && (
                  <span className="active-indicator"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      {!isCollapsed && (
        <div className="sidebar-footer">
          <div className="teacher-actions">
            <button className="action-btn primary">
              <span className="action-icon">➕</span>
              New Lesson
            </button>
            <button className="action-btn secondary">
              <span className="action-icon">📤</span>
              Export Grades
            </button>
          </div>
          <div className="system-status">
            <div className="status-item">
              <span className="status-dot online"></span>
              <span>System Online</span>
            </div>
            <div className="status-item">
              <span className="status-dot sync"></span>
              <span>Last sync: 2 min ago</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSidebar;
