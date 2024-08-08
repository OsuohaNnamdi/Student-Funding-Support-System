import React, { useEffect, useState } from 'react';
import './SponsorshipTable.css'; 
import Modal from './Modal/Modal'
import axiosInstance from '../Auth/axiosInstance';

const SponsorshipTable = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const [selectedSponsorship, setSelectedSponsorship] = useState(null);
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    numStudents: '',
    totalAmount: '',
    paymentMethod: '',
    comments: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchSponsorships();
  }, []);

  const fetchSponsorships = async () => {
    try {
      const response = await axiosInstance.get('/sponsorships');
      setSponsorships(response.data);
      console.log(response);
    } catch (error) {
      console.error('Error fetching sponsorships:', error);
    }
  };

  const handleUpdateClick = async (sponsorship) => {
    setSelectedSponsorship(sponsorship);
    setFormData({
      donorName: sponsorship.donorName,
      email: sponsorship.email,
      numStudents: sponsorship.numStudents,
      totalAmount: sponsorship.totalAmount,
      paymentMethod: sponsorship.paymentMethod,
      comments: sponsorship.comments,
    });
    setIsModalOpen(true); 
  };

  const handleDeleteClick = async (id) => {
    try {
      await axiosInstance.delete(`/sponsorships/${id}`);
      fetchSponsorships(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting sponsorship:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/sponsorships/${selectedSponsorship.id}`, formData);
      fetchSponsorships(); 
      setIsModalOpen(false);
      setSelectedSponsorship(null); 
    } catch (error) {
      console.error('Error updating sponsorship:', error);
    }
  };

  return (
    <div className="sponsorship-table-container">
      <h2>Sponsorships List</h2>
      <table className="sponsorship-table">
        <thead>
          <tr>
            <th>Donor Name</th>
            <th>Email</th>
            <th>Number of Students</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sponsorships.map(sponsorship => (
            <tr key={sponsorship.id}>
              <td>{sponsorship.donorName}</td>
              <td>{sponsorship.email}</td>
              <td>{sponsorship.numStudents}</td>
              <td>{sponsorship.totalAmount}</td>
              <td>{sponsorship.paymentMethod}</td>
              <td>{sponsorship.comments}</td>
              <td>
                <button onClick={() => handleUpdateClick(sponsorship)}>Update</button>
                <button onClick={() => handleDeleteClick(sponsorship.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h3>Update Sponsorship</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="donorName">Donor Name</label>
            <input
              type="text"
              id="donorName"
              name="donorName"
              value={formData.donorName}
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
              onChange={handleFormChange}
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
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleFormChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Update Sponsorship</button>
        </form>
      </Modal>
    </div>
  );
};

export default SponsorshipTable;
