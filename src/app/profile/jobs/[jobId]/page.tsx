"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  FiBriefcase,
  FiMapPin,
  FiDollarSign,
  FiClock,
  FiBookmark,
  FiCalendar,
  FiUser,
  FiChevronRight,
  FiArrowLeft,
  FiNavigation,
  FiCheckCircle,
} from "react-icons/fi";
import Button from "@/components/shared/Button";
import Card from "@/components/shared/Card";
import { THEME } from "@/styles/theme";


// Mock job data - in real app, fetch from API
const jobsData: any = {
  p1: {
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
    description: `We are looking for a talented UI/UX Designer to join our dynamic team at Google. 
    
In this role, you will be responsible for creating intuitive and visually appealing user interfaces for our products. You'll work closely with product managers, engineers, and other designers to deliver exceptional user experiences.

The ideal candidate has a strong portfolio demonstrating expertise in user-centered design, prototyping, and visual design. You should be comfortable working in a fast-paced environment and be passionate about solving complex design challenges.`,
    responsibilities: [
      "Design and prototype user interfaces for web and mobile applications",
      "Conduct user research and usability testing",
      "Collaborate with cross-functional teams to define and implement innovative solutions",
      "Create wireframes, storyboards, user flows, and process flows",
      "Establish and promote design guidelines, best practices, and standards",
    ],
    requirements: [
      "5+ years of experience in UI/UX design",
      "Strong portfolio showcasing design projects",
      "Proficiency in Figma, Sketch, Adobe XD",
      "Understanding of HTML/CSS and responsive design principles",
      "Excellent communication and collaboration skills",
      "Bachelor's degree in Design, HCI, or related field",
    ],
    benefits: [
      "Competitive salary and equity",
      "Health insurance for you and your family",
      "Flexible work hours",
      "Learning and development budget",
      "Free meals and snacks",
      "Gym membership",
    ],
    companyInfo: {
      name: "Google",
      about: "Google is a global technology leader focused on improving the ways people connect with information. Our innovations in web search and advertising have made our website a top internet property and our brand one of the most recognized in the world.",
      size: "10,000+ employees",
      industry: "Technology, Internet",
      founded: "1998",
    },
  },
  p2: {
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
    description: `Join Microsoft as a Frontend Developer and work on cutting-edge web applications that impact millions of users worldwide.`,
    responsibilities: [
      "Develop responsive web applications using React and TypeScript",
      "Optimize application performance and user experience",
      "Collaborate with backend developers and designers",
      "Write clean, maintainable code with proper documentation",
    ],
    requirements: [
      "3+ years of frontend development experience",
      "Strong knowledge of React, TypeScript, and modern JavaScript",
      "Experience with state management (Redux, Context API)",
      "Understanding of RESTful APIs and GraphQL",
    ],
    benefits: [
      "Competitive compensation package",
      "Work from home flexibility",
      "Professional development opportunities",
      "Health and wellness programs",
    ],
    companyInfo: {
      name: "Microsoft",
      about: "Microsoft is a leading global technology company that develops, licenses, and supports software, services, devices, and solutions.",
      size: "10,000+ employees",
      industry: "Technology, Software",
      founded: "1975",
    },
  },
  p3: {
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
    description: `Amazon is seeking a talented Full Stack Engineer to build scalable web applications using modern technologies.`,
    responsibilities: [
      "Design and develop full-stack web applications",
      "Build RESTful APIs and microservices",
      "Implement responsive UI components",
      "Ensure application security and performance",
    ],
    requirements: [
      "4+ years of full-stack development experience",
      "Proficiency in Node.js, React, and databases",
      "Experience with AWS cloud services",
      "Strong problem-solving skills",
    ],
    benefits: [
      "Competitive salary and stock options",
      "Remote work flexibility",
      "Career growth opportunities",
      "Comprehensive health benefits",
    ],
    companyInfo: {
      name: "Amazon",
      about: "Amazon is a global e-commerce and technology leader, committed to being Earth's most customer-centric company.",
      size: "10,000+ employees",
      industry: "E-commerce, Technology",
      founded: "1994",
    },
  },
};

