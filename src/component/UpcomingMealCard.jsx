import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom';

const UpcomingMealCard = ({ meal }) => {
    const { image, title, price, rating, _id } = meal

    const renderStar = (rating) => {
        const fullstar = Math.floor(rating)
        const halfstar = rating % 1 !== 0;
        const emptystar = 5 - fullstar - (halfstar ? 1 : 0)

        return <>
            {Array(fullstar).fill(<FaStar className="text-yellow-500" />)}
            {halfstar && <FaStarHalfAlt className="text-yellow-500" />}
            {Array(emptystar).fill(<FaRegStar className="text-gray-400" />)}
        </>
    }


    return (
        <div className="card shadow-xl bg-white">
            <figure>
                <img
                    src={meal?.image}
                    alt="item" />
            </figure>
            <div className="flex flex-col items-center py-4 gap-y-2">
                <h2 className='text-xl font-semibold'>{title}</h2>
                <p className='text-lg'>${price}</p>
                <p className='flex'>{renderStar(rating)}</p>
                <div>
                    <Link to={`/upcoming/meal/details/${_id}`}
                        className="bg-purple-400 px-4 py-1 rounded-lg hover:text-white">
                        Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UpcomingMealCard;