import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaDiagnoses, FaMapMarkerAlt, FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineTimeline } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const Mealdetials = () => {
    const meals = useLoaderData();
    const { image, title, price, rating, distributor, postTime, description, ingredients } = meals;
    const { user } = useAuth()
    console.log(user);
    const [review, setReview] = useState('');
    const axiosSecure = useAxiosSecure()

    // State for the review input and reviews
    const [reviews, setReviews] = useState([
        { name: "David Smith Jones", time: "2 minutes ago", content: "Amazing pizza! The taste was phenomenal. Great service too." },
        { name: "Christian Gray", time: "5 minutes ago", content: "The pizza was delicious and fresh. Highly recommend." }
    ]);

    const renderStar = (rating) => {
        const fullstar = Math.floor(rating);
        const halfstar = rating % 1 !== 0;
        const emptystar = 5 - fullstar - (halfstar ? 1 : 0);

        return (
            <>
                {Array(fullstar).fill(<FaStar className="text-yellow-500" />)}
                {halfstar && <FaStarHalfAlt className="text-yellow-500" />}
                {Array(emptystar).fill(<FaRegStar className="text-gray-400" />)}
            </>
        );
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
            const reviews = {
                name: user.displayName,
                email:user.email,
                photoURL : user.photoURL,
                review: review,
            };
        setReview("");
        try {
            axiosSecure.post('/review', reviews)
                .then(res => {
                    console.log(res.data);
                    setReview(res.data)
                    toast.success('Review Added')
                    setReview('')
            })
            
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="md:max-w-4xl lg:max-w-6xl mx-auto lg:px-0 px-4 py-5">
                {/* Image Section */}
                <img
                    src={image}
                    alt="Pizza"
                    className="rounded-lg w-full h-[400px] object-cover"
                />

                {/* Pizza Details */}
                <div className='mt-5'>
                    <div className='flex justify-between items-center md:items-start md:justify-start md:flex-col'>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="text-xl font-medium mt-2">${price}</p>
                    </div>

                    {/* Restaurant Details */}
                    <div className="flex flex-col gap-y-2 mt-2">
                        <p className="text-sm flex">{renderStar(rating)}</p>
                        <p className="flex items-center gap-x-5">
                            <div className='flex items-center gap-x-2'>
                                <FaDiagnoses className="mr-1" />
                                <span>{distributor}</span>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <MdOutlineTimeline />
                                <span>{postTime}</span>
                            </div>
                        </p>
                    </div>

                    {/* Description */}
                    <p className="mt-3">
                        {description}
                    </p>
                    <p className="mt-3">
                        <span className='font-medium'>Ingredient Used: </span>
                        {ingredients}
                    </p>

                    {/* Favorite Button */}
                    <div className='mt-3 flex gap-x-3'>
                        <button className="flex items-center bg-purple-400 py-2 px-3 rounded-lg">
                            Push for Meal
                        </button>
                        <button className="flex items-center bg-purple-400 py-2 px-3 rounded-lg">
                            <BiSolidLike />
                        </button>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="mt-5">
                    {/* Review Input Box */}
                    <form onSubmit={handleReviewSubmit} className="mb-5">
                        <textarea
                            className="w-full p-3 rounded-lg bg-white"
                            rows="3"
                            placeholder="Write your review here..."
                            value={review} 
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-2 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
                        >
                            Submit Review
                        </button>
                    </form>
                    {/* <h2 className="text-lg font-semibold mb-3">Reviews ({review.length})</h2> */}
                    {/* Existing Reviews */}
                    {/* {review.map((review, index) => (
                        <div key={index} className="bg-bae-100 border border-gray-300 p-4 rounded-lg mb-3">
                            <h3 className="font-semibold">{review.name}</h3>
                            <p className="text-gray-300 text-sm">{review.time}</p>
                            <p className="text-gray-400 mt-2">{review.content}</p>
                        </div>
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default Mealdetials;
