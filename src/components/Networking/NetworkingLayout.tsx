'use client'
import React, { useState } from 'react';
import Networking from './Networking';
import NetworkingRightSidebar from './NetworkingRightSidebar';
import NetworkingLeftSidebar from './NetworkingLeftSidebar';
import StorySection from '../shared/StorySection';
import { FiMap, FiX } from 'react-icons/fi';
import { THEME } from '../../styles/theme';

const NetworkingLayout: React.FC = () => {
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Right Sidebar Overlay */}
      {isRightSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
          onClick={() => setIsRightSidebarOpen(false)}
        />
      )}

      {/* Mobile Right Sidebar Container */}
      <div className={`
        lg:hidden fixed top-[70px] bottom-0 right-0 z-40 w-80 bg-[#F7F7F8] shadow-xl transform transition-transform duration-300 ease-in-out
        ${isRightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
        px-4 pt-4
      `}>
        <div className="h-full overflow-y-auto pb-20">
          <NetworkingRightSidebar />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-8 w-full">
          {/* Mobile Map Toggle Button (Inline) */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsRightSidebarOpen(!isRightSidebarOpen)}
              className={`w-full ${THEME.components.button.secondary} flex items-center justify-center gap-2 py-2.5 rounded-xl shadow-sm border border-gray-200 bg-white`}
            >
              <FiMap className="text-primary" />
              <span className="font-medium text-gray-700">View Map & Suggestions</span>
            </button>
          </div>

          {/* <div className='bg-white rounded-xl border border-gray-200 mb-4 p-4'>
            <StorySection />
          </div> */}
          <Networking />
        </div>

        {/* Right Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-[80px] max-h-[calc(100vh-80px)] overflow-y-auto">
            <NetworkingRightSidebar />
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkingLayout;