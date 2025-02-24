import React, { useEffect, useState } from 'react';
import MealCard from '../component/MealCard';
import { FaSearch } from 'react-icons/fa';
import useMeals from '../hooks/useMeals';
import InfiniteScroll from 'react-infinite-scroller';

const Meals = () => {
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All Categories');
    const [price, setPrice] = useState('');
    const [page, setPage] = useState(1);
    const [meals, isLoading, hasNextPage] = useMeals(search, category, price, page)

    const loadMeals = () => {
        if (hasNextPage) {
            setPage(prevPage => prevPage + 1)
        }
    }
    
    return (
        <div className='px-6 bg-gradient-to-r from-purple-50 to-pink-50'>
            <h2 className='text-3xl text-center pt-4'>Our Meals</h2>
            <div className='flex md:justify-between items-center gap-x-2 p-3 mt-6'>
                <div className="w-full md:w-52">
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}

                    >
                        <option value="">All Categories</option>
                        <option value="breakfast">breakfast</option>
                        <option value="lunch">lunch</option>
                        <option value="dinner">dinner</option>
                    </select>
                </div>
                <div className="relative w-full md:w-1/4">
                    <input
                        type="text"
                        placeholder="Search Meals..."
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <FaSearch className="absolute top-3 right-3 text-gray-500" size={20} />
                </div>
                <div className="w-full md:w-52">
                    <select
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    >
                        <option value="">Price</option>
                        <option value="Price(low to high)">Price(low to high)</option>
                        <option value="Price(high to low)">Price(high to low)</option>
                    </select>
                </div>
            </div>

            <InfiniteScroll
                pageStart={0}
                // loadMore={loadMeals}
                hasMore={hasNextPage}
            >
                <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 pt-8 pb-10 gap-3'>
                    {
                        meals?.map(meal => <MealCard key={meal?._id} meal={meal} />)
                    }
                </div>

            </InfiniteScroll>
            
        </div>
    );
};

export default Meals;