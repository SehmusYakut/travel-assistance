'use client';

import { useCallback, useState } from 'react';
import { Location } from '../models/types';
import { useApp } from '../contexts/AppContext';

interface RouteComponentProps {
  map: google.maps.Map | null;
  userLocation: Location | null;
}

type TravelMode = 'DRIVING' | 'WALKING' | 'TRANSIT' | 'BICYCLING';

export const RouteComponent: React.FC<RouteComponentProps> = ({
  map,
  userLocation,
}) => {
  const { t, language } = useApp();
  const [destination, setDestination] = useState('');
  const [travelMode, setTravelMode] = useState<TravelMode>('DRIVING');
  const [isCalculating, setIsCalculating] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
    steps: string[];
  } | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const calculateRoute = useCallback(async () => {
    if (!map || !userLocation || !destination.trim()) {
      setError(t('route.error.noLocation'));
      return;
    }

    setIsCalculating(true);
    setRouteInfo(null);
    setError(null);

    try {
      const directionsService = new google.maps.DirectionsService();
      
      const request: google.maps.DirectionsRequest = {
        origin: userLocation,
        destination: destination.trim(),
        travelMode: google.maps.TravelMode[travelMode],
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };

      const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
        directionsService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            resolve(result);
          } else {
            reject(new Error(`${t('route.error.calculation')}: ${status}`));
          }
        });
      });

      // Clear existing route
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }

      // Create new renderer
      const renderer = new google.maps.DirectionsRenderer({
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#3B82F6',
          strokeWeight: 4,
          strokeOpacity: 0.8,
        }
      });
      
      renderer.setMap(map);
      renderer.setDirections(result);
      setDirectionsRenderer(renderer);

      // Extract route information
      const route = result.routes[0];
      const leg = route.legs[0];
      
      const steps = leg.steps.slice(0, 3).map((step, index) => 
        `${index + 1}. ${step.instructions.replace(/<[^>]*>/g, '')}`
      );

      setRouteInfo({
        distance: leg.distance?.text || 'N/A',
        duration: leg.duration?.text || 'N/A',
        steps: steps
      });

      setIsExpanded(true);

    } catch (err) {
      setError(err instanceof Error ? err.message : t('route.error.calculation'));
      console.error('Route calculation failed:', err);
    } finally {
      setIsCalculating(false);
    }
  }, [map, userLocation, destination, travelMode, directionsRenderer, t]);

  const clearRoute = useCallback(() => {
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
      setDirectionsRenderer(null);
    }
    setRouteInfo(null);
    setDestination('');
    setError(null);
    setIsExpanded(false);
  }, [directionsRenderer]);

  const quickDestinations = [
    { 
      key: 'hotel',
      icon: '🏨',
      name: t('route.hotel'),
      address: '8, Jalan Medan Tuanku, Chow Kit, 50250 Kuala Lumpur, Malaysia'
    },
    { 
      key: 'klcc',
      icon: '🏢',
      name: 'KLCC',
      address: 'KLCC Kuala Lumpur'
    },
    { 
      key: 'petronas',
      icon: '🏗️',
      name: 'Petronas Towers',
      address: 'Petronas Twin Towers'
    },
    { 
      key: 'batu',
      icon: '🏔️',
      name: 'Batu Caves',
      address: 'Batu Caves'
    },
    { 
      key: 'central',
      icon: '🏪',
      name: 'Central Market',
      address: 'Central Market KL'
    },
    { 
      key: 'bukit',
      icon: '🛍️',
      name: 'Bukit Bintang',
      address: 'Bukit Bintang'
    }
  ];

  const travelModes = [
    { key: 'DRIVING' as TravelMode, icon: '🚗', name: t('route.travelMode.driving') },
    { key: 'WALKING' as TravelMode, icon: '🚶', name: t('route.travelMode.walking') },
    { key: 'TRANSIT' as TravelMode, icon: '🚌', name: t('route.travelMode.transit') },
    { key: 'BICYCLING' as TravelMode, icon: '🚴', name: t('route.travelMode.bicycling') },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 px-4 sm:px-6 py-4 border-b border-green-100 dark:border-green-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center">
              <span className="text-green-600 dark:text-green-300 text-xl">🛣️</span>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100">
                {t('route.title')}
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                {routeInfo ? `${routeInfo.distance} • ${routeInfo.duration}` : 'Plan your journey'}
              </p>
            </div>
          </div>
          
          {routeInfo && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-full hover:bg-green-100 dark:hover:bg-green-800 transition-colors touch-manipulation"
            >
              <svg 
                className={`w-5 h-5 text-green-600 dark:text-green-400 transform transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Travel Mode Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Travel Mode:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {travelModes.map((mode) => (
              <button
                key={mode.key}
                onClick={() => setTravelMode(mode.key)}
                className={`flex items-center justify-center p-2 sm:p-3 rounded-xl border-2 transition-all touch-manipulation ${
                  travelMode === mode.key
                    ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg mr-1 sm:mr-2">{mode.icon}</span>
                <span className="text-xs sm:text-sm font-medium">{mode.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Destination Input */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('route.destination')}
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder={t('route.placeholder')}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              onClick={calculateRoute}
              disabled={isCalculating || !userLocation || !destination.trim()}
              className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white rounded-xl font-medium transition-colors touch-manipulation disabled:cursor-not-allowed min-w-[120px]"
            >
              {isCalculating ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t('route.calculating')}
                </div>
              ) : (
                <>
                  <span className="mr-2">🗺️</span>
                  {t('route.calculate')}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick Destinations */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{t('route.quickDestinations')}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {quickDestinations.map((dest) => (
              <button
                key={dest.key}
                onClick={() => setDestination(dest.address)}
                className={`flex items-center p-3 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/10 transition-all touch-manipulation ${
                  dest.key === 'hotel' 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700 text-green-700 dark:text-green-300'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                <span className="text-lg mr-2 flex-shrink-0">{dest.icon}</span>
                <span className="text-xs sm:text-sm font-medium text-left leading-tight">
                  {dest.name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-4">
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-lg flex-shrink-0">⚠️</span>
              <div>
                <p className="text-red-800 dark:text-red-300 text-sm font-medium">{t('common.error')}</p>
                <p className="text-red-700 dark:text-red-400 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Route Information */}
        {routeInfo && (
          <div className={`bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl overflow-hidden transition-all duration-300 ${
            isExpanded ? 'max-h-screen opacity-100' : 'max-h-32 opacity-90'
          }`}>
            <div className="p-4">
              <div className="flex justify-between items-start mb-4">
                <h4 className="font-semibold text-green-800 dark:text-green-300 flex items-center">
                  <span className="mr-2">📊</span>
                  {t('route.info')}
                </h4>
                <button
                  onClick={clearRoute}
                  className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-sm font-medium transition-colors touch-manipulation"
                >
                  <span className="mr-1">❌</span>
                  {t('route.clear')}
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-green-600 dark:text-green-400 text-lg mb-1">📏</div>
                  <span className="text-xs text-green-600 dark:text-green-400 block">{t('route.distance')}</span>
                  <p className="font-semibold text-green-800 dark:text-green-300">{routeInfo.distance}</p>
                </div>
                <div className="text-center">
                  <div className="text-green-600 dark:text-green-400 text-lg mb-1">⏱️</div>
                  <span className="text-xs text-green-600 dark:text-green-400 block">{t('route.duration')}</span>
                  <p className="font-semibold text-green-800 dark:text-green-300">{routeInfo.duration}</p>
                </div>
              </div>

              {isExpanded && routeInfo.steps.length > 0 && (
                <div className="border-t border-green-200 dark:border-green-700 pt-4">
                  <p className="text-sm text-green-600 dark:text-green-400 mb-3 flex items-center">
                    <span className="mr-2">🗣️</span>
                    {t('route.steps')}
                  </p>
                  <ol className="text-sm text-green-700 dark:text-green-400 space-y-2">
                    {routeInfo.steps.map((step, index) => (
                      <li key={index} className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full text-xs font-medium flex items-center justify-center mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span className="leading-relaxed">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No Location Message */}
        {!userLocation && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <div className="flex items-center space-x-3">
              <span className="text-yellow-600 dark:text-yellow-400 text-lg">📍</span>
              <p className="text-yellow-800 dark:text-yellow-300 text-sm font-medium">
                {t('route.needLocation')}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
