import axios from "axios";
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

//Request interceptor
api.interceptors.request.use(config => {
    config.headers.Authorization = "Bearer sample_Token";
    return config;
});
// Response interceptor
api.interceptors.response.use(
    response => response,
    error => {
        console.log("Global error");
        return Promise.reject(error);
    }
);
export default api;