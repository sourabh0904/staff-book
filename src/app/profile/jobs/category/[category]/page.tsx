"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiBookmark,
  FiCalendar,
  FiChevronRight,
  FiArrowLeft,
  FiNavigation,
  FiEye,
  FiFilter,
  FiX,
  FiSearch,
  FiUserPlus,
} from "react-icons/fi";
import { THEME } from "@/styles/theme";
import Button from "@/components/shared/Button";
import ConnectButton from "@/components/shared/ConnectButton";

// Add custom styles for scrollbar
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .scrollbar-thin::-webkit-scrollbar {
      width: 8px;
    }
    .scrollbar-thin::-webkit-scrollbar-track {
      background: #f1f1f1;
      border-radius: 10px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb {
      background: #cbd5e0;
      border-radius: 10px;
    }
    .scrollbar-thin::-webkit-scrollbar-thumb:hover {
      background: #a0aec0;
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fadeIn {
      animation: fadeIn 0.2s ease-out;
    }
  `;
  if (!document.head.querySelector('#custom-scrollbar-styles')) {
    style.id = 'custom-scrollbar-styles';
    document.head.appendChild(style);
  }
}

// Mock job data
const allJobs = [
  {
    id: "p1",
    company: "Google",
    position: "UI/UX Designer",
    location: "Bangalore, IN",
    salary: "20L-25L p.a",
    type: "Full-time",
    workMode: "Work from office",
    experienceLevel: "Both",
    distance: 2.3,
    posterName: "Rajeev Tripathi",
    posterImage: "/homePage/profile.png",
    posterDesignation: "HR Manager",
    isOnline: true,
    lastActive: "2h ago",
    postedDate: "2 days ago",
    skills: ["Figma", "Adobe XD", "UI Design"],
    industry: "Technology",
  },
  {
    id: "p2",
    company: "Microsoft",
    position: "Frontend Developer",
    location: "Mumbai, IN",
    salary: "18L-22L p.a",
    type: "Full-time",
    workMode: "Hybrid",
    experienceLevel: "Both",
    distance: 5.7,
    posterName: "Priya Sharma",
    posterImage: "/homePage/profile.png",
    posterDesignation: "Tech Recruiter",
    isOnline: false,
    lastActive: "5h ago",
    postedDate: "1 day ago",
    skills: ["React", "TypeScript", "JavaScript"],
    industry: "Technology",
  },
  {
    id: "p3",
    company: "Amazon",
    position: "Full Stack Engineer",
    location: "Hyderabad, IN",
    salary: "22L-28L p.a",
    type: "Full-time",
    workMode: "Remote",
    experienceLevel: "Both",
    distance: 8.1,
    posterName: "Amit Kumar",
    posterImage: "/homePage/profile.png",
    posterDesignation: "Senior Recruiter",
    isOnline: true,
    lastActive: "1h ago",
    postedDate: "3 days ago",
    skills: ["Node.js", "React", "AWS"],
    industry: "E-commerce",
  },
  {
    id: "p4",
    company: "Flipkart",
    position: "Backend Developer",
    location: "Bangalore, IN",
    salary: "16L-20L p.a",
    type: "Full-time",
    workMode: "Work from office",
    experienceLevel: "Experienced",
    distance: 3.5,
    posterName: "Sneha Reddy",
    posterImage: "/homePage/profile.png",
    posterDesignation: "HR Lead",
    isOnline: true,
    lastActive: "30m ago",
    postedDate: "1 day ago",
    skills: ["Java", "Spring Boot", "MySQL"],
    industry: "E-commerce",
  },
  {
    id: "p5",
    company: "Infosys",
    position: "DevOps Engineer",
    location: "Pune, IN",
    salary: "14L-18L p.a",
    type: "Full-time",
    workMode: "Hybrid",
    experienceLevel: "Both",
    distance: 12.3,
    posterName: "Rajesh Kumar",
    posterImage: "/homePage/profile.png",
    posterDesignation: "Talent Acquisition",
    isOnline: false,
    lastActive: "1d ago",
    postedDate: "4 days ago",
    skills: ["Docker", "Kubernetes", "AWS"],
    industry: "IT Services",
  },
  {
    id: "p6",
    company: "TCS",
    position: "Data Scientist",
    location: "Chennai, IN",
    salary: "15L-20L p.a",
    type: "Full-time",
    workMode: "Work from office",
    experienceLevel: "Experienced",
    distance: 15.8,
    posterName: "Meera Iyer",
    posterImage: "/homePage/profile.png",
    posterDesignation: "Recruitment Manager",
    isOnline: true,
    lastActive: "3h ago",
    postedDate: "2 days ago",
    skills: ["Python", "Machine Learning", "TensorFlow"],
    industry: "IT Services",
  },
];

const categoryTitles: Record<string, string> = {
  recommended: "Recommended Jobs",
  "skills-match": "Jobs Matching Your Skills",
  recent: "Recently Posted Jobs",
};

export default function JobCategoryPage() {
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const categoryTitle = categoryTitles[category] || "Jobs";

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
  const [selectedWorkMode, setSelectedWorkMode] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);
  const [selectedIndustry, setSelectedIndustry] = useState<string[]>([]);
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 50]);
  const [radiusValue, setRadiusValue] = useState(10);
  const [experienceYears, setExperienceYears] = useState(10);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // Accordion state - only one section open at a time
  const [openSection, setOpenSection] = useState<string | null>("radius");

  // Filter options
  const locations = ["Bangalore", "Mumbai", "Hyderabad", "Pune", "Chennai"];
  const workModes = ["Work from office", "Hybrid", "Remote"];
  const experienceLevels = ["Fresher", "Experienced", "Both"];
  const industries = ["Technology", "E-commerce", "IT Services", "Finance"];
  const departments = [
    { name: "Design", count: 123 },
    { name: "IT", count: 234 },
    { name: "Finance", count: 345 },
    { name: "Sales", count: 456 },
  ];

  // Apply filters
  const filteredJobs = allJobs.filter((job) => {
    const matchesSearch =
      searchQuery === "" ||
      job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesLocation =
      selectedLocation.length === 0 ||
      selectedLocation.some((loc) => job.location.includes(loc));

    const matchesWorkMode =
      selectedWorkMode.length === 0 ||
      selectedWorkMode.includes(job.workMode);

    const matchesExperience =
      selectedExperience.length === 0 ||
      selectedExperience.includes(job.experienceLevel);

    const matchesIndustry =
      selectedIndustry.length === 0 ||
      selectedIndustry.includes(job.industry);

    return (
      matchesSearch &&
      matchesLocation &&
      matchesWorkMode &&
      matchesExperience &&
      matchesIndustry
    );
  });

  const toggleFilter = (
    value: string,
    selected: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (selected.includes(value)) {
      setter(selected.filter((item) => item !== value));
    } else {
      setter([...selected, value]);
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedLocation([]);
    setSelectedWorkMode([]);
    setSelectedExperience([]);
    setSelectedIndustry([]);
    setSelectedDepartments([]);
    setSalaryRange([0, 50]);
    setRadiusValue(10);
    setExperienceYears(10);
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const removeFilter = (type: string, value: string) => {
    switch (type) {
      case "location":
        setSelectedLocation(selectedLocation.filter((item) => item !== value));
        break;
      case "industry":
        setSelectedIndustry(selectedIndustry.filter((item) => item !== value));
        break;
      case "department":
        setSelectedDepartments(selectedDepartments.filter((item) => item !== value));
        break;
    }
  };

  const activeFiltersCount =
    selectedLocation.length +
    selectedWorkMode.length +
    selectedExperience.length +
    selectedIndustry.length +
    selectedDepartments.length;

  // Get all active filters for display
  const activeFilters = [
    ...selectedLocation.map((loc) => ({ type: "location", value: loc, label: loc })),
    ...selectedIndustry.map((ind) => ({ type: "industry", value: ind, label: ind })),
    ...selectedDepartments.map((dep) => ({ type: "department", value: dep, label: dep })),
  ];

  return (
    <div className="min-h-screen w-full bg-[#F7F7F8]">
      <div className="max-w-7xl mx-auto pt-[80px] px-4 sm:px-6 lg:px-8">
        <div className="flex gap-6 w-full">
        {/* Left Sidebar - 20% width to match main page */}
        <div className="w-[20%] flex-shrink-0 hidden lg:block">
          {/* Filters Sidebar */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-[#E8E4FF] sticky top-6 max-h-[calc(100vh-100px)] overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-[#222]">Jobs Near You</h3>
                <Button className="p-2 bg-primary rounded-lg w-auto h-auto">
                  <FiMapPin size={18} className="text-white" />
                </Button>
              </div>

              {/* Map Placeholder */}
              <div className={`mb-6 h-32 bg-gradient-to-br ${THEME.colors.gradient.sky} rounded-xl relative overflow-hidden`}>
                <div className="absolute inset-0 opacity-30">
                  <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path d="M0,50 Q50,30 100,50 T200,50" fill="none" stroke="white" strokeWidth="2"/>
                    <circle cx="50" cy="40" r="3" fill="white"/>
                    <circle cx="100" cy="50" r="3" fill="white"/>
                    <circle cx="150" cy="45" r="3" fill="white"/>
                  </svg>
                </div>
              </div>

              {/* Active Filters Display */}
              {activeFilters.length > 0 && (
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-[#222]">
                      Active Filters ({activeFilters.length})
                    </h4>
                    <Button
                      variant="ghost"
                      onClick={clearAllFilters}
                      className="text-xs text-primary hover:underline font-semibold p-0 h-auto hover:bg-transparent"
                    >
                      Reset All
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeFilters.map((filter, index) => (
                      <div
                        key={`${filter.type}-${index}`}
                        className="group bg-light-bg text-primary px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 hover:bg-[#E5E3FF] transition-colors"
                      >
                        <span>{filter.label}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFilter(filter.type, filter.value)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity w-auto h-auto p-0 hover:bg-transparent"
                        >
                          <FiX size={14} />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Radius Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("radius")}
                  className="w-full flex items-center justify-between mb-3 hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Radius
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "radius" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
                {openSection === "radius" && (
                  <div className="animate-fadeIn">
                    <div className="text-center mb-2">
                      <span className="text-lg font-bold text-primary">
                        {radiusValue} km
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={radiusValue}
                      onChange={(e) => setRadiusValue(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5B5BE7]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0 km</span>
                      <span>100 km</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Experience Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("experience")}
                  className="w-full flex items-center justify-between mb-3 hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Experience
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "experience" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
                {openSection === "experience" && (
                  <div className="animate-fadeIn">
                    <div className="text-center mb-2">
                      <span className="text-lg font-bold text-primary">
                        {experienceYears} yrs
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#5B5BE7]"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0 yrs</span>
                      <span>30 yrs</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Departments Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("departments")}
                  className="w-full flex items-center justify-between mb-3 hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Departments
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "departments" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
                {openSection === "departments" && (
                  <div className="space-y-2 animate-fadeIn">
                    {departments.map((dept) => (
                      <label
                        key={dept.name}
                        className="flex items-center gap-2 cursor-pointer hover:bg-light-bg p-1 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedDepartments.includes(dept.name)}
                          onChange={() =>
                            toggleFilter(
                              dept.name,
                              selectedDepartments,
                              setSelectedDepartments
                            )
                          }
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-[#444]">
                          {dept.name} ({dept.count})
                        </span>
                      </label>
                    ))}
                    <Button variant="ghost" className="text-sm text-primary font-semibold mt-2 p-0 hover:bg-transparent h-auto">
                      See All
                    </Button>
                  </div>
                )}
              </div>

              {/* Location Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("location")}
                  className="w-full flex items-center justify-between mb-3 hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Location
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "location" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
                {openSection === "location" && (
                  <div className="space-y-2 animate-fadeIn">
                    {locations.map((location) => (
                      <label
                        key={location}
                        className="flex items-center gap-2 cursor-pointer hover:bg-light-bg p-1 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedLocation.includes(location)}
                          onChange={() =>
                            toggleFilter(
                              location,
                              selectedLocation,
                              setSelectedLocation
                            )
                          }
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-[#444]">{location}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Salary Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("salary")}
                  className="w-full flex items-center justify-between hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Salary
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "salary" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
              </div>

              {/* Company Type Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("companyType")}
                  className="w-full flex items-center justify-between hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Company Type
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "companyType" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
              </div>

              {/* Role/Category Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("role")}
                  className="w-full flex items-center justify-between hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Role/ Category
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "role" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
              </div>

              {/* Salary/Stipend Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("stipend")}
                  className="w-full flex items-center justify-between hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Salary/ Stipend
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "stipend" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
              </div>

              {/* Duration Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("duration")}
                  className="w-full flex items-center justify-between hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Duration
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "duration" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
              </div>

              {/* Education Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("education")}
                  className="w-full flex items-center justify-between hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Education
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "education" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
              </div>

              {/* Posted By Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("postedBy")}
                  className="w-full flex items-center justify-between hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Posted By
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "postedBy" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
              </div>

              {/* Industries Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("industries")}
                  className="w-full flex items-center justify-between mb-3 hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Industries
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "industries" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
                {openSection === "industries" && (
                  <div className="space-y-2 animate-fadeIn">
                    {industries.map((industry) => (
                      <label
                        key={industry}
                        className="flex items-center gap-2 cursor-pointer hover:bg-light-bg p-1 rounded transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={selectedIndustry.includes(industry)}
                          onChange={() =>
                            toggleFilter(
                              industry,
                              selectedIndustry,
                              setSelectedIndustry
                            )
                          }
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <span className="text-sm text-[#444]">{industry}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Top Companies Filter */}
              <div className="mb-4 pb-4 border-b border-gray-200">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("topCompanies")}
                  className="w-full flex items-center justify-between hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Top Companies
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "topCompanies" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
              </div>

              {/* Freshness Filter */}
              <div className="mb-4">
                <Button
                  variant="ghost"
                  onClick={() => toggleSection("freshness")}
                  className="w-full flex items-center justify-between hover:text-primary transition-colors p-0 hover:bg-transparent"
                >
                  <label className="text-sm font-semibold text-[#222] cursor-pointer">
                    Freshness
                  </label>
                  <FiChevronRight
                    className={`text-gray-400 transition-transform ${
                      openSection === "freshness" ? "rotate-90" : ""
                    }`}
                    size={16}
                  />
                </Button>
              </div>
            </div>
        </div>

        {/* Main Content Area - 80% width to match main page */}
        <div className="w-[80%] flex-1">
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm mb-6" aria-label="Breadcrumb">
            <Link
              href="/profile/jobs?tab=browse"
              className="flex items-center text-[#666] hover:text-primary transition-colors"
            >
              <FiArrowLeft className="mr-2" size={16} />
              Back to Jobs
            </Link>
            <FiChevronRight className="mx-2 text-gray-400" size={14} />
            <span className="text-[#222] font-medium">{categoryTitle}</span>
          </nav>

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#222] mb-2">
                {categoryTitle}
              </h1>
              <p className="text-[#666]">
                {filteredJobs.length} jobs found
              </p>
            </div>
          </div>

          {/* Job Cards Grid */}
          <div className="flex-1">
            {filteredJobs.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-[#E8E4FF]">
                <FiBriefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-[#222] mb-2">
                  No jobs found
                </h3>
                <p className="text-[#666] mb-4">
                  Try adjusting your filters to see more results
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="px-6 py-2 bg-gradient-to-r from-gradient-start to-gradient-end text-white font-semibold rounded-lg"
                >
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-white rounded-[1.25rem] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <Link
                      href={`/profile/jobs/${job.id}`}
                      className="block relative group/card"
                    >
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none">
                        <div className="bg-white px-6 py-3 rounded-full flex items-center gap-2 transform scale-90 group-hover/card:scale-100 transition-transform duration-300">
                          <FiEye size={18} className="text-primary" />
                          <span className="text-primary font-bold">
                            View Details
                          </span>
                        </div>
                      </div>

                      <div className="p-4 pb-3 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gradient-start to-gradient-end p-[2px]">
                              <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                <img
                                  src={job.posterImage}
                                  alt={job.posterName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            </div>
                            {job.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                            )}
                          </div>

                          <div className="flex-1">
                            <h3 className="text-base font-bold text-[#222] leading-tight">
                              {job.posterName}
                            </h3>
                            <div className="flex items-center gap-1 text-xs text-purple-600">
                              <FiNavigation size={12} />
                              <span>{job.distance.toFixed(1)} km away</span>
                            </div>
                          </div>
                        </div>

                        <div
                          className="flex items-center justify-between w-full relative z-20"
                          onClick={(e) => e.preventDefault()}
                        >
                          <ConnectButton 
                            variant="outline"
                            className="!px-3 !py-1 text-xs h-9 shadow-none hover:shadow-sm"
                            icon={<FiUserPlus size={14} />}
                            label="Connect"
                          />

                          <button
                            className="w-9 h-9 rounded-lg bg-light-bg hover:bg-[#E5E3FF] flex items-center justify-center transition-colors group/meet relative"
                            title={`Schedule a meet with ${job.posterName}`}
                          >
                            <FiCalendar size={16} className="text-black" />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/meet:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Schedule a meet with {job.posterName}
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="px-4 pb-3">
                        <div className="w-full h-20 bg-gradient-to-br from-light-bg to-light-bg rounded-lg flex items-center justify-center">
                          <div className="text-3xl font-bold bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-transparent">
                            {job.company.charAt(0)}
                          </div>
                        </div>
                      </div>

                      <div className="px-4 pb-4">
                        <div className="mb-2">
                          <h4 className="text-lg font-bold text-[#222] mb-1">
                            {job.position}
                          </h4>
                          <p className="text-sm text-[#666]">{job.company}</p>
                        </div>

                        <div className="space-y-2 mt-4 text-sm text-[#666]">
                          <div className="flex items-center gap-2">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                            >
                              <path
                                d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z"
                                stroke="#999"
                                strokeWidth="1.5"
                              />
                              <path
                                d="M8 4V8L10.5 9.5"
                                stroke="#999"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                            <span>{job.workMode}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <FiBriefcase size={14} className="text-[#999]" />
                            <span>{job.experienceLevel}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <FiMapPin size={14} className="text-[#999]" />
                            <span>{job.location}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <FiDollarSign size={14} className="text-[#999]" />
                            <span className="font-semibold text-[#222]">
                              {job.salary}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="px-4 pb-4 flex items-center gap-2 relative z-20">
                      <button
                        className="w-9 h-9 flex items-center justify-center bg-light-bg hover:bg-[#E5E3FF] rounded-lg transition-colors group/save relative"
                        title="Save the job"
                      >
                        <FiBookmark size={16} className="text-black" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/save:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                          Save the job
                        </span>
                      </button>
                      <button className={`${THEME.components.button.primary} flex-1`}>
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
