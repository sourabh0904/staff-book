import CreativesSection from "../../components/Postloginpage/CreativeSection";
import MapFilterSection from "@/components/shared/MapFilterSection";
import FeaturedJobsSection from "@/components/shared/FeatureSection";
import JobSearchBar from "@/components/shared/SubMenuWrapper";
import ATSResumeSection from "@/components/Postloginpage/ATSResumeSection";
import CompanyLogoSection from "../../components/shared/company-logo";
import ChatShowcaseSection from "@/components/Postloginpage/ChatShowcaseSection";
import ConnectWithRecruiterSection from "@/components/Postloginpage/ConnectWithRecruiterSection";
import PopularRolesSection from '../../components/Postloginpage/PopularRolesSection';

export default function HomePage() {
  return (
    <main className="min-h-screen pt-16 w-full bg-[#F7F7F8]">
      {/* <Navbar/> */}

      <JobSearchBar/>
      <div className="py-4 md:px-6">

      <FeaturedJobsSection/>
      </div>
      <PopularRolesSection />
      <CreativesSection/>
      <CompanyLogoSection/>
      <MapFilterSection/>
      <ConnectWithRecruiterSection/>
      <ChatShowcaseSection/>
      <ATSResumeSection/>
      {/* <Footer/> */}
    </main>
  );
}
 