import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css';

const AuthPage = ({ onLogin }) => {
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/authenticate', {
        username: loginUsername,
        password: loginPassword,
      });

      console.log('Login response:', response);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('role', response.data.role);
      localStorage.setItem('user', JSON.stringify(response.data));

      onLogin();
      if (response.data.role === 'USER') {
        navigate('/home');
      } else {
        navigate('/adminhome');
      }

      alert('You have been successfully logged in!');
    } catch (error) {
      console.error('Login failed:', error.message);
      alert('Invalid login, try again.');
    }
  };

  const handleRegister = async () => {
    if (!isPasswordValid(registerPassword)) {
      alert(
        'Password must be at least 8 characters long, including one uppercase letter and one special character.'
      );
      return;
    }

    if (!isUsernameValid(registerUsername)) {
      alert('Username is required.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register', {
        username: registerUsername,
        password: registerPassword,
      });

      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert('Registration successful!');
        setRegisterUsername('');
        setRegisterPassword('');
      }
    } catch (error) {
      console.error('Registration failed:', error.message);
      setRegisterUsername('');
      setRegisterPassword('');
      alert('Registration failed');
    }
  };

  const isPasswordValid = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{8,})$/;
    return passwordRegex.test(password);
  };

  const isUsernameValid = (username) => {
    return username.trim() !== '';
  };

  return (
    <div className="auth-container">
      <div className="login-container">
        <h2>Login</h2>
        <label className="auth-label-container">
          Username:
          <input
            type="text"
            value={loginUsername}
            onChange={(e) => setLoginUsername(e.target.value)}
            className="auth-input-container"
          />
        </label>
        <br />
        <label className="auth-label-container">
          Password:
          <input
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="auth-input-container"
          />
        </label>
        <br />
        <button onClick={handleLogin} className="auth-button-container">
          Login
        </button>
      </div>
      <div className="register-container">
        <h2>Register</h2>
        <label className="auth-label-container">
          Username:
          <input
            type="text"
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            className="auth-input-container"
          />
        </label>
        <br />
        <label className="auth-label-container">
          Password:
          <input
            type="password"
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            className="auth-input-container"
          />
        </label>
        <br />
        <button onClick={handleRegister} className="auth-button-container">
          Register
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
