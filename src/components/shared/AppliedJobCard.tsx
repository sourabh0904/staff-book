import React from 'react';
import { THEME } from '@/styles/theme';
import { FiPhone, FiMail, FiXCircle, FiCheckCircle, FiClock, FiDownload, FiEye, FiCalendar, FiChevronDown, FiChevronUp, FiBookmark, FiChevronRight } from 'react-icons/fi';

export interface TimelineEvent {
  title: string;
  date: string;
  icon?: React.ReactNode;
  isCompleted?: boolean;
  isCurrent?: boolean;
}

export interface AppliedJobProps {
  recruiter: {
    name: string;
    company: string;
    avatar: string;
    email: string;
  };
  job: {
    title: string;
    appliedDate: string;
  };
  timeline: TimelineEvent[];
  onWithdraw?: () => void;
  onContactPhone?: () => void;
  onContactEmail?: () => void;
}

const AppliedJobCard: React.FC<AppliedJobProps> = ({
  recruiter,
  job,
  timeline,
  onWithdraw,
  onContactPhone,
  onContactEmail,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className={`bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300`}>
      {/* Header: Recruiter Info & Toggle */}
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${THEME.colors.gradient.start} ${THEME.colors.gradient.end} text-white flex items-center justify-center text-xl font-bold flex-shrink-0 relative`}>
            {recruiter.avatar}
            {/* Status Dot (Mock) */}
            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-gray-400 border-2 border-white rounded-full"></div>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-2">
                <h3 className="font-bold text-gray-900 text-base">{recruiter.name}</h3>
            </div>
            <p className="text-gray-500 text-xs font-medium">{recruiter.company}</p>
            <h2 className="text-indigo-600 font-bold text-sm mt-0.5">{job.title}</h2>
            <p className="text-gray-400 text-[10px]">Applied on {job.appliedDate}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
                <FiBookmark size={16} />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            {isOpen ? <FiChevronUp size={20} /> : <FiChevronRight size={20} />}
            </button>
        </div>
      </div>

      {/* Collapsible Content */}
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
        <div className="overflow-hidden">
          {/* Timeline */}
          <div className="relative pl-4 border-l-2 border-gray-100 space-y-8 mb-8 ml-2">
            {timeline.map((event, index) => (
              <div key={index} className="relative">
                {/* Dot */}
                <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                  event.isCurrent ? 'bg-green-500 ring-4 ring-green-100' : 'bg-gray-300'
                }`}></div>
                
                <div className="flex flex-col">
                  <span className={`text-sm font-semibold ${event.isCurrent ? 'text-gray-900' : 'text-gray-500'}`}>
                    {event.title}
                  </span>
                  <span className="text-xs text-gray-400">{event.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <div className="flex gap-3">
              <button 
                onClick={(e) => { e.stopPropagation(); onContactPhone?.(); }}
                className="flex-1 py-2.5 bg-gray-50 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
              >
                <FiPhone size={16} />
                Show Phone Number
              </button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-2 overflow-hidden">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400">
                        <FiMail size={16} />
                    </div>
                    <div className="flex flex-col min-w-0">
                        <span className="text-xs text-gray-500">Email</span>
                        <span className="text-sm font-medium text-gray-900 truncate">{recruiter.email}</span>
                    </div>
                </div>
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center gap-1">
                    <FiCheckCircle size={10} />
                    Verified
                </span>
            </div>

            <button 
              onClick={(e) => { e.stopPropagation(); onWithdraw?.(); }}
              className="w-full py-2.5 text-red-500 text-sm font-medium hover:bg-red-50 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <FiXCircle size={16} />
              Withdraw Application
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedJobCard;
