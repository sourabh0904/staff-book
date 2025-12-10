import Link from "next/link";
import { useState } from "react";
import { FiChevronDown, FiBriefcase, FiEye, FiTrendingUp, FiUsers, FiFileText, FiUserCheck, FiX, FiHome, FiCompass, FiMessageSquare, FiBell, FiCalendar, FiSettings, FiLogOut } from "react-icons/fi";
import { NavLink } from "@/types/navigation";
import NavbarSearch from "./NavbarSearch";
import GradientButton from "../shared/GradientButton";
import ProfileAvatar from "../shared/ProfileAvatar";
import { User } from "@/lib/api";
import { NavbarIconButton } from "../Navbar";
import Button from "../shared/Button";
import { THEME } from "@/styles/theme";

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
    if (!iconName) return <FiCompass className="w-5 h-5 text-gray-400" />;
    const iconMap: { [key: string]: React.ReactNode } = {
      FiBriefcase: <FiBriefcase className="w-5 h-5 text-indigo-500" />,
      FiEye: <FiEye className="w-5 h-5 text-purple-500" />,
      FiTrendingUp: <FiTrendingUp className="w-5 h-5 text-green-500" />,
      FiUsers: <FiUsers className="w-5 h-5 text-blue-500" />,
      FiFileText: <FiFileText className="w-5 h-5 text-orange-500" />,
      FiUserCheck: <FiUserCheck className="w-5 h-5 text-teal-500" />,
      FiHome: <FiHome className="w-5 h-5 text-gray-500" />,
    };
    return iconMap[iconName] || <FiCompass className="w-5 h-5 text-gray-400" />;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] lg:hidden transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Sidebar Drawer */}
      <div className="fixed top-0 right-0 h-full w-[85vw] max-w-[320px] bg-white shadow-2xl z-[110] flex flex-col transform transition-transform duration-300 ease-in-out overflow-hidden rounded-l-2xl border-l border-gray-100">
        
        {/* Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50">
           <div className="flex items-center gap-3">
             {user ? (
               <ProfileAvatar
                 name={`${user.first_name} ${user.last_name}`}
                 src={user.picture}
                 size={40}
               />
             ) : (
               <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                 <FiUsers className="w-5 h-5 text-indigo-600" />
               </div>
             )}
             <div>
               <h2 className="text-lg font-bold text-gray-900">{user ? `Hi, ${user.first_name}` : 'Welcome'}</h2>
               <p className="text-xs text-gray-500">{user ? 'Explore your dashboard' : 'Join our community'}</p>
             </div>
           </div>
           <button 
             onClick={onClose} 
             className="p-2 rounded-full hover:bg-white/50 transition-colors text-gray-500 hover:text-gray-900"
           >
             <FiX size={24} />
           </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 space-y-6">
          
          {/* Main Navigation Links */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Menu</h3>
            {links.map((link) => (
              <div key={link.label} className="group">
                {link.submenu ? (
                  <div className="bg-gray-50/50 rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-50">
                    <button
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between p-3 text-left"
                    >
                      <div className="flex items-center gap-3">
                        {getIcon(link.icon)}
                        <span className="font-medium text-gray-700">{link.label}</span>
                      </div>
                      <FiChevronDown className={`text-gray-400 transition-transform duration-300 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <div className={`grid transition-all duration-300 ease-in-out ${openDropdown === link.label ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                      <div className="overflow-hidden">
                        <div className="px-3 pb-3 space-y-1">
                          {link.submenu.map((sublink) => (
                            <Link
                              key={sublink.label}
                              href={sublink.href}
                              className="flex items-center gap-3 p-2.5 rounded-lg text-sm text-gray-600 hover:bg-white hover:text-indigo-600 hover:shadow-sm transition-all pl-9"
                              onClick={onClose}
                            >
                              {sublink.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-xl text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
                    onClick={onClose}
                  >
                    {getIcon(link.icon)}
                    <span className="font-medium">{link.label}</span>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Quick Actions (User Only) */}
          {user && (
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-2 mb-2">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => { onNotificationsClick(); onClose(); }}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors gap-2"
                >
                  <FiBell size={20} />
                  <span className="text-xs font-medium">Notifications</span>
                </button>
                <button 
                  onClick={() => { onMeetingsClick(); onClose(); }}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors gap-2"
                >
                  <FiCalendar size={20} />
                  <span className="text-xs font-medium">Meetings</span>
                </button>
                <Link 
                  href="/profile/messages"
                  onClick={onClose}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors gap-2"
                >
                  <FiMessageSquare size={20} />
                  <span className="text-xs font-medium">Messages</span>
                </Link>
                <Link 
                  href="/settings"
                  onClick={onClose}
                  className="flex flex-col items-center justify-center p-4 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors gap-2"
                >
                  <FiSettings size={20} />
                  <span className="text-xs font-medium">Settings</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-gray-50">
          {user ? (
            <button className="w-full flex items-center justify-center gap-2 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-medium">
              <FiLogOut size={18} />
              <span>Sign Out</span>
            </button>
          ) : (
            <Link href="/signup" onClick={onClose}>
              <GradientButton className="w-full h-12 shadow-lg shadow-indigo-200">
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
