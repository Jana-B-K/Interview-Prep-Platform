import axios from 'axios';

const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, '');
const fallbackBaseUrl =
  window.location.hostname === 'localhost' ? 'http://localhost:4029' : '';

export const API = axios.create({
    baseURL: configuredBaseUrl || fallbackBaseUrl,
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
