import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const imageApi = import.meta.env.VITE_imageApi;
const postImageApi = `https://api.imgbb.com/1/upload?key=${imageApi}`;

const Addmeals = () => {
    const axiosSecure = useAxiosSecure();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { user } = useAuth()
    const [Image, setImage] = useState()

    
    const getDate = () => {
        const date = new Date();
        const options = {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return date.toLocaleString('en-US', options);  // Format: "Thu, Jan 18, 2025, 12:21 AM"
    };


    const imageUpload = async (file) => {
        const imageFile = new FormData();
        imageFile.append('image', file);
        try {
            const response = await axios.post(postImageApi, imageFile, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data.data.display_url;
        } catch (error) {
            console.error('Image upload failed:', error);
            throw new Error('Failed to upload image');
        }
    };

    const onSubmit = async (data) => {
        try {
            const imageUrl = await imageUpload(data.image[0]);
            const meal = {
                title: data.title,
                category: data.category,
                distributor: user.displayName,
                distributor_email: user.email,
                price: parseFloat(data.price),
                post_time: data.post_time,
                image: imageUrl,
                description: data.description,
                ingredients: data.ingredient,
                rating: 0,
                likes: 0,
                review_count:0
            };
            const mealResponse = await axiosSecure.post('/uploadmeals', meal);
            if (mealResponse.data.insertedId) {
                reset();
                toast.success('Meal Uploaded Successfully');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to upload meal. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-4xl w-full bg-gradient-to-r from-purple-50 to-pink-50 shadow-md rounded-md p-6">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">Enter Your Best Meal</h2>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Meal Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            placeholder="Meal Title"
                            className="input input-bordered w-full mt-1"
                            {...register('title', { required: 'Title is required' })}
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category</label>
                        <select
                            className="select select-bordered w-full mt-1"
                            {...register('category', { required: 'Category is required' })}
                            defaultValue=""
                        >
                            <option disabled value="">
                                Select Category
                            </option>
                            <option>breakfast</option>
                            <option>lunch</option>
                            <option>dinner</option>
                        </select>
                        {errors.category && (
                            <span className="text-red-500 text-sm">{errors.category.message}</span>
                        )}
                    </div>

                    {/* Distributor Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Distributor Name</label>
                        <input
                            type="text"
                            placeholder="Distributor Name"
                            className="input input-bordered w-full mt-1"
                            defaultValue={user.displayName}
                        />
                    </div>

                    {/* Distributor Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Distributor Email</label>
                        <input
                            type="email"
                            placeholder="Distributor Email"
                            className="input input-bordered w-full mt-1"
                            defaultValue={user.email}
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            placeholder="Price"
                            className="input input-bordered w-full mt-1"
                            {...register('price', { required: 'Price is required' })}
                        />
                        {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
                    </div>

                    {/* Post Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Post Time</label>
                        <input
                            type="text"
                            className="input input-bordered w-full mt-1"
                            {...register('post_time', { required: 'Post time is required' })}
                            defaultValue={getDate()} 
                        />
                        {errors.post_time && (
                            <span className="text-red-500 text-sm">{errors.post_time.message}</span>
                        )}
                    </div>

                    {/* Image * image preview */}
                    <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-x-6">
                        {/* File Input */}
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <input
                                type="file"
                                className="file-input file-input-bordered file:bg-purple-400 file:hover:bg-purple-600 file:text-white w-96 mt-1"
                                {...register('image', { required: 'Image is required' })}
                                onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
                            />
                        </div>
                        {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
                        {/* Image Preview */}
                        <div className="flex-1 border rounded-lg  flex justify-center items-center h-32">
                            {Image ? (
                                <img
                                    src={Image}
                                    alt="Uploaded"
                                    className="max-w-80 max-h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-400 text-sm">No file uploaded</span>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            placeholder="Description"
                            className="textarea textarea-bordered w-full mt-1"
                            {...register('description', { required: 'Description is required' })}
                        />
                        {errors.description && (
                            <span className="text-red-500 text-sm">{errors.description.message}</span>
                        )}
                    </div>

                    {/* Ingredients */}
                    <div className="col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                        <textarea
                            placeholder="Ingredients"
                            className="textarea textarea-bordered w-full mt-1"
                            {...register('ingredient', { required: 'Ingredients are required' })}
                        />
                        {errors.ingredient && (
                            <span className="text-red-500 text-sm">{errors.ingredient.message}</span>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 mt-6 flex justify-end">
                        <button type="submit" className="px-6 py-2 rounded-lg bg-purple-400 text-white">
                            Add Meal
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Addmeals;




