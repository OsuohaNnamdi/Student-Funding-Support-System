import React from "react";
import { blog } from "../../dummydata";
import "./scholarship.css";

export const ScholarShipCard = ({ onEnrollClick }) => {
  return (
    <div className="scholarship-card-container">
      {blog.map((val) => (
        <div className="scholarship-card" key={val.id}>
          <div className="scholarship-card-img">
            <img src={val.cover} alt={val.title} />
          </div>
          <div className="scholarship-card-text">
            <div className="scholarship-card-admin">
              <span>
                <i className="fa fa-user"></i>
                <label>{val.type}</label>
              </span>
              <span>
                <i className="fa fa-calendar-alt"></i>
                <label>{val.date}</label>
              </span>
              <span>
                <i className="fa fa-comments"></i>
                <label>{val.com}</label>
              </span>
            </div>
            <h1>{val.title}</h1>
            <p>{val.desc}</p>
            <button className="enroll-btn" onClick={() => onEnrollClick(val.id)}>Enroll Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

