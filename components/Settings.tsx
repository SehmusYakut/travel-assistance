'use client';

import React, { useState } from 'react';
import { useAppContext, Language, Theme } from '../contexts/AppContext';

export const SettingsModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose,
}) => {
  const { language, theme, setLanguage, setTheme, t } = useAppContext();
  const [isAnimating, setIsAnimating] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClose();
    }, 200);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-200 ${
            isAnimating ? 'opacity-0' : 'opacity-50'
          }`}
          onClick={handleClose}
        />
        
        {/* Modal */}
        <div
          className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md transform transition-all duration-200 ${
            isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {t('settings.title')}
            </h3>
            <button
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors touch-manipulation"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Language Selection */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.language')}
              </h4>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleLanguageChange('en')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all touch-manipulation ${
                    language === 'en'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg mb-1">🇺🇸</span>
                  <span className="font-medium text-sm">English</span>
                </button>
                <button
                  onClick={() => handleLanguageChange('tr')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all touch-manipulation ${
                    language === 'tr'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg mb-1">🇹🇷</span>
                  <span className="font-medium text-sm">Türkçe</span>
                </button>
                <button
                  onClick={() => handleLanguageChange('ku')}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all touch-manipulation ${
                    language === 'ku'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg mb-1">�️</span>
                  <span className="font-medium text-sm">Kurdî</span>
                </button>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('settings.theme')}
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all touch-manipulation ${
                    theme === 'light'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg mr-2">☀️</span>
                  <span className="font-medium">{t('settings.theme.light')}</span>
                </button>
                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all touch-manipulation ${
                    theme === 'dark'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span className="text-lg mr-2">🌙</span>
                  <span className="font-medium">{t('settings.theme.dark')}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end p-6 pt-0">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-xl transition-colors touch-manipulation font-medium"
            >
              {t('common.close')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const SettingsButton: React.FC = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { theme } = useAppContext();

  return (
    <>
      <button
        onClick={() => setIsSettingsOpen(true)}
        className="fixed top-4 right-4 z-40 p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 touch-manipulation border border-gray-200 dark:border-gray-700"
        aria-label="Settings"
      >
        <svg 
          className="w-5 h-5 text-gray-600 dark:text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
          />
        </svg>
      </button>
      
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
};
