import React from 'react';
import { useNavigate } from 'react-router-dom';
import Option from '../components/Option';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  const options = [
    {
      to: '/browse-items',
      label: 'Browse Items',
      description: 'Explore available items',
    },
    {
      to: '/your-collection',
      label: 'Your Collection',
      description: 'View and manage your collection',
    },
    {
      to: '/shared-collections',
      label: 'Shared Collections',
      description: 'Discover collections shared by others',
    },
    {
      to: '/trade-offers',
      label: 'Trade Offers',
      description: 'Check and manage trade offers from other users',
    },
    {
      to: '/compare-collections',
      label: 'Compare Collections',
      description: 'Compare your collection with others and make trade offers',
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="home-container">
      <div className="welcome-container">
        <h2 className="welcome-text">Welcome, {localStorage.getItem('username')}!</h2>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
      <div className="navigation-options">
        {options.map((option) => (
          <Option
            key={option.to}
            to={option.to}
            label={option.label}
            description={option.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
