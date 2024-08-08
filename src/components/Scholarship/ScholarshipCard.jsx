// src/components/ScholarshipCard.jsx
import React from "react";
import "./Scholarship.css";

export const ScholarShipCard = ({ sponsorships, onEnrollClick }) => {
  return (
    <div className="scholarship-card-container">
      {sponsorships.map((sponsorship) => (
        <div className="scholarship-card" key={sponsorship.id}>
          <div className="scholarship-card-img">
            <img src={sponsorship.cover} alt={sponsorship.title} /> 
          </div>
          <div className="scholarship-card-text">
            <div className="scholarship-card-admin">
              <span>
                <i className="fa fa-user"></i>
                <label>{sponsorship.donorName}</label>
              </span>
              <span>
                <i className="fa fa-calendar-alt"></i>
                <label>{sponsorship.date}</label> 
              </span>
              <span>
                <i className="fa fa-comments"></i>
                <label>{sponsorship.comments}</label> 
              </span>
            </div>
            <h1>{sponsorship.title}</h1>
            <p>{sponsorship.description}</p> 
            <button className="enroll-btn" onClick={() => onEnrollClick(sponsorship.id)}>Enroll Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};
