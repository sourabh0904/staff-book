'use client'
import React from 'react';
import Networking from './Networking';
import NetworkingRightSidebar from './NetworkingRightSidebar';
import NetworkingLeftSidebar from './NetworkingLeftSidebar';
import StorySection from '../shared/StorySection';

const NetworkingLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-[#F7F7F8]">
      <div className="max-w-7xl mx-auto pt-[0px] px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[80px] max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
              <NetworkingLeftSidebar />
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-6 w-full">
            {/* <div className='bg-white rounded-xl border border-gray-200 mb-4 p-4'>
              <StorySection />
            </div> */}
            <Networking />
          </div>

          {/* Right Sidebar */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-[80px] max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
              <NetworkingRightSidebar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkingLayout;