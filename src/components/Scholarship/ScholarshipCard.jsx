// src/components/ScholarShipCard.jsx
import React from "react";
import "./Scholarship.css";

export const ScholarShipCard = ({ sponsorships, onEnrollClick }) => {
  return (
    <div className="scholarship-card-container">
      {sponsorships.map((sponsorship) => (
        <div className="scholarship-card" key={sponsorship.id}>
          <div className="scholarship-card-img">
            <img src={sponsorship.file} alt={sponsorship.title} />
          </div>
          <div className="scholarship-card-text">
            <div className="scholarship-card-admin">
              <span>
                <b className="fa fa-user"></b>
                <h1>{sponsorship.donorName}</h1>
              </span>
            </div>
            <h3>Company Email: {sponsorship.email}</h3>
            <h3>Number of Student: {sponsorship.numStudents}</h3>
            <button
              className="enroll-btn"
              onClick={() => onEnrollClick(sponsorship)} // Pass the entire sponsorship object
            >
              Enroll Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
