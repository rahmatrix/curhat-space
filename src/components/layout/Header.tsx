import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Menu, HelpCircle, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '../ui/Button';

interface HeaderProps {
  onMenuClick?: () => void;
  onResourcesClick?: () => void;
  onMoodTrackerClick?: () => void;
}

export function Header({ onMenuClick, onResourcesClick, onMoodTrackerClick }: HeaderProps) {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: 'en' | 'id') => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="bg-white border-b border-misty-blue-200 px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-10 h-10 bg-gradient-to-br from-muted-teal-400 to-muted-teal-600 rounded-xl flex items-center justify-center"
          >
            <Heart size={20} className="text-white" />
          </motion.div>
          <div>
            <h1 className="text-heading-sm font-semibold bg-gradient-to-r from-muted-teal-600 to-soft-sage-600 bg-clip-text text-transparent">
              {t('header.title')}
            </h1>
            <p className="text-xs text-gray-500">{t('header.subtitle')}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <div className="hidden sm:flex items-center space-x-1 border border-gray-200 rounded-lg p-1">
            <Button
              size="sm"
              variant={i18n.language === 'en' ? 'primary' : 'ghost'}
              onClick={() => changeLanguage('en')}
              className="!px-2 !py-1 text-xs"
            >
              EN
            </Button>
            <Button
              size="sm"
              variant={i18n.language === 'id' ? 'primary' : 'ghost'}
              onClick={() => changeLanguage('id')}
              className="!px-2 !py-1 text-xs"
            >
              ID
            </Button>
          </div>
          
          {/* Mood Tracker Button (replaces Crisis Button) */}
          <Button
            variant="secondary"
            size="sm"
            onClick={onMoodTrackerClick}
            className="hidden sm:flex"
          >
            <Heart size={16} className="mr-1" />
            {t('header.moodTracker', 'Mood Tracker')}
          </Button>

          {/* Resources Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onResourcesClick}
            className="hidden sm:flex"
          >
            <HelpCircle size={16} className="mr-1" />
            {t('header.resources')}
          </Button>

          {/* Mobile Menu */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="sm:hidden"
          >
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
}