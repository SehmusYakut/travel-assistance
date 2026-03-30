import { GoogleMapsService } from './mapService';
import { Location, Place, TurkishCuisineData, TurkishRestaurantCategory } from '../models/types';

/**
 * Türk restoranlarını bulan ve filtreyen özel servis
 */
export class TurkishRestaurantService {
  private static instance: TurkishRestaurantService;
  private googleMapsService = GoogleMapsService.getInstance();

  // Türk mutfağı kategorileri ve anahtar kelimeler
  private readonly turkishCuisineData: TurkishCuisineData = {
    categories: [
      {
        name: 'Türk Restoranı',
        keywords: ['turkish', 'turk', 'türk', 'turkish restaurant', 'turkish cuisine'],
        description: 'Geleneksel Türk mutfağı'
      },
      {
        name: 'Kebap & Döner',
        keywords: ['kebab', 'kebap', 'doner', 'döner', 'shish', 'adana', 'urfa'],
        description: 'Kebap ve döner çeşitleri'
      },
      {
        name: 'Türk Kahvesi & Çay',
        keywords: ['turkish coffee', 'turkish tea', 'türk kahvesi', 'çay evi', 'turkish cafe'],
        description: 'Türk kahvesi ve çay kültürü'
      },
      {
        name: 'Osmanlı Mutfağı',
        keywords: ['ottoman', 'osmanlı', 'palace cuisine', 'saray mutfağı'],
        description: 'Osmanlı saray mutfağı'
      },
      {
        name: 'Türk Tatlıları',
        keywords: ['baklava', 'turkish sweets', 'lokum', 'turkish delight', 'kunefe', 'künefe'],
        description: 'Geleneksel Türk tatlıları'
      },
      {
        name: 'Türk Fast Food',
        keywords: ['turkish fast food', 'durum', 'pide', 'lahmacun', 'simit'],
        description: 'Türk sokak lezzetleri'
      }
    ],
    searchKeywords: [
      'turkish restaurant',
      'türk restoran',
      'kebab',
      'döner', 
      'doner',
      'turkish cuisine',
      'turkish food',
      'istanbul restaurant',
      'anatolian',
      'ottoman',
      'turkish grill',
      'halal turkish'
    ]
  };

  private constructor() {}

  static getInstance(): TurkishRestaurantService {
    if (!TurkishRestaurantService.instance) {
      TurkishRestaurantService.instance = new TurkishRestaurantService();
    }
    return TurkishRestaurantService.instance;
  }

  /**
   * Yakınlardaki Türk restoranlarını arar
   */
  async findTurkishRestaurants(
    map: google.maps.Map,
    location: Location,
    radius: number = 2000
  ): Promise<{
    restaurants: Place[];
    categories: { [key: string]: Place[] };
    totalFound: number;
  }> {
    console.log('🇹🇷 Türk restoranları aranıyor...', location);

    try {
      // Google Maps API'den genel restoran araması
      const allRestaurants = await this.googleMapsService.searchNearbyPlaces(
        map,
        location,
        'restaurant',
        radius
      );

      console.log(`🔍 Toplam ${allRestaurants.length} restoran bulundu, Türk restoranları filtreleniyor...`);

      // Türk restoranlarını filtrele
      const turkishRestaurants = this.filterTurkishRestaurants(allRestaurants);

      // Kategorilere ayır
      const categorizedRestaurants = this.categorizeRestaurants(turkishRestaurants);

      // Eğer az sonuç varsa, daha spesifik aramalar yap
      if (turkishRestaurants.length < 5) {
        console.log('🔍 Az sonuç bulundu, spesifik Türk restoranı araması yapılıyor...');
        const additionalResults = await this.searchWithTurkishKeywords(map, location, radius);
        
        // Duplicate'leri çıkar ve birleştir
        const combinedResults = this.removeDuplicates([...turkishRestaurants, ...additionalResults]);
        
        return {
          restaurants: combinedResults,
          categories: this.categorizeRestaurants(combinedResults),
          totalFound: combinedResults.length
        };
      }

      return {
        restaurants: turkishRestaurants,
        categories: categorizedRestaurants,
        totalFound: turkishRestaurants.length
      };

    } catch (error) {
      console.error('❌ Türk restoranı arama hatası:', error);
      throw new Error('Türk restoranları aranırken bir hata oluştu');
    }
  }

