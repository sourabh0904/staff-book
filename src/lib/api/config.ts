import axios from 'axios';

// Base URL for the API
export const API_BASE_URL = 'https://admin.staffbook.in/api/web/v1';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 30000, // 30 seconds
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor - Handle common errors
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized - Token expired or invalid
        if (error.response?.status === 401) {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
            // Optionally redirect to login
            if (typeof window !== 'undefined') {
                window.location.href = '/signin';
            }
        }
        return Promise.reject(error);
    }
);

export default apiClient;
