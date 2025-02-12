import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Set your base API URL
});

// Add an interceptor to include the token in all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem("auth-token")); // Retrieve token from localStorage
    const token = authData?.token; // Extract the token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add Authorization header
    } else {
      console.warn("Token is missing in the request!");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle errors
  }
);

export default axiosInstance;
