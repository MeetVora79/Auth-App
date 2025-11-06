import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api",
  withCredentials: true, // must be true to send cookies
  headers: {
    'Accept': 'application/json',
  },
});
export default api;
