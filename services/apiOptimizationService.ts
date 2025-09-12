interface CacheItem<T> {
  data: T;
  timestamp: number;
  expires: number;
}

interface RequestQueue {
  promise: Promise<any>;
  timestamp: number;
}

/**
 * API isteklerini cache'leyen ve rate limit yöneten servis
 */
export class APIOptimizationService {
  private static instance: APIOptimizationService;
  private cache = new Map<string, CacheItem<any>>();
  private requestQueue = new Map<string, RequestQueue>();
  private requestCounts = new Map<string, number[]>(); // Dakikalık request sayısı
  
  // Rate limiting ayarları
  private readonly MAX_REQUESTS_PER_MINUTE = 50; // Google Places API limiti
  private readonly CACHE_DURATION = {
    places: 10 * 60 * 1000, // 10 dakika
    autocomplete: 5 * 60 * 1000, // 5 dakika
    geocoding: 30 * 60 * 1000, // 30 dakika
  };
  
  private readonly REQUEST_DELAY = 100; // Requestler arası minimum delay (ms)
  private lastRequestTime = 0;

  private constructor() {
    // Cache temizleme interval'ı (her 5 dakikada bir)
    setInterval(() => this.cleanExpiredCache(), 5 * 60 * 1000);
  }

  static getInstance(): APIOptimizationService {
    if (!APIOptimizationService.instance) {
      APIOptimizationService.instance = new APIOptimizationService();
    }
    return APIOptimizationService.instance;
  }

  /**
   * Cache key oluşturur
   */
  private createCacheKey(type: string, params: any): string {
    return `${type}:${JSON.stringify(params)}`;
  }

  /**
   * Cache'den veri alır
   */
  private getFromCache<T>(cacheKey: string): T | null {
    const item = this.cache.get(cacheKey);
    if (!item) return null;
    
    const now = Date.now();
    if (now > item.expires) {
      this.cache.delete(cacheKey);
      return null;
    }
    
    console.log(`📊 Cache hit: ${cacheKey}`);
    return item.data;
  }

  /**
   * Cache'e veri ekler
   */
  private setCache<T>(cacheKey: string, data: T, duration: number): void {
    const now = Date.now();
    this.cache.set(cacheKey, {
      data,
      timestamp: now,
      expires: now + duration
    });
    console.log(`💾 Cache set: ${cacheKey} (expires in ${duration/1000}s)`);
  }

