interface TranslationResult {
  translatedText: string;
  sourceLanguage: string;
  targetLanguage: string;
  confidence?: number;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

class TranslationService {
  private static instance: TranslationService;
  private cache: Map<string, { translation: string; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 saat cache

  // Ücretsiz Google Translate API (MyMemory API)
  private readonly BASE_URL = 'https://api.mymemory.translated.net/get';
  
  // Desteklenen diller
  private readonly LANGUAGES: Language[] = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ms', name: 'Malayca', flag: '🇲🇾' },
    { code: 'id', name: 'Endonezyaca', flag: '🇮🇩' },
    { code: 'en', name: 'İngilizce', flag: '🇺🇸' },
    { code: 'zh', name: 'Çince', flag: '🇨🇳' },
    { code: 'th', name: 'Tayca', flag: '🇹🇭' },
    { code: 'vi', name: 'Vietnamca', flag: '🇻🇳' },
    { code: 'ja', name: 'Japonca', flag: '🇯🇵' },
  ];

  // Sık kullanılan ifadeler
  private readonly COMMON_PHRASES = {
    tr: {
      greetings: [
        'Merhaba',
        'Günaydın',
        'İyi akşamlar',
        'Hoşça kal',
        'Teşekkür ederim',
        'Rica ederim',
        'Özür dilerim',
        'Affedersiniz',
      ],
      food: [
        'Bu ne kadar?',
        'Menü var mı?',
        'Hesap lütfen',
        'Çok lezzetli',
        'Bahşiş dahil mi?',
        'Acılı yemem',
        'Vejetaryen yemek var mı?',
        'Su içebilir miyim?',
      ],
      transport: [
        'Havalimanı nerede?',
        'Taksiye ihtiyacım var',
        'Bu otobüs nereye gidiyor?',
        'Ne kadar sürer?',
        'Harita gösterebilir misiniz?',
        'Kayboldum',
        'Yardım edin lütfen',
        'Polis nerede?',
      ],
      emergency: [
        'Yardım!',
        'Acil durum',
        'Hastane nerede?',
        'Doktor çağırın',
        'Anlamıyorum',
        'Türkçe konuşan var mı?',
        'Büyükelçilik nerede?',
        'Pasaporumu kaybettim',
      ]
    }
  };

  public static getInstance(): TranslationService {
    if (!TranslationService.instance) {
      TranslationService.instance = new TranslationService();
    }
    return TranslationService.instance;
  }

  // Metin çeviri
  async translateText(
    text: string, 
    targetLanguage: string, 
    sourceLanguage: string = 'tr'
  ): Promise<TranslationResult> {
    const cacheKey = `${text}_${sourceLanguage}_${targetLanguage}`;
    const cached = this.cache.get(cacheKey);
    
    // Cache kontrolü
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return {
        translatedText: cached.translation,
        sourceLanguage,
        targetLanguage
      };
    }

    try {
      const url = `${this.BASE_URL}?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Translation API request failed');
      }
      
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        const translatedText = data.responseData.translatedText;
        
        // Cache'e kaydet
        this.cache.set(cacheKey, {
          translation: translatedText,
          timestamp: Date.now()
        });
        
        return {
          translatedText,
          sourceLanguage,
          targetLanguage,
          confidence: data.responseData.match || 1
        };
      } else {
        throw new Error('Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      
      // Fallback: Cache'den eski çeviri döndür
      if (cached) {
        return {
          translatedText: cached.translation,
          sourceLanguage,
          targetLanguage
        };
      }
      
      throw new Error('Çeviri yapılamadı 🌐');
    }
  }

  // Toplu çeviri (ifade listesi)
  async translatePhrases(
    phrases: string[], 
    targetLanguage: string, 
    sourceLanguage: string = 'tr'
  ): Promise<Array<{ original: string; translated: string }>> {
    const translations = await Promise.allSettled(
      phrases.map(async (phrase) => {
        const result = await this.translateText(phrase, targetLanguage, sourceLanguage);
        return {
          original: phrase,
          translated: result.translatedText
        };
      })
    );

    return translations
      .filter((result): result is PromiseFulfilledResult<{ original: string; translated: string }> => 
        result.status === 'fulfilled'
      )
      .map(result => result.value);
  }

  // Dil algılama (basit)
  detectLanguage(text: string): string {
    // Basit heuristic dil algılama
    const turkishChars = /[çğıöşüÇĞIİÖŞÜ]/;
    const arabicChars = /[\u0600-\u06FF]/;
    const chineseChars = /[\u4e00-\u9fff]/;
    const thaiChars = /[\u0e00-\u0e7f]/;
    
    if (turkishChars.test(text)) return 'tr';
    if (arabicChars.test(text)) return 'ar';
    if (chineseChars.test(text)) return 'zh';
    if (thaiChars.test(text)) return 'th';
    
    return 'en'; // Default
  }

  // Desteklenen dilleri getir
  getSupportedLanguages(): Language[] {
    return this.LANGUAGES;
  }

  // Sık kullanılan ifadeleri getir
  getCommonPhrases(category?: 'greetings' | 'food' | 'transport' | 'emergency'): string[] {
    if (category) {
      return this.COMMON_PHRASES.tr[category] || [];
    }
    
    // Tüm kategorilerden random 8 ifade
    const allPhrases = Object.values(this.COMMON_PHRASES.tr).flat();
    return allPhrases.sort(() => Math.random() - 0.5).slice(0, 8);
  }

  // Voice to text (opsiyonel - browser API)
  async startVoiceRecognition(language: string = 'tr-TR'): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        reject(new Error('Ses tanıma desteklenmiyor'));
        return;
      }

      interface SpeechRecognitionInstance {
        lang: string;
        continuous: boolean;
        interimResults: boolean;
        onresult: ((event: { results: SpeechRecognitionResultList }) => void) | null;
        onerror: ((event: { error: string }) => void) | null;
        start(): void;
      }

      const win = window as unknown as Window & {
        webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
        SpeechRecognition?: new () => SpeechRecognitionInstance;
      };
      const SpeechRecognitionCtor = win.webkitSpeechRecognition || win.SpeechRecognition;
      if (!SpeechRecognitionCtor) {
        reject(new Error('Ses tanıma desteklenmiyor'));
        return;
      }
      const recognition = new SpeechRecognitionCtor();
      
      recognition.lang = language;
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: { results: SpeechRecognitionResultList }) => {
        const transcript = event.results[0][0].transcript;
        resolve(transcript);
      };

      recognition.onerror = (event: { error: string }) => {
        reject(new Error('Ses tanıma hatası: ' + event.error));
      };

      recognition.start();
    });
  }

  // Text to speech (opsiyonel - browser API)
  speakText(text: string, language: string = 'tr-TR'): void {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  }
}

export default TranslationService;