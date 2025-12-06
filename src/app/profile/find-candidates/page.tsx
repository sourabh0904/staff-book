'use client';

import React, { useState, Suspense } from 'react';
import ProfileLayout from '@/components/shared/ProfileLayout';
import ProfileSubMenu from '@/components/shared/ProfileSubMenu';
import Card from '@/components/shared/Card';
import { THEME } from '@/styles/theme';
import {
  FiSearch,
  FiMapPin,
  FiFilter,
  FiBriefcase,
  FiEye,
  FiDollarSign,
  FiNavigation,
  FiPhone,
  FiMessageSquare,
  FiClock
} from 'react-icons/fi';

interface Candidate {
  id: string;
  name: string;
  title: string;
  location: string;
  experience: string;
  skills: string[];
  education: string;
  availability: string;
  distance?: number;
  image: string;
  lastActive: string;
  isOnline?: boolean;
}

const nearbyCandidates: Candidate[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Frontend Developer',
    location: 'Bangalore, IN',
    experience: '5+ years',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    education: 'B.Tech in Computer Science',
    availability: 'Immediate',
    distance: 2.3,
    image: '/homePage/profile.png',
    lastActive: '2 hours ago',
    isOnline: true,
  },
  {
    id: '2',
    name: 'Rahul Sharma',
    title: 'Full Stack Engineer',
    location: 'Bangalore, IN',
    experience: '4+ years',
    skills: ['Node.js', 'React', 'MongoDB', 'AWS'],
    education: 'M.Tech in Software Engineering',
    availability: '2 weeks notice',
    distance: 5.7,
    image: '/homePage/profile.png',
    lastActive: '1 day ago',
    isOnline: false,
  },
];

const readyToJoinCandidates: Candidate[] = [
  {
    id: '3',
    name: 'Priya Patel',
    title: 'UI/UX Designer',
    location: 'Mumbai, IN',
    experience: '3+ years',
    skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
    education: 'B.Des in Interaction Design',
    availability: 'Immediate',
    image: '/homePage/profile.png',
    lastActive: '5 hours ago',
    isOnline: true,
  },
  {
    id: '4',
    name: 'Amit Kumar',
    title: 'Backend Developer',
    location: 'Hyderabad, IN',
    experience: '6+ years',
    skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
    education: 'B.Tech in Computer Science',
    availability: 'Immediate',
    image: '/homePage/profile.png',
    lastActive: '3 days ago',
    isOnline: false,
  },
];

const sameSkillsCandidates: Candidate[] = [
  {
    id: '5',
    name: 'Neha Singh',
    title: 'React Developer',
    location: 'Pune, IN',
    experience: '4+ years',
    skills: ['React', 'JavaScript', 'Redux', 'Material-UI'],
    education: 'B.E. in Information Technology',
    availability: '1 month notice',
    image: '/homePage/profile.png',
    lastActive: '1 hour ago',
    isOnline: true,
  },
];

const menuItems = [
  { icon: <FiMapPin size={18} />, label: 'Nearby Candidates', key: 'nearby' },
  { icon: <FiBriefcase size={18} />, label: 'Ready to Join', key: 'ready' },
  { icon: <FiSearch size={18} />, label: 'Same Skills', key: 'skills' },
];

const inputLabels = [
  'Skills',
  'Experience',
  'Location',
  'Availability',
  'Education',
  'Salary Range',
];

