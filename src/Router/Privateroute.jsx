import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { Authcontext } from '../provider/Authprovider';
import useAuth from '../hooks/useAuth';

const Privateroute = ({ children }) => {
    const { user, loading, setLoading } = useAuth()
    const location = useLocation()
    if (loading) {
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
    if (user) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} ></Navigate>
};

export default Privateroute;