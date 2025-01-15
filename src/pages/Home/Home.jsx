import React from 'react';
import Banner from './Banner';
import MealsCategory from './MealsCategory';
import Package from './Package';

const Home = () => {
    return (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50'>
            <Banner />
            <MealsCategory />
            <Package/>
        </div>
    );
};

export default Home;