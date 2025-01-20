import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const imageApi = import.meta.env.VITE_imageApi;
const postImageApi = `https://api.imgbb.com/1/upload?key=${imageApi}`;

const UpcomingModal = ({ isOpen, closeModal, refetch }) => {
    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { user } = useAuth()


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
            throw new Error('Failed to upload image');
        }
    };

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
        return date.toLocaleString('en-US', options);
    };

    const onSubmit = async (data) => {
        try {
            const imageUrl = await imageUpload(data.image[0]);
            const upcomingMeal = {
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
                review_count: 0
            };

            const res = await axiosSecure.post('/upcoming/meal/byadmin', upcomingMeal);
            if (res.data.insertedId) {
                refetch();
                closeModal();
                reset();
                toast.success('Meal Added Successfully');
            }
        } catch (error) {
            toast.error('Failed to add meal. Please try again.');
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg shadow-lg p-6 max-w-3xl w-full max-h-screen overflow-auto">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-2xl font-bold">Add Upcoming Meal</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-800 font-bold text-lg"
                            >
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium">Title</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full mt-1"
                                    {...register('title', { required: 'Title is required' })}
                                />
                                {errors.title && (
                                    <span className="text-red-500 text-sm">{errors.title.message}</span>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Category</label>
                                <select
                                    className="select select-bordered w-full mt-1"
                                    {...register('category', { required: 'Category is required' })}
                                >
                                    <option value="" disabled>Select Category</option>
                                    <option>Breakfast</option>
                                    <option>Lunch</option>
                                    <option>Dinner</option>
                                </select>
                                {errors.category && (
                                    <span className="text-red-500 text-sm">{errors.category.message}</span>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Distributor Name</label>
                                <input
                                    type="text"
                                    placeholder="Distributor Name"
                                    className="input input-bordered w-full mt-1"
                                    defaultValue={user.displayName}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Distributor Email</label>
                                <input
                                    type="email"
                                    placeholder="Distributor Email"
                                    className="input input-bordered w-full mt-1"
                                    defaultValue={user.email}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium">Price</label>
                                <input
                                    type="number"
                                    className="input input-bordered w-full mt-1"
                                    {...register('price', { required: 'Price is required' })}
                                />
                                {errors.price && (
                                    <span className="text-red-500 text-sm">{errors.price.message}</span>
                                )}
                            </div>
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
                            <div className="md:col-span-2 flex flex-col md:flex-row items-center gap-x-6">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium">Image</label>
                                    <input
                                        type="file"
                                        className="file-input file:bg-purple-400 file-input-bordered w-full mt-1"
                                        {...register('image', { required: 'Image is required' })}
                                        onChange={(e) => setImagePreview(URL.createObjectURL(e.target.files[0]))}
                                    />
                                </div>
                                {errors.image && (
                                    <span className="text-red-500 text-sm">{errors.image.message}</span>
                                )}
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium">Description</label>
                                <textarea
                                    className="textarea textarea-bordered w-full mt-1"
                                    {...register('description', { required: 'Description is required' })}
                                />
                                {errors.description && (
                                    <span className="text-red-500 text-sm">{errors.description.message}</span>
                                )}
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium">Ingredients</label>
                                <textarea
                                    className="textarea textarea-bordered w-full mt-1"
                                    {...register('ingredients', { required: 'Ingredients are required' })}
                                />
                                {errors.ingredients && (
                                    <span className="text-red-500 text-sm">{errors.ingredients.message}</span>
                                )}
                            </div>
                            <div className="col-span-2  flex justify-end">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-6 py-2 bg-purple-200 text-gray-700 rounded-lg mr-4"
                                >
                                    Close
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-purple-400 text-white rounded-lg"
                                >
                                    Add Meal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default UpcomingModal;
