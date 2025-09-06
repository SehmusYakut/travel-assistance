'use client';

import React, { useState } from 'react';
import { CountryData } from '../models/types';
import { useApp } from '../contexts/AppContext';

interface GuideContentProps {
  guideContent: CountryData;
}

export const GuideContent: React.FC<GuideContentProps> = ({ guideContent }) => {
  const { t } = useApp();
  const [activeTab, setActiveTab] = useState<string>('attractions');
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedCards(newExpanded);
  };

  const tabs = [
    { id: 'attractions', label: t('guide.attractions'), shortLabel: t('guide.attractions.short'), icon: '🏛️' },
    { id: 'food', label: t('guide.food'), shortLabel: t('guide.food'), icon: '🍜' },
    { id: 'tips', label: t('guide.tips'), shortLabel: t('guide.tips'), icon: '💡' },
    { id: 'safety', label: t('guide.safety'), shortLabel: t('guide.safety'), icon: '⚠️' }
  ];

  const renderAttractions = () => (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      {guideContent.attractions.map((attraction, index) => {
        const isExpanded = expandedCards.has(index);
        const hasLocationInfo = attraction.location || attraction.mapUrl;
        
        return (
          <div
            key={index}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Card Header - Always Visible */}
            <div className="p-4 sm:p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2 leading-tight pr-2">
                    {attraction.name}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="text-blue-500 mr-2">📍</span>
                    <span>{attraction.city || 'Turistik Yer'}</span>
                  </div>
                </div>
                
                {/* Expand/Collapse Button */}
                <button
                  onClick={() => toggleCard(index)}
                  className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors ml-2"
                  aria-label={isExpanded ? "Daralt" : "Genişlet"}
                >
                  <svg
                    className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {/* Short Description - Always Visible */}
              <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-2">
                {attraction.description}
              </p>
            </div>

            {/* Expandable Content */}
            {isExpanded && (
              <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-gray-100 dark:border-slate-700 pt-4 space-y-4 animate-fadeIn">
                {/* Full Description */}
                <div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
                    {attraction.description}
                  </p>
                </div>

                {/* Transport Information */}
                {attraction.transport && (
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 sm:p-4">
                    <div className="flex items-start">
                      <span className="text-blue-500 text-lg mr-3 mt-0.5">🚌</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-300 text-sm mb-1">
                          {t('guide.transportation')}
                        </h4>
                        <p className="text-blue-700 dark:text-blue-300 text-sm leading-relaxed">
                          {attraction.transport}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location Actions */}
                {hasLocationInfo && (
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    {/* Google Maps Link */}
                    {attraction.location && (
                      <a
                        href={`https://www.google.com/maps?q=${attraction.location.lat},${attraction.location.lng}&z=16`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                      >
                        <span className="mr-2">🗺️</span>
                        {t('guide.showOnMap')}
                      </a>
                    )}

                    {/* Custom Map URL if provided */}
                    {attraction.mapUrl && (
                      <a
                        href={attraction.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm font-medium shadow-sm hover:shadow-md"
                      >
                        <span className="mr-2">📍</span>
                        Detaylı Konum
                      </a>
                    )}
                  </div>
                )}

                {/* Coordinates Info (for debugging/advanced users) */}
                {attraction.location && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-mono bg-gray-50 dark:bg-slate-700 rounded-lg p-2">
                    📍 {attraction.location.lat.toFixed(6)}, {attraction.location.lng.toFixed(6)}
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderFood = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
      {guideContent.food?.map((food, index) => (
        <div
          key={index}
          className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 flex-1 leading-tight">
              {food.name}
            </h3>
            <span className="text-2xl ml-2 flex-shrink-0">🍽️</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {food.description}
          </p>
        </div>
      )) || <div className="text-center text-gray-500">Henüz yemek bilgisi yok</div>}
    </div>
  );

  const renderTips = () => (
    <div className="space-y-4">
      {guideContent.tips?.map((tip, index) => (
        <div
          key={index}
          className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-2xl p-4 sm:p-5"
        >
          <div className="flex items-start space-x-3">
            <span className="text-blue-500 text-xl flex-shrink-0">💡</span>
            <div className="flex-1">
              <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">{tip}</p>
            </div>
          </div>
        </div>
      )) || <div className="text-center text-gray-500">Henüz ipucu yok</div>}
    </div>
  );

  const renderSafety = () => (
    <div className="space-y-4">
      {guideContent.safetyWarnings?.map((warning, index) => (
        <div
          key={index}
          className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-2xl p-4 sm:p-5"
        >
          <div className="flex items-start space-x-3">
            <span className="text-red-500 text-xl flex-shrink-0">⚠️</span>
            <div className="flex-1">
              <p className="text-red-800 dark:text-red-300 text-sm leading-relaxed">{warning}</p>
            </div>
          </div>
        </div>
      )) || <div className="text-center text-gray-500">Güvenlik uyarısı yok</div>}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'attractions':
        return renderAttractions();
      case 'food':
        return renderFood();
      case 'tips':
        return renderTips();
      case 'safety':
        return renderSafety();
      default:
        return renderAttractions();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      <div className="p-4 sm:p-6">
        {/* Mobile Tab Navigation */}
        <div className="block sm:hidden mb-6">
          <div className="grid grid-cols-2 gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-lg transition-all touch-manipulation ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                }`}
              >
                <span className="text-lg mb-1">{tab.icon}</span>
                <span className="text-xs font-medium">{tab.shortLabel}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop Tab Navigation */}
        <div className="hidden sm:block mb-8">
          <div className="flex flex-wrap gap-2 bg-gray-100 dark:bg-gray-700 rounded-2xl p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-blue-600 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-600'
                }`}
              >
                <span className="text-xl mr-3">{tab.icon}</span>
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">
                {tabs.find(tab => tab.id === activeTab)?.icon}
              </span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {activeTab === 'attractions' && `${guideContent.attractions.length} yer`}
                {activeTab === 'food' && `${guideContent.food?.length || 0} yemek`}
                {activeTab === 'tips' && `${guideContent.tips?.length || 0} ipucu`}
                {activeTab === 'safety' && `${guideContent.safetyWarnings?.length || 0} uyarı`}
              </p>
            </div>
          </div>
        </div>

        <div className="animate-fadeIn">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
