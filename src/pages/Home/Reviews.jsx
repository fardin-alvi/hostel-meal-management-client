import React, { useEffect, useState } from 'react';
import useMeals from '../../hooks/useMeals';
import { motion } from 'framer-motion';
import useAxiosPublic from '../../hooks/useAxiosPublic';

const Reviews = () => {
    const [reviews, setreviews] = useState([])
    const axiosPublic = useAxiosPublic()

    useEffect(() => {
        axiosPublic.get('/reviewes')
            .then(res => {
                console.log(res);
            setreviews(res.data)
        })
    },[])

    const sortedMeals = [...reviews].sort((a, b) => b.review_count - a.review_count);

    return (
        <>
            <div className='flex justify-center mt-4'>
                <h2 className='text-2xl font-semibold'>Top Meals Review</h2>
            </div>
            <div className="flex justify-center items-center py-12 px-4">
                <div className="flex justify-center gap-4 max-w-5xl">
                    {sortedMeals.slice(0, 3).map((meal, index) => (
                        <motion.div
                            key={meal.id}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }} // Slide in from left or right
                            animate={{ opacity: 1, x: 0 }} // Animate to center position
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className={`bg-white p-6 rounded-lg shadow-lg max-w-sm text-center 
    ${index === 1 ? 'scale-110' : 'scale-100'}`}
                        >
                            <h2 className="text-xl font-bold text-purple-600 flex justify-center items-center">
                                {meal.title}
                            </h2>
                            <p className="text-gray-600 italic mt-2">"{meal.review}"</p>
                            <div className="flex items-center mt-4 justify-center">
                                <img
                                    src={meal.photoURL || 'https://via.placeholder.com/50'}
                                    alt={meal.name}
                                    className="w-12 h-12 rounded-full"
                                />
                                <div className="ml-3 text-left">
                                    <h3 className="font-semibold">{meal.name}</h3>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
       </>
    );
};

export default Reviews;
