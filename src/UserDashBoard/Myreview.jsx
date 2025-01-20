import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Pagination from '../component/Pagination';

const Myreview = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const [currentPage,setCurrentPage]= useState(1)


    const { data: reviews = {}, refetch } = useQuery({
        queryKey: ['reviews',currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/useremail/${user?.email}?page=${currentPage}`)
            return res.data
        },
        enabled:true
    })

    const handledelete = async (id) => {
        try {
            const res = await axiosSecure.delete(`/reviews/useremail/${user?.email}/meal/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success('Deleted successfully');
                refetch();
            } else {
                toast.error('Failed to delete');
            }
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Error deleting review');
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
                            <th>Review</th>
                            <th>Action</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            reviews?.data?.map((review) => <tr key={review._id}>
                                <td>
                                    {review.title}
                                </td>
                                <td>
                                    {review.likes || 0}
                                </td>
                                <td>
                                    {review?.review}
                                </td>
                                <td>
                                    <button className='btn-sm bg-purple-400 px-4 rounded-xl'>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handledelete(review?._id)} className='btn-sm bg-purple-400 px-4 rounded-xl'>Delete</button>
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
                    currentPage={reviews.currentPage}
                    totalPages={reviews.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default Myreview;