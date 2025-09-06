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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6 sm:mb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-sky-50 px-4 sm:px-6 py-4 border-b border-blue-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 text-xl">🌤️</span>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
              Hava Durumu
            </h3>
            <p className="text-sm text-blue-600">
              {new Date().toLocaleDateString('tr-TR')}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* City Selection - Mobile Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-3">
            {popularCities.map((city) => (
              <button
                key={city.name}
                onClick={() => fetchWeatherByCity(city.name)}
                disabled={isLoading}
                className={`flex flex-col items-center p-3 rounded-xl transition-all duration-200 touch-manipulation ${
                  selectedCity === city.name
                    ? 'bg-blue-500 text-white shadow-lg transform scale-105'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 active:bg-gray-200'
                } ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}`}
              >
                <span className="text-lg mb-1">{city.flag}</span>
                <span className="text-xs font-medium text-center leading-tight">
                  {city.name}
                </span>
              </button>
            ))}
          </div>
          
          {/* User Location Button */}
          {userLocation && (
            <button
              onClick={() => {
                setSelectedCity('');
                fetchWeatherByLocation(userLocation);
              }}
              disabled={isLoading}
              className={`w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200 touch-manipulation ${
                !selectedCity
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-green-50 text-green-700 hover:bg-green-100'
              } disabled:opacity-50`}
            >
              <span className="text-lg mr-2">📍</span>
              <span className="text-sm font-medium">Mevcut Konumum</span>
            </button>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="text-sm text-gray-500">Hava durumu yükleniyor...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <div className="flex items-start space-x-3">
              <span className="text-red-500 text-lg flex-shrink-0">⚠️</span>
              <div>
                <p className="text-red-800 text-sm font-medium">Hata!</p>
                <p className="text-red-700 text-sm mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Weather Data - Mobile Optimized */}
        {weatherData && !isLoading && (
          <div className="animate-fadeIn space-y-4">
            {/* Main Weather Card */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-4 sm:p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-bold mb-1">
                    {weatherData.location}
                  </h4>
                  <p className="text-blue-100 text-sm opacity-90 capitalize">
                    {weatherData.description}
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end mb-1">
                    <span className="text-2xl sm:text-3xl mr-2">
                      {getWeatherEmoji(weatherData.icon)}
                    </span>
                    <span className="text-3xl sm:text-4xl font-bold">
                      {weatherData.temperature}°
                    </span>
                  </div>
                  <p className="text-blue-100 text-sm">
                    Hissedilen {weatherData.feelsLike}°C
                  </p>
                </div>
              </div>
            </div>

            {/* Weather Details Grid - Mobile First */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
                <div className="text-blue-600 text-lg mb-1">💧</div>
                <div className="text-blue-800 text-xs font-medium">Nem</div>
                <div className="text-blue-700 text-sm font-semibold">{weatherData.humidity}%</div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
                <div className="text-green-600 text-lg mb-1">💨</div>
                <div className="text-green-800 text-xs font-medium">Rüzgar</div>
                <div className="text-green-700 text-sm font-semibold">{Math.round(weatherData.windSpeed)} km/h</div>
              </div>

              <div className="bg-orange-50 border border-orange-100 rounded-xl p-3 text-center">
                <div className="text-orange-600 text-lg mb-1">🌡️</div>
                <div className="text-orange-800 text-xs font-medium">Basınç</div>
                <div className="text-orange-700 text-sm font-semibold">{weatherData.pressure} hPa</div>
              </div>

              <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-center">
                <div className="text-purple-600 text-lg mb-1">�</div>
                <div className="text-purple-800 text-xs font-medium">Durum</div>
                <div className="text-purple-700 text-sm font-semibold">İyi</div>
              </div>
            </div>

            {/* Travel Tips - Mobile Optimized */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <span className="text-yellow-600 text-lg flex-shrink-0 mt-0.5">💡</span>
                <div>
                  <h5 className="font-medium text-yellow-800 mb-1">Seyahat Önerisi</h5>
                  <p className="text-yellow-700 text-sm leading-relaxed">
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
            </div>
          </div>
        )}

        {/* Empty State */}
        {!weatherData && !isLoading && !error && (
          <div className="text-center py-8">
            <span className="text-4xl mb-4 block">�️</span>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              Hava Durumunu Görüntüle
            </h4>
            <p className="text-gray-600 text-sm">
              Şehir seçin veya mevcut konumunuzu kullanın
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
