import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Bars } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../hooks/useAuth';

const CheckOut = () => {
    const { id } = useParams();
    const {user} = useAuth()
    const [error, setError] = useState('');
    const [ids,setId]= useState()
    const stripe = useStripe()
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecure = useAxiosSecure();

    const { data: plan, isLoading } = useQuery({
        queryKey: ['plan', id],
        queryFn: async () => {
            const res = await axiosSecure.get(`/package/${id}`)
            return res.data
        },
        enabled: !!id
    })
    
    console.log(plan);

    useEffect(() => {
        if (plan?.price) {
            axiosSecure.post('/payment-intent-method', { price: plan?.price })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data?.clientSecret)
                })
        }
    }, [plan])

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError('Payment failed:', error.message);
        } else {
            console.log('payment methood', paymentMethod);
            setError('')
        }

        const { paymentIntent, error: ConfirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user.email || 'Annonyms',
                    name: user.displayName || 'Annonyms',
                }
            }
        })
        if (ConfirmError) {
            console.log('error', ConfirmError);

        } else {
            console.log(paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                setId(paymentIntent.id)
                card.clear();
            }
            const paymentInfo = {
                email: user.email,
                id: paymentIntent.id,
                price: plan.price,
                date: new Date,
                packageId: plan._id,
                subscription:plan.title,
                status: 'pending'
            }
            const res = await axiosSecure.post('/payments', paymentInfo)
            if (res.data.insertedId) {
                toast.success('Payment Send')
            }
        }

    };




    if (isLoading) return <div>
        <Bars
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    </div>;

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
                <div className="text-center mb-6">
                    <h2 className="text-gray-600 font-medium">Upgrade your plan to</h2>
                    <h1 className="text-lg font-bold text-purple-600">
                        Premium Individual
                    </h1>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-indigo-400 text-white rounded-lg p-4 mb-6">
                    <div className='flex justify-between'>
                        <h3 className="text-2xl font-bold">{plan?.title}</h3>
                        <p className="text-lg font-semibold">{plan?.price}/{plan?.description}</p>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm">
                        {
                            plan.features?.map((feature) => <li>✔️{feature}</li>)
                        }
                    </ul>
                </div>
                {/* Payment Methods */}
                <div className="mb-6">
                    <form
                        onSubmit={handleSubmit}
                        className="max-w-lg mx-auto flex flex-col gap-6  bg-white  rounded-md"
                    >
                        <div
                            className="p-3 border border-gray-300 rounded-md focus-within:border-indigo-600 focus-within:bg-gray-50"
                        >
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            iconColor: '#666EE8',
                                            color: '#31325F',
                                            fontSize: '16px',
                                            fontSmoothing: 'antialiased',
                                            '::placeholder': {
                                                color: '#CFD7E0',
                                            },
                                        },
                                        invalid: {
                                            color: '#e5424d',
                                            ':focus': {
                                                color: '#e5424d',
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                        <button disabled={!stripe || !clientSecret} className="w-full bg-purple-600 text-white py-3 rounded-lg text-center font-bold hover:bg-purple-700 transition">
                            Pay {plan.price} →
                        </button>
                        <p className='text-red-500 text-center'>{error}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CheckOut;
