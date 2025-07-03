import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';
import { supabase } from '../supabaseClient';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  // Detect successful login or signup (Email or Google)
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

  const handleRegister = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
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

  const handleGoogleSignup = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) alert(error.message);
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

  const googleButtonStyle = {
    width: '100%',
    padding: '12px',
    marginTop: '15px',
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: '8px',
    color: '#333',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'box-shadow 0.3s ease'
  };

  return (
    <div className="login-card" style={cardStyle}>
      <h2 className="welcome-msg">Create Your Account</h2>
      <form onSubmit={handleRegister}>
        <input className='input-field' type="text" placeholder="Email ID" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className='input-field' type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <button type="submit" style={buttonStyle}>Register</button>
      </form>
      <p className="signup-text">or</p>
      <button onClick={handleGoogleSignup} style={googleButtonStyle}>
        <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google Icon" width="20" height="20" />
        Sign Up with Google
      </button>
      <p className="signup-text">
        Already have an account? <Link to="/" className="signup-link">Login</Link>
      </p>
    </div>
  );
};

export default Register;
