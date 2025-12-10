"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import JobInviteCard from '@/components/shared/JobInviteCard';
import {
  FiBriefcase,
  FiClock,
  FiMapPin,
  FiDollarSign,
  FiTrendingUp,
  FiBookmark,
  FiEye,
  FiFilter,
  FiSearch,
  FiCalendar,
  FiUsers,
  FiTarget,
  FiStar,
  FiExternalLink,
  FiChevronRight,
  FiNavigation,
  FiMessageCircle,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import { useSearchParams } from "next/navigation";
import JobsContent from "./JobsContent";
import ProfileSubMenu from "@/components/shared/ProfileSubMenu";
import ProfileLayout from "@/components/shared/ProfileLayout";
import Card from "@/components/shared/Card";
import { THEME } from "@/styles/theme";


const menuItems = [
  { icon: <FiSearch size={18} />, label: 'Find Jobs', key: 'browse' },
  { icon: <FiBriefcase size={18} />, label: 'Job Invites', key: 'applications' },
];

const inputLabels = [
  'Job Title/ Role',
  'Skills',
  'Experience',
  'Company',
  'Location',
  'Date Posted',
]; 

interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: "applied" | "interviewing" | "offered" | "rejected";
  appliedDate: string;
  salary: string;
  location: string;
  logo: string;
}

interface JobRecommendation {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  type: string;
  postedDate: string;
  matchScore: number;
  skills: string[];
  logo: string;
  distance?: number; // Distance in kilometers for location-based features
}

// Add Employer/Applicant types
interface EmployerPosting {
  id: string;
  company: string;
  position: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  posterName?: string;
  posterImage?: string;
  posterDesignation?: string;
  isOnline?: boolean;
  lastActive?: string;
  companyLogo?: string;
  workMode?: string; // "Remote", "Office", "Hybrid"
  experienceLevel?: string; // "Both", "Fresher", "Experienced"
  distance?: number; // Distance in kilometers
}

interface ApplicantProfile {
  id: string;
  name: string;
  position: string;
  email: string;
  resumeId: string;
}

interface MeetingItem {
  id: string;
  candidateId: string;
  candidateName: string;
  datetime: string; // ISO datetime
  notes?: string;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "applied":
      return "bg-blue-100 text-blue-600";
    case "interviewing":
      return "bg-yellow-100 text-yellow-600";
    case "offered":
      return "bg-green-100 text-green-600";
    case "rejected":
      return "bg-red-100 text-red-600";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getMatchScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600 bg-green-100";
  if (score >= 80) return "text-yellow-600 bg-yellow-100";
  return "text-red-600 bg-red-100";
};

export default function JobManagement() {
  return (
    <Suspense fallback={
      <div className={`profile-page min-h-screen ${THEME.colors.background.page} pt-4 md:pt-6 lg:pt-8 mt-[50px]`}>
        <div className="flex gap-6 w-full">
          <div className="w-[20%] flex-shrink-0 -mt-[50px] sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
            <ProfileSidebar />
          </div>
          <div className="w-[80%] flex-1 m-4">
            <div className="flex items-center justify-center h-64">
              <div className={`animate-spin rounded-full h-8 w-8 border-b-2 border-[${THEME.colors.primary}]`}></div>
              <span className={`${THEME.components.typography.body} ml-3`}>Loading jobs...</span>
            </div>
          </div>
        </div>
      </div>
    }>
      <JobManagementContent />
    </Suspense>
  );
}

