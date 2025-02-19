import React, { useState } from 'react';
import { FaHome, FaBars, FaTimes } from 'react-icons/fa';
import { MdDataSaverOff, MdFoodBank, MdOutlinePayments, MdOutlineRateReview, MdUpcoming } from "react-icons/md";
import { FaMessage } from 'react-icons/fa6';
import { RiApps2AddFill } from "react-icons/ri";
import { CiServer } from "react-icons/ci";
import { ImProfile } from "react-icons/im";
import { BiFoodMenu } from "react-icons/bi";
import { Link, NavLink, Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png';
import useAdmin from '../../hooks/useAdmin';

const DashBoard = () => {
    const [isAdmin] = useAdmin();
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!isMenuOpen);

    return (
        <div className="flex flex-col md:flex-row">
            <div className={`flex flex-col items-center bg-gradient-to-r from-purple-300 to-pink-300 py-4 px-8 max-md:h-full
                ${isMenuOpen ? 'absolute top-0 left-0 h-full w-3/4 z-50' : 'hidden'} md:flex md:relative md:w-1/4`}>
                <ul className="menu w-full">
                    <li className="mb-6">
                        <div className="flex flex-col items-center">
                            <img className="w-20 h-12" src={logo} alt="Logo" />
                            <h2 className="text-2xl font-semibold">BunkInn</h2>
                        </div>
                    </li>
                    {isAdmin ? (
                        <>
                            <li className="text-lg">
                                <Link to="/dashboard/adminoverview" onClick={toggleMenu}>
                                    <MdDataSaverOff />
                                    Overview
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/adminprofile" onClick={toggleMenu}>
                                    <ImProfile />
                                    Admin Profile
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/manageuser" onClick={toggleMenu}>
                                    <BiFoodMenu />
                                    Manage Users
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/addmeal" onClick={toggleMenu}>
                                    <RiApps2AddFill />
                                    Add Meal
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/allmeals" onClick={toggleMenu}>
                                    <MdFoodBank />
                                    All Meals
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/allreview" onClick={toggleMenu}>
                                    <MdOutlineRateReview />
                                    All Reviews
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/servemeal" onClick={toggleMenu}>
                                    <CiServer />
                                    Serve Meals
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/upcomingmeal" onClick={toggleMenu}>
                                    <MdUpcoming />
                                    Upcoming Meals
                                </Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="text-lg">
                                <Link to="/dashboard/useroverview" onClick={toggleMenu}>
                                    <MdDataSaverOff />
                                    Overview
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/myprofile" onClick={toggleMenu}>
                                    <ImProfile />
                                    My Profile
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/mealrequest" onClick={toggleMenu}>
                                    <BiFoodMenu />
                                    Requested Meal
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/myreview" onClick={toggleMenu}>
                                    <MdOutlineRateReview />
                                    My Reviews
                                </Link>
                            </li>
                            <li className="text-lg">
                                <Link to="/dashboard/payment-history" onClick={toggleMenu}>
                                    <MdOutlinePayments />
                                    Payment History
                                </Link>
                            </li>
                        </>
                    )}
                    <div className="divider"></div>
                    <li className="text-lg">
                        <Link to="/" onClick={toggleMenu}>
                            <FaHome />
                            Home
                        </Link>
                    </li>
                    <li className="text-lg">
                        <Link to="/meals" onClick={toggleMenu}>
                            <MdFoodBank />
                            Meals
                        </Link>
                    </li>
                    <li className="text-lg">
                        <Link to="/upcoming" onClick={toggleMenu}>
                            <MdUpcoming />
                            Upcoming Meals
                        </Link>
                    </li>
                    <li className="text-lg">
                        <Link to="/" onClick={toggleMenu}>
                            <FaMessage />
                            Contact
                        </Link>
                    </li>
                </ul>

                <button
                    className="mt-4 bg-green-400 text-white py-2 flex items-center justify-center px-4 rounded-md text-lg md:hidden"
                    onClick={toggleMenu}>
                    <FaTimes /> Close
                </button>
            </div>
            <div className="flex-1 px-6 py-5">
                <div className="md:hidden flex justify-between items-center mb-4">
                    <button onClick={toggleMenu} className="text-2xl">
                        {isMenuOpen ? <FaTimes /> : <FaBars />}
                    </button>
                    <h2 className="text-2xl font-semibold">BunkInn</h2>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default DashBoard;

