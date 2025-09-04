// Type definitions for the application

export interface Location {
  lat: number;
  lng: number;
}

export interface Place {
  place_id: string;
  name: string;
  vicinity: string;
  rating?: number;
  user_ratings_total?: number;
  geometry: {
    location: Location;
  };
  icon?: string;
  types: string[];
}

export interface Attraction {
  name: string;
  city?: string;
  description: string;
}

export interface CountryData {
  attractions: Attraction[];
  safetyWarnings: string[];
}

export interface GuideData {
  [key: string]: CountryData;
}

export interface MapState {
  center: Location;
  zoom: number;
  places: Place[];
  markers: google.maps.Marker[];
  isLoaded: boolean;
}

export interface AppState {
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
  activeTab: 'map' | 'guide';
  guideContent: CountryData | null;
}

export enum PlaceType {
  RESTAURANT = 'restaurant',
  TRAIN_STATION = 'train_station',
  TOURIST_ATTRACTION = 'tourist_attraction',
  HOSPITAL = 'hospital',
  ATM = 'atm'
}
