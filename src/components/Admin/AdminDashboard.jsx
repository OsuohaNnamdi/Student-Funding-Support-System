import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css'; // Import SweetAlert2 styles
import axiosInstance from '../Auth/axiosInstance';
import './adminDashboard.css';
import Back from '../common/back/Back';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loadingId, setLoadingId] = useState(null);

  useEffect(() => {
    axiosInstance.get('/applications')
      .then(response => setApplications(response.data))
      .catch(error => console.error('Error fetching applications:', error));
  }, []);

  const handleAccept = async (id) => {
    setLoadingId(id);
    Swal.fire({
      title: 'Processing...',
      text: 'Please wait while we process your request.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      await axiosInstance.put(`/applications/approve/${id}`);
      setApplications(applications.map(app =>
        app.id === id ? { ...app, approved: true, status: 'Accepted' } : app
      ));
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Application accepted successfully.'
      });
    } catch (error) {
      console.error('Error approving application:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to accept application.'
      });
    } finally {
      setLoadingId(null);
    }
  };


    const handleReject = async (id) => {
  setLoadingId(id);
  Swal.fire({
    title: 'Processing...',
    text: 'Please wait while we process your request.',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    await axiosInstance.put(`/applications/reject/${id}`);
    setApplications(applications.map(app =>
      app.id === id ? { ...app, approved: false, status: 'Rejected' } : app
    ));
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: 'Application rejected successfully.'
    });
  } catch (error) {
    console.error('Error rejecting application:', error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Failed to reject application.'
    });
    } finally {
    setLoadingId(null);
      }
    };



  return (
    <>
      <Back title='Applicant List'/>
      <div className="application-list-container">
        <h2>Application List</h2>
        {applications.length === 0 ? (
          <p>No applications available.</p>
        ) : (
          applications.map((application) => (
            <div key={application.id} className="application-detail">
              <dl>
                <div className="application-row">
                  <dt>Name:</dt>
                  <dd>{application.name}</dd>
                </div>
                <div className="application-row">
                  <dt>Email:</dt>
                  <dd>{application.email}</dd>
                </div>
                <div className="application-row">
                  <dt>Guardian Name:</dt>
                  <dd>{application.guardianName}</dd>
                </div>
                <div className="application-row">
                  <dt>GPA:</dt>
                  <dd>{application.gpa}</dd>
                </div>
                <div className="application-row">
                  <dt>Matric No:</dt>
                  <dd>{application.matricNo}</dd>
                </div>
                <div className="application-row">
                  <dt>Financial Need:</dt>
                  <dd>{application.financialNeed}</dd>
                </div>
                <div className="application-row">
                  <dt>Statement:</dt>
                  <dd>{application.statement}</dd>
                </div>
                <div className="application-row">
                  <dt>Status:</dt>
                  <dd className={`status ${application.approved ? 'accepted' : 'pending'}`}>
                    {application.approved ? 'Accepted' : 'Pending'}
                  </dd>
                </div>
              </dl>
              <div className="application-actions">
                <button
                  className="accept-btn"
                  onClick={() => handleAccept(application.id)}
                  disabled={loadingId === application.id || application.approved || application.status === 'Rejected'}
                >
                  {loadingId === application.id ? (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '4px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '50%',
                        borderTop: '4px solid #3498db',
                        width: '20px',
                        height: '20px',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                  ) : 'Accept'}
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(application.id)}
                  disabled={loadingId === application.id || application.approved || application.status === 'Accepted'}
                >
                  {loadingId === application.id ? (
                    <div
                      style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: '4px solid rgba(0, 0, 0, 0.1)',
                        borderRadius: '50%',
                        borderTop: '4px solid #e74c3c',
                        width: '20px',
                        height: '20px',
                        animation: 'spin 1s linear infinite',
                      }}
                    />
                  ) : 'Reject'}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </>
  );
};

export default AdminDashboard;
