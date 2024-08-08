import React, { useState, useEffect } from 'react';
import axiosInstance from '../Auth/axiosInstance'
import './adminDashboard.css';
import Back from '../common/back/Back';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    
    axiosInstance.get('/applications')
      .then(response => setApplications(response.data))
      .catch(error => console.error('Error fetching applications:', error));
  }, []);

  const handleAccept = (id) => {
    axiosInstance.put(`/applications/approve/${id}`)
      .then(response => {
        
        setApplications(applications.map(app => app.id === id ? { ...app, approved: true, status: 'Accepted' } : app));
      })
      .catch(error => console.error('Error approving application:', error));
  };

  const handleReject = (id) => {
    axiosInstance.put(`/applications/approve/${id}`)
      .then(response => {
        
        setApplications(applications.map(app => app.id === id ? { ...app, approved: false, status: 'Rejected' } : app));
      })
      .catch(error => console.error('Error approving application:', error));
  };

  return (
  <>
    <Back title='Applicant List'/>
    <div className="application-list-container">
      <h2>Application List</h2>
      {applications.map((application) => (
        <div key={application.id} className="application-card">
          <div className="application-details">
            <h3>{application.name}</h3>
            <p>Email: {application.email}</p>
            <p>Guardian Name: {application.guardianName}</p>
            <p>GPA: {application.gpa}</p>
            <p>Matric No: {application.matricNo}</p>
            <p>Financial Need: {application.financialNeed}</p>
            <p>Statement: {application.statement}</p>
            <p>Status: <span className={`status ${application.approved ? 'accepted' : 'pending'}`}>
              {application.approved ? 'Accepted' : 'Pending'}
            </span></p>
          </div>
          <div className="application-actions">
            <button onClick={() => handleAccept(application.id)} disabled={application.approved}>Accept</button>
            <button onClick={() => handleReject(application.id)} disabled={application.approved}>Reject</button>
          </div>
        </div>
      ))}
    </div>
  </>
  );
};

export default AdminDashboard;
