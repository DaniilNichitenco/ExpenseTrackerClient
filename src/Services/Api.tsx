import axios from 'axios';
import authHeader from './auth.services/auth-header';

const instance = axios.create({
    baseURL: "https://localhost:5001/api/",
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = authHeader();
    return config;
})

export default instance;