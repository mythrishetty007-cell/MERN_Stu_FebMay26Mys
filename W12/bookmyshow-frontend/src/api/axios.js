// src/api/axios.js


/*
=========================================================
SPRINT 2 – AUTHENTICATION INFRASTRUCTURE


TOPICS COVERED:


✓ Axios Instance
✓ Base URL Configuration
✓ Request Interceptors


WHY THIS FILE?


Instead of repeatedly writing:


axios.post(...)
axios.get(...)
axios.put(...)


throughout the application,


we create ONE reusable Axios instance.


Benefits:


✓ Centralized configuration
✓ Easy JWT integration
✓ Cleaner API files
✓ Easier maintenance


=========================================================
*/


import axios from "axios";


/*
=========================================================
BASE URL


Vite environment variable.


Example:


VITE_API_BASE_URL=http://localhost:5000/api


=========================================================
*/


const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,


  headers: {
    "Content-Type": "application/json",
  },
});


/*
=========================================================
REQUEST INTERCEPTOR


Purpose:


Attach JWT automatically.


Without this:


Every request must manually add:


Authorization: Bearer token


=========================================================
*/


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");


    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }


    return config;
  },


  (error) => Promise.reject(error),
);


export default api;


/*
=========================================================
KEY TAKEAWAYS


1. One Axios instance serves entire app.


2. Interceptors reduce duplication.


3. JWT support becomes automatic.


=========================================================
*/
