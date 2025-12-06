'use client';
import React from 'react';
import { THEME } from '../../styles/theme';

interface TextInputProps {
  id: string;
  label: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  className?: string;
  inputClassName?: string;
  rightIcon?: React.ReactNode;
}

const TextInput: React.FC<TextInputProps> = ({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  helperText,
  className = '',
  inputClassName = '',
  rightIcon,
}) => {
  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={id} className={`block ${THEME.components.typography.subheading} mb-1`}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`w-full px-5 py-4 ${THEME.colors.text.main} rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 text-base font-medium placeholder:text-gray-400 ${rightIcon ? 'pr-12' : ''} ${inputClassName}`}
        />
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {rightIcon}
          </div>
        )}
      </div>
      {helperText && <p className={`${THEME.components.typography.meta} mt-1`}>{helperText}</p>}
    </div>
  );
};

export default TextInput; 