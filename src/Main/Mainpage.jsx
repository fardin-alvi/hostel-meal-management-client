import React from 'react';
import Navbar from '../pages/sharedPage/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/sharedPage/Footer';

const Mainpage = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
            <Footer/>
        </div>
    );
};

export default Mainpage;