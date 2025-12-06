import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import TextInput from '../shared/TextInput';
import SelectInput from '../shared/SelectInput';
import type { Certification } from '../../types/profile';

const YEARS = Array.from({ length: 30 }, (_, i) => `${2024 - i}`);
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

interface CertificationModalProps {
  open: boolean;
  onClose: () => void;
  initialData: Certification;
  onSave: (data: Certification) => void;
  onDelete?: () => void;
}

const CertificationModal: React.FC<CertificationModalProps> = ({ open, onClose, initialData, onSave, onDelete }) => {
  const [form, setForm] = useState<Certification>(initialData);
  const [skills, setSkills] = useState<string[]>(form.skills || []);
  const [skillInput, setSkillInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
      e.preventDefault();
    }
  };
  const handleSkillRemove = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, skills });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">Certification</div>
          {onDelete && (
            <Button variant="ghost" className="text-purple-500 font-semibold hover:bg-purple-50" onClick={onDelete}>Delete</Button>
          )}
        </div>
        <div className="mb-4">
          <TextInput id="name" label="Project Title" value={form.name} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <TextInput id="role" label="Role" value={form.role} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 items-end">
          <div className="col-span-2">
            <label className="block text-gray-500 font-medium mb-1">Duration</label>
            <div className="flex gap-2">
              <SelectInput
                id="startYear"
                label=""
                options={YEARS}
                value={form.startYear || ''}
                onChange={e => setForm({ ...form, startYear: e.target.value })}
                placeholder="-"
              />
              <SelectInput
                id="startMonth"
                label=""
                options={MONTHS}
                value={form.startMonth || ''}
                onChange={e => setForm({ ...form, startMonth: e.target.value })}
                placeholder="-"
              />
            </div>
          </div>
          <div className="col-span-2">
            <label className="block text-gray-500 font-medium mb-1">To</label>
            <div className="flex gap-2">
              <SelectInput
                id="endYear"
                label=""
                options={YEARS}
                value={form.endYear || ''}
                onChange={e => setForm({ ...form, endYear: e.target.value })}
                placeholder="-"
              />
              <SelectInput
                id="endMonth"
                label=""
                options={MONTHS}
                value={form.endMonth || ''}
                onChange={e => setForm({ ...form, endMonth: e.target.value })}
                placeholder="-"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-medium mb-1">Project Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            maxLength={4000}
            rows={3}
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none"
          />
          <div className="text-right text-xs text-gray-400 mt-1">4000 Characters</div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-medium mb-1">Skills Acquired</label>
          <input
            type="text"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={handleSkillAdd}
            placeholder="Add a skill and press Enter"
            className="w-full placeholder:text-gray-500 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none mb-2"
          />
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                {skill}
                <button type="button" className="ml-1 text-purple-400 hover:text-purple-700" onClick={() => handleSkillRemove(skill)}>&times;</button>
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <TextInput id="credentialId" label="Credential ID" value={form.credentialId} onChange={handleChange} />
        </div>
        <div className="mb-4">
          <TextInput id="url" label="Credential URL" value={form.url} onChange={handleChange} />
        </div>
        <div className="flex justify-between mt-6 gap-4">
          <Button type="button" variant="outline" className="bg-gray-100 text-purple-700 border border-gray-200 hover:bg-gray-200" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default CertificationModal; 