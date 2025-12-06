import { FiSearch } from "react-icons/fi";

interface NavbarSearchProps {
  className?: string;
}

const NavbarSearch = ({ className }: NavbarSearchProps) => {
  return (
    <div className={`relative w-full ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="People, Post & Jobs"
        className="block w-full pl-10 pr-3 py-2 border border-white/40 rounded-[10px] leading-5 bg-white/50 backdrop-blur-sm placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary text-sm transition-all duration-300 hover:bg-white/60"
      />
    </div>
  );
};

export default NavbarSearch;
