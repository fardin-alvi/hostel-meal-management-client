import React from 'react';
import { FaBars, FaHome, } from 'react-icons/fa';
import { MdFoodBank, MdOutlinePayments, MdOutlineRateReview, MdPayments, MdUpcoming } from "react-icons/md";
import { FaMessage, FaShop } from 'react-icons/fa6';
import { CiServer } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { BiFoodMenu } from "react-icons/bi";
import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { FcAddDatabase } from 'react-icons/fc';
import useAdmin from '../../hooks/useAdmin';

const DashBoard = () => {
    const [isAdmin] = useAdmin()


    return (
        <div className='flex'>
            <div className='max-h-full flex flex-col items-center bg-gradient-to-r from-purple-300 to-pink-300 py-4 px-8'>

                <ul className='menu'>
                    <li className='mb-6'>
                        <div className='flex flex-col items-start'>
                            <img className='w-20 h-12' src={logo} alt="" />
                            <h2 className='text-2xl font-semibold'>BunkInn</h2>
                        </div>
                    </li>
                    {
                        isAdmin ? <>
                            <li className='text-lg'>
                                <Link to='/dashboard/myprofile'>
                                    <ImProfile />
                                    Admin Profile
                                </Link>
                            </li>
                            <li className='text-lg'>
                                <Link to='/dashboard/myprofile'>
                                    <BiFoodMenu />
                                    Manage Users
                                </Link>
                            </li>
                            <li className='text-lg'>
                                <Link to='/dashboard/myprofile'>
                                    <FcAddDatabase />
                                    Add Meal
                                </Link>
                            </li>
                            <li className='text-lg'>
                                <Link to='/dashboard/myprofile'>
                                    <MdFoodBank />
                                    All Meals
                                </Link>
                            </li>
                            <li className='text-lg'>
                                <Link to='/dashboard/myprofile'>
                                    <MdOutlineRateReview />
                                    All Reviews
                                </Link>
                            </li>
                            <li className='text-lg'>
                                <Link to='/dashboard/myprofile'>
                                    <CiServer />
                                    Serve Meals
                                </Link>
                            </li>
                            <li className='text-lg'>
                                <Link to='/dashboard/myprofile'>
                                    <MdUpcoming />
                                    Upcoming Meals
                                </Link>
                            </li>
                        </> : <>
                            <li className='text-lg'>
                                <NavLink to='/dashboard/myprofile'>
                                    <ImProfile />
                                    My Profile
                                </NavLink>
                            </li>
                            <li className='text-lg'>
                                <NavLink to='/dashboard/mealrequest'>
                                    <BiFoodMenu />
                                    Requested Meal
                                </NavLink>
                            </li>
                            <li className='text-lg'>
                                <NavLink to='/dashboard/myreview'>
                                    <MdOutlineRateReview />
                                    My Reviews
                                </NavLink>
                            </li>
                            <li className='text-lg'>
                                <NavLink to='/dashboard/payment-history'>
                                    <MdOutlinePayments />
                                    Payment History
                                </NavLink>
                            </li>
                        </>
                    }
                    <div className='divider'></div>
                    <li className='text-lg'>
                        <NavLink to='/'>
                            <FaHome />
                            Home
                        </NavLink>
                    </li>
                    <li className='text-lg'>
                        <NavLink to='/meals'>
                            <MdFoodBank />
                            Meals
                        </NavLink>
                    </li>
                    <li className='text-lg'>
                        <NavLink to='/upcoming'>
                            <MdUpcoming />
                            Upcoming Meals
                        </NavLink>
                    </li>
                    <li className='text-lg'>
                        <NavLink to='/ouritems/salad'>
                            <FaMessage />
                            Contact
                        </NavLink>
                    </li>

                </ul>
            </div>
            <div className='flex-1 px-6 py-5'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;