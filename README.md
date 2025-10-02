# Travel Assistance 🗺️# Tr## 🌐 Language S## ✨ Key Features



A comprehensive travel assistance web application for users traveling worldwide. Utilizes Google Maps API to find nearby places and provide safety information.- **Location-Based Search**: Find user's current location

- **Nearby Places**: List restaurants, transportation, and other important locations

## 🌐 Language Support- **Interactive Map**: Google Maps integration with map view

- **Customizable Country Guides**: Add detailed travel information for any country

The application supports **3 languages**:- **Multi-Language Support**: English, Turkish, and Kurdish language options

- **🇺🇸 English** (Default)- **Dark/Light Mode**: Theme support

- **🇹🇷 Turkish**- **Safety Alerts**: Important tips for travel safety

- **🗣️ Kurdish (Kurmanji)**- **Responsive Design**: Mobile and desktop compatible



Language settings can be changed from the settings button in the top right corner.## 🛠️ Tech Stack



## ✨ Key Features- **Framework**: Next.js 15 (App Router)

- **Language**: TypeScript

- **Location-Based Search**: Find user's current location- **Styling**: Tailwind CSS

- **Nearby Places**: List restaurants, transportation, and other important locations- **Maps**: Google Maps API (@react-google-maps/api)

- **Interactive Map**: Google Maps integration with map view- **Architecture**: MVVM Pattern

- **Customizable Country Guides**: Add detailed travel information for any country- **Deployment**: Netlify

- **Multi-Language Support**: English, Turkish, and Kurdish language options- **Deployment**: Vercel Readyion supports **3 languages**:

- **Dark/Light Mode**: Theme support- **🇺🇸 English** (Default)

- **Safety Alerts**: Important tips for travel safety- **🇹🇷 Türkçe**

- **Responsive Design**: Mobile and desktop compatible- **🗣️ Kurdî (Kurmancî)**



## 🛠️ Tech StackLanguage settings can be changed from the settings button in the top right corner.istance 🗺️



- **Framework**: Next.js 15 (App Router)Bu proje, dünya çapında seyahat eden kullanıcılar için kapsamlı bir seyahat yardım web uygulamasıdır. Google Maps API'sini kullanarak yakındaki mekanları bulur ve güvenlik bilgileri sunar.

- **Language**: TypeScript

- **Styling**: Tailwind CSS## 🌐 Dil Desteği

- **Maps**: Google Maps API (@react-google-maps/api)

- **Architecture**: MVVM PatternUygulama **3 dil** destekler:

- **Deployment**: Netlify- **🇺🇸 English** (Varsayılan)

- **Alternative**: Vercel Ready- **🇹🇷 Türkçe**

- **🟥🟩� Kurdî (Kurmancî)**

## 📁 Project Structure (MVVM Pattern)

Dil ayarları sağ üst köşedeki ayarlar butonundan değiştirilebilir.

```

travel-assistance/## �🚀 Özellikler

├── app/                    # Next.js App Router

│   ├── api/               # API Routes (Backend)- **Konum Tabanlı Arama**: Kullanıcının mevcut konumunu bulur

│   │   └── places/        # Places API endpoint- **Yakın Mekanlar**: Restoranlar, ulaşım imkanları ve diğer önemli yerleri listeler

│   ├── page.tsx           # Main page (View)- **İnteraktif Harita**: Google Maps entegrasyonu ile harita görünümü

│   └── layout.tsx         # Layout component- **Özelleştirilebilir Ülke Rehberleri**: Herhangi bir ülke için detaylı seyahat bilgileri eklenebilir

├── components/            # View Components- **Çoklu Dil Desteği**: İngilizce, Türkçe ve Kürtçe dil seçenekleri

│   ├── MapComponent.tsx   # Map component- **Dark/Light Mode**: Tema desteği

│   ├── ActionButton.tsx   # Action buttons- **Güvenlik Uyarıları**: Seyahat güvenliği için önemli ipuçları

│   ├── PlacesList.tsx     # Places list- **Responsive Tasarım**: Mobil ve masaüstü uyumlu

│   ├── GuideContent.tsx   # Guide content

│   └── ErrorMessage.tsx   # Error messages## 🏗️ Teknoloji Stack

├── viewmodels/            # View Models (Business Logic)

│   └── useMapViewModel.ts # Main view model hook- **Framework**: Next.js 15 (App Router)

├── models/                # Data Models & Types- **Language**: TypeScript

│   └── types.ts           # TypeScript type definitions- **Styling**: Tailwind CSS

├── services/              # Business Services- **Maps**: Google Maps API (@react-google-maps/api)

│   └── mapService.ts      # Map and location services- **Architecture**: MVVM Pattern

├── data/                  # Static Data- **Deployment**: Netlify

│   └── countries.ts       # Country data (Examples: Malaysia, Indonesia - add your own)- **Deployment**: Vercel Ready

└── .env.local            # Environment variables

```## 📁 Project Structure (MVVM Pattern)



