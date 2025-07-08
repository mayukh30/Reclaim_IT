import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { supabase } from '../supabaseClient';
import NotificationPopup from './NotificationPopup';

function timeSince(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const seconds = Math.floor((now - past) / 1000);
  const intervals = [
    { label: 'year', value: 31536000 },
    { label: 'month', value: 2592000 },
    { label: 'day', value: 86400 },
    { label: 'hour', value: 3600 },
    { label: 'minute', value: 60 },
    { label: 'second', value: 1 }
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.value);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? 's' : ''} ago`;
    }
  }
  return "just now";
}

const Home = () => {
  const [user, setUser] = useState(null);
  const [lostItems, setLostItems] = useState([]);
  const [foundItems, setFoundItems] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [totalReturned, setTotalReturned] = useState(0);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    navigate('/');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  const fetchTotalReturned = async () => {
    const { count, error } = await supabase
      .from('found_items')
      .select('id', { count: 'exact', head: true })
      .eq('is_claimed', true);

    if (!error) {
      setTotalReturned(count || 0);
    } else {
      console.error('Error fetching total returned items:', error.message);
    }
  };

  const fetchItems = async () => {
    const { data: lostData } = await supabase
      .from('lost_items')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(4);

    const { data: foundData } = await supabase
      .from('found_items')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(4);

    if (lostData) setLostItems(lostData);
    if (foundData) setFoundItems(foundData);
  };

  const fetchUserSession = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/');
    } else {
      setUser(session.user);
    }
  };

  useEffect(() => {
    fetchUserSession();
    fetchItems();
    fetchTotalReturned();
  }, []);

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
        <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="sidebar-toggle-btn">
          <i className="fas fa-bars"></i>
        </button>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={sidebarItemStyle} onClick={() => navigate('/lost-items')}><i className="fas fa-search"></i>{isSidebarOpen && ' Lost Items'}</li>
          <li style={sidebarItemStyle} onClick={() => navigate('/found-items')}><i className="fas fa-box"></i>{isSidebarOpen && ' Found Items'}</li>
          <li style={sidebarItemStyle} onClick={() => navigate('/claim-requests')}><i className="fas fa-handshake"></i>{isSidebarOpen && ' Claim Requests'}</li>
          <li style={sidebarItemStyle} onClick={() => navigate('/about')}><i className="fas fa-user"></i>{isSidebarOpen && ' About Me'}</li>
          <li style={sidebarItemStyle} onClick={handleLogout}><i className="fas fa-sign-out-alt"></i>{isSidebarOpen && ' Logout'}</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={mainContentStyle}>
        <div style={topBarStyle}>
          <h2>{user ? `Hello !! ${user.email}` : 'Loading...'}</h2>
          <div className="profile-icon">
            <i className="fas fa-user-circle"></i>
          </div>
        </div>

        {showNotifications && <NotificationPopup onClose={toggleNotifications} />}

        <div className="home-options-panel">
          <input className="home-search-bar" type="text" placeholder="🔍 Search Lost/Found Items..." />
          <button style={buttonStyle} onClick={() => navigate('/about')}>About Me</button>
          <button style={buttonStyle} onClick={toggleNotifications}>Notifications</button>
        </div>

        <div className="home-action-buttons">
          <button className="home-action-btn" onClick={() => navigate('/report-lost')}>Report Lost Item</button>
          <button className="home-action-btn" onClick={() => navigate('/report-found')}>Report Found Item</button>
        </div>

        <div className="slider-section">
          <h3 style={{ color: 'white' }}>Latest Lost Items</h3>
          <div className="card-slider">
            {lostItems.map(item => (
              <div className="item-card" key={item.id}>
                <h4>{item.itemName}</h4>
                <p>{item.category}</p>
                <p style={{ fontSize: '12px', color: '#ccc' }}>{timeSince(item.created_at)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="slider-section">
          <h3 style={{ color: 'white' }}>Latest Found Items</h3>
          <div className="card-slider">
            {foundItems.map(item => (
              <div className="item-card" key={item.id}>
                <h4>{item.item_name}</h4>
                <p>{item.category}</p>
                <p style={{ fontSize: '12px', color: '#ccc' }}>{timeSince(item.created_at)}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="home-stats-section">
          <div className="home-stat-card">
            <h4>Total Items Returned</h4>
            <p>{totalReturned}</p>
          </div>
          <div className="home-stat-card">
            <h4>Total Found Items</h4>
            <p>123</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
