import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import MealCard from '../component/MealCard';
import { Bars } from 'react-loader-spinner';
import UpcomingMealCard from '../component/UpcomingMealCard';

const UpcomingMeals = () => {
    const axiosPublic = useAxiosPublic()

    const { data: upcomingMeals = {}, isLoading } = useQuery({
        queryKey: ['upcoming'],
        queryFn: async () => {
            const res = await axiosPublic('/upcomingmeal/byadmin')
            return res.data
        }
    })

      if (isLoading) {
            return <div className='flex items-center justify-center'>
                <Bars
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="bars-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
    }
    
    return (
        <div className='grid lg:grid-cols-4 px-6 bg-gradient-to-r from-purple-50 to-pink-50 md:grid-cols-3 grid-cols-1 pt-8 pb-10  gap-3'>
            {
                upcomingMeals?.data?.map(meal => <UpcomingMealCard key={meal._id} meal={meal} />)
            }
        </div>
    );
};

export default UpcomingMeals;