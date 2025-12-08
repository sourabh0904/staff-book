import React from 'react';
import { THEME } from '../../styles/theme';
import Card from '../shared/Card';
import { FiCheck, FiLayout, FiStar } from 'react-icons/fi';

const templates = [
  {
    id: 'professional',
    name: 'Professional',
    description: 'Clean and structured layout suitable for corporate roles.',
    color: 'bg-blue-50',
    accent: 'text-blue-600',
    popular: true,
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with a focus on skills and projects.',
    color: 'bg-purple-50',
    accent: 'text-purple-600',
    popular: false,
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Unique layout for designers and creative professionals.',
    color: 'bg-pink-50',
    accent: 'text-pink-600',
    popular: false,
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    description: 'Simple and elegant design that focuses on content.',
    color: 'bg-gray-50',
    accent: 'text-gray-600',
    popular: false,
  },
  {
    id: 'executive',
    name: 'Executive',
    description: 'Sophisticated design for senior-level positions.',
    color: 'bg-indigo-50',
    accent: 'text-indigo-600',
    popular: true,
  },
  {
    id: 'tech',
    name: 'Tech Focused',
    description: 'Optimized for developers to showcase stack and code.',
    color: 'bg-green-50',
    accent: 'text-green-600',
    popular: false,
  },
];

const ResumeTemplates: React.FC = () => {
  return (
    <div className={`space-y-6 ${THEME.layout.spacing.xl}`}>
      <div className="flex items-center justify-between">
        <h2 className={THEME.components.typography.sectionTitle}>
          Resume Templates
        </h2>
        <p className={THEME.components.typography.body}>
          Choose a template to get started
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <Card key={template.id} hoverEffect className="group cursor-pointer" noPadding>
            {/* Preview Placeholder */}
            <div className={`h-48 ${template.color} relative flex items-center justify-center overflow-hidden`}>
              <div className={`w-32 h-40 bg-white shadow-lg rounded-t-lg transform translate-y-4 group-hover:translate-y-2 transition-transform duration-300 border border-gray-100 p-3`}>
                <div className="space-y-2">
                  <div className="w-1/3 h-2 bg-gray-200 rounded"></div>
                  <div className="w-full h-1 bg-gray-100 rounded"></div>
                  <div className="w-full h-1 bg-gray-100 rounded"></div>
                  <div className="w-2/3 h-1 bg-gray-100 rounded"></div>
                  <div className="mt-4 w-1/4 h-2 bg-gray-200 rounded"></div>
                  <div className="w-full h-1 bg-gray-100 rounded"></div>
                  <div className="w-full h-1 bg-gray-100 rounded"></div>
                </div>
              </div>
              
              {template.popular && (
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-yellow-600 shadow-sm flex items-center gap-1">
                  <FiStar size={10} fill="currentColor" /> Popular
                </div>
              )}
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
            </div>

            <div className="p-5">
              <div className="flex items-center justify-between mb-2">
                <h3 className={`${THEME.components.typography.cardTitle} group-hover:text-indigo-300 transition-colors`}>
                  {template.name}
                </h3>
                <FiLayout className="text-gray-400 group-hover:text-indigo-300 transition-colors" />
              </div>
              <p className={`${THEME.components.typography.body} line-clamp-2 mb-4 h-10`}>
                {template.description}
              </p>
              <button className={`w-full py-2 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 group-hover:border-indigo-300 group-hover:text-indigo-300 group-hover:bg-indigo-50 transition-all`}>
                Use Template
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResumeTemplates;
