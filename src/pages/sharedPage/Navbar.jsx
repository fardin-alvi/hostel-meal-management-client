import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'

const Navbar = ({ loggedIn, username, profilePic }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const links = <>
        <NavLink>Home</NavLink>
        <NavLink>Meals</NavLink>
        <NavLink>Upcoming Meals</NavLink>
    </>

    return (
        <nav className="bg-gradient-to-r from-purple-300 sticky top-0 z-10 to-pink-100 px-6 py-3">
            <div className="mx-auto flex justify-between items-center">
                <div className="flex items-center">
                    <img
                        src={logo} 
                        alt="Logo"
                        className="h-12 w-16"
                    />
                    <p className="text-xl font-bold">BunkInn</p>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    {links}
                    <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                            <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    {!loggedIn ? (
                        <Link to='/register' className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">Join Us</Link>
                    ) : (
                        <div className="relative">
                            {/* Profile Picture Dropdown */}
                            <button onClick={toggleDropdown} className="flex items-center space-x-2">
                                <img
                                    src={profilePic}
                                    alt="Profile"
                                    className="h-8 w-8 rounded-full"
                                />
                            </button>
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 p-2 bg-white border rounded shadow-lg w-48">
                                    <p className="text-sm font-semibold">{username}</p>
                                    <a href="/dashboard" className="block py-1 text-sm">Dashboard</a>
                                    <button onClick={() => alert('Logging out')} className="w-full text-left py-1 text-sm text-red-500">Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <div className="md:hidden">
                    <button className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
