import React from 'react';
import { useNavigate } from 'react-router-dom';
import Option from '../components/Option';
import '../styles/Home.css';

const AdminHome = () => {
  const navigate = useNavigate();

  const options = [
    {
      to: '/manage-database',
      label: 'Manage Database',
      description: 'Add, remove, or update categories and sets',
    },
    {
      to: '/manage-users',
      label: 'Manage Users',
      description: 'Change user roles and permissions',
    },
    {
      to: '/monitor-activity',
      label: 'Monitor Activity',
      description: 'Track and monitor user activities',
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="home-container">
      <div className="welcome-container">
        <h2 className="welcome-text">Welcome, Admin!</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="navigation-options">
        {options.map((option, index) => (
          <Option
            key={index}
            to={option.to}
            label={option.label}
            description={option.description}
          />
        ))}
      </div>
    </div>
  );
};

export default AdminHome;
