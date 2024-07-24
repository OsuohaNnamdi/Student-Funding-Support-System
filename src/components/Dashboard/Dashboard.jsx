import React, { useState } from 'react';
import ApplicationDetails from './ApplicationDetails';

const applications = [
  {
    id: 1,
    name: 'Scholarship Application',
    status: 'Approved',
    paid: true,
    receiptUrl: 'path/to/receipt1.pdf'
  },
  {
    id: 2,
    name: 'Grant Application',
    status: 'Pending',
    paid: false,
    receiptUrl: ''
  },
  // Add more applications as needed
];

const Dashboard = () => {
  const [selectedApplication, setSelectedApplication] = useState(null);

  const handleClick = (application) => {
    setSelectedApplication(application);
  };

  return (
    <div className='dashboard'>
      <h1>Application Tracker Dashboard</h1>
      <div className='applications-list'>
        {applications.map((application) => (
          <div
            key={application.id}
            className='application-card'
            onClick={() => handleClick(application)}
          >
            <h2>{application.name}</h2>
            <p>Status: {application.status}</p>
          </div>
        ))}
      </div>
      {selectedApplication && (
        <ApplicationDetails application={selectedApplication} />
      )}
    </div>
  );
};

export default Dashboard;
