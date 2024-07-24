import React, { useEffect, useState } from 'react';
import './FundsTable.css';
import Back from '../common/back/Back';

const FundsTable = () => {
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    fetch('/api/funds')
      .then(response => response.json())
      .then(data => setFunds(data))
      .catch(error => console.error('Error fetching funds:', error));
  }, []);

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
            <th>Logo</th>
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
                {fund.logo ? <img src={fund.logo} alt="Logo" className="fund-logo" /> : 'No logo'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
};

export default FundsTable;
