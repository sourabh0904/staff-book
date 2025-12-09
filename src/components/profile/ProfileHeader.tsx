'use client';
import Image from 'next/image';
import { Edit2 } from 'lucide-react';
import { SITE_CONFIG } from '../../constants/siteconfig';
import { basicDetails } from '../../data/profile';
import { useAuth } from '@/context/AuthContext';
import { THEME } from '../../styles/theme';

export default function ProfileHeader() {
  const { user } = useAuth();

  // Get user data with defaults
  const displayName = user ? `${user.first_name} ${user.last_name}` : "Guest User";
  const displayAvatar = user?.picture || "/homePage/profile.png";
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
    <div className={`w-full ${THEME.components.card.default} flex flex-col gap-6 relative`}>
      {/* Edit Icon */}
      <div className="absolute top-4 right-4">
        <div className={THEME.components.button.icon}>
          <Edit2 size={20} className={`text-[${THEME.colors.primary}]`} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
        {/* Avatar with Progress */}
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className={`w-[100px] h-[100px] md:w-[120px] md:h-[120px] rounded-full bg-gradient-to-tr from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}] flex items-center justify-center p-1`}>
              <div className="w-[92px] h-[92px] md:w-[110px] md:h-[110px] rounded-full bg-white flex items-center justify-center overflow-hidden">
                <Image src={displayAvatar} alt={displayName} width={110} height={110} className="rounded-full object-cover" />
              </div>
            </div>
            {/* Progress badge */}
            <div className={`absolute left-1/2 -bottom-3 -translate-x-1/2 bg-white rounded-full px-3 py-0.5 border-2 border-purple-600 text-purple-600 font-bold text-xs md:text-sm shadow text-center whitespace-nowrap`}>
              {progress}%
            </div>
          </div>
        </div>
        {/* Profile Details */}
        <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 items-center text-center md:text-left">
          <div className="col-span-1 sm:col-span-2 flex flex-col items-center md:items-start mb-2">
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
          <div className="flex flex-col gap-1">
            <p className={THEME.components.typography.meta}>Profile Views</p>
            <p className={`${THEME.components.typography.cardTitle} text-sm md:text-base`}>{user?.profile_view || 0}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className={THEME.components.typography.meta}>Connections</p>
            <p className={`${THEME.components.typography.cardTitle} text-sm md:text-base`}>{user?.totalConnection || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
}