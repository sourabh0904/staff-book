import React from 'react';
import { profilePerformanceStats } from '../../data/profilePerformanceStats';
import { PROFILE_PERFORMANCE_TITLE } from '../../constants/siteconfig';
import type { ProfilePerformanceStat } from '../../types/profile';
import ConnectionsIcon from '../svgs/ConnectionsIcon';
import PostsIcon from '../svgs/PostsIcon';
import JobPostsIcon from '../svgs/JobPostsIcon';
import ProfileViewsIcon from '../svgs/ProfileViewsIcon';
import ResumeDownloadsIcon from '../svgs/ResumeDownloadsIcon';
import ContactViewedIcon from '../svgs/ContactViewedIcon';
import { THEME } from '../../styles/theme';
import Card from '../shared/Card';

const icons: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  Connections: ConnectionsIcon,
  Posts: PostsIcon,
  'Job Posts': JobPostsIcon,
  'Profile Views': ProfileViewsIcon,
  'Resume Downloads': ResumeDownloadsIcon,
  'Contact Viewed': ContactViewedIcon,
};

const ProfilePerformanceStats: React.FC = () => {
  return (
    <Card className="flex flex-col gap-4 relative mt-4">
      <div className={THEME.components.typography.sectionTitle}>{PROFILE_PERFORMANCE_TITLE}</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {profilePerformanceStats.map((stat) => {
          const Icon = icons[stat.label];
          return (
            <div key={stat.label} className={`flex flex-col items-center bg-white ${THEME.components.card.radius} shadow p-4 gap-2 border border-gray-100`}>
              {Icon && <Icon className={THEME.components.icon.primary} />}
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className={THEME.components.typography.meta}>{stat.label}</div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default ProfilePerformanceStats; 