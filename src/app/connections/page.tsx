import React from 'react';
import ProfileLayout from '@/components/shared/ProfileLayout';
import ConnectionsLayout from '@/components/Connections/ConnectionsLayout';

export default function ConnectionsPage() {
  return (
    <ProfileLayout showSidebar={true} showStories={false} showJobSearchBar={false}>
      <ConnectionsLayout />
    </ProfileLayout>
  );
}
