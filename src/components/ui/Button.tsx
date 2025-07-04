import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'crisis';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const variants = {
  primary: 'bg-muted-teal-500 hover:bg-muted-teal-600 text-white shadow-md',
  secondary: 'bg-soft-sage-500 hover:bg-soft-sage-600 text-white shadow-md',
  outline: 'border-2 border-muted-teal-500 text-muted-teal-600 hover:bg-muted-teal-50',
  ghost: 'text-gray-600 hover:bg-misty-blue-100',
  crisis: 'bg-red-500 hover:bg-red-600 text-white shadow-md animate-pulse-gentle'
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, children, className = '', disabled, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        className={`
          inline-flex items-center justify-center font-medium rounded-lg
          transition-all duration-200 focus-ring
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variants[variant]} ${sizes[size]} ${className}
        `}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';