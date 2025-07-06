import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';

const FoundItems = () => {
  const [foundItems, setFoundItems] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserAndItems = async () => {
      // Get logged-in user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      // Fetch all found items with reporter id
      const { data, error } = await supabase
        .from('found_items')
        .select('*') // Should include reporter_id / user_id
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching found items:', error);
      else setFoundItems(data);
    };

    fetchUserAndItems();
  }, []);

  const handleClaim = async (item) => {
    if (!user) {
      alert('Please login to claim.');
      return;
    }

    // Insert into claim_requests table
    const { error: insertError } = await supabase.from('claim_requests').insert({
      item_id: item.id,
      item_name: item.item_name,
      claimer_id: user.id,
      reporter_id: item.user_id || item.reporter_id, // Make sure this is fetched
      status: 'pending',
    });

    if (insertError) {
      console.error('Error creating claim request:', insertError);
      alert('Failed to claim item. Try again.');
    } else {
      alert('Claim request sent to the reporter.');
    }
  };

  return (
    <div className="found-items-wrapper">
      <h2 className="found-items-title">Reported Found Items</h2>
      <div className="found-items-container">
        {foundItems.map((item) => (
          <div key={item.id} className="found-item-card">
            <h4>{item.item_name}</h4>
            <p><strong>Location:</strong> {item.location}</p>
            <p><strong>Date:</strong> {item.date_found}</p>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Status:</strong> {item.is_claimed ? 'Claimed' : 'Unclaimed'}</p>
            {!item.is_claimed && user && (
              <button className="claim-btn" onClick={() => handleClaim(item)}>Claim</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoundItems;
