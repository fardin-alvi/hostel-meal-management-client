import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import { FaSearch } from 'react-icons/fa';
import Pagination from '../component/Pagination';

const Servemeal = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const { data: requestedMealsData = {}, refetch } = useQuery({
        queryKey: ['mealrequest', search, currentPage],
        queryFn: async () => {
            const res = await axiosSecure(`/admin/mealreq?search=${search}&page=${currentPage}`);
            return res.data;
        },
        enabled: true,
    });

    const handleServe = async (meal) => {
        const res = await axiosSecure.patch(`/mealreq/user/${meal.requested_user}/meal/${meal._id}`);
        if (res.data.modifiedCount > 0) {
            toast.success('Status Updated');
            refetch();
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 mx-20 pt-5">
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
                    <thead className="bg-white text-center">
                        <tr>
                            <th>Title</th>
                            <th>User Email</th>
                            <th>User Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {requestedMealsData?.data?.map((requestedMeal) => (
                            <tr key={requestedMeal._id}>
                                <td>{requestedMeal.title}</td>
                                <td>{requestedMeal.requested_user}</td>
                                <td>{requestedMeal?.requested_user_name}</td>
                                <td>{requestedMeal?.status}</td>
                                <td>
                                    <button
                                        onClick={() => handleServe(requestedMeal)}
                                        className="btn-sm bg-purple-400 px-4 rounded-xl"
                                    >
                                        Serve
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='pb-4'>
                <Pagination
                    currentPage={requestedMealsData.currentPage}
                    totalPages={requestedMealsData.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default Servemeal;