  /**
   * Restoranları isim ve türlerine göre Türk restoranı olup olmadığına karar verir
   */
  private filterTurkishRestaurants(restaurants: Place[]): Place[] {
    return restaurants.filter(restaurant => {
      const name = restaurant.name.toLowerCase();
      const types = restaurant.types?.join(' ').toLowerCase() || '';
      const searchText = `${name} ${types}`;

      // Türk mutfağı anahtar kelimelerini kontrol et
      for (const category of this.turkishCuisineData.categories) {
        for (const keyword of category.keywords) {
          if (searchText.includes(keyword.toLowerCase())) {
            console.log(`✅ Türk restoranı bulundu: ${restaurant.name} (${keyword})`);
            return true;
          }
        }
      }

      // Türkiye/Istanbul ile ilgili kelimeler
      const turkishIndicators = [
        'istanbul', 'ankara', 'izmir', 'anatolia', 'anatolian',
        'bosphorus', 'boğaz', 'galata', 'sultan', 'osmanli',
        'pasha', 'paşa', 'çorbacı', 'lokantası'
      ];

      for (const indicator of turkishIndicators) {
        if (searchText.includes(indicator)) {
          console.log(`✅ Türk restoranı bulundu (gösterge): ${restaurant.name} (${indicator})`);
          return true;
        }
      }

      return false;
    });
  }

  /**
   * Türk mutfağı kategorilerine göre restoranları gruplar
   */
  private categorizeRestaurants(restaurants: Place[]): { [key: string]: Place[] } {
    const categories: { [key: string]: Place[] } = {};

    // Kategorileri başlat
    this.turkishCuisineData.categories.forEach(category => {
      categories[category.name] = [];
    });

    restaurants.forEach(restaurant => {
      const name = restaurant.name.toLowerCase();
      let categorized = false;

      // Her kategori için kontrol et
      for (const category of this.turkishCuisineData.categories) {
        for (const keyword of category.keywords) {
          if (name.includes(keyword.toLowerCase())) {
            categories[category.name].push(restaurant);
            categorized = true;
            break;
          }
        }
        if (categorized) break;
      }

      // Eğer hiçbir kategoriye girmiyorsa genel kategoriye koy
      if (!categorized) {
        if (!categories['Genel Türk Restoranları']) {
          categories['Genel Türk Restoranları'] = [];
        }
        categories['Genel Türk Restoranları'].push(restaurant);
      }
    });

    // Boş kategorileri kaldır
    Object.keys(categories).forEach(key => {
      if (categories[key].length === 0) {
        delete categories[key];
      }
    });

    return categories;
  }

  /**
   * Türkçe anahtar kelimelerle spesifik arama yapar
   */
  private async searchWithTurkishKeywords(
    map: google.maps.Map,
    location: Location,
    radius: number
  ): Promise<Place[]> {
    const results: Place[] = [];

    // En yaygın Türk restoranı anahtar kelimeleriyle ara
    const primaryKeywords = ['kebab', 'turkish restaurant', 'döner'];

    for (const keyword of primaryKeywords) {
      try {
        // Text search kullanarak daha geniş arama yap
        const keywordResults = await this.performTextSearch(map, location, keyword, radius);
        results.push(...keywordResults);
        
        // API rate limit için biraz bekle
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch (error) {
        console.warn(`⚠️ ${keyword} araması başarısız:`, error);
      }
    }

    return this.removeDuplicates(results);
  }

  /**
   * Google Places Text Search API kullanır
   */
  private performTextSearch(
    map: google.maps.Map,
    location: Location,
    query: string,
    radius: number
  ): Promise<Place[]> {
    return new Promise((resolve) => {
      const service = new google.maps.places.PlacesService(map);
      
      const request = {
        query: query,
        location: new google.maps.LatLng(location.lat, location.lng),
        radius: radius,
        type: 'restaurant'
      };

      service.textSearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const places: Place[] = results.slice(0, 5).map((result) => ({
            place_id: result.place_id || '',
            name: result.name || '',
            vicinity: result.vicinity || result.formatted_address || '',
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
          
          console.log(`🔍 Text search "${query}" sonucu: ${places.length} restoran`);
          resolve(places);
        } else {
          console.warn(`⚠️ Text search "${query}" başarısız: ${status}`);
          resolve([]);
        }
      });
    });
  }

  /**
   * Duplicate restoranları kaldırır (place_id'ye göre)
   */
  private removeDuplicates(restaurants: Place[]): Place[] {
    const unique = new Map<string, Place>();
    
    restaurants.forEach(restaurant => {
      if (restaurant.place_id && !unique.has(restaurant.place_id)) {
        unique.set(restaurant.place_id, restaurant);
      }
    });
    
    return Array.from(unique.values());
  }

  /**
   * Türk mutfağı kategorilerini döndürür
   */
  getTurkishCuisineCategories(): TurkishRestaurantCategory[] {
    return this.turkishCuisineData.categories;
  }

  /**
   * Bir restoranın Türk restoranı olup olmadığını kontrol eder
   */
  isTurkishRestaurant(restaurant: Place): boolean {
    return this.filterTurkishRestaurants([restaurant]).length > 0;
  }
}