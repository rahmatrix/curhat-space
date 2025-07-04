import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Heart, Smile, Activity, Coffee, Flag } from 'lucide-react';

const EMOJI_CATEGORIES = [
  {
    name: 'Emotions',
    icon: Heart,
    emojis: ['😊', '😢', '😡', '😰', '🥺', '😔', '😌', '😤', '🥰', '😍', '🤗', '🫂', '💙', '💜', '💖', '✨']
  },
  {
    name: 'Faces',
    icon: Smile,
    emojis: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '🥲', '☺️', '😇', '🥳']
  },
  {
    name: 'Activities',
    icon: Activity,
    emojis: ['🧘', '🏃', '🚶', '💤', '📚', '🎵', '🎨', '✍️', '🌱', '🌟', '⭐', '🌈', '🔥', '💫', '✊', '👏']
  },
  {
    name: 'Nature',
    icon: Coffee,
    emojis: ['🌸', '🌺', '🌻', '🌹', '🌷', '🌿', '🍃', '🌳', '🌲', '🌵', '🌾', '☀️', '🌙', '⭐', '🌟', '💫']
  },
  {
    name: 'Objects',
    icon: Flag,
    emojis: ['💝', '🎁', '🎈', '🎊', '🎉', '🎂', '☕', '🍵', '📱', '💻', '📝', '📖', '🔑', '💡', '🕯️', '🎭']
  }
];

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  className?: string;
}

export function EmojiPicker({ onEmojiSelect, className = '' }: EmojiPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmojis = searchTerm
    ? EMOJI_CATEGORIES.flatMap(cat => cat.emojis).filter(emoji => 
        // Simple filter - in real app would use emoji names/descriptions
        true
      )
    : EMOJI_CATEGORIES[selectedCategory].emojis;

  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-80 ${className}`}>
      {/* Search */}
      <div className="relative mb-3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        <input
          type="text"
          placeholder="Search emojis..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>

      {/* Categories */}
      {!searchTerm && (
        <div className="flex justify-center space-x-1 mb-3">
          {EMOJI_CATEGORIES.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(index)}
                className={`p-2 rounded-lg transition-colors ${
                  selectedCategory === index
                    ? 'bg-primary-100 text-primary-600'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                title={category.name}
              >
                <Icon size={18} />
              </button>
            );
          })}
        </div>
      )}

      {/* Emoji Grid */}
      <div className="grid grid-cols-8 gap-1 max-h-48 overflow-y-auto">
        {filteredEmojis.map((emoji, index) => (
          <motion.button
            key={`${emoji}-${index}`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onEmojiSelect(emoji)}
            className="p-2 text-xl hover:bg-gray-100 rounded-lg transition-colors"
          >
            {emoji}
          </motion.button>
        ))}
      </div>

      {/* Category Name */}
      {!searchTerm && (
        <div className="text-center text-sm text-gray-500 mt-2 font-medium">
          {EMOJI_CATEGORIES[selectedCategory].name}
        </div>
      )}
    </div>
  );
}