export default function FindCandidatesPage() {
  const [activeTab, setActiveTab] = useState('nearby');
  const [radiusValue, setRadiusValue] = useState(10);

  const CandidateCard = ({ candidate }: { candidate: Candidate }) => (
    <Card className="hover:shadow-lg transition-all duration-300" noPadding>
      <div className="p-6 flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1">
          <div className="flex items-start gap-3 mb-4">
            <input 
              type="checkbox" 
              className={`mt-1 w-4 h-4 rounded border-gray-300 text-[${THEME.colors.primary}] focus:ring-[${THEME.colors.primary}]`} 
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className={`${THEME.components.typography.cardTitle} text-xl`}>{candidate.name}</h3>
                {candidate.isOnline !== undefined && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${candidate.isOnline
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-500'
                    }`}>
                    {candidate.isOnline ? 'ONLINE' : 'OFFLINE'}
                  </span>
                )}
              </div>

              <div className={`flex flex-wrap items-center gap-4 ${THEME.components.typography.body} mb-4`}>
                <span className="flex items-center gap-1.5">
                  <FiBriefcase size={14} className="text-gray-400" />
                  {candidate.experience}
                </span>
                <span className="flex items-center gap-1.5">
                  <FiDollarSign size={14} className="text-gray-400" />
                  ₹ 6.50 Lacs
                </span>
                <span className="flex items-center gap-1.5">
                  <FiMapPin size={14} className="text-gray-400" />
                  {candidate.location.split(',')[0]}
                </span>
                {candidate.distance && (
                  <span className={`flex items-center gap-1.5 text-[${THEME.colors.primary}] font-medium`}>
                    <FiNavigation size={14} />
                    {candidate.distance} km away
                  </span>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <span className={`text-sm font-medium ${THEME.components.typography.subheading} min-w-[80px]`}>Current:</span>
                  <span className={`${THEME.components.typography.body}`}>{candidate.title}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className={`text-sm font-medium ${THEME.components.typography.subheading} min-w-[80px]`}>Education:</span>
                  <span className={`${THEME.components.typography.body}`}>{candidate.education}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className={`text-sm font-medium ${THEME.components.typography.subheading} min-w-[80px]`}>Key Skills:</span>
                  <div className="flex flex-wrap gap-1.5 flex-1">
                    {candidate.skills.map((skill, idx) => (
                      <span key={idx} className={`px-2 py-0.5 bg-[#F3EFFF] text-[${THEME.colors.primary}] text-xs font-medium rounded-md`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={`flex items-center gap-4 text-xs ${THEME.components.typography.caption}`}>
                <span className="flex items-center gap-1">
                  <FiEye size={12} />
                  18 Views
                </span>
                <span className="flex items-center gap-1">
                  <FiClock size={12} />
                  Active: {candidate.lastActive}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-64 flex flex-col items-center border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
          <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-br from-gradient-start to-gradient-end mb-3 relative">
            <div className="w-full h-full rounded-full bg-white p-[2px] overflow-hidden">
              <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover rounded-full" />
            </div>
            {candidate.isOnline && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          <div className="text-center mb-4 w-full">
            <p className={`text-sm font-bold ${THEME.components.typography.sectionTitle} mb-0.5`}>{candidate.experience}</p>
            <p className={`text-xs ${THEME.components.typography.caption}`}>Total Experience</p>
          </div>

          <button className={`w-full px-4 py-2 border ${THEME.colors.border} rounded-lg text-sm font-medium ${THEME.components.typography.body} hover:bg-gray-50 transition-colors mb-3 flex items-center justify-center gap-2`}>
            <FiPhone size={14} />
            Show Contact
          </button>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] font-medium text-green-600 mb-4">
            <span className="flex items-center gap-1">✓ Verified Phone</span>
            <span className="flex items-center gap-1">✓ Verified Email</span>
          </div>

          <div className="flex gap-2 w-full">
            <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Review Later
            </button>
            <button className={`p-2 bg-gradient-to-r ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} text-white rounded-lg hover:opacity-90 transition-opacity`}>
              <FiMessageSquare size={18} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <ProfileLayout showSidebar={true} showStories={false} showJobSearchBar={false}>
      <div className={`min-h-screen ${THEME.colors.background.page} pt-4 md:pt-6 lg:pt-8 -mt-[30px]`}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Sub Menu */}
          <Suspense fallback={<div>Loading menu...</div>}>
            <ProfileSubMenu
              menuItems={menuItems}
              activeTab={activeTab}
              onTabChange={(key) => setActiveTab(key)}
            />
          </Suspense>

          {/* Enhanced Filter Section */}
          <Card className="mt-10 mb-8" noPadding>
            <div className="p-6">
              <h3 className={`${THEME.components.typography.sectionTitle} mb-4`}>Filter Candidates</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {inputLabels.map((label, index) => (
                  <div 
                    key={index} 
                    className="group relative bg-gray-50 rounded-xl p-1 border border-gray-200 hover:border-gradient-end transition-all duration-300"
                  >
                    <div className={`absolute -top-2.5 left-3 px-2 bg-gray-50 text-xs font-semibold text-gray-500 group-hover:text-[${THEME.colors.primary}] transition-colors z-10`}>
                      {label}
                    </div>
                    <input
                      type="text"
                      placeholder={`Select ${label}`}
                      className={`w-full px-3 py-2.5 bg-transparent border-none outline-none text-sm font-medium ${THEME.components.typography.body} placeholder-gray-400 focus:ring-0`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Section 1: Explore Candidates in Your Area */}
          {activeTab === 'nearby' && (
            <div className="space-y-6 mt-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                <h2 className={`${THEME.components.typography.sectionTitle} text-2xl`}>Explore Candidates in Your Area</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    <FiNavigation size={16} className={`text-[${THEME.colors.primary}]`} />
                    <span className={`text-sm ${THEME.components.typography.body}`}>Within</span>
                    <select
                      value={radiusValue}
                      onChange={(e) => setRadiusValue(Number(e.target.value))}
                      className={`border-none bg-transparent text-sm font-semibold text-gray-700 focus:ring-0 cursor-pointer`}
                    >
                      <option value={5}>5 km</option>
                      <option value={10}>10 km</option>
                      <option value={20}>20 km</option>
                      <option value={50}>50 km</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <Card className="h-64 flex items-center justify-center mb-6 overflow-hidden relative group cursor-pointer" noPadding>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center transform transition-transform duration-300 group-hover:scale-105">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-full bg-white shadow-md flex items-center justify-center text-[${THEME.colors.primary}]`}>
                    <FiMapPin size={32} />
                  </div>
                  <p className={`${THEME.components.typography.sectionTitle} text-lg mb-1`}>Interactive Map View</p>
                  <p className={`${THEME.components.typography.body} text-sm`}>Showing candidates within <span className="font-bold">{radiusValue} km</span></p>
                  <button className={`mt-4 px-6 py-2 bg-white border border-[${THEME.colors.primary}] text-[${THEME.colors.primary}] rounded-full text-sm font-bold shadow-sm hover:bg-blue-50 transition-colors`}>
                    Open Map
                  </button>
                </div>
              </Card>

              {/* Candidates List */}
              <div className="space-y-4">
                {nearbyCandidates.map(candidate => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            </div>
          )}

          {/* Section 2: Ready To Join Candidates */}
          {activeTab === 'ready' && (
            <div className="space-y-6 mt-8">
              <div className="mb-4">
                <h2 className={`${THEME.components.typography.sectionTitle} text-2xl mb-2`}>Ready To Join Candidates</h2>
                <p className={`${THEME.components.typography.body}`}>Candidates available for immediate joining</p>
              </div>

              {/* Candidates List */}
              <div className="space-y-4">
                {readyToJoinCandidates.map(candidate => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            </div>
          )}

          {/* Section 3: Candidates Having Same Skills */}
          {activeTab === 'skills' && (
            <div className="space-y-6 mt-8">
              <div className="mb-4">
                <h2 className={`${THEME.components.typography.sectionTitle} text-2xl mb-2`}>Candidates Having Same Skills</h2>
                <p className={`${THEME.components.typography.body}`}>Candidates matching your required skill set</p>
              </div>

              {/* Candidates List */}
              <div className="space-y-4">
                {sameSkillsCandidates.map(candidate => (
                  <CandidateCard key={candidate.id} candidate={candidate} />
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {((activeTab === 'nearby' && nearbyCandidates.length === 0) ||
            (activeTab === 'ready' && readyToJoinCandidates.length === 0) ||
            (activeTab === 'skills' && sameSkillsCandidates.length === 0)) && (
              <Card className="py-16 flex flex-col items-center justify-center text-center mt-8">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <FiSearch size={32} className="text-gray-400" />
                </div>
                <h3 className={`${THEME.components.typography.sectionTitle} text-xl mb-2`}>No candidates found</h3>
                <p className={`${THEME.components.typography.body} max-w-md mx-auto`}>
                  Try adjusting your filters or search criteria to find more candidates matching your requirements.
                </p>
              </Card>
            )}
        </div>
      </div>
    </ProfileLayout>
  );
}
