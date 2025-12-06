import React from 'react';
import { FiEdit, FiShare, FiBell, FiTrendingUp, FiTrash2 } from 'react-icons/fi';
import { SITE_CONFIG } from '../../../constants/siteconfig';

const PostActionsModal: React.FC<{ isOpen: boolean; onClose: () => void; postId: string; buttonRef: React.RefObject<HTMLButtonElement | null> }> = ({ isOpen, onClose, postId, buttonRef }) => {
  const [position, setPosition] = React.useState({ top: 0, right: 0 });

  React.useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 5,
        right: window.innerWidth - rect.right
      });
    }
  }, [isOpen, buttonRef]);

  const handleAction = (action: string) => {
    console.log(`Action ${action} for post ${postId}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown Modal */}
      <div
        className="fixed bg-white rounded-lg border border-gray-200 shadow-lg z-[60] min-w-[200px] py-2"
        style={{
          top: position.top,
          right: position.right,
        }}
      >
        <div className="py-2">
          <button
            onClick={() => handleAction('edit')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <FiEdit className="w-4 h-4" />
            <span className="text-sm">{SITE_CONFIG.networking.postActions.editPost}</span>
          </button>

          <button
            onClick={() => handleAction('share')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <FiShare className="w-4 h-4" />
            <span className="text-sm">{SITE_CONFIG.networking.postActions.sharePost}</span>
          </button>

          <button
            onClick={() => handleAction('mute')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <FiBell className="w-4 h-4" />
            <span className="text-sm">{SITE_CONFIG.networking.postActions.muteNotifications}</span>
          </button>

          <button
            onClick={() => handleAction('insights')}
            className="w-full flex items-center gap-3 px-4 py-3 text-gray-900 hover:bg-gray-50 transition-colors"
          >
            <FiTrendingUp className="w-4 h-4" />
            <span className="text-sm">{SITE_CONFIG.networking.postActions.insights}</span>
          </button>

          <button
            onClick={() => handleAction('delete')}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors"
          >
            <FiTrash2 className="w-4 h-4" />
            <span className="text-sm">{SITE_CONFIG.networking.postActions.deletePost}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default PostActionsModal;
