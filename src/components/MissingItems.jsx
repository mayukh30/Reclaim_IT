import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';

const MissingItems = () => {
  const [lostItems, setLostItems] = useState([]);

  useEffect(() => {
    const fetchLostItems = async () => {
      const { data, error } = await supabase
        .from('lost_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching lost items:', error);
      } else {
        setLostItems(data);
      }
    };

    fetchLostItems();
  }, []);

  const handleClaim = async (itemId) => {
    const { data, error } = await supabase
      .from('lost_items')
      .update({ claimed: true })
      .eq('id', itemId);

    if (error) {
      console.error('Failed to claim item:', error);
    } else {
      setLostItems((prevItems) =>
        prevItems.map((item) =>
          item.id === itemId ? { ...item, claimed: true } : item
        )
      );
    }
  };

  return (
    <div className="missing-items-wrapper">
      <h2 className="missing-items-title">Reported Missing Items</h2>
      <div className="missing-items-container">
        {lostItems.length === 0 ? (
          <p style={{ color: 'white' }}>No lost items reported yet.</p>
        ) : (
          lostItems.map((item) => (
            <div className="missing-item-card" key={item.id}>
              <h3>{item.itemName}</h3>
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Category:</strong> {item.category}</p>
              <p><strong>Date Lost:</strong> {item.dateLost}</p>
              <p><strong>Location:</strong> {item.location}</p>
              <p><strong>Contact Info:</strong> {item.contactInfo}</p>
              <button
                className="claim-btn"
                onClick={() => handleClaim(item.id)}
                disabled={item.claimed}
              >
                {item.claimed ? 'Claimed' : 'Claim'}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MissingItems;