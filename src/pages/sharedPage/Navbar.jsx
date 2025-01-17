import React, { useState } from 'react';
import { Link, NavLink, useParams } from 'react-router-dom';
import logo from '../../assets/logo.png'
import useAuth from '../../hooks/useAuth';

const Navbar = () => {
    const { user, logout } = useAuth()

    const handlelogOut = () => {
        logout().then(() => {
        }).catch(err => console.log(err.message))
    }

    const links = <>
        <NavLink to='/' className='text-lg md:mr-3'>Home</NavLink>
        <NavLink to='/meals' className='text-lg md:mr-3'>Meals</NavLink>
        <NavLink to='/upcoming' className='text-lg md:mr-3'>Upcoming Meals</NavLink>
    </>

    return (
        <div className="navbar bg-gradient-to-r from-purple-300 sticky top-0 z-10 to-pink-100 px-6 py-3  ">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
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
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="Logo"
                        className="h-12 w-16"
                    />
                    <p className="text-xl font-bold">BunkInn</p>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className='navbar-end'>
                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user?.photoURL} />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">

                            <button disabled={true} className="text-start pl-3 cursor-not-allowed ">
                                {user.displayName}
                            </button>
                            {
                                user && <>
                                    <li><Link to='/dashboard' className='justify-between'>Dashboard</Link></li>
                                </>
                            }
                            <li onClick={handlelogOut} ><p>Logout</p></li>
                        </ul>
                    </div> : <Link to='/register' className="px-4 py-2 rounded-lg bg-purple-400">Join Us</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;
