# Travel Assistance

A comprehensive travel assistance web application for users traveling worldwide. Utilizes Google Maps API to find nearby places and provide safety information.

## Language Support

The application supports **3 languages**:
- **English** (Default)
- **Turkish**
- **Kurdish (Kurmanji)**

Language settings can be changed from the settings button in the top right corner.

## Key Features

- **Location-Based Search**: Find user's current location
- **Nearby Places**: List restaurants, transportation, and other important locations
- **Interactive Map**: Google Maps integration with map view
- **Customizable Country Guides**: Add detailed travel information for any country
- **Multi-Language Support**: English, Turkish, and Kurdish language options
- **Dark/Light Mode**: Theme support
- **Safety Alerts**: Important tips for travel safety
- **Responsive Design**: Mobile and desktop compatible

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Google Maps API (@react-google-maps/api)
- **Architecture**: MVVM Pattern
- **Deployment**: Netlify
- **Alternative**: Vercel Ready

## Project Structure (MVVM Pattern)

```
travel-assistance/
 app/                    # Next.js App Router
    api/               # API Routes (Backend)
       places/        # Places API endpoint
    page.tsx           # Main page (View)
    layout.tsx         # Layout component
 components/            # View Components
    MapComponent.tsx   # Map component
    ActionButton.tsx   # Action buttons
    PlacesList.tsx     # Places list
    GuideContent.tsx   # Guide content
    ErrorMessage.tsx   # Error messages
 viewmodels/            # View Models (Business Logic)
    useMapViewModel.ts # Main view model hook
 models/                # Data Models & Types
    types.ts           # TypeScript type definitions
 services/              # Business Services
    mapService.ts      # Map and location services
 data/                  # Static Data
    countries.ts       # Country data (Examples: Malaysia, Indonesia - add your own)
 .env.local            # Environment variables
```

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/SehmusYakut/travel-assistance.git
cd travel-assistance
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Google Maps API Setup

**Important:** This application requires a Google Maps API key to function.

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

**Security Warning:** Never share your API key in a public repository!

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

### Useful Links

- Google Maps Platform Documentation: https://developers.google.com/maps/documentation
- Google Cloud Console: https://console.cloud.google.com/
- Google Maps Platform Pricing: https://developers.google.com/maps/billing/understanding-cost-of-use
- API Key Security Best Practices: https://developers.google.com/maps/api-security-best-practices

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Contact

For questions, feel free to open an issue or submit a pull request.

---

**Made with love for travelers worldwide**
