import React, { useState } from 'react';
import '../App.css';
import { supabase } from '../supabaseClient';

const ReportLostItem = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    dateLost: '',
    location: '',
    contactInfo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Lost Item Report Submitted:', formData);
    // You can handle form submission here (API call etc.)
    const { error } = await supabase
    .from('lost_items')
    .insert([
      {
        itemName: formData.itemName,
        description: formData.description,
        category: formData.category,
        dateLost: formData.dateLost,
        location: formData.location,
        contactInfo: formData.contactInfo,
      },
    ]);

  if (error) {
    alert('Failed to submit lost item: ' + error.message);
  } else {
    alert('Lost item submitted successfully!');
    setFormData({
      itemName: '',
      description: '',
      category: '',
      dateLost: '',
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
      <h1 className="report-lost-title">Report Lost Item</h1>
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
          <option value="Others">Others</option>
        </select>
        <input
          type="date"
          name="dateLost"
          value={formData.dateLost}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location Lost"
          value={formData.location}
          onChange={handleChange}
          className="input-field"
          required
        />
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Information"
          value={formData.contactInfo}
          onChange={handleChange}
          className="input-field"
          required
        />
        <button type="submit" style={buttonStyle} onClick={handleSubmit}>Submit Lost Item Report</button>
      </form>
    </div>
  );
};

export default ReportLostItem;
