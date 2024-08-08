import React, { useState } from 'react';
import './FundsForm.css'; 
import axiosInstance from '../Auth/axiosInstance';

const FundsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    amount: '',
    description: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/fund/add', formData);
      alert('Fund added successfully!');
      setFormData({
        name: '',
        contact: '',
        amount: '',
        description: ''
      });
    } catch (err) {
      setError('Failed to add fund.');
    }
  };

  return (
    <div className="funds-form-container">
      <h2>Add New Fund</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="contact">Contact:</label>
        <input
          type="text"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <label htmlFor="amount">Amount:</label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>

        <button type="submit">Add Fund</button>
      </form>
    </div>
  );
};

export default FundsForm;
