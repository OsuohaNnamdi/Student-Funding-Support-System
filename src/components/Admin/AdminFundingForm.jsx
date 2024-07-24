import React, { useState } from 'react';
import './AddScholarshipForm.css';
import Back from '../common/back/Back';

const AddScholarshipForm = () => {
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    numStudents: '',
    totalAmount: '',
    paymentMethod: '',
    comments: '',
    image: null // New state for image
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add the logic to submit the form data to the backend
    console.log('Form data submitted:', formData);
  };

  return (
    <>
    <Back title='Add ScholarShip'/>
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
          <label htmlFor="image">Upload Donor Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn">Add Scholarship</button>
      </form>
    </div>
    </>
  );
};

export default AddScholarshipForm;
