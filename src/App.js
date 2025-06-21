import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="left-panel">
          <div className="top-links">
            <a href="#">About Us</a>
            <a href="#">Contact Us</a>
          </div>
          <h1 className="site-title">Reclaim IT</h1>
        </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
