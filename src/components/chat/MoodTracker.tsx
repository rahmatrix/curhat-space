import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, TrendingUp, Calendar, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';

const MOOD_OPTIONS = [
  { emoji: '😊', label: 'Happy', color: 'bg-green-100 text-green-800' },
  { emoji: '😔', label: 'Sad', color: 'bg-blue-100 text-blue-800' },
  { emoji: '😰', label: 'Anxious', color: 'bg-yellow-100 text-yellow-800' },
  { emoji: '😡', label: 'Angry', color: 'bg-red-100 text-red-800' },
  { emoji: '😌', label: 'Peaceful', color: 'bg-purple-100 text-purple-800' },
  { emoji: '🤗', label: 'Grateful', color: 'bg-pink-100 text-pink-800' },
  { emoji: '😴', label: 'Tired', color: 'bg-gray-100 text-gray-800' },
  { emoji: '💪', label: 'Motivated', color: 'bg-orange-100 text-orange-800' },
];

interface MoodTrackerProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (mood: string, description: string) => void;
}

export function MoodTracker({ isOpen, onClose, onSubmit }: MoodTrackerProps) {
  const [selectedMood, setSelectedMood] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood) {
      onSubmit(selectedMood, description);
      setSelectedMood('');
      setDescription('');
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="How are you feeling?" size="md">
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select your current mood:
            </label>
            <div className="grid grid-cols-4 gap-3">
              {MOOD_OPTIONS.map((mood) => (
                <motion.button
                  key={mood.label}
                  type="button"
                  onClick={() => setSelectedMood(mood.emoji)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-200 text-center
                    ${selectedMood === mood.emoji
                      ? `${mood.color} border-4 border-primary-500 shadow-lg`
                      : `border-gray-200 hover:border-gray-300 bg-white`}
                  `}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs font-medium text-gray-700">{mood.label}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="mood-description" className="block text-sm font-medium text-gray-700 mb-2">
              What's on your mind? (optional)
            </label>
            <textarea
              id="mood-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Share what's making you feel this way..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={!selectedMood}>
              Save Mood
            </Button>
          </div>
        </form>

        {/* Mood Insights */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
            <TrendingUp size={16} className="mr-2" />
            Your Mood Journey
          </h3>
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">
              Tracking your mood helps you understand patterns and triggers.
            </p>
            <p className="text-sm text-gray-600">
              Remember: All feelings are valid, and it's okay to have difficult days. 💙
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}