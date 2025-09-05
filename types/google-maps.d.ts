// Global type definitions for Google Maps API
declare global {
  interface Window {
    google: typeof google;
    initMap?: () => void;
  }

  namespace google {
    namespace maps {
      class Map {
        constructor(mapDiv: HTMLElement, opts?: MapOptions);
        setCenter(latLng: LatLng | LatLngLiteral): void;
        setZoom(zoom: number): void;
      }

      interface MapOptions {
        center?: LatLng | LatLngLiteral;
        zoom?: number;
        streetViewControl?: boolean;
        mapTypeControl?: boolean;
        fullscreenControl?: boolean;
        styles?: MapTypeStyle[];
        mapTypeId?: MapTypeId;
      }

      enum MapTypeId {
        ROADMAP = 'roadmap',
        SATELLITE = 'satellite',
        HYBRID = 'hybrid',
        TERRAIN = 'terrain'
      }

      class Marker {
        constructor(opts?: MarkerOptions);
        setMap(map: Map | null): void;
        addListener(eventName: string, handler: () => void): void;
      }

      interface MarkerOptions {
        position?: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: string | MarkerIcon;
      }

      interface MarkerIcon {
        url: string;
        scaledSize?: Size;
      }

      class InfoWindow {
        constructor(opts?: InfoWindowOptions);
        open(map: Map, anchor?: Marker): void;
        close(): void;
      }

      interface InfoWindowOptions {
        content?: string;
      }

      class Size {
        constructor(width: number, height: number);
      }

      interface MapTypeStyle {
        featureType?: string;
        elementType?: string;
        stylers?: Array<{[key: string]: any}>;
      }

      class Marker {
        constructor(opts?: MarkerOptions);
        setMap(map: Map | null): void;
        addListener(eventName: string, handler: () => void): void;
      }

      interface MarkerOptions {
        position?: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: string | Icon | Symbol;
      }

      interface Icon {
        url: string;
        scaledSize?: Size;
      }

      class Size {
        constructor(width: number, height: number);
      }

      class InfoWindow {
        constructor(opts?: InfoWindowOptions);
        open(map?: Map, anchor?: Marker): void;
      }

      interface InfoWindowOptions {
        content?: string;
      }

      interface LatLng {
        lat(): number;
        lng(): number;
      }

      interface LatLngLiteral {
        lat: number;
        lng: number;
      }

      namespace places {
        class PlacesService {
          constructor(attrContainer: Map | HTMLDivElement);
          nearbySearch(
            request: PlaceSearchRequest,
            callback: (
              results: PlaceResult[] | null,
              status: PlacesServiceStatus
            ) => void
          ): void;
        }

        interface PlaceSearchRequest {
          location: LatLng | LatLngLiteral;
          radius: number | string;
          type?: string[];
        }

        interface PlaceResult {
          place_id?: string;
          name?: string;
          vicinity?: string;
          rating?: number;
          user_ratings_total?: number;
          geometry?: PlaceGeometry;
          icon?: string;
          types?: string[];
        }

        interface PlaceGeometry {
          location?: LatLng;
        }

        enum PlacesServiceStatus {
          OK = 'OK',
          ZERO_RESULTS = 'ZERO_RESULTS',
          OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
          REQUEST_DENIED = 'REQUEST_DENIED',
          INVALID_REQUEST = 'INVALID_REQUEST',
          UNKNOWN_ERROR = 'UNKNOWN_ERROR'
        }
      }
    }
  }
}

export {};
