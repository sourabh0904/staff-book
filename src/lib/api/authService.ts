/* eslint-disable @typescript-eslint/no-explicit-any */
import apiClient from './config';
import {
    ApiResponse,
    RegisterRequest,
    RegisterResponse,
    LoginRequest,
    LoginResponse,
} from './types';

/**
 * Register a new user
 * @param data - Registration data
 * @returns Promise with registration response including token
 */
export const registerUser = async (
    data: Omit<RegisterRequest, 'device_type' | 'device_token' | 'device_token_voip_ios'>
): Promise<ApiResponse<RegisterResponse>> => {
    try {
        const payload: RegisterRequest = {
            ...data,
            device_type: '1', // 1 for web
            device_token: '',
            device_token_voip_ios: '',
        };

        const response = await apiClient.post<ApiResponse<RegisterResponse>>(
            '/users/register',
            payload
        );

        // Store token in localStorage
        if (response.data.data.token) {
            localStorage.setItem('authToken', response.data.data.token);
        }

        return response.data;
    } catch (error: unknown) {
        // Handle error and provide meaningful message
        const errorMessage = (error as any).response?.data?.message || 'Registration failed. Please try again.';
        throw new Error(errorMessage);
    }
};

/**
 * Login user
 * @param email - User email
 * @param password - User password
 * @returns Promise with login response including user data and auth key
 */
export const loginUser = async (
    email: string,
    password: string
): Promise<ApiResponse<LoginResponse>> => {
    try {
        const payload: LoginRequest = {
            email,
            password,
            device_type: '1', // 1 for web
            device_token: '',
            device_token_voip_ios: '',
        };

        const response = await apiClient.post<ApiResponse<LoginResponse>>(
            '/users/login',
            payload
        );

        // Store auth key and user data in localStorage
        if (response.data.data.auth_key) {
            localStorage.setItem('authToken', response.data.data.auth_key);
            localStorage.setItem('authUser', JSON.stringify(response.data.data.user));
        }

        return response.data;
    } catch (error: unknown) {
        // Handle error and provide meaningful message
        const errorMessage = (error as any).response?.data?.message || 'Login failed. Please check your credentials.';
        throw new Error(errorMessage);
    }
};

/**
 * Logout user - Clear local storage
 */
export const logoutUser = (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
};

/**
 * Request password reset
 * @param email - User email
 * @param verificationWith - Verification method ('1' for email, '2' for phone)
 * @returns Promise with forgot password response
 */
export const forgotPassword = async (
    email: string,
    verificationWith: string = '1' // '1' for email, '2' for phone
): Promise<ApiResponse<{ token: string; value: boolean }>> => {
    try {
        // Create FormData instead of JSON
        const formData = new FormData();
        formData.append('email', email);
        formData.append('verification_with', verificationWith);

        const response = await apiClient.post<ApiResponse<{ token: string; value: boolean }>>(
            '/users/forgot-password-request',
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );

        return response.data;
    } catch (error: unknown) {
        // Handle 422 error (user not registered)
        if ((error as any).response?.status === 422) {
            const errorMsg = (error as any).response?.data?.data?.errors?.message?.[0] || 'User not registered with us.';
            throw new Error(errorMsg);
        }

        // Handle other errors
        const errorMessage = (error as any).response?.data?.message || 'Failed to send reset link. Please try again.';
        throw new Error(errorMessage);
    }
};

/**
 * Get current user from localStorage
 * @returns User object or null
 */
export const getCurrentUser = () => {
    const userStr = localStorage.getItem('authUser');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch {
            return null;
        }
    }
    return null;
};

/**
 * Check if user is authenticated
 * @returns boolean
 */
export const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('authToken');
    return !!token;
};
