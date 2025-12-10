import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiTrendingUp,
  FiBriefcase,
  FiUsers,
  FiMessageCircle,
  FiAward,
  FiFileText,
  FiSearch,
  FiBell,
  FiEdit2,
  FiX,
} from "react-icons/fi";
import { BsFileBarGraph } from "react-icons/bs";
import { useAuth } from "@/context/AuthContext";
import { THEME } from "@/styles/theme";
import EmployerVerificationModal from "./EmployerVerificationModal";
// (no external types needed)

type SubmenuItem = {
  id: string;
  label: string;
  href: string;
  icon?: React.ReactNode;
};

type MenuSection = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  href?: string;
  children?: SubmenuItem[];
};

const menuSections: MenuSection[] = [
  {
    id: "profile",
    label: "Profile Analytics",
    icon: <BsFileBarGraph size={18} />,
    href: "/profile/analytics",
    children: []
  },
  {
    id: "resume",
    label: "Resume & Portfolio",
    href: "/profile/resume",
    icon: <FiFileText size={16} />,
    children: []
  },
  // {
  //   id: "seeker",
  //   label: "My Job Seeking Mode",
  //   icon: <FiBriefcase size={18} />,
  //   children: [
  //     {
  //       id: "jobs",
  //       label: "Jobs",
  //       href: "/profile/jobs",
  //       icon: <FiBriefcase size={16} />
  //     },
  //     {
  //       id: "recruiter-interest",
  //       label: "Recruiter Interest",
  //       href: "/profile/insights",
  //       icon: <FiSearch size={16} />
  //     },
  //     {
  //       id: "career-growth",
  //       label: "Career Growth",
  //       href: "/profile/development",
  //       icon: <FiAward size={16} />
  //     }
  //   ]
  // },
  // {
  //   id: "employer",
  //   label: "My Employer Mode",
  //   icon: <FiUsers size={18} />,
  //   children: [
  //     {
  //       id: "find-candidates",
  //       label: "Find Candidates",
  //       href: "/profile/find-candidates",
  //       icon: <FiSearch size={16} />
  //     },
  //     {
  //       id: "manage-jobs",
  //       label: "Manage Job Posts",
  //       href: "/profile/manage-jobs",
  //       icon: <FiBriefcase size={16} />
  //     },
  //     {
  //       id: "recruiter-interest",
  //       label: "Candidate Interest",
  //       href: "/profile/candidate-insights",
  //       icon: <FiUsers size={16} />
  //     }
  //   ]
  // },
  {
    id: "subscriptions",
    label: "My Subscriptions",
    icon: <FiUsers size={18} />,
    children: [
      {
        id: "subscriptions",
        label: "Subscriptions",
        href: "/profile/insights",
        icon: <FiSearch size={16} />
      }
    ]
  }
];

