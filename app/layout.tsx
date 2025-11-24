import type { Metadata } from 'next';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google';

import { AppProviders } from '@/components/providers/app-providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'OmniCalc • Production-grade calculator suite',
  description:
    'OmniCalc ships multiple enterprise-ready calculators with blazing-fast UX, validation, and immersive storytelling.',
  metadataBase: new URL('https://omnicalc.local'),
  icons: [{ url: '/favicon.ico', rel: 'icon' }]
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-950 text-slate-100 antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
