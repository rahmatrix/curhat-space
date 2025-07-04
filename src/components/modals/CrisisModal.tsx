import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageSquare, AlertTriangle, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CrisisModal({ isOpen, onClose }: CrisisModalProps) {
  const crisisResources = [
    {
      title: 'National Suicide Prevention Lifeline',
      number: '988',
      description: 'Free, confidential support 24/7 for people in distress',
      action: () => window.location.href = 'tel:988'
    },
    {
      title: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text message',
      action: () => window.location.href = 'sms:741741'
    },
    {
      title: 'Emergency Services',
      number: '911',
      description: 'For immediate medical or safety emergencies',
      action: () => window.location.href = 'tel:911'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden"
          >
            {/* Header */}
            <div className="bg-red-50 border-b border-red-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle size={24} className="text-red-600" />
                  <h2 className="text-heading-sm text-red-800 font-semibold">Crisis Support</h2>
                </div>
                <button
                  onClick={onClose}
                  className="text-red-400 hover:text-red-600 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="text-sm text-red-700">
                If you're having thoughts of self-harm or suicide, please reach out for immediate help.
              </p>
            </div>

            {/* Crisis Resources */}
            <div className="p-6 space-y-4">
              {crisisResources.map((resource, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-800 text-sm">
                      {resource.title}
                    </h3>
                    <Button
                      variant="crisis"
                      size="sm"
                      onClick={resource.action}
                      className="ml-2"
                    >
                      {resource.number.includes('Text') ? (
                        <MessageSquare size={14} />
                      ) : (
                        <Phone size={14} />
                      )}
                    </Button>
                  </div>
                  <p className="text-lg font-bold text-gray-900 mb-1">
                    {resource.number}
                  </p>
                  <p className="text-sm text-gray-600">
                    {resource.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Supportive Message */}
            <div className="bg-misty-blue-50 border-t border-misty-blue-200 p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Heart size={20} className="text-muted-teal-600" />
                <span className="font-semibold text-gray-800">You Matter</span>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Your life has value and meaning. These difficult feelings are temporary, 
                but the support available to you is real and immediate. Please reach out.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}