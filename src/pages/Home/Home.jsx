import React from 'react';
import Banner from './Banner';
import MealsCategory from './MealsCategory';

const Home = () => {
    return (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50'>
            <Banner />
            <MealsCategory/>
        </div>
    );
};

export default Home;