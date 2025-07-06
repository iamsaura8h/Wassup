import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ✅ Interceptor to attach JWT token from localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
