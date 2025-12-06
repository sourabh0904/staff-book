'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthSideCard from '@/components/Auth/AuthSideCard';
import TextInput from '@/components/shared/TextInput';
import { FaWhatsapp, FaLinkedinIn, FaGitAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/context/AuthContext';

export default function SigninPage() {
    const router = useRouter();
    const { login, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Clear error when user starts typing
        if (error) setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.email || !formData.password) {
            setError('Please fill in all fields');
            return;
        }

        const result = await login(formData.email, formData.password);

        if (result.success) {
            router.push('/networking');
        } else {
            setError(result.error || 'Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-[#F2F2F2] p-4 md:p-8 flex items-start justify-center pt-20 md:pt-32">
            <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px]">
                {/* Left Side - Form */}
                <div className="w-full max-w-md mx-auto pl-4">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tight">Welcome Back</h1>
                        <p className="text-gray-600 font-medium text-base">Please Enter Your Account Details</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <TextInput
                            id="email"
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            inputClassName="!rounded-full !border-gray-300 !bg-white !py-3 !text-sm"
                        />

                        <div>
                            <TextInput
                                id="password"
                                label="Password"
                                type={showPassword ? "text" : "password"}
                                placeholder="●●●●●●●●"
                                value={formData.password}
                                onChange={handleChange}
                                inputClassName="!rounded-full !border-gray-300 !bg-white !py-3 !text-sm"
                                rightIcon={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                    >
                                        {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                                    </button>
                                }
                            />
                            <div className="flex justify-end mt-2">
                                <Link href="/forgot-password" className="text-gray-600 underline text-xs hover:text-[#5372F0] font-medium">
                                    Forgot Password
                                </Link>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-primary to-gradient-end text-white font-bold py-3 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-200/50 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px bg-gray-300 flex-1"></div>
                        <span className="text-gray-500 font-medium text-sm">OR</span>
                        <div className="h-px bg-gray-300 flex-1"></div>
                    </div>

                    <button className="w-full border border-gray-300 bg-[#EEEEEE] py-3 rounded-full flex items-center justify-center gap-3 font-medium text-gray-700 hover:bg-gray-200 transition-colors text-base">
                        <FcGoogle size={22} />
                        Login with Google
                    </button>

                    <div className="mt-8 text-center">
                        <Link href="/signup" className="text-gray-600 underline hover:text-[#5372F0] font-bold text-base">
                            Create an account
                        </Link>
                    </div>
                </div>

                {/* Right Side - Blue Card */}
                <div className="hidden lg:block h-full">
                    <AuthSideCard topButtonText="Sign Up" topButtonLink="/signup" />
                </div>
            </div>
        </div>
    );
}
