'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { jobCards } from '../../data/jobCards';
import { SITE_CONFIG } from '../../constants/siteconfig';
import JobCard from '../shared/JobCard';

const Hero = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

  useEffect(() => {
    // Create a shuffled array of indices for random order
    const indices = jobCards.map((_, i) => i);
    const shuffled = indices.sort(() => Math.random() - 0.5);

    // Show cards one by one in random order
    shuffled.forEach((index, i) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, index]);
        
        // Animate the card when it becomes visible
        setTimeout(() => {
          const card = mapRef.current?.querySelector(`[data-card-index="${index}"]`);
          if (card) {
            gsap.fromTo(
              card,
              { 
                opacity: 0, 
                y: 50, 
                scale: 0.8,
                rotation: Math.random() * 20 - 10 // Random rotation between -10 and 10
              },
              {
                opacity: 1,
                y: 0,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: 'back.out(1.7)',
              }
            );
          }
        }, 50);
      }, i * 400); // 400ms delay between each card
    });
  }, []);

  return (
    <section className="w-full bg-white py-15 md:pt-20 relative overflow-x-auto">
      <div className="w-full max-w-full px-2 md:px-4 mx-auto flex flex-col items-center text-center relative">
        {/* Title */}
        <h1 className="text-[28px] md:text-[48px] font-normal  text-gray-900 leading-tight">
          {SITE_CONFIG.homepage.heroTitle.split('with')[0]}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-gradient-end font-bold">
            {SITE_CONFIG.homepage.heroHighlight}
          </span>{' '}
          with <br className="hidden md:block" />
          {SITE_CONFIG.homepage.heroSubtitle}
        </h1>
        {/* Map and Cards */}
        <div className="relative w-full max-w-full mx-auto" ref={mapRef}>
          <Image
            src="/homePage/map.png"
            alt="World Map"
            objectFit="cover"
            width={1400}
            height={900}
            className="w-full h-[85vh] md:h-[90vh] select-none pointer-events-none"
            priority
          />
          {/* Floating Job Cards */}
          {jobCards.map((job, index) => (
            visibleCards.includes(index) && (
              <div
                key={index}
                data-card-index={index}
                className="job-card-animate absolute opacity-0"
                style={{ 
                  ...job.position, 
                  minWidth: 160, 
                  maxWidth: 220,
                  transform: 'scale(0.9)'
                }}
              >
                <JobCard job={job} />
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
