# Gezgin Rehberi 🗺️

Bu proje, Malezya ve Endonezya için kapsamlı bir seyahat rehberi web uygulamasıdır. Google Maps API'sini kullanarak yakındaki mekanları bulur ve güvenlik bilgileri sunar.

## 🚀 Özellikler

- **Konum Tabanlı Arama**: Kullanıcının mevcut konumunu bulur
- **Yakın Mekanlar**: Restoranlar, ulaşım imkanları ve diğer önemli yerleri listeler
- **İnteraktif Harita**: Google Maps entegrasyonu ile harita görünümü
- **Ülke Rehberleri**: Malezya ve Endonezya için detaylı seyahat bilgileri
- **Güvenlik Uyarıları**: Seyahat güvenliği için önemli ipuçları
- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

## 🏗️ Teknoloji Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Google Maps API (@react-google-maps/api)
- **Architecture**: MVVM Pattern
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
│   └── countries.ts       # Ülke verileri (Malezya, Endonezya)
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
   - Places API
   - Geocoding API
4. API anahtarı oluşturun

### 4. Ortam Değişkenlerini Ayarlayın

`.env.local` dosyasında:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY="BURAYA_API_ANAHTARINIZI_YAPISTIRIN"
```

### 5. Uygulamayı Çalıştırın

```bash
npm run dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılacaktır.

## 🚀 Vercel'e Dağıtım

### 1. GitHub'a Gönderin

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### 2. Vercel'de Dağıtım

1. [Vercel Dashboard](https://vercel.com/dashboard) açın
2. "New Project" tıklayın
3. GitHub repository'nizi seçin
4. Environment Variables bölümünde `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` ekleyin
5. "Deploy" tıklayın

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
- ✅ Malezya rehberi
- ✅ Endonezya rehberi
- ✅ İnteraktif harita
- ✅ Responsive tasarım
- ✅ Error handling
- ✅ Loading states

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

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