// Component that uses useSearchParams
function JobManagementContent() {
  const { user } = useAuth();
  const searchParams = useSearchParams();

  // Dual-view mode: seeker vs employer
  const [mode, setMode] = useState<"seeker" | "employer">("seeker");

  // Update mode based on URL params
  useEffect(() => {
    const modeParam = searchParams.get("mode");
    if (modeParam === "employer" || modeParam === "seeker") {
      setMode(modeParam);
    }
  }, [searchParams]);

  // Seeker tabs (extended)
  const [activeTab, setActiveTab] = useState<
    "applications" | "recommendations" | "saved" | "meetings" | "browse"
  >(
    searchParams.get("tab") as "applications" | "recommendations" | "saved" | "meetings" | "browse" || "browse"
  );

  // Update activeTab when URL changes
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab as "applications" | "recommendations" | "saved" | "meetings" | "browse");
    }
  }, [searchParams]);

  // Location-based job discovery state
  const [locationFilter, setLocationFilter] = useState("");
  const [distanceFilter, setDistanceFilter] = useState("10");
  const [showMap, setShowMap] = useState(false);
  const [mapView, setMapView] = useState<"map" | "list">("map");
  const [selectedJob, setSelectedJob] = useState<JobRecommendation | null>(
    null
  );
  const [nearbyJobs, setNearbyJobs] = useState<JobRecommendation[]>([]);

  // Applications state
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: "1",
      company: "TechCorp",
      position: "Senior Frontend Developer",
      status: "interviewing",
      appliedDate: "2024-01-15",
      salary: "₹12-18 LPA",
      location: "Bangalore",
      logo: "TC",
    },
    {
      id: "2",
      company: "InnovateLabs",
      position: "React Developer",
      status: "applied",
      appliedDate: "2024-01-12",
      salary: "₹8-12 LPA",
      location: "Mumbai",
      logo: "IL",
    },
    {
      id: "3",
      company: "StartupXYZ",
      position: "Full Stack Engineer",
      status: "offered",
      appliedDate: "2024-01-08",
      salary: "₹15-20 LPA",
      location: "Hyderabad",
      logo: "SX",
    },
  ]);

  // Saved jobs
  const [savedJobs, setSavedJobs] = useState<JobRecommendation[]>([]);

  // Recommendations
  const recommendations: JobRecommendation[] = [
    {
      id: "1",
      company: "Microsoft",
      position: "Software Engineer II",
      location: "Bangalore",
      salary: "₹25-35 LPA",
      type: "Full-time",
      postedDate: "2 days ago",
      matchScore: 95,
      skills: ["React", "TypeScript", "Node.js"],
      logo: "MS",
      distance: 5.2,
    },
    {
      id: "2",
      company: "Google",
      position: "Frontend Developer",
      location: "Gurgaon",
      salary: "₹30-40 LPA",
      type: "Full-time",
      postedDate: "1 day ago",
      matchScore: 92,
      skills: ["JavaScript", "React", "CSS"],
      logo: "GO",
      distance: 12.8,
    },
    {
      id: "3",
      company: "Amazon",
      position: "UI/UX Engineer",
      location: "Bangalore",
      salary: "₹20-28 LPA",
      type: "Full-time",
      postedDate: "3 days ago",
      matchScore: 88,
      skills: ["React", "Design Systems", "Figma"],
      logo: "AM",
      distance: 8.1,
    },
  ];

  // Location-based job search functionality
  const handleLocationSearch = () => {
    // Simulate location-based job search
    const mockNearbyJobs: JobRecommendation[] = [
      {
        id: "nearby1",
        company: "TechStart",
        position: "React Developer",
        location: "Koramangala, Bangalore",
        salary: "₹15-22 LPA",
        type: "Full-time",
        postedDate: "1 day ago",
        matchScore: 89,
        skills: ["React", "JavaScript", "CSS"],
        logo: "TS",
        distance: 2.3,
      },
      {
        id: "nearby2",
        company: "InnovateCorp",
        position: "Frontend Engineer",
        location: "Whitefield, Bangalore",
        salary: "₹18-25 LPA",
        type: "Full-time",
        postedDate: "3 days ago",
        matchScore: 85,
        skills: ["Vue.js", "TypeScript", "SCSS"],
        logo: "IC",
        distance: 7.5,
      },
      {
        id: "nearby3",
        company: "StartupHub",
        position: "Full Stack Developer",
        location: "Electronic City, Bangalore",
        salary: "₹12-18 LPA",
        type: "Full-time",
        postedDate: "2 days ago",
        matchScore: 82,
        skills: ["React", "Node.js", "MongoDB"],
        logo: "SH",
        distance: 4.8,
      },
      {
        id: "nearby4",
        company: "DevCorp",
        position: "UI Developer",
        location: "HSR Layout, Bangalore",
        salary: "₹14-20 LPA",
        type: "Full-time",
        postedDate: "4 days ago",
        matchScore: 87,
        skills: ["React", "Tailwind", "Figma"],
        logo: "DC",
        distance: 3.2,
      },
      {
        id: "nearby5",
        company: "TechSolutions",
        position: "Frontend Specialist",
        location: "Indiranagar, Bangalore",
        salary: "₹16-24 LPA",
        type: "Full-time",
        postedDate: "1 day ago",
        matchScore: 91,
        skills: ["React", "Redux", "GraphQL"],
        logo: "TS",
        distance: 6.1,
      },
    ];

    // Filter by distance
    const filteredJobs = mockNearbyJobs.filter(
      (job) => job.distance! <= parseInt(distanceFilter)
    );

    // Sort by distance
    const sortedJobs = filteredJobs.sort((a, b) => a.distance! - b.distance!);

    setNearbyJobs(sortedJobs);
    setShowMap(true);
  };

  const applyFromRecommendation = (job: JobRecommendation) => {
    // Simulate applying to a job from recommendations
    const newApplication: JobApplication = {
      id: `app_${Date.now()}`,
      company: job.company,
      position: job.position,
      status: "applied",
      appliedDate: new Date().toISOString().split("T")[0],
      salary: job.salary,
      location: job.location,
      logo: job.logo,
    };

    setApplications((prev) => [newApplication, ...prev]);
    setSelectedJob(null);

    // Show success message (you can implement a toast notification here)
    alert(`Successfully applied to ${job.position} at ${job.company}!`);
  };

  // Employer: job postings
  const [postings, setPostings] = useState<EmployerPosting[]>([
    {
      id: "p1",
      company: "Google",
      position: "UI/UX Designer",
      location: "Bangalore, IN",
      salary: "20L-25L p.a",
      type: "Full-time",
      description: "React/TypeScript developer to build UI components.",
      posterName: "Rajeev Tripathi",
      posterImage: "/homePage/profile.png",
      posterDesignation: "HR Manager",
      isOnline: true,
      lastActive: "2h ago",
      companyLogo: "/companies/google.png",
      workMode: "Work from office",
      experienceLevel: "Both",
      distance: 2.3,
    },
    {
      id: "p2",
      company: "Microsoft",
      position: "Frontend Developer",
      location: "Mumbai, IN",
      salary: "18L-22L p.a",
      type: "Full-time",
      description: "Design systems and component libraries.",
      posterName: "Priya Sharma",
      posterImage: "/homePage/profile.png",
      posterDesignation: "Tech Recruiter",
      isOnline: false,
      lastActive: "5h ago",
      companyLogo: "/companies/microsoft.png",
      workMode: "Hybrid",
      experienceLevel: "Both",
      distance: 5.7,
    },
    {
      id: "p3",
      company: "Amazon",
      position: "Full Stack Engineer",
      location: "Hyderabad, IN",
      salary: "22L-28L p.a",
      type: "Full-time",
      description: "Build scalable web applications using modern tech stack.",
      posterName: "Amit Kumar",
      posterImage: "/homePage/profile.png",
      posterDesignation: "Senior Recruiter",
      isOnline: true,
      lastActive: "1h ago",
      companyLogo: "/companies/amazon.png",
      workMode: "Remote",
      experienceLevel: "Both",
      distance: 8.1,
    },
  ]);

  const [newPosting, setNewPosting] = useState<EmployerPosting>({
    id: "",
    company: "",
    position: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: "",
  });
  const [editingPostingIndex, setEditingPostingIndex] = useState<number | null>(
    null
  );

  const handleSavePosting = () => {
    if (!newPosting.company || !newPosting.position) return;
    if (editingPostingIndex !== null) {
      const next = postings.slice();
      next[editingPostingIndex] = {
        ...newPosting,
        id: next[editingPostingIndex].id,
      };
      setPostings(next);
      setEditingPostingIndex(null);
    } else {
      const id = "p" + (postings.length + 1);
      setPostings([...postings, { ...newPosting, id }]);
    }
    setNewPosting({
      id: "",
      company: "",
      position: "",
      location: "",
      salary: "",
      type: "Full-time",
      description: "",
    });
  };

  const handleEditPosting = (idx: number) => {
    setEditingPostingIndex(idx);
    setNewPosting(postings[idx]);
  };

  const handleDeletePosting = (idx: number) => {
    const next = postings.slice();
    next.splice(idx, 1);
    setPostings(next);
    if (editingPostingIndex === idx) {
      setEditingPostingIndex(null);
      setNewPosting({
        id: "",
        company: "",
        position: "",
        location: "",
        salary: "",
        type: "Full-time",
        description: "",
      });
    }
  };

  // Employer: applicants & meetings
  const [applicants] = useState<ApplicantProfile[]>([
    {
      id: "c1",
      name: "Riya Gopi",
      position: "Frontend Developer",
      email: "riya@example.com",
      resumeId: "c1-resume",
    },
    {
      id: "c2",
      name: "Arun Verma",
      position: "Full Stack Engineer",
      email: "arun@example.com",
      resumeId: "c2-resume",
    },
    {
      id: "c3",
      name: "Neha Shah",
      position: "UI/UX Engineer",
      email: "neha@example.com",
      resumeId: "c3-resume",
    },
  ]);

  const [meetings, setMeetings] = useState<MeetingItem[]>([
    {
      id: "m1",
      candidateId: "c1",
      candidateName: "Riya Gopi",
      datetime: new Date().toISOString(),
      notes: "Initial screening",
    },
  ]);

  const [scheduleForm, setScheduleForm] = useState<{
    candidateId: string;
    datetime: string;
    notes: string;
  }>({ candidateId: "", datetime: "", notes: "" });
  const handleSchedule = () => {
    if (!scheduleForm.candidateId || !scheduleForm.datetime) return;
    const candidate = applicants.find((a) => a.id === scheduleForm.candidateId);
    if (!candidate) return;
    const m: MeetingItem = {
      id: "m" + (meetings.length + 1),
      candidateId: candidate.id,
      candidateName: candidate.name,
      datetime: scheduleForm.datetime,
      notes: scheduleForm.notes,
    };
    setMeetings([...meetings, m]);
    setScheduleForm({ candidateId: "", datetime: "", notes: "" });
  };

  // Secure resume download
  const handleDownloadResume = async (
    resumeId: string,
    candidateName: string
  ) => {
    try {
      const res = await fetch(`/api/resume/${encodeURIComponent(resumeId)}`, {
        headers: { "x-user-email": user?.email ?? "" },
      });
      if (!res.ok) {
        alert("Unauthorized or file not found");
        return;
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${candidateName}-resume.svg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert("Failed to download resume");
    }
  };

  // Seeker actions
  const applyToPosting = (posting: EmployerPosting) => {
    const newApp: JobApplication = {
      id: "a" + (applications.length + 1),
      company: posting.company,
      position: posting.position,
      status: "applied",
      appliedDate: new Date().toISOString().slice(0, 10),
      salary: posting.salary,
      location: posting.location,
      logo: posting.company.slice(0, 2).toUpperCase(),
    };
    setApplications([newApp, ...applications]);
    setActiveTab("applications");
  };
  const saveJob = (job: JobRecommendation) => {
    setSavedJobs((prev) =>
      prev.find((j) => j.id === job.id) ? prev : [job, ...prev]
    );
  };

  const removeSavedJob = (id: string) =>
    setSavedJobs((prev) => prev.filter((j) => j.id !== id));

  const handleSaveApplication = (app: JobApplication) => {
    // Convert JobApplication to JobRecommendation format for savedJobs
    const jobToSave: JobRecommendation = {
      id: app.id,
      company: app.company,
      position: app.position,
      location: app.location,
      salary: app.salary,
      type: "Full-time", // Default
      postedDate: "Recently", // Default
      matchScore: 0, // Default
      skills: [], // Default
      logo: app.logo,
      distance: 0, // Default
    };

    setSavedJobs((prev) => [jobToSave, ...prev]);
    setApplications((prev) => prev.filter((a) => a.id !== app.id));
  };

  // Seeker meetings management
  const [seekerMeetings, setSeekerMeetings] = useState<
    { id: string; datetime: string; with: string; notes?: string }[]
  >([
    {
      id: "sm1",
      datetime: new Date().toISOString(),
      with: "TechCorp HR",
      notes: "Portfolio discussion",
    },
  ]);
  const [seekerMeetingForm, setSeekerMeetingForm] = useState<{
    datetime: string;
    with: string;
    notes: string;
  }>({ datetime: "", with: "", notes: "" });
  const addSeekerMeeting = () => {
    if (!seekerMeetingForm.datetime || !seekerMeetingForm.with) return;
    const m = { id: "sm" + (seekerMeetings.length + 1), ...seekerMeetingForm };
    setSeekerMeetings([...seekerMeetings, m]);
    setSeekerMeetingForm({ datetime: "", with: "", notes: "" });
  };

  // Scroll to Schedule Meeting section when URL has specific parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get("tab");
    const modeParam = urlParams.get("mode");
    
    if (tab === "meetings" && modeParam === "employer") {
      // Wait for the DOM to be fully rendered
      setTimeout(() => {
        const scheduleMeetingSection = document.getElementById("schedule-meeting");
        if (scheduleMeetingSection) {
          scheduleMeetingSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); // Increased timeout to ensure DOM is ready
    }
  }, [activeTab, mode]);

  return (
    <ProfileLayout showSidebar={true} showStories={false} showJobSearchBar={false}>
    <div className={`profile-page min-h-screen ${THEME.colors.background.page} pt-4 md:pt-6 lg:pt-8 -mt-[30px]`}>
      <div className="flex gap-6 w-full px-6">
        <div className="w-[80%] flex-1">
        {/* Enhanced Breadcrumb */}
        {/* Enhanced Breadcrumb */}
        {/* <Card className="mb-6 p-4 shadow-sm border border-gray-100" noPadding>
          <nav
            className="flex items-center text-sm font-medium"
            aria-label="Breadcrumb"
          >
            <ol className="flex items-center space-x-1">
              <li>
                <Link
                  href="/"
                  className="group flex items-center px-4 py-2.5 rounded-lg text-gray-600 hover:text-primary hover:bg-gradient-to-r hover:from-light-bg hover:to-light-bg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <FiChevronRight
                  className="mx-2 text-gray-400 group-hover:text-primary transition-colors duration-200"
                  size={16}
                />
              </li>
              <li>
                <Link
                  href="/profile"
                  className="group flex items-center px-4 py-2.5 rounded-lg text-gray-600 hover:text-primary hover:bg-gradient-to-r hover:from-light-bg hover:to-light-bg transition-all duration-300 transform hover:scale-105"
                >
                  <span className="relative">
                    Profile
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
                  </span>
                </Link>
              </li>
              <li>
                <FiChevronRight className="mx-2 text-gray-400" size={16} />
              </li>
              <li>
                <span className="flex items-center px-4 py-2.5 rounded-lg text-primary bg-gradient-to-r ${THEME.colors.gradient.light} font-semibold shadow-sm border border-[#E5E3FF]">
                  <FiBriefcase className="mr-2" size={16} />
                  Jobs
                </span>
              </li>
            </ol>
          </nav>
        </Card> */}

        {/* Dual view toggle */}
        {/* <div className="flex justify-center mb-6">
          <Card className="flex gap-2 border border-[#E8E4FF] p-2 shadow-sm" noPadding>
            {["seeker", "employer"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m as "seeker" | "employer")}
                className={`px-5 py-2 rounded-xl font-medium transition-all ${
                  mode === m
                    ? "bg-gradient-to-r from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}] text-white shadow-lg"
                    : "text-[#666] hover:text-primary hover:bg-light-bg"
                }`}
              >
                {m === "seeker" ? "Job Seeking Mode" : "Employer Mode"}
              </button>
            ))}
          </Card>
        </div> */}

        {mode === "employer" ? (
          <>
            <ProfileSubMenu
              menuItems={menuItems}
              activeTab={activeTab}
              onTabChange={(key) => setActiveTab(key as any)}
            />
          <div className="space-y-8 mt-12">
            {/* Employer: Post Job */}
            <Card className="p-6" noPadding>
              <h2 className={`${THEME.components.typography.sectionTitle} text-2xl mb-6`}>
                Post a Job
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  className={`${THEME.components.input.default}`}
                  placeholder="Company"
                  value={newPosting.company}
                  onChange={(e) =>
                    setNewPosting((p) => ({ ...p, company: e.target.value }))
                  }
                />
                <input
                  className={`${THEME.components.input.default}`}
                  placeholder="Position"
                  value={newPosting.position}
                  onChange={(e) =>
                    setNewPosting((p) => ({ ...p, position: e.target.value }))
                  }
                />
                <input
                  className={`${THEME.components.input.default}`}
                  placeholder="Location"
                  value={newPosting.location}
                  onChange={(e) =>
                    setNewPosting((p) => ({ ...p, location: e.target.value }))
                  }
                />
                <input
                  className={`${THEME.components.input.default}`}
                  placeholder="Salary"
                  value={newPosting.salary}
                  onChange={(e) =>
                    setNewPosting((p) => ({ ...p, salary: e.target.value }))
                  }
                />
                <select
                  className={`${THEME.components.input.default}`}
                  value={newPosting.type}
                  onChange={(e) =>
                    setNewPosting((p) => ({ ...p, type: e.target.value }))
                  }
                >
                  <option>Full-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
                <textarea
                  className={`${THEME.components.input.default} md:col-span-2 min-h-[100px]`}
                  placeholder="Description"
                  value={newPosting.description}
                  onChange={(e) =>
                    setNewPosting((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mt-6 flex gap-3 justify-end">
                {editingPostingIndex !== null && (
                  <button
                    onClick={() => {
                      setEditingPostingIndex(null);
                      setNewPosting({
                        id: "",
                        company: "",
                        position: "",
                        location: "",
                        salary: "",
                        type: "Full-time",
                        description: "",
                      });
                    }}
                    className="px-6 py-2 border border-gray-200 rounded-full text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleSavePosting}
                  className={`${THEME.components.button.primary} px-8 py-2`}
                >
                  {editingPostingIndex !== null ? "Update Job" : "Create Job"}
                </button>
              </div>
            </Card>

            {/* Employer: Manage Listings */}
            <div className="space-y-4">
              <h2 className={`${THEME.components.typography.sectionTitle} text-2xl`}>
                Manage Listings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {postings.map((p, idx) => (
                  <Card
                    key={p.id}
                    className="hover:shadow-lg transition-all duration-300"
                    noPadding
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className={`${THEME.components.typography.cardTitle} text-lg mb-1`}>
                            {p.position}
                          </h3>
                          <div className={`flex items-center gap-2 ${THEME.components.typography.body} text-xs`}>
                             <span>{p.company}</span>
                             <span>•</span>
                             <span>{p.location}</span>
                             <span>•</span>
                             <span>{p.type}</span>
                          </div>
                        </div>
                        <div className={`px-3 py-1 bg-purple-50 text-[${THEME.colors.primary}] rounded-full text-xs font-medium`}>
                          {p.salary}
                        </div>
                      </div>
                      
                      <p className={`${THEME.components.typography.body} mb-6 line-clamp-2`}>{p.description}</p>
                      
                      <div className="flex gap-3 pt-4 border-t border-gray-100">
                        <button
                          className="flex-1 px-4 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                          onClick={() => handleEditPosting(idx)}
                        >
                          Edit
                        </button>
                        <button
                          className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                          onClick={() => handleDeletePosting(idx)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Employer: Applicants */}
            <div className="space-y-4">
              <h2 className={`${THEME.components.typography.sectionTitle} text-2xl`}>
                Applicants
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {applicants.map((a) => (
                  <Card
                    key={a.id}
                    className="hover:shadow-lg transition-all duration-300 text-center"
                    noPadding
                  >
                    <div className="p-6">
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} text-white font-bold text-xl flex items-center justify-center mb-3 shadow-md`}>
                        {a.name.charAt(0)}
                      </div>
                      <h3 className={`${THEME.components.typography.cardTitle} text-lg mb-1`}>{a.name}</h3>
                      <p className={`${THEME.components.typography.body} text-xs mb-4`}>
                        Applied for: <span className="font-medium text-gray-900">{a.position}</span>
                      </p>
                      <div className={`inline-block px-3 py-1 bg-gray-100 rounded-full text-xs text-gray-600 mb-4`}>
                        {a.email}
                      </div>
                      <button
                        className={`w-full ${THEME.components.button.primary} px-4 py-2 text-sm`}
                        onClick={() => handleDownloadResume(a.resumeId, a.name)}
                      >
                        Download Resume
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Employer: Schedule meetings */}
            <Card className="p-6" noPadding>
              <h2 className={`${THEME.components.typography.sectionTitle} text-2xl mb-6`}>
                Schedule Meeting
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <select
                  className={`${THEME.components.input.default}`}
                  value={scheduleForm.candidateId}
                  onChange={(e) =>
                    setScheduleForm((s) => ({
                      ...s,
                      candidateId: e.target.value,
                    }))
                  }
                >
                  <option value="">Select Candidate</option>
                  {applicants.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <input
                  type="datetime-local"
                  className={`${THEME.components.input.default}`}
                  value={scheduleForm.datetime}
                  onChange={(e) =>
                    setScheduleForm((s) => ({ ...s, datetime: e.target.value }))
                  }
                />
                <input
                  className={`${THEME.components.input.default}`}
                  placeholder="Notes (optional)"
                  value={scheduleForm.notes}
                  onChange={(e) =>
                    setScheduleForm((s) => ({ ...s, notes: e.target.value }))
                  }
                />
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSchedule}
                  className={`${THEME.components.button.primary} px-8 py-2`}
                >
                  Add Meeting
                </button>
              </div>
              
              {meetings.length > 0 && (
                <div className="mt-8">
                  <h3 className={`${THEME.components.typography.sectionTitle} text-lg mb-4`}>
                    Upcoming Meetings
                  </h3>
                  <div className={`overflow-x-auto rounded-xl border ${THEME.colors.border}`}>
                    <table className="min-w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr className="text-left">
                          <th className={`py-3 px-4 font-semibold ${THEME.colors.text.subheading}`}>Candidate</th>
                          <th className={`py-3 px-4 font-semibold ${THEME.colors.text.subheading}`}>Date & Time</th>
                          <th className={`py-3 px-4 font-semibold ${THEME.colors.text.subheading}`}>Notes</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {meetings.map((m) => (
                          <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                            <td className={`py-3 px-4 font-medium ${THEME.colors.text.heading}`}>
                              {m.candidateName}
                            </td>
                            <td className={`py-3 px-4 ${THEME.colors.text.body}`}>
                              {new Date(m.datetime).toLocaleString()}
                            </td>
                            <td className={`py-3 px-4 ${THEME.colors.text.body}`}>{m.notes || "-"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </Card>
          </div>
          </>
        ) : (
          <>
            <ProfileSubMenu
              menuItems={menuItems}
              activeTab={activeTab}
              onTabChange={(key) => setActiveTab(key as any)}
            />

            {/* Stats Cards */}
            {/* <div className="mt-[6px] mb-[3px]">
              <h2 className="text-2xl font-bold text-[#222] font-Montserrat mb-8">
                Dashboard
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 hover:shadow-lg transition-all duration-300" noPadding>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}] text-white`}>
                      <FiBriefcase size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#222]">12</h3>
                      <p className="text-sm text-[#666]">Applications</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300" noPadding>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}] text-white`}>
                      <FiEye size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#222]">3</h3>
                      <p className="text-sm text-[#666]">Interviews</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300" noPadding>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}] text-white`}>
                      <FiBookmark size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#222]">8</h3>
                      <p className="text-sm text-[#666]">Saved Jobs</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 hover:shadow-lg transition-all duration-300" noPadding>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}] text-white`}>
                      <FiTrendingUp size={20} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-[#222]">92%</h3>
                      <p className="text-sm text-[#666]">Match Score</p>
                    </div>
                  </div>
                </Card>
              </div>
            </div> */}


            {/* Content based on active tab */}
            {activeTab === "applications" && (
              <div className="space-y-6 mt-[4rem]">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <h2 className={`${THEME.components.typography.sectionTitle} text-2xl`}>
                    My Applications
                  </h2>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors duration-300 font-medium">
                      <FiFilter className="text-purple-600" size={16} />
                      Filter
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 text-purple-600 border border-purple-200 rounded-lg hover:bg-purple-50 transition-colors duration-300 font-medium">
                      <FiSearch className="text-purple-600" size={16} />
                      Search
                    </button>
                  </div>


                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {applications.map((app) => (
                    <JobInviteCard
                      key={app.id}
                      companyName={app.company}
                      companyLogo={app.logo} // Note: app.logo is currently a string (e.g., "G"), might need adjustment if it expects a URL
                      distance="2.5 km away" // Mock data for now
                      jobTitle={app.position}
                      workType="Work from office" // Mock data
                      jobType="Both" // Mock data
                      location={app.location}
                      salary={app.salary}
                      onAccept={() => console.log("Accepted", app.id)}
                      onDecline={() => console.log("Declined", app.id)}
                      onSave={() => handleSaveApplication(app)}
                    />
                  ))}
                </div>

              {/* Applied Jobs Section */}
              <div className="space-y-6">
                <h2 className={`${THEME.components.typography.sectionTitle} text-2xl`}>
                  Applied Jobs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((job) => (
                    <Card
                      key={job.id}
                      className="hover:shadow-lg transition-all duration-300"
                      noPadding
                    >
                      <div className="p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} text-white font-bold flex items-center justify-center`}>
                            {job.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`${THEME.components.typography.cardTitle} mb-1 truncate`}>
                              {job.position}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${getMatchScoreColor(
                                job.matchScore
                              )}`}
                            >
                              {job.matchScore}% Match
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className={`${THEME.components.typography.body} font-medium truncate`}>
                            {job.company}
                          </p>
                          <div className={`space-y-1 ${THEME.components.typography.body}`}>
                            <div className="flex items-center gap-1">
                              <FiMapPin size={14} />
                              <span className="truncate">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiDollarSign size={14} />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiClock size={14} />
                              <span>{job.postedDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 bg-[#F3EFFF] text-[${THEME.colors.primary}] text-xs font-medium rounded-lg`}
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                              +{job.skills.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 mt-auto">
                          <button
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border ${THEME.colors.border} text-[${THEME.colors.primary}] rounded-lg hover:border-[${THEME.colors.primary}] transition-colors duration-300`}
                            onClick={() => saveJob(job)}
                          >
                            <FiBookmark size={16} />
                            Save
                          </button>
                          <button
                            className={THEME.components.button.primary}
                            onClick={() => applyFromRecommendation(job)}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Saved Jobs Section */}
              <div className="space-y-6">
                <h2 className={`${THEME.components.typography.sectionTitle} text-2xl`}>
                  Saved Jobs
                </h2>
                {savedJobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobs.map((job) => (
                      <JobInviteCard
                        key={job.id}
                        companyName={job.company}
                        companyLogo={job.logo}
                        distance={`${job.distance || 0} km away`}
                        jobTitle={job.position}
                        workType="Work from office"
                        jobType={job.type}
                        location={job.location}
                        salary={job.salary}
                        primaryActionLabel="Apply Now"
                        onAccept={() => applyFromRecommendation(job)}
                        onSave={() => removeSavedJob(job.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                    <div className={`w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} text-white flex items-center justify-center`}>
                      <FiBookmark size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#222] mb-2">
                      No Saved Jobs Yet
                    </h3>
                    <p className="text-[#666] mb-6">
                      Start saving jobs you're interested in to view them here
                    </p>
                    <button className={`px-6 py-3 bg-gradient-to-r ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300`}>
                     Find Jobs
                    </button>
                  </div>
                )}
              </div>
            </div>
            )}

            {activeTab === "recommendations" && (
              <div className="space-y-6 mt-[4rem]">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <h2 className={`${THEME.components.typography.sectionTitle} text-2xl`}>
                    Recommended for You
                  </h2>
                  <div className="flex gap-3">
                    <button className={`${THEME.components.button.primary} flex items-center gap-2`}>
                      <FiFilter size={16} />
                      Preferences
                    </button>
                  </div>
                </div>

                {/* Location-based Job Discovery Controls */}
                <Card className="p-6" noPadding>
                  <div className="flex flex-col lg:flex-row gap-6">
                    {/* Location Controls */}
                    <div className="flex-1 space-y-4">
                      <h3 className={`${THEME.components.typography.sectionTitle} mb-4`}>
                        Discover Jobs Near You
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className={`block text-sm font-medium ${THEME.components.typography.body} mb-2`}>
                            Location
                          </label>
                          <div className="relative">
                            <FiMapPin
                              className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${THEME.colors.text.muted}`}
                              size={16}
                            />
                            <input
                              type="text"
                              placeholder="Enter city or address"
                              className={`${THEME.components.input.default} pl-10`}
                              value={locationFilter}
                              onChange={(e) =>
                                setLocationFilter(e.target.value)
                              }
                            />
                          </div>
                        </div>
                        <div>
                          <label className={`block text-sm font-medium ${THEME.components.typography.body} mb-2`}>
                            Distance
                          </label>
                          <select
                            className={`${THEME.components.input.default}`}
                            value={distanceFilter}
                            onChange={(e) => setDistanceFilter(e.target.value)}
                          >
                            <option value="5">Within 5 km</option>
                            <option value="10">Within 10 km</option>
                            <option value="25">Within 25 km</option>
                            <option value="50">Within 50 km</option>
                            <option value="100">Within 100 km</option>
                          </select>
                        </div>
                        <div className="flex items-end gap-2">
                          <button
                            className={`flex-1 ${THEME.components.button.primary} px-4 py-2`}
                            onClick={handleLocationSearch}
                          >
                            <FiSearch size={16} className="inline mr-2" />
                            Search
                          </button>
                          <button
                            className={`px-4 py-2 border ${THEME.colors.border} rounded-lg transition-colors duration-300 ${
                              showMap
                                ? `bg-[${THEME.colors.primary}] text-white border-[${THEME.colors.primary}]`
                                : `bg-white text-[${THEME.colors.primary}] hover:border-[${THEME.colors.primary}]`
                            }`}
                            onClick={() => setShowMap(!showMap)}
                          >
                            <FiMapPin size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Map View */}
                {showMap && (
                  <Card className="p-6" noPadding>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className={`${THEME.components.typography.sectionTitle}`}>
                        Jobs Near You
                      </h3>
                      <div className="flex gap-2">
                        <button
                          className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            mapView === "list"
                              ? `bg-[${THEME.colors.primary}] text-white`
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          onClick={() => setMapView("list")}
                        >
                          List
                        </button>
                        <button
                          className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                            mapView === "map"
                              ? `bg-[${THEME.colors.primary}] text-white`
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                          onClick={() => setMapView("map")}
                        >
                          Map
                        </button>
                      </div>
                    </div>

                    {mapView === "map" ? (
                      <div className="relative h-96 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl overflow-hidden">
                        {/* Interactive Map Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <FiMapPin
                              size={48}
                              className={`text-[${THEME.colors.primary}] mx-auto mb-4`}
                            />
                            <h4 className={`${THEME.components.typography.sectionTitle} mb-2`}>
                              Interactive Map View
                            </h4>
                            <p className={`${THEME.components.typography.body}`}>
                              Visualize nearby job opportunities
                            </p>
                          </div>
                        </div>

                        {/* Map Markers for Jobs */}
                        {nearbyJobs.map((job, index) => (
                          <div
                            key={job.id}
                            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group"
                            style={{
                              left: `${20 + ((index * 15) % 60)}%`,
                              top: `${30 + ((index * 10) % 40)}%`,
                            }}
                            onClick={() => setSelectedJob(job)}
                          >
                            <div className={`w-8 h-8 bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg hover:scale-110 transition-transform`}>
                              {index + 1}
                            </div>
                            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                {job.position} at {job.company}
                              </div>
                            </div>
                          </div>
                        ))}

                        {/* Selected Job Info Panel */}
                        {selectedJob && (
                          <div className={`absolute bottom-4 left-4 right-4 bg-white rounded-lg p-4 shadow-lg border ${THEME.colors.border}`}>
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className={`${THEME.components.typography.cardTitle}`}>
                                  {selectedJob.position}
                                </h4>
                                <p className={`${THEME.components.typography.body}`}>
                                  {selectedJob.company} • {selectedJob.location}
                                </p>
                                <p className={`${THEME.components.typography.body}`}>
                                  {selectedJob.salary} • {selectedJob.distance}
                                  km away
                                </p>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  className={`px-3 py-1 bg-gradient-to-r ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} text-white text-sm rounded-lg hover:from-[#4A4AD6] hover:to-[#A13BD3] transition-all`}
                                  onClick={() =>
                                    applyFromRecommendation(selectedJob)
                                  }
                                >
                                  Apply
                                </button>
                                <button
                                  className="px-2 py-1 text-gray-500 hover:text-gray-700"
                                  onClick={() => setSelectedJob(null)}
                                >
                                  ×
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-96 overflow-y-auto">
                        {nearbyJobs.map((job) => (
                          <div
                            key={job.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                            onClick={() => setSelectedJob(job)}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} rounded-lg flex items-center justify-center text-white font-bold`}>
                                {job.logo}
                              </div>
                              <div>
                                <h4 className={`${THEME.components.typography.cardTitle}`}>
                                  {job.position}
                                </h4>
                                <p className={`${THEME.components.typography.body}`}>
                                  {job.company} • {job.location}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className={`text-sm font-medium ${THEME.components.typography.cardTitle}`}>
                                {job.distance}km away
                              </p>
                              <p className={`${THEME.components.typography.caption}`}>
                                {job.salary}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recommendations.map((job) => (
                    <Card
                      key={job.id}
                      className="hover:shadow-lg transition-all duration-300"
                      noPadding
                    >
                      <div className="p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} text-white font-bold flex items-center justify-center`}>
                            {job.logo}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className={`${THEME.components.typography.cardTitle} mb-1 truncate`}>
                              {job.position}
                            </h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-bold ${getMatchScoreColor(
                                job.matchScore
                              )}`}
                            >
                              {job.matchScore}% Match
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className={`${THEME.components.typography.body} font-medium truncate`}>
                            {job.company}
                          </p>
                          <div className={`space-y-1 ${THEME.components.typography.body}`}>
                            <div className="flex items-center gap-1">
                              <FiMapPin size={14} />
                              <span className="truncate">{job.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiDollarSign size={14} />
                              <span>{job.salary}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FiClock size={14} />
                              <span>{job.postedDate}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 3).map((skill, index) => (
                            <span
                              key={index}
                              className={`px-2 py-1 bg-[#F3EFFF] text-[${THEME.colors.primary}] text-xs font-medium rounded-lg`}
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                              +{job.skills.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col gap-2 mt-auto">
                          <button
                            className={`w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border ${THEME.colors.border} text-[${THEME.colors.primary}] rounded-lg hover:border-[${THEME.colors.primary}] transition-colors duration-300`}
                            onClick={() => saveJob(job)}
                          >
                            <FiBookmark size={16} />
                            Save
                          </button>
                          <button
                            className={THEME.components.button.primary}
                            onClick={() => applyFromRecommendation(job)}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "saved" && (
              <div className="space-y-6 mt-[4rem]">
                 <h2 className={`${THEME.components.typography.sectionTitle} text-2xl`}>
                    Saved Jobs
                  </h2>
                {savedJobs.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedJobs.map((job) => (
                      <JobInviteCard
                        key={job.id}
                        companyName={job.company}
                        companyLogo={job.logo}
                        distance={`${job.distance || 0} km away`}
                        jobTitle={job.position}
                        workType="Work from office"
                        jobType={job.type}
                        location={job.location}
                        salary={job.salary}
                        primaryActionLabel="Apply Now"
                        onAccept={() => applyFromRecommendation(job)}
                        onSave={() => removeSavedJob(job.id)} // Allow unsaving
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}] text-white flex items-center justify-center">
                      <FiBookmark size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#222] mb-2">
                      No Saved Jobs Yet
                    </h3>
                    <p className="text-[#666] mb-6">
                      Start saving jobs you're interested in to view them here
                    </p>
                    <button 
                      onClick={() => setActiveTab('browse')}
                      className="px-6 py-3 bg-gradient-to-r from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}] hover:from-[#4A4AD6] hover:to-[#A13BD3] text-white font-bold rounded-lg transition-all duration-300"
                    >
                     Find Jobs
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === "browse" && (
              <div className="space-y-6 mt-[4rem]">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                  <h2 className="text-2xl font-bold text-[#222] font-Montserrat">
                    Find Jobs
                  </h2>
                  <Link
                    href="/profile/jobs/category/recommended"
                    className="text-sm text-purple-600 font-semibold hover:text-purple-700 hover:underline flex items-center gap-1"
                  >
                    See More
                    <FiChevronRight size={16} />
                  </Link>
                </div>

                {/* Nearby Jobs Map Section */}
                <NearbyJobsMapView postings={postings} />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {postings.map((p) => (
                    <Card
                      key={p.id}
                      className="hover:shadow-xl transition-all duration-300 overflow-hidden"
                      noPadding
                    >
                      {/* Clickable Card Content Area */}
                      <Link
                        href={`/profile/jobs/${p.id}`}
                        className="block relative group/card"
                      >
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none">
                          <div className="bg-white px-6 py-3 rounded-full flex items-center gap-2 transform scale-90 group-hover/card:scale-100 transition-transform duration-300">
                            <FiEye size={18} className={`text-[${THEME.colors.primary}]`} />
                            <span className={`text-[${THEME.colors.primary}] font-bold`}>View Details</span>
                          </div>
                        </div>

                        {/* Header with Profile */}
                        <div className="p-4 pb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Profile Image with Online Status */}
                            <div className="relative">
                              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} p-[2px]`}>
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                  <img
                                    src={p.posterImage || "/homePage/profile.png"}
                                    alt={p.posterName || "Poster"}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              </div>
                              {/* Online Status Dot */}
                              {p.isOnline && (
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                              )}
                            </div>
                            
                            {/* Name and Distance */}
                            <div className="flex-1">
                              <h3 className={`text-base font-bold ${THEME.colors.text.heading} leading-tight`}>
                                {p.posterName || p.company}
                              </h3>
                              <div className={`flex items-center gap-1 text-xs text-[${THEME.colors.primary}]`}>
                                <FiNavigation size={12} />
                                <span>{p.distance?.toFixed(1) || "0.0"} km away</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 relative z-20" onClick={(e) => e.preventDefault()}>
                            {/* Connect Button */}
                            <button 
                              className="w-9 h-9 rounded-lg bg-light-bg hover:bg-[#E5E3FF] flex items-center justify-center transition-colors group/connect relative"
                              title="Send connection request"
                            >
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                <path d="M9 4V14M4 9H14" stroke={THEME.colors.primary} strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/connect:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                Send connection request
                              </span>
                            </button>
                            
                            {/* Video Call Button */}
                            <button 
                              className="w-9 h-9 rounded-lg bg-light-bg hover:bg-[#E5E3FF] flex items-center justify-center transition-colors group/meet relative"
                              title={`Schedule a meet with ${p.posterName || p.company}`}
                            >
                              <FiCalendar size={16} className={`text-[${THEME.colors.primary}]`} />
                              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/meet:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                Schedule a meet with {p.posterName || p.company}
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Company Logo Section */}
                        <div className="px-4 pb-3">
                          <div className="w-full h-20 bg-gradient-to-br ${THEME.colors.gradient.light} rounded-lg flex items-center justify-center">
                            <div className={`text-3xl font-bold bg-gradient-to-r ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} bg-clip-text text-transparent`}>
                              {p.company.charAt(0)}
                            </div>
                          </div>
                        </div>

                        {/* Job Details */}
                        <div className="px-4 pb-4">
                          <div className="mb-2">
                            <h4 className={`text-lg font-bold ${THEME.colors.text.heading} mb-1`}>
                              {p.position}
                            </h4>
                            <p className="text-sm text-[#666]">
                              {p.company}
                            </p>
                          </div>

                          {/* Job Info */}
                          <div className={`space-y-2 mt-4 text-sm ${THEME.colors.text.body}`}>
                            <div className="flex items-center gap-2">
                              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" className="text-gray-400" strokeWidth="1.5"/>
                                <path d="M8 4V8L10.5 9.5" stroke="currentColor" className="text-gray-400" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                              <span>{p.workMode || "Work from office"}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <FiBriefcase size={14} className="text-gray-400" />
                              <span>{p.experienceLevel || "Both"}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <FiMapPin size={14} className="text-gray-400" />
                              <span>{p.location}</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <FiDollarSign size={14} className="text-gray-400" />
                              <span className={`font-semibold ${THEME.colors.text.heading}`}>{p.salary}</span>
                            </div>
                          </div>
                        </div>
                      </Link>

                      {/* Apply Button Row - Outside Link */}
                      <div className="px-4 pb-4 flex items-center gap-2 relative z-20">
                        <button 
                          className="w-9 h-9 flex items-center justify-center bg-light-bg hover:bg-[#E5E3FF] rounded-lg transition-colors group/save relative"
                          onClick={() => saveJob(p as any)}
                          title="Save the job"
                        >
                          <FiBookmark size={16} className={`text-[${THEME.colors.primary}]`} />
                          <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/save:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            Save the job
                          </span>
                        </button>
                        <button
                          onClick={() => applyToPosting(p)}
                          className={`${THEME.components.button.primary} flex-1`}
                        >
                          Apply Now
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Jobs Matching your Skills Section */}
                <div className="mt-12">
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
                    <h2 className={`text-2xl font-bold ${THEME.colors.text.heading} font-Montserrat`}>
                      Jobs Matching your Skills
                    </h2>
                    <Link
                      href="/profile/jobs/category/skills-match"
                      className="text-sm text-purple-600 font-semibold hover:text-purple-700 hover:underline flex items-center gap-1"
                    >
                      See More
                      <FiChevronRight size={16} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postings.map((p) => (
                      <div
                        key={`skill-${p.id}`}
                        className={`bg-white rounded-[1.25rem] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border ${THEME.colors.border}`}
                      >
                        <Link
                          href={`/profile/jobs/${p.id}`}
                          className="block relative group/card"
                        >
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none">
                            <div className="bg-white px-6 py-3 rounded-full flex items-center gap-2 transform scale-90 group-hover/card:scale-100 transition-transform duration-300">
                              <FiEye size={18} className={`text-[${THEME.colors.primary}]`} />
                              <span className={`text-[${THEME.colors.primary}] font-bold`}>View Details</span>
                            </div>
                          </div>

                          <div className="p-4 pb-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} p-[2px]`}>
                                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <img
                                      src={p.posterImage || "/homePage/profile.png"}
                                      alt={p.posterName || "Poster"}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                {p.isOnline && (
                                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <h3 className={`text-base font-bold ${THEME.colors.text.heading} leading-tight`}>
                                  {p.posterName || p.company}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-purple-600">
                                  <FiNavigation size={12} />
                                  <span>{p.distance?.toFixed(1) || "0.0"} km away</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 relative z-20" onClick={(e) => e.preventDefault()}>
                              <button 
                                className="w-9 h-9 rounded-lg bg-light-bg hover:bg-[#E5E3FF] flex items-center justify-center transition-colors group/connect relative"
                                title="Send connection request"
                              >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                  <path d="M9 4V14M4 9H14" stroke={THEME.colors.primary} strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/connect:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                  Send connection request
                                </span>
                              </button>
                              
                              <button 
                                className="w-9 h-9 rounded-lg bg-light-bg hover:bg-[#E5E3FF] flex items-center justify-center transition-colors group/meet relative"
                                title={`Schedule a meet with ${p.posterName || p.company}`}
                              >
                                <FiCalendar size={16} className={`text-[${THEME.colors.primary}]`} />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/meet:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                  Schedule a meet with {p.posterName || p.company}
                                </span>
                              </button>
                            </div>
                          </div>

                          <div className="px-4 pb-3">
                            <div className={`w-full h-20 bg-gradient-to-br ${THEME.colors.gradient.light} rounded-lg flex items-center justify-center`}>
                              <div className={`text-3xl font-bold bg-gradient-to-r ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} bg-clip-text text-transparent`}>
                                {p.company.charAt(0)}
                              </div>
                            </div>
                          </div>

                          <div className="px-4 pb-4">
                            <div className="mb-2">
                              <h4 className={`text-lg font-bold ${THEME.colors.text.heading} mb-1`}>
                                {p.position}
                              </h4>
                              <p className={`text-sm ${THEME.colors.text.body}`}>
                                {p.company}
                              </p>
                            </div>

                            <div className={`space-y-2 mt-4 text-sm ${THEME.colors.text.body}`}>
                              <div className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" className="text-gray-400" strokeWidth="1.5"/>
                                  <path d="M8 4V8L10.5 9.5" stroke="currentColor" className="text-gray-400" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                                <span>{p.workMode || "Work from office"}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <FiBriefcase size={14} className="text-gray-400" />
                                <span>{p.experienceLevel || "Both"}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <FiMapPin size={14} className="text-gray-400" />
                                <span>{p.location}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <FiDollarSign size={14} className="text-gray-400" />
                                <span className={`font-semibold ${THEME.colors.text.heading}`}>{p.salary}</span>
                              </div>
                            </div>
                          </div>
                        </Link>

                        <div className="px-4 pb-4 flex items-center gap-2 relative z-20">
                          <button 
                            className="w-9 h-9 flex items-center justify-center bg-light-bg hover:bg-[#E5E3FF] rounded-lg transition-colors group/save relative"
                            onClick={() => saveJob(p as any)}
                            title="Save the job"
                          >
                            <FiBookmark size={16} className={`text-[${THEME.colors.primary}]`} />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/save:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Save the job
                            </span>
                          </button>
                          <button
                            onClick={() => applyToPosting(p)}
                            className={`${THEME.components.button.primary} flex-1`}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recently Posted Jobs Section */}
                <div className="mt-12">
                  <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
                    <h2 className={`text-2xl font-bold ${THEME.colors.text.heading} font-Montserrat`}>
                      Recently Posted Jobs
                    </h2>
                    <Link
                      href="/profile/jobs/category/recent"
                      className="text-sm text-purple-600 font-semibold hover:text-purple-700 hover:underline flex items-center gap-1"
                    >
                      See More
                      <FiChevronRight size={16} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {postings.map((p) => (
                      <div
                        key={`recent-${p.id}`}
                        className={`bg-white rounded-[1.25rem] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border ${THEME.colors.border}`}
                      >
                        <Link
                          href={`/profile/jobs/${p.id}`}
                          className="block relative group/card"
                        >
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center pointer-events-none">
                            <div className="bg-white px-6 py-3 rounded-full flex items-center gap-2 transform scale-90 group-hover/card:scale-100 transition-transform duration-300">
                              <FiEye size={18} className={`text-[${THEME.colors.primary}]`} />
                              <span className={`text-[${THEME.colors.primary}] font-bold`}>View Details</span>
                            </div>
                          </div>

                          <div className="p-4 pb-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="relative">
                                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} p-[2px]`}>
                                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                    <img
                                      src={p.posterImage || "/homePage/profile.png"}
                                      alt={p.posterName || "Poster"}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                </div>
                                {p.isOnline && (
                                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                )}
                              </div>
                              
                              <div className="flex-1">
                                <h3 className={`text-base font-bold ${THEME.colors.text.heading} leading-tight`}>
                                  {p.posterName || p.company}
                                </h3>
                                <div className="flex items-center gap-1 text-xs text-purple-600">
                                  <FiNavigation size={12} />
                                  <span>{p.distance?.toFixed(1) || "0.0"} km away</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 relative z-20" onClick={(e) => e.preventDefault()}>
                              <button 
                                className="w-9 h-9 rounded-lg bg-light-bg hover:bg-[#E5E3FF] flex items-center justify-center transition-colors group/connect relative"
                                title="Send connection request"
                              >
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                                  <path d="M9 4V14M4 9H14" stroke={THEME.colors.primary} strokeWidth="2" strokeLinecap="round"/>
                                </svg>
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/connect:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                  Send connection request
                                </span>
                              </button>
                              
                              <button 
                                className="w-9 h-9 rounded-lg bg-light-bg hover:bg-[#E5E3FF] flex items-center justify-center transition-colors group/meet relative"
                                title={`Schedule a meet with ${p.posterName || p.company}`}
                              >
                                <FiCalendar size={16} className={`text-[${THEME.colors.primary}]`} />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/meet:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                  Schedule a meet with {p.posterName || p.company}
                                </span>
                              </button>
                            </div>
                          </div>

                          <div className="px-4 pb-3">
                            <div className={`w-full h-20 bg-gradient-to-br ${THEME.colors.gradient.light} rounded-lg flex items-center justify-center`}>
                              <div className={`text-3xl font-bold bg-gradient-to-r ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} bg-clip-text text-transparent`}>
                                {p.company.charAt(0)}
                              </div>
                            </div>
                          </div>

                          <div className="px-4 pb-4">
                            <div className="mb-2">
                              <h4 className={`text-lg font-bold ${THEME.colors.text.heading} mb-1`}>
                                {p.position}
                              </h4>
                              <p className={`text-sm ${THEME.colors.text.body}`}>
                                {p.company}
                              </p>
                            </div>

                            <div className={`space-y-2 mt-4 text-sm ${THEME.colors.text.body}`}>
                              <div className="flex items-center gap-2">
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                  <path d="M8 14C11.3137 14 14 11.3137 14 8C14 4.68629 11.3137 2 8 2C4.68629 2 2 4.68629 2 8C2 11.3137 4.68629 14 8 14Z" stroke="currentColor" className="text-gray-400" strokeWidth="1.5"/>
                                  <path d="M8 4V8L10.5 9.5" stroke="currentColor" className="text-gray-400" strokeWidth="1.5" strokeLinecap="round"/>
                                </svg>
                                <span>{p.workMode || "Work from office"}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <FiBriefcase size={14} className="text-gray-400" />
                                <span>{p.experienceLevel || "Both"}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <FiMapPin size={14} className="text-gray-400" />
                                <span>{p.location}</span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <FiDollarSign size={14} className="text-gray-400" />
                                <span className={`font-semibold ${THEME.colors.text.heading}`}>{p.salary}</span>
                              </div>
                            </div>
                          </div>
                        </Link>

                        <div className="px-4 pb-4 flex items-center gap-2 relative z-20">
                          <button 
                            className="w-9 h-9 flex items-center justify-center bg-light-bg hover:bg-[#E5E3FF] rounded-lg transition-colors group/save relative"
                            onClick={() => saveJob(p as any)}
                            title="Save the job"
                          >
                            <FiBookmark size={16} className={`text-[${THEME.colors.primary}]`} />
                            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/save:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                              Save the job
                            </span>
                          </button>
                          <button
                            onClick={() => applyToPosting(p)}
                            className={`${THEME.components.button.primary} flex-1`}
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        </div>
      </div>
    </div>
  </ProfileLayout>
  );
}

// Nearby Jobs Map View Component
function NearbyJobsMapView({ postings }: { postings: EmployerPosting[] }) {
  const [radius, setRadius] = useState(10);
  const [viewMode, setViewMode] = useState<"map" | "list">("list");

  // Add distance to postings (mock data)
  const nearbyJobs = postings.map((job, idx) => ({
    ...job,
    distance: [2.3, 5.7, 8.1][idx] || Math.random() * 10,
  }));

  const filteredJobs = nearbyJobs.filter((job) => job.distance <= radius);

  // Handle apply action
  const handleApply = (job: EmployerPosting & { distance: number }) => {
    // Show success message
    alert(`Successfully applied to ${job.position} at ${job.company}!`);
    // In a real app, this would make an API call to submit the application
  };

  return (
    <Card className="p-0 overflow-hidden border border-[#E8E4FF] shadow-sm" noPadding>
      {/* Header with Controls */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className={`text-xl font-bold ${THEME.colors.text.heading} flex items-center gap-2`}>
              <FiMapPin className={`text-[${THEME.colors.primary}]`} />
              Nearby Jobs
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {filteredJobs.length} jobs within {radius}km
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Radius:</label>
              <select
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className={`px-3 py-2 border ${THEME.colors.border} rounded-lg focus:ring-2 focus:ring-[${THEME.colors.primary}] text-sm bg-gray-50`}
              >
                <option value={5}>5 km</option>
                <option value={10}>10 km</option>
                <option value={25}>25 km</option>
                <option value={50}>50 km</option>
              </select>
            </div>

            <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setViewMode("list")}
                className={`px-3 py-1.5 rounded-md font-medium transition-all text-xs ${
                  viewMode === "list"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                List
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`px-3 py-1.5 rounded-md font-medium transition-all text-xs ${
                  viewMode === "map"
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Map
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map/List View Content */}
      <div className="p-6 bg-gray-50/50">
        {viewMode === "map" ? (
          <div className={`bg-white rounded-xl shadow-sm border ${THEME.colors.border} h-[500px] flex items-center justify-center overflow-hidden relative`}>
             <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50"></div>
             <div className="text-center relative z-10">
              <div className="w-20 h-20 mx-auto bg-white rounded-full shadow-md flex items-center justify-center mb-4">
                <FiMapPin size={32} className={`text-[${THEME.colors.primary}]`} />
              </div>
              <p className="text-gray-900 font-semibold text-lg">Interactive Map View</p>
              <p className="text-sm text-gray-500 mt-1">Explore jobs in your area</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border ${THEME.colors.border} group`}
              >
                {/* Clickable Card Content Area */}
                <Link
                  href={`/profile/jobs/${job.id}`}
                  className="block relative"
                >
                  {/* Header with Profile */}
                  <div className="p-4 pb-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Profile Image with Online Status */}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} p-[1.5px]`}>
                        <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                          <img
                            src={job.posterImage || "/homePage/profile.png"}
                            alt={job.posterName || "Poster"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      {/* Online Status Dot */}
                      {job.isOnline && (
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    {/* Name and Distance */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`text-sm font-bold ${THEME.colors.text.heading} truncate`}>
                        {job.posterName || job.company}
                      </h3>
                      <div className={`flex items-center gap-1 text-[10px] text-[${THEME.colors.primary}]`}>
                        <FiNavigation size={10} />
                        <span>{job.distance.toFixed(1)} km away</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-1 relative z-20" onClick={(e) => e.preventDefault()}>
                    <button className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-600">
                      <FiMessageCircle size={14} />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-gray-50 hover:bg-gray-100 flex items-center justify-center transition-colors text-gray-600">
                      <FiCalendar size={14} />
                    </button>
                  </div>
                </div>

                  {/* Company Logo Section - Smaller */}
                  <div className="px-4 py-2">
                    <div className="w-full h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg flex items-center justify-center border border-gray-100">
                      <div className={`text-2xl font-bold bg-gradient-to-r ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} bg-clip-text text-transparent`}>
                        {job.company.charAt(0)}
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
                  <div className="px-4 pb-4">
                    <div className="mb-2">
                      <h4 className={`text-base font-bold ${THEME.colors.text.heading} mb-0.5 truncate`}>
                        {job.position}
                      </h4>
                      <p className={`text-xs ${THEME.colors.text.body} truncate`}>
                        {job.company}
                      </p>
                    </div>

                    {/* Job Info */}
                    <div className={`space-y-1.5 mt-3 text-xs ${THEME.colors.text.body}`}>
                      <div className="flex items-center gap-2">
                        <FiBriefcase size={12} className="text-gray-400" />
                        <span>{job.workMode || "Work from office"} • {job.experienceLevel || "Both"}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiMapPin size={12} className="text-gray-400" />
                        <span className="truncate">{job.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FiDollarSign size={12} className="text-gray-400" />
                        <span className={`font-semibold ${THEME.colors.text.heading}`}>{job.salary}</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Apply Button Row */}
                <div className="px-4 pb-4 flex items-center gap-2 relative z-20 border-t border-gray-50 pt-3 mt-1">
                  <button 
                    className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-[${THEME.colors.primary}]"
                  >
                    <FiBookmark size={14} />
                  </button>
                  <button
                    onClick={() => handleApply(job)}
                    className={`${THEME.components.button.primary} flex-1`}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
