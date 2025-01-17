import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const usePayments = () => {
    const axiosSecure = useAxiosSecure()
    const {user} = useAuth()

    const { data:payments,refetch } = useQuery({
        queryKey: ['payments'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/paymentinfo/${user.email}`)
            return res.data
        }
    })

    return {payments,refetch}

};

export default usePayments;