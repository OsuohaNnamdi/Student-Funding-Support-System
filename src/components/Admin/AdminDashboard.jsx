import React, { useState } from 'react';
import './adminFunding.css';
import Back from '../common/back/Back';

const applicationsData = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    guardianName: 'Jane Doe',
    gpa: 3.8,
    matricNo: '123456',
    financialNeed: 'Need financial aid for tuition',
    statement: 'I am passionate about learning and need support to achieve my goals.',
    documents: ['document1.pdf'],
    document2: ['recommendation1.pdf'],
    status: 'Pending'
  },
  {
    id: 2,
    name: 'Alice Smith',
    email: 'alice@example.com',
    guardianName: 'Bob Smith',
    gpa: 3.7,
    matricNo: '654321',
    financialNeed: 'Need financial aid for accommodation',
    statement: 'I have a strong academic record and need support to continue my education.',
    documents: ['document2.pdf'],
    document2: ['recommendation2.pdf'],
    status: 'Pending'
  }
];

const AdminDashboard = () => {
  const [applications, setApplications] = useState(applicationsData);

  const handleAccept = (id) => {
    setApplications(applications.map(app => app.id === id ? { ...app, status: 'Accepted' } : app));
  };

  const handleReject = (id) => {
    setApplications(applications.map(app => app.id === id ? { ...app, status: 'Rejected' } : app));
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
            <p>Status: <span className={`status ${application.status.toLowerCase()}`}>{application.status}</span></p>
          </div>
          <div className="application-actions">
            <button onClick={() => handleAccept(application.id)} disabled={application.status !== 'Pending'}>Accept</button>
            <button onClick={() => handleReject(application.id)} disabled={application.status !== 'Pending'}>Reject</button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
};

export default AdminDashboard;

