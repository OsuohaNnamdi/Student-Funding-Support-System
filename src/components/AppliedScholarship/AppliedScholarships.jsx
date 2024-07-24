import React from 'react';
import './AppliedScholarships.css'; // Make sure to create this CSS file
import Back from '../common/back/Back';

const scholarships = [
  {
    id: 1,
    scholarshipName: 'Science Achievement Scholarship',
    companyName: 'Science Corp',
    applicationDate: '2024-01-15',
    status: 'Approved',
    image: '../images/courses/c1.png'
  },
  {
    id: 2,
    scholarshipName: 'Arts Excellence Grant',
    companyName: 'Arts Inc',
    applicationDate: '2024-02-20',
    status: 'Pending',
    image: '../images/courses/c2.png'
  },
  {
    id: 3,
    scholarshipName: 'Engineering Future Award',
    companyName: 'Engineering Ltd',
    applicationDate: '2024-03-05',
    status: 'Rejected',
    image: '../images/courses/c3.pngg'
  },
  {
    id: 4,
    scholarshipName: 'Social Science Research Grant',
    companyName: 'Social Science Co',
    applicationDate: '2024-04-12',
    status: 'Pending',
    image: '../images/courses/c3.png'
  }
];

const AppliedScholarships = () => {
  return (
    <>
    <Back title='Previous Application'/>
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
