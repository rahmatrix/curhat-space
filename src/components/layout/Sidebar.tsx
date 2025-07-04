import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart, TrendingUp, Settings, User, Plus, HelpCircle, Menu, X } from 'lucide-react';
import { User as UserType } from '../../types';
import { Avatar } from '../ui/Avatar';
import { Button } from '../ui/Button';

interface SidebarProps {
  currentUser: UserType;
  onMoodTracker: () => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onToggle?: () => void;
}

const menuItems = [
  { icon: MessageCircle, label: 'Messages', href: '/', active: true },
  { icon: Heart, label: 'Mood Tracker', action: 'mood' },
  { icon: TrendingUp, label: 'Insights', href: '/insights' },
  { icon: HelpCircle, label: 'Support Resources', href: '/resources' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export function Sidebar({ currentUser, onMoodTracker, isMobile = false, isOpen = true, onToggle }: SidebarProps) {
  const handleItemClick = (item: typeof menuItems[0]) => {
    if (item.action === 'mood') {
      onMoodTracker();
    }
    if (isMobile && onToggle) {
      onToggle();
    }
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <Heart size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              SoulConnect
            </h1>
          </div>
          {isMobile && (
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Avatar user={currentUser} size="md" showStatus showMood />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate">{currentUser.name}</h3>
            <p className="text-sm text-gray-500 capitalize">{currentUser.status}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                onClick={() => handleItemClick(item)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                  ${item.active 
                    ? 'bg-primary-100 text-primary-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                  }
                `}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-t border-gray-200">
        <Button
          variant="outline"
          size="sm"
          className="w-full mb-3"
          onClick={() => handleItemClick({ icon: Plus, label: 'New Chat', action: 'new-chat' })}
        >
          <Plus size={16} className="mr-2" />
          New Chat
        </Button>
        
        <div className="text-xs text-gray-500 text-center">
          Remember: You're not alone 💙
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Toggle Button */}
        {!isOpen && (
          <button
            onClick={onToggle}
            className="fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg shadow-md hover:bg-gray-50 transition-colors"
          >
            <Menu size={20} />
          </button>
        )}

        {/* Mobile Sidebar Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onToggle} />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed left-0 top-0 h-full w-72"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="w-72 flex-shrink-0">
      {sidebarContent}
    </div>
  );
}