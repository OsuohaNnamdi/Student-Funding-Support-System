import React from 'react';

const ApplicationDetails = ({ application }) => {
  return (
    <div className='application-details'>
      <h2>{application.name}</h2>
      <p>Status: {application.status}</p>
      {application.status === 'Approved' && (
        <p>Payment Status: {application.paid ? 'Paid' : 'Pending'}</p>
      )}
      {application.status === 'Approved' && application.paid && (
        <a
          href={application.receiptUrl}
          target='_blank'
          rel='noopener noreferrer'
          className='download-btn'
        >
          Download Receipt
        </a>
      )}
    </div>
  );
};

export default ApplicationDetails;
