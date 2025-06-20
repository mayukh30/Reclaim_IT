import React from 'react';
import './App.css';
import Login from './components/Login';

function App() {
  return (
    <div className="app">
      <div className="left-panel">
        <div className="top-links">
          <a href="#">About Us</a>
          <a href="#">Contact Us</a>
        </div>
        <h1 className="site-title" >Reclaim IT</h1>
      </div>
      <Login />
    </div>
  );
}

export default App;
