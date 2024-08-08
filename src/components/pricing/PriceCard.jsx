// src/components/PriceCard.jsx
import React from "react";
import "./PriceCard.css";

const PriceCard = ({ funds }) => {
  return (
    <div className="price-card-container">
      {funds.map((fund) => (
        <div className="price-card shadow" key={fund.id}>
          <h4 className="price-card-title">{fund.name}</h4>
          <h1 className="price-card-price">
            <span>₦</span>{fund.amount}
          </h1>
          <p className="price-card-desc">{fund.description}</p>
          <button className="outline-btn">Get Started</button>
        </div>
      ))}
    </div>
  );
};

export default PriceCard;
