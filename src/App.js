import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ReportLostItem from './components/ReportLostItem';
import ReportFoundItem from './components/ReportFoundItem';


function App() {
  return (
    <Router>
      <Routes>
        {/* Login & Register use the background layout */}
        <Route path="/" element={
          <div className="app">
            <div className="left-panel">
              <div className="top-links">
                <a href="#">About Us</a>
                <a href="#">Contact Us</a>
              </div>
              <h1 className="site-title">Reclaim IT</h1>
            </div>
            <Login />
          </div>
        } />

        <Route path="/register" element={
          <div className="app">
            <div className="left-panel">
              <div className="top-links">
                <a href="#">About Us</a>
                <a href="#">Contact Us</a>
              </div>
              <h1 className="site-title">Reclaim IT</h1>
            </div>
            <Register />
          </div>
        } />
        
        <Route path="/home" element={<Home />} />

        <Route path="/report-lost" element={<ReportLostItem />} />
        <Route path="/report-found" element={<ReportFoundItem/>} />
        
      </Routes>
    </Router>
    
  );
}

export default App;
