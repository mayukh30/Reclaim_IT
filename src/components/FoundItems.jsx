import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFoundItems = async () => {
      const { data, error } = await supabase
        .from('found_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching found items:', error.message);
        setFoundItems([]);
      } else {
        setFoundItems(data);
      }
      setLoading(false);
    };

    fetchFoundItems();
  }, []);

  return (
    <div className="found-items-wrapper">
      <h2 className="found-items-title">Reported Found Items</h2>

      {loading ? (
        <p style={{ color: '#fff', textAlign: 'center' }}>Loading...</p>
      ) : foundItems.length === 0 ? (
        <p style={{ color: '#fff', textAlign: 'center' }}>No found items reported yet.</p>
      ) : (
        <div className="found-items-container">
          {foundItems.map((item) => (
            <div key={item.id} className="found-item-card">
              <h3>{item.itemName}</h3>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Date Found:</strong> {item.dateFound}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Contact:</strong> {item.contactInfo}</p>
              <button className="claim-btn">Claim</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoundItems;
