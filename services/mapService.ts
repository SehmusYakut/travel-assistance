import { Location, Place } from '../models/types';

export class LocationService {
  /**
   * Kullanıcının mevcut konumunu alır
   */
  static getCurrentPosition(): Promise<Location> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Tarayıcınız konum servislerini desteklemiyor.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          let errorMessage = 'Konum bilgisi alınamadı.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Konum izni reddedildi. Lütfen tarayıcı izinlerini kontrol edin.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Konum bilgisi kullanılamıyor.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Konum alma işlemi zaman aşımına uğradı.';
              break;
          }
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        }
      );
    });
  }
}

export class GoogleMapsService {
  private static instance: GoogleMapsService;
  private isLoaded = false;
  private loadPromise: Promise<void> | null = null;

  private constructor() {}

  static getInstance(): GoogleMapsService {
    if (!GoogleMapsService.instance) {
      GoogleMapsService.instance = new GoogleMapsService();
    }
    return GoogleMapsService.instance;
  }

  /**
   * Google Maps API'sini yükler
   */
  loadGoogleMaps(): Promise<void> {
    if (this.isLoaded) {
      return Promise.resolve();
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise((resolve, reject) => {
      // Eğer script zaten yüklenmişse
      if (window.google && window.google.maps) {
        this.isLoaded = true;
        resolve();
        return;
      }

      // Var olan script'i kontrol et
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        existingScript.addEventListener('load', () => {
          this.isLoaded = true;
          resolve();
        });
        existingScript.addEventListener('error', () => {
          reject(new Error('Google Maps script yüklenemedi.'));
        });
        return;
      }

      // Yeni script oluştur
      const script = document.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;

      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };

      script.onerror = () => {
        reject(new Error('Google Maps script yüklenemedi. API anahtarınızı kontrol edin.'));
      };

      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  /**
   * Belirli bir konumun yakınındaki mekanları arar
   */
  searchNearbyPlaces(
    map: google.maps.Map,
    location: Location,
    type: string,
    radius: number = 2000
  ): Promise<Place[]> {
    return new Promise((resolve, reject) => {
      if (!window.google || !window.google.maps) {
        reject(new Error('Google Maps API henüz yüklenmedi.'));
        return;
      }

      const service = new window.google.maps.places.PlacesService(map);
      const request: google.maps.places.PlaceSearchRequest = {
        location: location,
        radius: radius,
        type: [type] as any,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          // Google Places API sonuçlarını kendi Place tipimize dönüştür
          const places: Place[] = results.map((result) => ({
            place_id: result.place_id || '',
            name: result.name || '',
            vicinity: result.vicinity || '',
            rating: result.rating,
            user_ratings_total: result.user_ratings_total,
            geometry: {
              location: {
                lat: result.geometry?.location?.lat() || 0,
                lng: result.geometry?.location?.lng() || 0,
              },
            },
            icon: result.icon,
            types: result.types || [],
          }));
          resolve(places);
        } else {
          reject(new Error(`Mekan arama başarısız: ${status}`));
        }
      });
    });
  }

  /**
   * Harita üzerinde marker oluşturur
   */
  createMarker(
    map: google.maps.Map,
    position: Location,
    options: Partial<google.maps.MarkerOptions> = {}
  ): google.maps.Marker {
    return new window.google.maps.Marker({
      position,
      map,
      ...options,
    });
  }

  /**
   * Marker'ları temizler
   */
  clearMarkers(markers: google.maps.Marker[]): void {
    markers.forEach((marker) => marker.setMap(null));
  }
}
