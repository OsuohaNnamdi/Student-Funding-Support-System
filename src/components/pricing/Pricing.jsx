// src/components/Pricing.js
import React, { useState, useEffect } from "react";
import Back from "../common/back/Back";
import PriceCard from "./PriceCard";
import "./price.css";
import axiosInstance from '../Auth/axiosInstance'

const Pricing = () => {
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await axiosInstance.get('/fund');
        setFunds(response.data);
      } catch (error) {
        console.error('Failed to fetch funds:', error);
      }
    };

    fetchFunds();
  }, []);

  return (
    <>
      <Back title='Choose The Right Plan' />
      <section className='price padding'>
        <div className='container'>
          <PriceCard funds={funds} />
        </div>
      </section>
    </>
  );
};

export default Pricing;
