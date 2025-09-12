'use client';

import React, { useState, useCallback } from 'react';
import { PlaceType } from '../models/types';
import { useSimpleMapViewModel } from '../viewmodels/useSimpleMapViewModel';
import { useAppContext } from '../contexts/AppContext';
import { usePullToRefresh } from '../hooks/usePullToRefresh';
import { ActionButton } from '../components/ActionButton';
import { MapComponent } from '../components/MapComponent';
import { PlacesList } from '../components/PlacesList';
import { GuideContent } from '../components/GuideContent';
import { ErrorMessage } from '../components/ErrorMessage';
import { RouteComponent } from '../components/RouteComponent';
import WeatherComponent from '../components/WeatherComponent';
import { SettingsModal } from '../components/Settings';
import { BottomNavigation } from '../components/BottomNavigation';
import { PullToRefreshIndicator } from '../components/PullToRefreshIndicator';
import { EmergencyServices } from '../components/EmergencyServices';

export default function Home() {
  const { t, language, theme } = useAppContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const {
    mapState,
    appState,
    handleMapLoad,
    findCurrentLocation,
    searchNearbyPlaces,
    showCountryGuide,
  } = useSimpleMapViewModel();

  // Pull to refresh handler
  const handleRefresh = useCallback(async () => {
    try {
      // Refresh current location
      if (mapState.userLocation) {
        await findCurrentLocation();
      }
      
      // Refresh weather data (will be handled by WeatherComponent internally)
      
      // Refresh nearby places if any are shown
      if (appState.activeTab === 'map' && mapState.places.length > 0) {
        // Re-search with current location
        const lastSearchType = localStorage.getItem('lastSearchType') as PlaceType;
        if (lastSearchType && mapState.userLocation) {
          await searchNearbyPlaces(lastSearchType);
        }
      }
    } catch (error) {
      console.error('Refresh failed:', error);
    }
  }, [mapState.userLocation, appState.activeTab, mapState.places.length, findCurrentLocation, searchNearbyPlaces]);

  const {
    containerRef,
    isRefreshing,
    pullDistance,
    progress,
    shouldRefresh
  } = usePullToRefresh({
    onRefresh: handleRefresh
  });

  // Handle bottom navigation
  const handleBottomNavAction = useCallback((action: string) => {
    // Store last search type for refresh
    if (action === 'restaurants' || action === 'transport') {
      localStorage.setItem('lastSearchType', action);
    }

    switch (action) {
      case 'findLocation':
        findCurrentLocation();
        break;
      case 'restaurants':
        searchNearbyPlaces('restaurant');
        break;
      case 'transport':
        searchNearbyPlaces('transit_station');
        break;
      case 'malaysia':
        showCountryGuide('malaysia');
        break;
      case 'indonesia':
        showCountryGuide('indonesia');
        break;
    }
  }, [findCurrentLocation, searchNearbyPlaces, showCountryGuide]);

  return (
    <div 
      ref={containerRef}
      className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300 relative overflow-auto"
      style={{
        touchAction: 'pan-y',
        WebkitOverflowScrolling: 'touch',
        overscrollBehaviorY: 'contain'
      }}
    >
      {/* Pull to Refresh Indicator */}
      <PullToRefreshIndicator
        pullDistance={pullDistance}
        isRefreshing={isRefreshing}
        progress={progress}
        shouldRefresh={shouldRefresh}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-10 relative">
          {/* Settings Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="absolute top-0 right-0 p-2 sm:p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            title={t('settings.title')}
          >
            <span className="text-lg sm:text-xl">⚙️</span>
          </button>

          {/* Emergency Button - Mobile */}
          <button
            onClick={() => setShowEmergency(!showEmergency)}
            className="absolute top-0 right-14 sm:right-16 p-2 sm:p-3 rounded-xl bg-red-500/90 dark:bg-red-600/90 backdrop-blur-sm border border-red-400 dark:border-red-500 hover:bg-red-500 dark:hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl text-white md:hidden"
            title={language === 'tr' ? 'Acil Durum' : 'Emergency'}
          >
            <span className="text-lg sm:text-xl">🆘</span>
          </button>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              {t('app.title')}
            </span>
            <span className="text-2xl sm:text-3xl ml-2 sm:ml-3">🗺️</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
            {t('app.subtitle')}
          </p>
        </header>

        {/* Main Content */}
        <main className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm p-4 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl shadow-xl border border-white/50 dark:border-slate-700/50 transition-colors duration-300">
          {/* Action Buttons - Mobile Optimized Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5 lg:gap-4 max-w-4xl mx-auto mb-6 sm:mb-8">
            <ActionButton
              onClick={findCurrentLocation}
              variant="primary"
              disabled={appState.status === 'loading'}
            >
              <span className="text-lg sm:text-xl">📍</span>
              <span className="hidden sm:inline">{t('button.findLocation')}</span>
              <span className="sm:hidden text-xs font-medium">{t('button.location.short')}</span>
            </ActionButton>
            
            <ActionButton
              onClick={() => searchNearbyPlaces(PlaceType.RESTAURANT)}
              variant="success"
              disabled={appState.status === 'loading'}
            >
              <span className="text-lg sm:text-xl">🍽️</span>
              <span className="hidden sm:inline">{t('button.restaurants')}</span>
              <span className="sm:hidden text-xs font-medium">{t('button.restaurants.short')}</span>
            </ActionButton>
            
            <ActionButton
              onClick={() => searchNearbyPlaces(PlaceType.TRAIN_STATION)}
              variant="warning"
              disabled={appState.status === 'loading'}
            >
              <span className="text-lg sm:text-xl">🚊</span>
              <span className="hidden sm:inline">{t('button.transport')}</span>
              <span className="sm:hidden text-xs font-medium">{t('button.transport.short')}</span>
            </ActionButton>
            
            <ActionButton
              onClick={() => showCountryGuide('malaysia')}
              variant="danger"
              disabled={appState.status === 'loading'}
            >
              <span className="text-lg sm:text-xl">🇲🇾</span>
              <span className="hidden sm:inline">{t('button.malaysia')}</span>
              <span className="sm:hidden text-xs font-medium">{t('button.malaysia.short')}</span>
            </ActionButton>
            
            <ActionButton
              onClick={() => showCountryGuide('indonesia')}
              variant="secondary"
              disabled={appState.status === 'loading'}
            >
              <span className="text-lg sm:text-xl">🇮🇩</span>
              <span className="hidden sm:inline">{t('button.indonesia')}</span>
              <span className="sm:hidden text-xs font-medium">{t('button.indonesia.short')}</span>
            </ActionButton>
          </div>

          {/* Content Sections */}
          <div className="space-y-6 sm:space-y-8">
            {/* Emergency Services - Mobile (when emergency button is pressed) */}
            {showEmergency && (
              <div className="order-0 md:hidden">
                <EmergencyServices />
              </div>
            )}

            {/* Guide Content - Show first on mobile when active */}
            {appState.activeTab === 'guide' && appState.guideContent && (
              <div className="order-1">
                <GuideContent guideContent={appState.guideContent} />
              </div>
            )}

            {/* Weather Information - Compact on mobile */}
            <div className="order-2">
              <WeatherComponent />
            </div>

            {/* Map Section - Show after guides on mobile */}
            <div className="order-3">
              <div className="bg-white dark:bg-slate-700 rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-slate-600 transition-colors duration-300">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3 sm:mb-4 flex items-center">
                  <span className="text-xl sm:text-2xl mr-2">🗺️</span>
                  {t('map.title')}
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
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-3 sm:mb-4">
                  {t('welcome.title')}
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-4">
                  {t('welcome.description')}
                </p>
              </div>
            )}
          </div>
        </main>

        {/* Footer - Compact on mobile */}
        <footer className="text-center mt-8 sm:mt-12 text-gray-600 dark:text-gray-300">
          <div className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-2xl mx-auto border border-white/30 dark:border-slate-700/30 transition-colors duration-300">
            <p className="text-xs sm:text-sm mb-1 sm:mb-2">
              {t('footer.description')}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {t('footer.wishes')}
            </p>
          </div>
        </footer>
      </div>

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation
        activeTab={appState.activeTab}
        onTabChange={handleBottomNavAction}
        isLoading={appState.status === 'loading'}
      />
    </div>
  );
}
