'use client';
import React, { useState, useEffect, Suspense, useRef } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthSideCard from '@/components/Auth/AuthSideCard';
import TextInput from '@/components/shared/TextInput';
import { FaWhatsapp, FaLinkedinIn, FaGitAlt, FaEye, FaEyeSlash } from 'react-icons/fa';
import { FiBriefcase, FiUser, FiUpload, FiFileText, FiMail, FiCheck } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { THEME } from '@/styles/theme';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signup, isLoading } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 'job-seeker' | 'employer'
  const [userType, setUserType] = useState<'job-seeker' | 'employer'>('job-seeker');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    designation: '',
    gstNumber: '',
    agreeToTerms: false,
  });

  const [documentFile, setDocumentFile] = useState<File | null>(null);

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'employer') {
      setUserType('employer');
    } else {
      setUserType('job-seeker');
    }
  }, [searchParams]);

  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.id]: value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDocumentFile(e.target.files[0]);
      if (error) setError('');
    }
  };

  const handleTabChange = (type: 'job-seeker' | 'employer') => {
    setUserType(type);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Common Validation
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all common fields');
      return;
    }

    // Employer Validation
    if (userType === 'employer') {
      if (!formData.companyName || !formData.designation) {
         setError('Please fill in company details');
         return;
      }
      if (!formData.email) { // Email is strictly required for employers as professional email
          setError('Professional Email is required');
          return;
      }
      if (!formData.gstNumber) {
          setError('GST Number is required');
          return;
      }
      if (formData.gstNumber.length < 15) {
          setError('GST Number must be at least 15 characters');
          return;
      }
      if (!documentFile) {
          setError('Registration Document is required');
          return;
      }
    } else {
         // Job Seeker Validation
        if (!formData.email) {
            setError('Email is required');
            return;
        }
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
      // Pass extra data if supported by backend, or handle employer registration logic
      // Note: Current signup signature might not support extra fields yet. 
      // Assuming we just register standard user first, then they verify as employer later
      // OR if we need to send role:
      // role: userType 
    });

    if (result.success) {
      // Redirect to login
      router.push('/signin');
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto pl-4">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-black mb-2 tracking-tight">Create an account</h1>
        <p className="text-gray-600 font-medium text-base">
          {userType === 'employer' ? 'Register to hire top talent.' : 'Register to find your dream job.'}
        </p>
      </div>

      {/* Role Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-xl mb-6">
        <button
          type="button"
          onClick={() => handleTabChange('job-seeker')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            userType === 'job-seeker' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FiUser size={16} />
          Job Seeker
        </button>
        <button
          type="button"
          onClick={() => handleTabChange('employer')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded-lg transition-all ${
            userType === 'employer' 
              ? 'bg-white text-purple-600 shadow-sm' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          <FiBriefcase size={16} />
          Employer
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <TextInput
            id="firstName"
            label="First Name"
            placeholder="First name"
            value={formData.firstName}
            onChange={handleChange}
            inputClassName="!rounded-full !border-gray-300 !bg-white !py-3 !text-sm"
          />

          <TextInput
            id="lastName"
            label="Last Name"
            placeholder="Last name"
            value={formData.lastName}
            onChange={handleChange}
            inputClassName="!rounded-full !border-gray-300 !bg-white !py-3 !text-sm"
          />
        </div>

        {userType === 'employer' && (
          <div className="animate-fadeIn space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-2">Company Details</h3>
            <TextInput
              id="companyName"
              label="Company Name"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              inputClassName="!rounded-full !border-gray-300 !bg-white !py-3 !text-sm"
            />
             <TextInput
              id="designation"
              label="Designation"
              placeholder="e.g. HR Manager"
              value={formData.designation}
              onChange={handleChange}
              inputClassName="!rounded-full !border-gray-300 !bg-white !py-3 !text-sm"
            />
          </div>
        )}

        {userType === 'employer' ? (
           <div className={`p-5 rounded-xl border border-purple-100 bg-purple-50/30 space-y-4 animate-scaleIn`}>
              <div className="flex items-center gap-2 mb-2">
                 <div className="p-1.5 bg-purple-100 rounded-lg text-purple-600">
                    <FiCheck size={14} />
                 </div>
                 <h3 className="text-sm font-bold text-gray-900">Employer Verification</h3>
              </div>
              
              {/* Professional Email */}
               <div className="group">
                 <label className={`block text-xs font-semibold text-gray-700 mb-1.5 ml-1`}>
                   Professional Email <span className="text-red-500">*</span>
                 </label>
                 <div className="flex gap-2">
                   <div className="relative flex-1">
                     <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                       <FiMail size={16} />
                     </div>
                     <input
                       id="email"
                       type="email"
                       value={formData.email}
                       onChange={handleChange}
                       className={`${THEME.components.input.default} pl-10 pr-4 !py-2.5 !bg-white`}
                       placeholder="hr@yourcompany.com"
                     />
                   </div>
                   <button
                     type="button"
                     className={`${THEME.components.button.secondary} px-3 py-2 text-xs h-[42px] whitespace-nowrap`}
                   >
                     Verify
                   </button>
                 </div>
               </div>

                {/* GST Number */}
               <div className="group">
                 <label className={`block text-xs font-semibold text-gray-700 mb-1.5 ml-1`}>
                   GST Number <span className="text-red-500">*</span>
                 </label>
                 <div className="relative">
                   <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                     <FiFileText size={16} />
                   </div>
                   <input
                     id="gstNumber"
                     type="text"
                     value={formData.gstNumber}
                     onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value.toUpperCase() })}
                     className={`${THEME.components.input.default} pl-10 pr-4 !py-2.5 !bg-white`}
                     placeholder="22AAAAA0000A1Z5"
                     maxLength={15}
                   />
                 </div>
               </div>

                {/* Registration Document */}
               <div className="group">
                 <label className={`block text-xs font-semibold text-gray-700 mb-1.5 ml-1`}>
                   Registration Document <span className="text-red-500">*</span>
                 </label>
                 <div 
                   className={`relative border-2 border-dashed border-gray-200 hover:border-purple-300 hover:bg-purple-50 bg-white rounded-xl p-4 text-center cursor-pointer transition-all`}
                   onClick={() => fileInputRef.current?.click()}
                 >
                   <input
                     type="file"
                     ref={fileInputRef}
                     onChange={handleFileChange}
                     className="hidden"
                     accept=".pdf,.jpg,.jpeg,.png"
                   />
                   <div className="flex flex-col items-center gap-1">
                     <FiUpload size={18} className="text-purple-400" />
                     <p className={`text-xs font-medium text-gray-600`}>
                       {documentFile ? documentFile.name : 'Upload ID / Document'}
                     </p>
                   </div>
                 </div>
               </div>
           </div>
        ) : (
            <TextInput
              id="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              inputClassName={`!rounded-full !border-gray-200 !bg-white !py-3 !text-sm ${THEME.components.input.default}`}
            />
        )}

        <div>
          <label htmlFor="phone" className={`block ${THEME.components.typography.subheading} mb-1.5`}>Mobile Number</label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-700 text-sm">+91</span>
            <input
              id="phone"
              type="tel"
              placeholder="Enter your number"
              value={formData.phone}
              onChange={handleChange}
              className={`${THEME.components.input.default} w-full pl-14 pr-5 !py-3 !rounded-full !text-sm font-medium`}
            />
          </div>
        </div>

        <TextInput
          id="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Min. 8 characters"
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

        <TextInput
          id="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={handleChange}
          inputClassName={`!rounded-full !border-gray-200 !bg-white !py-3 !text-sm ${THEME.components.input.default}`}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          }
        />

        <div className="flex items-center gap-2">
          <input
            id="agreeToTerms"
            type="checkbox"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 text-purple-600 rounded border-gray-300 focus:ring-purple-500"
          />
          <label htmlFor="agreeToTerms" className={`text-sm ${THEME.colors.text.body}`}>
            I agree to the <Link href="/terms" className={THEME.colors.text.link}>Terms and Condition</Link> and <Link href="/privacy" className={THEME.colors.text.link}>Privacy Policy</Link>.
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-3.5 rounded-full font-bold text-white shadow-lg shadow-purple-200 hover:shadow-xl transition-all active:scale-[0.98] mt-6 bg-purple-700 hover:bg-purple-800 disabled:opacity-70 disabled:cursor-not-allowed`}
        >
          {isLoading ? 'Creating Account...' : (userType === 'employer' ? 'Register As Employer' : 'Register Now')}
        </button>

        <div className="text-center mt-6">
           <p className={`text-sm ${THEME.colors.text.muted}`}>
             Already have an account? <Link href="/signin" className={THEME.colors.text.link}>Login</Link>
           </p>
        </div>
      </form>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className={`min-h-screen ${THEME.colors.background.page} pt-24 pb-12 px-4 sm:px-6 lg:px-8`}>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Form */}
            <div className="w-full flex justify-center lg:justify-end">
                 <div className="w-full max-w-md">
                    <Suspense fallback={
                      <div className="h-[600px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-600"></div>
                      </div>
                    }>
                      <SignupContent />
                    </Suspense>
                 </div>
            </div>

            {/* Right: Sticky Sidebar */}
            <div className="hidden lg:block relative h-full">
                <div className="sticky top-24 w-full max-w-[400px]">
                   <AuthSideCard topButtonText="Log In" topButtonLink="/signin" />
                </div>
            </div>
        </div>
    </div>
  );
}