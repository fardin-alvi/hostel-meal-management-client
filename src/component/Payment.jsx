import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckOut from '../pages/CheckOut';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_key);

const Payment = () => {
    return (
        <div>
            <Elements stripe={stripePromise} >
                <CheckOut/>
            </Elements>
        </div>
    );
};

export default Payment;