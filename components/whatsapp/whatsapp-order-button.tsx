'use client';

import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Product } from '@/lib/data';
import { getWhatsAppLink, getSingleProductOrderMessage } from '@/lib/whatsapp';

interface WhatsAppOrderButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export default function WhatsAppOrderButton({
  product,
  quantity = 1,
  className = '',
  variant = 'secondary',
}: WhatsAppOrderButtonProps) {
  const handleWhatsAppOrder = () => {
    const message = getSingleProductOrderMessage(
      product.name,
      product.format,
      product.price,
      quantity,
      product.slug
    );
    const url = getWhatsAppLink(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const variantStyles = {
    primary: 'bg-emerald-600 hover:bg-emerald-700 text-white border border-transparent shadow-sm',
    secondary: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-slate-400',
  };

  return (
    <button
      type="button"
      id={`whatsapp-order-${product.id}`}
      onClick={handleWhatsAppOrder}
      className={`inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-[0.98] ${variantStyles[variant]} ${className}`}
      title="Place order directly with customer support on WhatsApp"
    >
      <MessageCircle className="w-4 h-4 text-emerald-600 fill-emerald-600/20" />
      <span>Order via WhatsApp</span>
    </button>
  );
}
