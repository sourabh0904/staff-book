"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { FiMenu, FiX, FiBell, FiMessageSquare, FiCalendar, FiMoreVertical, FiSearch } from "react-icons/fi";
import { LOGGED_IN_LINKS, SITE_CONFIG } from "../constants/siteconfig";
import GradientButton from "./shared/GradientButton";
import { useAuth } from "../context/AuthContext";
import ProfileAvatar from "./shared/ProfileAvatar";
import { usePathname, useRouter } from "next/navigation";
import NotificationsModal from "./shared/NotificationsModal";
import { profileCompletion } from "../data/profile";
import NavbarSearch from "./navbar/NavbarSearch";
import NavbarDesktop from "./navbar/NavbarDesktop";
import NavbarMobile from "./navbar/NavbarMobile";
import MeetingModal from "./shared/MeetingModal";
import { NavLink } from "@/types/navigation";
import { THEME } from "@/styles/theme";

const Navbar = () => {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [meetingModalOpen, setMeetingModalOpen] = useState(false);
  const bellButtonRef = useRef<HTMLButtonElement>(null);
  const navLinks = SITE_CONFIG.navbar.navLinks as NavLink[];
  const signUpText = SITE_CONFIG.navbar.signUp;
  const { user, isSidebarOpen, setIsSidebarOpen, isEmployer } = useAuth();
  const router = useRouter();

  // Get profile completion percentage
  const completionPercentage = profileCompletion.percent;

  const [searchOpen, setSearchOpen] = useState(false);

  // Filter links based on isEmployer state
  const getFilteredLinks = () => {
    if (!user) return navLinks;

    return (LOGGED_IN_LINKS as NavLink[]).map(link => {
      if (link.label === 'Jobs' && link.submenu) {
        // If employer, show only Employer Mode submenu
        if (isEmployer) {
          const employerMode = link.submenu.find(item => item.label === 'Employer Mode');
          return {
            ...link,
            submenu: employerMode ? employerMode.submenu : []
          };
        } 
        // If job seeker (default), show only Job Seeking Mode submenu
        else {
          const seekerMode = link.submenu.find(item => item.label === 'Job Seeking Mode');
          return {
            ...link,
            submenu: seekerMode ? seekerMode.submenu : []
          };
        }
      }
      return link;
    });
  };

  const filteredLinks = getFilteredLinks();

  return (
    <>
      <div className={`w-full h-[70px] fixed top-0 z-[100] bg-white/95 backdrop-blur-md lg:bg-transparent ${THEME.components.glass} border-x-0 border-y-0 rounded-none transition-all duration-300`}>
        <div className="w-full max-w-7xl mx-auto h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
          
          {/* Left Side: Logo + Search */}
          <div className="flex items-center gap-4 lg:gap-8">
            <div className="flex flex-row gap-3 items-center">
              <div className="lg:hidden flex items-center z-50">
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="relative bg-white rounded-full shadow-md hover:bg-gray-50 transition-all active:scale-95"
                  aria-label="Toggle sidebar"
                  style={{
                    background: `conic-gradient(from 0deg, ${THEME.colors.gradient.start} 0deg ${(completionPercentage / 100) * 360
                      }deg, #e5e7eb ${(completionPercentage / 100) * 360}deg 360deg)`,
                    padding: "2px",
                    borderRadius: "50%",
                  }}
                >
                  <div className="rounded-full overflow-hidden h-9 w-9 bg-white flex items-center justify-center">
                    <Image
                      src={user?.picture || "/homePage/profile.png"}
                      alt={user ? `${user.first_name} ${user.last_name}` : "Profile"}
                      width={36}
                      height={36}
                      className="rounded-full object-cover"
                    />
                  </div>
                </button>
              </div>
              {/* Logo Section */}
              <div className="w-[120px] md:w-[140px] lg:w-[160px] h-[70px] flex items-center justify-center lg:justify-start">
                <Image
                  src="/logo.png"
                  alt="Staff Book"
                  width={130}
                  height={46}
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Search Bar (Desktop) */}
            {user && (
              <div className="hidden lg:block w-[260px]">
                <NavbarSearch />
              </div>
            )}
          </div>

          {/* Right Side: Menu + Icons + Profile */}
          {user ? (
            <div className="hidden lg:flex items-center gap-6">
              <NavbarDesktop links={filteredLinks} currentPath={path} />
              
              <div className="flex items-center gap-4 border-l border-gray-200 pl-6 h-8">
                <NavbarIconButton
                  onNotificationsClick={() => setNotificationsOpen(true)}
                  onMeetingsClick={() => setMeetingModalOpen(true)}
                  bellButtonRef={bellButtonRef}
                />
                <ProfileAvatar
                  name={user ? `${user.first_name} ${user.last_name}` : 'User'}
                  src={user?.picture}
                />
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-6">
              <NavbarDesktop links={navLinks} currentPath={path} />
              <Link key={"signup"} href={"/signup"}>
                <GradientButton className="w-[100px] h-[40px] ml-2 text-sm font-medium font-sans">
                  {signUpText}
                </GradientButton>
              </Link>
            </div>
          )}

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-3">
            {user && (
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-gray-100/50 transition-colors text-gray-700"
              >
                <FiSearch size={22} />
              </button>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" className="p-1">
              {menuOpen ? (
                <FiX size={26} color="#101022" />
              ) : (
                <FiMoreVertical size={26} color="#101022" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Overlay */}
        <div className={`absolute top-[70px] left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 p-4 shadow-lg transition-all duration-300 origin-top ${searchOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
          <NavbarSearch className="w-full" />
        </div>
      </div>

      {/* Mobile Menu */}
      <NavbarMobile 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={user ? filteredLinks : navLinks}
        user={user}
        signUpText={signUpText}
        onNotificationsClick={() => setNotificationsOpen(true)}
        onMeetingsClick={() => setMeetingModalOpen(true)}
        bellButtonRef={bellButtonRef}
      />

      {/* Meeting Modal */}
      <MeetingModal 
        isOpen={meetingModalOpen}
        onClose={() => setMeetingModalOpen(false)}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        buttonRef={bellButtonRef}
      />
    </>
  );
};

export const NavbarIconButton = ({
  onNotificationsClick,
  onMeetingsClick,
  bellButtonRef,
}: {
  onNotificationsClick: () => void;
  onMeetingsClick: () => void;
  bellButtonRef?: React.RefObject<HTMLButtonElement | null>;
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-2 md:gap-4">
      <button className=" p-2 rounded-full hover:bg-gray-100 transition-colors">
        <FiMessageSquare size={22} className="text-gray-500" />
      </button>
      <button
        ref={bellButtonRef}
        className="ml-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={onNotificationsClick}
      >
        <FiBell size={22} className="text-gray-500" />
      </button>

      {/* Calendar Button - Redirect to Schedule Meeting in Jobs page with EMPLOYER mode */}
      <button
        className="ml-1 p-2 rounded-full hover:bg-gray-100 transition-colors"
        onClick={onMeetingsClick}
      >
        <FiCalendar size={22} className="text-gray-500" />
      </button>

    </div>
  );
};
export default Navbar;
