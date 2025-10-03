# Travel Assistance 🌍

> A comprehensive travel assistance web application for users traveling worldwide. Utilizes Google Maps API to find nearby places and provide safety information.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/SehmusYakut/travel-assistance.git

# Navigate to project directory
cd travel-assistance

# Install dependencies
npm install

# Set up your Google Maps API key in .env.local
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here" > .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start exploring!

## 🌐 Language Support

The application supports **3 languages** with seamless switching:

| Language | Code | Status |
|----------|------|--------|
| 🇺🇸 English | `en` | ✅ Default |
| 🇹🇷 Turkish | `tr` | ✅ Supported |
| 🗣️ Kurdish (Kurmanji) | `ku` | ✅ Supported |

> 💡 **Tip:** Change languages from the settings button (⚙️) in the top right corner.

## ✨ Key Features

<table>
<tr>
<td width="50%">

### 🗺️ Core Features
- **📍 Location-Based Search**: Auto-detect your current location
- **🍽️ Nearby Places**: Restaurants, cafes, and attractions
- **🗺️ Interactive Map**: Real-time Google Maps integration
- **🚌 Transportation**: Find nearby transit options

</td>
<td width="50%">

### 🎨 User Experience
- **🌍 Multi-Language**: EN, TR, KU support
- **🌓 Dark/Light Mode**: Eye-friendly themes
- **📱 Responsive Design**: Mobile & desktop optimized
- **⚡ Fast Performance**: Built with Next.js 15

</td>
</tr>
<tr>
<td width="50%">

### 🛡️ Travel Tools
- **🚨 Emergency Services**: Quick access to help
- **💱 Currency Converter**: Real-time exchange rates
- **🗣️ Translator**: Break language barriers
- **☁️ Weather**: Current conditions & forecasts

</td>
<td width="50%">

### 📚 Information
- **🏛️ Country Guides**: Detailed travel info
- **⚠️ Safety Alerts**: Important tips & warnings
- **🍜 Turkish Restaurants**: Find authentic cuisine
- **📍 Route Planning**: Navigate efficiently

</td>
</tr>
</table>

## 🛠️ Tech Stack

<div align="center">

