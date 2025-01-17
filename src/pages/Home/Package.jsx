import React, { useEffect, useState } from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { Link } from "react-router-dom";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Package = () => {
    const [plans, setPlans] = useState([])

    useEffect(() => {
        const findPlans = async () => {
            try {
                const res = await axios.get('http://localhost:5000/package');
                console.log(res.data);
                setPlans(res.data);
            } catch (error) {
                console.error("Error fetching packages:", error);
            }
        };

        findPlans();
    }, []);


    return (
        <div className="flex flex-col md:flex-row justify-evenly mt-10 md:mt-0 items-center">
            <div className="text-black flex flex-col items-center">
                <h2 className="text-3xl">Choose Your Plan</h2>
                <p className="mt-2 px-4">Advanced features for professionals seeking maximum productivity.</p>
                <FaArrowRightFromBracket className="mt-4" size={30} />
            </div>
            <div className="mt-10 flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                    {plans?.map((plan, index) => (
                        <Link to={`/checkout/${plan._id}`}
                            key={index}
                            className={`relative text-gray-600 py-16 px-6 flex flex-col items-center justify-center rounded-lg shadow-lg`}
                        >
                            <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                            <p className="text-4xl font-bold mb-2">{plan.price}</p>
                            <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Package;
