import axios from 'axios';

const API_BASE = import.meta.env.VITE_PROD
  ? import.meta.env.VITE_PROD
  : "http://localhost:5000";


const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for consistent error handling
api.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.error || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export const linkAPI = {
  // Create new link
  create: async (url, code = '') => {
    const response = await api.post('/api/links', { url, code });
    return response.data;
  },

  // Get all links
  getAll: async (searchTerm = '') => {
    const params = searchTerm ? { search: searchTerm } : {};
    const response = await api.get('/api/links', { params });
    return response.data;
  },

  // Get single link stats
  getStats: async (code) => {
    const response = await api.get(`/api/links/${code}`);
    return response.data;
  },

  // Delete link
  delete: async (code) => {
    const response = await api.delete(`/api/links/${code}`);
    return response.data;
  },

  // Health check
  healthCheck: async () => {
    const response = await api.get('/healthz');
    return response.data;
  }
};

export default api;