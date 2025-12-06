"use client"
import React, { useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

  const handleStoryClick = (profileName: string) => {
    if (profileName === "Your Story") {
      // Handle "Your Story" click - could open story creation modal
      return;
    }
    
    if (storyData[profileName as keyof typeof storyData]) {
      setSelectedStory(profileName);
      setCurrentStoryIndex(0);
      setProgress(0);
      setShowStoryModal(true);
    }
  };

  const closeStoryModal = () => {
    setShowStoryModal(false);
    setSelectedStory(null);
    setCurrentStoryIndex(0);
    setProgress(0);
  };

  const nextStory = () => {
    if (selectedStory) {
      const stories = storyData[selectedStory as keyof typeof storyData];
      if (currentStoryIndex < stories.length - 1) {
        setCurrentStoryIndex(currentStoryIndex + 1);
        setProgress(0);
      } else {
        closeStoryModal();
      }
    }
  };

  const previousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1);
      setProgress(0);
    }
  };

  // Auto-advance story
  React.useEffect(() => {
    if (selectedStory) {
      const stories = storyData[selectedStory as keyof typeof storyData];
      const currentStory = stories[currentStoryIndex];
      
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            nextStory();
            return 0;
          }
          return prev + 1;
        });
      }, currentStory.duration / 100);

      return () => clearInterval(interval);
    }
  }, [selectedStory, currentStoryIndex]);

  return (
    <>
      <section className="w-full bg-white pl-2 flex justify-center relative">
        {/* Mobile-only gradient background */}
        <div className="absolute inset-0  z-5 block sm:hidden" />

        <div className="relative w-full max-w-full z-10">
          {/* Left Arrow */}
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <FiChevronLeft className="w-5 h-5 text-gray-600 cursor-pointer" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-20 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <FiChevronRight className="w-5 h-5 text-gray-600 cursor-pointer" />
          </button>

          <div
            ref={scrollContainerRef}
            className="w-full h-[6.25rem] sm:h-[9.375rem] md:h-[12.5rem] flex items-center overflow-x-auto px-[0.5rem] space-x-[1rem] sm:space-x-[1.5rem] scrollbar-thin scrollbar-thumb-[var(--color-primary)] "
            style={{
              WebkitOverflowScrolling: "touch",
              overflowX: "auto",
              overflowY: "hidden",
              scrollbarWidth: "none",
              msOverflowStyle: "auto",
            }}
            tabIndex={0}
          >
            {profiles.map((profile) => (
              <div
                key={profile.name}
                className="flex flex-col items-center min-w-[4.5rem] sm:min-w-[6.25rem] md:min-w-[8.25rem] flex-shrink-0 select-none cursor-pointer"
                tabIndex={-1}
                style={{ userSelect: "none" }}
                draggable={false}
                onClick={() => handleStoryClick(profile.name)}
              >
                <div
                  className={`relative w-[4.5rem]  h-[4.5rem] sm:w-[6.25rem] sm:h-[6.25rem] md:w-[8.25rem] md:h-[8.25rem] rounded-full flex items-center justify-center ${
                    profile.isYourStory
                      ? "bg-gradient-to-tr from-purple-500 to-indigo-400"
                      : profile.hasPostedStory && !profile.hasViewedStory
                      ? "bg-gradient-to-tr from-purple-500 to-indigo-400"
                      : profile.hasPostedStory && profile.hasViewedStory
                      ? "bg-gradient-to-tr from-gray-400 to-gray-300"
                      : "bg-gradient-to-tr from-gray-300 to-gray-200"
                  } p-[0.18rem] sm:p-[0.1875rem] md:p-[0.25rem]`}
                  style={{ userSelect: "none" }}
                  tabIndex={-1}
                  draggable={false}
                >
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden" style={{ userSelect: "none" }}>
                    <img
                      src={profile.img}
                      alt={profile.name}
                      className="w-[4rem] h-[4rem] sm:w-[5.5rem] sm:h-[5.5rem] md:w-[7.75rem] md:h-[7.75rem] object-cover rounded-full pointer-events-none select-none"
                      draggable={false}
                      style={{ userSelect: "none", pointerEvents: "none" }}
                    />
                  </div>

                  {/* Plus icon for 'Your Story' */}
                  {profile.isYourStory && (
                    <span
                      className={`
                        absolute bottom-[0.25rem] right-[0.25rem] 
                        sm:bottom-[0.5rem] sm:right-[0.5rem] 
                        w-[1.25rem] h-[1.25rem] sm:w-[1.75rem] sm:h-[1.75rem] 
                        rounded-full flex items-center justify-center 
                        bg-white
                        border
                        border-white sm:border-purple-500
                      `}
                    >
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <circle cx="10" cy="10" r="10" fill="#7C3AED" />
                        <path
                          d="M10 6v8M6 10h8"
                          stroke="#fff"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  )}
                </div>

                {/* Profile name */}
                <span
                  className={`
                    mt-[0.3rem]  sm:mt-[0.75rem] text-center 
                    text-[0.75rem] sm:text-[0.875rem] md:text-[1rem] font-medium 
                    w-[4.5rem] sm:w-[6.25rem] md:w-[8.25rem] truncate 
                    ${profile.isYourStory ? "text-gray-700 sm:text-gray-500" : "text-gray-700 sm:text-gray-500"}
                  `}
                  style={{ userSelect: "none" }}
                  tabIndex={-1}
                >
                  {profile.name}
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
