'use client';

import React from 'react';
import { Place } from '../models/types';

interface PlacesListProps {
  places: Place[];
  isLoading: boolean;
  searchType?: string;
  onClose?: () => void;
}

export const PlacesList: React.FC<PlacesListProps> = ({ places, isLoading, searchType, onClose }) => {
  const getLoadingMessage = () => {
    switch (searchType) {
      case 'restaurant':
        return '🍽️ En iyi restoranlar aranıyor...';
      case 'train_station':
        return '🚊 En iyi ulaşım rotaları belirleniyor...';
      case 'tourist_attraction':
        return '🏛️ Popüler turistik yerler aranıyor...';
      case 'hospital':
        return '🏥 Yakın sağlık merkezleri aranıyor...';
      case 'atm':
        return '💳 En yakın ATMler aranıyor...';
      default:
        return '📍 Mekanlar aranıyor...';
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-3"></div>
        <p className="text-blue-600 font-medium">{getLoadingMessage()}</p>
        <p className="text-sm text-gray-500 mt-2">
          Google Places API&apos;den veri çekiliyor...
        </p>
      </div>
    );
  }

  if (places.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Bulunan Mekanlar ({places.length})
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            title="Kapat"
          >
            <span className="text-xl">✕</span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {places.map((place) => (
          <div
            key={place.place_id}
            className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-lg text-gray-900 truncate pr-2">
                {place.name}
              </h3>
              {place.rating && (
                <div className="flex items-center ml-2 flex-shrink-0">
                  <span className="text-yellow-500 text-sm">⭐</span>
                  <span className="text-sm font-semibold text-gray-700 ml-1">
                    {place.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>
            
            <p className="text-sm text-gray-600 mb-3 overflow-hidden">
              {place.vicinity}
            </p>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>
                {place.user_ratings_total ? `${place.user_ratings_total} yorum` : 'Yorum yok'}
              </span>
              {place.types && place.types.length > 0 && (
                <span className="bg-gray-100 px-2 py-1 rounded-full">
                  {place.types[0].replace(/_/g, ' ')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
