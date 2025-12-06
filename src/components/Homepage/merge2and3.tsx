'use client'

import { categories } from '../../data/categories';
import { SITE_CONFIG } from '../../constants/siteconfig';
import * as LucideIcons from 'lucide-react';
import Image from 'next/image';

const CategoriesWithNews = () => {
  return (
    <section className="w-full bg-white overflow-hidden relative">
      {/* One Blue Blur at RIGHT between both sections */}
      <div className="absolute right-0 top-1/2 transform translate-x-[200px] -translate-y-1/2 w-[925px] h-[1029px] bg-gradient-to-br from-purple-500/30 to-blue-500/30 blur-[200px] rounded-full opacity-60 pointer-events-none z-0" />
      {/* Main container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h1 className="text-[32px] sm:text-[40px] md:text-[48px] font-medium text-[#101022] leading-tight">
            {SITE_CONFIG.homepage.heroTitle.split('with')[0]}
            <span className="bg-gradient-to-r from-primary to-gradient-end text-transparent bg-clip-text">Roles</span>
          </h1>
        </div>
        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5 mb-24 max-w-[1371px] mx-auto">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="h-[81px] bg-white rounded-lg px-4 md:px-6 py-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <div className="w-[42px] h-[42px] bg-[#F6F6FE] rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-[16px] font-medium text-[#101022]">{category.title}</h3>
                  <p className="text-[14px] text-[#D9D9E2]">{category.jobs}</p>
                </div>
              </div>
            );
          })}
        </div>
        {/* News Section */}
        <div className="text-center">
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-medium text-gray-900 leading-tight mb-4">
            {SITE_CONFIG.homepage.newsTitle}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
              {" "}{SITE_CONFIG.homepage.newsTitle.split(' ')[1]}
            </span>
          </h2>
          <div className="text-2xl  font-medium text-gray-700 mb-12">
            {SITE_CONFIG.homepage.newsDescription}
          </div>
          <div className="relative max-w-xl mx-auto mt-8">
            <Image
              src="/homePage/professional.png"
              alt="Staffbook UI Mockup"
              width={1000}
              height={600}
              layout="responsive"
              objectFit="contain"
              quality={100}
              priority
              className='w-full h-[30vh] bg-red-500 object-contain'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesWithNews;
