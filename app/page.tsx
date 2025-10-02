'use client';

import { useState, useCallback, lazy, Suspense, useEffect } from 'react';
import { useSimpleMapViewModel } from '../viewmodels/useSimpleMapViewModel';
import { useAppContext } from '../contexts/AppContext';
import { ActionButton } from '../components/ActionButton';
import { MapComponent } from '../components/MapComponent';
import { PlacesList } from '../components/PlacesList';
import { GuideContent } from '../components/GuideContent';
import { ErrorMessage } from '../components/ErrorMessage';
import { RouteComponent } from '../components/RouteComponent';
import { BottomNavigation } from '../components/BottomNavigation';

// Lazy load components for better performance
const WeatherComponent = lazy(() => import('../components/WeatherComponent'));
const SettingsModal = lazy(() => import('../components/Settings').then(module => ({ default: module.SettingsModal })));
const EmergencyServices = lazy(() => import('../components/EmergencyServices').then(module => ({ default: module.EmergencyServices })));
const CurrencyConverter = lazy(() => import('../components/CurrencyConverter').then(module => ({ default: module.CurrencyConverter })));
const Translator = lazy(() => import('../components/Translator').then(module => ({ default: module.Translator })));
const TurkishRestaurants = lazy(() => import('../components/TurkishRestaurants'));

