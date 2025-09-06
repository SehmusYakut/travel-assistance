'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { getWeatherByCoords, getWeatherByCity, getForecastByCoords, getForecastByCity, WeatherData, ForecastData } from '../services/weatherService';

interface WeatherComponentProps {
  selectedCity?: string;
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({ selectedCity }) => {
  const { language, t } = useAppContext();
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForecast, setShowForecast] = useState(false);

  const fetchWeather = useCallback(async (city: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mevcut hava durumu
      const currentWeather = await getWeatherByCity(city);
      setWeatherData(currentWeather);
      
      // 5 günlük tahmin
      const forecast = await getForecastByCity(city);
      setForecastData(forecast);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchWeatherByCoords = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    
    try {
      // Mevcut hava durumu
      const currentWeather = await getWeatherByCoords(lat, lon);
      setWeatherData(currentWeather);
      
      // 5 günlük tahmin
      const forecast = await getForecastByCoords(lat, lon);
      setForecastData(forecast);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen hata');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Konum izni isteme
  const getCurrentLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error('Konum alınamadı:', error);
          setError('Konum izni gerekli');
        }
      );
    } else {
      setError('Bu tarayıcı konum özelliğini desteklemiyor');
    }
  }, [fetchWeatherByCoords]);

  // Seçilen şehir değiştiğinde hava durumunu güncelle
  useEffect(() => {
    if (selectedCity) {
      fetchWeather(selectedCity);
    }
  }, [selectedCity, fetchWeather]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return '☀️';
      case 'cloudy':
      case 'overcast':
        return '☁️';
      case 'partly cloudy':
        return '⛅';
      case 'rainy':
      case 'rain':
        return '🌧️';
      case 'snowy':
      case 'snow':
        return '❄️';
      case 'stormy':
      case 'thunderstorm':
        return '⛈️';
      default:
        return '🌤️';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return language === 'tr' ? 'Bugün' : 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return language === 'tr' ? 'Yarın' : 'Tomorrow';
    } else {
      return language === 'tr' 
        ? date.toLocaleDateString('tr-TR', { weekday: 'short', month: 'short', day: 'numeric' })
        : date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-300">
          {t('weather.loading')}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
        <div className="flex gap-2">
          <button
            onClick={getCurrentLocation}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            📍 {language === 'tr' ? 'Konumumu Kullan' : 'Use My Location'}
          </button>
          {selectedCity && (
            <button
              onClick={() => fetchWeather(selectedCity)}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              🔄 {language === 'tr' ? 'Tekrar Dene' : 'Retry'}
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500 dark:text-gray-400 mb-4">
          {language === 'tr' 
            ? 'Hava durumu görmek için bir şehir seçin veya konumunuzu paylaşın'
            : 'Select a city or share your location to see weather'}
        </p>
        
        {/* Hızlı Şehir Seçimi */}
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <button
            onClick={() => fetchWeather('Kuala Lumpur')}
            className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors text-sm"
          >
            🏨 {language === 'tr' ? 'Otelin Şehri (KL)' : 'Hotel City (KL)'}
          </button>
          <button
            onClick={() => fetchWeather('Jakarta')}
            className="px-4 py-2 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors text-sm"
          >
            🏙️ Jakarta
          </button>
          <button
            onClick={() => fetchWeather('Bali')}
            className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors text-sm"
          >
            🏝️ Bali
          </button>
        </div>
        
        <button
          onClick={getCurrentLocation}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
        >
          📍 {language === 'tr' ? 'Konumumu Kullan' : 'Use My Location'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Mevcut Hava Durumu */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {weatherData.location}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {language === 'tr' ? 'Şu an' : 'Now'}
          </span>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">
              {getWeatherIcon(weatherData.condition)}
            </span>
            <div>
              <div className="text-3xl font-bold text-gray-800 dark:text-gray-200">
                {Math.round(weatherData.temperature)}°C
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                {weatherData.condition}
              </div>
            </div>
          </div>
          
          <div className="text-right space-y-1">
            <div className="text-sm text-gray-600 dark:text-gray-300">
              💧 {weatherData.humidity}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              💨 {weatherData.windSpeed} km/h
            </div>
            {weatherData.feelsLike && (
              <div className="text-sm text-gray-600 dark:text-gray-300">
                {language === 'tr' ? 'Hissedilen' : 'Feels like'}: {Math.round(weatherData.feelsLike)}°C
              </div>
            )}
          </div>
        </div>

        {/* Hızlı Şehir Değiştirme */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => fetchWeather('Kuala Lumpur')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                weatherData.location.includes('Kuala Lumpur') 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
              }`}
            >
              🏨 {language === 'tr' ? 'Otelin Şehri (KL)' : 'Hotel City (KL)'}
            </button>
            <button
              onClick={() => fetchWeather('Jakarta')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                weatherData.location.includes('Jakarta') 
                  ? 'bg-green-500 text-white' 
                  : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
              }`}
            >
              🏙️ Jakarta
            </button>
            <button
              onClick={() => fetchWeather('Bali')}
              className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                weatherData.location.includes('Bali') 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-800'
              }`}
            >
              🏝️ Bali
            </button>
            <button
              onClick={getCurrentLocation}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-sm transition-colors"
            >
              📍 {language === 'tr' ? 'Konumum' : 'My Location'}
            </button>
          </div>
        </div>
      </div>

      {/* 5 Günlük Tahmin Toggle */}
      {forecastData && (
        <div className="text-center">
          <button
            onClick={() => setShowForecast(!showForecast)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-flex items-center gap-2"
          >
            📅 {language === 'tr' ? '5 Günlük Tahmin' : '5-Day Forecast'}
            <span className={`transform transition-transform ${showForecast ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>
        </div>
      )}

      {/* 5 Günlük Tahmin */}
      {showForecast && forecastData && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            {language === 'tr' ? '5 Günlük Hava Tahmini' : '5-Day Weather Forecast'}
          </h4>
          
          <div className="grid gap-4">
            {forecastData.daily.map((day, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">
                    {getWeatherIcon(day.condition)}
                  </span>
                  <div>
                    <div className="font-medium text-gray-800 dark:text-gray-200">
                      {formatDate(day.date)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {day.condition}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                      {Math.round(day.maxTemp)}°
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {Math.round(day.minTemp)}°
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                    <div>💧 {day.humidity}%</div>
                    {day.precipitation > 0 && (
                      <div>🌧️ {day.precipitation}mm</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Güncelleme Butonu */}
      <div className="text-center">
        <button
          onClick={() => selectedCity ? fetchWeather(selectedCity) : getCurrentLocation()}
          className="px-4 py-2 text-sm bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors inline-flex items-center gap-2"
        >
          🔄 {language === 'tr' ? 'Güncelle' : 'Refresh'}
        </button>
      </div>
    </div>
  );
};

export default WeatherComponent;
