import React from 'react';
import useAuth from '../hooks/useAuth';
import usePayments from '../hooks/usePayments';
import ProfileRow from '../component/ProfileRow';
import useUsers from '../hooks/useUsers';
import { LuBadge, LuBadgeCheck } from 'react-icons/lu';

const Myprofile = () => {
    const { user } = useAuth();
    const [users] = useUsers()

    return (
        <div className="flex justify-center flex-col items-center p-4">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 w-full max-w-4xl shadow-lg rounded-lg mt-4 p-6">
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
                        {
                            users?.subscription !== 'Bronze' ? <div className="text-gray-600 flex items-center gap-x-2 justify-center"><LuBadgeCheck className='text-green-500' /><span>Premium User</span></div> : <div className="text-gray-600 flex items-center justify-center gap-x-2 "><LuBadge className='text-red-300' /><span>Generel User</span></div>
                        }
                    </div>
                </div>
                <div className="mt-6 space-y-4">
                    <ProfileRow label="Email" value={user.email} />
                    <ProfileRow
                        label="Subscription Type"
                        value={users?.subscription || 'bronze'}
                    />
                    <ProfileRow label="Time Zone" value={user.metadata.lastSignInTime} />
                </div>
            </div>
        </div>
    );
};

export default Myprofile;
