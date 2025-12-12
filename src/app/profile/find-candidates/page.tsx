'use client';

import React, { useState, Suspense } from 'react';
import ProfileLayout from '@/components/shared/ProfileLayout';
import ProfileSubMenu from '@/components/shared/ProfileSubMenu';
import Card from '@/components/shared/Card';
import ConnectButton from '@/components/shared/ConnectButton';
import ManageJobsContent from '@/components/profile/ManageJobsContent';
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
  FiClock,
  FiMail,
  FiMessageCircle,
  FiUserPlus,
  FiPlus,
  FiFileText,
  FiDownload,
  FiX,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

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
  phone?: string;
  email?: string;
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
    phone: '919876543210',
    email: 'sarah.johnson@example.com'
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
    phone: '919876543211',
    email: 'rahul.sharma@example.com'
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
    phone: '919876543212',
    email: 'priya.patel@example.com'
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
    phone: '919876543213',
    email: 'amit.kumar@example.com'
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
    phone: '919876543214',
    email: 'neha.singh@example.com'
  },
];

const downloadedResumes = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Senior Frontend Developer',
    downloadedOn: 'Jan 20, 2024',
    fileUrl: '/dummy-resume.pdf'
  },
  {
    id: '2',
    name: 'Rahul Sharma',
    position: 'Full Stack Engineer',
    downloadedOn: 'Jan 18, 2024',
    fileUrl: '/dummy-resume.pdf'
  },
  {
    id: '3',
    name: 'Priya Patel',
    position: 'UI/UX Designer',
    downloadedOn: 'Jan 15, 2024',
    fileUrl: '/dummy-resume.pdf'
  }
];

const sentInvites = [
  {
    id: '1',
    name: 'Sarah Johnson',
    position: 'Frontend Developer',
    status: 'Pending',
    time: '2 days ago'
  },
  {
    id: '2',
    name: 'Rahul Sharma',
    position: 'Full Stack Engineer',
    status: 'Accepted',
    time: '5 days ago'
  }
];

