import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Sun, Moon } from 'lucide-react';

const WELLNESS_PROMPTS = [
  {
    icon: Heart,
    title: "Self-Care Reminder",
    message: "Remember to take deep breaths and be kind to yourself today. 💙",
    color: "from-pink-400 to-rose-500"
  },
  {
    icon: Sparkles,
    title: "Gratitude Moment",
    message: "What's one small thing you're grateful for right now? ✨",
    color: "from-purple-400 to-indigo-500"
  },
  {
    icon: Sun,
    title: "Positive Affirmation",
    message: "You are capable of handling whatever comes your way today. 🌟",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: Moon,
    title: "Mindful Check-in",
    message: "Take a moment to notice how you're feeling right now. That's enough. 🌙",
    color: "from-blue-400 to-cyan-500"
  }
];

export function WellnessPrompt() {
  const prompt = WELLNESS_PROMPTS[Math.floor(Math.random() * WELLNESS_PROMPTS.length)];
  const Icon = prompt.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-4 mb-4"
    >
      <div className={`bg-gradient-to-r ${prompt.color} rounded-xl p-4 text-white shadow-lg`}>
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
              <Icon size={20} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white mb-1">{prompt.title}</h3>
            <p className="text-white text-opacity-90 text-sm leading-relaxed">
              {prompt.message}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}