'use client';

import React from 'react';
import { PlaceType } from '../models/types';
import { useMapViewModel } from '../viewmodels/useMapViewModel';
import {
  MapComponent,
  ActionButton,
  PlacesList,
  GuideContent,
  ErrorMessage,
} from '../components';

export default function Home() {
  const {
    mapState,
    appState,
    initializeMap,
    findCurrentLocation,
    searchNearbyPlaces,
    showCountryGuide,
  } = useMapViewModel();

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
              onClick={findCurrentLocation}
              variant="primary"
              disabled={appState.status === 'loading'}
            >
              📍 Konumumu Bul
            </ActionButton>
            
            <ActionButton
              onClick={() => searchNearbyPlaces(PlaceType.RESTAURANT)}
              variant="success"
              disabled={appState.status === 'loading'}
            >
              🍽️ Yakın Restoranlar
            </ActionButton>
            
            <ActionButton
              onClick={() => searchNearbyPlaces(PlaceType.TRAIN_STATION)}
              variant="warning"
              disabled={appState.status === 'loading'}
            >
              🚊 Ulaşım İmkanları
            </ActionButton>
            
            <ActionButton
              onClick={() => showCountryGuide('malaysia')}
              variant="danger"
              disabled={appState.status === 'loading'}
            >
              🇲🇾 Malezya Rehberi
            </ActionButton>
            
            <ActionButton
              onClick={() => showCountryGuide('indonesia')}
              variant="secondary"
              disabled={appState.status === 'loading'}
            >
              🇮🇩 Endonezya Rehberi
            </ActionButton>
          </div>

          {/* Map Section */}
          <div className="mb-8">
            <MapComponent
              onMapLoad={initializeMap}
              isLoaded={mapState.isLoaded}
            />
          </div>

          {/* Content Section */}
          <div className="space-y-6">
            {/* Error Message */}
            {appState.status === 'error' && (
              <ErrorMessage
                message={appState.errorMessage}
                onRetry={() => {
                  if (appState.activeTab === 'map') {
                    findCurrentLocation();
                  }
                }}
              />
            )}

            {/* Places List */}
            {appState.activeTab === 'map' && (
              <PlacesList
                places={mapState.places}
                isLoading={appState.status === 'loading'}
              />
            )}

            {/* Guide Content */}
            {appState.activeTab === 'guide' && appState.guideContent && (
              <GuideContent guideContent={appState.guideContent} />
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
