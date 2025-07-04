import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Check, CheckCheck, ExternalLink, Phone, MessageSquare } from 'lucide-react';
import { Message } from '../../types';
import { Button } from '../ui/Button';

interface MessageBubbleProps {
  message: Message;
  showTimestamp?: boolean;
}

export function MessageBubble({ message, showTimestamp = true }: MessageBubbleProps) {
  const isUser = message.sender === 'user';
  const isCrisis = message.type === 'crisis';

  const handleResourceClick = (resource: any) => {
    if (resource.url) {
      if (resource.url.startsWith('tel:') || resource.url.startsWith('sms:')) {
        window.location.href = resource.url;
      } else {
        window.open(resource.url, '_blank', 'noopener,noreferrer');
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-end space-x-2 mb-4 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-8 h-8 bg-gradient-to-br from-muted-teal-400 to-muted-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">S</span>
        </div>
      )}

      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-xs lg:max-w-md`}>
        {/* Message Bubble */}
        <div
          className={`
            px-4 py-3 rounded-2xl message-shadow
            ${isUser 
              ? 'bg-user-bubble text-gray-800 rounded-br-md' 
              : isCrisis
              ? 'bg-red-50 border-2 border-red-200 text-red-800 rounded-bl-md'
              : 'bg-bot-bubble text-gray-800 rounded-bl-md'
            }
          `}
        >
          <p className="text-body-sm leading-relaxed break-words whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Crisis Alert */}
          {isCrisis && (
            <div className="mt-3 p-3 bg-red-100 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Phone size={16} className="text-red-600" />
                <span className="font-semibold text-red-800">Immediate Help Available</span>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <strong>Crisis Hotline:</strong> 
                  <Button
                    variant="crisis"
                    size="sm"
                    className="ml-2"
                    onClick={() => window.location.href = 'tel:988'}
                  >
                    Call 988
                  </Button>
                </div>
                <div>
                  <strong>Crisis Text:</strong> 
                  <Button
                    variant="crisis"
                    size="sm"
                    className="ml-2"
                    onClick={() => window.location.href = 'sms:741741'}
                  >
                    Text 741741
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Resources */}
          {message.resources && message.resources.length > 0 && (
            <div className="mt-3 space-y-2">
              <div className="text-sm font-medium text-muted-teal-700 mb-2">
                Helpful Resources:
              </div>
              {message.resources.map((resource) => (
                <div
                  key={resource.id}
                  className="bg-white bg-opacity-50 rounded-lg p-3 border border-muted-teal-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-sm text-gray-800 mb-1">
                        {resource.title}
                      </h4>
                      <p className="text-xs text-gray-600 mb-2">
                        {resource.description}
                      </p>
                    </div>
                    {resource.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResourceClick(resource)}
                        className="ml-2 flex-shrink-0"
                      >
                        {resource.type === 'hotline' ? (
                          <Phone size={14} />
                        ) : (
                          <ExternalLink size={14} />
                        )}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Timestamp and Status */}
        {showTimestamp && (
          <div className={`flex items-center space-x-1 mt-1 text-xs text-gray-500 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
            <span>{format(message.timestamp, 'HH:mm')}</span>
            {isUser && (
              <div className="flex items-center">
                {message.isRead ? (
                  <CheckCheck size={12} className="text-muted-teal-500" />
                ) : (
                  <Check size={12} className="text-gray-400" />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}