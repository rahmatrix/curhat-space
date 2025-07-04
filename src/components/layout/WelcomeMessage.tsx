import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function WelcomeMessage() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6 text-center"
    >
      {/* Hero Section */}
      <div className="mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-muted-teal-400 to-soft-sage-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart size={32} className="text-white" />
        </div>
        <h2 className="text-heading-md text-gray-800 mb-3">
          {t('welcome.title')}
        </h2>
        <p className="text-body-md text-gray-600 leading-relaxed">
          {t('welcome.intro')}
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white bg-opacity-60 rounded-xl p-4 border border-misty-blue-200">
          <Shield size={24} className="text-muted-teal-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800 mb-1">{t('welcome.safeAndPrivate')}</h3>
          <p className="text-sm text-gray-600">{t('welcome.safeAndPrivateDesc')}</p>
        </div>
        
        <div className="bg-white bg-opacity-60 rounded-xl p-4 border border-misty-blue-200">
          <Clock size={24} className="text-muted-teal-500 mx-auto mb-2" />
          <h3 className="font-semibold text-gray-800 mb-1">{t('welcome.available247')}</h3>
          <p className="text-sm text-gray-600">{t('welcome.available247Desc')}</p>
        </div>
      </div>

      {/* Important Disclaimer */}
      <div className="bg-misty-blue-100 rounded-xl p-4 border border-misty-blue-200 mb-6">
        <h3 className="font-semibold text-gray-800 mb-2 flex items-center justify-center">
          <Users size={20} className="mr-2 text-muted-teal-600" />
          {t('welcome.importantToKnow')}
        </h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          {t('welcome.importantDisclaimer')}
        </p>
      </div>

      {/* Getting Started */}
      <div className="text-center">
        <p className="text-body-sm text-gray-600 mb-4">
          {t('welcome.readyToStart')}
        </p>
        <div className="flex flex-wrap justify-center gap-2 text-sm">
          <span className="bg-muted-teal-100 text-muted-teal-700 px-3 py-1 rounded-full">
            "I'm feeling anxious"
          </span>
          <span className="bg-soft-sage-100 text-soft-sage-700 px-3 py-1 rounded-full">
            "I need someone to talk to"
          </span>
          <span className="bg-misty-blue-100 text-misty-blue-700 px-3 py-1 rounded-full">
            "Hello"
          </span>
        </div>
      </div>
    </motion.div>
  );
}