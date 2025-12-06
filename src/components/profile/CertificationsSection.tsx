'use client'
import React, { useState } from 'react';
import { Plus, Edit2, Award, Calendar } from 'lucide-react';
import { certifications as initialCertifications } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { Certification } from '../../types/profile';
import CertificationModal from './CertificationModal';
import { THEME } from '../../styles/theme';
import Button from '../shared/Button';

const defaultCertification: Certification = {
  name: '',
  role: '',
  startYear: '',
  startMonth: '',
  endYear: '',
  endMonth: '',
  description: '',
  skills: [],
  credentialId: '',
  url: '',
  institution: '',
  location: '',
  issued: '',
  expires: '',
  credentialIdOld: '',
  descriptionOld: '',
  urlOld: '',
};

export default function CertificationsSection() {
  const [certifications, setCertifications] = useState<Certification[]>(
    initialCertifications.map(cert => ({
      ...cert,
      role: '',
      startYear: '',
      startMonth: '',
      endYear: '',
      endMonth: '',
      skills: cert.skills || [],
      credentialId: cert.credentialId || '',
      url: cert.url || '',
      credentialIdOld: '',
      descriptionOld: '',
      urlOld: '',
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

  const handleSave = (cert: Certification) => {
    if (editingIndex === null) {
      setCertifications([...certifications, cert]);
    } else {
      setCertifications(certifications.map((c, i) => (i === editingIndex ? cert : c)));
    }
    setModalOpen(false);
  };

  const handleDelete = () => {
    if (editingIndex !== null) {
      setCertifications(certifications.filter((_, i) => i !== editingIndex));
      setModalOpen(false);
    }
  };

  return (
    <div className={`${THEME.components.card.default} flex flex-col gap-4 relative`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={THEME.components.typography.sectionTitle}>{SITE_CONFIG.certificationsSection.section}</h2>
        <div className="flex gap-2 absolute top-4 right-4">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full w-9 h-9"
            onClick={handleAdd}
            aria-label="Add Certification"
          >
            <Plus size={20} className={`text-[${THEME.colors.primary}]`} />
          </Button>
        </div>
      </div>
      {certifications.map((cert: Certification, idx: number) => (
        <div key={cert.name + idx} className={`${THEME.colors.background.input} rounded-xl p-4 flex flex-col gap-2 relative`}>
          <Button
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 rounded-full w-8 h-8"
            onClick={() => handleEdit(idx)}
            aria-label="Edit Certification"
          >
            <Edit2 size={16} className={`text-[${THEME.colors.primary}]`} />
          </Button>
          <div className="flex items-center justify-between">
            <div className={THEME.components.typography.cardTitle}>{cert.name}</div>
          </div>
          <div className={`flex items-center gap-2 ${THEME.components.typography.meta} mb-1`}>
            <Award size={14} className="inline-block" />
            <span className="font-medium">{cert.institution}</span>
          </div>
          <div className={`flex items-center gap-2 ${THEME.components.typography.meta} mb-1`}>
            <Calendar size={14} className="inline-block" />
            <span>
              Issued {cert.startMonth} {cert.startYear} {cert.endMonth && cert.endYear ? `• Expires ${cert.endMonth} ${cert.endYear}` : ''}
            </span>
          </div>
        </div>
      ))}
      <CertificationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        initialData={editingIndex === null ? defaultCertification : certifications[editingIndex]}
        onSave={handleSave}
        onDelete={editingIndex !== null ? handleDelete : undefined}
      />
    </div>
  );
}