| Category | Technologies |
|----------|-------------|
| **Framework** | ![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js) |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript) |
| **Styling** | ![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss) |
| **Maps** | ![Google Maps](https://img.shields.io/badge/Google_Maps-API-red?logo=google-maps) |
| **Architecture** | MVVM Pattern |
| **Deployment** | ![Netlify](https://img.shields.io/badge/Netlify-Ready-00C7B7?logo=netlify) ![Vercel](https://img.shields.io/badge/Vercel-Ready-black?logo=vercel) |

</div>

## 📂 Project Structure (MVVM Pattern)

```
travel-assistance/
├── 📁 app/                     # Next.js App Router
│   ├── 📁 api/                # API Routes (Backend)
│   │   └── 📁 places/         # Places API endpoint
│   ├── 📄 page.tsx            # Main page (View)
│   └── 📄 layout.tsx          # Layout component
├── 📁 components/             # View Components
│   ├── 🗺️ MapComponent.tsx    # Map component
│   ├── 🔘 ActionButton.tsx    # Action buttons
│   ├── 📋 PlacesList.tsx      # Places list
│   ├── 📖 GuideContent.tsx    # Guide content
│   ├── ⚙️ Settings.tsx         # Settings modal
│   ├── 💱 CurrencyConverter.tsx # Currency tool
│   ├── 🗣️ Translator.tsx       # Translation tool
│   └── ❌ ErrorMessage.tsx    # Error messages
├── 📁 viewmodels/             # View Models (Business Logic)
│   └── 🎯 useMapViewModel.ts  # Main view model hook
├── 📁 models/                 # Data Models & Types
│   └── 📝 types.ts            # TypeScript type definitions
├── 📁 services/               # Business Services
│   ├── 🗺️ mapService.ts       # Map and location services
│   ├── 💱 currencyService.ts  # Currency conversion
│   ├── 🗣️ translationService.ts # Translation API
│   └── ☁️ weatherService.ts   # Weather data
├── 📁 data/                   # Static Data
│   └── 🌍 countries.ts        # Country data (customizable)
├── 📁 contexts/               # React Contexts
│   └── 🌐 AppContext.tsx      # Global state & i18n
└── 📄 .env.local             # Environment variables (⚠️ git-ignored)
```

## 🚀 Installation & Setup

### Prerequisites

Before you begin, ensure you have:
- ✅ **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- ✅ **npm** or **yarn** package manager
- ✅ **Git** for version control
- ✅ **Google Cloud Account** (free tier available)

### Step 1: Clone the Repository

```bash
git clone https://github.com/SehmusYakut/travel-assistance.git
cd travel-assistance
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

> ⏱️ **Estimated time:** 2-3 minutes depending on your internet speed

### Step 3: Google Maps API Setup 🗺️

**Important:** This application requires a Google Maps API key to function.

<details>
<summary><b>📖 Click here for detailed Google Maps API setup instructions</b></summary>

#### 3.1. Create API Key in Google Cloud Console

1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create a new project or select an existing one
3. Navigate to API & Services > Credentials
4. Click "+ CREATE CREDENTIALS" and select "API key"
5. Your API key will be created - save it in a secure location

#### 3.2. Enable Required APIs

The following APIs need to be enabled:

1. **Maps JavaScript API** - For map display
   - Enable: https://console.cloud.google.com/apis/library/maps-backend.googleapis.com
2. **Places API** - For finding nearby places
   - Enable: https://console.cloud.google.com/apis/library/places-backend.googleapis.com
3. **Geocoding API** - For address conversion
   - Enable: https://console.cloud.google.com/apis/library/geocoding-backend.googleapis.com

#### 3.3. Restrict API Key (Security)

**Highly recommended security settings:**

1. Edit your API key in Google Cloud Console > Credentials
2. In Application restrictions:
   - For production: Select HTTP referrers and add your domain
   - For development: You can select None
3. In API restrictions:
   - Select Restrict key
   - Choose the 3 APIs listed above

> 💡 **Pro Tip:** Set up billing alerts to avoid unexpected charges!

</details>

### Step 4: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp .env.example .env.local

# Or create manually
echo "NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here" > .env.local
```

**Your `.env.local` should look like:**

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_google_maps_api_key_here
```

> ⚠️ **Security Note:** Environment files are automatically excluded from version control

### Step 5: Run the Application 🎉

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser!

> ✅ **Success!** You should see the Travel Assistance app with an interactive map.

### 🎯 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (with Turbopack) |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### 4. Configure Environment Variables

Create or edit the `.env.local` file in the project root:

```env
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

**Note:** Replace `your_google_maps_api_key_here` with your actual API key from Google Cloud Console.

### 5. Run the Application

```bash
npm run dev
```

The application will open at http://localhost:3000

## Deployment to Netlify

### Method 1: GitHub Integration (Recommended)

#### 1. Push to GitHub

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

#### 2. Deploy on Netlify

1. Go to Netlify (https://app.netlify.com/) and sign in
2. Click "Add new site" > "Import an existing project"
3. Select "Deploy with GitHub" and connect your GitHub account
4. Select your repository
5. Build settings will be auto-detected:
   - Build command: `npm run build`
   - Publish directory: `out` or `.next`
6. In "Add environment variables" section, add your API key:
   - Key: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Value: Your API key from Google Cloud Console
7. Click "Deploy site"

#### 3. Customize Site Name (Optional)

1. After deployment, go to "Site settings" > "Change site name"
2. Enter your desired unique name (e.g., `my-travel-assistant`)
3. Your site will now be accessible at `https://my-travel-assistant.netlify.app`

### Method 2: Deploy with Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize the project
netlify init

# Add environment variable
netlify env:set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY "your_api_key_here"

# Deploy
netlify deploy --prod
```

### Method 3: Manual Deployment with Drag & Drop

1. Build the project: `npm run build`
2. Go to Netlify Drop (https://app.netlify.com/drop)
3. Drag and drop the build folder (`.next` or `out`)
4. Add API key from Site settings > Environment variables

### 4. Production API Key Security

In production, you must restrict your API key to your domain:

1. Edit your API key in Google Cloud Console > Credentials
2. Select Application restrictions > HTTP referrers
3. Add your Netlify domain:
   - `https://your-site-name.netlify.app/*`
   - `https://*.netlify.app/*` (for all preview deployments)

### 5. Automatic Deployment Settings

Netlify automatically deploys on every push to GitHub:

- **Production branch:** `main` or `master`
- **Deploy previews:** Automatic preview for each pull request
- **Branch deploys:** Deploy for other branches (can be enabled in settings)

> 🔐 **Security Note:** Ensure your API keys are properly configured in Netlify's environment variables

## Google Maps API Pricing

### Daily Free Limits (2025)

- **Maps JavaScript API:** 28,000 loads/month (-Force7 credit)
- **Places API:** 
  - Nearby Search: 2,500 searches/day
  - Place Details: 2,500 requests/day
- **Geocoding API:** 2,500 requests/day

### Cost Control

1. Set limits at Google Cloud Console > APIs & Services > Quotas
2. Set up billing alerts to receive notifications on overages
3. Monitor API usage statistics regularly

**Tip:** Free limits are usually sufficient for small projects.

## Architecture Overview

### Model (models/)
- Defines data types and interfaces
- `types.ts`: TypeScript type definitions

### View (components/ + app/page.tsx)
- Contains user interface components
- Responsible only for display and user interactions

### ViewModel (viewmodels/)
- Handles business logic and state management
- Acts as a bridge between View and Model
- `useMapViewModel.ts`: Main business logic hook

### Services (services/)
- Manages communication with external APIs and services
- Google Maps API integration

## Security

- API keys are securely stored using environment variables
- Client-side and server-side API calls are separated
- HTTP referrer restrictions recommended (for production)

## Supported Features

- Location finding
- Nearby restaurant search
- Transportation options
- Customizable country guides (Examples: Malaysia, Indonesia)
- Interactive map
- Responsive design
- Error handling
- Loading states
- **3 Language support (English, Turkish, Kurdish)**
- **Dark/Light theme support**
- **Easy deployment with Netlify**
- Configurable emergency services for any country

## Adding New Language Support

To add your own language to the project:

### 1. Add Language Type

Add the language type in `contexts/AppContext.tsx`:

```typescript
export type Language = 'en' | 'tr' | 'ku' | 'your-lang-code';
```

### 2. Add Translations

Add your language translations to the `translations` object in the same file:

```typescript
const translations = {
  en: { /* English translations */ },
  tr: { /* Turkish translations */ },
  ku: { /* Kurdish translations */ },
  'your-lang-code': {
    'app.title': 'Your Translation',
    'app.subtitle': 'Your Translation',
    // ... translations for all other keys
  }
};
```

### 3. Add to Settings Component

Add the language button in `components/Settings.tsx`:

```tsx
<button
  onClick={() => handleLanguageChange('your-lang-code')}
  className={/* ... styles ... */}
>
  <span className="text-lg mb-1">Country Flag</span>
  <span className="font-medium text-sm">Your Language</span>
</button>
```

**Tip:** You can use the existing Kurdish translations as a reference.

## Adding Your Country

This project includes country data for Malaysia and Indonesia by default (currently inactive). If you want to add a travel guide for your own country:

### 1. Add Country Data

Open `data/countries.ts` and add your country's data using the commented examples as reference.

### 2. Update Emergency Services Component

Add your country's emergency information using the examples in `components/EmergencyServices.tsx`.

### 3. Add Language Support

Add language translations for your country in `contexts/AppContext.tsx`.

## Troubleshooting

### Common Issues and Solutions

#### Issue: "Google Maps API key not defined" error
**Solution:**
1. Verify that `.env.local` is in the project root directory
2. Confirm the API key is in the correct format
3. Restart the development server (`npm run dev`)

#### Issue: Map not loading
**Solution:**
1. Check that required APIs are enabled in Google Cloud Console
2. Verify API key restrictions
3. Review error messages in the browser console

#### Issue: "This page can't load Google Maps correctly" warning
**Solution:**
1. Verify that billing account is active
2. Confirm you haven't exceeded API limits
3. Check domain restrictions

#### Issue: Location services not working
**Solution:**
1. Verify location permission is granted in browser
2. Ensure you're using HTTPS (location services don't work on HTTP)
3. Confirm location services are enabled in browser settings

### 🔗 Useful Links

<table>
<tr>
<td width="50%">

#### 📚 Documentation
- [Google Maps Platform](https://developers.google.com/maps/documentation)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

</td>
<td width="50%">

#### 🔐 Security & Pricing
- [API Security Best Practices](https://developers.google.com/maps/api-security-best-practices)
- [Google Maps Pricing](https://developers.google.com/maps/billing/understanding-cost-of-use)
- [Google Cloud Console](https://console.cloud.google.com/)

</td>
</tr>
</table>

## 📸 Screenshots

<details>
<summary>🖼️ Click to view app screenshots</summary>

### Desktop View
![Desktop Map View](https://via.placeholder.com/800x400?text=Desktop+Map+View)
*Interactive map with location markers and place information*

### Mobile View
![Mobile View](https://via.placeholder.com/400x800?text=Mobile+View)
*Responsive design optimized for mobile devices*

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x400?text=Dark+Mode)
*Eye-friendly dark theme for night usage*

### Features Panel
![Features](https://via.placeholder.com/800x400?text=Features+Panel)
*Currency converter, translator, and weather tools*

</details>

## 🎯 Roadmap

- [ ] Add offline map support with service workers
- [ ] Implement user authentication and saved places
- [ ] Add more language options (Arabic, French, Spanish)
- [ ] Integration with booking platforms
- [ ] AI-powered travel recommendations
- [ ] Social features for sharing travel experiences
- [ ] Mobile app (React Native)

## ⚡ Performance

| Metric | Score |
|--------|-------|
| First Contentful Paint | < 1.5s |
| Time to Interactive | < 3s |
| Lighthouse Score | 90+ |
| Bundle Size | ~200KB (gzipped) |

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License - Copyright (c) 2025 Travel Assistance
Permission is hereby granted, free of charge, to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
```

## 🤝 Contributing

We love contributions! 🎉 Here's how you can help:

<details>
<summary>📋 Contribution Guidelines</summary>

### Getting Started

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/travel-assistance.git`
3. **Create a branch**: `git checkout -b feature/amazing-feature`
4. **Make changes** and test thoroughly
5. **Commit**: `git commit -m 'Add: amazing feature'`
6. **Push**: `git push origin feature/amazing-feature`
7. **Open a Pull Request** with a clear description

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Code Quality

- Write clean, readable TypeScript code
- Follow existing code patterns
- Add comments for complex logic
- Update documentation as needed
- Test on both desktop and mobile

</details>

## 💬 Support & Community

<div align="center">

### Need Help?

[![GitHub Issues](https://img.shields.io/github/issues/SehmusYakut/travel-assistance)](https://github.com/SehmusYakut/travel-assistance/issues)
[![GitHub Discussions](https://img.shields.io/github/discussions/SehmusYakut/travel-assistance)](https://github.com/SehmusYakut/travel-assistance/discussions)

**[📫 Open an Issue](https://github.com/SehmusYakut/travel-assistance/issues/new)** • 
**[💬 Start a Discussion](https://github.com/SehmusYakut/travel-assistance/discussions/new)** • 
**[⭐ Star this repo](https://github.com/SehmusYakut/travel-assistance)**

</div>

## 📞 Contact

For questions, suggestions, or collaboration:

- 📧 **Email**: Open an issue on GitHub
- 💼 **GitHub**: [@SehmusYakut](https://github.com/SehmusYakut)
- 🐛 **Bug Reports**: [Issue Tracker](https://github.com/SehmusYakut/travel-assistance/issues)
- 💡 **Feature Requests**: [Discussions](https://github.com/SehmusYakut/travel-assistance/discussions)

## 🌟 Acknowledgments

Special thanks to:

- [Google Maps Platform](https://developers.google.com/maps) for excellent mapping services
- [Next.js Team](https://nextjs.org/) for the amazing React framework
- [Vercel](https://vercel.com/) & [Netlify](https://netlify.com/) for deployment platforms
- All contributors who help improve this project
- The open-source community for inspiration

## 📊 Project Stats

![GitHub stars](https://img.shields.io/github/stars/SehmusYakut/travel-assistance?style=social)
![GitHub forks](https://img.shields.io/github/forks/SehmusYakut/travel-assistance?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/SehmusYakut/travel-assistance?style=social)

---

## 🔒 Security & Configuration

### Environment Variables
This project implements enterprise-grade API security practices:

- **Secure Storage**: API keys stored in `.env.local` (excluded from version control)
- **Template System**: Use `.env.example` as reference for required variables
- **Automated Protection**: Environment files automatically ignored by Git
- **Rotation Support**: Built-in tools for safe API key rotation

### Required API Keys
- **Google Maps API**: Enable Maps JavaScript API, Places API, and Geocoding API
  - Configure at: [Google Cloud Console](https://console.cloud.google.com/google/maps-apis)
  - **Security**: Apply domain restrictions and minimal permissions

### Security Features
- **Automated Scanning**: GitHub Actions workflow for secrets detection
- **Environment Validation**: Built-in scripts to check API key security
- **Key Rotation**: Automated helper for safe API key updates
- **Monitoring Ready**: Support for usage monitoring and alerts

### External Services (No Authentication Required)
- **Weather**: Open-Meteo API
- **Translation**: MyMemory API  
- **Currency**: ExchangeRate-API

### Security Commands
```bash
# Check API key security status
npm run security:check

# Audit dependencies for vulnerabilities  
npm run security:audit

# Rotate API key safely
node scripts/rotate-api-key.js
```

> 📋 **Security Guide**: See `SECURITY.md` for comprehensive security configuration

---

<div align="center">

### Made with ❤️ for travelers worldwide

**[⬆ Back to Top](#travel-assistance-)**

*If you found this project helpful, please consider giving it a ⭐!*

</div>
