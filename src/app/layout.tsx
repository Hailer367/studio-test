import type { Metadata } from 'next';
import { AppProvider } from '@/components/providers/app-provider';
import { Toaster } from '@/components/ui/toaster';
import { Cinzel_Decorative, Inter } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Citadel Coin',
  description: 'A mystical coin flip game on Solana.',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const cinzel = Cinzel_Decorative({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-cinzel',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
       <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${cinzel.variable} font-body antialiased`}>
        <AppProvider>
          {children}
          <Toaster />
        </AppProvider>
      </body>
    </html>
  );
}
