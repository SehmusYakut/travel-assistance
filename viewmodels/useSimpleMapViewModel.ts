import { useState, useCallback } from 'react';
import { Location, Place, CountryData } from '../models/types';
import { GoogleMapsService } from '../services/mapService';
import { guideData } from '../data/countries';

// Get the service instance
const googleMapsService = GoogleMapsService.getInstance();

interface MapState {
  center: Location;
  zoom: number;
  userLocation: Location | null;
  places: Place[];
  map: google.maps.Map | null;
}

interface AppState {
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
  activeTab: 'map' | 'guide';
  guideContent: CountryData | null;
  activeCountry: string | null;
}

export const useSimpleMapViewModel = () => {
  const [mapState, setMapState] = useState<MapState>({
    center: { lat: 4.2105, lng: 101.9758 }, // Malaysia center
    zoom: 6,
    userLocation: null,
    places: [],
    map: null
  });

  const [appState, setAppState] = useState<AppState>({
    status: 'idle',
    errorMessage: '',
    activeTab: 'map',
    guideContent: null,
    activeCountry: null
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  // Handle map initialization
  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance);
    setMapState(prev => ({ ...prev, map: mapInstance }));
    console.log('✅ Map loaded successfully');
  }, []);

  // Find current location
  const findCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setAppState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: 'Bu cihaz konum bulamıyor 😔'
      }));
      return;
    }

    setAppState(prev => ({ ...prev, status: 'loading' }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        setMapState(prev => ({
          ...prev,
          center: userLocation,
          userLocation: userLocation,
          zoom: 15
        }));

        setAppState(prev => ({ ...prev, status: 'success' }));
      },
      () => {
        setAppState(prev => ({
          ...prev,
          status: 'error',
          errorMessage: 'Konum bulunamadı, tekrar deneyelim? 🔍'
        }));
      }
    );
  }, []);

  // Search nearby places
  const searchNearbyPlaces = useCallback(async (placeType: string) => {
    if (!map) {
      setAppState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: 'Harita yükleniyor, biraz bekle 🗺️'
      }));
      return;
    }

    setAppState(prev => ({ ...prev, status: 'loading' }));

    try {
      const places = await googleMapsService.searchNearbyPlaces(
        map,
        mapState.center,
        placeType,
        2000
      );

      setMapState(prev => ({ ...prev, places }));
      setAppState(prev => ({ ...prev, status: 'success' }));
    } catch (error) {
      setAppState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Bulamadık ama başka yer deneyelim! 🔍'
      }));
    }
  }, [map, mapState.center]);

  // Show country guide
  const showCountryGuide = useCallback((country: 'malaysia' | 'indonesia') => {
    const countryData = guideData[country];
    
    setAppState(prev => ({
      ...prev,
      activeTab: 'guide',
      guideContent: countryData,
      activeCountry: country,
      status: 'idle',
      errorMessage: ''
    }));

    setMapState(prev => ({ ...prev, places: [] }));
  }, []);

  const clearGuide = useCallback(() => {
    setAppState(prev => ({
      ...prev,
      activeTab: 'map',
      guideContent: null,
      activeCountry: null
    }));
  }, []);

  const clearPlaces = useCallback(() => {
    setMapState(prev => ({ ...prev, places: [] }));
    setAppState(prev => ({ ...prev, activeTab: 'map' }));
  }, []);

  return {
    mapState,
    appState,
    handleMapLoad,
    findCurrentLocation,
    searchNearbyPlaces,
    showCountryGuide,
    clearGuide,
    clearPlaces
  };
};
