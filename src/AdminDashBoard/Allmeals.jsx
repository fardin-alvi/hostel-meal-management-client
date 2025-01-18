import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAuth from '../hooks/useAuth';
import Table from '../component/Table';
import { Link } from 'react-router-dom';

const Allmeals = () => {
    const{user}= useAuth()
    const axiosSecure = useAxiosSecure()

    const { data:mealsDetails=[] } = useQuery({
        queryKey: ['meal'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/meals/adminEmail/${user?.email}`)
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
                                    <button onClick={() => handledelete(meal?._id)} className='btn-sm bg-purple-400 px-4 rounded-xl'>Delete</button>
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