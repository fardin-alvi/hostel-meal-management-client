import React from 'react';
import useAuth from '../hooks/useAuth';
import { FaEdit, FaMapMarkerAlt, FaSignOutAlt, FaUpload } from 'react-icons/fa';
import ProfileRow from '../component/ProfileRow';

const AdminProfile = () => {
    const {user}= useAuth()
    return (
        <div className="flex justify-center flex-col items-center p-4">
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
                    </div>
                </div>
                {/* Profile Details */}
                <div className="mt-6 space-y-4">
                    <ProfileRow label="Email" value={user.email} />
                    {/* <ProfileRow
                        label="Subscription Type"
                        value={payments?.title || 'Unavailable'}
                    /> */}
                    <ProfileRow label="Time Zone" value={user.metadata.lastSignInTime} />
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;