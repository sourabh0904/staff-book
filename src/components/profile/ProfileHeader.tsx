'use client';
import Image from 'next/image';
import { Edit2, Camera } from 'lucide-react';
import { SITE_CONFIG } from '../../constants/siteconfig';
import { basicDetails } from '../../data/profile';
import { useAuth } from '@/context/AuthContext';
import { THEME } from '../../styles/theme';

export default function ProfileHeader() {
  const { user } = useAuth();

  // Get user data with defaults
  const displayName = user ? `${user.first_name} ${user.last_name}` : "Guest User";
  const displayAvatar = user?.picture || "/homePage/profile.png";
  const displayCover = user?.cover_image || "/homePage/job-photo.png"; // Fallback cover
  const displayDesignation = user?.designation || "Not specified";
  const displayLocation = user?.city && user?.state ? `${user.city}, ${user.state}` : "Not specified";
  const displayEmail = user?.email || "Not specified";
  const displayPhone = user?.phone ? `${user.country_code} ${user.phone}` : "Not specified";

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
    <div className={`w-full ${THEME.components.card.default} !p-0 flex flex-col gap-0 relative overflow-hidden`}>
      {/* Cover Image Section */}
      <div className="relative h-32 md:h-48 w-full bg-gray-100">
        <Image 
          src={displayCover} 
          alt="Cover" 
          fill 
          className="object-cover"
          priority
        />
        {/* Edit Cover Button */}
        <button className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-white backdrop-blur-sm rounded-full shadow-sm transition-all group">
          <Camera size={18} className="text-gray-700 group-hover:text-primary" />
        </button>
      </div>

      <div className="px-6 pb-6 flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
        {/* Avatar with Progress */}
        <div className="flex flex-col items-center -mt-12 md:-mt-16 relative z-10">
          <div className="relative group">
            <div className="relative w-[100px] h-[100px] md:w-[120px] md:h-[120px]">
              {/* Circular Progress Bar */}
              <svg className="absolute inset-0 w-full h-full rotate-90 transform z-10" viewBox="0 0 100 100">
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

              {/* Avatar Image */}
              <div className="absolute inset-[6px] rounded-full overflow-hidden border-4 border-white shadow-sm z-10 bg-white">
                <Image src={displayAvatar} alt={displayName} fill className="object-cover" />
              </div>
            </div>
            
            {/* Edit Avatar Button */}
            <button className="absolute bottom-1 right-1 p-2 bg-white rounded-full shadow-md border border-gray-100 hover:bg-gray-50 transition-colors z-20">
              <Camera size={16} className="text-gray-600" />
            </button>

            {/* Progress badge */}
            <div className={`absolute left-1/2 -bottom-4 -translate-x-1/2 bg-white rounded-full px-3 py-0.5 border border-green-200 text-green-600 font-bold text-xs md:text-sm shadow-sm text-center whitespace-nowrap z-20`}>
              {progress}%
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="flex-1 w-full pt-4 md:pt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 items-center text-center md:text-left">
          <div className="col-span-1 sm:col-span-2 flex flex-col items-center md:items-start mb-2 relative">
             {/* Edit Profile Details Button */}
            <button className="absolute top-0 right-0 md:right-auto md:left-[calc(100%+1rem)] p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Edit2 size={18} className={`text-[${THEME.colors.primary}]`} />
            </button>
            
            <h2 className={`text-xl md:text-2xl font-bold ${THEME.colors.text.heading} mb-1`}>{displayName}</h2>
            {user?.username && (
              <p className={THEME.components.typography.meta}>@{user.username}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className={THEME.components.typography.meta}>{SITE_CONFIG.profileHeader.preferredRole}</p>
            <p className={`${THEME.components.typography.cardTitle} text-sm md:text-base`}>{displayDesignation}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className={THEME.components.typography.meta}>{SITE_CONFIG.profileHeader.preferredLocation}</p>
            <p className={`${THEME.components.typography.cardTitle} text-sm md:text-base`}>{displayLocation}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className={THEME.components.typography.meta}>Personal Email</p>
            <p className={`${THEME.components.typography.cardTitle} text-sm md:text-base break-all`}>{basicDetails.personalEmail || displayEmail}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className={THEME.components.typography.meta}>Work Email</p>
            <p className={`${THEME.components.typography.cardTitle} text-sm md:text-base break-all`}>{basicDetails.workEmail || "Not specified"}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className={THEME.components.typography.meta}>Personal Phone</p>
            <p className={`${THEME.components.typography.cardTitle} text-sm md:text-base`}>{basicDetails.personalContact || displayPhone}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className={THEME.components.typography.meta}>Work Phone</p>
            <p className={`${THEME.components.typography.cardTitle} text-sm md:text-base`}>{basicDetails.workContact || "Not specified"}</p>
          </div>

        </div>
      </div>
    </div>
  );
}