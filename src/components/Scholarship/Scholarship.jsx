// src/components/ScholarShip.js
import React, { useState, useEffect } from "react";
import Back from "../common/back/Back";
import "./Scholarship.css";
import ApplicationForm from "../StudentApplication/ApplicationForm";
import { ScholarShipCard } from './ScholarshipCard.jsx';
import axiosInstance from '../Auth/axiosInstance';


const ScholarShip = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [sponsorships, setSponsorships] = useState([]);

  useEffect(() => {
    const fetchSponsorships = async () => {
      try {
        const response = await axiosInstance.get('/sponsorships');
        setSponsorships(response.data);
      } catch (error) {
        console.error('Failed to fetch sponsorships:', error);
      }
    };

    fetchSponsorships();
  }, []);

  const handleEnrollClick = (id) => {
    setSelectedBlog(id);
  };

  return (
    <>
      <Back title="Scholarship List" />
      <section className="blog padding">
        <div className="container">
          {selectedBlog ? (
            <ApplicationForm blogId={selectedBlog} />
          ) : (
            <ScholarShipCard sponsorships={sponsorships} onEnrollClick={handleEnrollClick} />
          )}
        </div>
      </section>
    </>
  );
};

export default ScholarShip;
