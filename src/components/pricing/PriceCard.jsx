import React from "react";
import { price } from "../../dummydata";
import "./PriceCard.css";

const PriceCard = () => {
  return (
    <div className="price-card-container">
      {price.map((val) => (
        <div className="price-card shadow" key={val.name}>
          <h4 className="price-card-title">{val.name}</h4>
          <h1 className="price-card-price">
            <span>$</span>{val.price}
          </h1>
          <p className="price-card-desc">{val.desc}</p>
          <button className="outline-btn">GET STARTED</button>
        </div>
      ))}
    </div>
  );
};

export default PriceCard;
