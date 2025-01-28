import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Pagination from '../component/Pagination';
import UpcomingModal from '../component/UpcomingModal';

const AllMeals = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [sort, setSort] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMeal, setSelectedMeal] = useState(null); 

    const { data: mealsDetails = {}, refetch } = useQuery({
        queryKey: ['meal', sort, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/byadmin?sort=${sort}&page=${currentPage}`);
            return res.data;
        },
        enabled: !!axiosSecure,
    });

    const handleDelete = async (id) => {
        const res = await axiosSecure.delete(`/meals/${id}`);
        if (res.data.deletedCount > 0) {
            toast.success('Meal Deleted');
            refetch();
        }
    };

    const handleEdit = (meal) => {
        setSelectedMeal(meal);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedMeal(null);
    };

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 md:mx-20 pt-5">
            <div className=" px-3 md:pl-2 w-52">
                <select
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="">Sort by</option>
                    <option value="likes">Likes</option>
                    <option value="review-count">Review Count</option>
                </select>
            </div>

            <div className="overflow-x-auto py-2">
                <table className="table max-w-2xl mx-auto rounded">
                    <thead className="bg-white text-center">
                        <tr>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Review Count</th>
                            <th>Rating</th>
                            <th>Distributor</th>
                            <th colSpan="3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {mealsDetails?.data?.length > 0 ? (
                            mealsDetails.data.map((meal) => (
                                <tr key={meal._id}>
                                    <td>{meal.title}</td>
                                    <td>{meal.likes || 0}</td>
                                    <td>{meal.review_count || 0}</td>
                                    <td>{meal.rating || 0}</td>
                                    <td>{meal.distributor || 'N/A'}</td>
                                    <td>
                                        <button
                                            onClick={() => handleEdit(meal)}
                                            className="btn-sm bg-purple-400 px-4 rounded-xl"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(meal._id)}
                                            className="btn-sm bg-purple-400 px-4 rounded-xl"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td>
                                        <Link
                                            to={`/meal/${meal._id}`}
                                            className="btn-md bg-purple-400 p-2 rounded-xl whitespace-nowrap"
                                        >
                                            View Meal
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No meals found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="pb-4">
                <Pagination
                    currentPage={mealsDetails.currentPage}
                    totalPages={mealsDetails.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>

            <UpcomingModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                refetch={refetch}
                mealData={selectedMeal} 
            />
        </div>
    );
};

export default AllMeals;