  /**
   * Süresi dolmuş cache verilerini temizler
   */
  private cleanExpiredCache(): void {
    const now = Date.now();
    let cleanedCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expires) {
        this.cache.delete(key);
        cleanedCount++;
      }
    }
    
    if (cleanedCount > 0) {
      console.log(`🧹 Cache cleaned: ${cleanedCount} expired items removed`);
    }
  }

  /**
   * Rate limiting kontrolü
   */
  private canMakeRequest(): boolean {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    
    // Son bir dakikadaki request sayısını kontrol et
    for (const [endpoint, timestamps] of this.requestCounts.entries()) {
      // Eski timestampleri temizle
      const recentRequests = timestamps.filter(time => time > oneMinuteAgo);
      this.requestCounts.set(endpoint, recentRequests);
      
      if (recentRequests.length >= this.MAX_REQUESTS_PER_MINUTE) {
        console.warn(`⚠️ Rate limit reached for ${endpoint}`);
        return false;
      }
    }
    
    // Request delay kontrolü
    const timeSinceLastRequest = now - this.lastRequestTime;
    if (timeSinceLastRequest < this.REQUEST_DELAY) {
      return false;
    }
    
    return true;
  }

  /**
   * Request sayısını kaydet
   */
  private recordRequest(endpoint: string): void {
    const now = Date.now();
    this.lastRequestTime = now;
    
    if (!this.requestCounts.has(endpoint)) {
      this.requestCounts.set(endpoint, []);
    }
    
    this.requestCounts.get(endpoint)!.push(now);
  }

  /**
   * Aynı isteğin tekrarlanmasını önler (deduplication)
   */
  private async deduplicateRequest<T>(
    cacheKey: string,
    requestFn: () => Promise<T>
  ): Promise<T> {
    // Eğer aynı istek zaten yapılıyorsa, onun sonucunu bekle
    const existingRequest = this.requestQueue.get(cacheKey);
    if (existingRequest) {
      const age = Date.now() - existingRequest.timestamp;
      if (age < 5000) { // 5 saniye içindeki istekleri deduplicate et
        console.log(`🔄 Deduplicating request: ${cacheKey}`);
        return existingRequest.promise;
      } else {
        // Eski request timeout olmuş, kaldır
        this.requestQueue.delete(cacheKey);
      }
    }

    // Yeni request başlat
    const promise = requestFn();
    this.requestQueue.set(cacheKey, {
      promise,
      timestamp: Date.now()
    });

    try {
      const result = await promise;
      this.requestQueue.delete(cacheKey);
      return result;
    } catch (error) {
      this.requestQueue.delete(cacheKey);
      throw error;
    }
  }

  /**
   * Rate limit ile bekler
   */
  private async waitForRateLimit(): Promise<void> {
    while (!this.canMakeRequest()) {
      await new Promise(resolve => setTimeout(resolve, 200));
    }
  }

  /**
   * Optimize edilmiş Places API çağrısı
   */
  async optimizedPlacesSearch(
    requestFn: () => Promise<any>,
    location: { lat: number; lng: number },
    type: string,
    radius: number = 1000
  ): Promise<any> {
    // Cache key oluştur
    const cacheKey = this.createCacheKey('places', { location, type, radius });
    
    // Cache'den kontrol et
    const cachedResult = this.getFromCache(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    // Rate limit kontrolü
    await this.waitForRateLimit();
    
    // Request deduplication
    return this.deduplicateRequest(cacheKey, async () => {
      this.recordRequest('places');
      console.log(`🌐 Making API request: places search (${type})`);
      
      try {
        const result = await requestFn();
        
        // Başarılı sonucu cache'le
        this.setCache(cacheKey, result, this.CACHE_DURATION.places);
        
        return result;
      } catch (error) {
        console.error(`❌ API request failed:`, error);
        throw error;
      }
    });
  }

  /**
   * Optimize edilmiş Autocomplete API çağrısı
   */
  async optimizedAutocomplete(
    requestFn: () => Promise<any>,
    input: string
  ): Promise<any> {
    // Çok kısa inputları ignore et
    if (input.length < 3) {
      return [];
    }

    const cacheKey = this.createCacheKey('autocomplete', { input });
    
    // Cache'den kontrol et
    const cachedResult = this.getFromCache(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }

    // Rate limit kontrolü
    await this.waitForRateLimit();
    
    return this.deduplicateRequest(cacheKey, async () => {
      this.recordRequest('autocomplete');
      console.log(`🌐 Making API request: autocomplete (${input})`);
      
      try {
        const result = await requestFn();
        
        // Başarılı sonucu cache'le
        this.setCache(cacheKey, result, this.CACHE_DURATION.autocomplete);
        
        return result;
      } catch (error) {
        console.error(`❌ Autocomplete request failed:`, error);
        throw error;
      }
    });
  }

  /**
   * Cache istatistikleri
   */
  getCacheStats(): {
    totalItems: number;
    hitRate: number;
    requestCounts: Record<string, number>;
  } {
    const now = Date.now();
    const oneMinuteAgo = now - 60 * 1000;
    
    const requestCounts: Record<string, number> = {};
    for (const [endpoint, timestamps] of this.requestCounts.entries()) {
      requestCounts[endpoint] = timestamps.filter(time => time > oneMinuteAgo).length;
    }
    
    return {
      totalItems: this.cache.size,
      hitRate: 0, // TODO: Hit rate tracking eklenebilir
      requestCounts
    };
  }

  /**
   * Cache'i temizle
   */
  clearCache(): void {
    this.cache.clear();
    console.log('🧹 Cache cleared manually');
  }
}