import React from 'react';
import { Plus, Edit2 } from 'lucide-react';
import { skillGroups } from '../../data/profile';
import { SITE_CONFIG } from '../../constants/siteconfig';
import type { SkillGroup } from '../../types/profile';
import ProfilePerformance from './ProfilePerformance';

import { THEME } from '../../styles/theme';

// ... imports

const SkillsSidebar: React.FC = () => (
  <>
    <div className={`${THEME.components.card.default} flex flex-col gap-4`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className={THEME.components.typography.sectionTitle}>{SITE_CONFIG.skills.section}</h3>
        <div className="flex gap-2">
          <div className={THEME.components.button.icon}>
            <Plus size={20} className={`text-[${THEME.colors.primary}]`} />
          </div>
          <div className={THEME.components.button.icon}>
            <Edit2 size={20} className={`text-[${THEME.colors.primary}]`} />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {skillGroups.map((group: SkillGroup, idx: number) => (
          <div key={group.category + idx}>
            <div className={`${THEME.components.typography.cardTitle} mb-2`}>{group.category}</div>
            <div className="flex flex-wrap gap-3 mb-2">
              {group.skills.map((skill: string) => (
                <span key={skill} className={THEME.components.badge.skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="mt-4 w-full">
      <ProfilePerformance />
    </div>
  </>
);

export default SkillsSidebar; 