import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const Allreview = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: allreview = [] } = useQuery({
        queryKey: ['allreview'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/adminemail/${user?.email}`)
            return res.data
        }
    })

    const handleDelete = () => {
        
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
                            allreview?.map((review) => <tr key={review._id}>
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
                                    <Link to={`/review/${review._id}`} className='btn-md bg-purple-400 p-2 rounded-xl whitespace-nowrap'>View Meal</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allreview;