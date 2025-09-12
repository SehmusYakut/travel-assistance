'use client';

import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';

interface EmergencyContact {
  name: string;
  number: string;
  type: 'police' | 'medical' | 'fire' | 'tourist' | 'consulate';
  country: 'malaysia' | 'indonesia';
  city?: string;
  description: string;
}

interface EmergencyLocation {
  name: string;
  address: string;
  phone: string;
  type: 'hospital' | 'police' | 'consulate';
  country: 'malaysia' | 'indonesia';
  city: string;
  coordinates?: { lat: number; lng: number };
  hours?: string;
  services?: string[];
}

export const EmergencyServices: React.FC = () => {
  const { language, t } = useAppContext();
  const [activeTab, setActiveTab] = useState<'contacts' | 'locations'>('contacts');
  const [selectedCountry, setSelectedCountry] = useState<'malaysia' | 'indonesia'>('malaysia');

  const emergencyContacts: EmergencyContact[] = [
    // Malaysia
    {
      name: 'Police Emergency',
      number: '999',
      type: 'police',
      country: 'malaysia',
      description: 'Emergency police hotline for immediate assistance'
    },
    {
      name: 'Medical Emergency',
      number: '999',
      type: 'medical',
      country: 'malaysia',
      description: 'Ambulance and medical emergency services'
    },
    {
      name: 'Fire Emergency',
      number: '994',
      type: 'fire',
      country: 'malaysia',
      description: 'Fire department emergency line'
    },
    {
      name: 'Tourist Police',
      number: '+60 3-2149 6590',
      type: 'tourist',
      country: 'malaysia',
      description: 'Special police unit for tourist assistance'
    },
    {
      name: 'Turkey Consulate KL',
      number: '+60 3-2148 0817',
      type: 'consulate',
      country: 'malaysia',
      city: 'Kuala Lumpur',
      description: 'Turkish Consulate General in Kuala Lumpur'
    },
    // Indonesia
    {
      name: 'Police Emergency',
      number: '110',
      type: 'police',
      country: 'indonesia',
      description: 'Emergency police hotline for immediate assistance'
    },
    {
      name: 'Medical Emergency',
      number: '118',
      type: 'medical',
      country: 'indonesia',
      description: 'Ambulance and medical emergency services'
    },
    {
      name: 'Fire Emergency',
      number: '113',
      type: 'fire',
      country: 'indonesia',
      description: 'Fire department emergency line'
    },
    {
      name: 'Tourist Police',
      number: '+62 21-570 9417',
      type: 'tourist',
      country: 'indonesia',
      description: 'Tourist police assistance hotline'
    },
    {
      name: 'Turkey Embassy Jakarta',
      number: '+62 21-390 4358',
      type: 'consulate',
      country: 'indonesia',
      city: 'Jakarta',
      description: 'Turkish Embassy in Jakarta'
    }
  ];

  const emergencyLocations: EmergencyLocation[] = [
    // Malaysia - Kuala Lumpur
    {
      name: 'Hospital Kuala Lumpur',
      address: 'Jalan Pahang, 53000 Kuala Lumpur',
      phone: '+60 3-2615 5555',
      type: 'hospital',
      country: 'malaysia',
      city: 'Kuala Lumpur',
      coordinates: { lat: 3.1624, lng: 101.6887 },
      hours: '24/7',
      services: ['Emergency', 'ICU', 'Surgery', 'Pharmacy']
    },
    {
      name: 'Gleneagles Hospital KL',
      address: '282 & 286, Jalan Ampang, 50450 Kuala Lumpur',
      phone: '+60 3-4141 3000',
      type: 'hospital',
      country: 'malaysia',
      city: 'Kuala Lumpur',
      coordinates: { lat: 3.1569, lng: 101.7158 },
      hours: '24/7',
      services: ['International Ward', 'Emergency', 'Specialist Care']
    },
    {
      name: 'KL Central Police Station',
      address: 'Jalan Travers, 50470 Kuala Lumpur',
      phone: '+60 3-2266 2222',
      type: 'police',
      country: 'malaysia',
      city: 'Kuala Lumpur',
      coordinates: { lat: 3.1340, lng: 101.6869 },
      hours: '24/7'
    },
    {
      name: 'Turkish Consulate General',
      address: 'Level 3A, Menara Tan & Tan, 207 Jalan Tun Razak, 50400 KL',
      phone: '+60 3-2148 0817',
      type: 'consulate',
      country: 'malaysia',
      city: 'Kuala Lumpur',
      coordinates: { lat: 3.1516, lng: 101.7097 },
      hours: 'Mon-Fri: 9:00-17:00',
      services: ['Passport Services', 'Visa', 'Emergency Assistance']
    },
    // Indonesia - Jakarta
    {
      name: 'RS Cipto Mangunkusumo',
      address: 'Jl. Diponegoro No.71, Jakarta Pusat',
      phone: '+62 21-1500 135',
      type: 'hospital',
      country: 'indonesia',
      city: 'Jakarta',
      coordinates: { lat: -6.1863, lng: 106.8304 },
      hours: '24/7',
      services: ['Emergency', 'ICU', 'Surgery', 'International Care']
    },
    {
      name: 'Jakarta Metropolitan Police',
      address: 'Jl. Jenderal Sudirman Kav. 55, Jakarta Selatan',
      phone: '+62 21-523 4001',
      type: 'police',
      country: 'indonesia',
      city: 'Jakarta',
      coordinates: { lat: -6.2088, lng: 106.8456 },
      hours: '24/7'
    },
    {
      name: 'Turkish Embassy Jakarta',
      address: 'Jl. H.R. Rasuna Said Kav. 1, Kuningan, Jakarta Selatan',
      phone: '+62 21-390 4358',
      type: 'consulate',
      country: 'indonesia',
      city: 'Jakarta',
      coordinates: { lat: -6.2297, lng: 106.8430 },
      hours: 'Mon-Fri: 8:30-17:00',
      services: ['Passport Services', 'Visa', 'Citizen Services']
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'police': return '👮‍♂️';
      case 'medical': return '🚑';
      case 'fire': return '🚒';
      case 'tourist': return '🧳';
      case 'consulate': return '🏛️';
      case 'hospital': return '🏥';
      default: return '📞';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'police': return 'blue';
      case 'medical': return 'red';
      case 'fire': return 'orange';
      case 'tourist': return 'green';
      case 'consulate': return 'purple';
      case 'hospital': return 'red';
      default: return 'gray';
    }
  };

  const handleCall = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleNavigate = (coordinates?: { lat: number; lng: number }, address?: string) => {
    if (coordinates) {
      window.open(`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`, '_blank');
    } else if (address) {
      window.open(`https://www.google.com/maps?q=${encodeURIComponent(address)}`, '_blank');
    }
  };

  const filteredContacts = emergencyContacts.filter(contact => contact.country === selectedCountry);
  const filteredLocations = emergencyLocations.filter(location => location.country === selectedCountry);

  return (
    <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-red-500 dark:bg-red-600 text-white p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🆘</span>
            <div>
              <h2 className="text-lg font-bold">
                {language === 'tr' ? 'Acil Durum Servisleri' : 'Emergency Services'}
              </h2>
              <p className="text-red-100 text-sm">
                {language === 'tr' ? 'Hızlı erişim için kaydedin' : 'Save for quick access'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Country Selection */}
      <div className="p-4 border-b border-red-200 dark:border-red-800">
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedCountry('malaysia')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              selectedCountry === 'malaysia'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🇲🇾 Malaysia
          </button>
          <button
            onClick={() => setSelectedCountry('indonesia')}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
              selectedCountry === 'indonesia'
                ? 'bg-red-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            🇮🇩 Indonesia
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-red-200 dark:border-red-800">
        <button
          onClick={() => setActiveTab('contacts')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'contacts'
              ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-b-2 border-red-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          📞 {language === 'tr' ? 'Acil Numaralar' : 'Emergency Numbers'}
        </button>
        <button
          onClick={() => setActiveTab('locations')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            activeTab === 'locations'
              ? 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 border-b-2 border-red-500'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
          }`}
        >
          📍 {language === 'tr' ? 'Önemli Yerler' : 'Important Locations'}
        </button>
      </div>

      {/* Content */}
      <div className="p-4 max-h-96 overflow-y-auto">
        {activeTab === 'contacts' ? (
          <div className="space-y-3">
            {filteredContacts.map((contact, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-2xl">{getTypeIcon(contact.type)}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                        {contact.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1">
                        {contact.description}
                      </p>
                      {contact.city && (
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          📍 {contact.city}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(contact.number)}
                    className={`ml-3 px-4 py-2 bg-${getTypeColor(contact.type)}-500 hover:bg-${getTypeColor(contact.type)}-600 text-white rounded-lg text-sm font-medium transition-colors flex-shrink-0`}
                  >
                    📞 {language === 'tr' ? 'Ara' : 'Call'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredLocations.map((location, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <span className="text-2xl">{getTypeIcon(location.type)}</span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm mb-1">
                        {location.name}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        📍 {location.address}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                        📞 {location.phone}
                      </p>
                      {location.hours && (
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                          🕒 {location.hours}
                        </p>
                      )}
                      {location.services && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {location.services.map((service, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded text-xs"
                            >
                              {service}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-2 ml-3">
                    <button
                      onClick={() => handleCall(location.phone)}
                      className="px-3 py-1.5 bg-green-500 hover:bg-green-600 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      📞
                    </button>
                    <button
                      onClick={() => handleNavigate(location.coordinates, location.address)}
                      className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-xs font-medium transition-colors"
                    >
                      🗺️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Emergency Tips */}
      <div className="p-4 bg-red-100 dark:bg-red-900/30 border-t border-red-200 dark:border-red-800">
        <h4 className="font-semibold text-red-800 dark:text-red-300 text-sm mb-2">
          ⚠️ {language === 'tr' ? 'Acil Durum İpuçları' : 'Emergency Tips'}
        </h4>
        <ul className="text-xs text-red-700 dark:text-red-300 space-y-1">
          <li>• {language === 'tr' ? 'Pasaportunuzu her zaman yanınızda bulundurun' : 'Always carry your passport'}</li>
          <li>• {language === 'tr' ? 'Otel adresini kaydedin' : 'Save your hotel address'}</li>
          <li>• {language === 'tr' ? 'Bu sayfayı offline erişim için kaydedin' : 'Save this page for offline access'}</li>
          <li>• {language === 'tr' ? 'Acil durumda sakin kalın' : 'Stay calm in emergencies'}</li>
        </ul>
      </div>
    </div>
  );
};
