import React, { useState } from 'react';

const Studentsidebar = ({ collapsed = false }) => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'learning', label: 'My Learning', icon: '📚' },
    { id: 'lessons', label: 'Lessons', icon: '📖' },
    { id: 'quizzes', label: 'Quizzes', icon: '❓' },
    { id: 'challenges', label: 'Challenges', icon: '🏆' },
    { id: 'badges', label: 'Badges', icon: '🎖️' },
    { id: 'logout', label: 'Logout', icon: '🚪' }
  ];

  const handleItemClick = (item) => {
    setActiveItem(item.label);
    if (item.id === 'logout') {
      console.log('Logging out...');
    }
  };

  return (
    <div className={`sidebar student-sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!collapsed && (
          <div className="sidebar-title">
            <h2>Student Menu</h2>
            <div className="user-info">
              <div className="user-avatar">👨‍🎓</div>
              <span className="user-name">Student User</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="sidebar-title-collapsed">
            <div className="user-avatar-small">👨‍🎓</div>
          </div>
        )}
      </div>

      <nav className="sidebar-nav">
        <ul className="nav-menu">
          {menuItems.map((item) => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link ${activeItem === item.label ? 'active' : ''}`}
                onClick={() => handleItemClick(item)}
                title={collapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!collapsed && (
                  <span className="nav-label">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Studentsidebar;
