# Travel Assistance 🗺️

Bu proje, dünya çapında seyahat eden kullanıcılar için kapsamlı bir seyahat yardım web uygulamasıdır. Google Maps API'sini kullanarak yakındaki mekanları bulur ve güvenlik bilgileri sunar.

## 🌐 Dil Desteği

Uygulama **3 dil** destekler:
- **🇺🇸 English** (Varsayılan)
- **🇹🇷 Türkçe**
- **🟥🟩� Kurdî (Kurmancî)**

Dil ayarları sağ üst köşedeki ayarlar butonundan değiştirilebilir.

## �🚀 Özellikler

- **Konum Tabanlı Arama**: Kullanıcının mevcut konumunu bulur
- **Yakın Mekanlar**: Restoranlar, ulaşım imkanları ve diğer önemli yerleri listeler
- **İnteraktif Harita**: Google Maps entegrasyonu ile harita görünümü
- **Özelleştirilebilir Ülke Rehberleri**: Herhangi bir ülke için detaylı seyahat bilgileri eklenebilir
- **Çoklu Dil Desteği**: İngilizce, Türkçe ve Kürtçe dil seçenekleri
- **Dark/Light Mode**: Tema desteği
- **Güvenlik Uyarıları**: Seyahat güvenliği için önemli ipuçları
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

## 🏗️ Teknoloji Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Google Maps API (@react-google-maps/api)
- **Architecture**: MVVM Pattern
- **Deployment**: Netlify
- **Deployment**: Vercel Ready

## 📁 Proje Yapısı (MVVM Pattern)

```
gezgin-rehberi/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes (Backend)
│   │   └── places/        # Places API endpoint
│   ├── page.tsx           # Ana sayfa (View)
│   └── layout.tsx         # Layout bileşeni
├── components/            # View Components
│   ├── MapComponent.tsx   # Harita bileşeni
│   ├── ActionButton.tsx   # Aksiyon butonları
│   ├── PlacesList.tsx     # Mekan listesi
│   ├── GuideContent.tsx   # Rehber içeriği
│   └── ErrorMessage.tsx   # Hata mesajları
├── viewmodels/            # View Models (Business Logic)
│   └── useMapViewModel.ts # Ana view model hook
├── models/                # Data Models & Types
│   └── types.ts           # TypeScript tip tanımları
├── services/              # Business Services
│   └── mapService.ts      # Harita ve konum servisleri
├── data/                  # Static Data
│   └── countries.ts       # Ülke verileri (Örnek: Malezya, Endonezya - kendi ülkenizi ekleyebilirsiniz)
└── .env.local            # Ortam değişkenleri
```

## 🔧 Kurulum

### 1. Projeyi Klonlayın

```bash
git clone <repository-url>
cd gezgin-rehberi
```

### 2. Bağımlılıkları Yükleyin

```bash
npm install
```

### 3. Google Maps API Anahtarı Alın

