import React, { useState } from "react";
import Back from "../common/back/Back";
import "./Scholarship.css";
import ApplicationForm from "../StudentApplication/ApplicationForm";
import { ScholarShipCard } from './ScholarshipCard.jsx';

const ScholarShip = () => {
  const [selectedBlog, setSelectedBlog] = useState(null);

  const handleEnrollClick = (id) => {
    setSelectedBlog(id); 
  };

  return (
    <>
    
      <Back title="Scholarship List" />
      <section className="blog padding">
        <div className="container">
          {selectedBlog ? (
            <ApplicationForm blogId={selectedBlog} /> // Pass any relevant data
          ) : (
            <ScholarShipCard onEnrollClick={handleEnrollClick} />
          )}
        </div>
      </section>
    </>
  );
};

export default ScholarShip;
