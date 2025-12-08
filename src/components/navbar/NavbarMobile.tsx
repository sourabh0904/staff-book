import Link from "next/link";
import { useState } from "react";
import { FiChevronDown, FiBriefcase, FiEye, FiTrendingUp, FiUsers, FiFileText, FiUserCheck, FiX } from "react-icons/fi";
import { NavLink } from "@/types/navigation";
import NavbarSearch from "./NavbarSearch";
import GradientButton from "../shared/GradientButton";
import ProfileAvatar from "../shared/ProfileAvatar";
import { User } from "@/lib/api";
import { NavbarIconButton } from "../Navbar";
import Button from "../shared/Button";

interface NavbarMobileProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  user: User | null;
  signUpText: string;
  onNotificationsClick: () => void;
  onMeetingsClick: () => void;
  bellButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const NavbarMobile = ({ 
  isOpen, 
  onClose, 
  links, 
  user, 
  signUpText,
  onNotificationsClick,
  onMeetingsClick,
  bellButtonRef
}: NavbarMobileProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!isOpen) return null;

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const iconMap: { [key: string]: React.ReactNode } = {
      FiBriefcase: <FiBriefcase className="w-4 h-4 text-secondary" />,
      FiEye: <FiEye className="w-4 h-4 text-secondary" />,
      FiTrendingUp: <FiTrendingUp className="w-4 h-4 text-secondary" />,
      FiUsers: <FiUsers className="w-4 h-4 text-secondary" />,
      FiFileText: <FiFileText className="w-4 h-4 text-secondary" />,
      FiUserCheck: <FiUserCheck className="w-4 h-4 text-secondary" />,
    };
    return iconMap[iconName] || null;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar Drawer */}
      <div className="fixed top-0 left-0 h-full w-[300px] bg-white/95 backdrop-blur-xl shadow-2xl z-[60] flex flex-col transform transition-transform duration-300 ease-in-out overflow-y-auto border-r border-white/20">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-purple-50/50">
           <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Menu</h2>
           <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-white hover:shadow-sm transition-all">
             <FiX size={24} className="text-gray-600" />
           </Button>
        </div>

        <div className="p-4 space-y-2 flex-1 overflow-y-auto scrollbar-hide">
          {/* Search removed from here as it's now in the main navbar */}

          <div className="space-y-1.5">
            {links.map((link) => (
              <div key={link.label}>
                {link.submenu ? (
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 px-4 py-3 rounded-xl transition-all font-medium text-[15px]"
                    >
                      {link.label}
                      <FiChevronDown className={`transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </Button>
                    <div className={`grid transition-all duration-300 ease-in-out ${openDropdown === link.label ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="ml-4 mt-1 space-y-1 border-l-2 border-indigo-100 pl-3 py-1">
                          {link.submenu.map((sublink) => (
                            <div key={sublink.label}>
                              {sublink.submenu ? (
                                <div>
                                  <Button
                                    variant="ghost"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const nestedKey = `${link.label}-${sublink.label}`;
                                      setOpenDropdown(openDropdown === nestedKey ? link.label : nestedKey);
                                    }}
                                    className="w-full flex items-center justify-between text-gray-600 hover:text-indigo-600 text-sm py-2 px-3 rounded-lg transition-colors font-medium"
                                  >
                                    {sublink.label}
                                    <FiChevronDown className={`transition-transform duration-300 ${openDropdown === `${link.label}-${sublink.label}` ? 'rotate-180' : ''}`} />
                                  </Button>
                                  <div className={`grid transition-all duration-300 ease-in-out ${openDropdown === `${link.label}-${sublink.label}` ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                                    <div className="overflow-hidden ml-3 space-y-1 pt-1">
                                      {sublink.submenu.map((nestedLink) => (
                                        <Link
                                          key={nestedLink.label}
                                          href={nestedLink.href}
                                          className="flex items-center gap-2.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50/50 text-sm py-2 px-3 rounded-lg transition-all"
                                          onClick={() => {
                                            onClose();
                                            setOpenDropdown(null);
                                          }}
                                        >
                                          {getIcon(nestedLink.icon)}
                                          {nestedLink.label}
                                        </Link>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <Link
                                  href={sublink.href}
                                  className="block text-gray-600 hover:text-indigo-600 hover:bg-indigo-50/50 text-sm py-2 px-3 rounded-lg transition-all font-medium"
                                  onClick={() => {
                                    onClose();
                                    setOpenDropdown(null);
                                  }}
                                >
                                  {sublink.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 px-4 py-3 rounded-xl transition-all font-medium text-[15px]"
                    onClick={() => {
                      onClose();
                      setOpenDropdown(null);
                    }}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 border-t border-gray-100 bg-gray-50/80 backdrop-blur-sm">
          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all cursor-pointer">
                 <ProfileAvatar
                  name={user ? `${user.first_name} ${user.last_name}` : 'User'}
                  src={user?.picture}
                  size={42}
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">{user.first_name} {user.last_name}</p>
                  <p className="text-xs text-indigo-500 font-medium">View Profile</p>
                </div>
              </div>
              <div className="flex gap-2 justify-between px-1">
                  <NavbarIconButton
                     onNotificationsClick={onNotificationsClick}
                     onMeetingsClick={onMeetingsClick}
                     bellButtonRef={bellButtonRef}
                   />
              </div>
            </div>
          ) : (
            <Link key={"signup"} href={"/signup"}>
              <GradientButton className="w-full h-[46px] text-[16px] font-poppins shadow-lg shadow-indigo-200">
                {signUpText}
              </GradientButton>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NavbarMobile;
