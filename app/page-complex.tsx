'use client';

import React from 'react';
import { ActionButton } from '../components/ActionButton';
import { GuideContent } from '../components/GuideContent';
import { guideData } from '../data/countries';

export default function Home() {
  const [activeContent, setActiveContent] = React.useState<'malaysia' | 'indonesia' | null>(null);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gezgin Rehberi
            </span>
            <span className="text-3xl ml-3">🗺️</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Malezya ve Endonezya için kapsamlı seyahat rehberiniz. 
            Yakınızdaki en iyi mekanları keşfedin, güvenlik bilgilerini öğrenin.
          </p>
        </header>

        {/* Main Content */}
        <main className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-3xl shadow-xl border border-white/50">
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-8">
            <ActionButton
              onClick={() => setActiveContent('malaysia')}
              variant="danger"
            >
              🇲🇾 Malezya Rehberi
            </ActionButton>
            
            <ActionButton
              onClick={() => setActiveContent('indonesia')}
              variant="secondary"
            >
              �🇩 Endonezya Rehberi
            </ActionButton>
          </div>

          {/* Map Placeholder */}
          <div className="mb-8">
            <div className="w-full h-96 rounded-2xl shadow-lg bg-gray-100 flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl mb-4 block">🗺️</span>
                <p className="text-gray-600">Harita özelliği geliştiriliyor...</p>
                <p className="text-sm text-gray-500 mt-2">
                  Google Maps entegrasyonu yakında ekleniyor
                </p>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Guide Content */}
            {activeContent && (
              <GuideContent guideContent={guideData[activeContent]} />
            )}

            {/* Welcome Message */}
            {!activeContent && (
              <div className="text-center py-12">
                <span className="text-6xl mb-6 block">✈️</span>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Seyahat Rehberine Hoş Geldiniz!
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Malezya veya Endonezya rehberini seçerek gezilecek yerler ve 
                  güvenlik bilgileri hakkında detaylı bilgi alabilirsiniz.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center mt-12 text-gray-600">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto">
            <p className="text-sm mb-2">
              🌟 Bu uygulama Google Maps API kullanarak yakın mekanları bulur
            </p>
            <p className="text-xs text-gray-500">
              Güvenli seyahatler dileriz! 🧳✈️
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
