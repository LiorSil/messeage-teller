// src/api/axiosInstance.ts
import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const VITE_API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
    baseURL: VITE_API_URL, // Replace with your API URL
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = cookies.get('token'); // Replace 'token' with the actual cookie name
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;

        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axiosInstance;
