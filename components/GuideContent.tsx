'use client';

import React, { useState } from 'react';
import { CountryData } from '../models/types';

interface GuideContentProps {
  guideContent: CountryData;
}

export const GuideContent: React.FC<GuideContentProps> = ({ guideContent }) => {
  const [activeTab, setActiveTab] = useState<string>('attractions');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const tabs = [
    { id: 'attractions', label: 'Gezilecek Yerler', shortLabel: 'Yerler', icon: '🏛️' },
    { id: 'transportation', label: 'Ulaşım', shortLabel: 'Ulaşım', icon: '�' },
    { id: 'food', label: 'Yemek', shortLabel: 'Yemek', icon: '�' },
    { id: 'tips', label: 'İpuçları', shortLabel: 'İpuçları', icon: '�' },
    { id: 'safety', label: 'Güvenlik', shortLabel: 'Güvenlik', icon: '⚠️' },
    { id: 'links', label: 'Faydalı Linkler', shortLabel: 'Linkler', icon: '🔗' }
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const renderAttractions = () => (
    <div className="grid grid-cols-1 gap-4 sm:gap-6">
      {guideContent.attractions.map((attraction, index) => (
        <div
          key={index}
          className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
        >
          {/* Card Header */}
          <div className="p-4 sm:p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 pr-3">
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-2 leading-tight">
                  {attraction.name}
                </h3>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center bg-blue-50 text-blue-700 text-xs px-2.5 py-1 rounded-full font-medium">
                    📍 {attraction.city}
                  </span>
                </div>
              </div>
              <button
                onClick={() => toggleCard(index)}
                className="flex-shrink-0 p-2.5 rounded-full bg-gray-50 hover:bg-gray-100 transition-colors touch-manipulation"
                aria-label={expandedCard === index ? 'Detayları Gizle' : 'Detayları Göster'}
              >
                <svg 
                  className={`w-4 h-4 text-gray-600 transform transition-transform duration-200 ${expandedCard === index ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              {attraction.description}
            </p>

            {/* Always visible quick info */}
            <div className="flex flex-wrap gap-2 mt-3">
              {(attraction as any).visitTime && (
                <span className="inline-flex items-center bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                  ⏰ {(attraction as any).visitTime}
                </span>
              )}
              {(attraction as any).entryFee && (
                <span className="inline-flex items-center bg-yellow-50 text-yellow-700 text-xs px-2 py-1 rounded-full">
                  💰 {(attraction as any).entryFee}
                </span>
              )}
            </div>
          </div>

          {/* Expandable Content */}
          <div className={`overflow-hidden transition-all duration-300 ${
            expandedCard === index ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-4 pb-4 sm:px-5 sm:pb-5 border-t border-gray-50">
              <div className="pt-4 space-y-4">
                {(attraction as any).bestTime && (
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-500 text-lg flex-shrink-0">🌅</span>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-gray-900 text-sm">En İyi Zaman:</span>
                      <p className="text-gray-600 text-sm mt-1">{(attraction as any).bestTime}</p>
                    </div>
                  </div>
                )}
                
                {(attraction as any).tips && (
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-500 text-lg flex-shrink-0">💡</span>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-gray-900 text-sm">İpucu:</span>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{(attraction as any).tips}</p>
                    </div>
                  </div>
                )}

                {(attraction as any).coordinates && (
                  <div className="pt-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${(attraction as any).coordinates.lat},${(attraction as any).coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2.5 bg-blue-500 text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition-colors touch-manipulation"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Haritada Göster
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTransportation = () => (
    <div className="grid grid-cols-1 gap-4">
      {(guideContent as any).transportation?.map((transport: any, index: number) => (
        <div
          key={index}
          className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-green-50 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-lg">🚌</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-lg text-gray-900 mb-2">{transport.type}</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {transport.description}
              </p>
              {transport.tips && (
                <div className="bg-green-50 rounded-xl p-3">
                  <div className="flex items-start space-x-2">
                    <span className="text-green-600 text-sm flex-shrink-0 mt-0.5">💡</span>
                    <p className="text-green-800 text-sm font-medium leading-relaxed">{transport.tips}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFood = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {guideContent.food?.map((food, index) => (
        <div
          key={index}
          className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-orange-50 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-lg">🍜</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-lg text-gray-900 mb-2">{food.name}</h4>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {food.description}
              </p>
              
              {(food as any).where && (
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <span className="text-blue-600 text-sm flex-shrink-0 mt-0.5">📍</span>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-gray-900 text-sm">Nerede bulabilirsin:</span>
                      <p className="text-gray-600 text-sm mt-1 leading-relaxed">{(food as any).where}</p>
                    </div>
                  </div>
                  
                  {(food as any).price && (
                    <div className="inline-flex items-center bg-green-50 px-3 py-1.5 rounded-full">
                      <span className="text-green-600 text-sm mr-1">💰</span>
                      <span className="text-green-800 text-sm font-medium">{(food as any).price}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderTips = () => (
    <div className="grid grid-cols-1 gap-4">
      {guideContent.tips?.map((tip, index) => (
        <div
          key={index}
          className="bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-lg">💡</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium">
                {tip.replace(/🏛️|📱|🎭|🌡️|🏨|💰|🚫|📶|🏥|🎯|⚡|🚗|\*\*/g, '').trim()}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSafety = () => (
    <div className="grid grid-cols-1 gap-4">
      {guideContent.safetyWarnings.map((warning, index) => (
        <div
          key={index}
          className="bg-white border border-red-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-300"
        >
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-10 h-10 bg-red-50 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-lg">⚠️</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="bg-red-50 rounded-xl p-3">
                <p className="text-red-800 text-sm sm:text-base leading-relaxed font-medium">
                  {warning.replace(/🚨|🌧️|🦟|🌞|💸|🍖|🚫|🌙|👗|🚔|💊|🌴|\*\*/g, '').trim()}
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLinks = () => (
    <div className="grid grid-cols-1 gap-3">
      {(guideContent as any).usefulLinks?.map((link: any, index: number) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block bg-white border border-gray-100 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 touch-manipulation"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <div className="flex-shrink-0 w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <span className="text-blue-600 text-lg">🌐</span>
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium text-gray-900 text-sm sm:text-base group-hover:text-blue-700 transition-colors">
                  {link.name.replace(/🏛️|🚇|✈️|🌴|📋|🌦️|🚌|🍕|📱|🏨/g, '').trim()}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0 ml-3">
              <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </div>
        </a>
      ))}
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'attractions':
        return renderAttractions();
      case 'transportation':
        return renderTransportation();
      case 'food':
        return renderFood();
      case 'tips':
        return renderTips();
      case 'safety':
        return renderSafety();
      case 'links':
        return renderLinks();
      default:
        return renderAttractions();
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Tab Navigation */}
      <div className="bg-gray-50/50 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-10">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-3 sm:px-4 py-4 font-medium text-xs sm:text-sm transition-all duration-200 border-b-2 touch-manipulation ${
                activeTab === tab.id
                  ? 'border-blue-500 bg-white text-blue-600 shadow-sm'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50/80'
              }`}
            >
              <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 min-w-0">
                <span className="text-base sm:text-lg flex-shrink-0">{tab.icon}</span>
                <span className="whitespace-nowrap text-center sm:text-left">
                  <span className="sm:hidden">{tab.shortLabel}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Mobile Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
              <span className="text-2xl">
                {tabs.find(tab => tab.id === activeTab)?.icon}
              </span>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.label}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {activeTab === 'attractions' && `${guideContent.attractions.length} yer`}
                {activeTab === 'transportation' && `${(guideContent as any).transportation?.length || 0} seçenek`}
                {activeTab === 'food' && `${guideContent.food?.length || 0} yemek`}
                {activeTab === 'tips' && `${guideContent.tips?.length || 0} ipucu`}
                {activeTab === 'safety' && `${guideContent.safetyWarnings?.length || 0} uyarı`}
                {activeTab === 'links' && `${(guideContent as any).usefulLinks?.length || 0} link`}
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
