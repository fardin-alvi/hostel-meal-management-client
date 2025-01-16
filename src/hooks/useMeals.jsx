import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useMeals = (search, category, price, page) => {
    const axiosPublic = useAxiosPublic()

    const { data: meals = [], isLoading, refetch } = useQuery({
        queryKey: ['meals', search, category, price, page,],
        queryFn: async () => {
            const res = await axiosPublic.get(`/meals?search=${search || ''}&category=${category||""}&price=${price||""}&page=${page ||1}`)
            return res.data;
        },
        enabled: !!page
    })
    const hasNextPage = meals.length > 0 ;
    return [meals, isLoading,hasNextPage, refetch]
};

export default useMeals;