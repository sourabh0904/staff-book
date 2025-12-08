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
  // Mock data for demonstration - in a real app this would come from props or a store
  const [meetings, setMeetings] = useState<MeetingItem[]>([
    {
      id: "m1",
      candidateId: "c1",
      candidateName: "Riya Gopi",
      datetime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      notes: "Initial screening",
    },
    {
      id: "m2",
      candidateId: "c2",
      candidateName: "Arun Verma",
      datetime: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
      notes: "Technical Interview",
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
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
    if (!newMeeting.candidateName || !newMeeting.datetime) return;
    
    const m: MeetingItem = {
      id: "m" + (meetings.length + 1),
      candidateId: "new",
      candidateName: newMeeting.candidateName,
      datetime: newMeeting.datetime,
      notes: newMeeting.notes,
    };
    
    setMeetings([...meetings, m]);
    setNewMeeting({ candidateName: '', datetime: '', notes: '' });
    setShowAddForm(false);
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

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Add Meeting Button */}
          {!showAddForm ? (
            <button 
              onClick={() => setShowAddForm(true)}
              className="w-full py-3 border-2 border-dashed border-indigo-200 rounded-xl text-indigo-400 font-medium hover:bg-indigo-50 hover:border-indigo-300 transition-all flex items-center justify-center gap-2"
            >
              <FiPlus /> Schedule New Meeting
            </button>
          ) : (
            <div className="bg-gray-50 p-4 rounded-xl space-y-3 border border-gray-100">
              <h3 className="font-semibold text-gray-900">New Meeting</h3>
              <input
                type="text"
                placeholder="Candidate Name"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                value={newMeeting.candidateName}
                onChange={e => setNewMeeting({...newMeeting, candidateName: e.target.value})}
              />
              <input
                type="datetime-local"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300"
                value={newMeeting.datetime}
                onChange={e => setNewMeeting({...newMeeting, datetime: e.target.value})}
              />
              <textarea
                placeholder="Notes"
                className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 min-h-[80px]"
                value={newMeeting.notes}
                onChange={e => setNewMeeting({...newMeeting, notes: e.target.value})}
              />
              <div className="flex gap-2 justify-end">
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddMeeting}
                  className="px-3 py-1.5 text-sm bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 shadow-sm"
                >
                  Schedule
                </button>
              </div>
            </div>
          )}

          {/* Meetings List */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Upcoming</h3>
            {meetings.length === 0 ? (
              <p className="text-center text-gray-400 py-4">No upcoming meetings</p>
            ) : (
              meetings.map((meeting) => (
                <div key={meeting.id} className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow group">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
                        <FiUser size={14} />
                      </div>
                      <span className="font-semibold text-gray-900">{meeting.candidateName}</span>
                    </div>
                    <span className="text-xs font-medium px-2 py-1 bg-green-50 text-green-600 rounded-full">
                      Confirmed
                    </span>
                  </div>
                  
                  <div className="space-y-1 ml-10">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiCalendar size={14} className="text-gray-400" />
                      <span>{new Date(meeting.datetime).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FiClock size={14} className="text-gray-400" />
                      <span>{new Date(meeting.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    {meeting.notes && (
                      <p className="text-xs text-gray-400 mt-2 pl-2 border-l-2 border-gray-100">
                        {meeting.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-50 flex justify-end">
                    <button className="text-xs font-medium text-indigo-500 hover:text-indigo-600">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MeetingModal;
