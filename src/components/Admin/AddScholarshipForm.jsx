import React, { useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 styles
import './AddScholarshipForm.css';
import Back from '../common/back/Back';
import axiosInstance from '../Auth/axiosInstance';

const AddScholarshipForm = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    numStudents: '',
    totalAmount: '',
    paymentMethod: '',
    comments: '',
    document: null
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, document: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData();
    form.append('donorName', formData.donorName);
    form.append('email', formData.email);
    form.append('numStudents', formData.numStudents);
    form.append('totalAmount', formData.totalAmount);
    form.append('paymentMethod', formData.paymentMethod);
    form.append('comments', formData.comments);
    if (formData.document) {
      form.append('document', formData.document);
    }

    try {
      Swal.fire({
        title: 'Processing...',
        text: 'Please wait while we process your request.',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const response = await axiosInstance.post('/sponsorships/add', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: response.data.message || 'Scholarship added successfully.'
      });
    } catch (error) {
      console.error('Error adding sponsorship:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to add sponsorship'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Back title='Add Scholarship'/>
      <div className="add-scholarship-form-container">
        <h2>Add New Scholarship</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="donorName">Donor Name</label>
            <input
              type="text"
              id="donorName"
              name="donorName"
              value={formData.donorName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="numStudents">Number of Students</label>
            <input
              type="number"
              id="numStudents"
              name="numStudents"
              value={formData.numStudents}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount</label>
            <input
              type="number"
              step="0.01"
              id="totalAmount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="paymentMethod">Payment Method</label>
            <input
              type="text"
              id="paymentMethod"
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="document">Upload Document</label>
            <input
              type="file"
              id="document"
              name="document"
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading && (
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  border: '4px solid rgba(0, 0, 0, 0.1)',
                  borderRadius: '50%',
                  borderTop: '4px solid #3498db',
                  width: '20px',
                  height: '20px',
                  animation: 'spin 1s linear infinite',
                }}
              />
            )}
            {loading ? 'Adding...' : 'Add Scholarship'}
          </button>
        </form>
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default AddScholarshipForm;
