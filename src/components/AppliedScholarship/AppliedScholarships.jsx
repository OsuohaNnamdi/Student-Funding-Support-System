import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppliedScholarships.css'; // Make sure to create this CSS file
import Back from '../common/back/Back';

const AppliedScholarships = () => {
  const [scholarships, setScholarships] = useState([]);

  const matricNo = 'your-matric-no'; 

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const response = await axios.get(`/applications/${matricNo}`);
        setScholarships(response.data);
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
                <img src={scholarship.image} alt={scholarship.companyName} />
              </div>
              <div className="scholarship-content">
                <h3>{scholarship.scholarshipName}</h3>
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
