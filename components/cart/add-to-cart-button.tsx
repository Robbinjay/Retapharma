'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/data';
import { useCart } from '@/context/cart-context';
import { ShoppingBag, Plus, Minus, Check, ArrowRight, MessageCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import { getWhatsAppLink, getSingleProductOrderMessage, getProductInquiryMessage } from '@/lib/whatsapp';

interface AddToCartButtonProps {
  product: Product;
  showQuantitySelector?: boolean;
  showWhatsAppOption?: boolean;
  className?: string;
}

export default function AddToCartButton({
  product,
  showQuantitySelector = true,
  showWhatsAppOption = true,
  className = '',
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const msg = getSingleProductOrderMessage(
      product.name,
      product.format,
      product.price,
      quantity,
      product.slug
    );
    window.open(getWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppInquiry = () => {
    const msg = getProductInquiryMessage(
      product.name,
      product.format,
      product.price,
      product.slug
    );
    window.open(getWhatsAppLink(msg), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        {showQuantitySelector && (
          <div className="flex items-center justify-between sm:justify-start border border-slate-300 rounded-xl bg-slate-50 p-1">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white text-slate-700 transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-bold text-slate-900 text-base">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white text-slate-700 transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}

        <button
          type="button"
          id={`add-to-cart-${product.id}`}
          onClick={handleAdd}
          className={`flex-grow flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-base transition-all shadow-sm ${
            added
              ? 'bg-emerald-600 text-white'
              : 'bg-slate-900 hover:bg-slate-800 text-white active:scale-[0.98]'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" />
              <span>Added ({quantity})</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

      {/* WhatsApp Direct Ordering & Inquiries */}
      {showWhatsAppOption && showQuantitySelector && (
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-1">
          <button
            type="button"
            id={`whatsapp-order-btn-${product.id}`}
            onClick={handleWhatsAppOrder}
            className="w-full sm:w-auto flex-grow inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 transition-colors shadow-2xs active:scale-[0.99]"
            title="Order this product directly over WhatsApp with our support team"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Order via WhatsApp ({quantity}x)</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsAppInquiry}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
            title="Ask a technical or batch question about this product"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            <span>Ask a Question</span>
          </button>
        </div>
      )}

      {added && (
        <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-200">
          <span>✓ Item added to your order</span>
          <Link
            href="/checkout"
            className="font-bold underline flex items-center gap-1 hover:text-emerald-950"
          >
            Go to Checkout <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      )}
    </div>
  );
}

