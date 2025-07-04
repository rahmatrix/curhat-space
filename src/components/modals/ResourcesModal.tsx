import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, ExternalLink, Book, Heart, Brain, Zap } from 'lucide-react';
import { MENTAL_HEALTH_RESOURCES } from '../../data/resources';
import { Button } from '../ui/Button';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categoryIcons = {
  crisis: Phone,
  anxiety: Zap,
  depression: Heart,
  stress: Brain,
  general: Book,
  therapy: ExternalLink
};

const categoryColors = {
  crisis: 'bg-red-100 text-red-800 border-red-200',
  anxiety: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  depression: 'bg-blue-100 text-blue-800 border-blue-200',
  stress: 'bg-purple-100 text-purple-800 border-purple-200',
  general: 'bg-green-100 text-green-800 border-green-200',
  therapy: 'bg-indigo-100 text-indigo-800 border-indigo-200'
};

export function ResourcesModal({ isOpen, onClose }: ResourcesModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(MENTAL_HEALTH_RESOURCES.map(r => r.category)))];
  
  const filteredResources = selectedCategory === 'all' 
    ? MENTAL_HEALTH_RESOURCES 
    : MENTAL_HEALTH_RESOURCES.filter(r => r.category === selectedCategory);

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
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-heading-md text-gray-900">Mental Health Resources</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <X size={24} />
              </button>
            </div>

            {/* Category Filter */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-muted-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === 'all' ? 'All Resources' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Resources List */}
            <div className="overflow-y-auto max-h-[60vh] p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredResources.map((resource) => {
                  const Icon = categoryIcons[resource.category] || Book;
                  const colorClass = categoryColors[resource.category] || categoryColors.general;
                  
                  return (
                    <motion.div
                      key={resource.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`p-2 rounded-lg ${colorClass} border`}>
                            <Icon size={16} />
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${colorClass} border`}>
                            {resource.category}
                          </span>
                        </div>
                        {resource.url && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleResourceClick(resource)}
                          >
                            {resource.type === 'hotline' ? (
                              <Phone size={14} />
                            ) : (
                              <ExternalLink size={14} />
                            )}
                          </Button>
                        )}
                      </div>
                      
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {resource.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Emergency:</strong> If you're in immediate danger, call 911
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Crisis Support:</strong> Call 988 (Suicide & Crisis Lifeline) or text HOME to 741741
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}