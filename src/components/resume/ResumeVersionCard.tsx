import React from 'react';
import { FiFileText, FiCalendar, FiEye, FiDownload, FiEdit3, FiCopy, FiTrash2, FiShare2, FiMoreVertical } from 'react-icons/fi';
import { THEME } from '../../styles/theme';
import Card from '../shared/Card';

interface ResumeVersion {
  id: string;
  name: string;
  lastModified: string;
  views: number;
  downloads: number;
  isDefault: boolean;
  template: string;
  size: string;
}

interface ResumeVersionCardProps {
  resume: ResumeVersion;
}

const ResumeVersionCard: React.FC<ResumeVersionCardProps> = ({ resume }) => {
  return (
    <Card hoverEffect className="h-full flex flex-col relative group overflow-hidden" noPadding>
      {/* Top Section with Gradient Background */}
      <div className={`h-24 bg-gradient-to-r from-primary/10 to-gradient-end/10 relative p-4 flex justify-between items-start`}>
        <div className={`w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-primary`}>
          <FiFileText size={24} />
        </div>
        
        {resume.isDefault && (
          <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-primary text-xs font-bold rounded-full shadow-sm border border-white/50">
            DEFAULT
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-4">
          <h3 className={`${THEME.components.typography.cardTitle} mb-1 line-clamp-1 group-hover:text-primary transition-colors`}>
            {resume.name}
          </h3>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <FiCalendar size={12} />
              {resume.lastModified}
            </span>
            <span>•</span>
            <span>{resume.size}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-gray-50 rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
            <span className="text-lg font-bold text-gray-900">{resume.views}</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium flex items-center gap-1">
              <FiEye size={10} /> Views
            </span>
          </div>
          <div className="bg-gray-50 rounded-lg p-2.5 flex flex-col items-center justify-center text-center">
            <span className="text-lg font-bold text-gray-900">{resume.downloads}</span>
            <span className="text-[10px] uppercase tracking-wider text-gray-500 font-medium flex items-center gap-1">
              <FiDownload size={10} /> Downloads
            </span>
          </div>
        </div>

        {/* Actions Footer */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-primary text-white rounded-lg text-sm font-medium hover:bg-[#4a4ccb] transition-colors shadow-sm hover:shadow-md">
            <FiDownload size={16} />
            Download
          </button>
          
          <div className="flex gap-1">
            <button className="p-2 text-gray-500 hover:text-primary hover:bg-light-bg rounded-lg transition-colors" title="Edit">
              <FiEdit3 size={18} />
            </button>
            <button className="p-2 text-gray-500 hover:text-primary hover:bg-light-bg rounded-lg transition-colors" title="Share">
              <FiShare2 size={18} />
            </button>
            <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" title="Delete">
              <FiTrash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ResumeVersionCard;
