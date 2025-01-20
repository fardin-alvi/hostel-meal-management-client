import React from 'react';
import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://bunk-server.vercel.app',
});

const useAxiosPublic = () => {
    return instance;
};

export default useAxiosPublic;