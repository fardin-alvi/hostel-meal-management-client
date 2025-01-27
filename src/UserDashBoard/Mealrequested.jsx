import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import Pagination from '../component/Pagination';

const Mealrequested = () => {
    const {user}= useAuth()
    const axiosSecure = useAxiosSecure()
    const [currentPage,setCurrentPage]= useState(1)

    const { data: mealRequest = {},refetch } = useQuery({
        queryKey: ['mealrequest',currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/mealrequest/user/${user?.email}?page=${currentPage}`)
            return res.data
        },
        enabled:true
    })

    const handledelete = (id, status) => {
        if (status !== 'delivered') {
            axiosSecure.delete(`/mealreq/useremail/${user?.email}/meal/${id}`)
                .then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        toast.success('Canceled Requested Meal');
                    }
                });
        } else {
            toast.error("Can't cancel, it's already delivered");
        }
    };

    return (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50 md:mx-20 pt-5'>
            <div className="overflow-x-auto py-2">
                <table className="table max-w-2xl mx-auto rounded">
                    <thead className='bg-white text-center'>
                        <tr>
                            <th>title</th>
                            <th>Email</th>
                            <th>Likes</th>
                            <th>Review Count</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            mealRequest?.data?.map((request) => <tr key={request._id}>
                                <td>
                                    {request.title}
                                </td>
                                <td>
                                    {request.requested_user}
                                </td>
                                <td>
                                    {request.likes}
                                </td>
                                <td>
                                    {request.review_count}
                                </td>
                                <td>
                                    {request.status}
                                </td>
                                <td>
                                    <button onClick={() => handledelete(request._id, request?.status)} className='btn-sm bg-purple-400 px-4 rounded-xl'>Cencel</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className='pb-4'>
                <Pagination
                    currentPage={mealRequest.currentPage}
                    totalPages={mealRequest.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default Mealrequested;