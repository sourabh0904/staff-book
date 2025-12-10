import React from 'react';
import Image from 'next/image';
import { FiMapPin, FiBriefcase, FiDollarSign, FiClock, FiPlus, FiBookmark, FiNavigation, FiUserPlus } from 'react-icons/fi';
import ConnectButton from './ConnectButton';
import { THEME } from '@/styles/theme';

interface JobInviteCardProps {
  companyName: string;
  companyLogo: string;
  distance: string;
  jobTitle: string;
  workType: string; // e.g., "Work from office"
  jobType: string; // e.g., "Both" (Full-time/Part-time?) or "Full Time"
  location: string;
  salary: string;
  primaryActionLabel?: string;
  secondaryActionLabel?: string;
  onAccept: () => void;
  onDecline?: () => void;
  onSave?: () => void;
}

const JobInviteCard: React.FC<JobInviteCardProps> = ({
  companyName,
  companyLogo,
  distance,
  jobTitle,
  workType,
  jobType,
  location,
  salary,
  primaryActionLabel = "Accept Invite",
  secondaryActionLabel = "Decline",
  onAccept,
  onDecline,
  onSave,
}) => {
  return (
    <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-3 flex-1">
          <div className="relative w-12 h-12 flex-shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-indigo-50">
              {(companyLogo?.startsWith('/') || companyLogo?.startsWith('http')) ? (
                <Image
                  src={companyLogo}
                  alt={companyName}
                  fill
                  className="object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-indigo-600">
                  {companyLogo || companyName.charAt(0)}
                </span>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full z-10"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 text-base">{companyName}</h3>
            <div className="flex items-center gap-1 text-indigo-500 text-xs mt-0.5">
              <FiNavigation size={10} />
              <span>{distance}</span>
            </div>
            <div className="flex items-center justify-between mt-2 w-full">
              <ConnectButton 
                variant="outline"
                className="h-6 px-3 text-[10px] shadow-none hover:shadow-sm"
                icon={<FiUserPlus size={12} />}
                onClick={() => {}} 
              />
              <button 
                onClick={onSave}
                className="h-6 w-6 flex items-center justify-center bg-gray-50 border border-gray-100 rounded-lg text-indigo-600 hover:bg-indigo-50 transition-colors"
              >
                <FiBookmark size={12} />
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Removed ConnectButton from here */}
        </div>
      </div>

      {/* Banner / Placeholder */}
      <div className="w-full h-24 bg-indigo-50 rounded-xl mb-4 flex items-center justify-center">
        <span className="text-4xl font-bold text-indigo-300">{companyName.charAt(0)}</span>
      </div>

      {/* Job Title & Company */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-900 mb-1">{jobTitle}</h2>
        <p className="text-gray-500 text-sm">{companyName}</p>
      </div>

      {/* Job Details */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <FiClock size={16} className="text-gray-400" />
          <span>{workType}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <FiBriefcase size={16} className="text-gray-400" />
          <span>{jobType}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-500 text-sm">
          <FiMapPin size={16} className="text-gray-400" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-900 font-semibold text-sm">
          <FiDollarSign size={16} className="text-gray-400" />
          <span>{salary}</span>
        </div>
      </div>

      {/* Resume Dropdown */}
      <div className="mb-4">
        <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 appearance-none cursor-pointer">
          <option value="">Choose Resume</option>
          <option value="resume1">Resume_v1.pdf</option>
          <option value="resume2">Resume_v2.pdf</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={onAccept}
          className={`w-full ${THEME.components.button.primary} text-sm`}
        >
          {primaryActionLabel}
        </button>
        {onDecline && (
          <button
            onClick={onDecline}
            className={`w-full py-2.5 ${THEME.components.button.danger} text-sm`}
          >
            {secondaryActionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default JobInviteCard;
