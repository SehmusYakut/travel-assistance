'use client';

import React, { useRef, useEffect } from 'react';

interface MapComponentProps {
  onMapLoad: (mapElement: HTMLElement) => void;
  isLoaded: boolean;
}

export const MapComponent: React.FC<MapComponentProps> = ({ onMapLoad, isLoaded }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (mapRef.current && !hasLoaded.current && !isLoaded) {
      hasLoaded.current = true;
      onMapLoad(mapRef.current);
    }
  }, [onMapLoad, isLoaded]);

  // Reset hasLoaded if component re-mounts
  useEffect(() => {
    return () => {
      hasLoaded.current = false;
    };
  }, []);

  return (
    <div className="relative">
      <div
        ref={mapRef}
        className="w-full h-96 rounded-2xl shadow-lg bg-gray-100 flex items-center justify-center"
        style={{
          minHeight: '400px',
        }}
      >
        {!isLoaded && (
          <div className="flex flex-col items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600">Harita Yükleniyor...</p>
          </div>
        )}
      </div>
    </div>
  );
};
