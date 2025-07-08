import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { supabase } from '../supabaseClient';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) navigate('/home');
    };
    checkSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        navigate('/home');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error, data } = await supabase.auth.signInWithPassword({
      email: form.email,
      password: form.password,
    });

    if (error) {
      alert(error.message);
    } else {
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/home');
    }
  };

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

  const imageStyle = {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid rgba(255, 255, 255, 0.5)',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
    marginBottom: '20px'
  };


  return (
    <div className="login-card" style={cardStyle}>
      {/* Circular Image */}
      <img src={require('../assets/me.jpg')} alt="Profile" style={imageStyle} />

      {/* Reclaim IT Title */}
      <div className='welcome-msg'> Welcome Back !!</div>

      <form onSubmit={handleLogin}>
        <input className='input-field' type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className='input-field' type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit" className="form-button" style={buttonStyle}>Login</button>
      </form>

      <p className="signup-text">
        Don't have an account? <Link to="/register" className="signup-link">Sign Up</Link>
      </p>
    </div>
  );
};

export default Login;
