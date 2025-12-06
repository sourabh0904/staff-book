
import React from 'react';
import { UploadCloud } from 'lucide-react';
import { resumeFile } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import { THEME } from '../../styles/theme';

export default function ResumeUpload() {
  return (
    <div className={`${THEME.components.card.default} flex flex-col gap-4`}>
      <div className="flex items-center justify-between w-full mb-2">
        <h2 className={THEME.components.typography.sectionTitle}>
          {SITE_CONFIG.resume.section} <span className="text-red-500 text-sm font-normal ml-1">{SITE_CONFIG.resume.required}</span>
        </h2>
      </div>
      <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-purple-50 hover:border-purple-200 transition-all cursor-pointer group">
        <div className={`p-4 rounded-full bg-white shadow-sm mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <UploadCloud size={32} className={`text-[${THEME.colors.primary}]`} />
        </div>
        <p className={`${THEME.components.typography.cardTitle} mb-2 group-hover:text-purple-700 transition-colors`}>{SITE_CONFIG.resume.upload}</p>
        <p className={`${THEME.components.typography.body} max-w-xs text-gray-500`}>{SITE_CONFIG.resume.helper}</p>
      </div>
    </div>
  );
} 