// Weather Service using Open-Meteo API
export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  feelsLike: number;
  pressure: number;
}

export interface DailyForecast {
  date: string;
  dayName: string;
  maxTemp: number;
  minTemp: number;
  description: string;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
  precipitation: number;
}

export interface ForecastData {
  current: WeatherData;
  daily: DailyForecast[];
}

export class WeatherService {
  private static instance: WeatherService;
  // Open-Meteo API - Ücretsiz ve API key gerektirmiyor
  private readonly BASE_URL = 'https://api.open-meteo.com/v1/forecast';
  private readonly GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search';

  private constructor() {}

  public static getInstance(): WeatherService {
    if (!WeatherService.instance) {
      WeatherService.instance = new WeatherService();
    }
    return WeatherService.instance;
  }

  /**
   * Koordinatlara göre hava durumu getir
   */
  async getWeatherByCoords(lat: number, lng: number): Promise<WeatherData> {
    try {
      // Open-Meteo API çağrısı - API key gerektirmiyor
      const url = `${this.BASE_URL}?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure&timezone=auto`;
      
      console.log('Weather API request:', { lat, lng, url });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Weather API failed: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('Weather API response:', data);
      
      const current = data.current;
      
      return {
        location: await this.getLocationName(lat, lng),
        temperature: Math.round(current.temperature_2m),
        description: this.getWeatherDescription(current.weather_code),
        condition: this.getWeatherDescription(current.weather_code),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m * 3.6), // km/h
        icon: this.getWeatherIcon(current.weather_code),
        feelsLike: Math.round(current.temperature_2m), // Open-Meteo doesn't provide feels like by default
        pressure: Math.round(current.surface_pressure),
      };
      
    } catch (error) {
      console.error('Weather API error:', error);
      throw error;
    }
  }

  /**
   * 5 günlük hava tahmini getir
   */
  async getForecastByCoords(lat: number, lng: number): Promise<ForecastData> {
    try {
      // Open-Meteo API - günlük tahmin ile birlikte
      const url = `${this.BASE_URL}?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,surface_pressure&daily=temperature_2m_max,temperature_2m_min,weather_code,relative_humidity_2m_mean,wind_speed_10m_max&timezone=auto&forecast_days=6`;
      
      console.log('Forecast API request:', { lat, lng, url });
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Forecast API failed: ${response.status}`);
      }

      const data = await response.json();
      
      console.log('Forecast API response:', data);
      
      const current = data.current;
      const daily = data.daily;
      
      // Güncel hava durumu
      const currentWeather: WeatherData = {
        location: await this.getLocationName(lat, lng),
        temperature: Math.round(current.temperature_2m),
        description: this.getWeatherDescription(current.weather_code),
        condition: this.getWeatherDescription(current.weather_code),
        humidity: current.relative_humidity_2m,
        windSpeed: Math.round(current.wind_speed_10m * 3.6), // km/h
        icon: this.getWeatherIcon(current.weather_code),
        feelsLike: Math.round(current.temperature_2m),
        pressure: Math.round(current.surface_pressure),
      };

      // 5 günlük tahmin (bugün hariç)
      const dailyForecasts: DailyForecast[] = daily.time.slice(1, 6).map((date: string, index: number) => {
        const dateObj = new Date(date);
        const dayNames = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
        const dayName = index === 0 ? 'Yarın' : dayNames[dateObj.getDay()];
        
        return {
          date: date,
          dayName: dayName,
          maxTemp: Math.round(daily.temperature_2m_max[index + 1]),
          minTemp: Math.round(daily.temperature_2m_min[index + 1]),
          description: this.getWeatherDescription(daily.weather_code[index + 1]),
          condition: this.getWeatherDescription(daily.weather_code[index + 1]),
          icon: this.getWeatherIcon(daily.weather_code[index + 1]),
          humidity: Math.round(daily.relative_humidity_2m_mean[index + 1]),
          windSpeed: Math.round(daily.wind_speed_10m_max[index + 1] * 3.6), // km/h
          precipitation: 0, // Open-Meteo günlük yağış verisini ekleyebiliriz
        };
      });

      return {
        current: currentWeather,
        daily: dailyForecasts
      };
      
    } catch (error) {
      console.error('Forecast API error:', error);
      throw error;
    }
  }

  /**
   * Şehir adına göre 5 günlük hava tahmini getir
   */
  async getForecastByCity(cityName: string): Promise<ForecastData> {
    try {
      // Önce şehrin koordinatlarını alalım
      const geocodeUrl = `${this.GEOCODING_URL}?name=${encodeURIComponent(cityName)}&count=1&language=tr&format=json`;
      
      const geocodeResponse = await fetch(geocodeUrl);
      
      if (!geocodeResponse.ok) {
        throw new Error(`Geocoding API failed: ${geocodeResponse.status}`);
      }

      const geocodeData = await geocodeResponse.json();
      
      if (!geocodeData.results || geocodeData.results.length === 0) {
        throw new Error(`City not found: ${cityName}`);
      }

      const location = geocodeData.results[0];
      const lat = location.latitude;
      const lng = location.longitude;
      
      // Şimdi 5 günlük tahmin bilgisini alalım
      return await this.getForecastByCoords(lat, lng);
      
    } catch (error) {
      console.error('Forecast API error for city:', error);
      throw error;
    }
  }

  /**
   * Şehir adına göre hava durumu getir
   */
  async getWeatherByCity(cityName: string): Promise<WeatherData> {
    try {
      // Önce şehrin koordinatlarını alalım
      const geocodeUrl = `${this.GEOCODING_URL}?name=${encodeURIComponent(cityName)}&count=1&language=tr&format=json`;
      
      console.log('Geocoding API request:', { cityName, geocodeUrl });
      
      const geocodeResponse = await fetch(geocodeUrl);
      
      if (!geocodeResponse.ok) {
        throw new Error(`Geocoding API failed: ${geocodeResponse.status}`);
      }

      const geocodeData = await geocodeResponse.json();
      
      if (!geocodeData.results || geocodeData.results.length === 0) {
        throw new Error(`City not found: ${cityName}`);
      }

      const location = geocodeData.results[0];
      const lat = location.latitude;
      const lng = location.longitude;
      
      // Şimdi hava durumu bilgisini alalım
      return await this.getWeatherByCoords(lat, lng);
      
    } catch (error) {
      console.error('Weather API error for city:', error);
      throw error;
    }
  }

  /**
   * Koordinatlara göre konum adı al
   */
  private async getLocationName(lat: number, lng: number): Promise<string> {
    try {
      // Reverse geocoding with Open-Meteo
      const url = `${this.GEOCODING_URL}?latitude=${lat}&longitude=${lng}&count=1&language=tr&format=json`;
      const response = await fetch(url);
      
      if (response.ok) {
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          return data.results[0].name;
        }
      }
    } catch (error) {
      console.warn('Reverse geocoding failed:', error);
    }
    
    // Fallback to coordinate-based location
    return this.getLocationByCoords(lat, lng);
  }

  /**
   * Koordinatlara göre konum adı tahmin etme
   */
  private getLocationByCoords(lat: number, lng: number): string {
    // Malaysia coordinates (roughly)
    if (lat >= 1.0 && lat <= 7.0 && lng >= 99.0 && lng <= 120.0) {
      if (lat >= 5.0 && lat <= 6.5 && lng >= 100.0 && lng <= 101.0) {
        return 'Penang';
      } else if (lat >= 3.0 && lat <= 3.5 && lng >= 101.0 && lng <= 102.0) {
        return 'Kuala Lumpur';
      }
      return 'Malaysia';
    }
    
    // Indonesia coordinates (roughly)
    if (lat >= -11.0 && lat <= 6.0 && lng >= 95.0 && lng <= 141.0) {
      if (lat >= -6.5 && lat <= -6.0 && lng >= 106.5 && lng <= 107.0) {
        return 'Jakarta';
      } else if (lat >= -8.5 && lat <= -8.0 && lng >= 114.5 && lng <= 115.5) {
        return 'Bali';
      }
      return 'Indonesia';
    }
    
    return `${lat.toFixed(2)}, ${lng.toFixed(2)}`;
  }

  /**
   * Weather code'dan açıklama al
   */
  private getWeatherDescription(code: number): string {
    const weatherCodes: Record<number, string> = {
      0: 'Açık gökyüzü',
      1: 'Çoğunlukla açık',
      2: 'Parçalı bulutlu',
      3: 'Bulutlu',
      45: 'Sisli',
      48: 'Dondurucu sisli',
      51: 'Hafif çisenti',
      53: 'Orta çisenti',
      55: 'Yoğun çisenti',
      61: 'Hafif yağmur',
      63: 'Orta yağmur',
      65: 'Şiddetli yağmur',
      71: 'Hafif kar',
      73: 'Orta kar',
      75: 'Şiddetli kar',
      80: 'Hafif sağanak',
      81: 'Orta sağanak',
      82: 'Şiddetli sağanak',
      95: 'Fırtına',
      96: 'Dolu ile fırtına',
      99: 'Şiddetli dolu ile fırtına'
    };
    
    return weatherCodes[code] || 'Bilinmeyen';
  }

  /**
   * Weather code'dan ikon al
   */
  private getWeatherIcon(code: number): string {
    if (code === 0) return '01d'; // clear sky
    if (code === 1) return '02d'; // mainly clear
    if (code === 2) return '03d'; // partly cloudy
    if (code === 3) return '04d'; // overcast
    if (code >= 45 && code <= 48) return '50d'; // fog
    if (code >= 51 && code <= 55) return '09d'; // drizzle
    if (code >= 61 && code <= 65) return '10d'; // rain
    if (code >= 71 && code <= 75) return '13d'; // snow
    if (code >= 80 && code <= 82) return '09d'; // showers
    if (code >= 95 && code <= 99) return '11d'; // thunderstorm
    
    return '02d'; // default partly cloudy
  }
}

// Service singleton instance
const weatherService = WeatherService.getInstance();

// Export convenience functions
export const getWeatherByCoords = (lat: number, lng: number): Promise<WeatherData> => 
  weatherService.getWeatherByCoords(lat, lng);

export const getWeatherByCity = (cityName: string): Promise<WeatherData> => 
  weatherService.getWeatherByCity(cityName);

export const getForecastByCoords = (lat: number, lng: number): Promise<ForecastData> => 
  weatherService.getForecastByCoords(lat, lng);

export const getForecastByCity = (cityName: string): Promise<ForecastData> => 
  weatherService.getForecastByCity(cityName);