export default function ProfileSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  // Check if a menu item is active
  const isActive = React.useCallback((href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  }, [pathname]);

  // Find which section contains the active page
  const getActiveSectionId = React.useCallback(() => {
    for (const section of menuSections) {
      if (section.children) {
        for (const child of section.children) {
          if (isActive(child.href)) {
            return section.id;
          }
        }
      }
    }
    return "seeker"; // Default to seeker section
  }, [isActive]);

  const [openSectionId, setOpenSectionId] = useState<string | null>(null);
  const [showSubscriptionCard, setShowSubscriptionCard] = useState(true);
  
  // Profile Display Settings State
  const { isEmployer, setIsEmployer } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const [profileLabel, setProfileLabel] = useState<'None' | 'Job Seeking' | 'Hiring'>('None');
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  const handleEmployerSwitch = () => {
    if (!isEmployer) {
      // If turning ON, show verification modal first
      setShowVerificationModal(true);
    } else {
      // If turning OFF, just switch
      setIsEmployer(false);
    }
  };

  const handleVerificationSuccess = (details: { companyName: string; gstNumber: string }) => {
    console.log("Verified Employer Details:", details);
    setIsEmployer(true);
    setShowVerificationModal(false);
  };

  // Initialize and update open section when pathname changes
  useEffect(() => {
    const activeSectionId = getActiveSectionId();
    setOpenSectionId(activeSectionId);
  }, [pathname, getActiveSectionId]);

  const toggleSection = (id: string) => {
    setOpenSectionId((prevId) => (prevId === id ? null : id));
  };

  // Get user data with defaults
  const displayName = user ? `${user.first_name} ${user.last_name}` : "Guest User";
  const displayRole = user?.designation || "User";
  const displayAvatar = user?.picture || "/homePage/profile.png";
  const totalConnections = user?.totalConnection || 0;
  const totalJobPosts = user?.totalJobPost || 0;

  // Subscription balance data
  const contactViews = user?.userBalance?.no_of_contact || 0;
  const resumeDownloads = user?.userBalance?.no_of_resume || 0;
  const banners = user?.userBalance?.no_of_banner || 0;
  const videoConferencing = user?.userBalance?.no_of_generate_lin || 0;

  return (
    <aside className="w-full flex flex-col items-center">
      {/* Top: Compact Profile card with Connections button */}
      <div className="w-full mb-4">
        <div className="w-full bg-white rounded-2xl border border-[#E8E4FF] shadow-sm p-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <Image
                src={displayAvatar}
                alt={displayName}
                width={40}
                height={40}
                className="object-cover w-10 h-10"
              />
            </div>
            <div className="flex-1">
              <div className="text-[0.95rem] font-bold text-[#222]">{displayName}</div>
              <div className="text-[0.8rem] text-[#666] line-clamp-1">{displayRole}</div>
            </div>
          </div>
          <Link
            href="/profile"
            className="mt-3 block w-full text-center bg-gradient-to-r from-gradient-start to-gradient-end hover:from-[#4A4AD6] hover:to-[#811284] text-white tex-sm font-medium rounded-[50px] py-1 transition-colors"
          >
            View Profile
          </Link>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <Link href="/connections" className="bg-light-bg rounded-xl p-2.5 text-center border border-[#E8E4FF] flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors cursor-pointer">
              <span className="block text-sm font-medium text-[#666]">Connection</span>
              <span className="text-sm font-bold text-[#222]">{totalConnections}</span>
            </Link>
            <Link href="/networking" className="bg-light-bg rounded-xl p-2.5 text-center border border-[#E8E4FF] flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors cursor-pointer">
              <span className="block text-sm font-medium text-[#666]">Post</span>
              <span className="text-sm font-bold text-[#222]">0</span>
            </Link>
            {isEmployer && (
              <Link href="/profile/jobs" className="bg-light-bg rounded-xl p-2.5 text-center border border-[#E8E4FF] flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors cursor-pointer">
                <span className="block text-sm font-medium text-[#666]">Posted Jobs</span>
                <span className="text-sm font-bold text-[#222]">{totalJobPosts}</span>
              </Link>
            )}
            <Link href="/profile/jobs?tab=recommendations" className="bg-light-bg rounded-xl p-2.5 text-center border border-[#E8E4FF] flex flex-col items-center justify-center gap-1 hover:border-primary transition-colors cursor-pointer">
              <span className="block text-sm font-medium text-[#666]">Applied Jobs</span>
              <span className="text-sm font-bold text-[#222]">0</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Menu with Sections and Submenus */}
      <div className="flex-1 w-full pb-4">
        <nav className="w-full font-Montserrat">
          {menuSections.map((section, index) => (
            <div key={section.id} className="mb-3">
              <div
                className="flex items-center justify-between bg-white hover:bg-light-bg border border-[#E8E4FF] rounded-xl px-3 py-3 cursor-pointer shadow-sm transition-colors"
                onClick={() => toggleSection(section.id)}
              >
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-gradient-start to-gradient-end text-white">
                    {section.icon}
                  </div>
                  {section.href ? (
                    <Link href={section.href} className="text-[0.95rem] font-bold text-[#222] hover:text-primary">
                      {section.label}
                    </Link>
                  ) : (
                    <span className="text-[0.95rem] font-bold text-[#222]">{section.label}</span>
                  )}
                </div>
                {(section.children?.length ?? 0) > 0 && (
                  <span className="text-primary text-sm font-semibold">
                    {openSectionId === section.id ? "—" : "+"}
                  </span>
                )}
              </div>
              {openSectionId === section.id && section.children && section.children.length > 0 && (
                <ul className="mt-2 bg-white rounded-xl border border-[#E8E4FF] divide-y divide-[#F0ECFF] overflow-hidden shadow-sm">
                  {section.children.map((item) => {
                    const itemIsActive = isActive(item.href);
                    return (
                      <li key={item.id} className="group">
                        <Link
                          href={item.href}
                          className={`flex items-center gap-2 px-4 py-3 text-[0.9rem] transition-all duration-200 ${itemIsActive
                            ? "bg-gradient-to-r from-light-bg to-[#F0ECFF] text-primary font-bold border-l-4 border-primary"
                            : "text-[#333] hover:text-primary hover:bg-light-bg hover:pl-5"
                            }`}
                        >
                          <span className={itemIsActive ? THEME.components.icon.primary : "text-gray-500 group-hover:text-indigo-300"}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Profile Display Settings */}
        <div className="w-full mb-4 bg-white rounded-2xl border border-[#E8E4FF] shadow-sm p-4">
          <h3 className="text-sm font-bold text-[#222] mb-4">Profile Display Settings</h3>
          
          {/* Switch to Employer */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[#666] font-medium">Switch to Employer</span>
            <button
              onClick={handleEmployerSwitch}
              className={`p-2 rounded-full transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
                isEmployer 
                  ? 'bg-gradient-to-r from-indigo-300 to-purple-300 ring-2 ring-purple-100' 
                  : 'bg-gradient-to-r from-gray-200 to-gray-300 hover:from-indigo-300 hover:to-purple-300'
              }`}
              title={isEmployer ? "Switch to Job Seeker" : "Switch to Employer"}
            >
              <Image 
                src="/icons/role-switch.png" 
                alt="Switch Role" 
                width={20} 
                height={20} 
                className={`w-5 h-5 transition-transform duration-500 brightness-0 invert ${isEmployer ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* Show as Online */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-[#666] font-medium">Show as Online</span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                isOnline ? 'bg-gradient-to-r from-indigo-300 to-purple-300' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                  isOnline ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {/* Profile Label */}
          <div className="space-y-2">
            <span className="text-sm text-[#666] font-medium block mb-2">Profile Label</span>
            <div className="flex flex-col gap-2">
              {['None', 'Job Seeking', 'Hiring'].map((label) => (
                <label key={label} className="flex items-center gap-2 cursor-pointer group">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    profileLabel === label 
                      ? 'border-indigo-300' 
                      : 'border-gray-300 group-hover:border-indigo-300'
                  }`}>
                    {profileLabel === label && (
                      <div className="w-2 h-2 rounded-full bg-indigo-300" />
                    )}
                  </div>
                  <input
                    type="radio"
                    name="profileLabel"
                    value={label}
                    checked={profileLabel === label}
                    onChange={(e) => setProfileLabel(e.target.value as any)}
                    className="hidden"
                  />
                  <span className={`text-sm ${
                    profileLabel === label ? 'text-indigo-500 font-medium' : 'text-gray-600'
                  }`}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Subscription Balance Card */}
        {showSubscriptionCard && (
          <div className="relative w-full mt-4 bg-white rounded-2xl border border-[#5E5CE3] overflow-hidden shadow-sm">
            <button
              onClick={() => setShowSubscriptionCard(false)}
              className="absolute top-1 right-1 p-1 text-gray-400 hover:text-red-500 transition-colors z-10 bg-[#5E5CE3] rounded-full"
            >
              <FiX size={14} />
            </button>
            <div className="bg-[#DC2626] text-center rounded-b-xl mx-2 mt-[-2px]">
              <span className="text-white text-xs font-bold">Your Remaining Subscription Balance</span>
            </div>

            <div className="p-3 flex items-center gap-2">
              <div className="flex flex-col items-center justify-center">
                <div className="text-[#D4AF37] mb-1">
                  <FiAward size={28} />
                </div>
                <span className="text-[#D4AF37] font-black text-xl italic tracking-tighter" style={{ textShadow: '1px 1px 0px rgba(0,0,0,0.1)' }}>VIP</span>
              </div>

              <div className="flex-1 grid grid-cols-4 gap-1 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-[#222]">{contactViews}</span>
                  <span className="text-[0.6rem] text-[#666] leading-tight">Contact Views</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-[#222]">{videoConferencing}</span>
                  <span className="text-[0.6rem] text-[#666] leading-tight">Video Conferencing</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-[#222]">{resumeDownloads}</span>
                  <span className="text-[0.6rem] text-[#666] leading-tight">Resume Downloads</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-[#222]">{banners}</span>
                  <span className="text-[0.6rem] text-[#666] leading-tight">Advertisment Banners</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <EmployerVerificationModal
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
        onVerify={handleVerificationSuccess}
      />
    </aside>
  );
}