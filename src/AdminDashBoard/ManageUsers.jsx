import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { BsPersonFillCheck } from "react-icons/bs";
import toast from 'react-hot-toast';
import Pagination from '../component/Pagination';

const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1);

    const { data: userInfo = {}, refetch } = useQuery({
        queryKey: ['userinfo',search,currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?search=${search}&page=${currentPage}`)
            return res.data
        },
        enabled: true,
    })

    const handleAdmin = (id) => {
        axiosSecure.patch(`/users/admin/${id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch()
                    toast.success('Action Completed')
                }
            })
    }

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 mx-20 pt-5">
            <div className="max-w-2xl mx-auto">
                <div className="flex justify-start mb-5">
                    <input
                        type="text"
                        placeholder="Search by username or email"
                        className="input input-bordered w-full max-w-xs"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <div className="overflow-x-auto py-2">
                    <table className="table max-w-2xl mx-auto rounded">
                        <thead className="bg-white text-center">
                            <tr>
                                <th>UserName</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Subscription-Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {
                                userInfo?.data?.map((user) => (
                                <tr key={user._id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === "admin" ? (
                                            "Admin"
                                        ) : (
                                            <button
                                                onClick={() => handleAdmin(user._id)}
                                                className="btn-sm bg-purple-400 rounded-lg"
                                            >
                                                <BsPersonFillCheck />
                                            </button>
                                        )}
                                    </td>
                                    <td>{user.subscription || "None"}</td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='pb-4'>
                <Pagination
                    currentPage={userInfo?.currentPage}
                    totalPages={userInfo?.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default ManageUsers;