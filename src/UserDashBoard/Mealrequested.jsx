import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';

const Mealrequested = () => {
    const axiosSecure = useAxiosSecure()

    const { data: mealRequest = [] } = useQuery({
        queryKey: ['mealrequest'],
        queryFn: async () => {
            const res = await axiosSecure.get('/mealrequest')
            return res.data
        }
    })

    return (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50 mx-20 pt-5'>
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
                            mealRequest?.map((request) => <tr key={request._id}>
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
                                    <button className='btn-sm bg-purple-400 px-4 rounded-xl'>Cencel</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Mealrequested;