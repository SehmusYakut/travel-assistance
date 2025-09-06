'use client';

import React from 'react';
import { PlaceType } from '../models/types';
import { useSimpleMapViewModel } from '../viewmodels/useSimpleMapViewModel';
import { ActionButton } from '../components/ActionButton';
import { MapComponent } from '../components/MapComponent';
import { PlacesList } from '../components/PlacesList';
import { GuideContent } from '../components/GuideContent';
import { ErrorMessage } from '../components/ErrorMessage';
import { RouteComponent } from '../components/RouteComponent';
import { WeatherComponent } from '../components/WeatherComponent';

export default function Home() {
  const {
    mapState,
    appState,
    handleMapLoad,
    findCurrentLocation,
    searchNearbyPlaces,
    showCountryGuide,
  } = useSimpleMapViewModel();

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen font-sans text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 tracking-tight mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Gezgin Rehberi
            </span>
            <span className="text-2xl sm:text-3xl ml-2 sm:ml-3">🗺️</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Malezya ve Endonezya için kapsamlı seyahat rehberiniz. 
            Yakınızdaki en iyi mekanları keşfedin, güvenlik bilgilerini öğrenin.
          </p>
        </header>

        {/* Main Content */}
        <main className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/50">
          {/* Action Buttons - Mobile Optimized Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2 sm:gap-3 justify-center mb-6 sm:mb-8">
            <ActionButton
              onClick={findCurrentLocation}
              variant="primary"
              disabled={appState.status === 'loading'}
            >
              <span className="block sm:inline">📍</span>
              <span className="block sm:inline sm:ml-1 text-xs sm:text-sm">Konumum</span>
            </ActionButton>
            
            <ActionButton
              onClick={() => searchNearbyPlaces(PlaceType.RESTAURANT)}
              variant="success"
              disabled={appState.status === 'loading'}
            >
              <span className="block sm:inline">🍽️</span>
              <span className="block sm:inline sm:ml-1 text-xs sm:text-sm">Restoranlar</span>
            </ActionButton>
            
            <ActionButton
              onClick={() => searchNearbyPlaces(PlaceType.TRAIN_STATION)}
              variant="warning"
              disabled={appState.status === 'loading'}
            >
              <span className="block sm:inline">🚊</span>
              <span className="block sm:inline sm:ml-1 text-xs sm:text-sm">Ulaşım</span>
            </ActionButton>
            
            <ActionButton
              onClick={() => showCountryGuide('malaysia')}
              variant="danger"
              disabled={appState.status === 'loading'}
            >
              <span className="block sm:inline">🇲🇾</span>
              <span className="block sm:inline sm:ml-1 text-xs sm:text-sm">Malezya</span>
            </ActionButton>
            
            <ActionButton
              onClick={() => showCountryGuide('indonesia')}
              variant="secondary"
              disabled={appState.status === 'loading'}
            >
              <span className="block sm:inline">🇮🇩</span>
              <span className="block sm:inline sm:ml-1 text-xs sm:text-sm">Endonezya</span>
            </ActionButton>
          </div>

          {/* Content Sections */}
          <div className="space-y-6 sm:space-y-8">
            {/* Guide Content - Show first on mobile when active */}
            {appState.activeTab === 'guide' && appState.guideContent && (
              <div className="order-1">
                <GuideContent guideContent={appState.guideContent} />
              </div>
            )}

            {/* Weather Information - Compact on mobile */}
            <div className="order-2">
              <WeatherComponent userLocation={mapState.userLocation} />
            </div>

            {/* Map Section - Show after guides on mobile */}
            <div className="order-3">
              <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center">
                  <span className="text-xl sm:text-2xl mr-2">🗺️</span>
                  Harita & Yakın Yerler
                </h3>
                <MapComponent
                  center={mapState.center}
                  zoom={mapState.zoom}
                  userLocation={mapState.userLocation}
                  places={mapState.places}
                  onMapLoad={handleMapLoad}
                />
              </div>
            </div>

            {/* Route Planning - Collapsible on mobile */}
            {mapState.map && (
              <div className="order-4">
                <RouteComponent
                  map={mapState.map}
                  userLocation={mapState.userLocation}
                />
              </div>
            )}

            {/* Error Message */}
            {appState.status === 'error' && (
              <div className="order-5">
                <ErrorMessage
                  message={appState.errorMessage}
                  onRetry={() => {
                    if (appState.activeTab === 'map') {
                      findCurrentLocation();
                    }
                  }}
                />
              </div>
            )}

            {/* Places List - Compact cards on mobile */}
            {appState.activeTab === 'map' && (
              <div className="order-6">
                <PlacesList
                  places={mapState.places}
                  isLoading={appState.status === 'loading'}
                />
              </div>
            )}

            {/* Welcome Message - Mobile optimized */}
            {appState.activeTab === 'map' && mapState.places.length === 0 && appState.status === 'idle' && (
              <div className="order-7 text-center py-8 sm:py-12">
                <span className="text-4xl sm:text-6xl mb-4 sm:mb-6 block">✈️</span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-3 sm:mb-4">
                  Seyahat Rehberine Hoş Geldiniz!
                </h2>
                <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
                  Konumunuzu bularak yakındaki restoranları ve ulaşım imkanlarını keşfedin, 
                  ya da Malezya ve Endonezya rehberlerini inceleyin.
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer - Compact on mobile */}
        <footer className="text-center mt-8 sm:mt-12 text-gray-600">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto">
            <p className="text-xs sm:text-sm mb-1 sm:mb-2">
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
