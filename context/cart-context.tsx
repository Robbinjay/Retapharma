'use client';

import React, { createContext, useContext, useEffect, useState, useSyncExternalStore } from 'react';
import { Product } from '@/lib/data';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface ShippingOption {
  id: 'normal' | 'express' | 'international';
  name: string;
  price: number;
  description: string;
  estimatedDelivery: string;
}

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: 'normal',
    name: 'Normal Shipping',
    price: 15,
    description: 'Tracked standard delivery within the UK (2–4 business days)',
    estimatedDelivery: '2–4 Business Days',
  },
  {
    id: 'express',
    name: 'Express Shipping',
    price: 40,
    description: 'Next-day priority tracked courier dispatch',
    estimatedDelivery: '1–2 Business Days',
  },
  {
    id: 'international',
    name: 'International Shipping',
    price: 25,
    description: 'Tracked international airmail worldwide',
    estimatedDelivery: '5–10 Business Days',
  },
];

export const MIN_ORDER_AMOUNT = 100; // 100 GBP

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  isMinOrderMet: boolean;
  minOrderShortfall: number;
  isLoaded: boolean;
  recentlyAddedProduct: Product | null;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'retapharma_cart_v1';

const emptySubscribe = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const isLoaded = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          return JSON.parse(savedCart);
        }
      } catch (e) {
        console.error('Failed to load cart from storage', e);
      }
    }
    return [];
  });
  
  const [recentlyAddedProduct, setRecentlyAddedProduct] = useState<Product | null>(null);

  // Save to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to storage', e);
    }
  }, [cart, isLoaded]);

  const addToCart = (product: Product, quantity = 1) => {
    if (quantity <= 0) return;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [...prevCart, { product, quantity }];
      }
    });

    setRecentlyAddedProduct(product);
    // Auto-dismiss toast after 4s
    setTimeout(() => {
      setRecentlyAddedProduct((curr) => (curr?.id === product.id ? null : curr));
    }, 4000);
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const dismissToast = () => {
    setRecentlyAddedProduct(null);
  };

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const isMinOrderMet = subtotal >= MIN_ORDER_AMOUNT;
  const minOrderShortfall = Math.max(0, MIN_ORDER_AMOUNT - subtotal);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        subtotal,
        isMinOrderMet,
        minOrderShortfall,
        isLoaded,
        recentlyAddedProduct,
        dismissToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
