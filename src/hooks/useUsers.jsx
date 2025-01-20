import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUsers = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: users ,refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure(`/users/${user?.email}`)
            return res.data
        }
    })
    return [users,refetch]
};

export default useUsers;