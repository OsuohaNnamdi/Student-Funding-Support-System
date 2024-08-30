import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 styles
import './SponsorshipTable.css'; 
import Modal from './Modal/Modal';
import axiosInstance from '../Auth/axiosInstance';

const SponsorshipTable = () => {
  const [sponsorships, setSponsorships] = useState([]);
  const [selectedSponsorship, setSelectedSponsorship] = useState(null);
  const [formData, setFormData] = useState({
    donorName: '',
    email: '',
    numStudents: '',
    totalAmount: '',
    comments: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); // Manage loading state for async operations

  useEffect(() => {
    fetchSponsorships();
  }, []);

  const fetchSponsorships = async () => {
    try {
      const response = await axiosInstance.get('/sponsorships');
      setSponsorships(response.data);
    } catch (error) {
      console.error('Error fetching sponsorships:', error);
    }
  };

  const handleUpdateClick = (sponsorship) => {
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
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await axiosInstance.delete(`/sponsorships/${id}`);
        Swal.fire('Deleted!', 'The sponsorship has been deleted.', 'success');
        fetchSponsorships(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting sponsorship:', error);
        Swal.fire('Error!', 'Failed to delete the sponsorship.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axiosInstance.put(`/sponsorships/${selectedSponsorship.id}`, formData);
      Swal.fire('Updated!', 'The sponsorship has been updated.', 'success');
      fetchSponsorships(); 
      setIsModalOpen(false);
      setSelectedSponsorship(null); 
    } catch (error) {
      console.error('Error updating sponsorship:', error);
      Swal.fire('Error!', 'Failed to update the sponsorship.', 'error');
    } finally {
      setLoading(false);
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
              <td>{sponsorship.comments}</td>
              <td>
                <button
                  onClick={() => handleUpdateClick(sponsorship)}
                  disabled={loading}
                >
                  {loading ? 'Loading...' : 'Update'}
                </button>
                <button
                  onClick={() => handleDeleteClick(sponsorship.id)}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
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
            <label htmlFor="comments">Comments</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleFormChange}
              required
            />
          </div>
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
              'Update Sponsorship'
            )}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default SponsorshipTable;
