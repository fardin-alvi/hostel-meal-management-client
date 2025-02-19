import React from 'react';
import Banner from './Banner';
import MealsCategory from './MealsCategory';
import Package from './Package';
import Immergency from '../../component/Immergency';
import Exchange from './Exchnage';
import TodaysMenu from './TodaysMenu';
import Reviews from './Reviews';

const Home = () => {
    return (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50'>
            <Banner />
            <Immergency/>
            <MealsCategory />
            <TodaysMenu/>
            <Package />
            <Reviews/>
            <Exchange/>
        </div>
    );
};

export default Home;