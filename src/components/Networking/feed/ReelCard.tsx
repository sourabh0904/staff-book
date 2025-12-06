import React from 'react';
import Image from 'next/image';
import { FiPlay } from 'react-icons/fi';
import { Reel } from '../../../data/networking';
import { THEME } from '../../../styles/theme';
import Card from '../../shared/Card';

const ReelCard: React.FC<{ reel: Reel }> = ({ reel }) => {
  return (
    <div className="flex-shrink-0 w-40 sm:w-48 md:w-56">
      <Card noPadding className="h-full bg-transparent border-none shadow-none">
        <div className="relative">
          <Image
            src={reel.thumbnail}
            alt={reel.caption}
            width={224}
            height={300}
            className="w-full h-48 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
              <FiPlay className="w-4 h-4 text-purple-600 ml-0.5" />
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-2 mb-1">
            <Image
              src={reel.author.avatar}
              alt={reel.author.name}
              width={20}
              height={20}
              className="w-5 h-5 rounded-full object-cover"
            />
            <span className={`${THEME.components.typography.cardTitle} text-xs`}>{reel.author.name}</span>
          </div>
          <p className={`${THEME.components.typography.body} text-xs mb-1`}>{reel.caption}</p>
          <p className={THEME.components.typography.meta}>{reel.timestamp} • {reel.views} views</p>
        </div>
      </Card>
    </div>
  );
};

export default ReelCard;
