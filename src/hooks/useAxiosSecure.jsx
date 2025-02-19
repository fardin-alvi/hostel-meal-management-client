import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const instance = axios.create({
    baseURL: 'http://localhost:5000',
});

const useAxiosSecure = () => {
    const { logOut } = useAuth()
    const navigate = useNavigate()
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    axios.interceptors.response.use(function (response) {
        return response;
    }, async function (error) {
        if (error.response.status === 401 || error.response.status === 403) {
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error);
    });
    return instance;
};

export default useAxiosSecure;