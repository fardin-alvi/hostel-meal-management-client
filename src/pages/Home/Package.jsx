import React from "react";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const Package = () => {
    const plans = [
        {
            title: "Silver",
            price: "$5",
            description: "per month",
            bgColor: "bg-gray-400",
        },
        {
            title: "Gold",
            price: "$15",
            description: "per month",
            bgColor: "bg-yellow-400",
        },
        {
            title: "Platinum",
            price: "$35",
            description: "per month",
            bgColor: "bg-gray-300",
        },
    ];

    return (
        <div className="flex flex-col md:flex-row justify-evenly mt-10 md:mt-0 items-center">
            <div className="text-black flex flex-col items-center">
                <h2 className="text-3xl">Choose Your Plan</h2>
                <p className="mt-2 px-4">Advanced features for professionals seeking maximum productivity.</p>
                <FaArrowRightFromBracket className="mt-4" size={30} />
            </div>
            <div className="mt-10 flex items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative ${plan.bgColor} text-gray-600 py-16 px-6 flex flex-col items-center justify-center rounded-lg shadow-lg`}
                        >
                            <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                            <p className="text-4xl font-bold mb-2">{plan.price}</p>
                            <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Package;
