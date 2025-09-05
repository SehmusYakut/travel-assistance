'use client';

import { useState, useEffect, useCallback } from 'react';
import { Location } from '../models/types';
import { WeatherService, WeatherData } from '../services/weatherService';

interface WeatherComponentProps {
  userLocation: Location | null;
}

export const WeatherComponent: React.FC<WeatherComponentProps> = ({ userLocation }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string>('');

  const weatherService = WeatherService.getInstance();

  const popularCities = [
    { name: 'Kuala Lumpur', flag: '🇲🇾' },
    { name: 'Penang', flag: '🇲🇾' },
    { name: 'Jakarta', flag: '🇮🇩' },
    { name: 'Bali', flag: '🇮🇩' },
  ];

  const fetchWeatherByLocation = useCallback(async (location: Location) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const weather = await weatherService.getWeatherByCoords(location.lat, location.lng);
      setWeatherData(weather);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Hava durumu alınamadı');
    } finally {
      setIsLoading(false);
    }
  }, [weatherService]);

  const fetchWeatherByCity = useCallback(async (cityName: string) => {
    setIsLoading(true);
    setError(null);
    setSelectedCity(cityName);
    
    try {
      const weather = await weatherService.getWeatherByCity(cityName);
      setWeatherData(weather);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Şehir hava durumu alınamadı');
    } finally {
      setIsLoading(false);
    }
  }, [weatherService]);

  // Auto-fetch weather when user location is available
  useEffect(() => {
    if (userLocation && !selectedCity) {
      fetchWeatherByLocation(userLocation);
    }
  }, [userLocation, fetchWeatherByLocation, selectedCity]);

  const getWeatherEmoji = (icon: string): string => {
    const iconMap: Record<string, string> = {
      '01d': '☀️', '01n': '🌙',
      '02d': '⛅', '02n': '☁️',
      '03d': '☁️', '03n': '☁️',
      '04d': '☁️', '04n': '☁️',
      '09d': '🌧️', '09n': '🌧️',
      '10d': '🌦️', '10n': '🌧️',
      '11d': '⛈️', '11n': '⛈️',
      '13d': '❄️', '13n': '❄️',
      '50d': '🌫️', '50n': '🌫️',
    };
    return iconMap[icon] || '🌤️';
  };

  const getTemperatureColor = (temp: number): string => {
    if (temp >= 35) return 'text-red-600';
    if (temp >= 30) return 'text-orange-500';
    if (temp >= 25) return 'text-yellow-500';
    return 'text-blue-500';
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900 flex items-center">
          🌤️ Hava Durumu
        </h3>
        <div className="text-xs text-gray-500">
          {new Date().toLocaleDateString('tr-TR')}
        </div>
      </div>

      {/* City Selection */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Popüler Şehirler:</p>
        <div className="flex flex-wrap gap-2">
          {popularCities.map((city) => (
            <button
              key={city.name}
              onClick={() => fetchWeatherByCity(city.name)}
              className={`px-3 py-2 text-sm rounded-full transition-colors ${
                selectedCity === city.name
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-100 border border-gray-200'
              }`}
            >
              {city.flag} {city.name}
            </button>
          ))}
          {userLocation && (
            <button
              onClick={() => {
                setSelectedCity('');
                fetchWeatherByLocation(userLocation);
              }}
              className={`px-3 py-2 text-sm rounded-full transition-colors ${
                !selectedCity
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-green-100 border border-gray-200'
              }`}
            >
              📍 Konumum
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mr-3"></div>
          <span className="text-blue-600">Hava durumu yükleniyor...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-600 text-lg mr-2">⚠️</span>
            <p className="text-red-800 text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Weather Data */}
      {weatherData && !isLoading && (
        <div className="space-y-4">
          {/* Main Weather Info */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-semibold text-gray-900">
                  {weatherData.location}
                </h4>
                <p className="text-gray-600 text-sm capitalize">
                  {weatherData.description}
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <span className="text-3xl mr-2">
                    {getWeatherEmoji(weatherData.icon)}
                  </span>
                  <span className={`text-3xl font-bold ${getTemperatureColor(weatherData.temperature)}`}>
                    {weatherData.temperature}°C
                  </span>
                </div>
                <p className="text-sm text-gray-500">
                  Hissedilen {weatherData.feelsLike}°C
                </p>
              </div>
            </div>
          </div>

          {/* Weather Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-3 shadow-sm text-center">
              <div className="text-blue-500 text-lg mb-1">💧</div>
              <div className="text-xs text-gray-500">Nem</div>
              <div className="font-semibold text-gray-900">{weatherData.humidity}%</div>
            </div>
            
            <div className="bg-white rounded-lg p-3 shadow-sm text-center">
              <div className="text-green-500 text-lg mb-1">🌬️</div>
              <div className="text-xs text-gray-500">Rüzgar</div>
              <div className="font-semibold text-gray-900">{weatherData.windSpeed} km/h</div>
            </div>
            
            <div className="bg-white rounded-lg p-3 shadow-sm text-center">
              <div className="text-purple-500 text-lg mb-1">🌡️</div>
              <div className="text-xs text-gray-500">Basınç</div>
              <div className="font-semibold text-gray-900">{weatherData.pressure} hPa</div>
            </div>
            
            <div className="bg-white rounded-lg p-3 shadow-sm text-center">
              <div className="text-orange-500 text-lg mb-1">👁️</div>
              <div className="text-xs text-gray-500">Görüş</div>
              <div className="font-semibold text-gray-900">İyi</div>
            </div>
          </div>

          {/* Travel Tips */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
            <div className="flex items-center mb-2">
              <span className="text-yellow-600 text-lg mr-2">💡</span>
              <h5 className="font-medium text-yellow-800">Seyahat Önerisi</h5>
            </div>
            <p className="text-yellow-700 text-sm">
              {weatherData.temperature > 32 
                ? 'Sıcak hava! Bol su için ve hafif giysiler tercih edin.'
                : weatherData.humidity > 80
                ? 'Yüksek nem var. İç mekân aktiviteleri düşünebilirsiniz.'
                : weatherData.windSpeed > 20
                ? 'Rüzgarlı hava. Deniz aktiviteleri için dikkatli olun.'
                : 'Seyahat için ideal hava koşulları! 🌟'
              }
            </p>
          </div>
        </div>
      )}

      {/* No Location Message */}
      {!userLocation && !weatherData && !isLoading && (
        <div className="text-center py-6">
          <span className="text-gray-400 text-4xl mb-3 block">🌍</span>
          <p className="text-gray-600 text-sm">
            Hava durumu için konumunuzu paylaşın veya bir şehir seçin
          </p>
        </div>
      )}
    </div>
  );
};
