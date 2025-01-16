import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import { Bars } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';

const CheckOut = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const findPlans = async () => {
            try {
                const res = await axios.get('/packages.json');
                const filter = res.data.find(p => p.id.toString() === id);
                setPlan(filter);
            } catch (err) {
                console.error("Error is", err);
                setError(err.message || "An error occurred while fetching the plan.");
            } finally {
                setLoading(false);
            }
        };
        findPlans();
    }, [id]);

    if (loading) return <div>
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
    if (error) return <div>Error: {error}</div>;

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
                        <h3 className="text-2xl font-bold">{plan.title}</h3>
                        <p className="text-lg font-semibold">{plan.price}/{plan.description}</p>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm">
                        {
                            plan.features?.map((feature) => <li>✔️{feature}</li>)
                        }
                    </ul>
                </div>
                {/* Payment Methods */}
                <div className="mb-6">
                    {/* Add Stripe card element or other payment options */}
                </div>

                <button className="w-full bg-purple-600 text-white py-3 rounded-lg text-center font-bold hover:bg-purple-700 transition">
                    Continue →
                </button>
            </div>
        </div>
    );
};

export default CheckOut;
