import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 styles
import './FundsTable.css';
import Back from '../common/back/Back';
import axiosInstance from '../Auth/axiosInstance';

const FundsTable = () => {
  const [funds, setFunds] = useState([]);
  const [selectedFund, setSelectedFund] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updatedFund, setUpdatedFund] = useState({
    name: '',
    contact: '',
    amount: '',
    description: ''
  });
  const [loading, setLoading] = useState(false); // Manage loading state for update and delete operations

  useEffect(() => {
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    try {
      const response = await axiosInstance.get('/fund');
      setFunds(response.data);
    } catch (error) {
      console.error('Error fetching funds:', error);
    }
  };

  const handleUpdate = (fund) => {
    setSelectedFund(fund);
    setUpdatedFund({
      name: fund.name,
      contact: fund.contact,
      amount: fund.amount,
      description: fund.description
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
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
        await axiosInstance.delete(`/fund/${id}`);
        Swal.fire('Deleted!', 'The fund has been deleted.', 'success');
        fetchFunds();
      } catch (error) {
        console.error('Error deleting fund:', error);
        Swal.fire('Error!', 'Failed to delete the fund.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFund(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async () => {
    setLoading(true);
    try {
      await axiosInstance.put(`/fund/${selectedFund.id}`, updatedFund);
      Swal.fire('Updated!', 'The fund has been updated.', 'success');
      fetchFunds();
      handleModalClose();
    } catch (error) {
      console.error('Error updating fund:', error);
      Swal.fire('Error!', 'Failed to update the fund.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Back title='Payment List'/>
      <div className="funds-table-container">
        <h2>List of Payments</h2>
        <table className="funds-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {funds.map(fund => (
              <tr key={fund.id}>
                <td>{fund.name}</td>
                <td>{fund.contact}</td>
                <td>{fund.amount}</td>
                <td>{fund.description}</td>
                <td>
                  <button
                    onClick={() => handleUpdate(fund)}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Update'}
                  </button>
                  <button
                    onClick={() => handleDelete(fund.id)}
                    disabled={loading}
                  >
                    {loading ? 'Deleting...' : 'Delete'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Update Fund</h2>
            <form onSubmit={e => { e.preventDefault(); handleUpdateSubmit(); }}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={updatedFund.name}
                onChange={handleInputChange}
                required
              />
              <label>Contact:</label>
              <input
                type="text"
                name="contact"
                value={updatedFund.contact}
                onChange={handleInputChange}
                required
              />
              <label>Amount:</label>
              <input
                type="text"
                name="amount"
                value={updatedFund.amount}
                onChange={handleInputChange}
                required
              />
              <label>Description:</label>
              <textarea
                name="description"
                value={updatedFund.description}
                onChange={handleInputChange}
                required
              ></textarea>
              <button type="submit">
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
                  'Save'
                )}
              </button>
              <button type="button" onClick={handleModalClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FundsTable;
