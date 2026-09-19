import { Suspense } from 'react';
import type { Metadata } from 'next';
import ShopContent from '@/components/shop/shop-content';

export const metadata: Metadata = {
  title: 'Shop All Research Peptides | RetaPharma UK',
  description: 'Browse our full catalogue of high-purity lyophilized peptides. HPLC tested Retatrutide, MT2, BPC-157, and more. Fast UK shipping.',
  alternates: {
    canonical: '/shop',
  },
  openGraph: {
    title: 'Shop All Research Peptides | RetaPharma UK',
    description: 'Browse our full catalogue of high-purity lyophilized peptides. HPLC tested Retatrutide, MT2, BPC-157, and more. Fast UK shipping.',
    url: 'https://retapharma.uk/shop',
  }
};

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center text-slate-500">
        Loading shop...
      </div>
    }>
      <ShopContent />
    </Suspense>
  );
}
