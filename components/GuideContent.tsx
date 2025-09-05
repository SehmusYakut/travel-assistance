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
    { id: 'attractions', label: '🏛️ Gezilecek Yerler', icon: '🗺️' },
    { id: 'transportation', label: '🚌 Ulaşım', icon: '🚗' },
    { id: 'food', label: '🍜 Yemek', icon: '🍽️' },
    { id: 'tips', label: '💡 İpuçları', icon: '💭' },
    { id: 'safety', label: '⚠️ Güvenlik', icon: '🛡️' },
    { id: 'links', label: '🔗 Linkler', icon: '🌐' }
  ];

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  const renderAttractions = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {guideContent.attractions.map((attraction, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 border border-blue-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-xl text-gray-900 mb-2 flex items-center">
                  <span className="text-blue-500 text-lg mr-2">📍</span>
                  {attraction.name}
                </h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full font-medium">
                  {attraction.city}
                </span>
              </div>
              <button
                onClick={() => toggleCard(index)}
                className="ml-4 p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              >
                <span className={`transform transition-transform duration-200 ${expandedCard === index ? 'rotate-180' : ''}`}>
                  ⬇️
                </span>
              </button>
            </div>

            <p className="text-gray-700 leading-relaxed mb-4">
              {attraction.description}
            </p>

            {/* Expanded Content */}
            <div className={`overflow-hidden transition-all duration-300 ${
              expandedCard === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="border-t pt-4 space-y-3">
                {(attraction as any).visitTime && (
                  <div className="flex items-center text-sm">
                    <span className="text-green-600 mr-2">⏰</span>
                    <span className="font-medium text-gray-800">Ziyaret Süresi:</span>
                    <span className="ml-2 text-gray-600">{(attraction as any).visitTime}</span>
                  </div>
                )}
                
                {(attraction as any).entryFee && (
                  <div className="flex items-center text-sm">
                    <span className="text-yellow-600 mr-2">💰</span>
                    <span className="font-medium text-gray-800">Giriş Ücreti:</span>
                    <span className="ml-2 text-gray-600">{(attraction as any).entryFee}</span>
                  </div>
                )}
                
                {(attraction as any).bestTime && (
                  <div className="flex items-center text-sm">
                    <span className="text-purple-600 mr-2">🌅</span>
                    <span className="font-medium text-gray-800">En İyi Zaman:</span>
                    <span className="ml-2 text-gray-600">{(attraction as any).bestTime}</span>
                  </div>
                )}
                
                {(attraction as any).tips && (
                  <div className="text-sm">
                    <div className="flex items-start">
                      <span className="text-blue-600 mr-2 mt-0.5">💡</span>
                      <div>
                        <span className="font-medium text-gray-800">İpucu:</span>
                        <p className="text-gray-600 mt-1">{(attraction as any).tips}</p>
                      </div>
                    </div>
                  </div>
                )}

                {(attraction as any).coordinates && (
                  <div className="pt-2">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${(attraction as any).coordinates.lat},${(attraction as any).coordinates.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-2 bg-blue-500 text-white text-xs font-medium rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      <span className="mr-1">🗺️</span>
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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {(guideContent as any).transportation?.map((transport: any, index: number) => (
        <div
          key={index}
          className="bg-gradient-to-br from-green-50 via-white to-emerald-50 border border-green-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center mb-3">
            <span className="text-green-500 text-xl mr-3">🚌</span>
            <h4 className="font-bold text-lg text-gray-900">{transport.type}</h4>
          </div>
          <p className="text-gray-700 text-sm mb-3 leading-relaxed">
            {transport.description}
          </p>
          {transport.tips && (
            <div className="bg-green-100 rounded-lg p-3">
              <div className="flex items-start">
                <span className="text-green-600 mr-2 text-sm">💡</span>
                <p className="text-green-800 text-xs font-medium">{transport.tips}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderFood = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {guideContent.food?.map((food, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-orange-50 via-white to-red-50 border border-orange-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-center mb-3">
            <span className="text-orange-500 text-xl mr-3">🍜</span>
            <h4 className="font-bold text-lg text-gray-900">{food.name}</h4>
          </div>
          <p className="text-gray-700 text-sm mb-4 leading-relaxed">
            {food.description}
          </p>
          
          {(food as any).where && (
            <div className="space-y-2">
              <div className="flex items-start text-xs">
                <span className="text-blue-600 mr-2">📍</span>
                <div>
                  <span className="font-medium text-gray-800">Nerede:</span>
                  <p className="text-gray-600 mt-1">{(food as any).where}</p>
                </div>
              </div>
              
              {(food as any).price && (
                <div className="flex items-center text-xs">
                  <span className="text-green-600 mr-2">💰</span>
                  <span className="font-medium text-gray-800">Fiyat:</span>
                  <span className="ml-2 text-gray-600">{(food as any).price}</span>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderTips = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {guideContent.tips?.map((tip, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-purple-50 via-white to-pink-50 border border-purple-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start">
            <span className="text-purple-500 text-lg mr-3 mt-1">💡</span>
            <p className="text-gray-700 text-sm leading-relaxed font-medium">
              {tip.replace(/🏛️|📱|🎭|🌡️|🏨|💰|🚫|📶|🏥|🎯|⚡|🚗|\*\*/g, '').trim()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderSafety = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {guideContent.safetyWarnings.map((warning, index) => (
        <div
          key={index}
          className="bg-gradient-to-br from-red-50 via-white to-pink-50 border border-red-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start">
            <span className="text-red-500 text-lg mr-3 mt-1">⚠️</span>
            <p className="text-gray-700 text-sm leading-relaxed font-medium">
              {warning.replace(/🚨|🌧️|🦟|🌞|💸|🍖|🚫|🌙|👗|🚔|💊|🌴|\*\*/g, '').trim()}
            </p>
          </div>
        </div>
      ))}
    </div>
  );

  const renderLinks = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {(guideContent as any).usefulLinks?.map((link: any, index: number) => (
        <a
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-gradient-to-br from-blue-50 via-white to-indigo-50 border border-blue-200 rounded-xl p-5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-blue-500 text-lg mr-3">🌐</span>
              <span className="font-medium text-gray-900 text-sm">{link.name.replace(/🏛️|🚇|✈️|🌴|📋|🌦️|🚌|🍕|📱|🏨/g, '').trim()}</span>
            </div>
            <span className="text-blue-400 text-sm">↗️</span>
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
    <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-100 border-b border-gray-200">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-4 py-4 font-medium text-sm transition-all duration-200 border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-500 bg-white text-blue-600 shadow-sm'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-lg">{tab.icon}</span>
                <span className="whitespace-nowrap">{tab.label.replace(/🏛️|🚌|🍜|💡|⚠️|🔗/g, '').trim()}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 flex items-center">
            <span className="text-2xl mr-3">
              {tabs.find(tab => tab.id === activeTab)?.icon}
            </span>
            {tabs.find(tab => tab.id === activeTab)?.label.replace(/🏛️|🚌|🍜|💡|⚠️|🔗/g, '').trim()}
          </h2>
        </div>

        <div className="animate-fadeIn">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
