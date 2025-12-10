'use client'
import React from 'react';
import { posts, reels } from '../../data/networking';
import CreatePostWidget from './feed/CreatePostWidget';
import PostCard from './feed/PostCard';
import ReelsWidget from './feed/ReelsWidget';
import { THEME } from '../../styles/theme';
import StorySection from '../shared/StorySection';

const Networking: React.FC = () => {
  return (
    <div className={`flex flex-col w-full ${THEME.layout.spacing.sm}`}>
      {/* Stories Section */}
      <StorySection />
      
      {/* Create Post Section */}
      <CreatePostWidget />

      {/* Posts Feed */}
      <div className={`space-y-2 sm:space-y-3 md:space-y-2 mb-2 sm:mb-3 md:mb-2`}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Reels Section */}
      <ReelsWidget reels={reels} />

      {/* More Posts */}
      <div className={`space-y-2 sm:space-y-3 md:space-y-2`}>
        {posts.map((post) => (
          <PostCard key={`repeat-${post.id}`} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Networking;