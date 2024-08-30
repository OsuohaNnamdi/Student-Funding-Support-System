import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 styles
import axiosInstance from '../Auth/axiosInstance';
import './FundsForm.css';

const FundsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    amount: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Manage loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true

    try {
      await axiosInstance.post('/fund/add', formData);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Fund added successfully!',
      });
      setFormData({
        name: '',
        contact: '',
        amount: '',
        description: ''
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add fund.',
      });
      setError('Failed to add fund.');
    } finally {
      setLoading(false); // Reset loading state
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

        <button type="submit" className="submit-btn">
          {loading ? (
            <div
              style={{
                border: '4px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '50%',
                borderTop: '4px solid #3498db',
                width: '20px',
                height: '20px',
                animation: 'spin 1s linear infinite',
              }}
            />
          ) : (
            'Add Fund'
          )}
        </button>
      </form>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default FundsForm;
