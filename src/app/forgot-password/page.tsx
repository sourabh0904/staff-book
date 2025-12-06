'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthSideCard from '@/components/Auth/AuthSideCard';
import TextInput from '@/components/shared/TextInput';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { forgotPassword } from '@/lib/api/authService';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validation
        if (!email) {
            setError('Please enter your email address');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        setIsLoading(true);

        try {
            // Call the forgot password API with '1' for email verification
            const response = await forgotPassword(email, '1');

            if (response.status === 200 && response.data.value) {
                setIsSuccess(true);
            } else {
                setError(response.message || 'Failed to send reset link. Please try again.');
            }
        } catch (err: any) {
            setError(err.message || 'Failed to send reset link. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F2F2F2] p-4 md:p-8 flex items-start justify-center pt-20 md:pt-32">
            <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px]">
                {/* Left Side - Form */}
                <div className="w-full max-w-md mx-auto pl-4">
                    {!isSuccess ? (
                        <>
                            {/* Back to Login Link */}
                            <Link
                                href="/signin"
                                className="inline-flex items-center gap-2 text-primary hover:text-[#4A4AD6] mb-6 font-medium transition-colors"
                            >
                                <ArrowLeft size={18} />
                                Back to Login
                            </Link>

                            <div className="mb-8">
                                <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tight">
                                    Forgot Password?
                                </h1>
                                <p className="text-gray-600 font-medium text-base">
                                    No worries! Enter your email and we'll send you reset instructions.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {error && (
                                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError('');
                                            }}
                                            placeholder="Enter your email"
                                            className="w-full pl-11 text-sm pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base placeholder:text-gray-400 text-gray-700"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-primary to-gradient-end text-white py-3 rounded-lg font-semibold text-base hover:from-[#4A4AD6] hover:to-[#811284] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                >
                                    {isLoading ? 'Sending...' : 'Send Reset Link'}
                                </button>

                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        Remember your password?{' '}
                                        <Link href="/signin" className="text-primary hover:text-[#4A4AD6] font-semibold">
                                            Sign In
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center py-8">
                            <div className="mb-6 flex justify-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                    <CheckCircle className="text-green-600" size={40} />
                                </div>
                            </div>

                            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
                                Check Your Email
                            </h2>
                            <p className="text-gray-600 mb-2 text-base">
                                We've sent password reset instructions to:
                            </p>
                            <p className="text-primary font-semibold mb-6 text-lg">
                                {email}
                            </p>
                            <p className="text-sm text-gray-500 mb-8">
                                Didn't receive the email? Check your spam folder or{' '}
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="text-primary hover:text-[#4A4AD6] font-semibold underline"
                                >
                                    try again
                                </button>
                            </p>

                            <Link
                                href="/signin"
                                className="inline-block w-full bg-gradient-to-r from-primary to-gradient-end text-white py-3 rounded-lg font-semibold text-base hover:from-[#4A4AD6] hover:to-[#811284] transition-all shadow-lg"
                            >
                                Back to Login
                            </Link>
                        </div>
                    )}
                </div>

                {/* Right Side - Blue Card */}
                <div className="hidden lg:block h-full">
                    <AuthSideCard topButtonText="Sign Up" topButtonLink="/signup" />
                </div>
            </div>
        </div>
    );
}
