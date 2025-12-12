import Link from "next/link";
import { useState } from "react";
import { FiChevronDown, FiBriefcase, FiEye, FiTrendingUp, FiUsers, FiFileText, FiUserCheck } from "react-icons/fi";
import { NavLink } from "@/types/navigation";
import Button from "../shared/Button";

interface NavbarDesktopProps {
  links: NavLink[];
  currentPath: string;
}

const NavbarDesktop = ({ links, currentPath }: NavbarDesktopProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const getIcon = (iconName?: string) => {
    if (!iconName) return null;
    const iconMap: { [key: string]: React.ReactNode } = {
      FiBriefcase: <FiBriefcase className="w-4 h-4 text-gray-600" />,
      FiEye: <FiEye className="w-4 h-4 text-gray-600" />,
      FiTrendingUp: <FiTrendingUp className="w-4 h-4 text-gray-600" />,
      FiUsers: <FiUsers className="w-4 h-4 text-gray-600" />,
      FiFileText: <FiFileText className="w-4 h-4 text-gray-600" />,
      FiUserCheck: <FiUserCheck className="w-4 h-4 text-gray-600" />,
    };
    return iconMap[iconName] || null;
  };

  return (
    <nav className="hidden lg:flex items-center gap-6">
      {links.map((link) => (
        <div key={link.label} className="relative">
          {link.submenu ? (
            <div className="relative">
              <Button
                variant="ghost"
                onClick={() => setOpenDropdown(openDropdown === link.label ? null : link.label)}
                className={`text-black text-sm font-medium font-sans px-3 py-2 rounded-full transition-colors flex items-center gap-1 hover:bg-transparent ${
                  currentPath.includes(link.href)
                    ? "bg-light-bg text-black"
                    : "hover:text-primary"
                }`}
              >
                {link.label}
                <FiChevronDown className={`transition-transform w-4 h-4 ${openDropdown === link.label ? 'rotate-180' : ''}`} />
              </Button>
              {openDropdown === link.label && (
                <>
                  <div
                    className="fixed inset-0 z-[60]"
                    onClick={() => setOpenDropdown(null)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-[70]">
                    {link.submenu.map((sublink) => (
                      <div key={sublink.label}>
                        {sublink.submenu ? (
                          <>
                            <div className="px-4 py-2 text-gray-500 text-xs font-semibold uppercase tracking-wider bg-gray-50/50">
                              {sublink.label}
                            </div>
                            <div className="py-1">
                              {sublink.submenu.map((nestedLink) => (
                                <Link
                                  key={nestedLink.label}
                                  href={nestedLink.href}
                                  className="flex items-center gap-3 px-6 py-2 text-gray-700 text-sm font-medium hover:bg-gray-50 hover:text-black transition-colors"
                                  onClick={() => setOpenDropdown(null)}
                                >
                                  {getIcon(nestedLink.icon)}
                                  {nestedLink.label}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            href={sublink.href}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 text-sm font-medium hover:bg-gray-50 hover:text-black transition-colors"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {getIcon(sublink.icon)}
                            {sublink.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link
              href={link.href}
              className={`text-black text-sm font-medium font-sans px-3 py-2 rounded-full ${
                link.href === currentPath
                  ? "bg-light-bg text-black"
                  : "hover:text-primary transition-colors"
              }`}
            >
              {link.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default NavbarDesktop;
