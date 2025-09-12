'use client';

import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  disabled?: boolean;
  className?: string;
}

const variantClasses = {
  primary: 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white shadow-blue-100 dark:shadow-blue-900/50 border-0',
  secondary: 'bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600 text-white shadow-slate-100 dark:shadow-slate-900/50 border-0',
  success: 'bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white shadow-emerald-100 dark:shadow-emerald-900/50 border-0',
  warning: 'bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white shadow-amber-100 dark:shadow-amber-900/50 border-0',
  danger: 'bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white shadow-red-100 dark:shadow-red-900/50 border-0',
};

export const ActionButton = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  className = '',
}: ActionButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative px-3 py-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 
        font-medium sm:font-semibold text-xs sm:text-sm lg:text-base
        rounded-lg sm:rounded-xl transition-all duration-200 ease-out
        shadow-md hover:shadow-lg active:shadow-sm
        active:scale-[0.98] hover:scale-[1.02] transform
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-400/50
        dark:focus:ring-offset-gray-800 dark:focus:ring-blue-500/50
        min-h-[2.75rem] sm:min-h-[3.25rem]
        flex items-center justify-center gap-1 sm:gap-2
        backdrop-blur-sm select-none
        ${variantClasses[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
