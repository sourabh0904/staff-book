'use client'
import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import TextInput from '../shared/TextInput';
import SelectInput from '../shared/SelectInput';
import type { Experience } from '../../types/profile';

const EMPLOYMENT_TYPES = [
  'Full Time',
  'Part Time',
  'Internship',
  'Contract',
  'Freelance',
];
const YEARS = Array.from({ length: 30 }, (_, i) => `${2024 - i}`);
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

interface ExperienceModalProps {
  open: boolean;
  onClose: () => void;
  initialData: Experience;
  onSave: (data: Experience) => void;
  onDelete?: () => void;
}

const ExperienceModal: React.FC<ExperienceModalProps> = ({ open, onClose, initialData, onSave, onDelete }) => {
  const [form, setForm] = useState<Experience>(initialData);
  const [skills, setSkills] = useState<string[]>(form.skills || []);
  const [skillInput, setSkillInput] = useState('');
  const [achievements, setAchievements] = useState<string[]>(form.achievements || ['']);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEmploymentType = (type: string) => {
    setForm({ ...form, employmentType: type });
  };

  const handleCurrentEmployment = (isCurrent: boolean) => {
    setForm({ ...form, isCurrent });
    if (isCurrent) {
      setForm(f => ({ ...f, leavingYear: '', leavingMonth: '' }));
    }
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

  const handleAchievementChange = (idx: number, value: string) => {
    const updated = [...achievements];
    updated[idx] = value;
    setAchievements(updated);
  };
  const handleAddAchievement = () => {
    setAchievements([...achievements, '']);
  };

  const handleRemoveAchievement = (idx: number) => {
    setAchievements(achievements.filter((_, i) => i !== idx));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...form, skills, achievements });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">Experience</div>
          {onDelete && (
            <Button variant="ghost" className="text-purple-500 font-semibold hover:bg-purple-50" onClick={onDelete}>Delete</Button>
          )}
        </div>
        <div className="mb-4">
          <div className="font-medium text-gray-500 mb-2">Is this your current employment?</div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={form.isCurrent} onChange={() => handleCurrentEmployment(true)} className="accent-purple-500" />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={!form.isCurrent} onChange={() => handleCurrentEmployment(false)} className="accent-purple-500" />
              <span>No</span>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <div className="font-medium text-gray-500 mb-2">Employment Type</div>
          <div className="flex flex-wrap gap-4">
            {EMPLOYMENT_TYPES.map(type => (
              <Button
                key={type}
                type="button"
                variant={form.employmentType === type ? 'primary' : 'outline'}
                className={`px-4 py-1 rounded-full border ${form.employmentType === type ? 'border-transparent' : 'bg-white text-gray-700 border-gray-300'} font-medium transition h-auto`}
                onClick={() => handleEmploymentType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4">
          <TextInput id="company" label="Company Name" value={form.company} onChange={handleChange} />
          <TextInput id="role" label="Job Title" value={form.role} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4">
          <div>
            <label className="block text-gray-500 font-medium mb-1">Joining Date</label>
            <div className="flex gap-2">
              <SelectInput
                id="joiningYear"
                label=""
                options={YEARS}
                value={form.joiningYear || ''}
                onChange={e => setForm({ ...form, joiningYear: e.target.value })}
                placeholder="-"
              />
              <SelectInput
                id="joiningMonth"
                label=""
                options={MONTHS}
                value={form.joiningMonth || ''}
                onChange={e => setForm({ ...form, joiningMonth: e.target.value })}
                placeholder="-"
              />
            </div>
          </div>
          <div>
            <label className="block text-gray-500 font-medium mb-1">Leaving Date</label>
            <div className="flex gap-2">
              <SelectInput
                id="leavingYear"
                label=""
                options={YEARS}
                value={form.leavingYear || ''}
                onChange={e => setForm({ ...form, leavingYear: e.target.value })}
                placeholder="-"
                disabled={form.isCurrent}
              />
              <SelectInput
                id="leavingMonth"
                label=""
                options={MONTHS}
                value={form.leavingMonth || ''}
                onChange={e => setForm({ ...form, leavingMonth: e.target.value })}
                placeholder="-"
                disabled={form.isCurrent}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-500 font-medium mb-1">Job Profile</label>
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
          <label className="block text-gray-500 font-medium mb-1">Skills Used</label>
          <input
            type="text"
            value={skillInput}
            onChange={e => setSkillInput(e.target.value)}
            onKeyDown={handleSkillAdd}
            placeholder="Add a skill and press Enter"
            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none mb-2"
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
          <label className="block text-gray-500 font-medium mb-1">Key Achievements</label>
          {achievements.map((ach, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={ach}
                onChange={e => handleAchievementChange(idx, e.target.value)}
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 focus:outline-none"
                placeholder="Achievement"
              />
              {achievements.length > 1 && (
                <button type="button" className="text-red-400 hover:text-red-600 text-lg" onClick={() => handleRemoveAchievement(idx)}>&times;</button>
              )}
            </div>
          ))}
          <Button type="button" variant="ghost" className="text-purple-500 text-sm font-medium mt-1 hover:bg-purple-50" onClick={handleAddAchievement}>Add More</Button>
        </div>
        <div className="flex justify-between mt-6 gap-4">
          <Button type="button" variant="outline" className="bg-gray-100 text-purple-700 border border-gray-200 hover:bg-gray-200" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExperienceModal; 