import React, { useState } from 'react';
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
    document: null  // Changed from 'logo' to 'document'
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, document: files[0] });  // Changed from 'logo' to 'document'
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('donorName', formData.donorName);
    form.append('email', formData.email);
    form.append('numStudents', formData.numStudents);
    form.append('totalAmount', formData.totalAmount);
    form.append('paymentMethod', formData.paymentMethod);
    form.append('comments', formData.comments);
    if (formData.document) {  // Changed from 'logo' to 'document'
      form.append('document', formData.document);
    }

    try {
      const response = await axiosInstance.post('/sponsorships/add', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data); // Display response message
    } catch (error) {
      console.error('Error adding sponsorship:', error);
      alert('Failed to add sponsorship');
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
            <label htmlFor="document">Upload Document</label> {/* Changed label to 'Upload Document' */}
            <input
              type="file"
              id="document"   // Changed from 'logo' to 'document'
              name="document" // Changed from 'logo' to 'document'
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="submit-btn">Add Scholarship</button>
        </form>
      </div>
    </>
  );
};

export default AddScholarshipForm;
