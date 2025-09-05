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
    if (this.isLoaded && typeof window !== 'undefined' && window.google && window.google.maps) {
      return Promise.resolve();
    }

    if (this.loadPromise) {
      return this.loadPromise;
    }

    this.loadPromise = new Promise((resolve, reject) => {
      // Server-side rendering check
      if (typeof window === 'undefined') {
        reject(new Error('Window object not available'));
        return;
      }

      // Eğer window.google zaten varsa, direkt resolve et
      if (window.google && window.google.maps) {
        this.isLoaded = true;
        resolve();
        return;
      }

      // Script zaten yüklü mü kontrol et (src ile)
      const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');
      if (existingScript) {
        // Script var, API yüklenmesini bekle
        const checkInterval = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkInterval);
            this.isLoaded = true;
            resolve();
          }
        }, 100);
        
        // 10 saniye timeout
        setTimeout(() => {
          clearInterval(checkInterval);
          if (!this.isLoaded) {
            reject(new Error('Google Maps API yüklenemedi (timeout)'));
          }
        }, 10000);
        return;
      }

      // API key kontrolü
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
      if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
        reject(new Error('Google Maps API anahtarı tanımlı değil'));
        return;
      }

      // Yeni script oluştur
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&loading=async`;
      script.async = true;
      script.defer = true;

      script.onload = () => {
        // Double check
        if (window.google && window.google.maps) {
          this.isLoaded = true;
          resolve();
        } else {
          reject(new Error('Google Maps API yüklendi ama erişilemiyor'));
        }
      };

      script.onerror = () => {
        reject(new Error('Google Maps script yüklenemedi. API anahtarınızı kontrol edin.'));
      };

      // Script'i DOM'a ekle
      document.head.appendChild(script);
    });

    return this.loadPromise;
  }

  /**
   * Belirli bir konumun yakınındaki mekanları arar - Gerçek Google Places API
   */
  searchNearbyPlaces(
    map: google.maps.Map,
    location: Location,
    type: string,
    radius: number = 1000
  ): Promise<Place[]> {
    return new Promise((resolve, reject) => {
      console.log('🚀 Gerçek API Arama başlatıldı - Type:', type, 'Location:', location);
      
      if (typeof window === 'undefined' || !window.google || !window.google.maps) {
        console.error('❌ Google Maps API yüklenmemiş');
        reject(new Error('Google Maps API henüz yüklenmedi.'));
        return;
      }

      if (!window.google.maps.places) {
        console.error('❌ Google Places API yüklenmemiş');
        reject(new Error('Google Places API yüklenmemiş. Lütfen Google Cloud Console\'dan Places API\'yi etkinleştirin.'));
        return;
      }

      const service = new window.google.maps.places.PlacesService(map);
      
      // Daha spesifik arama parametreleri
      const request: google.maps.places.PlaceSearchRequest = {
        location: new google.maps.LatLng(location.lat, location.lng),
        radius: radius,
        type: type === 'train_station' ? 'transit_station' : type
      };

      console.log('📍 Places API çağrısı yapılıyor...', request);

      const timeoutId = setTimeout(() => {
        console.log('⏰ API Timeout - Google Cloud Console ayarlarını kontrol edin:');
        console.log('1. https://console.cloud.google.com/apis/dashboard adresine gidin');
        console.log('2. Places API etkin mi kontrol edin');
        console.log('3. Billing hesabı aktif mi kontrol edin');
        console.log('4. API key kısıtlamalarını kontrol edin');
        reject(new Error('Places API timeout. Google Cloud Console ayarlarını kontrol edin.'));
      }, 15000);

      service.nearbySearch(request, (results, status) => {
        clearTimeout(timeoutId);
        console.log('🔥 Google Places API Yanıtı - Status:', status);
        
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results && results.length > 0) {
          const places: Place[] = results.slice(0, 10).map((result) => ({
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
          
          console.log('✅ Gerçek API verisi:', places.length, 'mekan bulundu');
          console.log('📊 Bulunan mekanlar:', places.map(p => p.name));
          resolve(places);
        } else if (status === window.google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
          console.log('🤷‍♂️ Bu konumda hiç sonuç bulunamadı, daha geniş arama yapılıyor...');
          
          // Daha geniş arama yap
          const widerRequest = {
            ...request,
            radius: radius * 3,
          };
          
          service.nearbySearch(widerRequest, (widerResults, widerStatus) => {
            if (widerStatus === window.google.maps.places.PlacesServiceStatus.OK && widerResults && widerResults.length > 0) {
              const places: Place[] = widerResults.slice(0, 10).map((result) => ({
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
              
              console.log('✅ Geniş arama ile bulunan:', places.length, 'mekan');
              resolve(places);
            } else {
              console.log('❌ Geniş aramada da sonuç yok');
              resolve([]);
            }
          });
        } else {
          console.error('❌ Places API Hatası - Status:', status);
          
          // Hata türüne göre özel mesajlar
          let errorMessage = `Places API Hatası: ${status}`;
          switch (status) {
            case window.google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
              errorMessage = 'API quota aşıldı. Google Cloud Console\'dan quota limitini artırın.';
              break;
            case window.google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
              errorMessage = 'API key geçersiz veya Places API etkin değil.';
              break;
            case window.google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
              errorMessage = 'Geçersiz arama parametresi.';
              break;
          }
          
          reject(new Error(errorMessage));
        }
      });
    });
  }

  /**
   * Places API çalışmadığında kullanılacak örnek veriler - KALDIRILDI
   */
  private getFallbackPlaces(type: string, location: Location): Place[] {
    // Artık fallback kullanmıyoruz, sadı gerçek API
    return [];
  }

  /**
   * Harita üzerinde marker oluşturur
   */
  createMarker(
    map: google.maps.Map,
    position: Location,
    options: Partial<google.maps.MarkerOptions> = {}
  ): google.maps.Marker {
    if (typeof window === 'undefined' || !window.google || !window.google.maps) {
      throw new Error('Google Maps API yüklenmemiş');
    }

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
    if (!markers || markers.length === 0) return;
    
    markers.forEach((marker) => {
      if (marker && typeof marker.setMap === 'function') {
        try {
          marker.setMap(null);
        } catch (error) {
          // Marker zaten kaldırılmış veya geçersiz, devam et
          console.warn('Marker could not be removed:', error);
        }
      }
    });
  }
}