const menuItems = [
  { icon: <FiMapPin size={18} />, label: 'Find Candidates', key: 'find-candidates' },
  { icon: <FiUserPlus size={18} />, label: 'Candidate Invite', key: 'invites' },
  { icon: <FiBriefcase size={18} />, label: 'Manage Job Post', key: 'manage-jobs' },
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
  const [activeTab, setActiveTab] = useState('find-candidates');
  const [radiusValue, setRadiusValue] = useState(10);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const [selectedCandidates, setSelectedCandidates] = useState<string[]>([]);
  const [candidateSearchQuery, setCandidateSearchQuery] = useState('');
  const [isCandidateSearchOpen, setIsCandidateSearchOpen] = useState(false);

  const allCandidates = [...nearbyCandidates, ...readyToJoinCandidates, ...sameSkillsCandidates];
  
  const filteredCandidates = allCandidates.filter(c => 
    !selectedCandidates.includes(c.id) && 
    c.name.toLowerCase().includes(candidateSearchQuery.toLowerCase())
  );

  const handleAddCandidate = (id: string) => {
    setSelectedCandidates([...selectedCandidates, id]);
    setCandidateSearchQuery('');
    setIsCandidateSearchOpen(false);
  };

  const handleRemoveCandidate = (id: string) => {
    setSelectedCandidates(selectedCandidates.filter(cId => cId !== id));
  };

  const handleDownloadResume = (candidateName: string) => {
    // Create a dummy text file for demonstration
    const element = document.createElement("a");
    const file = new Blob([`Resume content for ${candidateName}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${candidateName.replace(' ', '_')}_Resume.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  const CandidateCard = ({ candidate }: { candidate: Candidate }) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
    <Card className="hover:shadow-lg transition-all duration-300" noPadding>
      <div className="p-6 flex flex-col md:flex-row gap-6">
        {/* Left Section */}
        <div className="w-full md:w-[60%]">
          <div className="flex items-start gap-3 mb-4">
            <input 
              type="checkbox" 
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
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
                      <span key={idx} className={`px-2 py-0.5 bg-[#F3EFFF] text-[${THEME.components.typography.subheading}] text-xs font-medium rounded-md`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-4">
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
                {isChecked && (
                  <ConnectButton 
                    variant="outline"
                    className="mt-2 h-8 px-3 text-xs shadow-none hover:shadow-sm"
                    icon={<FiUserPlus size={14} />}
                    onClick={() => {}} // Add handler if needed
                  />
                )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[40%] flex flex-col items-center border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-6">
          <div className="w-24 h-24 rounded-full p-[2px] bg-gradient-to-br from-gradient-start to-gradient-end mb-3 relative">
            <div className="w-full h-full rounded-full bg-white p-[2px] overflow-hidden">
              <img src={candidate.image} alt={candidate.name} className="w-full h-full object-cover rounded-full" />
            </div>
            {candidate.isOnline && (
              <div className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
            )}
          </div>

          {/* <div className="text-center mb-4 w-full">
            <p className={`text-sm font-bold ${THEME.components.typography.sectionTitle} mb-0.5`}>{candidate.experience}</p>
            <p className={`text-xs ${THEME.components.typography.caption}`}>Total Experience</p>
          </div> */}

          <button className={`w-full px-4 py-2 border ${THEME.colors.border} rounded-lg text-sm font-medium ${THEME.components.typography.body} hover:bg-gray-50 transition-colors mb-3 flex items-center justify-center gap-2`}>
            <FiPhone size={14} />
            Show Contact
          </button>

          <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 text-[10px] font-medium text-green-600 mb-4">
            <span className="flex items-center gap-1">✓ Verified Phone</span>
            <span className="flex items-center gap-1">✓ Verified Email</span>
          </div>

          {/* <div className="flex gap-2 w-full">
            <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
              Review Later
            </button>
            <button className={`p-2 bg-gradient-to-r ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} text-white rounded-lg hover:opacity-90 transition-opacity`}>
              <FiMessageSquare size={18} />
            </button>
          </div> */}

          <div className="flex gap-2 w-full mt-3 justify-center">
             <button 
               className="p-2 bg-green-50 text-green-600 rounded-full hover:bg-green-100 transition-colors" 
               title="WhatsApp"
               onClick={() => candidate.phone && window.open(`https://wa.me/${candidate.phone}`, '_blank')}
             >
               <FaWhatsapp size={20} />
             </button>
             <button 
               className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors" 
               title="Email"
               onClick={() => candidate.email && (window.location.href = `mailto:${candidate.email}`)}
             >
               <FiMail size={20} />
             </button>
             <button 
               className="p-2 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-colors" 
               title="Message"
               onClick={() => candidate.phone && (window.location.href = `sms:${candidate.phone}`)}
             >
               <FiMessageCircle size={20} />
             </button>
          </div>
        </div>
      </div>
    </Card>
  );
  };

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
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`${THEME.components.typography.sectionTitle}`}>Filter Candidates</h3>
                <button 
                  className="md:hidden text-purple-600 font-medium text-sm"
                  onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                >
                  {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>
              
              <div className={`${isFilterExpanded ? 'block' : 'hidden'} md:block`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
                
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
                  <button className={`${THEME.components.button.ghost} px-6`}>
                    Reset
                  </button>
                  <button className={`${THEME.components.button.primary}`}>
                    Search Candidates
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 1: Nearby Candidates (Consolidated) */}
          {activeTab === 'find-candidates' && (
            <div className="space-y-8 mt-8">
              {/* Nearby Candidates Section */}
              <div className="space-y-6">
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

                {/* Nearby Candidates List */}
                <div className="space-y-4">
                  {nearbyCandidates.map(candidate => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              </div>

              {/* Ready To Join Candidates Section */}
              <div className="space-y-6 pt-8 border-t border-gray-200">
                <div className="mb-4">
                  <h2 className={`${THEME.components.typography.sectionTitle} text-2xl mb-2`}>Ready To Join Candidates</h2>
                  <p className={`${THEME.components.typography.body}`}>Candidates available for immediate joining</p>
                </div>
                <div className="space-y-4">
                  {readyToJoinCandidates.map(candidate => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              </div>

              {/* Same Skills Candidates Section */}
              <div className="space-y-6 pt-8 border-t border-gray-200">
                <div className="mb-4">
                  <h2 className={`${THEME.components.typography.sectionTitle} text-2xl mb-2`}>Candidates Having Same Skills</h2>
                  <p className={`${THEME.components.typography.body}`}>Candidates matching your required skill set</p>
                </div>
                <div className="space-y-4">
                  {sameSkillsCandidates.map(candidate => (
                    <CandidateCard key={candidate.id} candidate={candidate} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab === 'invites' && (
            <div className="space-y-8 mt-8">
              {/* Send Job Invites Section */}
              <Card noPadding>
                <div className="p-6">
                  <h2 className={`${THEME.components.typography.sectionTitle} text-xl mb-1`}>Send Job Invites</h2>
                  <p className={`${THEME.components.typography.body} mb-6`}>Invite candidates to apply for your job openings</p>
                  
                  <div className="space-y-4">


                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Select Candidates</label>
                      <div className="w-full px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent transition-all min-h-[46px] flex items-center gap-2">
                        <FiSearch className="text-gray-400 min-w-[16px]" size={18} />
                        <div className="flex flex-wrap gap-2 flex-1">
                          {selectedCandidates.map(id => {
                            const candidate = allCandidates.find(c => c.id === id);
                            return (
                              <span key={id} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                                {candidate?.name}
                                <button onClick={() => handleRemoveCandidate(id)} className="hover:text-purple-900">
                                  <FiX size={14} />
                                </button>
                              </span>
                            );
                          })}
                          <input 
                            type="text"
                            value={candidateSearchQuery}
                            onChange={(e) => {
                              setCandidateSearchQuery(e.target.value);
                              setIsCandidateSearchOpen(true);
                            }}
                            placeholder={selectedCandidates.length === 0 ? "Search candidates by name..." : ""}
                            className="flex-1 min-w-[120px] bg-transparent outline-none placeholder-gray-400 text-gray-900"
                          />
                        </div>
                      </div>

                      {isCandidateSearchOpen && candidateSearchQuery.trim().length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-y-auto z-10">
                          {filteredCandidates.length > 0 ? (
                            filteredCandidates.map(c => (
                              <button
                                key={c.id}
                                onClick={() => handleAddCandidate(c.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 transition-colors flex items-center gap-2"
                              >
                                <img src={c.image} alt="" className="w-6 h-6 rounded-full object-cover" />
                                <div>
                                  <p className="font-medium">{c.name}</p>
                                  <p className="text-xs text-gray-500">{c.title}</p>
                                </div>
                              </button>
                            ))
                          ) : (
                            <div className="px-4 py-3 text-sm text-gray-500 text-center">No candidates found</div>
                          )}
                        </div>
                      )}
                      {isCandidateSearchOpen && (
                        <div 
                          className="fixed inset-0 z-0" 
                          onClick={() => setIsCandidateSearchOpen(false)} 
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Job Position</label>
                      <input 
                        type="text" 
                        placeholder="e.g., Senior Frontend Developer"
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-gray-400 text-gray-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message (Optional)</label>
                      <textarea 
                        rows={4}
                        placeholder="Add a personalized message..."
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none placeholder-gray-400 text-gray-900"
                      />
                    </div>

                    <button className={`${THEME.components.button.primary} px-6`}>
                      Send Invite
                    </button>
                  </div>
                </div>
              </Card>

              {/* Sent Invites Section */}
              <div className="space-y-4">
                <h3 className={`${THEME.components.typography.sectionTitle} text-lg`}>Sent Invites</h3>
                {sentInvites.map((invite) => (
                  <Card key={invite.id} className="hover:shadow-md transition-shadow" noPadding>
                    <div className="p-4 flex items-center justify-between">
                      <div>
                        <h4 className={`${THEME.components.typography.cardTitle} text-base mb-0.5`}>{invite.name}</h4>
                        <p className={`${THEME.components.typography.body} text-sm`}>{invite.position}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-1 ${
                          invite.status === 'Accepted' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {invite.status}
                        </span>
                        <p className="text-xs text-gray-400">{invite.time}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              
              {/* Downloaded Resumes Section (Merged) */}
              <Card className="mt-8" noPadding>
                <div className="p-6 border-b border-gray-100">
                  <h2 className={`${THEME.components.typography.sectionTitle} text-2xl mb-1`}>Downloaded Resumes</h2>
                  <p className={`${THEME.components.typography.body}`}>View and manage downloaded candidate resumes</p>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        <th className={`p-4 text-sm font-semibold ${THEME.components.typography.subheading}`}>Candidate Name</th>
                        <th className={`p-4 text-sm font-semibold ${THEME.components.typography.subheading}`}>Position</th>
                        <th className={`p-4 text-sm font-semibold ${THEME.components.typography.subheading}`}>Downloaded On</th>
                        <th className={`p-4 text-sm font-semibold ${THEME.components.typography.subheading}`}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {downloadedResumes.map((resume) => (
                        <tr key={resume.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className={`p-4 text-sm font-medium ${THEME.components.typography.cardTitle}`}>{resume.name}</td>
                          <td className={`p-4 text-sm ${THEME.components.typography.body}`}>{resume.position}</td>
                          <td className={`p-4 text-sm ${THEME.components.typography.body}`}>{resume.downloadedOn}</td>
                          <td className="p-4">
                            <button 
                              onClick={() => handleDownloadResume(resume.name)}
                              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 text-sm font-medium transition-colors"
                            >
                              <FiDownload size={16} />
                              Download Again
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'manage-jobs' && (
            <div className="mt-8">
              <ManageJobsContent />
            </div>
          )}




        </div>
      </div>
    </ProfileLayout>
  );
}
