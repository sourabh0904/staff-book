import React, { useState, useEffect, useRef } from 'react';
import { FiChevronDown } from 'react-icons/fi';

interface ScrollableSectionProps {
  children: React.ReactNode;
  className?: string; // Allow minimal styling overrides if needed
  desktopLayout?: 'grid' | 'list'; // Control desktop layout variant
}

const ScrollableSection: React.FC<ScrollableSectionProps> = ({ children, className = "", desktopLayout = 'grid' }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      // Use a small buffer (e.g., 10px) to determine if we are at the end
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    window.addEventListener('resize', checkScrollPosition);
    return () => window.removeEventListener('resize', checkScrollPosition);
  }, [children]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  // Define desktop classes based on layout variant
  const desktopClasses = desktopLayout === 'list' 
    ? 'md:flex md:flex-col md:space-y-4' 
    : 'md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 md:gap-6';

  return (
    <div className={`relative group ${className}`}>
      {/* Scroll Buttons - Mobile Only */}
      {showLeftArrow && (
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex md:hidden items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
          aria-label="Scroll left"
        >
          <FiChevronDown className="w-5 h-5 text-gray-600 rotate-90" />
        </button>
      )}
      {showRightArrow && (
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 w-8 h-8 bg-white shadow-md rounded-full flex md:hidden items-center justify-center hover:bg-gray-50 transition-colors border border-gray-100"
          aria-label="Scroll right"
        >
          <FiChevronDown className="w-5 h-5 text-gray-600 -rotate-90" />
        </button>
      )}

      {/* Container */}
      <div 
        ref={scrollContainerRef}
        onScroll={checkScrollPosition}
        // core scroll styles + standard grid structure for desktop
        className={`flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 ${desktopClasses}`}
      >
        {children}
      </div>
    </div>
  );
};

export default ScrollableSection;
