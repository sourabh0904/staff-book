import React from 'react';
import { profileCompletion } from '../../data/profile';
import type { ProfileCompletion } from '../../types/profile';
import { THEME } from '../../styles/theme';

const ProfilePerformance: React.FC = () => {
  const data: ProfileCompletion = profileCompletion;
  return (
    <div className={`${THEME.components.card.default} flex flex-col gap-2`}>
      <div className={`${THEME.components.typography.cardTitle} mb-1`}>{data.label}</div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-base font-semibold text-gray-900">{data.skill}</span>
        <span className="text-base font-bold text-gray-900">{data.percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
        <div
          className="h-2 bg-green-500 rounded-full transition-all"
          style={{ width: `${data.percent}%` }}
        />
      </div>
      <div className={`${THEME.components.typography.meta} mt-1`}>{data.helper}</div>
    </div>
  );
};

export default ProfilePerformance;