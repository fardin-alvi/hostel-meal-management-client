import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import MealCard from '../component/MealCard';
import { Select } from '@headlessui/react';
import { FaSearch } from 'react-icons/fa';
import { MdArrowForwardIos } from "react-icons/md";
import useMeals from '../hooks/useMeals';

const Meals = () => {
    const axiosPublic = useAxiosPublic()
    const [searchMeal, setSearchMeal] = useState('')
    const [meals] = useMeals(searchMeal)

    const handleCategory = (e) => {
        setFilters((prev) => ({ ...prev, category: e.target.value }));
    };
    const handleSearch = (e) => {
        setSearchMeal(e.target.value);
        setFilters((prev) => ({ ...prev, search: e.target.value }));
    };
    return (
        <div className='px-6 bg-gradient-to-r from-purple-50 to-pink-50'>
            <h2 className='text-3xl text-center pt-4'>Our Meals</h2>
            <div className='flex justify-between items-center p-3'>
                <div className="w-full md:w-52">
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        onChange={handleCategory}
                    >
                        <option value="">All Categories</option>
                        <option value="Vegetarian">breakfast</option>
                        <option value="Non-Vegetarian">lunch</option>
                        <option value="Vegan">dinner</option>
                    </select>
                </div>
                <div className="relative w-full mb-3 md:w-1/4">
                    <input
                        type="text"
                        placeholder="Search Meals..."
                        onChange={(e) => setSearchMeal(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <FaSearch className="absolute top-3 right-3 text-gray-500" size={20} />
                </div>
                <div className="w-full md:w-52">
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">Price</option>
                        <option value="Price(low to high)">Price(low to high)</option>
                        <option value="Price(high to low)">Price(high to low)</option>
                    </select>
                </div>
            </div>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 py-16  gap-3'>
                {
                    meals?.map(meal => <MealCard key={meal._id} meal={meal} />)
                }
            </div>
        </div>
    );
};

export default Meals;