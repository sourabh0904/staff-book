'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiFileText, FiCreditCard, FiBarChart2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { THEME } from '../../styles/theme';
import EmployerVerificationModal from '../shared/EmployerVerificationModal';

const NetworkingLeftSidebar: React.FC = () => {
  const { user, isEmployer, setIsEmployer } = useAuth();
  
  // Profile Display Settings State
  const [isOnline, setIsOnline] = useState(true);
  const [profileLabel, setProfileLabel] = useState<'None' | 'Job Seeking' | 'Hiring'>('None');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  
  // Accordion State
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSubscriptionsOpen, setIsSubscriptionsOpen] = useState(false);

  const handleEmployerSwitch = () => {
    if (!isEmployer) {
      setShowVerificationModal(true);
    } else {
      setIsEmployer(false);
    }
  };

  const handleVerificationSuccess = (details: { companyName: string; gstNumber: string }) => {
    console.log("Verified Employer Details:", details);
    setIsEmployer(true);
    setShowVerificationModal(false);
  };

  if (!user) return null;

  // Calculate profile completion percentage
  const calculateProgress = () => {
    if (!user) return 0;
    let completed = 0;
    const total = 10;

    if (user.first_name) completed++;
    if (user.last_name) completed++;
    if (user.email) completed++;
    if (user.phone) completed++;
    if (user.designation) completed++;
    if (user.city) completed++;
    if (user.bio) completed++;
    if (user.description) completed++;
    if (user.picture) completed++;
    if (user.resume_upload) completed++;

    return Math.round((completed / total) * 100);
  };

  const progress = calculateProgress();

  return (
    <div className="flex flex-col gap-2 pb-4">
      {/* Profile Card */}
      <div className={`${THEME.components.card.default} overflow-hidden relative p-0`}>
        {/* Cover Image */}
        <div className="h-24 relative w-full">
          <Image
            src="/homePage/job-photo.png"
            alt="Cover"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Profile Info */}
        <div className="px-4 pb-4 text-center relative">
          <div className="relative -mt-10 mb-3 inline-block">
            <div className="relative w-[84px] h-[84px] p-1 bg-white rounded-full mx-auto">
               {/* Circular Progress Bar */}
               <svg className="absolute inset-0 w-full h-full rotate-90 transform z-10 scale-110" viewBox="0 0 100 100">
                {/* Track */}
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#F3F4F6"
                  strokeWidth="4"
                />
                {/* Progress */}
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="#22c55e"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                  strokeDasharray={289.03} // 2 * PI * 46
                  strokeDashoffset={289.03 - (progress / 100) * 289.03}
                />
              </svg>

              <div className="relative w-full h-full rounded-full overflow-hidden border border-gray-100 z-20">
                <Image
                  src={user.picture || "/homePage/profile.png"}
                  alt={`${user.first_name} ${user.last_name}`}
                  fill
                  className="object-cover"
                />
              </div>

               {/* Progress badge */}
               <div className={`absolute left-1/2 -bottom-3 -translate-x-1/2 bg-white rounded-full px-2 py-0.5 border border-green-200 text-green-600 font-bold text-[10px] shadow-sm text-center whitespace-nowrap z-30`}>
                {progress}%
              </div>
            </div>
          </div>
          
          <h3 className={`${THEME.components.typography.cardTitle} hover:underline cursor-pointer`}>
            {user.first_name} {user.last_name}
          </h3>
          <p className={`${THEME.components.typography.meta} mt-1 mb-4`}>
            {user.designation || 'User'}
          </p>
          
          <Link href="/profile" className={`${THEME.components.button.primary} py-2 px-4 w-full block mb-4 text-center text-sm`}>
            View Profile
          </Link>

          <div className="border-t border-gray-100 pt-3 text-left space-y-1">
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <span className={THEME.components.typography.meta}>Connection</span>
              <span className={`${THEME.components.typography.cardTitle} text-xs`}>{user.totalConnection || 0}</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <span className={THEME.components.typography.meta}>Post</span>
              <span className={`${THEME.components.typography.cardTitle} text-xs`}>0</span>
            </div>
            {isEmployer && (
              <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                <span className={THEME.components.typography.meta}>Posted Jobs</span>
                <span className={`${THEME.components.typography.cardTitle} text-xs`}>{user.totalJobPost || 0}</span>
              </div>
            )}
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <span className={THEME.components.typography.meta}>Applied Jobs</span>
              <span className={`${THEME.components.typography.cardTitle} text-xs`}>0</span>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-3 pt-3 text-left space-y-1">
            <Link href="/profile/analytics" className={`flex items-center gap-2 ${THEME.components.typography.meta} hover:text-indigo-300 font-medium p-2 hover:bg-gray-50 rounded-lg transition-colors group`}>
                <FiBarChart2 className={`w-3.5 h-3.5 group-hover:text-indigo-300 transition-colors`} />
                Profile Analytics
            </Link>

            <Link href="/subscription" className={`flex items-center gap-2 ${THEME.components.typography.meta} hover:text-indigo-300 font-medium p-2 hover:bg-gray-50 rounded-lg transition-colors group`}>
                <FiCreditCard className={`w-3.5 h-3.5 group-hover:text-indigo-300 transition-colors`} />
                My Subscriptions
            </Link>
          </div>
        </div>
      </div>

      {/* Profile Display Settings */}
      <div className={`${THEME.components.card.default} p-4`}>
        <button 
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
          className="w-full flex items-center justify-between group"
        >
          <h3 className="text-sm font-bold text-[#222]">Profile Display Settings</h3>
          {isSettingsOpen ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
        </button>
        
        {isSettingsOpen && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {/* Switch to Employer */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#666] font-medium">Switch to Employer</span>
              <button
                onClick={handleEmployerSwitch}
                className={`p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                  isEmployer 
                    ? 'bg-gradient-to-r from-indigo-300 to-purple-300 ring-2 ring-purple-100' 
                    : 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-indigo-300 hover:to-purple-300'
                }`}
                title={isEmployer ? "Switch to Job Seeker" : "Switch to Employer"}
              >
                <Image 
                  src="/icons/role-switch.png" 
                  alt="Switch Role" 
                  width={20} 
                  height={20} 
                  className={`w-5 h-5 transition-transform duration-500 brightness-0 invert ${isEmployer ? 'rotate-180' : ''}`}
                />
              </button>
            </div>

            {/* Show as Online */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-[#666] font-medium">Show as Online</span>
              <button
                onClick={() => setIsOnline(!isOnline)}
                className={`relative w-11 h-6 rounded-full transition-colors ${
                  isOnline ? 'bg-gradient-to-r from-indigo-300 to-purple-300' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    isOnline ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>

            {/* Profile Label */}
            <div className="space-y-2">
              <span className="text-sm text-[#666] font-medium block mb-2">Profile Label</span>
              <div className="flex flex-col gap-2">
                {(isEmployer ? ['None', 'Hiring'] : ['None', 'Job Seeking']).map((label) => (
                  <label key={label} className="flex items-center gap-2 cursor-pointer group">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      profileLabel === label 
                        ? 'border-indigo-300' 
                        : 'border-gray-300 group-hover:border-indigo-300'
                    }`}>
                      {profileLabel === label && (
                        <div className="w-2 h-2 rounded-full bg-indigo-300" />
                      )}
                    </div>
                    <input
                      type="radio"
                      name="profileLabel"
                      value={label}
                      checked={profileLabel === label}
                      onChange={(e) => setProfileLabel(e.target.value as any)}
                      className="hidden"
                    />
                    <span className={`text-sm ${
                      profileLabel === label ? 'text-indigo-500 font-medium' : 'text-gray-600'
                    }`}>
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Subscription Balance */}
      <div className={`${THEME.components.card.default} p-4`}>
        <button 
          onClick={() => setIsSubscriptionsOpen(!isSubscriptionsOpen)}
          className="w-full flex items-center justify-between group"
        >
          <h4 className={`${THEME.components.typography.cardTitle}`}>Subscriptions</h4>
          {isSubscriptionsOpen ? <FiChevronUp className="text-gray-400" /> : <FiChevronDown className="text-gray-400" />}
        </button>
        
        {isSubscriptionsOpen && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <div className="mb-4">
                <p className={`${THEME.components.typography.meta} mb-1`}>Your Remaining Subscription Balance</p>
                <div className="flex items-center gap-2">
                    <span className={`text-sm font-bold text-[${THEME.colors.primary}]`}>VIP</span>
                </div>
            </div>

            <div className="space-y-1">
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <span className={THEME.components.typography.meta}>Contact Views</span>
                  <span className={`${THEME.components.typography.cardTitle} text-xs`}>0</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <span className={THEME.components.typography.meta}>Video Conferencing</span>
                  <span className={`${THEME.components.typography.cardTitle} text-xs`}>0</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <span className={THEME.components.typography.meta}>Resume Downloads</span>
                  <span className={`${THEME.components.typography.cardTitle} text-xs`}>0</span>
                </div>
                <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <span className={THEME.components.typography.meta}>Advertisment Banners</span>
                  <span className={`${THEME.components.typography.cardTitle} text-xs`}>0</span>
                </div>
            </div>
          </div>
        )}
      </div>
      <EmployerVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onVerify={handleVerificationSuccess}
      />
    </div>
  );
};

export default NetworkingLeftSidebar;
