'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import ProfileModal from './ProfileModal';

interface ProfileAvatarProps {
  name: string;
  src?: string;
  size?: number;
  className?: string;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ name, src, size = 36, className = '' }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const imageSrc = src && src.trim() !== '' ? src : '/homePage/profile.png';

  const handleProfileClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={`flex cursor-pointer items-center gap-2 ${className}`} onClick={handleProfileClick}>
        <div className='cursor-pointer'></div>
        <div className='rounded-full border border-gray-200 overflow-hidden h-10 w-10 bg-red-500 flex items-center justify-center'>
          <Image
            src={imageSrc}
            alt={name}
            width={size}
            height={size}
            className="rounded-full object-cover"
          />
        </div>
        {/* <span className="text-xs text-[var(--text-main)] font-medium font-sans">{name}</span> */}
      </div>
      
      <ProfileModal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal}
      />
    </>
  );
};

export default ProfileAvatar; 