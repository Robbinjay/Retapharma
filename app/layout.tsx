import type {Metadata} from 'next';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { CartProvider } from '@/context/cart-context';
import CartToast from '@/components/cart/cart-toast';
import WhatsAppChatWidget from '@/components/whatsapp/whatsapp-chat-widget';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://retapharma.uk'),
  alternates: {
    canonical: '/',
  },
  title: {
    default: 'Buy Retatrutide UK & MT2 | Lab-Tested, COA Verified Peptides',
    template: '%s | RetaPharma UK'
  },
  description: 'Buy high-purity retatrutide UK with third-party COA verification. Premium MT2 and research peptides. 99%+ HPLC purity, cold-chain stored, same-day UK dispatch.',
  keywords: ['retatrutide uk', 'buy retatrutide', 'mt2 peptides uk', 'research peptides uk', 'peptides with coa', 'melanotan 2 uk'],
  authors: [{ name: 'RetaPharma UK' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://retapharma.uk',
    siteName: 'RetaPharma UK',
    title: 'Buy Retatrutide UK & MT2 | Lab-Tested, COA Verified Peptides',
    description: 'Premium UK research peptides. HPLC verified Retatrutide, MT2, and more. Same-day dispatch and cold-chain storage.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'RetaPharma UK - Laboratory Grade Peptides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Buy Retatrutide UK & MT2 | RetaPharma UK',
    description: 'High-purity research peptides with 3rd-party COA verification. Fast UK delivery.',
    images: ['/logo.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  }
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col font-sans bg-slate-50 text-slate-900" suppressHydrationWarning>
        <CartProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <CartToast />
          <WhatsAppChatWidget />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

