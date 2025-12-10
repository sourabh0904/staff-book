import React from 'react';
import { FiUserPlus } from 'react-icons/fi';
import { THEME } from '@/styles/theme';

interface ConnectButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
}

const ConnectButton: React.FC<ConnectButtonProps> = ({ 
  label = "Connect", 
  icon, 
  className = "", 
  variant = 'primary',
  ...props 
}) => {
  const baseStyles = "flex items-center gap-2 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600",
    outline: "border border-indigo-200 text-indigo-600 hover:bg-indigo-50",
    ghost: "text-indigo-600 hover:bg-indigo-50 shadow-none hover:shadow-none"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon || <FiUserPlus size={16} />}
      <span>{label}</span>
    </button>
  );
};

export default ConnectButton;
