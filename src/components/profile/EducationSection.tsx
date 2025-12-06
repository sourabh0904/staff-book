'use client'
import React, { useState } from 'react';
import { Plus, Edit2, GraduationCap, Calendar, MapPin } from 'lucide-react';
import { education as initialEducation } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { Education as EducationType } from '../../types/profile';
import EducationModal from './EducationModal';
import { THEME } from '../../styles/theme';
import Button from '../shared/Button';

const defaultEducation: EducationType = {
  year: '',
  institution: '',
  course: '',
  specialization: '',
  courseType: '',
  startYear: '',
  endYear: '',
  gradingSystem: '',
  degree: '',
  cgpa: '',
  location: '',
  duration: '',
  description: '',
  achievements: [''],
  skills: [],
};

export default function EducationSection() {
  const [education, setEducation] = useState<EducationType[]>(
    initialEducation.map(edu => ({
      ...edu,
      year: '',
      course: '',
      courseType: '',
      startYear: '',
      endYear: '',
      gradingSystem: '',
    }))
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAdd = () => {
    setEditingIndex(null);
    setModalOpen(true);
  };

  const handleEdit = (idx: number) => {
    setEditingIndex(idx);
    setModalOpen(true);
  };

  const handleSave = (edu: EducationType) => {
    if (editingIndex === null) {
      setEducation([...education, edu]);
    } else {
      setEducation(education.map((e, i) => (i === editingIndex ? edu : e)));
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      setEducation(education.filter((_, i) => i !== editingIndex));
      setModalOpen(false);
    }
  };

  return (
    <div className={`${THEME.components.card.default} flex flex-col gap-4 relative`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={THEME.components.typography.sectionTitle}>{SITE_CONFIG.educationSection.section}</h2>
        <div className="flex gap-2 absolute top-4 right-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-9 h-9"
            onClick={handleAdd}
            aria-label="Add Education"
          >
            <Plus size={20} className={`text-[${THEME.colors.primary}]`} />
          </Button>
        </div>
      </div>
      {education.map((edu: EducationType, idx: number) => (
        <div key={edu.degree + idx} className="bg-white border-b last:border-b-0 rounded-none p-0 pb-6 mb-6 flex flex-col gap-2 relative">
          <div className="flex items-start justify-between">
            <div>
              <div className={`${THEME.components.typography.cardTitle} leading-tight`}>{edu.degree}</div>
              <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{edu.specialization}</div>
            </div>
            <div className="text-base font-bold text-green-600 whitespace-nowrap">{edu.cgpa}</div>
          </div>
          <div className={`flex items-center gap-2 ${THEME.components.typography.body} mb-1 mt-1`}>
            <GraduationCap size={16} className="inline-block" />
            <span className="font-medium">{edu.institution}</span>
            <span className="mx-1">•</span>
            <MapPin size={14} className="inline-block" />
            <span>{edu.location}</span>
          </div>
          <div className={`flex items-center gap-2 ${THEME.components.typography.meta} mb-2`}>
            <Calendar size={14} className="inline-block" />
            <span>
              {edu.startYear && edu.endYear ? `${edu.startYear} - ${edu.endYear}` : edu.duration}
            </span>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">{edu.courseType}</span>
          </div>
          <div className={`${THEME.components.typography.body} mt-2 mb-2`}>{edu.description}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-1`}>Key Achievements</div>
          <ul className={`list-disc ml-6 ${THEME.components.typography.body} mb-2`}>
            {edu.achievements.map((ach, i) => (
              <li key={ach + i}>{ach}</li>
            ))}
          </ul>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-1`}>Skills Used</div>
          <div className="flex flex-wrap gap-2 mb-2">
            {edu.skills.map((skill) => (
              <span key={skill} className={THEME.components.badge.skill}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
      <EducationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingIndex === null ? defaultEducation : education[editingIndex]}
        onSave={handleSave}
        onDelete={editingIndex !== null ? handleDelete : undefined}
      />
    </div>
  );
} 