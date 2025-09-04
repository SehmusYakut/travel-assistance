'use client';

import React from 'react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <div className="flex flex-col items-center">
        <span className="text-4xl mb-3">❌</span>
        <h3 className="text-lg font-semibold text-red-800 mb-2">
          Bir Hata Oluştu
        </h3>
        <p className="text-red-700 mb-4 max-w-md">
          {message}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Tekrar Dene
          </button>
        )}
      </div>
    </div>
  );
};
