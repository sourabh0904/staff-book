import React from 'react';

interface GradientButtonProps  {
  children: React.ReactNode;
  className?: string;
  onClick?:(e: React.FormEvent<HTMLFormElement>) => void;
}

const GradientButton = ({ children, className = '', onClick, ...props }:GradientButtonProps & React.HTMLAttributes<HTMLDivElement>) => (
  <div
  onClick={onClick}
    className={`rounded-full flex bg-gradient-to-r from-primary to-gradient-end text-white font-semibold shadow-md hover:opacity-90 transition px-6 py-2 ${className}`}
    {...props}
  >
    {children}
  </div>
);

export default GradientButton; 