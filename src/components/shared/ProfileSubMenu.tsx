"use client";

import React from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  key: string;
}

interface ProfileSubMenuProps {
  menuItems: MenuItem[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

import { THEME } from "@/styles/theme";

export default function ProfileSubMenu({
  menuItems,
  activeTab,
  onTabChange,
}: ProfileSubMenuProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleTabChange = (key: string) => {
    // Update URL with tab parameter
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', key);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
    
    // Also call the original onTabChange callback
    onTabChange(key);
  };

  return (
    <section
      className={`w-full bg-transparent py-0 md:py-2 relative mb-6 mt-0 md:mt-10 sticky top-[55px] md:top-[70px] z-40 transition-all duration-300`}
    >
      <div className="w-full md:max-w-[95%] mx-auto relative px-0">
        {/* Floating Menu */}
        <div className={`
          relative md:absolute md:top-[-46px] md:left-1/2 md:-translate-x-1/2 
          w-fit max-w-[95%] mx-auto
          h-auto py-2 md:py-0 md:h-[80px] 
          ${THEME.components.glass}
          border border-gray-100 md:border-none
          rounded-2xl md:rounded-full shadow-lg md:shadow-2xl md:ring-1 md:ring-black/5
          flex items-center justify-start md:justify-around 
          px-4 md:px-8 z-10 
          overflow-x-auto scrollbar-hide snap-x snap-mandatory
          gap-2 md:gap-0 
          transition-all duration-300
        `}>
          {menuItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <div
                key={item.key}
                onClick={() => handleTabChange(item.key)}
                className={`
                  group flex md:flex-col flex-row items-center justify-center gap-2 md:gap-0
                  text-xs md:text-sm font-medium
                  min-w-fit md:min-w-[80px] 
                  px-4 py-2 md:px-4 md:py-0
                  h-auto md:h-[60px] 
                  cursor-pointer transition-all duration-300 
                  rounded-full md:rounded-2xl 
                  snap-center
                  ${
                  isActive
                    ? "text-[#18192B] shadow-sm md:shadow-md md:scale-105"
                    : "text-gray-500 hover:text-primary hover:bg-gray-50"
                }
                `}
                style={isActive ? { background: `linear-gradient(to right, ${THEME.colors.gradient.start}, ${THEME.colors.gradient.end})` } : {}}
              >
                <span
                  className={`block w-4 h-4 md:w-5 md:h-5 md:mb-1 transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-[#18192B]" : "text-gray-400 group-hover:text-primary"
                  }`}
                >
                  {item.icon}
                </span>     
                <span
                  className={`whitespace-nowrap font-medium transition-all duration-300 ${
                    isActive ? "text-[#18192B]" : "group-hover:text-primary"
                  }`}
                >
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
