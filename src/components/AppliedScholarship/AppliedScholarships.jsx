import React, { useState, useEffect } from 'react';
import axiosInstance from '../Auth/axiosInstance';
import './AppliedScholarships.css'; // Make sure to create this CSS file
import Back from '../common/back/Back';

const AppliedScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const profile = JSON.parse(localStorage.getItem('profile'));
  const matricNo = profile.email; 

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axiosInstance.get(`/applications/${matricNo}`);
        setScholarships(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching scholarships:', error);
      }
    };

    fetchScholarships();
  }, []);

  return (
    <>
      <Back title='Previous Applications' />
      <div className="applied-scholarships-container">
        <h2>Previously Applied Scholarships</h2>
        <div className="scholarships-grid">
          {scholarships.map(scholarship => (
            <div key={scholarship.id} className="scholarship-card">
              <div className="scholarship-image">
                <img src={scholarship.companyImage} alt={scholarship.companyName} />
              </div>
              <div className="scholarship-content">
                <h1>{scholarship.scholarshipName}</h1>
                <p>{scholarship.companyName}</p>
                <p>Applied on: {scholarship.applicationDate}</p>
                <p className={`status ${scholarship.status.toLowerCase()}`}>{scholarship.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AppliedScholarships;
