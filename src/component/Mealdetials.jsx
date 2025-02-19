import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaDiagnoses,  FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { MdOutlineTimeline } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAxiosPublic from '../hooks/useAxiosPublic';

const Mealdetials = () => {
    const meals = useLoaderData();
    const { image, title, price, rating, distributor, postTime, description, ingredients, _id, likes } = meals;
    const { user } = useAuth();
    const [review, setReview] = useState('');
    const [reviews, setReviews] = useState([]);
    const [like, setLike] = useState(meals.likes || "");
    const [hasLiked, setHasLiked] = useState(false);
    
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [hascliked, sethasClicked] = useState(false)
    useEffect(() => {

        axiosPublic.get(`/reviews/${_id}`)
            .then(res => {
                setReviews(res.data);
            })
            .catch(error => {
                console.error('Error fetching reviews:', error);
            });
    }, [_id])

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
        const newReview = {
            mealId: _id,
            title: title,
            likes: likes,
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            review: e.target.review.value,
            time: new Date().toLocaleString(),
            review_count:0
        };

        setReviews(prevReviews => [...prevReviews, newReview]);

        axiosSecure.post('/review', newReview)
            .then(res => {
                toast.success('Review Added');
            })
            .catch(error => {
                toast.error('Failed to add review');
            });

        e.target.reset();
    };

    const handlelikes = async () => {
        if (user) {
            if (hasLiked) {
                toast.error('You have already liked this meal!');
                return;
            }
            const response = await axiosSecure.patch(`/like/${_id}`);
            if (response.status === 200) {
                setLike(prev => prev + 1);
                setHasLiked(true);
                toast.success('Like added!');
            }
        } else {
            navigate('/login');
        }
    };

    const handleMealRequest = async (meal) => {
        if (user) {
            if (hascliked) {
                toast.error('you already requested for this meal')
                return
            }
            const mealDetails = await axiosPublic.get(`/meal/${_id}`);
            axiosSecure.post('/mealrequest', {
                mealId: _id,
                title: meal.title,
                likes: meal.likes || 0,
                requested_user: user.email,
                requested_user_name: user.displayName,
                review_count: mealDetails.data.review_count,
                status: 'pending',
                requestTime: new Date().toLocaleString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'})
            })
                .then(res => {
                    if (res.data.insertedId) {
                        sethasClicked(true)
                        toast.success('Meal Requested Done..');
                    }
                });
        } else {
            navigate('/login')
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-50 to-pink-50">
            <div className="md:max-w-4xl lg:max-w-6xl mx-auto lg:px-0 px-4 py-5">
                <div className="relative">
                    <img
                        src={image}
                        alt="Pizza"
                        className="rounded-lg w-full h-[400px] object-cover"
                    />
                    {
                        like && <div className="absolute bottom-2 left-0 bg-black text-white px-3 py-1 rounded flex items-center gap-x-2">
                            Reactions
                            <span>{like}</span>
                        </div>
                    }
                </div>

                <div className='mt-5'>
                    <div className='flex justify-between items-center md:items-start md:justify-start md:flex-col'>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="text-xl font-medium mt-2">${price}</p>
                    </div>

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
                    <p className="mt-3">
                        {description}
                    </p>
                    <p className="mt-3">
                        <span className='font-medium'>Ingredient Used: </span>
                        {ingredients}
                    </p>
                    <div className='mt-3 flex gap-x-3'>
                        <button onClick={() => handleMealRequest(meals)} disabled={hascliked} className="flex items-center bg-purple-400 py-2 px-3 rounded-lg">
                            {hascliked ? <span className="ml-2 text-gray-500">Meal Requested</span> : <span >Request for Meal</span>}
                        </button>
                        <button onClick={handlelikes} disabled={hasLiked} className="flex items-center bg-purple-400 py-2 px-3 rounded-lg">
                            <BiSolidLike />
                            {hasLiked && <span className="ml-2 text-gray-500">Liked</span>}
                        </button>
                    </div>
                </div>
                <div className="mt-5">
                    <form onSubmit={handleReviewSubmit} className="mb-5">
                        <textarea
                            className="w-full p-3 rounded-lg bg-white"
                            rows="3"
                            required
                            placeholder="Write your review here..."
                            name='review'
                        ></textarea>
                        <button
                            type="submit"
                            className="mt-2 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
                        >
                            Submit Review
                        </button>
                    </form>
                    <h2 className="text-lg font-semibold mb-3">Reviews ({reviews.length})</h2>
                    {reviews?.map((review) => (
                        <div key={review._id} className="bg-bae-100 border border-gray-300 p-4 rounded-lg mb-3">
                            <div className='flex items-center justify-start gap-x-3'>
                                <img className='rounded-full w-10 h-10' src={review.photoURL} alt="" />
                                <div>
                                    <h3 className="font-semibold">{review.name}</h3>
                                    <p className=" text-sm">{review.time}</p>
                                </div>
                            </div>

                            <p className="text-gray-400 mt-2">{review.review}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Mealdetials;
