import React, { useState, useEffect } from 'react';
import Back from '../common/back/Back';
import PriceCard from './PriceCard';
import PaymentForm from './PaymentForm';
import Modal from './Modal'; // Import the Modal component
import './price.css';
import axiosInstance from '../Auth/axiosInstance';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Replace with your actual Stripe public key
const stripePromise = loadStripe('your-publishable-key-here');

const Pricing = () => {
  const [funds, setFunds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

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

  const handlePlanSelect = (amount) => {
    setSelectedAmount(amount);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Back title='Choose The Right Plan' />
      <section className='price padding'>
        <div className='container'>
          <PriceCard funds={funds} onSelect={handlePlanSelect} />
        </div>
      </section>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <Elements stripe={stripePromise}>
          <PaymentForm amount={selectedAmount} />
        </Elements>
      </Modal>
    </>
  );
};

export default Pricing;
