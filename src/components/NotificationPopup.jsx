import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';

const NotificationPopup = ({ onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from('claim_requests')
        .select('*')
        .eq('reporter_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (!error) setNotifications(data);
      setLoading(false);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="notification-popup">
      <div className="notification-popup-inner">
        <button className="close-btn" onClick={onClose}>
          &times;
        </button>
        <h3>Notifications</h3>
        {loading ? (
          <p>Loading...</p>
        ) : notifications.length === 0 ? (
          <p>No new claim requests.</p>
        ) : (
          <ul className="notification-list">
            {notifications.map((n) => (
              <li key={n.id} className="notification-item" color='white'>
                Someone claimed: <strong>{n.item_name}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default NotificationPopup;
