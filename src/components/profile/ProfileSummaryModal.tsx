import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';

interface ProfileSummaryModalProps {
  open: boolean;
  onClose: () => void;
  initialData: string;
  onSave: (summary: string) => void;
}

const ProfileSummaryModal: React.FC<ProfileSummaryModalProps> = ({ open, onClose, initialData, onSave }) => {
  const [summary, setSummary] = useState(initialData);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(summary);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Profile Summary</div>
        <textarea
          value={summary}
          onChange={e => setSummary(e.target.value)}
          maxLength={4000}
          rows={6}
          className="w-full text-gray-500 rounded-xl border border-gray-200 bg-gray-50 px-3 py-4 focus:outline-none mb-4"
        />
        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ProfileSummaryModal; 