import React from 'react';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Icon for Google
import Lottie from 'lottie-react';
import regiImg from '../assets/registerImage.jpg';
import lottiefile from '../assets/Animation - 1736790629236.json';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center py-16 bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen">
            <div className="hidden md:block md:w-2/4">
                <Lottie animationData={lottiefile} loop={true} />
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
                <div className="bg-black">
                    <img className="w-full h-48 object-cover" src={regiImg} alt="Header" />
                </div>
                <div className="p-6">
                    <h1 className="text-xl font-bold text-center pb-5">Log in</h1>
                    <form>
 
                        <div className="flex items-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg py-2 px-4 mb-4">
                            <FaUserAlt className="text-purple-500 mr-3" />
                            <input
                                type="text"
                                placeholder="Email"
                                className="w-full bg-transparent focus:outline-none text-gray-700"
                            />
                        </div>
                        <div className="flex items-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg py-2 px-4 mb-4">
                            <FaLock className="text-purple-500 mr-3" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full bg-transparent focus:outline-none text-gray-700"
                            />
                        </div>
                        <div className="text-right text-sm text-gray-500 mb-4">
                            <a href="#" className="hover:underline">Forgot Password?</a>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            LOGIN
                        </button>
                    </form>
                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-300" />
                        <span className="mx-4 text-sm text-gray-500">OR</span>
                        <hr className="w-full border-gray-300" />
                    </div>
                    <button
                        className="w-full flex items-center justify-center bg-black text-white border border-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-opacity-70"
                    >
                        <FcGoogle className="text-xl mr-2" />
                        Login with Google
                    </button>
                    <p className="text-center pt-3">Haven't any account? <Link to="/register" className="text-purple-400">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
