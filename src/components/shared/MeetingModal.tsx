'use client';
import { useState, useEffect } from 'react';
import { FiX, FiCalendar, FiClock, FiUser, FiPlus } from 'react-icons/fi';
import { THEME } from '@/styles/theme';

interface MeetingItem {
  id: string;
  candidateId: string;
  candidateName: string;
  datetime: string; // ISO datetime
  notes?: string;
}

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MeetingModal: React.FC<MeetingModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'requests' | 'past' | 'schedule'>('requests');
  
  // Mock data for demonstration
  const [meetingRequests, setMeetingRequests] = useState([
    { id: 'r1', employer: 'TechCorp Inc.', role: 'Senior React Dev', time: 'Tomorrow, 10:00 AM' },
    { id: 'r2', employer: 'StartupHub', role: 'Frontend Lead', time: 'Fri, 2:00 PM' },
  ]);

  const [pastMeetings, setPastMeetings] = useState([
    { id: 'p1', employer: 'Global Systems', role: 'UI Engineer', date: 'Last Week', status: 'Completed' },
    { id: 'p2', employer: 'Design Studio', role: 'UX Developer', date: '2 weeks ago', status: 'Completed' },
  ]);

  const [newMeeting, setNewMeeting] = useState({
    candidateName: '',
    datetime: '',
    notes: ''
  });

  // Close modal when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleAddMeeting = () => {
    // Logic to add meeting would go here
    console.log("Meeting scheduled:", newMeeting);
    setNewMeeting({ candidateName: '', datetime: '', notes: '' });
    // Switch to requests or show success message
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center md:items-start md:justify-end md:pt-[75px] md:pr-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md mx-4 md:mx-0 max-h-[80vh] flex flex-col border border-gray-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white rounded-t-xl">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 text-white`}>
              <FiCalendar size={20} />
            </div>
            <h2 className={`${THEME.components.typography.sectionTitle} text-lg`}>Meetings</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'requests' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Requests
            {activeTab === 'requests' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'past' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Past
            {activeTab === 'past' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex-1 py-3 text-sm font-medium transition-colors relative ${
              activeTab === 'schedule' ? 'text-purple-600' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Schedule
            {activeTab === 'schedule' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-600" />
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {activeTab === 'requests' && (
            <div className="space-y-3">
              {meetingRequests.map(req => (
                <div key={req.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-900">{req.employer}</h4>
                      <p className="text-xs text-gray-500">{req.role}</p>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                      New
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <FiClock size={14} className="text-gray-400" />
                    <span>{req.time}</span>
                  </div>
                  <div className="flex gap-2">
                    <button className={`flex-1 py-1.5 text-xs font-medium ${THEME.components.button.primary} rounded-lg transition-colors`}>
                      Accept
                    </button>
                    <button className="flex-1 py-1.5 text-xs font-medium bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                      Decline
                    </button>
                  </div>
                </div>
              ))}
              {meetingRequests.length === 0 && (
                <p className="text-center text-gray-400 py-8">No meeting requests</p>
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <div className="space-y-3">
              {pastMeetings.map(meeting => (
                <div key={meeting.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4 opacity-75">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-semibold text-gray-900">{meeting.employer}</h4>
                    <span className="text-xs font-medium px-2 py-1 bg-gray-200 text-gray-600 rounded-full">
                      {meeting.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{meeting.role}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <FiCalendar size={14} className="text-gray-400" />
                    <span>{meeting.date}</span>
                  </div>
                </div>
              ))}
              {pastMeetings.length === 0 && (
                <p className="text-center text-gray-400 py-8">No past meetings</p>
              )}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Schedule with Employer</h3>
              <input
                type="text"
                placeholder="Employer Name"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 text-gray-900 placeholder-gray-400"
                value={newMeeting.candidateName}
                onChange={e => setNewMeeting({...newMeeting, candidateName: e.target.value})}
              />
              <input
                type="datetime-local"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 text-gray-900 placeholder-gray-400"
                value={newMeeting.datetime}
                onChange={e => setNewMeeting({...newMeeting, datetime: e.target.value})}
              />
              <textarea
                placeholder="Message / Notes"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 min-h-[80px] text-gray-900 placeholder-gray-400"
                value={newMeeting.notes}
                onChange={e => setNewMeeting({...newMeeting, notes: e.target.value})}
              />
              <button 
                onClick={handleAddMeeting}
                className={`w-full py-2.5 ${THEME.components.button.primary} rounded-lg shadow-sm font-medium`}
              >
                Send Request
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default MeetingModal;
