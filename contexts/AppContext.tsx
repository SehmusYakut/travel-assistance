'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export type Language = 'tr' | 'en';
export type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  theme: Theme;
  setLanguage: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    // Header
    'app.title': 'Gezgin Rehberi',
    'app.subtitle': 'Malezya ve Endonezya için kapsamlı seyahat rehberiniz. Yakınızdaki en iyi mekanları keşfedin, güvenlik bilgilerini öğrenin.',
    
    // Buttons
    'button.findLocation': 'Konumumu Bul',
    'button.restaurants': 'Restoranlar',
    'button.transport': 'Ulaşım',
    'button.malaysia': 'Malezya',
    'button.indonesia': 'Endonezya',
    'button.location.short': 'Konum',
    'button.restaurants.short': 'Restoran',
    'button.transport.short': 'Ulaşım',
    'button.malaysia.short': 'Malezya',
    'button.indonesia.short': 'Endonezya',
    
    // Weather
    'weather.title': 'Hava Durumu',
    'weather.subtitle': 'Anlık hava bilgileri',
    'weather.loading': 'Hava durumu yükleniyor...',
    'weather.error': 'Hata!',
    'weather.currentLocation': 'Mevcut Konumum',
    'weather.humidity': 'Nem',
    'weather.wind': 'Rüzgar',
    'weather.pressure': 'Basınç',
    'weather.visibility': 'Görüş',
    'weather.feelsLike': 'Hissedilen',
    'weather.tips': 'Seyahat Önerisi',
    'weather.tip.hot': 'Sıcak hava! Bol su için ve hafif giysiler tercih edin.',
    'weather.tip.humid': 'Yüksek nem var. İç mekân aktiviteleri düşünebilirsiniz.',
    'weather.tip.windy': 'Rüzgarlı hava. Deniz aktiviteleri için dikkatli olun.',
    'weather.tip.ideal': 'Seyahat için ideal hava koşulları! 🌟',
    'weather.empty.title': 'Hava Durumunu Görüntüle',
    'weather.empty.subtitle': 'Şehir seçin veya mevcut konumunuzu kullanın',
    
    // Route Planner
    'route.title': 'Rota Planlayıcısı',
    'route.destination': 'Hedef Adres:',
    'route.placeholder': 'Örn: KLCC Kuala Lumpur',
    'route.calculate': 'Rota Çiz',
    'route.calculating': 'Hesaplanıyor...',
    'route.quickDestinations': 'Hızlı Hedefler:',
    'route.hotel': 'Anggun Residences KLCC (Otellim)',
    'route.info': 'Rota Bilgileri',
    'route.distance': 'Mesafe',
    'route.duration': 'Süre',
    'route.steps': 'İlk Adımlar',
    'route.clear': 'Temizle',
    'route.error.noLocation': 'Lütfen başlangıç konumu ve hedef adresi belirtin!',
    'route.error.calculation': 'Rota hesaplanamadı',
    'route.needLocation': 'Rota hesaplamak için önce konumunuzu bulun.',
    'route.travelMode.driving': 'Araba',
    'route.travelMode.walking': 'Yürüme',
    'route.travelMode.transit': 'Toplu Taşıma',
    'route.travelMode.bicycling': 'Bisiklet',
    
    // Guide Tabs
    'guide.attractions': 'Gezilecek Yerler',
    'guide.attractions.short': 'Yerler',
    'guide.transportation': 'Ulaşım',
    'guide.food': 'Yemek',
    'guide.tips': 'İpuçları',
    'guide.safety': 'Güvenlik',
    'guide.links': 'Faydalı Linkler',
    'guide.links.short': 'Linkler',
    'guide.visitTime': 'Ziyaret Süresi',
    'guide.entryFee': 'Giriş Ücreti',
    'guide.bestTime': 'En İyi Zaman',
    'guide.tip': 'İpucu',
    'guide.showOnMap': 'Haritada Göster',
    'guide.where': 'Nerede bulabilirsin',
    'guide.price': 'Fiyat',
    
    // Common
    'common.loading': 'Yükleniyor...',
    'common.error': 'Hata!',
    'common.retry': 'Tekrar Dene',
    'common.close': 'Kapat',
    'common.save': 'Kaydet',
    'common.cancel': 'İptal',
    'common.welcome': 'Seyahat Rehberine Hoş Geldiniz!',
    'common.welcomeText': 'Konumunuzu bularak yakındaki restoranları ve ulaşım imkanlarını keşfedin, ya da Malezya ve Endonezya rehberlerini inceleyin.',
    'common.footer': 'Bu uygulama Google Maps API kullanarak yakın mekanları bulur',
    'common.footerWish': 'Güvenli seyahatler dileriz! 🧳✈️',
    
    // Map
    'map.title': 'Harita',
    
    // Welcome Section
    'welcome.title': 'Gezgin Rehberine Hoş Geldiniz!',
    'welcome.description': 'Konumunuzu bularak yakındaki restoranları ve ulaşım imkanlarını keşfedin, ya da Malezya ve Endonezya rehberlerini inceleyin.',
    
    // Footer
    'footer.description': 'Bu uygulama Google Maps API kullanarak yakın mekanları bulur',
    'footer.wishes': 'Güvenli seyahatler dileriz! 🧳✈️',
    
    // Settings
    'settings.title': 'Ayarlar',
    'settings.language': 'Dil',
    'settings.theme': 'Tema',
    'settings.theme.light': 'Açık',
    'settings.theme.dark': 'Koyu',
    'settings.theme.system': 'Sistem',
  },
  en: {
    // Header
    'app.title': 'Travel Guide',
    'app.subtitle': 'Your comprehensive travel guide for Malaysia and Indonesia. Discover the best nearby places and learn about safety information.',
    
    // Buttons
    'button.findLocation': 'Find My Location',
    'button.restaurants': 'Restaurants',
    'button.transport': 'Transport',
    'button.malaysia': 'Malaysia',
    'button.indonesia': 'Indonesia',
    'button.location.short': 'Location',
    'button.restaurants.short': 'Food',
    'button.transport.short': 'Transport',
    'button.malaysia.short': 'Malaysia',
    'button.indonesia.short': 'Indonesia',
    
    // Weather
    'weather.title': 'Weather',
    'weather.subtitle': 'Real-time weather info',
    'weather.loading': 'Loading weather...',
    'weather.error': 'Error!',
    'weather.currentLocation': 'Current Location',
    'weather.humidity': 'Humidity',
    'weather.wind': 'Wind',
    'weather.pressure': 'Pressure',
    'weather.visibility': 'Visibility',
    'weather.feelsLike': 'Feels like',
    'weather.tips': 'Travel Tip',
    'weather.tip.hot': 'Hot weather! Drink plenty of water and wear light clothing.',
    'weather.tip.humid': 'High humidity. Consider indoor activities.',
    'weather.tip.windy': 'Windy weather. Be careful with sea activities.',
    'weather.tip.ideal': 'Ideal weather conditions for travel! 🌟',
    'weather.empty.title': 'View Weather',
    'weather.empty.subtitle': 'Select a city or use your current location',
    
    // Route Planner
    'route.title': 'Route Planner',
    'route.destination': 'Destination Address:',
    'route.placeholder': 'e.g. KLCC Kuala Lumpur',
    'route.calculate': 'Calculate Route',
    'route.calculating': 'Calculating...',
    'route.quickDestinations': 'Quick Destinations:',
    'route.hotel': 'Anggun Residences KLCC (My Hotel)',
    'route.info': 'Route Information',
    'route.distance': 'Distance',
    'route.duration': 'Duration',
    'route.steps': 'First Steps',
    'route.clear': 'Clear',
    'route.error.noLocation': 'Please specify starting location and destination address!',
    'route.error.calculation': 'Route could not be calculated',
    'route.needLocation': 'Find your location first to calculate routes.',
    'route.travelMode.driving': 'Driving',
    'route.travelMode.walking': 'Walking',
    'route.travelMode.transit': 'Transit',
    'route.travelMode.bicycling': 'Bicycling',
    
    // Guide Tabs
    'guide.attractions': 'Attractions',
    'guide.attractions.short': 'Places',
    'guide.transportation': 'Transport',
    'guide.food': 'Food',
    'guide.tips': 'Tips',
    'guide.safety': 'Safety',
    'guide.links': 'Useful Links',
    'guide.links.short': 'Links',
    'guide.visitTime': 'Visit Time',
    'guide.entryFee': 'Entry Fee',
    'guide.bestTime': 'Best Time',
    'guide.tip': 'Tip',
    'guide.showOnMap': 'Show on Map',
    'guide.where': 'Where to find',
    'guide.price': 'Price',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error!',
    'common.retry': 'Retry',
    'common.close': 'Close',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.welcome': 'Welcome to Travel Guide!',
    'common.welcomeText': 'Find your location to discover nearby restaurants and transport options, or explore Malaysia and Indonesia guides.',
    'common.footer': 'This app uses Google Maps API to find nearby places',
    'common.footerWish': 'Safe travels! 🧳✈️',
    
    // Map
    'map.title': 'Map',
    
    // Welcome Section
    'welcome.title': 'Welcome to Travel Guide!',
    'welcome.description': 'Find your location to discover nearby restaurants and transport options, or explore Malaysia and Indonesia guides.',
    
    // Footer
    'footer.description': 'This app uses Google Maps API to find nearby places',
    'footer.wishes': 'Safe travels! 🧳✈️',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.theme.light': 'Light',
    'settings.theme.dark': 'Dark',
    'settings.theme.system': 'System',
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('tr');
  const [theme, setThemeState] = useState<Theme>('light');

  // Load saved preferences
  useEffect(() => {
    const savedLang = localStorage.getItem('travel-guide-language') as Language;
    const savedTheme = localStorage.getItem('travel-guide-theme') as Theme;
    
    if (savedLang && (savedLang === 'tr' || savedLang === 'en')) {
      setLanguageState(savedLang);
    }
    
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeState(savedTheme);
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(prefersDark ? 'dark' : 'light');
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('travel-guide-language', lang);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('travel-guide-theme', newTheme);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['tr']] || key;
  };

  const value: AppContextType = {
    language,
    theme,
    setLanguage,
    setTheme,
    t,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
