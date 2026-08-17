import type {Metadata} from 'next';
import './globals.css';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { CartProvider } from '@/context/cart-context';
import CartToast from '@/components/cart/cart-toast';

export const metadata: Metadata = {
  title: {
    default: 'Buy Retatrutide UK & MT2 | Lab-Tested, COA Verified',
    template: '%s | RetaPharma UK'
  },
  description: 'Buy retatrutide UK with third-party COA, plus MT2 research peptides. 99%+ HPLC purity, cold-chain stored, same-day UK dispatch. Research use only.',
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
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}

