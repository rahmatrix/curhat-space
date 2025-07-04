import React from 'react';
import { motion } from 'framer-motion';

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex items-center space-x-2 px-4 py-2"
    >
      <div className="bg-bot-bubble rounded-2xl rounded-bl-md px-4 py-3 message-shadow">
        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <span className="text-sm text-gray-500 italic">Serenity is typing...</span>
    </motion.div>
  );
}