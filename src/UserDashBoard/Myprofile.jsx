import React from 'react';
import useAuth from '../hooks/useAuth';
import { FaEdit, FaMapMarkerAlt, FaSignOutAlt, FaUpload } from 'react-icons/fa';
import usePayments from '../hooks/usePayments';

const Myprofile = () => {
    const { user } = useAuth()
    console.log(user);
    const {payments} = usePayments()
    console.log(payments);

    return (
        <div className=" flex justify-center flex-col items-center p-4">
            {/* Profile Section */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 w-full max-w-4xl shadow-lg rounded-lg mt-4 p-6">
                {/* Profile Picture and Basic Info */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start">
                    <div className="relative">
                        <img
                            src={user.photoURL}
                            alt="Profile"
                            className="w-24 h-24 rounded-full border-4 border-blue-500"
                        />
                    </div>
                    <div className="sm:ml-6 mt-4 sm:mt-0 text-center sm:text-left">
                        <h1 className="text-xl font-bold text-gray-800">{user?.displayName}</h1>
                        <p className="text-gray-600">User</p>
                        {/* <div className="flex items-center text-gray-600 mt-2">
                            <FaMapMarkerAlt className="mr-2" />
                            {users.location}
                        </div> */}
                    </div>
                </div>
                {/* Profile Details */}
                <div className="mt-6 space-y-4">
                    <ProfileRow label="Email" value={user.email}  />
                    <ProfileRow
                        label="Subscription Type"
                        value={payments?.title || 'Unavailable'}
                        // action={<span className="text-blue-600 cursor-pointer">Upgrade</span>}
                    />
                    <ProfileRow label="Time Zone" value={user.metadata.lastSignInTime}  />
                    {/* <ProfileRow label="Language" value={users.language}  /> */}
                    {/* <ProfileRow label="Password" value="********"  /> */}
                </div>
            </div>
        </div>
    );
};

const ProfileRow = ({ label, value , link, action }) => (
    <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <div>
            <h3 className="text-gray-600">{label}</h3>
            {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    {value}
                </a>
            ) : (
                <p className="text-gray-800">{value}</p>
            )}
        </div>
        {/* { && (
            <button className="text-blue-600 flex items-center">
                <FaEdit className="mr-2" /> Edit
            </button>
        )} */}
        {action && action}
    </div>
);

export default Myprofile;