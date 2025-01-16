import React, { useContext } from 'react';
import { Navigate, replace, useLocation } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import { Authcontext } from '../provider/Authprovider';

const Privateroute = ({ children }) => {
    const { user, loading } = useContext(Authcontext)
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
        return children
    }
    return <Navigate to='/login' state={{ from: location }} replace ></Navigate>
};

export default Privateroute;