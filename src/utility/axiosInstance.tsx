import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://node-lbank.onrender.com" || process.env.BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to add the auth token header to requests
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = token; // Set the token directly in the Authorization header
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
