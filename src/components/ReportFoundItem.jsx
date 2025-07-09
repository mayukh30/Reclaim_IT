import React, { useState, useEffect } from 'react';
import '../App.css';
import { supabase } from '../supabaseClient';

const ReportFoundItem = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    dateFound: '',
    location: '',
    contactInfo: ''
  });

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Please log in first to report a found item.');
      return;
    }

    const { error } = await supabase
      .from('found_items')
      .insert([
        {
          item_name: formData.itemName,
          description: formData.description,
          category: formData.category,
          date_found: formData.dateFound,
          location: formData.location,
          contactInfo: formData.contactInfo,
          reporter_id: user.id, // ✅ Save reporter's ID
          is_claimed: false     // optional default value
        }
      ]);

    if (error) {
      alert('Failed to submit found item: ' + error.message);
    } else {
      alert('Found item submitted successfully!');
      setFormData({
        itemName: '',
        description: '',
        category: '',
        dateFound: '',
        location: '',
        contactInfo: ''
      });
    }
  };

  const formCardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(12px)',
    borderRadius: '20px',
    padding: '30px',
    width: '500px',
    color: '#fff',
    margin: '40px auto',
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  };

  const buttonStyle = {
    padding: '12px 20px',
    borderRadius: '8px',
    background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    width: '100%',
    marginTop: '15px'
  };

  return (
    <div className="report-lost-wrapper">
      <h2 className="report-lost-title">Report Found Item</h2>
      <form onSubmit={handleSubmit} style={formCardStyle}>
        <input
          type="text"
          name="itemName"
          placeholder="Item Name"
          value={formData.itemName}
          onChange={handleChange}
          className="input-field"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="input-field"
          rows="3"
          required
        ></textarea>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="input-field"
          required
        >
          <option value="">Select Category</option>
          <option value="Electronics">Electronics</option>
          <option value="Books">Books</option>
          <option value="Documents">Documents</option>
          <option value="Medicine">Medicine</option>
          <option value="Garments">Garments</option>
          <option value="Cosmetics">Cosmetics</option>
          <option value="Sports Accessories">Sports Accessories</option>
          <option value="Food">Food</option>
          <option value="Others">Others</option>
        </select>
        <input
          type="date"
          name="dateFound"
          value={formData.dateFound}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location Found"
          value={formData.location}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Email ID"
          value={formData.contactInfo}
          onChange={handleChange}
          className="input-field"
          required
        />
        <button type="submit" style={buttonStyle}>Submit Found Item Report</button>
      </form>
    </div>
  );
};

export default ReportFoundItem;
