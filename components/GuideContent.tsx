'use client';

import React from 'react';
import { CountryData } from '../models/types';

interface GuideContentProps {
  guideContent: CountryData;
}

export const GuideContent: React.FC<GuideContentProps> = ({ guideContent }) => {
  return (
    <div className="space-y-8">
      {/* Gezilecek Yerler */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="text-2xl mr-2">🏛️</span>
          Gezilecek Yerler
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guideContent.attractions.map((attraction, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start mb-3">
                <span className="text-blue-500 text-xl mr-3">📍</span>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-1">
                    {attraction.name}
                  </h3>
                  {attraction.city && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      {attraction.city}
                    </span>
                  )}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {attraction.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Güvenlik Uyarıları */}
      <section>
        <h2 className="text-3xl font-bold text-red-700 mb-6 flex items-center">
          <span className="text-2xl mr-2">⚠️</span>
          Güvenlik Uyarıları
        </h2>
        <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
          <ul className="space-y-4">
            {guideContent.safetyWarnings.map((warning, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 text-lg mr-3 flex-shrink-0 mt-0.5">
                  🚨
                </span>
                <p className="text-red-800 font-medium leading-relaxed">
                  {warning}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* İpuçları */}
      <section className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
        <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center">
          <span className="text-lg mr-2">💡</span>
          Faydalı İpuçları
        </h3>
        <div className="space-y-2 text-green-700">
          <p>• Yerel SIM kart alarak internet erişiminizi sağlayın</p>
          <p>• Ulaşım için yerel uygulamaları indirin (Grab vb.)</p>
          <p>• Önemli belgelerin kopyalarını ayrı yerlerde saklayın</p>
          <p>• Yerel para birimini önceden araştırın</p>
        </div>
      </section>
    </div>
  );
};
