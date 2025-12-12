"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import ProfileSubMenu from '@/components/shared/ProfileSubMenu';
import ATSResumeBuilder from '@/components/resume/ATSResumeBuilder';
import ResumeVersionCard from '@/components/resume/ResumeVersionCard';
import CreateResumeCard from '@/components/resume/CreateResumeCard';
import ResumeAnalytics from '@/components/resume/ResumeAnalytics';
import ResumeTemplates from '@/components/resume/ResumeTemplates';
import ResumeShare from '@/components/resume/ResumeShare';
import { THEME } from '@/styles/theme';
import {
  FiFileText,
  FiDownload,
  FiEdit3,
  FiEye,
  FiShare2,
  FiPlus,
  FiBarChart,
} from "react-icons/fi";

interface ResumeVersion {
  id: string;
  name: string;
  lastModified: string;
  views: number;
  downloads: number;
  isDefault: boolean;
  template: string;
  size: string;
}

interface ResumeContentProps {
  queryParam?: string;
}

export default function ResumeContent({ queryParam = 'tab' }: ResumeContentProps) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<
    "versions" | "builder" | "analytics" | "templates" | "share"
  >(searchParams.get(queryParam) as any || "versions");

  // Update activeTab when URL changes
  React.useEffect(() => {
    const tab = searchParams.get(queryParam);
    if (tab) {
      setActiveTab(tab as any);
    }
  }, [searchParams, queryParam]);

  const resumeVersions: ResumeVersion[] = [
    {
      id: "1",
      name: "Software Engineer Resume",
      lastModified: "2024-01-15",
      views: 127,
      downloads: 23,
      isDefault: true,
      template: "Professional",
      size: "2.3 MB",
    },
    {
      id: "2",
      name: "Frontend Developer Resume",
      lastModified: "2024-01-10",
      views: 89,
      downloads: 15,
      isDefault: false,
      template: "Modern",
      size: "1.8 MB",
    },
    {
      id: "3",
      name: "Full Stack Resume",
      lastModified: "2024-01-05",
      views: 156,
      downloads: 31,
      isDefault: false,
      template: "Creative",
      size: "2.1 MB",
    },
  ];

  const resumeMenuItems = [
    { icon: <FiFileText size={18} />, label: 'My Resumes', key: 'versions' },
    { icon: <FiEdit3 size={18} />, label: 'Resume Builder', key: 'builder' },
    { icon: <FiBarChart size={18} />, label: 'Analytics', key: 'analytics' },
    { icon: <FiDownload size={18} />, label: 'Templates', key: 'templates' },
    { icon: <FiShare2 size={18} />, label: 'Share', key: 'share' },
  ];

  return (
    <div className={`w-full ${THEME.colors.background.page}`}>
      <ProfileSubMenu
        menuItems={resumeMenuItems}
        activeTab={activeTab}
        onTabChange={(key) => setActiveTab(key as any)}
        queryParam={queryParam}
        variant="secondary"
      />
      
      {/* Show ATS Builder for builder tab */}
      {activeTab === "builder" && (
        <div className="mt-[4rem]">
          <ATSResumeBuilder />
        </div>
      )}
      
      {activeTab !== "builder" && (
        <>
      {/* Header */}
      <div className="mb-8 mt-[4rem]">
        <h1 className={`${THEME.components.typography.sectionTitle} text-3xl md:text-2xl mb-2`}>
          Resume Builder
        </h1>
        <p className={`${THEME.components.typography.subheading} text-lg font-normal`}>
          Create, manage, and optimize your professional resume
        </p>
      </div>

      {/* Content based on active tab */}
      {activeTab === "versions" && (
        <div className={`space-y-6 ${THEME.layout.spacing.xl}`}>
          <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <h2 className={THEME.components.typography.sectionTitle}>
              My Resume Versions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <CreateResumeCard />
            {resumeVersions.map((resume) => (
              <ResumeVersionCard key={resume.id} resume={resume} />
            ))}
          </div>
        </div>
      )}

      {activeTab === "analytics" && (
        <ResumeAnalytics resumeVersions={resumeVersions} />
      )}

      {activeTab === "templates" && (
        <ResumeTemplates />
      )}

      {activeTab === "share" && (
        <ResumeShare />
      )}
        </>
      )}
    </div>
  );
}
