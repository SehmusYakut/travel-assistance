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
        getZoom(): number | undefined;
        fitBounds(bounds: LatLngBounds): void;
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
        getPosition(): LatLng | null;
      }

      interface MarkerOptions {
        position?: LatLng | LatLngLiteral;
        map?: Map;
        title?: string;
        icon?: string | MarkerIcon;
        animation?: Animation;
        label?: MarkerLabel;
      }

      interface MarkerIcon {
        url: string;
        scaledSize?: Size;
      }

      interface MarkerLabel {
        text: string;
        color?: string;
        fontWeight?: string;
        fontSize?: string;
      }

      enum Animation {
        BOUNCE = 1,
        DROP = 2
      }

      class LatLngBounds {
        constructor();
        extend(latLng: LatLng | LatLngLiteral): void;
      }

      namespace event {
        function addListener(instance: any, eventName: string, handler: () => void): any;
        function removeListener(listener: any): void;
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

      // Directions API
      class DirectionsService {
        route(request: DirectionsRequest, callback: (result: DirectionsResult | null, status: DirectionsStatus) => void): void;
      }

      class DirectionsRenderer {
        constructor(opts?: DirectionsRendererOptions);
        setMap(map: Map | null): void;
        setDirections(directions: DirectionsResult): void;
      }

      interface DirectionsRendererOptions {
        suppressMarkers?: boolean;
        polylineOptions?: {
          strokeColor?: string;
          strokeOpacity?: number;
          strokeWeight?: number;
        };
      }

      interface DirectionsRequest {
        origin: LatLng | LatLngLiteral | string;
        destination: LatLng | LatLngLiteral | string;
        travelMode: TravelMode;
        unitSystem?: UnitSystem;
        avoidHighways?: boolean;
        avoidTolls?: boolean;
      }

      interface DirectionsResult {
        routes: DirectionsRoute[];
      }

      interface DirectionsRoute {
        legs: DirectionsLeg[];
      }

      interface DirectionsLeg {
        distance?: { text: string; value: number };
        duration?: { text: string; value: number };
        steps: DirectionsStep[];
      }

      interface DirectionsStep {
        instructions: string;
        distance?: { text: string; value: number };
        duration?: { text: string; value: number };
      }

      enum DirectionsStatus {
        OK = 'OK',
        NOT_FOUND = 'NOT_FOUND',
        ZERO_RESULTS = 'ZERO_RESULTS',
        MAX_WAYPOINTS_EXCEEDED = 'MAX_WAYPOINTS_EXCEEDED',
        INVALID_REQUEST = 'INVALID_REQUEST',
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        REQUEST_DENIED = 'REQUEST_DENIED',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR'
      }

      enum TravelMode {
        DRIVING = 'DRIVING',
        WALKING = 'WALKING',
        BICYCLING = 'BICYCLING',
        TRANSIT = 'TRANSIT'
      }

      enum UnitSystem {
        METRIC = 0,
        IMPERIAL = 1
      }
    }
  }
}

export {};
