import React from 'react';
import Link from 'next/link';
import { FiPlus } from 'react-icons/fi';
import { THEME } from '../../styles/theme';
import Card from '../shared/Card';

const CreateResumeCard: React.FC = () => {
  return (
    <Link href="/profile/resume/create" className="block h-full">
      <Card 
        className="h-full min-h-[200px] border-2 border-dashed border-gray-300 hover:border-primary bg-gray-50 hover:bg-white transition-all duration-300 group flex flex-col items-center justify-center gap-4 cursor-pointer"
        noPadding
      >
        <div className="w-16 h-16 rounded-full bg-white group-hover:bg-light-bg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
          <FiPlus size={32} className="text-gray-400 group-hover:text-primary transition-colors duration-300" />
        </div>
        <div className="text-center">
          <h3 className={`${THEME.components.typography.cardTitle} text-gray-500 group-hover:text-primary transition-colors duration-300`}>
            Create New Resume
          </h3>
          <p className={`${THEME.components.typography.meta} mt-1`}>
            Start from scratch or use a template
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default CreateResumeCard;
