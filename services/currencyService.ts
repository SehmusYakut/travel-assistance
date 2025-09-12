interface CurrencyRate {
  code: string;
  name: string;
  rate: number;
  symbol: string;
}

interface ExchangeRates {
  base: string;
  date: string;
  rates: Record<string, number>;
}

class CurrencyService {
  private static instance: CurrencyService;
  private cache: Map<string, { data: ExchangeRates; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 dakika cache

  // Ücretsiz API - exchangerate-api.com (month 1500 request limit)
  private readonly BASE_URL = 'https://api.exchangerate-api.com/v4/latest';

  // Popüler para birimleri
  private readonly POPULAR_CURRENCIES = [
    { code: 'TRY', name: 'Türk Lirası', symbol: '₺' },
    { code: 'MYR', name: 'Malezya Ringgiti', symbol: 'RM' },
    { code: 'IDR', name: 'Endonezya Rupiahı', symbol: 'Rp' },
    { code: 'USD', name: 'ABD Doları', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'İngiliz Sterlini', symbol: '£' },
    { code: 'JPY', name: 'Japon Yeni', symbol: '¥' },
    { code: 'AUD', name: 'Avustralya Doları', symbol: 'A$' },
  ];

  public static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService();
    }
    return CurrencyService.instance;
  }

  // Kur verilerini getir
  async getExchangeRates(baseCurrency: string = 'TRY'): Promise<ExchangeRates> {
    const cacheKey = baseCurrency;
    const cached = this.cache.get(cacheKey);
    
    // Cache kontrolü
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }

    try {
      const response = await fetch(`${this.BASE_URL}/${baseCurrency}`);
      if (!response.ok) {
        throw new Error('Currency API request failed');
      }
      
      const data: ExchangeRates = await response.json();
      
      // Cache'e kaydet
      this.cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
      
      return data;
    } catch (error) {
      console.error('Currency fetch error:', error);
      
      // Fallback: Cache'den eski veri döndür
      if (cached) {
        return cached.data;
      }
      
      throw new Error('Kur bilgileri alınamadı 💱');
    }
  }

  // Para birimi dönüştürme
  async convertCurrency(
    amount: number, 
    fromCurrency: string, 
    toCurrency: string
  ): Promise<{ amount: number; rate: number; formattedAmount: string }> {
    const rates = await this.getExchangeRates(fromCurrency);
    const rate = rates.rates[toCurrency];
    
    if (!rate) {
      throw new Error(`${toCurrency} kuru bulunamadı`);
    }
    
    const convertedAmount = amount * rate;
    const currency = this.POPULAR_CURRENCIES.find(c => c.code === toCurrency);
    const symbol = currency?.symbol || toCurrency;
    
    return {
      amount: convertedAmount,
      rate,
      formattedAmount: `${symbol} ${convertedAmount.toLocaleString('tr-TR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })}`
    };
  }

  // Popüler para birimlerini getir
  getPopularCurrencies(): CurrencyRate[] {
    return this.POPULAR_CURRENCIES.map(currency => ({
      ...currency,
      rate: 1 // Default rate, gerçek rate API'den gelecek
    }));
  }

  // Bahşiş hesaplama
  calculateTip(amount: number, percentage: number): {
    tipAmount: number;
    totalAmount: number;
    formattedTip: string;
    formattedTotal: string;
  } {
    const tipAmount = amount * (percentage / 100);
    const totalAmount = amount + tipAmount;
    
    return {
      tipAmount,
      totalAmount,
      formattedTip: tipAmount.toLocaleString('tr-TR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      }),
      formattedTotal: totalAmount.toLocaleString('tr-TR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })
    };
  }

  // Bölüşme hesaplama
  splitBill(totalAmount: number, numberOfPeople: number, tipPercentage: number = 0): {
    perPerson: number;
    withTip: number;
    formattedPerPerson: string;
    formattedWithTip: string;
  } {
    const tip = totalAmount * (tipPercentage / 100);
    const totalWithTip = totalAmount + tip;
    const perPerson = totalAmount / numberOfPeople;
    const withTip = totalWithTip / numberOfPeople;
    
    return {
      perPerson,
      withTip,
      formattedPerPerson: perPerson.toLocaleString('tr-TR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      }),
      formattedWithTip: withTip.toLocaleString('tr-TR', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      })
    };
  }
}

export default CurrencyService;