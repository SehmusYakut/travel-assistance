'use client';

import { useState, useEffect } from 'react';
import { Place, Location, TurkishRestaurantCategory } from '../models/types';
import { TurkishRestaurantService } from '../services/turkishRestaurantService';

interface TurkishRestaurantsProps {
  map: google.maps.Map | null;
  userLocation: Location | null;
  onRestaurantSelect?: (restaurant: Place) => void;
}

const TurkishRestaurants: React.FC<TurkishRestaurantsProps> = ({
  map,
  userLocation,
  onRestaurantSelect
}) => {
  const [restaurants, setRestaurants] = useState<Place[]>([]);
  const [categories, setCategories] = useState<{ [key: string]: Place[] }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [totalFound, setTotalFound] = useState(0);
  
  const turkishService = TurkishRestaurantService.getInstance();

  // Türk restoranlarını ara
  const searchTurkishRestaurants = async () => {
    if (!map || !userLocation) {
      setError('Harita veya konum bilgisi mevcut değil');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const result = await turkishService.findTurkishRestaurants(map, userLocation, 3000);
      
      setRestaurants(result.restaurants);
      setCategories(result.categories);
      setTotalFound(result.totalFound);
      
      if (result.totalFound === 0) {
        setError('Bu bölgede Türk restoranı bulunamadı. Daha geniş bir alanda aramayı deneyin.');
      }
    } catch (err: any) {
      setError(err.message || 'Türk restoranları aranırken bir hata oluştu');
      console.error('Türk restoranı arama hatası:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Component yüklendiğinde otomatik arama
  useEffect(() => {
    if (map && userLocation) {
      searchTurkishRestaurants();
    }
  }, [map, userLocation]);

  // Filtrelenmiş restoranları getir
  const getFilteredRestaurants = () => {
    if (selectedCategory === 'all') {
      return restaurants;
    }
    return categories[selectedCategory] || [];
  };

  // Restoran seçimi
  const handleRestaurantClick = (restaurant: Place) => {
    if (onRestaurantSelect) {
      onRestaurantSelect(restaurant);
    }
  };

  // Rating yıldızları
  const renderRating = (rating?: number) => {
    if (!rating) return <span className="text-gray-400">Değerlendirme yok</span>;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="text-yellow-400">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="text-yellow-400">☆</span>);
    }
    
    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="text-gray-300">☆</span>);
    }
    
    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🇹🇷</span>
          <h2 className="text-xl font-bold text-gray-800">Türk Restoranları</h2>
          {totalFound > 0 && (
            <span className="bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
              {totalFound} restoran
            </span>
          )}
        </div>
        <button
          onClick={searchTurkishRestaurants}
          disabled={isLoading || !map || !userLocation}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Aranıyor...' : 'Yenile'}
        </button>
      </div>

      {/* Category Filter */}
      {Object.keys(categories).length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tümü ({restaurants.length})
            </button>
            {Object.entries(categories).map(([categoryName, categoryRestaurants]) => (
              <button
                key={categoryName}
                onClick={() => setSelectedCategory(categoryName)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === categoryName
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {categoryName} ({categoryRestaurants.length})
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Türk restoranları aranıyor...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* No Location */}
      {!userLocation && (
        <div className="text-center py-8 text-gray-500">
          <p>Türk restoranlarını görmek için konum izni verin</p>
        </div>
      )}

      {/* Restaurant List */}
      {!isLoading && !error && getFilteredRestaurants().length > 0 && (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {getFilteredRestaurants().map((restaurant) => (
            <div
              key={restaurant.place_id}
              onClick={() => handleRestaurantClick(restaurant)}
              className="border border-gray-200 rounded-lg p-3 hover:border-red-300 hover:bg-red-50 cursor-pointer transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    📍 {restaurant.vicinity}
                  </p>
                  <div className="mt-2">
                    {renderRating(restaurant.rating)}
                  </div>
                  {restaurant.user_ratings_total && (
                    <p className="text-xs text-gray-500 mt-1">
                      {restaurant.user_ratings_total} değerlendirme
                    </p>
                  )}
                </div>
                <div className="ml-3 flex-shrink-0">
                  <span className="text-2xl">🍽️</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && restaurants.length === 0 && userLocation && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🔍</div>
          <p>Bu bölgede Türk restoranı bulunamadı</p>
          <p className="text-sm mt-1">Farklı bir konumda aramayı deneyin</p>
        </div>
      )}

      {/* Info Footer */}
      {!isLoading && restaurants.length > 0 && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            💡 Yurt dışındayken Türk lezzetlerini özlemeyin!
          </p>
        </div>
      )}
    </div>
  );
};

export default TurkishRestaurants;