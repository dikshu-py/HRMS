import axios from 'axios';


const url = import.meta.env.VITE_APP_BASE_URL
const ApiClient = axios.create({
  baseURL:   url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token from localStorage
ApiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor to catch 401 errors globally, except login/register
ApiClient.interceptors.response.use(
  response => response,
  error => {
    const excludedPaths = ['/login', '/register']; // Add paths to exclude
    const requestUrl = error.config?.url || '';

    const isExcluded = excludedPaths.some(path => requestUrl.includes(path));

    if (error.response && error.response.status === 401 && !isExcluded) {
      window.location.href = '/login'; // Redirect only if not login/register
    }

    return Promise.reject(error);
  }
);

export default ApiClient;