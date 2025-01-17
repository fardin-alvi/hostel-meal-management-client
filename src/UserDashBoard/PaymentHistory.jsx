import React from 'react';
import useAuth from '../hooks/useAuth';
import usePayments from '../hooks/usePayments';
import { FaCheckCircle } from "react-icons/fa";
import animationData from '../assets/payment-animation.json';
import unavailInfo from '../assets/unavailable-animation.json'
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';

const PaymentHistory = () => {
    const { user } = useAuth();
    const { payments } = usePayments();

    // Lottie options
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    const unavailable = {
        loop: true,
        autoplay: true,
        animationData: unavailInfo,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        payments ? <div className="min-h-full flex flex-col justify-center items-center bg-gradient-to-r from-purple-50 to-pink-50 ">
            <Lottie
                options={defaultOptions}
                height={160}
                width={160}
            />
            <div className="text-center">
                <h1 className="text-3xl font-bold text-green-600">Thank you!</h1>
                <p className="text-lg font-medium text-gray-700 mt-2 flex items-center justify-center">
                    <FaCheckCircle className="text-green-600 mr-2" /> Payment Done Successfully
                </p>
                <p className="text-sm text-gray-500 mt-4">
                    You can Now enjoy the <span className='text-lg text-yellow-800'>{payments?.title}</span> plan and the exclusive feature of the package.
                </p>
            </div>
            <Link to='/dashboard/myprofile' className="mt-6 bg-purple-400 text-white px-6 py-2 rounded-full hover:bg-green-700">
                Take me to my Profile
            </Link>
        </div> : <div className="min-h-full flex flex-col justify-center items-center bg-gradient-to-r from-purple-50 to-pink-50 ">
                <Lottie
                    options={unavailable}
                    height={160}
                    width={160}
                />
                <div className="text-center flex flex-col">
                    <h1 className="text-3xl font-bold text-green-600">No Data Avaibale</h1>
                    <Link to='/dashboard/myprofile' className="mt-6 bg-purple-400 text-white px-6 py-2 rounded-full hover:bg-green-700">
                        Take me to my Profile
                    </Link>
                </div>
        </div>
    );
};

export default PaymentHistory;
