'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { FiUser, FiFileText, FiCreditCard, FiBarChart2 } from 'react-icons/fi';
import { THEME } from '../../styles/theme';

const NetworkingLeftSidebar: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="flex flex-col gap-2">
      {/* Profile Card */}
      <div className={`${THEME.components.card.default} overflow-hidden relative p-0`}>
        {/* Cover Image */}
        <div className={`h-16 bg-gradient-to-r from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}]`}></div>
        
        {/* Profile Info */}
        <div className="px-4 pb-4 text-center relative">
          <div className="relative -mt-10 mb-3 inline-block">
            <div className="p-1 bg-white rounded-full">
              <Image
                src={user.picture || "/homePage/profile.png"}
                alt={`${user.first_name} ${user.last_name}`}
                width={72}
                height={72}
                className="rounded-full object-cover border border-gray-100"
              />
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
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <span className={THEME.components.typography.meta}>Posted Jobs</span>
              <span className={`${THEME.components.typography.cardTitle} text-xs`}>{user.totalJobPost || 0}</span>
            </div>
            <div className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
              <span className={THEME.components.typography.meta}>Applied Jobs</span>
              <span className={`${THEME.components.typography.cardTitle} text-xs`}>0</span>
            </div>
          </div>

          <div className="border-t border-gray-100 mt-3 pt-3 text-left space-y-1">
            <Link href="/profile/analytics" className={`flex items-center gap-2 ${THEME.components.typography.meta} hover:text-[${THEME.colors.primary}] font-medium p-2 hover:bg-gray-50 rounded-lg transition-colors`}>
                <FiBarChart2 className="w-3.5 h-3.5" />
                Profile Analytics
            </Link>
            <Link href="/profile/resume" className={`flex items-center gap-2 ${THEME.components.typography.meta} hover:text-[${THEME.colors.primary}] font-medium p-2 hover:bg-gray-50 rounded-lg transition-colors`}>
                <FiFileText className="w-3.5 h-3.5" />
                Resume & Portfolio
            </Link>
            <Link href="/subscription" className={`flex items-center gap-2 ${THEME.components.typography.meta} hover:text-[${THEME.colors.primary}] font-medium p-2 hover:bg-gray-50 rounded-lg transition-colors`}>
                <FiCreditCard className="w-3.5 h-3.5" />
                My Subscriptions
            </Link>
          </div>
        </div>
      </div>

      {/* Subscription Balance */}
      <div className={THEME.components.card.default}>
        <h4 className={`${THEME.components.typography.cardTitle} mb-3 border-b border-gray-100 pb-2`}>Subscriptions</h4>
        
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
    </div>
  );
};

export default NetworkingLeftSidebar;
