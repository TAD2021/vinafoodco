import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: '/', // Use the root URL for the same domain
  timeout: 10000, // Set a timeout for requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Bạn có thể thêm các header khác nếu cần
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Xử lý lỗi toàn cục
    return Promise.reject(error);
  }
);

export default axiosInstance;
