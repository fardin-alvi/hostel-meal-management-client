import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const Addmeals = () => {
    const [permitImage, setPermitImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPermitImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-gradient-to-r from-purple-50 to-pink-50 shadow-md rounded-md p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter Your Best Meal</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Restaurant Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            placeholder="Meal Title"
                            className="input input-bordered w-full mt-1"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select className="select select-bordered w-full mt-1">
                            <option disabled selected>Select Category</option>
                            <option>Breakfast</option>
                            <option>Lunch</option>
                            <option>Dinner</option>
                        </select>
                    </div>

                    {/* Owner */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Distributer Name</label>
                        <input
                            type="text"
                            placeholder="Mr. X"
                            className="input input-bordered w-full mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Distributer Email</label>
                        <input
                            type="text"
                            placeholder="xyz@gmail.com"
                            className="input input-bordered w-full mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            placeholder="$.."
                            className="input input-bordered w-full mt-1"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Time</label>
                        <input
                            type="time"
                            placeholder="time"
                            className="input input-bordered w-full mt-1"
                        />
                    </div>

                    {/* File upload*/}
                    <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <input
                                type="file"
                                className="file-input file-input-bordered w-96 mt-1 file:bg-purple-500 file:text-white"
                                onChange={handleFileChange}
                            />
                        </div>
                        {/* Image Preview */}
                        <div className="flex-1 border rounded-lg flex justify-center w-32 items-center h-32">
                            {permitImage ? (
                                <img
                                    src={permitImage}
                                    alt="Uploaded Document"
                                    className="max-w-full max-h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">No file uploaded</span>
                            )}
                        </div>
                    </div>


                    {/* Location */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            placeholder="More about Meal.."
                            className="textarea textarea-bordered w-full mt-1"
                        />
                    </div>

                    {/* Address Details */}
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                        <textarea
                            placeholder="what used to make..!"
                            className="textarea textarea-bordered w-full mt-1"
                        />
                    </div>
                </form>

                <div className="mt-6 flex justify-end">
                    <button className="px-6 py-2 rounded-lg bg-purple-400">Add Meal</button>
                </div>
            </div>
        </div>
    );
};

export default Addmeals;