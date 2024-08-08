import React, { useState, useEffect } from 'react';
import axiosInstance from '../Auth/axiosInstance'
import ApplicationDetails from './ApplicationDetails';
import './dashboard.css';

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const matricNo = 'your-matric-no'; 

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axiosInstance.get(`/applications/${matricNo}`);
        setApplications(response.data);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, [matricNo]);

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
            <p>Status: {application.approved ? 'Approved' : 'Pending'}</p>
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
