'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthSideCard from '@/components/Auth/AuthSideCard';
import TextInput from '@/components/shared/TextInput';
import { FaWhatsapp, FaLinkedinIn, FaGitAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.id]: value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the Terms and Conditions');
      return;
    }

    // Generate username from first and last name
    const username = `${formData.firstName.toLowerCase()}${formData.lastName.toLowerCase()}`;

    const result = await signup({
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: username,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      countryCode: '+91',
    });

    if (result.success) {
      // Redirect to login or verification page
      router.push('/signin');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F2] p-4 md:p-8 flex items-start justify-center pt-20 md:pt-32">
      <div className="w-full max-w-[1200px] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px]">
        {/* Left Side - Form */}
        <div className="w-full max-w-md mx-auto pl-4">
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tight">Create an account</h1>
            <p className="text-gray-600 font-medium text-base">Please create your login credentials.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <TextInput
              id="firstName"
              label="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              inputClassName="!rounded-full !border-gray-300 !bg-white !py-3 !text-sm"
            />

            <TextInput
              id="lastName"
              label="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              inputClassName="!rounded-full !border-gray-300 !bg-white !py-3 !text-sm"
            />

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
              <label htmlFor="phone" className="block text-base text-gray-500 mb-1">Mobile Number</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-700 text-base">+91</span>
                <input
                  id="phone"
                  type="tel"
                  placeholder="Enter your number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-14 pr-5 py-3 text-gray-800 rounded-full border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium placeholder:text-gray-400"
                />
              </div>
            </div>

            <TextInput
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Minimum 8 characters"
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

            <TextInput
              id="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Minimum 8 characters"
              value={formData.confirmPassword}
              onChange={handleChange}
              inputClassName="!rounded-full !border-gray-300 !bg-white !py-3 !text-sm"
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              }
            />

            <div className="flex items-start gap-3 mt-2">
              <input
                id="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 accent-[#5372F0] rounded"
              />
              <label htmlFor="agreeToTerms" className="text-xs text-gray-600 font-medium leading-tight">
                By clicking Register, you agree to the <Link href="/terms" className="underline font-bold text-gray-700">Terms and Conditions</Link> & <Link href="/privacy" className="underline font-bold text-gray-700">Privacy Policy</Link> of Staffbook.
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-gradient-end text-white font-bold py-3 rounded-full text-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-200/50 mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>

        {/* Right Side - Blue Card */}
        <div className="hidden lg:block h-full">
          <AuthSideCard topButtonText="Log In" topButtonLink="/signin" />
        </div>
      </div>
    </div>
  );
} 