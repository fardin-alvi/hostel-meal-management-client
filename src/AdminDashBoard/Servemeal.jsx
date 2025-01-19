import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';

const Servemeal = () => {
    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState('');

    const { data: requestedmeals = [], refetch } = useQuery({
        queryKey: ['mrealrequest',search],
        queryFn: async () => {
            const res = await axiosSecure(`/admin/mealreq?search=${search}`)
            return res.data
        },
        enabled: search.length > 0 || search.length === 0 
    })

    const handleServe = async (meal) => {
        const res = await axiosSecure.patch(`/mealreq/user/${meal.requested_user}/meal/${meal._id}`)
        if (res.data.modifiedCount > 0) {
            toast.success('Status Updated')
            refetch()
        }
    }



    return (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50 mx-20 pt-5'>
            <div className="relative pl-14 w-full mb-3 md:w-2/4">
                <input
                    type="text"
                    placeholder="Search by username or email"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <FaSearch className="absolute top-3 right-3 text-gray-500" size={20} />
            </div>
            <div className="overflow-x-auto py-2">
                <table className="table max-w-2xl mx-auto rounded">
                    <thead className='bg-white text-center'>
                        <tr>
                            <th>Title</th>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            requestedmeals?.map((requestedmeal) => <tr key={requestedmeal._id}>
                                <td>
                                    {requestedmeal.title}
                                </td>
                                <td>
                                    {requestedmeal.requested_user}
                                </td>
                                <td>
                                    {requestedmeal?.requested_user_name}
                                </td>
                                <td>
                                    {requestedmeal?.status}
                                </td>
                                <td>
                                    <button onClick={() => handleServe(requestedmeal)} className='btn-sm bg-purple-400 px-4 rounded-xl'>Serve</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Servemeal;