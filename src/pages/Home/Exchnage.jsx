import React, { useState } from 'react';
import roomImg from '../../assets/hostelroom.jpg';
import toast from 'react-hot-toast';

const Exchange = () => {

    const onSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        formData.append("access_key", "b6786897-d2da-42c8-a856-3d87614d0775");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            toast.success('Thanks for Submission');
        }
    };

    return (
        <div
            className="min-h-[450px] flex justify-center items-center mt-10 px-6 bg-center bg-cover bg-no-repeat bg-fixed relative"
            style={{
                backgroundImage: `url('${roomImg}')`,
            }}
        >
            <div className="absolute inset-0 bg-black opacity-70"></div>
            <div className='absolute mt-5 inset-0 z-10 text-white text-center font-medium'>
                <h2 className='text-3xl pb-4'>For Any Query or Issues</h2>
            </div>
            <div className="py-20 max-w-xl w-full relative z-10 text-white overflow-hidden">
                <form onSubmit={onSubmit} className="border border-gray-300 p-8 rounded-md bg-black bg-opacity-70">
                    <h2 className="text-lg mb-4">Full Name</h2>
                    <input
                        name='name'
                        type="text"
                        placeholder="Name"
                        required
                        className="w-full mb-4 p-3 border border-gray-300 rounded-md bg-transparent text-white"
                    />
                    <h2 className="text-lg mb-4">Email</h2>
                    <input
                        name='email'
                        type="email"
                        required
                        placeholder="Email"
                        className="w-full mb-4 p-3 border border-gray-300 rounded-md bg-transparent text-white"
                    />
                    <h2 className="text-lg mb-4">Reasons</h2>
                    <textarea
                        name='message'
                        rows="4"
                        required
                        placeholder="Message Here"
                        className="w-full mb-4 p-3 border border-gray-300 rounded-md bg-transparent text-white"
                    ></textarea>
                    <button className="bg-purple-400 hover:bg-purple-600 text-black font-semibold w-full py-3 rounded-md">
                        SEND MESSAGE
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Exchange;
