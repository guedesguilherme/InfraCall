import axios from "axios";

const AppFetch = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer &{token}`

    },
});

AppFetch.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default AppFetch;