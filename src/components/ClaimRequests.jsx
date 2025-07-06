import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import '../App.css';

const ClaimRequests = () => {
  const [requests, setRequests] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchRequests = async () => {
      if (!userId) return;
      const { data, error } = await supabase
        .from('claim_requests')
        .select(`id,item_id,status,claimer_id,found_items (item_name,description )`)
        .eq('reporter_id', userId);
      if (error) console.error('Error fetching requests:', error);
      else setRequests(data);
    };

    fetchRequests();
  }, [userId]);

  const handleDecision = async (id, decision) => {
    const { error: updateError } = await supabase
      .from('claim_requests')
      .update({ status: decision })
      .eq('id', id);

    if (!updateError && decision === 'approved') {
      const request = requests.find((r) => r.id === id);
      await supabase.from('found_items').update({ is_claimed: true }).eq('id', request.item_id);
    }

    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: decision } : r))
    );
  };

  return (
    <div className="claim-requests-wrapper">
      <h2 className='xyzh2'>Claim Requests</h2>
      {requests.length === 0 ? (
        <p>No claim requests found.</p>
      ) : (
        <div className="claim-requests-container">
          {requests.map((req) => (
            <div key={req.id} className="claim-request-card">
              <p><strong>Item:</strong> {req.found_items?.itemName}</p>
              <p><strong>Description:</strong> {req.found_items?.description}</p>
              <p><strong>Claimer ID:</strong> {req.claimer_id}</p>
              <p><strong>Status:</strong> {req.status}</p>
              {req.status === 'pending' && (
                <div>
                  <button className="approve-btn" onClick={() => handleDecision(req.id, 'approved')}>
                    Approve
                  </button>
                  <button className="reject-btn" onClick={() => handleDecision(req.id, 'rejected')}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClaimRequests;