1. [Google Cloud Platform](https://console.cloud.google.com/) hesabı oluşturun
2. Yeni bir proje oluşturun
3. Aşağıdaki API'ları etkinleştirin:
   - Maps JavaScript API
### 3. Google Maps API Kurulumu

**Önemli:** Bu uygulama çalışması için Google Maps API anahtarına ihtiyaç duymaktadır.

#### 3.1. Google Cloud Console'da API Anahtarı Oluşturma

1. **Google Cloud Console'a gidin:** [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. **Yeni proje oluşturun** veya mevcut bir proje seçin
3. **API & Services > Credentials** sayfasına gidin
4. **"+ CREATE CREDENTIALS"** butonuna tıklayın ve **"API key"** seçin
5. API anahtarınız oluşturulacak - güvenli bir yerde saklayın

#### 3.2. Gerekli API'ları Etkinleştirme

Aşağıdaki API'ların etkinleştirilmesi gerekiyor:

1. **Maps JavaScript API** - Harita görüntüleme için
   - [Etkinleştir](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)
2. **Places API** - Yakın mekanları bulmak için  
   - [Etkinleştir](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)
3. **Geocoding API** - Adres dönüştürme için
   - [Etkinleştir](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)

#### 3.3. API Anahtarını Kısıtlama (Güvenlik)

**Önemle tavsiye edilen güvenlik ayarları:**

1. **Google Cloud Console > Credentials** sayfasında API anahtarınızı düzenleyin
2. **Application restrictions** bölümünde:
   - Production için: **HTTP referrers** seçin ve domain'inizi ekleyin
   - Development için: **None** seçebilirsiniz
3. **API restrictions** bölümünde:
   - **Restrict key** seçin
   - Yukarıdaki 3 API'yi seçin

### 4. Ortam Değişkenlerini Ayarlayın

Proje kök dizininde `.env.local` dosyasını oluşturun veya düzenleyin:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Not:** `your_google_maps_api_key_here` kısmını Google Cloud Console'dan aldığınız gerçek API anahtarı ile değiştirin.

### 5. Uygulamayı Çalıştırın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılacaktır.

## 🚀 Netlify'a Dağıtım

### Yöntem 1: GitHub Entegrasyonu (Önerilen)

#### 1. GitHub'a Gönderin

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. Netlify'de Dağıtım

1. **[Netlify](https://app.netlify.com/)** sitesine gidin ve giriş yapın
2. **"Add new site"** > **"Import an existing project"** tıklayın
3. **"Deploy with GitHub"** seçin ve GitHub hesabınızı bağlayın
4. Repository'nizi seçin
5. **Build settings** otomatik algılanacak:
   - **Build command:** `npm run build`
   - **Publish directory:** `out` veya `.next`
6. **"Add environment variables"** bölümünde API anahtarınızı ekleyin:
   - **Key:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - **Value:** Google Cloud Console'dan aldığınız API anahtarı
7. **"Deploy site"** tıklayın

#### 3. Site Adını Özelleştirme (Opsiyonel)

1. Site deploy edildikten sonra **"Site settings"** > **"Change site name"**
2. İstediğiniz benzersiz ismi girin (örn: `my-travel-assistant`)
3. Siteniz artık `https://my-travel-assistant.netlify.app` adresinden erişilebilir olacak

### Yöntem 2: Netlify CLI ile Dağıtım

```bash
# Netlify CLI'yi yükleyin
npm install -g netlify-cli

# Netlify'a giriş yapın
netlify login

# Projeyi initialize edin
netlify init

# Environment variable ekleyin
netlify env:set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY "your_api_key_here"

# Deploy edin
netlify deploy --prod
```

### Yöntem 3: Drag & Drop ile Manuel Dağıtım

1. Projeyi build edin: `npm run build`
2. **[Netlify Drop](https://app.netlify.com/drop)** sayfasına gidin
3. Build klasörünü (`.next` veya `out`) sürükleyip bırakın
4. **Site settings > Environment variables** kısmından API anahtarını ekleyin

### 4. Production API Anahtarı Güvenliği

Production ortamında mutlaka API anahtarınızı domain ile kısıtlayın:

1. **Google Cloud Console > Credentials** sayfasında API anahtarınızı düzenleyin
2. **Application restrictions > HTTP referrers** seçin
3. Netlify domain'inizi ekleyin:
   - `https://your-site-name.netlify.app/*`
   - `https://*.netlify.app/*` (tüm preview deploymentları için)

### 5. Otomatik Deploy Ayarları

Netlify, GitHub'a her push yaptığınızda otomatik olarak deploy eder:

- **Production branch:** `main` veya `master`
- **Deploy previews:** Her pull request için otomatik preview
- **Branch deploys:** Diğer branch'ler için deploy (ayarlardan aktif edilebilir)

**⚠️ Güvenlik Uyarısı:** API anahtarınızı hiçbir zaman public repository'de paylaşmayın!

## 💰 Google Maps API Maliyetleri

### Günlük Ücretsiz Limitler (2025)

- **Maps JavaScript API:** 28,000 yüklemeler/ay ($7 kredi)
- **Places API:** 
  - Nearby Search: 2,500 arama/gün
  - Place Details: 2,500 istek/gün
- **Geocoding API:** 2,500 istek/gün

### Maliyet Kontrolü

1. **[Google Cloud Console > APIs & Services > Quotas](https://console.cloud.google.com/apis/api/maps-backend.googleapis.com/quotas)** sayfasında limitler belirleyin
2. **Billing alerts** kurun aşım durumunda bildirim alın
3. **API kullanım istatistiklerini** düzenli takip edin

**💡 İpucu:** Küçük projeler için genellikle ücretsiz limitler yeterlidir.

## 🏗️ MVVM Architecture Açıklaması

### Model (models/)
- Veri tiplerini ve interface'leri tanımlar
- `types.ts`: TypeScript tip tanımları

### View (components/ + app/page.tsx)
- Kullanıcı arayüzü bileşenlerini içerir
- Sadece görüntüleme ve kullanıcı etkileşimlerinden sorumlu

### ViewModel (viewmodels/)
- İş mantığını ve state yönetimini handle eder
- View ile Model arasındaki köprü görevi görür
- `useMapViewModel.ts`: Ana business logic hook

### Services (services/)
- Dış API'lar ve servislerle iletişimi sağlar
- Google Maps API integration

## 🔒 Güvenlik

- API anahtarları environment variables ile güvenli şekilde saklanır
- Client-side ve server-side API çağrıları ayrılmıştır
- HTTP referrer restrictions önerilir (production için)

## 🌍 Desteklenen Özellikler

- ✅ Konum bulma
- ✅ Yakın restoran arama
- ✅ Ulaşım imkanları
- ✅ Özelleştirilebilir ülke rehberleri (Örnek: Malezya, Endonezya)
- ✅ İnteraktif harita
- ✅ Responsive tasarım
- ✅ Error handling
- ✅ Loading states
- ✅ **3 Dil desteği (İngilizce, Türkçe, Kürtçe)**
- ✅ **Dark/Light tema desteği**
- ✅ **Netlify ile kolay deployment**
- 🔄 Herhangi bir ülke için yapılandırılabilir acil durum servisleri

## 🌐 Yeni Dil Desteği Ekleme

Projeye kendi dilinizi eklemek için:

### 1. Dil Türünü Ekleyin

`contexts/AppContext.tsx` dosyasında dil türünü ekleyin:

```typescript
export type Language = 'en' | 'tr' | 'ku' | 'your-lang-code';
```

### 2. Çevirileri Ekleyin

Aynı dosyada `translations` objesine yeni dilinizin çevirilerini ekleyin:

```typescript
const translations = {
  en: { /* English translations */ },
  tr: { /* Turkish translations */ },
  ku: { /* Kurdish translations */ },
  'your-lang-code': {
    'app.title': 'Your Translation',
    'app.subtitle': 'Your Translation',
    // ... diğer tüm key'ler için çeviriler
  }
};
```

### 3. Settings Bileşenine Ekleyin

`components/Settings.tsx` dosyasında dil butonunu ekleyin:

```tsx
<button
  onClick={() => handleLanguageChange('your-lang-code')}
  className={/* ... styles ... */}
>
  <span className="text-lg mb-1">🏳️</span> {/* Ülke bayrağı */}
  <span className="font-medium text-sm">Your Language</span>
</button>
```

**💡 İpucu:** Mevcut Kürtçe çevirilerini referans olarak kullanabilirsiniz.

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

## 🔧 Kendi Ülkenizi Ekleme

Bu proje varsayılan olarak Malezya ve Endonezya ülke verilerini içermektedir (şu anda pasif durumdadır). Kendi ülkeniz için seyahat rehberi eklemek istiyorsanız:

### 1. Ülke Verilerini Ekleyin

`data/countries.ts` dosyasını açın ve yorum satırlarındaki örnekleri referans alarak kendi ülkenizin verilerini ekleyin:

```typescript
export const yourCountryData = {
  attractions: [
    { 
      name: "Önemli Turistik Yer", 
      city: "Şehir Adı", 
      description: "Açıklama...",
      location: { lat: 0.0000, lng: 0.0000 },
      visitTime: "2-3 saat",
      entryFee: "Ücretsiz",
      bestTime: "En iyi ziyaret zamanı",
      tips: "İpuçları..."
    }
  ],
  transportation: [
    { 
      type: "Otobüs", 
      description: "Şehir içi otobüs sistemi...",
      tips: "İpuçları..."
    }
  ],
  food: [
    { name: "Yerel Yemek", description: "Açıklama..." }
  ],
  tips: [
    "Yararlı seyahat ipucu 1",
    "Yararlı seyahat ipucu 2"
  ],
  safetyWarnings: [
    "Güvenlik uyarısı 1",
    "Güvenlik uyarısı 2"
  ],
  usefulLinks: [
    { name: "Turizm Sitesi", url: "https://example.com/" }
  ]
};
```

### 2. Acil Durumlar Bileşenini Güncelleyin

`components/EmergencyServices.tsx` dosyasındaki örnekleri kullanarak kendi ülkenizin acil durum bilgilerini ekleyin.

### 3. Dil Desteği Ekleyin

`contexts/AppContext.tsx` dosyasında kendi ülkeniz için dil çevirilerini ekleyin.

## 🔧 Troubleshooting

### Yaygın Sorunlar ve Çözümleri

#### Problem: "Google Maps API anahtarı tanımlı değil" hatası
**Çözüm:**
1. `.env.local` dosyasının proje kök dizininde olduğunu kontrol edin
2. API anahtarının doğru formatta olduğunu doğrulayın
3. Development server'ı yeniden başlatın (`npm run dev`)

#### Problem: Harita yüklenmiyor
**Çözüm:**
1. Google Cloud Console'da gerekli API'ların etkinleştirildiğini kontrol edin
2. API anahtarının kısıtlamalarını kontrol edin
3. Browser console'da hata mesajlarını inceleyin

#### Problem: "This page can't load Google Maps correctly" uyarısı
**Çözüm:**
1. Billing hesabının aktif olduğunu kontrol edin
2. API limitlerini aşmadığınızı doğrulayın
3. Domain kısıtlamalarını kontrol edin

#### Problem: Konum servisleri çalışmıyor
**Çözüm:**
1. Tarayıcıda konum izni verildiğini kontrol edin
2. HTTPS kullandığınızdan emin olun (HTTP'de konum servisleri çalışmaz)
3. Tarayıcı ayarlarından konum servislerinin açık olduğunu doğrulayın

### Yararlı Linkler

- **[Google Maps Platform Dokümantasyonu](https://developers.google.com/maps/documentation)**
- **[Google Cloud Console](https://console.cloud.google.com/)**
- **[Google Maps Platform Pricing](https://developers.google.com/maps/billing/understanding-cost-of-use)**
- **[API Key Security Best Practices](https://developers.google.com/maps/api-security-best-practices)**

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Sorular için issue açabilir veya pull request gönderebilirsiniz.

---

**🌟 Bu proje Google Maps API kullanarak geliştirilmiştir. Güvenli seyahatler dileriz! 🧳✈️**
