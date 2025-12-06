'use client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loginUser, registerUser, logoutUser, getCurrentUser, User } from '@/lib/api';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phone: string;
  countryCode: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load user from localStorage on mount
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await loginUser(email, password);

      if (response.status === 200 && response.data.user) {
        setUser(response.data.user);
        return { success: true };
      }

      return { success: false, error: response.message || 'Login failed' };
    } catch (error: unknown) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during login. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData) => {
    setIsLoading(true);
    try {
      const response = await registerUser({
        first_name: data.firstName,
        last_name: data.lastName,
        username: data.username,
        email: data.email,
        password: data.password,
        phone: data.phone,
        country_code: data.countryCode,
      });

      if (response.status === 200 && response.data.token) {
        // After successful registration, you might want to auto-login
        // or redirect to a verification page
        return { success: true };
      }

      return { success: false, error: response.message || 'Registration failed' };
    } catch (error: unknown) {
      console.error('Signup error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'An error occurred during registration. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    logoutUser();
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isSidebarOpen, setIsSidebarOpen, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
} 