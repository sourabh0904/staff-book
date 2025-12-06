'use client'
import TwoColumnLayout from "@/components/Hirepage/TwoColumnLayout";
import ConnectionRequest from "@/components/Myconnectionpage/ConnectionRequestSection";
import NetworkSection from "@/components/Myconnectionpage/NetworkSection";
import MapFilterSection from "@/components/shared/MapFilterSection";
import ProfileSidebar from "@/components/shared/ProfileSidebar";
import RecruiterConnectSection from "@/components/shared/RecruiterConnectSection";
import StorySection from "@/components/shared/StorySection";

export default function Page() {
    return(
        <>
         <TwoColumnLayout
              left={<ProfileSidebar/>}
              right={
              <>
              <StorySection/>
              <ConnectionRequest/>
              <MapFilterSection/>
              <div className="text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] mb-3 font-Montserrat font-semibold text-[#18192B] text-center sm:text-left"> People You may know</div>
                  <RecruiterConnectSection/>
                  <div className="text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] mb-3 font-Montserrat font-semibold text-[#18192B] text-center sm:text-left">Connect With people who are hiring for profiles like you</div>
                  <RecruiterConnectSection/>
                  <NetworkSection/>
                 <div className="text-[1.25rem] sm:text-[1.5rem] md:text-[2rem] mb-3 font-Montserrat font-semibold text-[#18192B] text-center sm:text-left">Connect with people who recently reviewed your profile</div>
                  <RecruiterConnectSection/>
                </>
                }
                /> 
        </>
    );
}