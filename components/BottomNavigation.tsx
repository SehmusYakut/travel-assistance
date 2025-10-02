'use client';

import { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isLoading?: boolean;
  onToolSelect?: (tool: 'currency' | 'translator') => void;
}

export const BottomNavigation = ({ 
  activeTab, 
  onTabChange, 
  isLoading = false,
  onToolSelect
}: BottomNavigationProps) => {
  const { t } = useAppContext();
  const [showToolsMenu, setShowToolsMenu] = useState(false);

  const tabs = [
    {
      id: 'location',
      icon: '📍',
      activeIcon: '📍',
      label: t('button.location.short'),
      action: 'findLocation'
    },
    {
      id: 'restaurants',
      icon: '🍽️',
      activeIcon: '🍽️',
      label: t('button.restaurants.short'),
      action: 'restaurants'
    },
    {
      id: 'transport',
      icon: '🚊',
      activeIcon: '🚊',
      label: t('button.transport.short'),
      action: 'transport'
    },
    {
      id: 'tools',
      icon: '🛠️',
      activeIcon: '🛠️',
      label: 'Tools',
      action: 'tools'
    }
  ];

  return (
    <>
      {/* Spacer to prevent content overlap */}
      <div className="h-20 md:hidden" />
      
      {/* Bottom Navigation - Mobile Only */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Tools Menu */}
        {showToolsMenu && (
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 px-4 py-3">
            <div className="flex gap-3 justify-center max-w-md mx-auto">
              <button
                onClick={() => {
                  onToolSelect?.('currency');
                  setShowToolsMenu(false);
                }}
                className="flex flex-col items-center p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
              >
                <span className="text-2xl mb-1">💰</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Döviz</span>
              </button>
              <button
                onClick={() => {
                  onToolSelect?.('translator');
                  setShowToolsMenu(false);
                }}
                className="flex flex-col items-center p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/40 transition-colors"
              >
                <span className="text-2xl mb-1">🗣️</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Çeviri</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Safe area background */}
        <div className="bg-white dark:bg-gray-900 pb-safe">
          {/* Navigation bar */}
          <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 px-2 py-2">
            <div className="flex items-center justify-around max-w-md mx-auto">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.action || 
                  (tab.action === 'findLocation' && activeTab === 'map') ||
                  (tab.action === 'malaysia' && activeTab === 'guide') ||
                  (tab.action === 'indonesia' && activeTab === 'guide') ||
                  (tab.action === 'tools' && showToolsMenu);
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      if (tab.action === 'tools') {
                        setShowToolsMenu(!showToolsMenu);
                      } else {
                        onTabChange(tab.action);
                        setShowToolsMenu(false);
                      }
                    }}
                    disabled={isLoading}
                    className={`flex flex-col items-center justify-center px-2 py-2 min-w-0 flex-1 relative transition-all duration-200 ${
                      isLoading ? 'opacity-50' : ''
                    }`}
                    style={{
                      WebkitTapHighlightColor: 'transparent',
                      touchAction: 'manipulation'
                    }}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full" />
                    )}
                    
                    {/* Icon */}
                    <div className={`text-xl mb-1 transition-all duration-200 ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400 scale-110' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {isActive ? tab.activeIcon : tab.icon}
                    </div>
                    
                    {/* Label */}
                    <span className={`text-xs font-medium transition-colors duration-200 ${
                      isActive 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      {tab.label}
                    </span>
                    
                    {/* Loading indicator */}
                    {isLoading && isActive && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNavigation;
