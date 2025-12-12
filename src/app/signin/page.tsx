'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthSideCard from '@/components/Auth/AuthSideCard';
import TextInput from '@/components/shared/TextInput';
import { FaWhatsapp, FaLinkedinIn, FaGitAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useAuth } from '@/context/AuthContext';

import { THEME } from '@/styles/theme';

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
        <div className={`min-h-screen ${THEME.colors.background.page} pt-24 pb-12 px-4 sm:px-6 lg:px-8`}>
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Side - Form */}
                <div className="w-full flex justify-center lg:justify-end">
                    <div className="w-full max-w-md">
                        <div className="mb-6">
                            <h1 className={`text-3xl md:text-4xl font-bold ${THEME.colors.text.heading} mb-2 tracking-tight`}>Welcome Back</h1>
                            <p className={`${THEME.components.typography.subheading} text-base`}>Please Enter Your Account Details</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
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
                                inputClassName={`!rounded-full !border-gray-200 !bg-white !py-3 !text-sm ${THEME.components.input.default}`}
                            />

                            <div>
                                <TextInput
                                    id="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="●●●●●●●●"
                                    value={formData.password}
                                    onChange={handleChange}
                                    inputClassName={`!rounded-full !border-gray-200 !bg-white !py-3 !text-sm ${THEME.components.input.default}`}
                                    rightIcon={
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="text-gray-400 hover:text-gray-600 p-1"
                                        >
                                            {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                                        </button>
                                    }
                                />
                                <div className="flex justify-end mt-2">
                                    <Link href="/forgot-password" className={`${THEME.colors.text.link} text-xs font-medium`}>
                                        Forgot Password
                                    </Link>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-3.5 rounded-full font-bold text-white shadow-lg shadow-purple-200 hover:shadow-xl transition-all active:scale-[0.98] mt-2 bg-purple-700 hover:bg-purple-800 disabled:opacity-70 disabled:cursor-not-allowed`}
                            >
                                {isLoading ? 'Logging in...' : 'Log In'}
                            </button>
                        </form>

                        <div className="my-6 flex items-center gap-4">
                            <div className="h-px bg-gray-200 flex-1"></div>
                            <span className="text-gray-400 font-medium text-sm">OR</span>
                            <div className="h-px bg-gray-200 flex-1"></div>
                        </div>

                        <button className="w-full border border-gray-200 bg-white py-3 rounded-full flex items-center justify-center gap-3 font-medium text-gray-700 hover:bg-gray-50 transition-colors text-base shadow-sm">
                            <FcGoogle size={22} />
                            Login with Google
                        </button>

                        <div className="mt-8 text-center bg-gray-50 p-4 rounded-xl border border-gray-100">
                            <Link href="/signup" className={`text-gray-600 font-medium text-sm hover:${THEME.colors.text.link}`}>
                                Don't have an account? <span className={`${THEME.colors.text.link} font-bold`}>Create one</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Right Side - Sticky Card */}
                <div className="hidden lg:block relative h-full">
                    <div className="sticky top-24 w-full max-w-[400px]">
                        <AuthSideCard topButtonText="Sign Up" topButtonLink="/signup" />
                    </div>
                </div>
            </div>
        </div>
    );
}
