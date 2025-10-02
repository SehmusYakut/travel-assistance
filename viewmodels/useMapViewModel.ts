import { useState, useEffect, useCallback } from 'react';
import { Location, Place, PlaceType, AppState, MapState, CountryData } from '../models/types';
import { LocationService, GoogleMapsService } from '../services/mapService';
import { guideData } from '../data/countries';

// Hook for managing map state and operations
export const useMapViewModel = () => {
  // Map State
  const [mapState, setMapState] = useState<MapState>({
    center: { lat: 39.9334, lng: 32.8597 }, // Ankara, Turkey default
    zoom: 6,
    places: [],
    markers: [],
    isLoaded: false,
  });

  // App State
  const [appState, setAppState] = useState<AppState>({
    status: 'idle',
    errorMessage: '',
    activeTab: 'map',
    guideContent: null,
    searchType: undefined,
  });

  // Google Maps instance
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const googleMapsService = GoogleMapsService.getInstance();

  // Initialize Google Maps with better error handling
  const initializeMap = useCallback(async (mapElement: HTMLElement) => {
    // Prevent multiple initializations
    if (map || mapState.isLoaded) return;
    
    try {
      setAppState(prev => ({ ...prev, status: 'loading', errorMessage: '' }));
      
      // Load Google Maps API
      await googleMapsService.loadGoogleMaps();
      
      // Additional safety checks
      if (typeof window === 'undefined') {
        throw new Error('Window objesi bulunamadı');
      }
      
      if (!window.google || !window.google.maps) {
        throw new Error('Google Maps API yüklenemedi');
      }

      // Wait a moment for DOM to be ready
      await new Promise(resolve => setTimeout(resolve, 200));

      const mapInstance = new window.google.maps.Map(mapElement, {
        center: mapState.center,
        zoom: mapState.zoom,
        streetViewControl: false,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'simplified' }],
          },
        ],
      });

      // Test if map was created successfully
      if (!mapInstance) {
        throw new Error('Harita instance oluşturulamadı');
      }

      setMap(mapInstance);
      setMapState(prev => ({ ...prev, isLoaded: true }));
      setAppState(prev => ({ ...prev, status: 'idle' }));
      
      console.log('✅ Google Maps başarıyla yüklendi');
    } catch (error) {
      console.error('❌ Map initialization error:', error);
      setAppState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Harita yüklenemedi',
      }));
    }
  }, [mapState.center, mapState.zoom, map, mapState.isLoaded]);

  // Find user's current location
  const findCurrentLocation = useCallback(async () => {
    try {
      setAppState(prev => ({ ...prev, status: 'loading', errorMessage: '' }));
      
      const location = await LocationService.getCurrentPosition();
      
      setMapState(prev => ({
        ...prev,
        center: location,
        zoom: 15,
        places: [],
      }));
      
      setAppState(prev => ({
        ...prev,
        status: 'idle',
        activeTab: 'map',
        guideContent: null,
      }));

      // Update map center if map is loaded
      if (map) {
        map.setCenter(location);
        map.setZoom(15);
      }
    } catch (error) {
      setAppState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Konum alınamadı',
      }));
    }
  }, [map]);

  // Search nearby places
  const searchNearbyPlaces = useCallback(async (placeType: PlaceType) => {
    console.log('🎯 BAŞLANGIC - Arama tipi:', placeType);
    console.log('🗺️ Harita mevcut mu?', !!map);
    console.log('📍 Merkez konum:', mapState.center);
    
    if (!map) {
      console.error('❌ Harita yüklenmemiş!');
      setAppState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: 'Harita henüz yüklenmedi. Lütfen sayfayı yenileyin.',
      }));
      return;
    }

    setAppState(prev => ({ 
      ...prev, 
      status: 'loading', 
      errorMessage: '', 
      activeTab: 'map',
      guideContent: null,
      searchType: placeType
    }));

    try {
      console.log('🔍 Google Places API çağrısı başlatılıyor...');
      const places = await googleMapsService.searchNearbyPlaces(
        map,
        mapState.center,
        placeType,
        1000
      );
      
      console.log('🎉 SONUÇ - Bulunan mekan sayısı:', places.length);
      
      setMapState(prev => ({ ...prev, places, markers: [] }));
      setAppState(prev => ({ 
        ...prev, 
        status: 'success', 
        searchType: undefined 
      }));
      
    } catch (error) {
      console.error('💥 HATA:', error);
      setAppState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Arama başarısız oldu',
        searchType: undefined
      }));
    }
  }, [map, mapState.center, googleMapsService]);

  // Show country guide
  const showCountryGuide = useCallback((country: 'malaysia' | 'indonesia') => {
    const countryData = guideData[country];
    
    setAppState(prev => ({
      ...prev,
      activeTab: 'guide',
      guideContent: countryData,
      status: 'idle',
      errorMessage: '',
    }));

    setMapState(prev => ({ ...prev, places: [] }));
    
    // Clear markers
    if (mapState.markers && mapState.markers.length > 0) {
      googleMapsService.clearMarkers(mapState.markers);
      setMapState(prev => ({ ...prev, markers: [] }));
    }
  }, [mapState.markers]);

  // Update markers when places change - optimize with better cleanup
  useEffect(() => {
    if (!map || !mapState.isLoaded) return;

    let isCancelled = false;
    
    // Async function to handle marker creation
    const updateMarkers = async () => {
      try {
        // Clear existing markers safely
        if (mapState.markers && mapState.markers.length > 0) {
          googleMapsService.clearMarkers(mapState.markers);
        }

        if (isCancelled) return;

        const newMarkers: google.maps.Marker[] = [];

        // Wait a bit to ensure DOM is ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (isCancelled) return;

        // Add center marker
        try {
          const centerMarker = googleMapsService.createMarker(map, mapState.center, {
            title: 'Mevcut Konum',
            icon: typeof window !== 'undefined' && window.google && window.google.maps ? {
              url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
              scaledSize: new window.google.maps.Size(40, 40),
            } : undefined,
          });
          newMarkers.push(centerMarker);
        } catch (error) {
          console.warn('Center marker oluşturulamadı:', error);
        }

        if (isCancelled) return;

        // Add place markers
        for (const place of mapState.places) {
          if (isCancelled) break;
          
          try {
            const marker = googleMapsService.createMarker(map, place.geometry.location, {
              title: place.name,
              icon: place.icon && typeof window !== 'undefined' && window.google && window.google.maps
                ? {
                    url: place.icon,
                    scaledSize: new window.google.maps.Size(30, 30),
                  }
                : undefined,
            });

            // Add info window with error handling
            if (typeof window !== 'undefined' && window.google && window.google.maps) {
              const infoWindow = new window.google.maps.InfoWindow({
                content: `
                  <div style="padding: 8px; font-family: system-ui, sans-serif;">
                    <h3 style="margin: 0 0 4px 0; font-weight: bold; font-size: 14px;">${place.name}</h3>
                    <p style="margin: 0 0 4px 0; color: #666; font-size: 12px;">${place.vicinity}</p>
                    ${place.rating ? `<p style="margin: 0; font-weight: 500; font-size: 12px;">⭐ ${place.rating} (${place.user_ratings_total || 0} yorum)</p>` : ''}
                  </div>
                `,
              });

              marker.addListener('click', () => {
                if (!isCancelled) {
                  infoWindow.open(map, marker);
                }
              });
            }

            newMarkers.push(marker);
          } catch (error) {
            console.warn('Place marker oluşturulamadı:', place.name, error);
          }
        }

        if (!isCancelled) {
          setMapState(prev => ({ ...prev, markers: newMarkers }));
        }
      } catch (error) {
        console.warn('Marker update hatası:', error);
      }
    };

    updateMarkers();

    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, [map, mapState.places, mapState.center, mapState.isLoaded]);

  // Update map when center or zoom changes
  useEffect(() => {
    if (map) {
      try {
        map.setCenter(mapState.center);
        map.setZoom(mapState.zoom);
      } catch (error) {
        console.warn('Harita merkezi güncellenemedi:', error);
      }
    }
  }, [map, mapState.center, mapState.zoom]);

  // Cleanup markers when component unmounts
  useEffect(() => {
    return () => {
      if (mapState.markers && mapState.markers.length > 0) {
        googleMapsService.clearMarkers(mapState.markers);
      }
    };
  }, []); // Empty dependency array - sadece unmount'ta çalışsın

  return {
    mapState,
    appState,
    initializeMap,
    findCurrentLocation,
    searchNearbyPlaces,
    showCountryGuide,
  };
};
