import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Pagination from '../component/Pagination';

const Allreview = () => {
    const axiosSecure = useAxiosSecure()
    const [currentPage,setCurrentPage] = useState(1)

    const { data: allreview = {},refetch } = useQuery({
        queryKey: ['allreview',currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/admin/reviews?page=${currentPage}`)
            return res.data
        },
        enabled:true

    })

    const handleDelete = async (id) => {
        try {
            const res = await axiosSecure.delete(`/admin/review/${id}`)
            if (res.data.deleteCount) {
                toast.success()
                refetch()
            }
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    return (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50 mx-20 pt-5'>
            <div className="overflow-x-auto py-2">
                <table className="table max-w-2xl mx-auto rounded">
                    <thead className='bg-white text-center'>
                        <tr>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Review-Count</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            allreview?.data?.map((review) => <tr key={review._id}>
                                <td>
                                    {review.title}
                                </td>
                                <td>
                                    {review.likes || 0}
                                </td>
                                <td>
                                    {review?.review_count || 0}
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(review?._id)} className='btn-sm bg-purple-400 px-4 rounded-xl'>Delete</button>
                                </td>
                                <td>
                                    <Link to={`/meal/${review.mealId}`} className='btn-md bg-purple-400 p-2 rounded-xl whitespace-nowrap'>View Meal</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className='pb-4'>
                <Pagination
                    currentPage={allreview.currentPage}
                    totalPages={allreview.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default Allreview;