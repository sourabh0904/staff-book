import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiCheck, FiBriefcase, FiMail, FiFileText, FiUpload } from 'react-icons/fi';
import { THEME } from '@/styles/theme';

interface EmployerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (details: { companyName: string; gstNumber: string; email: string; file: File | null }) => void;
}

const EmployerVerificationModal: React.FC<EmployerVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerify,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [email, setEmail] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ companyName?: string; gstNumber?: string; email?: string; file?: string }>({});
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const validate = () => {
    const newErrors: { companyName?: string; gstNumber?: string; email?: string; file?: string } = {};
    let isValid = true;

    if (!companyName.trim()) {
      newErrors.companyName = 'Company name is required';
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = 'Professional Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!gstNumber.trim()) {
      newErrors.gstNumber = 'GST Number is required';
      isValid = false;
    } else if (gstNumber.length < 15) {
       // Basic length check for GST (usually 15 chars in India)
      newErrors.gstNumber = 'GST Number must be at least 15 characters';
      isValid = false;
    }

    if (!file) {
      newErrors.file = 'Registration Document is required';
      isValid = false;
    } else if (file.size > 5 * 1024 * 1024) {
      newErrors.file = 'File size must be less than 5MB';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onVerify({ companyName, gstNumber, email, file });
      // Reset form
      setCompanyName('');
      setGstNumber('');
      setEmail('');
      setFile(null);
      setErrors({});
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrors({ ...errors, file: undefined });
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className={`bg-white ${THEME.components.card.radius} shadow-2xl w-full max-w-md overflow-hidden animate-scaleIn border border-gray-100 relative z-[100000] max-h-[90vh] overflow-y-auto`}>
        {/* Header */}
        <div className={`bg-gradient-to-r ${THEME.colors.gradient.sky} p-6 relative overflow-hidden`}>
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-1.5 rounded-full"
          >
            <FiX size={18} />
          </button>
          <div className="flex items-center gap-3 relative z-10">
            <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md shadow-inner">
              <FiBriefcase size={22} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold tracking-tight text-white">Employer Verification</h2>
              <p className="text-indigo-50 text-xs font-medium opacity-90">
                Setup your business profile
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <p className={`${THEME.components.typography.body} leading-relaxed`}>
            To switch to Employer mode, we need to verify your business details.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Company Name */}
            <div className="group">
              <label className={`block ${THEME.components.typography.subheading} mb-1.5 ml-1`}>
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                  <FiBriefcase size={16} />
                </div>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={`${THEME.components.input.default} pl-10 pr-4 !py-2.5`}
                  placeholder="Enter your company name"
                />
              </div>
              {errors.companyName && (
                <p className="mt-1.5 ml-1 text-xs font-medium text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* Professional Email */}
            <div className="group">
              <label className={`block ${THEME.components.typography.subheading} mb-1.5 ml-1`}>
                Professional Email <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                    <FiMail size={16} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${THEME.components.input.default} pl-10 pr-4 !py-2.5`}
                    placeholder="hr@yourcompany.com"
                  />
                </div>
                <button
                  type="button"
                  className={`${THEME.components.button.secondary} px-4 py-2.5 h-[42px]`}
                >
                  Verify
                </button>
              </div>
              {errors.email && (
                <p className="mt-1.5 ml-1 text-xs font-medium text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* GST Number */}
            <div className="group">
              <label className={`block ${THEME.components.typography.subheading} mb-1.5 ml-1`}>
                GST Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 group-focus-within:text-purple-500 transition-colors">
                  <FiFileText size={16} />
                </div>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                  className={`${THEME.components.input.default} pl-10 pr-4 !py-2.5`}
                  placeholder="22AAAAA0000A1Z5"
                  maxLength={15}
                />
              </div>
              {errors.gstNumber && (
                <p className="mt-1.5 ml-1 text-xs font-medium text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.gstNumber}
                </p>
              )}
            </div>

            {/* Registration Document */}
            <div className="group">
              <label className={`block ${THEME.components.typography.subheading} mb-1.5 ml-1`}>
                Registration Document <span className="text-red-500">*</span>
              </label>
              <div 
                className={`relative border-2 border-dashed ${THEME.components.card.radius} p-5 text-center cursor-pointer transition-all ${
                  errors.file ? 'border-red-300 bg-red-50' : `border-gray-200 hover:border-purple-300 hover:bg-purple-50`
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <div className="flex flex-col items-center gap-1.5">
                  <FiUpload size={20} className="text-gray-400" />
                  <p className={`${THEME.components.typography.body} font-medium`}>
                    {file ? file.name : 'Choose file (PDF, JPG, PNG)'}
                  </p>
                  <p className="text-[10px] text-gray-400">Max file size: 5MB</p>
                </div>
              </div>
              {errors.file && (
                <p className="mt-1.5 ml-1 text-xs font-medium text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.file}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className={`flex-1 ${THEME.components.button.outline} py-2.5`}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-[2] ${THEME.components.button.primary} flex items-center justify-center gap-2 py-2.5`}
              >
                <FiCheck size={18} />
                Verify & Switch
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default EmployerVerificationModal;
