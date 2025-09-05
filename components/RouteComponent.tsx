'use client';

import { useCallback, useState } from 'react';
import { Location } from '../models/types';

interface RouteComponentProps {
  map: google.maps.Map | null;
  userLocation: Location | null;
}

export const RouteComponent: React.FC<RouteComponentProps> = ({
  map,
  userLocation,
}) => {
  const [destination, setDestination] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
    steps: string[];
  } | null>(null);
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  const calculateRoute = useCallback(async () => {
    if (!map || !userLocation || !destination.trim()) {
      alert('Lütfen başlangıç konumu ve hedef adresi belirtin!');
      return;
    }

    setIsCalculating(true);
    setRouteInfo(null);

    try {
      const directionsService = new google.maps.DirectionsService();
      
      const request: google.maps.DirectionsRequest = {
        origin: userLocation,
        destination: destination.trim(),
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };

      const result = await new Promise<google.maps.DirectionsResult>((resolve, reject) => {
        directionsService.route(request, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            resolve(result);
          } else {
            reject(new Error(`Rota hesaplanamadı: ${status}`));
          }
        });
      });

      // Clear previous route
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }

      // Create new directions renderer
      const renderer = new google.maps.DirectionsRenderer({
        suppressMarkers: false,
        polylineOptions: {
          strokeColor: '#FF6B6B',
          strokeOpacity: 0.8,
          strokeWeight: 5,
        },
      });

      renderer.setMap(map);
      renderer.setDirections(result);
      setDirectionsRenderer(renderer);

      // Extract route information
      const route = result.routes[0];
      const leg = route.legs[0];
      
      const steps = leg.steps.map((step, index) => 
        `${index + 1}. ${step.instructions.replace(/<[^>]*>/g, '')}`
      );

      setRouteInfo({
        distance: leg.distance?.text || 'Bilinmiyor',
        duration: leg.duration?.text || 'Bilinmiyor',
        steps: steps.slice(0, 5), // İlk 5 adımı göster
      });

    } catch (error) {
      console.error('Rota hesaplama hatası:', error);
      alert('Rota hesaplanırken hata oluştu. Lütfen geçerli bir adres girin.');
    } finally {
      setIsCalculating(false);
    }
  }, [map, userLocation, destination, directionsRenderer]);

  const clearRoute = useCallback(() => {
    if (directionsRenderer) {
      directionsRenderer.setMap(null);
      setDirectionsRenderer(null);
    }
    setRouteInfo(null);
    setDestination('');
  }, [directionsRenderer]);

  const quickDestinations = [
    'KLCC Kuala Lumpur',
    'Petronas Twin Towers',
    'Batu Caves',
    'Central Market KL',
    'Bukit Bintang'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">🛣️ Rota Planlayıcısı</h3>
      
      {/* Destination Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Hedef Adres:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Örn: KLCC Kuala Lumpur"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={calculateRoute}
            disabled={isCalculating || !userLocation}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {isCalculating ? '⏳' : '🗺️ Rota Çiz'}
          </button>
        </div>
      </div>

      {/* Quick Destinations */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Hızlı Hedefler:</p>
        <div className="flex flex-wrap gap-2">
          {quickDestinations.map((dest) => (
            <button
              key={dest}
              onClick={() => setDestination(dest)}
              className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
            >
              {dest}
            </button>
          ))}
        </div>
      </div>

      {/* Route Information */}
      {routeInfo && (
        <div className="bg-green-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-semibold text-green-800">📊 Rota Bilgileri</h4>
            <button
              onClick={clearRoute}
              className="text-red-600 hover:text-red-800 text-sm"
            >
              ❌ Temizle
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <span className="text-sm text-green-600">📏 Mesafe:</span>
              <p className="font-medium text-green-800">{routeInfo.distance}</p>
            </div>
            <div>
              <span className="text-sm text-green-600">⏱️ Süre:</span>
              <p className="font-medium text-green-800">{routeInfo.duration}</p>
            </div>
          </div>

          {routeInfo.steps.length > 0 && (
            <div>
              <p className="text-sm text-green-600 mb-2">🗣️ İlk Adımlar:</p>
              <ol className="text-xs text-green-700 space-y-1">
                {routeInfo.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}

      {/* Status Messages */}
      {!userLocation && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-yellow-800 text-sm">
            📍 Rota hesaplamak için önce konumunuzu bulun.
          </p>
        </div>
      )}
    </div>
  );
};
