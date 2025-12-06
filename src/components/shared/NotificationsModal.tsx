'use client';
import { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import Image from 'next/image';
import Link from 'next/link';
import { THEME } from '@/styles/theme';

interface Notification {
  id: string;
  type: 'news' | 'comment' | 'recommendation' | 'like';
  icon: string;
  title: string;
  subtitle?: string;
  timeAgo: string;
  avatar?: string;
  username?: string;
}

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef?: React.RefObject<HTMLButtonElement | null>;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, onClose, buttonRef }) => {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'news',
      icon: '/homePage/google-logo.png',
      title: 'Amazon Executive says Government Regulation of AI Could Limit Progress',
      timeAgo: '6h ago'
    },
    {
      id: '2',
      type: 'comment',
      icon: '/homePage/profile.png',
      title: 'John commented on your post.',
      timeAgo: '3d ago',
      username: 'John'
    },
    {
      id: '3',
      type: 'recommendation',
      icon: '/homePage/logo1.png',
      title: 'HTML CSS Developer Apprentice at Innovate Solutions and 9 other recommendations for you.',
      subtitle: 'Web Developer Role',
      timeAgo: '3d ago'
    },
    {
      id: '4',
      type: 'like',
      icon: '/homePage/profile.png',
      title: 'Your Post was liked by Sarah Smith',
      timeAgo: '6h ago',
      username: 'Sarah Smith'
    },
    {
      id: '5',
      type: 'recommendation',
      icon: '/homePage/logo1.png',
      title: 'HTML CSS Developer Apprentice at Innovate Solutions and 9 other recommendations for you.',
      subtitle: 'Web Developer Role',
      timeAgo: '3d ago'
    },
    {
      id: '6',
      type: 'like',
      icon: '/homePage/profile.png',
      title: 'Your Post was liked by Sarah Smith',
      timeAgo: '6h ago',
      username: 'Sarah Smith'
    },
    {
      id: '7',
      type: 'recommendation',
      icon: '/homePage/logo1.png',
      title: 'HTML CSS Developer Apprentice at Innovate Solutions and 9 other recommendations for you.',
      subtitle: 'Web Developer Role',
      timeAgo: '3d ago'
    },
    {
      id: '8',
      type: 'like',
      icon: '/homePage/profile.png',
      title: 'Your Post was liked by Sarah Smith',
      timeAgo: '6h ago',
      username: 'Sarah Smith'
    }
  ]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      {/* Modal positioned below button */}
      <div className="absolute md:top-[75px] md:right-6 bg-white rounded-xl shadow-xl w-full max-w-sm md:mx-4 md:max-h-[60vh] overflow-y-auto border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 sticky top-0 bg-white z-10">
          <h2 className={`${THEME.components.typography.sectionTitle} text-lg`}>Notifications</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <FiX size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
          {/* Section Header */}
          <div className="px-4 py-3 bg-gray-50/50">
            <h3 className={`${THEME.components.typography.caption} font-semibold uppercase tracking-wider`}>Earlier</h3>
          </div>

          {/* Notifications List */}
          <div className="p-2 space-y-1">
            {notifications.map((notification) => (
              <Link
                href="/profile/notifications"
                key={notification.id}
                className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group"
              >
                {/* Icon/Avatar */}
                <div className="flex-shrink-0">
                  {notification.type === 'comment' || notification.type === 'like' ? (
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-100">
                      <Image
                        src={notification.icon}
                        alt={notification.username || 'User'}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center">
                      <Image
                        src={notification.icon}
                        alt="Icon"
                        width={24}
                        height={24}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`${THEME.components.typography.body} text-gray-900 font-medium leading-snug group-hover:text-primary transition-colors`}>
                    {notification.title}
                  </p>
                  {notification.subtitle && (
                    <p className={`${THEME.components.typography.caption} mt-1`}>
                      {notification.subtitle}
                    </p>
                  )}
                  <p className="text-[10px] text-gray-400 mt-1">
                    {notification.timeAgo}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;