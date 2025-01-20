import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import toast from 'react-hot-toast';
import UpcomingModal from '../component/UpcomingModal';
import Pagination from '../component/Pagination';

const UpcomingMeal = () => {
    const axiosSecure = useAxiosSecure()
    const [isModalOpen, setModalOpen] = useState(false)
    const [sort, setSort] = useState(false)
    const [currentPage,setCurrentPage]= useState(1)

    const { data: upcominMeal = {}, refetch } = useQuery({
        queryKey: ["upcomingMeal",sort,currentPage],
        queryFn: async () => {
            const res = await axiosSecure(`/upcomingmeal/byadmin?sort=${sort}&page=${currentPage}`)
            return res.data
        },
        enabled:true
    })

    const handlePublish = async (meal) => {
        if (upcominMeal.likes >= 10) {
            const res = await axiosSecure.post('/upcomingmeal/byadmin', meal)
            if (res.data.insertedId) {
                toast.success('Meal Published')
                refetch()
            }
        } else {
            toast.error("Doesn't have enough likes for publish")
        }
    }

    return (
        <div className='bg-gradient-to-r from-purple-50 to-pink-50 mx-16 pt-5'>
            <div className="w-full pl-16 md:w-52">
                <button onClick={() => setSort(!sort)} className={`btn-sm rounded-lg ${sort ? "bg-purple-400" :"bg-base-200"} `} >
                    {sort === true ? "sorted by likes" : "sort by likes"}
                </button>
            </div>
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
                            upcominMeal?.data?.map((upcoming) => <tr key={upcoming._id}>
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
            <div className='pb-4'>
                <Pagination
                    currentPage={upcominMeal.currentPage}
                    totalPages={upcominMeal.totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </div>
        </div>
    );
};

export default UpcomingMeal;
