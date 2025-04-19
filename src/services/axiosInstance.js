import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://fakestoreapi.com',  // Base URL for Fake Store API
});

export default axiosInstance;
