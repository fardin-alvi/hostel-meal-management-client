import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Pagination from '../component/Pagination';

const MyReview = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null); // For the review to be edited
    const [newReview, setNewReview] = useState(''); // To hold updated review text

    const { data: reviews = {}, refetch } = useQuery({
        queryKey: ['reviews', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/reviews/useremail/${user?.email}?page=${currentPage}`);
            return res.data;
        },
        enabled: true,
    });

    const handleDelete = async (id) => {
        try {
            const res = await axiosSecure.delete(`/reviews/useremail/${user?.email}/meal/${id}`);
            if (res.data.deletedCount > 0) {
                toast.success('Deleted successfully');
                refetch();
            } else {
                toast.error('Failed to delete');
            }
        } catch (error) {
            toast.error('Error deleting review');
        }
    };

    const handleEdit = (review) => {
        setSelectedReview(review); 
        setNewReview(review.review);
        setIsModalOpen(true); 
    };

    const handleSubmit = async () => {
        try {
            const res = await axiosSecure.patch(`/reviews/user/${selectedReview._id}`, { review: newReview });
            if (res.data.modifiedCount > 0) {
                toast.success('Review updated successfully');
                refetch();
                setIsModalOpen(false);
            } else {
                toast.error('Failed to update review');
            }
        } catch (error) {
            toast.error('Error updating review');
        }
    };

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 md:mx-20 pt-5">
            <div className="overflow-x-auto py-2">
                <table className="table max-w-2xl mx-auto rounded">
                    <thead className="bg-white text-center">
                        <tr>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Review</th>
                            <th>Action</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {reviews?.data?.map((review) => (
                            <tr key={review._id}>
                                <td>{review.title}</td>
                                <td>{review.likes || 0}</td>
                                <td>{review?.review}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(review)}
                                        className="btn-sm bg-purple-400 px-4 rounded-xl"
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(review?._id)}
                                        className="btn-sm bg-purple-400 px-4 rounded-xl"
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td>
                                    <Link
                                        to={`/meal/${review.mealId}`}
                                        className="btn-md bg-purple-400 p-2 rounded-xl whitespace-nowrap"
                                    >
                                        View Meal
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pb-4">
                <Pagination
                    currentPage={reviews.currentPage}
                    totalPages={reviews.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-md w-1/3">
                        <h2 className="text-xl font-bold mb-4">Edit Review</h2>
                        <textarea
                            className="w-full border border-gray-300 rounded-md p-2"
                            rows="4"
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-300 rounded-md mr-2"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-4 py-2 bg-purple-500 text-white rounded-md"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyReview;
