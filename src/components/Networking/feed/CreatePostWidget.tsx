'use client';
import React from 'react';
import Image from 'next/image';
import { FiEdit3, FiImage, FiVideo, FiCamera, FiX, FiPlus } from 'react-icons/fi';
import { FiVideo as FiVideoIcon } from 'react-icons/fi';
import { SITE_CONFIG } from '../../../constants/siteconfig';
import { THEME } from '../../../styles/theme';

const CreatePostWidget: React.FC = () => {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const [caption, setCaption] = React.useState('');
  const [hashtags, setHashtags] = React.useState('');

  return (
    <div className={`${THEME.components.card.default} mb-3 sm:mb-3 md:mb-3`}>
      {!isExpanded ? (
        <>
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="relative">
              <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-r from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}] p-1`}>
                <Image
                  src="/homePage/profile.png"
                  alt="Your profile"
                  width={64}
                  height={64}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
            </div>
            <div className="flex-1">
              <input
                type="text"
                className="w-full p-3 sm:p-3.5 md:p-4 bg-gray-50 rounded-full border border-gray-300 text-sm sm:text-base text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white"
                placeholder="Write a post"
                onClick={() => setIsExpanded(true)}
                readOnly
              />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 md:p-3 hover:bg-purple-50 hover:border-purple-200 transition-colors group">
              <FiEdit3 className={`w-4 h-4 sm:w-5 sm:h-5 ${THEME.components.icon.primary}`} />
              <span className="text-xs sm:text-sm font-bold text-black">Write Blog</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 md:p-3 hover:bg-purple-50 hover:border-purple-200 transition-colors group">
              <FiImage className={`w-4 h-4 sm:w-5 sm:h-5 ${THEME.components.icon.primary}`} />
              <span className="text-xs sm:text-sm font-bold text-black">Upload Image</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 md:p-3 hover:bg-purple-50 hover:border-purple-200 transition-colors group">
              <FiVideoIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${THEME.components.icon.primary}`} />
              <span className="text-xs sm:text-sm font-bold text-black">Upload Video</span>
            </button>
            <button className="flex items-center justify-center gap-1.5 sm:gap-2 p-2 sm:p-2.5 md:p-3 hover:bg-purple-50 hover:border-purple-200 transition-colors group">
              <FiVideo className={`w-4 h-4 sm:w-5 sm:h-5 ${THEME.components.icon.primary}`} />
              <span className="text-xs sm:text-sm font-bold text-black">Upload Reel</span>
            </button>
          </div>
        </>
      ) : (
        <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Create Post</h3>
                <button
                onClick={() => setIsExpanded(false)}
                className={`text-gray-600 hover:text-indigo-300 transition-colors`}
                >
                <FiX className="w-5 h-5" />
                </button>
            </div>
          {/* Video Upload/Record Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <FiVideo className={`w-8 h-8 ${THEME.components.icon.primary}`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Create your content</h4>
                <p className="text-sm text-gray-600 mb-4">Share your professional insights and tips</p>
                <div className="flex gap-3">
                  <button className={`flex items-center gap-2 ${THEME.components.button.primary} px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors`}>
                    <FiVideo className="w-4 h-4" />
                    Upload
                  </button>
                  <button className="flex items-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <FiCamera className="w-4 h-4" />
                    Record
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Caption Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder={SITE_CONFIG.networking.reels.addCaption}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              rows={3}
            />
          </div>

          {/* Hashtags Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags</label>
            <input
              type="text"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
              placeholder={SITE_CONFIG.networking.reels.addHashtags}
              className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={() => setIsExpanded(false)}
              className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {SITE_CONFIG.networking.reels.cancel}
            </button>
            <button className={`flex-1 ${THEME.components.button.primary} text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors`}>
              {SITE_CONFIG.networking.reels.publish}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePostWidget;
