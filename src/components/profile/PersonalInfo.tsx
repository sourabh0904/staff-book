'use client';
import React from 'react';
import { Edit2 } from 'lucide-react';
import { personalInfo } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { PersonalInfo as PersonalInfoType } from '../../types/profile';
import { THEME } from '../../styles/theme';
import Button from '../shared/Button';

export default function PersonalInfo() {
  const info: PersonalInfoType = personalInfo;

  // Placeholder for handleEdit function, as it's not defined in the original or provided snippet
  const handleEdit = () => {
    console.log('Edit Personal Info clicked');
  };

  return (
    <div className={`${THEME.components.card.default} flex flex-col gap-4 relative`}>
      <h2 className={`${THEME.components.typography.sectionTitle} mb-4`}>{SITE_CONFIG.personalInfo.section}</h2>
      <Button
          variant="secondary"
          size="icon"
          className="absolute top-4 right-4 rounded-full w-9 h-9"
          onClick={handleEdit}
          aria-label="Edit Personal Info"
        >
          <Edit2 size={20} className={`text-[${THEME.colors.primary}]`} />
        </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.personalInfo.gender}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{info.gender}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.personalInfo.maritalStatus}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{info.maritalStatus}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.personalInfo.dob}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{info.dob}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.personalInfo.category}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{info.category}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.personalInfo.workPermit}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{info.workPermit}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.personalInfo.languages}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{info.languages.join(', ')}</div>
        </div>
        <div className="md:col-span-2">
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.personalInfo.address}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{info.address}</div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button 
          variant="outline" 
          className="px-6 py-2 rounded-full text-lg font-semibold text-gray-900 bg-white hover:bg-gray-50"
        >
          {SITE_CONFIG.personalInfo.addMore}
        </Button>
      </div>
    </div>
  );
} 