import React from 'react';
import { FaUserAlt, FaLock, FaImage, FaSign, FaAlignLeft } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc"; // Icon for Google
import Lottie from 'lottie-react';
import regiImg from '../assets/registerImage.jpg';
import lottiefile from '../assets/Animation - 1736790629236.json';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form"
import useAxiosPublic from '../hooks/useAxiosPublic';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';

const Register = () => {
    const axiosPublic = useAxiosPublic()
    const { CreateUser, singinWithGoogle, updateprofile, loading } = useAuth()
    const navigate = useNavigate()

    const { register, handleSubmit,reset} = useForm()
    const onSubmit = (data) => {
        CreateUser(data.email, data.password)
            .then(() => {
                updateprofile(data.name, data.photoURL)
                    .then( () => {
                        const user = {
                            name: data.name,
                            photoURL:data.photoURL,
                            email: data.email,
                            password:data.password
                        }
                        axiosPublic.post('/users',user)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset()
                                    navigate('/')
                                    toast.success('login Successfull')
                            }
                        })

                })
        })

        
    }

    return (
        <div className="flex items-center justify-evenly py-16 bg-gradient-to-r from-purple-500 to-pink-500">

            <div className="w-2/4">
                <Lottie animationData={lottiefile} loop={true} />
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">

                <div className="bg-black">
                    <img className="w-full h-48 object-cover" src={regiImg} alt="Header" />
                </div>

                <div className="p-6">
                    <h1 className="text-xl font-bold text-center pb-5">Welcome to the Website</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex items-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg py-2 px-4 mb-4">
                            <FaAlignLeft className="text-purple-500 mr-3" />
                            <input
                                type="text"
                                {...register("name",{required:true})}
                                placeholder="Name"
                                className="w-full bg-transparent focus:outline-none text-gray-700"
                            />
                        </div>

                        <div className="flex items-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg py-2 px-4 mb-4">
                            <FaImage className="text-purple-500 mr-3" />
                            <input
                                type="url"
                                placeholder="Photo URL"
                                {...register("PhotoURL",{ required: true })}
                                className="w-full bg-transparent focus:outline-none text-gray-700"
                            />
                        </div>

                        <div className="flex items-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg py-2 px-4 mb-4">
                            <FaUserAlt className="text-purple-500 mr-3" />
                            <input
                                type="text"
                                {...register("email", { required: true })}
                                placeholder="Email"
                                className="w-full bg-transparent focus:outline-none text-gray-700"
                            />
                        </div>

                        <div className="flex items-center bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg py-2 px-4 mb-4">
                            <FaLock className="text-purple-500 mr-3" />
                            <input
                                type="password"
                                {...register("password", { required: true })}
                                placeholder="Password"
                                className="w-full bg-transparent focus:outline-none text-gray-700"
                            />
                        </div>
 
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg"
                        >
                            REGISTER
                        </button>
                    </form>

                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-300" />
                        <span className="mx-4 text-sm text-gray-500">OR</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    <button
                        className="w-full flex items-center justify-center bg-black text-white border border-gray-300 font-semibold py-2 px-4 rounded-lg hover:bg-opacity-70 "
                    >
                        <FcGoogle className="text-xl mr-2" />
                        Register with Google
                    </button>
                    <p className='text-center pt-3'>Already Have and account? <Link to='/login' className='text-purple-400'>Log in</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;
