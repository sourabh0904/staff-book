'use client'
import { useState } from 'react';
import { Edit2 } from 'lucide-react';
import { basicDetails as initialBasicDetails } from '../../data/profile';
import type { BasicDetails as BasicDetailsType } from '../../types/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import BasicDetailsModal from './BasicDetailsModal';
import { THEME } from '../../styles/theme';
import Button from '../shared/Button';

export default function BasicDetails() {
  const [basicDetails, setBasicDetails] = useState<BasicDetailsType>(initialBasicDetails);
  const [isBasicDetailsModalOpen, setBasicDetailsModalOpen] = useState(false);

  const handleEditBasicDetails = () => setBasicDetailsModalOpen(true);
  const handleCloseModal = () => setBasicDetailsModalOpen(false);
  const handleSaveBasicDetails = (data: BasicDetailsType) => setBasicDetails(data);

  return (
    <div className={`${THEME.components.card.default} flex flex-col gap-4 relative`}>
      <h2 className={`${THEME.components.typography.sectionTitle} mb-4`}>{SITE_CONFIG.basicDetails.section}</h2>
      <Button
        variant="secondary"
        size="icon"
        className="absolute top-4 right-4 rounded-full w-9 h-9"
        onClick={handleEditBasicDetails}
        aria-label="Edit Profile Summary"
      >
        <Edit2 size={20} className={`text-[${THEME.colors.primary}]`} />
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.basicDetails.totalExperience}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{basicDetails.totalExperience}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.basicDetails.workEmail}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{basicDetails.workEmail}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.basicDetails.location}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{basicDetails.location}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.basicDetails.personalEmail}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{basicDetails.personalEmail}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.basicDetails.currentSalary}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{basicDetails.currentSalary}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.basicDetails.workNoticePeriod}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{basicDetails.workNoticePeriod}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.basicDetails.noticePeriod}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{basicDetails.noticePeriod}</div>
        </div>
        <div>
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.basicDetails.personalContact}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{basicDetails.personalContact}</div>
        </div>
        <div className="md:col-span-2">
          <div className={`${THEME.components.typography.meta} font-medium mb-1`}>{SITE_CONFIG.basicDetails.socialMedia}</div>
          <div className={`${THEME.components.typography.cardTitle} text-sm mb-2`}>{basicDetails.socialMedia}</div>
        </div>
      </div>
      <BasicDetailsModal
        open={isBasicDetailsModalOpen}
        onClose={handleCloseModal}
        initialData={basicDetails}
        onSave={handleSaveBasicDetails}
      />
    </div>
  );
} 