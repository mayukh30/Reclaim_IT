import React from 'react';
import '../App.css';

const Login = () => {
  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    padding: '50px',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    textAlign: 'center',
    width: '400px',
    color: '#fff'
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    marginTop: '20px',
    background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
    border: 'none',
    borderRadius: '8px',
    color: '#fff',
    fontSize: '16px',
    cursor: 'pointer'
  };

  return (
    <div className="login-card" style={cardStyle}>
      <h2 className="welcome-msg">Welcome to Reclaim IT</h2>
      <form>
        <input 
          className='input-field' 
          type="text" 
          placeholder="Username" 
          required 
        />
        <input 
          className='input-field' 
          type="password" 
          placeholder="Password" 
          required 
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      <p className="signup-text">
        Don't have an account? <a href="#" className="signup-link">Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
