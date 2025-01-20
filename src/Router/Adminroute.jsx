import React from 'react';
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../hooks/useAdmin'
import { Bars } from 'react-loader-spinner';

const Adminroute = ({ children }) => {
    const { user, loading } = useAuth()
    const [isAdmin, isLoading] = useAdmin()
    const location = useLocation()

    if (loading || isLoading) {
        return <div className='flex justify-center items-center'>
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
    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/' state={{ from: location }} replace ></Navigate>
};

export default Adminroute;