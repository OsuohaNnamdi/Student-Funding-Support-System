import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    fetchFunds();
  }, []);

  const fetchFunds = async () => {
    try {
      const response = await axiosInstance.get('/funds');
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
    try {
      await axiosInstance.delete(`/funds/${id}`);
      fetchFunds(); 
    } catch (error) {
      console.error('Error deleting fund:', error);
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
    try {
      await axiosInstance.put(`/funds/${selectedFund.id}`, updatedFund);
      fetchFunds(); 
      handleModalClose();
    } catch (error) {
      console.error('Error updating fund:', error);
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
                  <button onClick={() => handleUpdate(fund)}>Update</button>
                  <button onClick={() => handleDelete(fund.id)}>Delete</button>
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
              <button type="submit">Save</button>
              <button type="button" onClick={handleModalClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default FundsTable;
