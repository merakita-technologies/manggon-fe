import "./globals.css";
import type { Metadata, Viewport } from 'next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
  viewportFit: 'cover', // Important for PWA fullscreen
}

export const metadata: Metadata = {
  title: 'StayAdmin - Property Management',
  description: 'Dashboard for property management',
  manifest: '/manifest.json',
  icons: {
    apple: '/icon-192x192.png',
  },
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="StayAdmin" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="bg-gray-50">
        <div className="min-h-screen flex">
          {/* Mobile sidebar overlay */}
          <div className="lg:hidden">
            {/* Mobile menu will be implemented */}
          </div>
          {children}
        </div>
      </body>
    </html>
  );
}