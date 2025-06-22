import React, { useState } from 'react';
import '../App.css';

const ReportLostItem = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    category: '',
    dateLost: '',
    location: '',
    photo: null,
    contactInfo: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Lost Item Report Submitted:', formData);
    // You can handle form submission here (API call etc.)
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
          type="file"
          name="photo"
          accept="image/*"
          onChange={handleChange}
          className="input-field"
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
        <button type="submit" style={buttonStyle}>Submit Lost Item Report</button>
      </form>
    </div>
  );
};

export default ReportLostItem;
