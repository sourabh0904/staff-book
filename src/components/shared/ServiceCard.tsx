'use client';

import Image from 'next/image';
import { Check } from 'lucide-react';
import { ServicePlan } from '../../types/service';
import Card from './Card';
import { THEME } from '@/styles/theme';

export default function ServiceCard({ title, features, price, image, popular = false }: ServicePlan) {
  return (
    <Card className="relative flex flex-col h-full" hoverEffect noPadding>
      {/* Popular Badge */}
      {popular && (
        <div className={`absolute top-4 right-4 bg-gradient-to-r from-[${THEME.colors.gradient.start}] to-[${THEME.colors.gradient.end}] text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md`}>
          Popular
        </div>
      )}
      
      {/* Image */}
      <div className="w-full h-[160px] bg-gray-100 relative">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover w-full h-full"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white leading-tight shadow-sm">{title}</h3>
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        {/* Features */}
        <div className="flex-1 space-y-3 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`mt-0.5 p-0.5 rounded-full bg-[${THEME.colors.primaryLight}] text-[${THEME.colors.primary}]`}>
                <Check size={12} strokeWidth={3} />
              </div>
              <span className={THEME.components.typography.body}>{feature}</span>
            </div>
          ))}
        </div>
        
        {/* Price */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500 mb-1">Subscription starts from</p>
          <p className={`text-2xl font-bold text-[${THEME.colors.primary}] mb-4`}>
            {price}
          </p>
          
          {/* Know More Button */}
          <button className={`w-full ${THEME.components.button.primary} py-2.5 text-sm shadow-md hover:shadow-lg transform transition-all active:scale-95`}>
            Know more
          </button>
        </div>
      </div>
    </Card>
  );
}