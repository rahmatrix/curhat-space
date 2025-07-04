import { motion } from 'framer-motion';
import { format, isToday, isYesterday } from 'date-fns';
import { MessageCircle, Users, Headphones as HeadphonesIcon } from 'lucide-react';
import { Conversation, User } from '../../types';
import { Avatar } from '../ui/Avatar';

interface ConversationListProps {
  conversations: Conversation[];
  users: User[];
  currentConversationId?: string;
  onSelectConversation: (conversationId: string) => void;
}

const typeIcons: Record<Conversation['type'], React.ElementType> = {
  direct: MessageCircle,
  group: Users,
  support: HeadphonesIcon
};

function formatMessageTime(date: Date): string {
  if (isToday(date)) {
    return format(date, 'HH:mm');
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return format(date, 'MMM d');
  }
}

export function ConversationList({ conversations, users, currentConversationId, onSelectConversation }: ConversationListProps) {
  const getConversationUser = (conversation: Conversation): User | undefined => {
    if (conversation.type === 'direct') {
      const otherUserId = conversation.participants.find((id: string) => id !== '1'); // Assuming current user is '1'
      return users.find(user => user.id === otherUserId);
    }
    return undefined;
  };

  const truncateMessage = (content: string, maxLength = 40): string => {
    return content.length > maxLength ? content.substring(0, maxLength) + '...' : content;
  };

  const sortedConversations = [...conversations].sort((a, b) => 
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
      </div>

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto">
        {sortedConversations.map((conversation) => {
          const user = getConversationUser(conversation);
          const Icon = typeIcons[conversation.type];
          const isActive = conversation.id === currentConversationId;

          return (
            <motion.button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full p-4 text-left hover:bg-gray-50 transition-colors border-b border-gray-100
                ${isActive ? 'bg-primary-50 border-r-2 border-r-primary-500' : ''}
              `}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar or Icon */}
                {user ? (
                  <Avatar user={user} size="md" showStatus />
                ) : (
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-gray-900 truncate">
                      {conversation.name}
                    </h3>
                    {conversation.lastMessage && (
                      <span className="text-xs text-gray-500 flex-shrink-0">
                        {formatMessageTime(new Date(conversation.lastMessage.timestamp))}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage 
                        ? truncateMessage(conversation.lastMessage.content)
                        : conversation.description || 'No messages yet'
                      }
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="bg-primary-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center flex-shrink-0 ml-2">
                        {conversation.unreadCount > 99 ? '99+' : conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}