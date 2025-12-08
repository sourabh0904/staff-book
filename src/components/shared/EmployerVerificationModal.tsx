import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FiX, FiCheck, FiBriefcase, FiGlobe, FiFileText } from 'react-icons/fi';
import { THEME } from '@/styles/theme';

interface EmployerVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerify: (details: { companyName: string; gstNumber: string; website?: string }) => void;
}

const EmployerVerificationModal: React.FC<EmployerVerificationModalProps> = ({
  isOpen,
  onClose,
  onVerify,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [errors, setErrors] = useState<{ companyName?: string; gstNumber?: string }>({});
  const [mounted, setMounted] = useState(false);

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
    const newErrors: { companyName?: string; gstNumber?: string } = {};
    let isValid = true;

    if (!companyName.trim()) {
      newErrors.companyName = 'Company name is required';
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

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onVerify({ companyName, gstNumber, website });
      // Reset form
      setCompanyName('');
      setGstNumber('');
      setWebsite('');
      setErrors({});
    }
  };

  const modalContent = (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-scaleIn border border-gray-100 relative z-[100000] max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-300 to-purple-300 p-8 text-white relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 hover:bg-white/20 p-2 rounded-full"
          >
            <FiX size={20} />
          </button>
          <div className="flex items-center gap-4 mb-3 relative z-10">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md shadow-inner">
              <FiBriefcase size={28} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Employer Verification</h2>
              <p className="text-indigo-50 text-sm font-medium opacity-90">
                Setup your business profile
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8 space-y-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            To switch to Employer mode, we need to verify your business details. This helps build trust with job seekers.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Company Name */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <div className="relative transition-all duration-300 transform group-focus-within:-translate-y-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-400 transition-colors">
                  <FiBriefcase size={18} />
                </div>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border ${
                    errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  } focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all font-medium text-gray-800 placeholder-gray-400`}
                  placeholder="e.g. Tech Solutions Pvt Ltd"
                />
              </div>
              {errors.companyName && (
                <p className="mt-2 ml-1 text-xs font-medium text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.companyName}
                </p>
              )}
            </div>

            {/* GST Number */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                GST Number <span className="text-red-500">*</span>
              </label>
              <div className="relative transition-all duration-300 transform group-focus-within:-translate-y-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-400 transition-colors">
                  <FiFileText size={18} />
                </div>
                <input
                  type="text"
                  value={gstNumber}
                  onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                  className={`w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border ${
                    errors.gstNumber ? 'border-red-300 bg-red-50' : 'border-gray-200 hover:border-gray-300'
                  } focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all font-medium text-gray-800 placeholder-gray-400`}
                  placeholder="e.g. 22AAAAA0000A1Z5"
                  maxLength={15}
                />
              </div>
              {errors.gstNumber && (
                <p className="mt-2 ml-1 text-xs font-medium text-red-500 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-red-500"></span>
                  {errors.gstNumber}
                </p>
              )}
            </div>

            {/* Website (Optional) */}
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
                Company Website <span className="text-gray-400 font-normal text-xs ml-1">(Optional)</span>
              </label>
              <div className="relative transition-all duration-300 transform group-focus-within:-translate-y-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-indigo-400 transition-colors">
                  <FiGlobe size={18} />
                </div>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 hover:border-gray-300 focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100 focus:outline-none transition-all font-medium text-gray-800 placeholder-gray-400"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-8 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-3.5 border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all focus:ring-4 focus:ring-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-[2] px-6 py-3.5 bg-gradient-to-r from-indigo-300 to-purple-300 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2.5 focus:ring-4 focus:ring-indigo-100"
              >
                <FiCheck size={20} />
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
