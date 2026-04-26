import axios from 'axios';

const api = axios.create({
  // In production on Render, the backend serves the frontend,
  // so '/api' relative path works perfectly without any localhost reference.
  // In local dev, Vite proxies '/api' → localhost:5000 (see vite.config.js).
  baseURL: '/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
