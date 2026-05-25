import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

// Add token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');
export const logout = () => API.get('/auth/logout');

// Profile APIs
export const getMyProfile = () => API.get('/profile/me');
export const updateProfile = (data) => API.put('/profile', data);
export const getProfileById = (id) => API.get(`/profile/${id}`);
export const searchProfiles = (skill) => API.get(`/profile/search?skill=${skill}`);

// Connection APIs
export const sendConnectionRequest = (userId) => API.post(`/connections/request/${userId}`);
export const getConnectionRequests = () => API.get('/connections/requests');
export const acceptRequest = (requestId) => API.put(`/connections/accept/${requestId}`);
export const rejectRequest = (requestId) => API.put(`/connections/reject/${requestId}`);
export const getConnections = () => API.get('/connections');

// Post APIs
export const createPost = (data) => API.post('/posts', data);
export const getFeed = () => API.get('/posts/feed');
export const likePost = (postId) => API.post(`/posts/${postId}/like`);
export const commentOnPost = (postId, text) => API.post(`/posts/${postId}/comment`, { text });

export default API;