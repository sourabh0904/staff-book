import type { ProfilePerformanceStat } from '../types/profile';

export const profilePerformanceStats: Omit<ProfilePerformanceStat, 'icon'>[] = [
  { label: 'Connections', value: 1670 },
  { label: 'Posts', value: 34 },
  { label: 'Job Posts', value: 34 },
  { label: 'Profile Views', value: 1670 },
  { label: 'Resume Downloads', value: 1670 },
  { label: 'Contact Viewed', value: 1670 },
]; 