import React from 'react';
import { User } from '../../types';

interface AvatarProps {
  user: User;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  showMood?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
  xl: 'w-16 h-16'
};

const statusClasses = {
  online: 'bg-success-500',
  away: 'bg-warning-500',
  busy: 'bg-error-500',
  offline: 'bg-gray-400'
};

export function Avatar({ user, size = 'md', showStatus = false, showMood = false, className = '' }: AvatarProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <img
        src={user.avatar}
        alt={user.name}
        className={`${sizeClasses[size]} rounded-full object-cover ring-2 ring-white shadow-md`}
      />
      
      {showStatus && (
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${statusClasses[user.status]}`} />
      )}
      
      {showMood && user.mood && (
        <div className="absolute -top-1 -right-1 text-sm bg-white rounded-full p-0.5 shadow-sm border">
          {user.mood}
        </div>
      )}
    </div>
  );
}