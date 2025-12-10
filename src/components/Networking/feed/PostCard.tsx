'use client';
import React from 'react';
import Image from 'next/image';
import { FiMoreVertical, FiPlay, FiHeart, FiMessageCircle, FiShare2, FiSend, FiUserPlus } from 'react-icons/fi';
import { Post } from '../../../data/networking';
import { SITE_CONFIG } from '../../../constants/siteconfig';
import PostActionsModal from './PostActionsModal';
import { THEME } from '../../../styles/theme';
import Card from '../../shared/Card';
import ConnectButton from '../../shared/ConnectButton';

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  const [showActionsModal, setShowActionsModal] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <>
      <Card className="mb-3 sm:mb-4" noPadding>
        <div className="p-3 sm:p-4">
          {/* Post Header */}
          <Card.Header className="flex items-center justify-between mb-2 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <div>
                <h3 className={THEME.components.typography.cardTitle}>{post.author.name}</h3>
                <p className={THEME.components.typography.meta}>{post.author.title}</p>
                <p className={`${THEME.components.typography.meta} text-[10px]`}>{post.timestamp}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              {post.canConnect && (
                <ConnectButton 
                  label={SITE_CONFIG.networking.connect}
                  variant="outline"
                  className="h-8 px-3 text-xs shadow-none hover:shadow-sm"
                  icon={<FiUserPlus size={14} />}
                  onClick={() => {}} // Add handler if needed
                />
              )}
              <button
                ref={buttonRef}
                className={THEME.components.button.icon}
                onClick={() => setShowActionsModal(true)}
              >
                <FiMoreVertical className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600" />
              </button>
            </div>
          </Card.Header>

          {/* Post Content */}
          <Card.Content className="mb-2 sm:mb-3">
            <p className={THEME.components.typography.body}>{post.content}</p>
          </Card.Content>

          {/* Post Media */}
          {post.media && (
            <Card.ImageContainer className="mb-2 sm:mb-3">
              {post.media.type === 'video' ? (
                <div className="relative">
                  <Image
                    src={post.media.url}
                    alt={post.media.alt}
                    width={400}
                    height={200}
                    className="w-full h-40 sm:h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center">
                      <FiPlay className={`w-5 h-5 sm:w-6 sm:h-6 ${THEME.components.icon.primary} ml-1`} />
                    </div>
                  </div>
                </div>
              ) : (
                <Image
                  src={post.media.url}
                  alt={post.media.alt}
                  width={400}
                  height={200}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg"
                />
              )}
            </Card.ImageContainer>
          )}

          {/* Post Actions */}
          <Card.Footer className="pt-2 sm:pt-3">
            <div className="flex items-center gap-3 sm:gap-4">
              <button className="flex items-center gap-0.5 sm:gap-1 text-gray-600 hover:text-red-500 transition-colors">
                <FiHeart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs">{post.likes}</span>
              </button>
              <button className="flex items-center gap-0.5 sm:gap-1 text-gray-600 hover:text-blue-500 transition-colors">
                <FiMessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs">View {post.comments} comments</span>
              </button>
              <button className="flex items-center gap-0.5 sm:gap-1 text-gray-600 hover:text-green-500 transition-colors">
                <FiShare2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs">{post.shares}</span>
              </button>
            </div>
            <button className={`text-gray-600 hover:text-indigo-300 transition-colors`}>
              <FiSend className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </Card.Footer>
        </div>
      </Card>

      {/* Post Actions Modal */}
      <PostActionsModal
        isOpen={showActionsModal}
        onClose={() => setShowActionsModal(false)}
        postId={post.id}
        buttonRef={buttonRef}
      />
    </>
  );
};

export default PostCard;
