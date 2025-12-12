import React from "react";
import ProfileHeader from "../../components/profile/ProfileHeader";
import ProfilePerformance from "../../components/profile/ProfilePerformance";
import ResumeUpload from "../../components/profile/ResumeUpload";
import ProfileSummary from "../../components/profile/ProfileSummary";
import BasicDetails from "../../components/profile/BasicDetails";
import ExperienceSection from "../../components/profile/ExperienceSection";
import EducationSection from "../../components/profile/EducationSection";
import ProjectsSection from "../../components/profile/ProjectsSection";
import CertificationsSection from "../../components/profile/CertificationsSection";
import PersonalInfo from "../../components/profile/PersonalInfo";
import SkillsSidebar from "@/components/profile/SkillsSidebar";
import { user } from "@/data/profile";
import ProfilePerformanceStats from "@/components/profile/ProfilePerformanceStats";
import ProfileLayout from "@/components/shared/ProfileLayout";
import { THEME } from "@/styles/theme";

export default function Page() {
  return (
    <ProfileLayout showSidebar={true} showStories={false} showJobSearchBar={false}>
      <div className={`grid grid-cols-1 lg:grid-cols-3 ${THEME.layout.spacing.xl}`}>
        <div className={`lg:col-span-2 flex flex-col ${THEME.layout.spacing.sm}`}>
          <ProfileHeader />
          <ProfilePerformanceStats />
          <ResumeUpload />
          <ProfileSummary />
          <BasicDetails />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <CertificationsSection />
          <PersonalInfo />
        </div>
        <div className="lg:col-span-1">
          <div className="sticky top-[80px] max-h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
            <SkillsSidebar />
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
}
