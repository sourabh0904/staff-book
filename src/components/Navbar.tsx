"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { FiMenu, FiX, FiBell, FiMessageSquare, FiCalendar, FiMoreVertical } from "react-icons/fi";
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
import { NavLink } from "@/types/navigation";
import { THEME } from "@/styles/theme";

const Navbar = () => {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const bellButtonRef = useRef<HTMLButtonElement>(null);
  const navLinks = SITE_CONFIG.navbar.navLinks as NavLink[];
  const signUpText = SITE_CONFIG.navbar.signUp;
  const { user, isSidebarOpen, setIsSidebarOpen } = useAuth();
  const router = useRouter();

  // Get profile completion percentage
  const completionPercentage = profileCompletion.percent;

  return (
    <div className={`w-full h-[70px] fixed top-0 z-50 ${THEME.components.glass} border-x-0 border-t-0 rounded-none`}>
      <div className="w-full max-w-[1360px] mx-auto h-full flex items-center justify-between px-4 md:px-6">
        <div className="flex flex-row gap-2">
          <div className="lg:hidden flex items-center gap-4 z-50">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="relative bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Toggle sidebar"
              style={{
                background: `conic-gradient(from 0deg, ${THEME.colors.gradient.start} 0deg ${(completionPercentage / 100) * 360
                  }deg, #e5e7eb ${(completionPercentage / 100) * 360}deg 360deg)`,
                padding: "2px",
                borderRadius: "50%",
              }}
            >
              <div className="rounded-full overflow-hidden h-10 w-10 bg-white flex items-center justify-center">
                <Image
                  src={user?.picture || "/homePage/profile.png"}
                  alt={user ? `${user.first_name} ${user.last_name}` : "Profile"}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />
              </div>
            </button>
          </div>
          {/* Logo Section */}
          <div className="w-[180px] h-[70px] flex items-center">
            <Image
              src="/logo.png"
              alt="Staff Book"
              width={140}
              height={50}
              priority
            />
          </div>
        </div>

        {/* Search Bar */}
        {user && (
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <NavbarSearch />
          </div>
        )}

        {/* Desktop Menu */}
        {user ? (
          <div className="flex items-center gap-8">
            <NavbarDesktop links={LOGGED_IN_LINKS as NavLink[]} currentPath={path} />
            <NavbarIconButton
              onNotificationsClick={() => setNotificationsOpen(true)}
              bellButtonRef={bellButtonRef}
            />
            <ProfileAvatar
              name={user ? `${user.first_name} ${user.last_name}` : 'User'}
              src={user?.picture}
            />
          </div>
        ) : (
          <div className="flex items-center gap-8">
            <NavbarDesktop links={navLinks} currentPath={path} />
            <Link key={"signup"} href={"/signup"}>
              <GradientButton className="w-[110px] h-[42px] ml-4 text-[16px] font-poppins">
                {signUpText}
              </GradientButton>
            </Link>
          </div>
        )}

        {/* Mobile Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? (
              <FiX size={28} color="#101022" />
            ) : (
              <FiMoreVertical size={28} color="#101022" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <NavbarMobile 
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={user ? (LOGGED_IN_LINKS as NavLink[]) : navLinks}
        user={user}
        signUpText={signUpText}
        onNotificationsClick={() => setNotificationsOpen(true)}
        bellButtonRef={bellButtonRef}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        buttonRef={bellButtonRef}
      />
    </div >
  );
};

export const NavbarIconButton = ({
  onNotificationsClick,
  bellButtonRef,
}: {
  onNotificationsClick: () => void;
  bellButtonRef?: React.RefObject<HTMLButtonElement | null>;
}) => {
  const router = useRouter();
  return (
    <div className="flex flex-row gap-4">
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
        onClick={() => router.push('/profile/jobs?tab=meetings&mode=employer')}
      >
        <FiCalendar size={22} className="text-gray-500" />
      </button>

    </div>
  );
};
export default Navbar;
