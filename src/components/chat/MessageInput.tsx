import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Smile } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function MessageInput({ 
  onSendMessage, 
  disabled = false, 
  placeholder 
}: MessageInputProps) {
  const { t } = useTranslation();
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [message]);

  const defaultPlaceholder = placeholder || t('messageInput.placeholder');

  return (
    <div className="border-t border-misty-blue-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex items-end space-x-3">
        {/* Message Input Container */}
        <div className="flex-1 relative">
          <div className="flex items-end bg-misty-blue-50 rounded-2xl border border-misty-blue-200 focus-within:border-muted-teal-500 focus-within:ring-1 focus-within:ring-muted-teal-500">
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={defaultPlaceholder}
              disabled={disabled}
              rows={1}
              className="flex-1 bg-transparent border-none outline-none resize-none px-4 py-3 text-body-sm placeholder-gray-500 max-h-30"
              style={{ minHeight: '48px' }}
            />
            
            {/* Emoji Button */}
            <button
              type="button"
              className="flex-shrink-0 p-2 m-2 rounded-lg transition-colors text-gray-500 hover:text-muted-teal-600 hover:bg-muted-teal-100"
              title="Add emoji"
            >
              <Smile size={20} />
            </button>
          </div>
        </div>

        {/* Send Button */}
        <motion.button
          type="submit"
          whileTap={{ scale: 0.95 }}
          disabled={disabled || !message.trim()}
          className={`flex-shrink-0 p-3 rounded-full transition-all duration-200 ${
            message.trim() && !disabled
              ? 'bg-muted-teal-500 text-white hover:bg-muted-teal-600 shadow-md'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          title="Send message"
        >
          <Send size={20} />
        </motion.button>
      </form>

      {/* Disclaimer */}
      <div className="mt-2 text-xs text-gray-500 text-center">
        {t('messageInput.disclaimer')}
      </div>
    </div>
  );
}