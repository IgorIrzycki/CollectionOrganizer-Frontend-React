import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Option.css';

const Option = ({ to, label, description }) => {
  return (
    <div className="navigation-option">
      <Link to={to}>
        <h3>{label}</h3>
        <p>{description}</p>
      </Link>
    </div>
  );
};

export default Option;
