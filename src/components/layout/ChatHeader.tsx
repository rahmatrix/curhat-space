import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react';
import { Conversation, User } from '../../types';
import { Avatar } from '../ui/Avatar';

interface ChatHeaderProps {
  conversation: Conversation;
  user?: User;
  onBack?: () => void;
  isMobile?: boolean;
}

export function ChatHeader({ conversation, user, onBack, isMobile = false }: ChatHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {isMobile && onBack && (
            <button
              onClick={onBack}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          
          {user ? (
            <Avatar user={user} size="md" showStatus showMood />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium">
                {conversation.name.charAt(0)}
              </span>
            </div>
          )}
          
          <div className="min-w-0">
            <h2 className="font-semibold text-gray-900 truncate">
              {conversation.name}
            </h2>
            {user && (
              <p className="text-sm text-gray-500 capitalize">
                {user.status === 'online' ? 'Active now' : `Last seen ${user.status}`}
              </p>
            )}
            {conversation.description && !user && (
              <p className="text-sm text-gray-500 truncate">
                {conversation.description}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Voice call"
          >
            <Phone size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="Video call"
          >
            <Video size={20} />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            title="More options"
          >
            <MoreVertical size={20} />
          </motion.button>
        </div>
      </div>
    </div>
  );
}