export default function JobDetailPage() {
  const params = useParams();
  const jobId = params.jobId as string;
  const job = jobsData[jobId];

  const [isSaved, setIsSaved] = useState(false);

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#222] mb-4">Job Not Found</h1>
          <Link
            href="/profile/jobs?tab=browse"
            className="text-primary hover:underline"
          >
            Back to Jobs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8 mt-[60px]">
      <div className="w-full px-6">
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
            <span className="text-[#222] font-medium">{job.position}</span>
          </nav>

          {/* Main Layout - 3 Column */}
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column - Job Summary (Sticky) */}
            <div className="col-span-3">
              <div className="sticky top-6 space-y-4">
                {/* Company Logo */}
                {/* Company Logo */}
                <Card className="p-6">
                  <div className={`w-full h-24 bg-gradient-to-br ${THEME.colors.gradient.light} rounded-xl flex items-center justify-center mb-4`}>
                    <div className={`text-4xl font-bold bg-gradient-to-r ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} bg-clip-text text-transparent`}>
                      {job.company.charAt(0)}
                    </div>
                  </div>
                  <h3 className={`text-lg font-bold ${THEME.colors.text.heading} text-center`}>
                    {job.company}
                  </h3>
                </Card>

                {/* Quick Info */}
                {/* Quick Info */}
                <Card className="p-6 space-y-4">
                  <h4 className={`font-bold ${THEME.colors.text.heading} mb-4`}>Job Details</h4>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3">
                      <FiDollarSign className={`text-[${THEME.colors.primary}] mt-0.5`} size={16} />
                      <div>
                        <p className={THEME.colors.text.body}>Salary</p>
                        <p className={`font-semibold ${THEME.colors.text.heading}`}>{job.salary}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FiMapPin className={`text-[${THEME.colors.primary}] mt-0.5`} size={16} />
                      <div>
                        <p className={THEME.colors.text.body}>Location</p>
                        <p className={`font-semibold ${THEME.colors.text.heading}`}>{job.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FiNavigation className={`text-[${THEME.colors.primary}] mt-0.5`} size={16} />
                      <div>
                        <p className={THEME.colors.text.body}>Distance</p>
                        <p className={`font-semibold ${THEME.colors.text.heading}`}>
                          {job.distance} km away
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FiBriefcase className={`text-[${THEME.colors.primary}] mt-0.5`} size={16} />
                      <div>
                        <p className={THEME.colors.text.body}>Job Type</p>
                        <p className={`font-semibold ${THEME.colors.text.heading}`}>{job.type}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <FiClock className={`text-[${THEME.colors.primary}] mt-0.5`} size={16} />
                      <div>
                        <p className={THEME.colors.text.body}>Posted</p>
                        <p className={`font-semibold ${THEME.colors.text.heading}`}>{job.postedDate}</p>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Posted By */}
                {/* Posted By */}
                <Card className="p-6">
                  <h4 className={`font-bold ${THEME.colors.text.heading} mb-4`}>Posted By</h4>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} p-[2px]`}>
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
                      <div>
                        <p className={`font-semibold ${THEME.colors.text.heading}`}>{job.posterName}</p>
                        <p className={`text-xs ${THEME.colors.text.body}`}>{job.posterDesignation}</p>
                        <p className={`text-xs ${THEME.colors.text.muted}`}>{job.lastActive}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      className="flex items-center justify-center gap-2 px-4 py-2 bg-light-bg text-primary hover:bg-[#E5E3FF] rounded-xl font-medium transition-all text-sm"
                    >
                      <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                        <path
                          d="M9 4V14M4 9H14"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                      </svg>
                      Connect
                    </Button>
                  </div>
                </Card>
                  </div>
            </div>

            {/* Center Column - Job Description */}
            {/* Center Column - Job Description */}
            <div className="col-span-6">
              <Card className="p-8">
                <h1 className={`text-3xl font-bold ${THEME.colors.text.heading} mb-2`}>
                  {job.position}
                </h1>
                <div className={`flex items-center gap-4 text-sm ${THEME.colors.text.body} mb-6`}>
                  <span className="flex items-center gap-1">
                    <FiBriefcase size={14} />
                    {job.workMode}
                  </span>
                  <span className="flex items-center gap-1">
                    <FiUser size={14} />
                    {job.experienceLevel}
                  </span>
                </div>

                {/* Job Description */}
                <section className="mb-8">
                  <h2 className={`text-xl font-bold ${THEME.colors.text.heading} mb-4`}>
                    Job Description
                  </h2>
                  <p className={`${THEME.colors.text.body} leading-relaxed whitespace-pre-line`}>
                    {job.description}
                  </p>
                </section>

                {/* Responsibilities */}
                <section className="mb-8">
                  <h2 className={`text-xl font-bold ${THEME.colors.text.heading} mb-4`}>
                    Key Responsibilities
                  </h2>
                  <ul className="space-y-3">
                    {job.responsibilities.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <FiCheckCircle className={`text-[${THEME.colors.primary}] mt-1 flex-shrink-0`} size={18} />
                        <span className={THEME.colors.text.body}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Requirements */}
                <section className="mb-8">
                  <h2 className={`text-xl font-bold ${THEME.colors.text.heading} mb-4`}>
                    Requirements
                  </h2>
                  <ul className="space-y-3">
                    {job.requirements.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <FiCheckCircle className={`text-[${THEME.colors.primary}] mt-1 flex-shrink-0`} size={18} />
                        <span className={THEME.colors.text.body}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Benefits */}
                <section className="mb-8">
                  <h2 className={`text-xl font-bold ${THEME.colors.text.heading} mb-4`}>
                    Benefits & Perks
                  </h2>
                  <ul className="space-y-3">
                    {job.benefits.map((item: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" size={18} />
                        <span className={THEME.colors.text.body}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Company Info */}
                <section className={`bg-gradient-to-br ${THEME.colors.gradient.light} rounded-xl p-6`}>
                  <h2 className={`text-xl font-bold ${THEME.colors.text.heading} mb-4`}>
                    About {job.companyInfo.name}
                  </h2>
                  <p className={`${THEME.colors.text.body} mb-4`}>{job.companyInfo.about}</p>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className={THEME.colors.text.body}>Company Size</p>
                      <p className={`font-semibold ${THEME.colors.text.heading}`}>{job.companyInfo.size}</p>
                    </div>
                    <div>
                      <p className={THEME.colors.text.body}>Industry</p>
                      <p className={`font-semibold ${THEME.colors.text.heading}`}>{job.companyInfo.industry}</p>
                    </div>
                    <div>
                      <p className={THEME.colors.text.body}>Founded</p>
                      <p className={`font-semibold ${THEME.colors.text.heading}`}>{job.companyInfo.founded}</p>
                    </div>
                  </div>
                </section>
              </Card>
            </div>

            {/* Right Column - Call to Action (Sticky) */}
            <div className="col-span-3">
              <div className="sticky top-6 space-y-4">
                {/* Apply Button */}
                {/* Apply Button */}
                <Button className={`${THEME.components.button.primary} w-full text-lg`}>
                  Apply Now
                </Button>

                {/* Action Buttons */}
                <Card className="p-4 space-y-3">
                  <Button
                    onClick={() => setIsSaved(!isSaved)}
                    className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                      isSaved
                        ? `bg-[${THEME.colors.primary}] text-white`
                        : "bg-light-bg text-primary hover:bg-[#E5E3FF]"
                    }`}
                  >
                    <FiBookmark size={18} />
                    {isSaved ? "Saved" : "Save Job"}
                  </Button>

                  <Button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-light-bg text-primary hover:bg-[#E5E3FF] rounded-xl font-medium transition-all">
                    <FiCalendar size={18} />
                    Schedule Meet
                  </Button>
                </Card>

                {/* Share */}
                <Card className="p-4">
                  <p className={`text-sm ${THEME.colors.text.body} mb-2`}>Share this job</p>
                  <div className="flex gap-2">
                    <Button className="flex-1 px-3 py-2 bg-light-bg hover:bg-[#E5E3FF] rounded-lg text-xs font-medium text-primary transition-colors">
                      Copy Link
                    </Button>
                    <Button className="flex-1 px-3 py-2 bg-light-bg hover:bg-[#E5E3FF] rounded-lg text-xs font-medium text-primary transition-colors">
                      Share
                    </Button>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
