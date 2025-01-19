import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import UpcomingModal from '../component/UpcomingModal';

const UpcomingMeal = () => {
    const axiosSecure = useAxiosSecure()
    const [isModalOpen, setModalOpen] = useState(false)

    const { data: upcominMeal = [], refetch } = useQuery({
        queryKey: ["upcomingMeal"],
        queryFn: async () => {
            const res = await axiosSecure('/upcomingmeal/byadmin')
            return res.data
        }
    })

    const handlePublish = async (meal) => {
        const res = await axiosSecure.post('/upcomingmeal/byadmin', meal)
        if (res.data.insertedId) {
            refetch()
            toast.success('Meal Published')
        }
    }

    return (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50 mx-20 pt-5'>
            <div className="overflow-x-auto py-2">
                <table className="table max-w-2xl mx-auto rounded">
                    <thead className='bg-white text-center'>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Likes</th>
                            <th>Distributor</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            upcominMeal?.map((upcoming) => <tr key={upcoming._id}>
                                <td>
                                    {upcoming.title}
                                </td>
                                <td>
                                    {upcoming.category}
                                </td>
                                <td>
                                    {upcoming?.likes}
                                </td>
                                <td>
                                    {upcoming?.distributor}
                                </td>
                                <td>
                                    <button onClick={() => handlePublish(upcoming)} className='btn-sm bg-purple-400 px-4 rounded-xl'>Publish</button>
                                </td>
                                <td>
                                    <button onClick={() => setModalOpen(true)} className='btn-sm bg-purple-400 px-4 rounded-xl whitespace-nowrap w-auto'>Add Upcoming Meal</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <UpcomingModal isOpen={isModalOpen} closeModal={() => setModalOpen(false)} refetch={refetch} />
        </div>
    );
};

export default UpcomingMeal;
