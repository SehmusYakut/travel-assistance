import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { AppProvider } from '../contexts/AppContext'
import { SettingsButton } from '../components/Settings'
import "./globals.css";

export const metadata: Metadata = {
  title: 'Travel Assistance - Your Personal Travel Helper',
  description: 'Your personal travel assistance app for exploring new destinations safely and efficiently',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <script
          async
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&loading=async`}
        ></script>
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <AppProvider>
          {children}
          <SettingsButton />
        </AppProvider>
      </body>
    </html>
  );
}
