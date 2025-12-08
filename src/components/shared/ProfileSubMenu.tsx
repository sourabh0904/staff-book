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
          w-full md:w-fit md:max-w-[95%] 
          h-[50px] md:h-[80px] 
          ${THEME.components.glass}
          rounded-none md:rounded-full shadow-2xl ring-1 ring-black/5
          flex items-center justify-start md:justify-around 
          px-4 md:px-8 z-10 
          overflow-x-auto scrollbar-hide snap-x snap-mandatory
          gap-4 md:gap-0 
          transition-all duration-300 hover:shadow-2xl
          [mask-image:linear-gradient(to_right,transparent,black_10px,black_calc(100%_-_10px),transparent)]
          md:[mask-image:none]
        `}>
          {menuItems.map((item) => {
            const isActive = activeTab === item.key;
            return (
              <div
                key={item.key}
                onClick={() => handleTabChange(item.key)}
                className={`
                  group flex flex-col items-center justify-center 
                  text-[11px] md:text-sm 
                  min-w-[auto] md:min-w-[80px] 
                  h-full md:h-[60px] 
                  cursor-pointer transition-all duration-300 
                  rounded-none md:rounded-2xl 
                  px-2 md:px-4 
                  border-b-2 md:border-b-0
                  ${
                  isActive
                    ? "border-none text-[#18192B] shadow-md scale-105 rounded-2xl"
                    : "border-transparent text-gray-500 hover:text-primary hover:bg-gray-100 rounded-2xl"
                }
                `}
                style={isActive ? { background: `linear-gradient(to right, ${THEME.colors.gradient.start}, ${THEME.colors.gradient.end})` } : {}}
              >
                <span
                  className={`block w-4 h-4 md:w-5 md:h-5 mb-1 transition-transform duration-300 group-hover:scale-110 ${
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
