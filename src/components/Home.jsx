import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Home = () => {
  const navigate=useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const sidebarStyle = {
    background: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    borderRight: '1px solid rgba(255, 255, 255, 0.3)',
    width: isSidebarOpen ? '220px' : '60px',
    padding: '50px 0',
    color: 'black',
    transition: 'width 0.3s ease',
    overflow: 'hidden'
  };

  const sidebarItemStyle = {
    padding: '15px 18px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    cursor: 'pointer',
    transition: 'background 0.3s ease, transform 0.3s ease',
    color: 'black'
  };

  const mainContentStyle = {
    flex: 1,
    padding: '20px 150px 130px',
    overflowY: 'auto',
    color: '#fff'
  };

  const topBarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backdropFilter: 'blur(8px)',
    padding: '10px 20px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.1)',
    marginBottom: '20px'
  };

  const buttonStyle = {
    padding: '20px 25px',
    borderRadius: '10px',
    background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
  };

  return (
    <div className="home-wrapper">
      {/* Sidebar */}
      <aside style={sidebarStyle}>
        <button onClick={toggleSidebar} className="sidebar-toggle-btn">
          <i className="fas fa-bars"></i>
        </button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={sidebarItemStyle}><i className="fas fa-search"></i>{isSidebarOpen && ' My Lost Posts'}</li>
          <li style={sidebarItemStyle}><i className="fas fa-box"></i>{isSidebarOpen && ' My Found Posts'}</li>
          <li style={sidebarItemStyle}><i className="fas fa-handshake"></i>{isSidebarOpen && ' Claim Requests'}</li>
          <li style={sidebarItemStyle}><i className="fas fa-cog"></i>{isSidebarOpen && ' Settings'}</li>
          <li style={sidebarItemStyle}><i className="fas fa-sign-out-alt"></i>{isSidebarOpen && ' Logout'}</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={mainContentStyle}>
        {/* Top Bar */}
        <div style={topBarStyle}>
          <h2>Welcome to Reclaim IT!</h2>
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>

        {/* Options Panel */}
        <div className="home-options-panel">
          <input className="home-search-bar" type="text" placeholder="🔍 Search Lost/Found Items..." />
          <button style={buttonStyle}>Filters</button>
          <button style={buttonStyle}>Report Fraud</button>
          <button style={buttonStyle}>Messages</button>
          <button style={buttonStyle}>Notifications</button>
        </div>

        {/* Action Buttons */}
        <div className="home-action-buttons">
            <button className="home-action-btn" onClick={() => navigate('/report-lost')}>
    Report Lost Item
  </button>
          <button className="home-action-btn" onClick={() => navigate('/report-found')}>
  Report Found Item
</button>
</div>
        {/* Latest Lost & Found Slider */}
        <div className="home-slider-section">
          <h3>Latest Lost & Found</h3>
          <div className="home-card-slider">
            <div className="home-item-card">
              <img src="https://via.placeholder.com/100" alt="Item" />
              <p>Lost: Wallet</p>
              <p>Location: Campus</p>
            </div>
            <div className="home-item-card">
              <img src="https://via.placeholder.com/100" alt="Item" />
              <p>Found: Keys</p>
              <p>Location: Library</p>
            </div>
            <div className="home-item-card">
              <img src="https://via.placeholder.com/100" alt="Item" />
              <p>Lost: Phone</p>
              <p>Location: Cafeteria</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="home-stats-section">
          <div className="home-stat-card">
            <h4>Total Items Returned</h4>
            <p>125</p>
          </div>
          <div className="home-stat-card">
            <h4>Active Users</h4>
            <p>58</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
