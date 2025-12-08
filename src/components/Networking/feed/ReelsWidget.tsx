import React from 'react';
import { FiRefreshCw } from 'react-icons/fi';
import ReelCard from './ReelCard';
import { Reel } from '../../../data/networking';
import { SITE_CONFIG } from '../../../constants/siteconfig';

const ReelsWidget: React.FC<{ reels: Reel[] }> = ({ reels }) => {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-gray-200 p-3 sm:p-4 my-4 sm:my-5 md:my-6 mb-2 sm:mb-3 md:mb-2 -mt-2 sm:-mt-3 md:-mt-2">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="font-semibold text-base sm:text-lg text-gray-900">{SITE_CONFIG.networking.reels.title}</h3>
        <button className="flex items-center gap-1 text-gray-600 hover:text-indigo-300 transition-colors">
          <FiRefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">{SITE_CONFIG.networking.reels.refresh}</span>
        </button>
      </div>
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-hide [mask-image:linear-gradient(to_right,transparent,black_10px,black_calc(100%_-_10px),transparent)] px-1">
        {reels.map((reel) => (
          <div key={reel.id} className="flex-shrink-0">
            <ReelCard reel={reel} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReelsWidget;
