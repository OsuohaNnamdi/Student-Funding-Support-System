import React, { useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentForm.css'; // Optional: for styling

const PaymentForm = ({ amount }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return; // Stripe.js has not yet loaded.
    }

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
      billing_details: {
        name,
        email,
      },
    });

    if (error) {
      console.error(error);
      alert('Payment failed!');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/payment', {
        amount,
        paymentMethodId: paymentMethod.id,
      });

      if (response.data.success) {
        alert('Payment successful!');
      } else {
        alert('Payment failed!');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed!');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Amount: ₦{amount}</label>
      </div>
      <div className="form-group">
        <label>Card details</label>
        <CardElement />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
    </form>
  );
};

export default PaymentForm;
