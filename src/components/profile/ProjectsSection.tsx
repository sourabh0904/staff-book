'use client'
import React, { useState } from 'react';
import { Plus, Edit2, Calendar, Link as LinkIcon } from 'lucide-react';
import { projects as initialProjects } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { Project } from '../../types/profile';
import ProjectModal from './ProjectModal';
import { THEME } from '../../styles/theme';
import Card from '../shared/Card';
import Button from '../shared/Button';

const defaultProject: Project = {
  title: '',
  role: '',
  startYear: '',
  startMonth: '',
  endYear: '',
  endMonth: '',
  isOngoing: false,
  description: '',
  achievements: [''],
  skills: [],
  softwares: [],
  link: '',
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
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

  const handleSave = (proj: Project) => {
    if (editingIndex === null) {
      setProjects([...projects, proj]);
    } else {
      setProjects(projects.map((p, i) => (i === editingIndex ? proj : p)));
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      setProjects(projects.filter((_, i) => i !== editingIndex));
      setModalOpen(false);
    }
  };

  return (
    <Card className="flex flex-col gap-4 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className={THEME.components.typography.sectionTitle}>{SITE_CONFIG.projectsSection.section}</h2>
        <div className="flex gap-2 absolute top-4 right-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-9 h-9 hover:bg-purple-100 transition-colors"
            onClick={handleAdd}
            aria-label="Add Project"
          >
            <Plus size={20} className={`text-[${THEME.colors.primary}]`} />
          </Button>
        </div>
      </div>
      {projects.map((proj: Project, idx: number) => (
        <Card key={proj.title + idx} hoverEffect className="p-5 flex flex-col gap-3 relative">
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full w-8 h-8 hover:bg-purple-100 transition-colors"
            onClick={() => handleEdit(idx)}
            aria-label="Edit Project"
          >
            <Edit2 size={16} className={`text-[${THEME.colors.primary}]`} />
          </Button>
          
          <div>
            <div className={`${THEME.components.typography.cardTitle} text-lg mb-1`}>{proj.title}</div>
            <div className={`flex items-center gap-2 ${THEME.components.typography.subheading}`}>
              <span className="font-medium">{proj.role}</span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span className={THEME.components.typography.meta}>
                  {proj.startMonth} {proj.startYear} - {proj.isOngoing ? 'Present' : `${proj.endMonth} ${proj.endYear}`}
                </span>
              </div>
            </div>
          </div>

          <div className={`${THEME.components.typography.body} leading-relaxed`}>{proj.description}</div>
          
          {proj.achievements && proj.achievements.length > 0 && proj.achievements[0] !== '' && (
            <div>
              <div className={`${THEME.components.typography.subheading} font-semibold mb-2`}>Key Achievements</div>
              <ul className="list-disc ml-5 space-y-1">
                {proj.achievements.map((ach, i) => (
                  <li key={ach + i} className={THEME.components.typography.body}>{ach}</li>
                ))}
              </ul>
            </div>
          )}

          {proj.skills && proj.skills.length > 0 && (
            <div>
              <div className={`${THEME.components.typography.subheading} font-semibold mb-2`}>Skills Used</div>
              <div className="flex flex-wrap gap-2">
                {proj.skills.map((skill) => (
                  <span key={skill} className={THEME.components.badge.skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {proj.softwares && proj.softwares.length > 0 && (
            <div>
              <div className={`${THEME.components.typography.subheading} font-semibold mb-2`}>Softwares Used</div>
              <div className="flex flex-wrap gap-2">
                {proj.softwares.map((software) => (
                  <span key={software} className={`${THEME.components.badge.skill} bg-gray-100 text-gray-700`}>
                    {software}
                  </span>
                ))}
              </div>
            </div>
          )}

          {proj.link && (
            <div className="pt-2 border-t border-gray-100 mt-1">
              <a href={proj.link} target="_blank" rel="noopener noreferrer" className={`${THEME.components.typography.link} flex items-center gap-1.5 font-medium`}>
                <LinkIcon size={14} />
                View Project
              </a>
            </div>
          )}
        </Card>
      ))}
      <ProjectModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingIndex === null ? defaultProject : projects[editingIndex]}
        onSave={handleSave}
        onDelete={editingIndex !== null ? handleDelete : undefined}
      />
    </Card>
  );
} 