import { useState, useEffect, useCallback } from 'react';
import { Location, Place, PlaceType, AppState, MapState, CountryData } from '../models/types';
import { LocationService, GoogleMapsService } from '../services/mapService';
import { guideData } from '../data/countries';

// Hook for managing map state and operations
export const useMapViewModel = () => {
  // Map State
  const [mapState, setMapState] = useState<MapState>({
    center: { lat: 3.1390, lng: 101.6869 }, // Kuala Lumpur default
    zoom: 12,
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
  });

  // Google Maps instance
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const googleMapsService = GoogleMapsService.getInstance();

  // Initialize Google Maps
  const initializeMap = useCallback(async (mapElement: HTMLElement) => {
    // Prevent multiple initializations
    if (map || mapState.isLoaded) return;
    
    try {
      setAppState(prev => ({ ...prev, status: 'loading' }));
      
      await googleMapsService.loadGoogleMaps();
      
      const mapInstance = new window.google.maps.Map(mapElement, {
        center: mapState.center,
        zoom: mapState.zoom,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ],
      });

      setMap(mapInstance);
      setMapState(prev => ({ ...prev, isLoaded: true }));
      setAppState(prev => ({ ...prev, status: 'idle' }));
    } catch (error) {
      setAppState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Harita yüklenemedi',
      }));
    }
  }, [mapState.center, mapState.zoom, map, mapState.isLoaded]); // googleMapsService dependency'sini kaldır

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
    if (!map) {
      setAppState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: 'Harita henüz yüklenmedi',
      }));
      return;
    }

    try {
      setAppState(prev => ({ 
        ...prev, 
        status: 'loading', 
        errorMessage: '', 
        activeTab: 'map',
        guideContent: null 
      }));

      // Clear existing markers
      googleMapsService.clearMarkers(mapState.markers);

      const places = await googleMapsService.searchNearbyPlaces(
        map,
        mapState.center,
        placeType,
        2000
      );

      setMapState(prev => ({ ...prev, places, markers: [] }));
      setAppState(prev => ({ ...prev, status: 'success' }));
    } catch (error) {
      setAppState(prev => ({
        ...prev,
        status: 'error',
        errorMessage: error instanceof Error ? error.message : 'Mekan arama başarısız',
      }));
    }
  }, [map, mapState.center, mapState.markers, googleMapsService]);

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
    googleMapsService.clearMarkers(mapState.markers);
    setMapState(prev => ({ ...prev, markers: [] }));
  }, [mapState.markers, googleMapsService]);

  // Update markers when places change
  useEffect(() => {
    if (!map || !mapState.isLoaded) return;

    // Clear existing markers
    googleMapsService.clearMarkers(mapState.markers);

    const newMarkers: google.maps.Marker[] = [];

    // Add center marker
    const centerMarker = googleMapsService.createMarker(map, mapState.center, {
      title: 'Mevcut Konum',
      icon: {
        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        scaledSize: new google.maps.Size(40, 40),
      },
    });
    newMarkers.push(centerMarker);

    // Add place markers
    mapState.places.forEach((place) => {
      const marker = googleMapsService.createMarker(map, place.geometry.location, {
        title: place.name,
        icon: place.icon
          ? {
              url: place.icon,
              scaledSize: new google.maps.Size(30, 30),
            }
          : undefined,
      });

      // Add info window
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px;">
            <h3 style="margin: 0 0 4px 0; font-weight: bold;">${place.name}</h3>
            <p style="margin: 0 0 4px 0; color: #666;">${place.vicinity}</p>
            ${place.rating ? `<p style="margin: 0; font-weight: 500;">⭐ ${place.rating} (${place.user_ratings_total || 0} yorum)</p>` : ''}
          </div>
        `,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      newMarkers.push(marker);
    });

    setMapState(prev => ({ ...prev, markers: newMarkers }));

    // Cleanup function
    return () => {
      googleMapsService.clearMarkers(newMarkers);
    };
  }, [map, mapState.places, mapState.center, mapState.isLoaded]); // googleMapsService'i kaldır

  // Update map when center or zoom changes
  useEffect(() => {
    if (map) {
      map.setCenter(mapState.center);
      map.setZoom(mapState.zoom);
    }
  }, [map, mapState.center, mapState.zoom]);

  // Cleanup markers when component unmounts
  useEffect(() => {
    return () => {
      if (mapState.markers.length > 0) {
        googleMapsService.clearMarkers(mapState.markers);
      }
    };
  }, []);

  return {
    mapState,
    appState,
    initializeMap,
    findCurrentLocation,
    searchNearbyPlaces,
    showCountryGuide,
  };
};
