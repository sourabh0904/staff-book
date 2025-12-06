'use client'
import React, { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { profileSummary as initialSummary } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import ProfileSummaryModal from './ProfileSummaryModal';
import { THEME } from '../../styles/theme';
import Button from '../shared/Button';

export default function ProfileSummary() {
  const [summary, setSummary] = useState(initialSummary);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => setIsModalOpen(true);
  const handleSave = (newSummary: string) => setSummary(newSummary);

  return (
    <div className={`${THEME.components.card.default} flex flex-col gap-4 relative`}>
      <div className="flex items-center justify-between mb-2">
        <h2 className={THEME.components.typography.sectionTitle}>{SITE_CONFIG.profileSummary.section}</h2>
        <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 rounded-full w-9 h-9"
          onClick={handleEdit}
          aria-label="Edit Profile Summary"
        >
          <Edit2 size={20} className={`text-[${THEME.colors.primary}]`} />
        </Button>
      </div>
      <p className={`${THEME.components.typography.body} leading-relaxed`}>
        {summary}
      </p>
      <ProfileSummaryModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={summary}
        onSave={handleSave}
      />
    </div>
  );
}