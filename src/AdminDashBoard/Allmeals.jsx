import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Table from '../component/Table';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Allmeals = () => {
    const{user}= useAuth()
    const axiosSecure = useAxiosSecure()
    const [sort,setSort]= useState("")

    const { data:mealsDetails=[],refetch } = useQuery({
        queryKey: ['meal',sort],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals?sort=${sort}`)
            return res.data
        }
    })

    const handledelete =async (id) => {
        const res = await axiosSecure.delete(`/meals/${id}`)
        console.log(res.data);
        if (res.data.deletedCount > 0) {
            toast.success('Meal Deleted')
            refetch()
        }
    }


    return (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50 mx-20 pt-5'>
            <div className="w-full pl-2 md:w-52">
                <select
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}

                >
                    <option value="">sort by</option>
                    <option value="likes">likes</option>
                    <option value="review-count">review-Count</option>
                </select>
            </div>
            <div className="overflow-x-auto py-2">
                <table className="table max-w-2xl mx-auto rounded">
                    <thead className='bg-white text-center'>
                        <tr>
                            <th>Title</th>
                            <th>Likes</th>
                            <th>Review-Count</th>
                            <th>Rating</th>
                            <th>Distributor-Name</th>
                            <th>Action</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            mealsDetails?.map((meal) => <tr key={meal._id}>
                                <td>
                                    {meal.title}
                                </td>
                                <td>
                                    {meal.likes || 0}
                                </td>
                                <td>
                                    {meal?.review_count || 0}
                                </td>
                                <td>
                                    {meal?.rating || 0}
                                </td>
                                <td>
                                    {meal?.distributor || 0}
                                </td>
                                <td>
                                    <button className='btn-sm bg-purple-400 px-4 rounded-xl'>Edit</button>
                                </td>
                                <td>
                                    <button onClick={() => handledelete(meal._id)} className='btn-sm bg-purple-400 px-4 rounded-xl'>Delete</button>
                                </td>
                                <td>
                                    <Link to={`/meal/${meal._id}`} className='btn-md bg-purple-400 p-2 rounded-xl whitespace-nowrap'>View Meal</Link>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Allmeals;