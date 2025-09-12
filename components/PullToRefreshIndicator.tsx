'use client';

import React from 'react';

interface PullToRefreshIndicatorProps {
  pullDistance: number;
  isRefreshing: boolean;
  progress: number;
  shouldRefresh: boolean;
}

export const PullToRefreshIndicator: React.FC<PullToRefreshIndicatorProps> = ({
  pullDistance,
  isRefreshing,
  progress,
  shouldRefresh
}) => {
  if (pullDistance === 0 && !isRefreshing) return null;

  return (
    <div 
      className="absolute top-0 left-0 right-0 flex items-center justify-center z-40 transition-all duration-200"
      style={{
        transform: `translateY(${pullDistance - 60}px)`,
        opacity: pullDistance > 10 ? 1 : 0
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg border border-gray-200 dark:border-gray-600">
        {isRefreshing ? (
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        ) : (
          <div className="relative w-6 h-6">
            {/* Progress circle */}
            <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-gray-300 dark:text-gray-600"
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                strokeDasharray={`${progress * 0.628} 62.8`}
                className={`transition-all duration-200 ${
                  shouldRefresh ? 'text-green-500' : 'text-blue-500'
                }`}
              />
            </svg>
            
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className={`text-sm transition-all duration-200 ${
                shouldRefresh ? 'text-green-500 scale-110' : 'text-blue-500'
              }`}>
                {shouldRefresh ? '🔄' : '⬇️'}
              </span>
            </div>
          </div>
        )}
      </div>
      
      {/* Text indicator */}
      <div className="ml-3 text-sm font-medium text-gray-600 dark:text-gray-300">
        {isRefreshing ? 'Güncelleniyor...' : shouldRefresh ? 'Bırakın' : 'Çekin'}
      </div>
    </div>
  );
};
