import React, { useState } from 'react';
import Modal from '../shared/Modal';
import Button from '../shared/Button';
import TextInput from '../shared/TextInput';
import SelectInput from '../shared/SelectInput';
import type { Education } from '../../types/profile';

const YEARS = Array.from({ length: 30 }, (_, i) => `${2024 - i}`);
const INSTITUTIONS = [
  'Delhi University- Other',
  'IIT Bombay',
  'IIT Delhi',
  'Other',
];
const COURSES = ['B.Com', 'B.Tech', 'B.A', 'M.Com', 'M.Tech', 'M.A'];
const SPECIALIZATIONS = ['Commerce', 'Computer Science', 'Arts', 'Management'];
const COURSE_TYPES = [
  'Full Time',
  'Part Time',
  'Correspondence/ Distance Learning',
];
const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

interface EducationModalProps {
  open: boolean;
  onClose: () => void;
  initialData: Education;
  onSave: (data: Education) => void;
  onDelete?: () => void;
}

const EducationModal: React.FC<EducationModalProps> = ({ open, onClose, initialData, onSave, onDelete }) => {
  const [form, setForm] = useState<Education>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCourseType = (type: string) => {
    setForm({ ...form, courseType: type });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSave} className="bg-white rounded-2xl w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl sm:text-2xl font-bold text-gray-900">Education</div>
          {onDelete && (
            <Button variant="ghost" className="text-purple-500 font-semibold hover:bg-purple-50" onClick={onDelete}>Delete</Button>
          )}
        </div>
        <div className="mb-4">
          <SelectInput
            id="year"
            label="Education"
            options={YEARS}
            value={form.year || ''}
            onChange={handleChange}
            placeholder="Select Year"
          />
        </div>
        <div className="mb-4">
          <SelectInput
            id="institution"
            label="University/ Institute"
            options={INSTITUTIONS}
            value={form.institution || ''}
            onChange={handleChange}
            placeholder="Select Institution"
          />
        </div>
        <div className="mb-4">
          <SelectInput
            id="course"
            label="Course"
            options={COURSES}
            value={form.course || ''}
            onChange={handleChange}
            placeholder="Select Course"
          />
        </div>
        <div className="mb-4">
          <SelectInput
            id="specialization"
            label="Specialization"
            options={SPECIALIZATIONS}
            value={form.specialization || ''}
            onChange={handleChange}
            placeholder="Select Specialization"
          />
        </div>
        <div className="mb-4">
          <div className="font-medium text-gray-500 mb-2">Course Type</div>
          <div className="flex flex-wrap gap-4">
            {COURSE_TYPES.map(type => (
              <Button
                key={type}
                type="button"
                variant={form.courseType === type ? 'primary' : 'outline'}
                className={`px-4 py-1 rounded-full border ${form.courseType === type ? 'border-transparent' : 'bg-white text-gray-700 border-gray-300'} font-medium transition h-auto`}
                onClick={() => handleCourseType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4">
          <div>
            <SelectInput
              id="startYear"
              label="Course Duration (Start Year)"
              options={YEARS}
              value={form.startYear || ''}
              onChange={handleChange}
              placeholder="Start Year"
            />
          </div>
          <div>
            <SelectInput
              id="endYear"
              label="Course Duration (End Year)"
              options={YEARS}
              value={form.endYear || ''}
              onChange={handleChange}
              placeholder="End Year"
            />
          </div>
        </div>
        <div className="mb-4">
          <SelectInput
            id="gradingSystem"
            label="Grading System"
            options={YEARS}
            value={form.gradingSystem || ''}
            onChange={handleChange}
            placeholder="Select Grading System"
          />
        </div>
        <div className="flex justify-between mt-6 gap-4">
          <Button type="button" variant="outline" className="bg-gray-100 text-purple-700 border border-gray-200 hover:bg-gray-200" onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="primary">Save Changes</Button>
        </div>
      </form>
    </Modal>
  );
};

export default EducationModal; 