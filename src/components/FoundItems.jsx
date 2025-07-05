import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchFoundItems = async () => {
      const { data, error } = await supabase
        .from('found_items')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching items:', error);
      else setFoundItems(data);
    };

    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    fetchFoundItems();
    getUser();
  }, []);

  const handleClaim = async (itemId) => {
    if (!user) return alert("Please login to claim.");

    const { error } = await supabase
      .from('found_items')
      .update({
        claimed: true,
        claimed_by: user.email
      })
      .eq('id', itemId);

    if (error) {
      console.error('Error claiming item:', error);
    } else {
      setFoundItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, claimed: true, claimed_by: user.email } : item
        )
      );
    }
  };

  return (
    <div className="found-items-wrapper">
      <h2 className="found-items-title">Reported Found Items</h2>
      <div className="found-items-container">
        {foundItems.map(item => (
          <div key={item.id} className="found-item-card">
            <h4>{item.item_name}</h4>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Date:</strong> {item.date_found}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Status:</strong> {item.claimed ? `Claimed by ${item.claimed_by}` : 'Unclaimed'}</p>
            {!item.claimed && (
              <button className="claim-btn" onClick={() => handleClaim(item.id)}>Claim</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoundItems;