## 🔧 Installation```

gezgin-rehberi/

### 1. Clone the Repository├── app/                    # Next.js App Router

│   ├── api/               # API Routes (Backend)

```bash│   │   └── places/        # Places API endpoint

git clone https://github.com/SehmusYakut/travel-assistance.git│   ├── page.tsx           # Main page (View)

cd travel-assistance│   └── layout.tsx         # Layout component

```├── components/            # View Components

│   ├── MapComponent.tsx   # Map component

### 2. Install Dependencies│   ├── ActionButton.tsx   # Action buttons

│   ├── PlacesList.tsx     # Places list

```bash│   ├── GuideContent.tsx   # Guide content

npm install│   └── ErrorMessage.tsx   # Error messages

```├── viewmodels/            # View Models (Business Logic)

│   └── useMapViewModel.ts # Main view model hook

### 3. Google Maps API Setup├── models/                # Data Models & Types

│   └── types.ts           # TypeScript type definitions

**Important:** This application requires a Google Maps API key to function.├── services/              # Business Services

│   └── mapService.ts      # Map and location services

#### 3.1. Create API Key in Google Cloud Console├── data/                  # Static Data

│   └── countries.ts       # Country data (Examples: Malaysia, Indonesia - add your own)

1. **Go to Google Cloud Console:** [https://console.cloud.google.com/](https://console.cloud.google.com/)└── .env.local            # Environment variables

2. **Create a new project** or select an existing one```

3. **Navigate to API & Services > Credentials**

4. **Click "+ CREATE CREDENTIALS"** and select **"API key"**## 🔧 Installation

5. Your API key will be created - save it in a secure location

### 1. Clone the Repository

#### 3.2. Enable Required APIs

```bash

The following APIs need to be enabled:git clone <repository-url>

cd gezgin-rehberi

1. **Maps JavaScript API** - For map display```

   - [Enable](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)

2. **Places API** - For finding nearby places### 2. Install Dependencies

   - [Enable](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)

3. **Geocoding API** - For address conversion```bash

   - [Enable](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)npm install

```

#### 3.3. Restrict API Key (Security)

### 3. Google Maps API Setup

**Highly recommended security settings:**

**Important:** This application requires a Google Maps API key to function.

1. **Edit your API key** in Google Cloud Console > Credentials

2. **In Application restrictions:**#### 3.1. Create API Key in Google Cloud Console

   - For production: Select **HTTP referrers** and add your domain

   - For development: You can select **None**1. **Go to Google Cloud Console:** [https://console.cloud.google.com/](https://console.cloud.google.com/)

3. **In API restrictions:**2. **Create a new project** or select an existing one

   - Select **Restrict key**3. **Navigate to API & Services > Credentials**

   - Choose the 3 APIs listed above4. **Click "+ CREATE CREDENTIALS"** and select **"API key"**

5. Your API key will be created - save it in a secure location

### 4. Configure Environment Variables

#### 3.2. Enable Required APIs

Create or edit the `.env.local` file in the project root:

The following APIs need to be enabled:

```env

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here1. **Maps JavaScript API** - For map display

```   - [Enable](https://console.cloud.google.com/apis/library/maps-backend.googleapis.com)

2. **Places API** - For finding nearby places

**Note:** Replace `your_google_maps_api_key_here` with your actual API key from Google Cloud Console.   - [Enable](https://console.cloud.google.com/apis/library/places-backend.googleapis.com)

3. **Geocoding API** - For address conversion

### 5. Run the Application   - [Enable](https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com)



```bash#### 3.3. Restrict API Key (Security)

npm run dev

```**Highly recommended security settings:**



The application will open at [http://localhost:3000](http://localhost:3000).1. **Edit your API key** in Google Cloud Console > Credentials

2. **In Application restrictions:**

## 🚀 Deployment to Netlify   - For production: Select **HTTP referrers** and add your domain

   - For development: You can select **None**

### Method 1: GitHub Integration (Recommended)3. **In API restrictions:**

   - Select **Restrict key**

#### 1. Push to GitHub   - Choose the 3 APIs listed above



```bash### 4. Configure Environment Variables

git add .

git commit -m "Initial commit"Create or edit the `.env.local` file in the project root:

git push origin main

``````env

NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here

#### 2. Deploy on Netlify```



1. **Go to [Netlify](https://app.netlify.com/)** and sign in**Note:** Replace `your_google_maps_api_key_here` with your actual API key from Google Cloud Console.

2. **Click "Add new site"** > **"Import an existing project"**

3. **Select "Deploy with GitHub"** and connect your GitHub account### 5. Run the Application

4. **Select your repository**

5. **Build settings** will be auto-detected:```bash

   - **Build command:** `npm run build`npm run dev

   - **Publish directory:** `out` or `.next````

6. **In "Add environment variables"** section, add your API key:

   - **Key:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`The application will open at [http://localhost:3000](http://localhost:3000).

   - **Value:** Your API key from Google Cloud Console

7. **Click "Deploy site"**## 🚀 Deployment to Netlify



#### 3. Customize Site Name (Optional)### Method 1: GitHub Integration (Recommended)



1. After deployment, go to **"Site settings"** > **"Change site name"**#### 1. Push to GitHub

2. Enter your desired unique name (e.g., `my-travel-assistant`)

3. Your site will now be accessible at `https://my-travel-assistant.netlify.app````bash

git add .

### Method 2: Deploy with Netlify CLIgit commit -m "Initial commit"

git push origin main

```bash```

# Install Netlify CLI

npm install -g netlify-cli#### 2. Deploy on Netlify



# Login to Netlify1. **Go to [Netlify](https://app.netlify.com/)** and sign in

netlify login2. **Click "Add new site"** > **"Import an existing project"**

3. **Select "Deploy with GitHub"** and connect your GitHub account

# Initialize the project4. **Select your repository**

netlify init5. **Build settings** will be auto-detected:

   - **Build command:** `npm run build`

# Add environment variable   - **Publish directory:** `out` or `.next`

netlify env:set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY "your_api_key_here"6. **In "Add environment variables"** section, add your API key:

   - **Key:** `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

# Deploy   - **Value:** Your API key from Google Cloud Console

netlify deploy --prod7. **Click "Deploy site"**

```

#### 3. Customize Site Name (Optional)

### Method 3: Manual Deployment with Drag & Drop

1. After deployment, go to **"Site settings"** > **"Change site name"**

1. Build the project: `npm run build`2. Enter your desired unique name (e.g., `my-travel-assistant`)

2. **Go to [Netlify Drop](https://app.netlify.com/drop)**3. Your site will now be accessible at `https://my-travel-assistant.netlify.app`

3. Drag and drop the build folder (`.next` or `out`)

4. **Add API key** from Site settings > Environment variables### Method 2: Deploy with Netlify CLI



### 4. Production API Key Security```bash

# Install Netlify CLI

In production, you must restrict your API key to your domain:npm install -g netlify-cli



1. **Edit your API key** in Google Cloud Console > Credentials# Login to Netlify

2. **Select Application restrictions > HTTP referrers**netlify login

3. Add your Netlify domain:

   - `https://your-site-name.netlify.app/*`# Initialize the project

   - `https://*.netlify.app/*` (for all preview deployments)netlify init



### 5. Automatic Deployment Settings# Add environment variable

netlify env:set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY "your_api_key_here"

Netlify automatically deploys on every push to GitHub:

# Deploy

- **Production branch:** `main` or `master`netlify deploy --prod

- **Deploy previews:** Automatic preview for each pull request```

- **Branch deploys:** Deploy for other branches (can be enabled in settings)

### Method 3: Manual Deployment with Drag & Drop

**⚠️ Security Warning:** Never share your API key in a public repository!

1. Build the project: `npm run build`

## 💰 Google Maps API Pricing2. **Go to [Netlify Drop](https://app.netlify.com/drop)**

3. Drag and drop the build folder (`.next` or `out`)

### Daily Free Limits (2025)4. **Add API key** from Site settings > Environment variables



- **Maps JavaScript API:** 28,000 loads/month ($7 credit)### 4. Production API Key Security

- **Places API:** 

  - Nearby Search: 2,500 searches/dayIn production, you must restrict your API key to your domain:

  - Place Details: 2,500 requests/day

- **Geocoding API:** 2,500 requests/day1. **Edit your API key** in Google Cloud Console > Credentials

2. **Select Application restrictions > HTTP referrers**

### Cost Control3. Add your Netlify domain:

   - `https://your-site-name.netlify.app/*`

1. **Set limits** at [Google Cloud Console > APIs & Services > Quotas](https://console.cloud.google.com/apis/api/maps-backend.googleapis.com/quotas)   - `https://*.netlify.app/*` (for all preview deployments)

2. **Set up billing alerts** to receive notifications on overages

3. **Monitor API usage** statistics regularly### 5. Automatic Deployment Settings



**💡 Tip:** Free limits are usually sufficient for small projects.Netlify automatically deploys on every push to GitHub:



## 🏗️ Architecture Overview- **Production branch:** `main` or `master`

- **Deploy previews:** Automatic preview for each pull request

### Model (models/)- **Branch deploys:** Deploy for other branches (can be enabled in settings)

- Defines data types and interfaces

- `types.ts`: TypeScript type definitions**⚠️ Security Warning:** Never share your API key in a public repository!



### View (components/ + app/page.tsx)## 💰 Google Maps API Pricing

- Contains user interface components

- Responsible only for display and user interactions### Daily Free Limits (2025)



### ViewModel (viewmodels/)- **Maps JavaScript API:** 28,000 loads/month ($7 credit)

- Handles business logic and state management- **Places API:** 

- Acts as a bridge between View and Model  - Nearby Search: 2,500 searches/day

- `useMapViewModel.ts`: Main business logic hook  - Place Details: 2,500 requests/day

- **Geocoding API:** 2,500 requests/day

### Services (services/)

- Manages communication with external APIs and services### Cost Control

- Google Maps API integration

1. **Set limits** at [Google Cloud Console > APIs & Services > Quotas](https://console.cloud.google.com/apis/api/maps-backend.googleapis.com/quotas)

## 🔒 Security2. **Set up billing alerts** to receive notifications on overages

3. **Monitor API usage** statistics regularly

- API keys are securely stored using environment variables

- Client-side and server-side API calls are separated**💡 Tip:** Free limits are usually sufficient for small projects.

- HTTP referrer restrictions recommended (for production)

## 🏗️ Architecture Overview

## ✅ Supported Features

### Model (models/)

- ✅ Location finding- Defines data types and interfaces

- ✅ Nearby restaurant search- `types.ts`: TypeScript type definitions

- ✅ Transportation options

- ✅ Customizable country guides (Examples: Malaysia, Indonesia)### View (components/ + app/page.tsx)

- ✅ Interactive map- Contains user interface components

- ✅ Responsive design- Responsible only for display and user interactions

- ✅ Error handling

- ✅ Loading states### ViewModel (viewmodels/)

- ✅ **3 Language support (English, Turkish, Kurdish)**- Handles business logic and state management

- ✅ **Dark/Light theme support**- Acts as a bridge between View and Model

- ✅ **Easy deployment with Netlify**- `useMapViewModel.ts`: Main business logic hook

- 🔄 Configurable emergency services for any country

### Services (services/)

## 🌐 Adding New Language Support- Manages communication with external APIs and services

- Google Maps API integration

To add your own language to the project:

## 🔒 Security

### 1. Add Language Type

- API keys are securely stored using environment variables

Add the language type in `contexts/AppContext.tsx`:- Client-side and server-side API calls are separated

- HTTP referrer restrictions recommended (for production)

```typescript

export type Language = 'en' | 'tr' | 'ku' | 'your-lang-code';## ✅ Supported Features

```

- ✅ Location finding

### 2. Add Translations- ✅ Nearby restaurant search

- ✅ Transportation options

Add your language translations to the `translations` object in the same file:- ✅ Customizable country guides (Examples: Malaysia, Indonesia)

- ✅ Interactive map

```typescript- ✅ Responsive design

const translations = {- ✅ Error handling

  en: { /* English translations */ },- ✅ Loading states

  tr: { /* Turkish translations */ },- ✅ **3 Language support (English, Turkish, Kurdish)**

  ku: { /* Kurdish translations */ },- ✅ **Dark/Light theme support**

  'your-lang-code': {- ✅ **Easy deployment with Netlify**

    'app.title': 'Your Translation',- 🔄 Configurable emergency services for any country

    'app.subtitle': 'Your Translation',

    // ... translations for all other keys## 🌐 Adding New Language Support

  }

};To add your own language to the project:

```

### 1. Add Language Type

### 3. Add to Settings Component

Add the language type in `contexts/AppContext.tsx`:

Add the language button in `components/Settings.tsx`:

```typescript

```tsxexport type Language = 'en' | 'tr' | 'ku' | 'your-lang-code';

<button```

  onClick={() => handleLanguageChange('your-lang-code')}

  className={/* ... styles ... */}### 2. Add Translations

>

  <span className="text-lg mb-1">🏳️</span> {/* Country flag */}Add your language translations to the `translations` object in the same file:

  <span className="font-medium text-sm">Your Language</span>

</button>```typescript

```const translations = {

  en: { /* English translations */ },

**💡 Tip:** You can use the existing Kurdish translations as a reference.  tr: { /* Turkish translations */ },

  ku: { /* Kurdish translations */ },

## 🌍 Adding Your Country  'your-lang-code': {

    'app.title': 'Your Translation',

This project includes country data for Malaysia and Indonesia by default (currently inactive). If you want to add a travel guide for your own country:    'app.subtitle': 'Your Translation',

    // ... translations for all other keys

### 1. Add Country Data  }

};

Open `data/countries.ts` and add your country's data using the commented examples as reference:```



```typescript### 3. Add to Settings Component

export const yourCountryData = {

  attractions: [Add the language button in `components/Settings.tsx`:

    { 

      name: "Important Tourist Site", ```tsx

      city: "City Name", <button

      description: "Description...",  onClick={() => handleLanguageChange('your-lang-code')}

      location: { lat: 0.0000, lng: 0.0000 },  className={/* ... styles ... */}

      visitTime: "2-3 hours",>

      entryFee: "Free",  <span className="text-lg mb-1">🏳️</span> {/* Country flag */}

      bestTime: "Best time to visit",  <span className="font-medium text-sm">Your Language</span>

      tips: "Tips..."</button>

    }```

  ],

  transportation: [**💡 Tip:** You can use the existing Kurdish translations as a reference.

    { 

      type: "Bus", ## 🌍 Adding Your Country

      description: "City bus system...",

      tips: "Tips..."This project includes country data for Malaysia and Indonesia by default (currently inactive). If you want to add a travel guide for your own country:

    }

  ],### 1. Add Country Data

  food: [

    { name: "Local Dish", description: "Description..." }Open `data/countries.ts` and add your country's data using the commented examples as reference:

  ],

  tips: [```typescript

    "Useful travel tip 1",export const yourCountryData = {

    "Useful travel tip 2"  attractions: [

  ],    { 

  safetyWarnings: [      name: "Important Tourist Site", 

    "Safety warning 1",      city: "City Name", 

    "Safety warning 2"      description: "Description...",

  ],      location: { lat: 0.0000, lng: 0.0000 },

  usefulLinks: [      visitTime: "2-3 hours",

    { name: "Tourism Website", url: "https://example.com/" }      entryFee: "Free",

  ]      bestTime: "Best time to visit",

};      tips: "Tips..."

```    }

  ],

### 2. Update Emergency Services Component  transportation: [

    { 

Add your country's emergency information using the examples in `components/EmergencyServices.tsx`.      type: "Bus", 

      description: "City bus system...",

### 3. Add Language Support      tips: "Tips..."

    }

Add language translations for your country in `contexts/AppContext.tsx`.  ],

  food: [

## 🔧 Troubleshooting    { name: "Local Dish", description: "Description..." }

  ],

### Common Issues and Solutions  tips: [

    "Useful travel tip 1",

#### Issue: "Google Maps API key not defined" error    "Useful travel tip 2"

**Solution:**  ],

1. Verify that `.env.local` is in the project root directory  safetyWarnings: [

2. Confirm the API key is in the correct format    "Safety warning 1",

3. Restart the development server (`npm run dev`)    "Safety warning 2"

  ],

#### Issue: Map not loading  usefulLinks: [

**Solution:**    { name: "Tourism Website", url: "https://example.com/" }

1. Check that required APIs are enabled in Google Cloud Console  ]

2. Verify API key restrictions};

3. Review error messages in the browser console```



#### Issue: "This page can't load Google Maps correctly" warning### 2. Update Emergency Services Component

**Solution:**

1. Verify that billing account is activeAdd your country's emergency information using the examples in `components/EmergencyServices.tsx`.

2. Confirm you haven't exceeded API limits

3. Check domain restrictions### 3. Add Language Support



#### Issue: Location services not workingAdd language translations for your country in `contexts/AppContext.tsx`.

**Solution:**

1. Verify location permission is granted in browser## 🔧 Troubleshooting

2. Ensure you're using HTTPS (location services don't work on HTTP)

3. Confirm location services are enabled in browser settings### Common Issues and Solutions



### Useful Links#### Issue: "Google Maps API key not defined" error

**Solution:**

- **[Google Maps Platform Documentation](https://developers.google.com/maps/documentation)**1. Verify that `.env.local` is in the project root directory

- **[Google Cloud Console](https://console.cloud.google.com/)**2. Confirm the API key is in the correct format

- **[Google Maps Platform Pricing](https://developers.google.com/maps/billing/understanding-cost-of-use)**3. Restart the development server (`npm run dev`)

- **[API Key Security Best Practices](https://developers.google.com/maps/api-security-best-practices)**

#### Issue: Map not loading

## 📝 License**Solution:**

1. Check that required APIs are enabled in Google Cloud Console

This project is licensed under the MIT License.2. Verify API key restrictions

3. Review error messages in the browser console

## 🤝 Contributing

#### Issue: "This page can't load Google Maps correctly" warning

Contributions are welcome! Please feel free to submit a Pull Request.**Solution:**

1. Verify that billing account is active

1. Fork the repository2. Confirm you haven't exceeded API limits

2. Create a feature branch (`git checkout -b feature/amazing-feature`)3. Check domain restrictions

3. Commit your changes (`git commit -m 'Add amazing feature'`)

4. Push to the branch (`git push origin feature/amazing-feature`)#### Issue: Location services not working

5. Open a Pull Request**Solution:**

1. Verify location permission is granted in browser

## 📞 Contact2. Ensure you're using HTTPS (location services don't work on HTTP)

3. Confirm location services are enabled in browser settings

For questions, feel free to open an issue or submit a pull request.

### Useful Links

---

- **[Google Maps Platform Documentation](https://developers.google.com/maps/documentation)**

**Made with ❤️ for travelers worldwide**- **[Google Cloud Console](https://console.cloud.google.com/)**

- **[Google Maps Platform Pricing](https://developers.google.com/maps/billing/understanding-cost-of-use)**

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
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
