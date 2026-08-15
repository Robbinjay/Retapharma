'use client';

import React, { useState } from 'react';
import { Product } from '@/lib/data';
import { useCart } from '@/context/cart-context';
import { ShoppingBag, Plus, Minus, Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface AddToCartButtonProps {
  product: Product;
  showQuantitySelector?: boolean;
  className?: string;
}

export default function AddToCartButton({
  product,
  showQuantitySelector = true,
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

  return (
    <div className={`flex flex-col gap-3 ${className}`}>
      <div className="flex items-center gap-3">
        {showQuantitySelector && (
          <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 p-1">
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
