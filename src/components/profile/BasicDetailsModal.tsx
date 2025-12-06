import React, { useState } from 'react';
import Modal from '../shared/Modal';
import TextInput from '../shared/TextInput';
import Button from '../shared/Button';
import type { BasicDetails } from '../../types/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';

interface BasicDetailsModalProps {
  open: boolean;
  onClose: () => void;
  initialData: BasicDetails;
  onSave: (data: BasicDetails) => void;
}

const BasicDetailsModal: React.FC<BasicDetailsModalProps> = ({ open, onClose, initialData, onSave }) => {
  const [form, setForm] = useState<BasicDetails>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">{SITE_CONFIG.basicDetails.section}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6">
          <TextInput id="totalExperience" label={SITE_CONFIG.basicDetails.totalExperience} value={form.totalExperience} onChange={handleChange} />
          <TextInput id="workEmail" label={SITE_CONFIG.basicDetails.workEmail} value={form.workEmail} onChange={handleChange} />
          <TextInput id="location" label={SITE_CONFIG.basicDetails.location} value={form.location} onChange={handleChange} />
          <TextInput id="personalEmail" label={SITE_CONFIG.basicDetails.personalEmail} value={form.personalEmail} onChange={handleChange} />
          <TextInput id="currentSalary" label={SITE_CONFIG.basicDetails.currentSalary} value={form.currentSalary} onChange={handleChange} />
          <TextInput id="workNoticePeriod" label={SITE_CONFIG.basicDetails.workNoticePeriod} value={form.workNoticePeriod} onChange={handleChange} />
          <TextInput id="noticePeriod" label={SITE_CONFIG.basicDetails.noticePeriod} value={form.noticePeriod} onChange={handleChange} />
          <TextInput id="personalContact" label={SITE_CONFIG.basicDetails.personalContact} value={form.personalContact} onChange={handleChange} />
          <TextInput id="socialMedia" label={SITE_CONFIG.basicDetails.socialMedia} value={form.socialMedia} onChange={handleChange} className="md:col-span-2" />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default BasicDetailsModal; 