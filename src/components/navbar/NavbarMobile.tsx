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
  bellButtonRef: React.RefObject<HTMLButtonElement | null>;
}

const NavbarMobile = ({ 
  isOpen, 
  onClose, 
  links, 
  user, 
  signUpText,
  onNotificationsClick,
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
        className="fixed inset-0 bg-black/50 z-[55] lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar Drawer */}
      <div className="fixed top-0 left-0 h-full w-[280px] bg-white shadow-2xl z-[60] flex flex-col transform transition-transform duration-300 ease-in-out overflow-y-auto">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
           <h2 className="text-lg font-bold text-gray-900">Menu</h2>
           <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full hover:bg-gray-100">
             <FiX size={24} />
           </Button>
        </div>

        <div className="p-4 space-y-4 flex-1">
          {user && (
            <div className="mb-6">
              <NavbarSearch />
            </div>
          )}

          <div className="space-y-1">
            {links.map((link) => (
              <div key={link.label}>
                {link.submenu ? (
                  <div>
                    <Button
                      variant="ghost"
                      onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                      className="w-full flex items-center justify-between text-gray-700 hover:bg-purple-50 hover:text-purple-600 px-3 py-2 rounded-lg transition-colors font-medium"
                    >
                      {link.label}
                      <FiChevronDown className={`transition-transform ${openDropdown === link.label ? 'rotate-180' : ''}`} />
                    </Button>
                    {openDropdown === link.label && (
                      <div className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-2">
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
                                  className="w-full flex items-center justify-between text-gray-600 hover:text-purple-600 text-sm py-1.5 px-2 rounded-md transition-colors"
                                >
                                  {sublink.label}
                                  <FiChevronDown className={`transition-transform ${openDropdown === `${link.label}-${sublink.label}` ? 'rotate-180' : ''}`} />
                                </Button>
                                {openDropdown === `${link.label}-${sublink.label}` && (
                                  <div className="ml-4 mt-1 space-y-1">
                                    {sublink.submenu.map((nestedLink) => (
                                      <Link
                                        key={nestedLink.label}
                                        href={nestedLink.href}
                                        className="flex items-center gap-2 text-gray-500 hover:text-purple-600 text-xs py-1.5 px-2 rounded-md transition-colors"
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
                                )}
                              </div>
                            ) : (
                              <Link
                                href={sublink.href}
                                className="block text-gray-600 hover:text-purple-600 text-sm py-1.5 px-2 rounded-md transition-colors"
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
                    )}
                  </div>
                ) : (
                  <Link
                    href={link.href}
                    className="block text-gray-700 hover:bg-purple-50 hover:text-purple-600 px-3 py-2 rounded-lg transition-colors font-medium"
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

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          {user ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                 <ProfileAvatar
                  name={user ? `${user.first_name} ${user.last_name}` : 'User'}
                  src={user?.picture}
                  size={40}
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900">{user.first_name} {user.last_name}</p>
                  <p className="text-xs text-gray-500">View Profile</p>
                </div>
              </div>
              <div className="flex gap-2">
                 <NavbarIconButton
                    onNotificationsClick={onNotificationsClick}
                    bellButtonRef={bellButtonRef}
                  />
              </div>
            </div>
          ) : (
            <Link key={"signup"} href={"/signup"}>
              <GradientButton className="w-full h-[42px] text-[16px] font-poppins">
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
