import type { ProfilePerformanceStat } from '../types/profile';

export const profilePerformanceStats: Omit<ProfilePerformanceStat, 'icon'>[] = [
  { label: 'Connections', value: 1670 },
  { label: 'Posts', value: 34 },
  { label: 'Job Posts', value: 34 },
]; 