'use client';

import { useCallback, useState, useEffect, useRef } from 'react';
import { Location, Place } from '../models/types';

interface MapComponentProps {
  center: Location;
  zoom: number;
  userLocation: Location | null;
  places: Place[];
  onMapLoad?: (map: google.maps.Map) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({
  center,
  zoom,
  userLocation,
  places,
  onMapLoad,
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);

  // Wait for Google Maps API loaded from layout.tsx
  const waitForGoogleMaps = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (window.google && window.google.maps && window.google.maps.places) {
        console.log('✅ Google Maps ve Places API zaten yüklü');
        resolve();
        return;
      }

      let attempts = 0;
      const maxAttempts = 100; // 10 saniye
      
      const checkLoaded = setInterval(() => {
        attempts++;
        
        if (window.google && window.google.maps && window.google.maps.places) {
          console.log('✅ Google Maps ve Places API yüklendi!');
          clearInterval(checkLoaded);
          resolve();
        } else if (attempts >= maxAttempts) {
          console.error('❌ Google API yüklenemedi');
          clearInterval(checkLoaded);
          reject(new Error('Google Maps API yüklenemedi. İnternet bağlantınızı kontrol edin.'));
        }
      }, 100);
    });
  }, []);

  // Initialize map
  const initializeMap = useCallback(async () => {
    if (!mapRef.current) return;

    try {
      setIsLoading(true);
      setError(null);

      await waitForGoogleMaps();

      const mapInstance = new google.maps.Map(mapRef.current, {
        center,
        zoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });

      setMap(mapInstance);
      onMapLoad?.(mapInstance);
      setIsLoading(false);
      
      console.log('🗺️ Harita başarıyla yüklendi');
    } catch (error) {
      console.error('❌ Harita yüklenirken hata:', error);
      setError(error instanceof Error ? error.message : 'Bilinmeyen hata');
      setIsLoading(false);
    }
  }, [center, zoom, onMapLoad, waitForGoogleMaps]);

  // Clear all markers
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => marker.setMap(null));
    markersRef.current = [];
  }, []);

  // Add markers for places with better icons and info
  const addPlaceMarkers = useCallback(() => {
    if (!map) return;

    clearMarkers();

    places.forEach((place, index) => {
      // Choose icon based on place type
      let iconUrl = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png';
      let iconColor = '#FF6B6B';
      
      if (place.types?.includes('restaurant') || place.types?.includes('food')) {
        iconUrl = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png';
        iconColor = '#FF6B6B';
      } else if (place.types?.includes('transit_station')) {
        iconUrl = 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/transit_station-71.png';
        iconColor = '#4ECDC4';
      }

      const marker = new google.maps.Marker({
        position: {
          lat: place.geometry.location.lat,
          lng: place.geometry.location.lng,
        },
        map,
        title: place.name,
        icon: {
          url: place.icon || iconUrl,
          scaledSize: new google.maps.Size(32, 32),
        },
        animation: google.maps.Animation.DROP,
        label: {
          text: (index + 1).toString(),
          color: 'white',
          fontWeight: 'bold',
          fontSize: '12px'
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div class="p-3 max-w-xs">
            <h3 class="font-bold text-base text-gray-900 mb-2">${place.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${place.vicinity || 'Konum bilgisi yok'}</p>
            ${place.rating ? `
              <div class="flex items-center mb-2">
                <span class="text-yellow-500 text-base">⭐</span>
                <span class="text-sm ml-1 font-medium">${place.rating}</span>
                ${place.user_ratings_total ? `
                  <span class="text-xs text-gray-500 ml-1">(${place.user_ratings_total} değerlendirme)</span>
                ` : ''}
              </div>
            ` : ''}
            <div class="flex space-x-2 mt-2">
              <button 
                onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${place.geometry.location.lat},${place.geometry.location.lng}')" 
                class="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600"
              >
                🗺️ Rota Al
              </button>
              <button 
                onclick="window.open('https://www.google.com/maps/place/?q=place_id:${place.place_id}')" 
                class="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
              >
                📍 Detaylar
              </button>
            </div>
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      // Auto center map to show all markers
      if (index === 0) {
        map.setCenter(marker.getPosition()!);
        map.setZoom(14);
      }

      markersRef.current.push(marker);
    });

    // Fit map to show all markers
    if (places.length > 1) {
      const bounds = new google.maps.LatLngBounds();
      places.forEach(place => {
        bounds.extend(new google.maps.LatLng(place.geometry.location.lat, place.geometry.location.lng));
      });
      map.fitBounds(bounds);
      
      // Don't zoom too close
      const listener = google.maps.event.addListener(map, "idle", function() {
        if (map.getZoom()! > 16) map.setZoom(16);
        google.maps.event.removeListener(listener);
      });
    }
  }, [map, places, clearMarkers]);

  // Add user location marker
  const addUserLocationMarker = useCallback(() => {
    if (!map || !userLocation) return;

    const userMarker = new google.maps.Marker({
      position: userLocation,
      map,
      title: 'Konumunuz',
      icon: {
        url: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png',
        scaledSize: new google.maps.Size(40, 40),
      },
    });

    const userInfoWindow = new google.maps.InfoWindow({
      content: '<div class="p-2"><strong>Mevcut Konumunuz</strong></div>',
    });

    userMarker.addListener('click', () => {
      userInfoWindow.open(map, userMarker);
    });

    markersRef.current.push(userMarker);
  }, [map, userLocation]);

  // Initialize map on component mount
  useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  // Update markers when places change
  useEffect(() => {
    if (map) {
      addPlaceMarkers();
      addUserLocationMarker();
    }
  }, [map, places, userLocation, addPlaceMarkers, addUserLocationMarker]);

  // Update map center and zoom
  useEffect(() => {
    if (map) {
      map.setCenter(center);
      map.setZoom(zoom);
    }
  }, [map, center, zoom]);

  if (error) {
    return (
      <div className="w-full h-96 bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
        <div className="text-center p-4">
          <div className="text-red-600 text-4xl mb-2">❌</div>
          <h3 className="text-red-800 font-semibold mb-2">Harita Yüklenemedi</h3>
          <p className="text-red-600 text-sm">{error}</p>
          <button 
            onClick={initializeMap}
            className="mt-3 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
            <p className="text-gray-600 text-sm">Google Haritalar yükleniyor...</p>
          </div>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
};