export default function Home() {
  const { t, language } = useAppContext();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);
  const {
    mapState,
    appState,
    handleMapLoad,
    findCurrentLocation,
    searchNearbyPlaces,
    showCountryGuide,
    clearGuide,
    clearPlaces,
  } = useSimpleMapViewModel();

  // Modal states
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isTranslatorOpen, setIsTranslatorOpen] = useState(false);
  const [showTurkishRestaurants, setShowTurkishRestaurants] = useState(false);

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

  // Handle tool selection from bottom navigation
  const handleToolSelect = useCallback((tool: 'currency' | 'translator') => {
    if (tool === 'currency') {
      setIsCurrencyOpen(true);
    } else if (tool === 'translator') {
      setIsTranslatorOpen(true);
    }
  }, []);

  // Memory cleanup on unmount
  useEffect(() => {
    return () => {
      // Clear any timeouts, intervals, or listeners
      if (typeof window !== 'undefined') {
        // Clear localStorage cache periodically to prevent memory bloat
        try {
          const lastClear = localStorage.getItem('lastCacheClear');
          const now = Date.now();
          const oneHour = 60 * 60 * 1000;
          
          if (!lastClear || now - parseInt(lastClear) > oneHour) {
            // Clear search cache older than 1 hour
            const keys = Object.keys(localStorage);
            keys.forEach(key => {
              if (key.startsWith('searchCache_') || key.startsWith('weatherCache_')) {
                localStorage.removeItem(key);
              }
            });
            localStorage.setItem('lastCacheClear', now.toString());
          }
        } catch (error) {
          console.warn('Cache cleanup error:', error);
        }
      }
    };
  }, []);

  return (
    <div 
      className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 transition-colors duration-300 relative overflow-auto"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 max-w-7xl pb-20"
      >
        {/* Header */}
        <header className="text-center mb-6 sm:mb-8 lg:mb-10 relative">
          {/* Settings Button */}
          {/* Settings Button */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="absolute top-0 right-0 p-2 sm:p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-gray-200 dark:border-slate-600 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            title={t('settings.title')}
          >
            <span className="text-lg sm:text-xl">⚙️</span>
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
              onClick={() => searchNearbyPlaces('restaurant')}
              variant="success"
              disabled={appState.status === 'loading'}
            >
              <span className="text-lg sm:text-xl">🍽️</span>
              <span className="hidden sm:inline">{t('button.restaurants')}</span>
              <span className="sm:hidden text-xs font-medium">{t('button.restaurants.short')}</span>
            </ActionButton>
            
            <ActionButton
              onClick={() => searchNearbyPlaces('transit_station')}
              variant="warning"
              disabled={appState.status === 'loading'}
            >
              <span className="text-lg sm:text-xl">🚊</span>
              <span className="hidden sm:inline">{t('button.transport')}</span>
              <span className="sm:hidden text-xs font-medium">{t('button.transport.short')}</span>
            </ActionButton>

            <ActionButton
              onClick={() => setShowTurkishRestaurants(!showTurkishRestaurants)}
              variant="danger"
              disabled={appState.status === 'loading'}
            >
              <span className="text-lg sm:text-xl">🇹🇷</span>
              <span className="hidden sm:inline">Türk Restoranları</span>
              <span className="sm:hidden text-xs font-medium">Türk</span>
            </ActionButton>

            {/* Tools Buttons - Desktop */}
            <div className="hidden md:contents">
              <ActionButton
                onClick={() => setIsCurrencyOpen(true)}
                variant="secondary"
                disabled={appState.status === 'loading'}
              >
                <span className="text-lg sm:text-xl">💰</span>
                <span>Currency Converter</span>
              </ActionButton>

              <ActionButton
                onClick={() => setIsTranslatorOpen(true)}
                variant="primary"
                disabled={appState.status === 'loading'}
              >
                <span className="text-lg sm:text-xl">🗣️</span>
                <span>Translator</span>
              </ActionButton>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-6 sm:space-y-8">
            {/* Emergency Services - Mobile (when emergency button is pressed) */}
            {showEmergency && (
              <div className="order-0 md:hidden">
                <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>}>
                  <EmergencyServices />
                </Suspense>
              </div>
            )}

            {/* Guide Content - Show first on mobile when active */}
            {appState.activeTab === 'guide' && appState.guideContent && (
              <div className="order-1">
                <GuideContent 
                  guideContent={appState.guideContent} 
                  countryKey={appState.activeCountry || undefined}
                  onClose={clearGuide}
                />
              </div>
            )}

            {/* Turkish Restaurants */}
            {showTurkishRestaurants && (
              <div className="order-2">
                <Suspense 
                  fallback={
                    <div className="bg-white rounded-lg shadow-lg p-4 animate-pulse">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-gray-200 rounded"></div>
                        <div className="w-32 h-6 bg-gray-200 rounded"></div>
                      </div>
                      <div className="space-y-3">
                        {[1,2,3].map(i => (
                          <div key={i} className="border rounded-lg p-3">
                            <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
                            <div className="w-1/2 h-3 bg-gray-200 rounded"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                >
                  <TurkishRestaurants
                    map={mapState.map}
                    userLocation={mapState.userLocation}
                    onRestaurantSelect={(restaurant) => {
                      // Focus on selected restaurant on map
                      if (mapState.map) {
                        mapState.map.setCenter(restaurant.geometry.location);
                        mapState.map.setZoom(16);
                      }
                    }}
                  />
                </Suspense>
              </div>
            )}

            {/* Weather Information - Compact on mobile */}
            <div className="order-3">
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>}>
                <WeatherComponent />
              </Suspense>
            </div>

            {/* Map Section - Show after guides on mobile */}
            <div className="order-4">
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
              <div className="order-5">
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
                  onClose={clearPlaces}
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
      {isSettingsOpen && (
        <Suspense fallback={<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div></div>}>
          <SettingsModal 
            isOpen={isSettingsOpen} 
            onClose={() => setIsSettingsOpen(false)} 
          />
        </Suspense>
      )}

      {/* Floating Emergency (SOS) Button - Modern FAB Style */}
      <button
        onClick={() => setShowEmergency(!showEmergency)}
        className={`fixed bottom-20 right-4 w-14 h-14 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 z-50 md:hidden ${
          showEmergency 
            ? 'bg-gray-500 dark:bg-gray-600 text-white' 
            : 'bg-gradient-to-r from-red-500 to-red-600 dark:from-red-600 dark:to-red-700 text-white'
        }`}
        title={language === 'tr' ? 'Acil Durum' : 'Emergency'}
        style={{
          boxShadow: showEmergency 
            ? '0 8px 24px rgba(0, 0, 0, 0.3)' 
            : '0 8px 24px rgba(239, 68, 68, 0.4)'
        }}
      >
        <span className="text-2xl">
          {showEmergency ? '✕' : '🆘'}
        </span>
      </button>

      {/* Currency Converter Modal */}
      {isCurrencyOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-600">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Döviz Çevirici 💰</h2>
              <button
                onClick={() => setIsCurrencyOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            <div className="p-4">
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>}>
                <CurrencyConverter isOpen={true} onClose={() => setIsCurrencyOpen(false)} />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Translator Modal */}
      {isTranslatorOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-slate-600">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Çevirmen 🗣️</h2>
              <button
                onClick={() => setIsTranslatorOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="text-xl">✕</span>
              </button>
            </div>
            <div className="p-4">
              <Suspense fallback={<div className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>}>
                <Translator isOpen={true} onClose={() => setIsTranslatorOpen(false)} />
              </Suspense>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation - Mobile Only */}
      <BottomNavigation
        activeTab={appState.activeTab}
        onTabChange={handleBottomNavAction}
        isLoading={appState.status === 'loading'}
        onToolSelect={handleToolSelect}
      />
    </div>
  );
}
