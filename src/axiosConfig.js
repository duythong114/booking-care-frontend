import axios from 'axios';

// create instance for axios with default config
const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    timeout: 20000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// allow set cookies from server
// axiosInstance.defaults.withCredentials = true;

// add interceptors for request 
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('token');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// add interceptors for response
axiosInstance.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;
