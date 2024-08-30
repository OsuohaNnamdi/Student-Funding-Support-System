import React, { useState, useEffect } from "react";
import Back from "../common/back/Back";
import "./Scholarship.css";
import ApplicationForm from "../StudentApplication/ApplicationForm";
import axiosInstance from '../Auth/axiosInstance';
import { ScholarShipCard } from "./ScholarshipCard";


const ScholarShip = () => {
  const [selectedSponsorship, setSelectedSponsorship] = useState(null);
  const [sponsorships, setSponsorships] = useState([]);

  useEffect(() => {
    const fetchSponsorships = async () => {
      try {
        const response = await axiosInstance.get('/sponsorships');
        setSponsorships(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Failed to fetch sponsorships:', error);
      }
    };

    fetchSponsorships();
  }, []);

  const handleEnrollClick = (sponsorship) => {
    setSelectedSponsorship(sponsorship);
  };

  return (
    <>
      <Back title="Scholarship List" />
      <section className="blog padding">
        <div className="container">
          {selectedSponsorship ? (
            <ApplicationForm
              sponsorship={selectedSponsorship}
            />
          ) : (
            <ScholarShipCard
              sponsorships={sponsorships}
              onEnrollClick={handleEnrollClick}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default ScholarShip;
