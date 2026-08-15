'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/cart-context';
import { CheckCircle2, ShoppingBag, ArrowRight, X } from 'lucide-react';

export default function CartToast() {
  const { recentlyAddedProduct, dismissToast, itemCount, subtotal } = useCart();

  if (!recentlyAddedProduct) return null;

  return (
    <div 
      id="cart-toast-banner"
      className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700/80 p-4 transition-all duration-300 transform translate-y-0"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Added to Cart</span>
        </div>
        <button
          onClick={dismissToast}
          className="text-slate-400 hover:text-white transition p-1"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-3 bg-slate-800/80 rounded-xl p-2.5 border border-slate-700">
        <div className="relative w-12 h-12 rounded-lg bg-white overflow-hidden flex-shrink-0">
          <Image
            src={recentlyAddedProduct.image}
            alt={recentlyAddedProduct.name}
            fill
            className="object-contain p-1"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-grow min-w-0">
          <h4 className="text-sm font-semibold text-white truncate">
            {recentlyAddedProduct.name}
          </h4>
          <p className="text-xs text-slate-300 font-mono">
            £{recentlyAddedProduct.price.toFixed(2)} GBP
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="text-xs text-slate-400">
          <span className="font-semibold text-white">{itemCount} items</span> · £{subtotal.toFixed(2)}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/checkout"
            onClick={dismissToast}
            className="inline-flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Checkout</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
