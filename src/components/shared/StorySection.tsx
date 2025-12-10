"use client"
import React, { useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { THEME } from "@/styles/theme";

const profiles = [
  { 
    name: "Your Story", 
    img: "/homePage/profile.png", 
    isYourStory: true, 
    hasPostedStory: false 
  },
  { 
    name: "Rajeev Tripathi", 
    img: "/homePage/profile.png", 
    hasPostedStory: true, 
    hasViewedStory: false 
  },
  { 
    name: "Anushka Singh", 
    img: "/homePage/profile.png", 
    hasPostedStory: true, 
    hasViewedStory: true 
  },
  { 
    name: "Ashish Soni", 
    img: "/homePage/profile.png", 
    hasPostedStory: true, 
    hasViewedStory: false 
  },
  { 
    name: "Preeti Goyal", 
    img: "/homePage/profile.png", 
    hasPostedStory: true, 
    hasViewedStory: true 
  },
  { 
    name: "Anu Kataria", 
    img: "/homePage/profile.png", 
    hasPostedStory: true, 
    hasViewedStory: false 
  },
  { 
    name: "Raghu Rajwanshi", 
    img: "/homePage/profile.png", 
    hasPostedStory: true, 
    hasViewedStory: true 
  },
  { 
    name: "Deepshikha Mittal", 
    img: "/homePage/profile.png", 
    hasPostedStory: true, 
    hasViewedStory: false 
  },
];

// Mock story data for the modal
const storyData = {
  "Rajeev Tripathi": [
    { type: "image", url: "/homePage/job-photo.png", duration: 5000 },
    { type: "image", url: "/homePage/job.png", duration: 5000 },
  ],
  "Anushka Singh": [
    { type: "image", url: "/homePage/profile.png", duration: 5000 },
  ],
  "Ashish Soni": [
    { type: "image", url: "/homePage/job-photo.png", duration: 5000 },
  ],
  "Preeti Goyal": [
    { type: "image", url: "/homePage/job.png", duration: 5000 },
  ],
  "Anu Kataria": [
    { type: "image", url: "/homePage/profile.png", duration: 5000 },
  ],
  "Raghu Rajwanshi": [
    { type: "image", url: "/homePage/job-photo.png", duration: 5000 },
  ],
  "Deepshikha Mittal": [
    { type: "image", url: "/homePage/job.png", duration: 5000 },
  ],
};

const StorySection = () => {
  const [selectedStory, setSelectedStory] = useState<string | null>(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [showStoryModal, setShowStoryModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // buffer of 10px
    }
  };

  React.useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth'
      });
    }
  };

  const handleStoryClick = (name: string) => {
    if (storyData[name as keyof typeof storyData]) {
      setSelectedStory(name);
      setShowStoryModal(true);
      setCurrentStoryIndex(0);
      setProgress(0);
    }
  };

  const closeStoryModal = () => {
    setShowStoryModal(false);
    setSelectedStory(null);
    setCurrentStoryIndex(0);
    setProgress(0);
  };

  const nextStory = () => {
    if (selectedStory && storyData[selectedStory as keyof typeof storyData]) {
      const stories = storyData[selectedStory as keyof typeof storyData];
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(prev => prev + 1);
        setProgress(0);
      } else {
        closeStoryModal();
      }
    }
  };

  const previousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showStoryModal && selectedStory) {
      timer = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [showStoryModal, selectedStory, currentStoryIndex]);

  return (
    <>
      <section className={`w-full ${THEME.components.card.default} flex justify-center relative !p-0 overflow-hidden`}>
        {/* Mobile-only gradient background */}
        <div className="absolute inset-0 z-5 block sm:hidden" />

        <div className="relative w-full max-w-full z-10 py-4">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="w-5 h-5 text-gray-600 cursor-pointer" />
            </button>
          )}

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
              aria-label="Scroll right"
            >
              <FiChevronRight className="w-5 h-5 text-gray-600 cursor-pointer" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            onScroll={checkScrollPosition}
            className="w-full flex items-center overflow-x-auto px-4 space-x-4 scrollbar-hide"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            tabIndex={0}
          >
            {profiles.map((profile) => (
              <div
                key={profile.name}
                className="flex flex-col items-center min-w-[72px] flex-shrink-0 select-none cursor-pointer group"
                tabIndex={-1}
                style={{ userSelect: "none" }}
                draggable={false}
                onClick={() => handleStoryClick(profile.name)}
              >
                <div
                  className={`relative w-[72px] h-[72px] rounded-full flex items-center justify-center ${
                    profile.isYourStory
                      ? "bg-gradient-to-tr from-indigo-400 to-purple-500"
                      : profile.hasPostedStory && !profile.hasViewedStory
                      ? "bg-gradient-to-tr from-indigo-400 to-purple-500"
                      : profile.hasPostedStory && profile.hasViewedStory
                      ? "bg-gray-200"
                      : "bg-gray-100"
                  } p-[2px] transition-transform duration-200 group-hover:scale-105`}
                  style={{ userSelect: "none" }}
                  tabIndex={-1}
                  draggable={false}
                >
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden border-[2px] border-white" style={{ userSelect: "none" }}>
                    <img
                      src={profile.img}
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-full pointer-events-none select-none"
                      draggable={false}
                      style={{ userSelect: "none", pointerEvents: "none" }}
                    />
                  </div>

                  {/* Plus icon for 'Your Story' */}
                  {profile.isYourStory && (
                    <span
                      className="absolute bottom-0 right-0 w-5 h-5 rounded-full flex items-center justify-center bg-white"
                    >
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center bg-indigo-500 text-white`}>
                        <svg
                          width="10"
                          height="10"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="3"
                        >
                          <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </span>
                  )}
                </div>

                {/* Profile name */}
                <span
                  className={`mt-2 text-center text-xs font-medium w-full truncate px-1 ${
                    profile.isYourStory ? "text-gray-900" : "text-gray-600"
                  }`}
                  style={{ userSelect: "none" }}
                  tabIndex={-1}
                >
                  {profile.name.split(' ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Viewer Modal */}
      {selectedStory && showStoryModal && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="relative w-full h-full max-w-md max-h-[80vh] bg-black">
            {/* Header */}
            <div className="absolute top-3 left-0 right-0 z-10 p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src="/homePage/profile.png"
                    alt={selectedStory}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="text-white font-medium">{selectedStory}</span>
              </div>
              <button
                onClick={closeStoryModal}
                className="text-white cursor-pointer text-2xl font-bold"
              >
                ×
              </button>
            </div>

            {/* Progress Bar */}
            <div className="absolute top-0 left-0 right-0 z-20 p-4">
              <div className="flex space-x-1">
                {storyData[selectedStory as keyof typeof storyData]?.map((_, index) => (
                  <div key={index} className="flex-1 h-1 bg-gray-600 rounded-full">
                    <div
                      className={`h-full rounded-full transition-all duration-100 ${
                        index < currentStoryIndex
                          ? "bg-white"
                          : index === currentStoryIndex
                          ? "bg-white"
                          : "bg-gray-600"
                      }`}
                      style={{
                        width: index === currentStoryIndex ? `${progress}%` : index < currentStoryIndex ? "100%" : "0%"
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Story Content */}
            <div className="w-full h-full flex items-center justify-center">
              {storyData[selectedStory as keyof typeof storyData]?.[currentStoryIndex] && (
                <img
                  src={storyData[selectedStory as keyof typeof storyData][currentStoryIndex].url}
                  alt="Story"
                  className="w-full h-full object-contain"
                />
              )}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={previousStory}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white"
            >
              ‹
            </button>
            <button
              onClick={nextStory}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default StorySection;
