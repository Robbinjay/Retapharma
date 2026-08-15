"use client";

import Link from 'next/link';
import { Menu, X, ShoppingCart, ChevronDown, ShoppingBag } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/cart-context';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isShopHovered, setIsShopHovered] = useState(false);
  const { itemCount, isLoaded } = useCart();

  const navLinks = [
    { name: 'Retatrutide', href: '/retatrutide' },
    { name: 'MT2', href: '/mt2' },
    { name: 'Peptide Information', href: '/peptide-information' },
    { name: 'Batch Data', href: '/batch-data' },
    { name: 'Laboratory Testing', href: '/laboratory-testing' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Contact', href: '/contact' },
  ];

  const shopCategories = [
    { name: 'All Products', href: '/shop' },
    { name: 'Peptides', href: '/shop?category=Peptides' },
    { name: 'Alluvi', href: '/shop?category=Alluvi' },
    { name: 'Reteva', href: '/shop?category=Reteva' },
    { name: 'Retatrutide', href: '/shop?category=Retatrutide' },
    { name: 'MT2', href: '/shop?category=MT2' },
    { name: 'Supplies', href: '/shop?category=Supplies' }
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight text-slate-900">Reta Pharma</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center space-x-5 text-sm font-medium text-slate-600 relative">
          
          <div 
            className="relative"
            onMouseEnter={() => setIsShopHovered(true)}
            onMouseLeave={() => setIsShopHovered(false)}
          >
            <Link href="/shop" className="hover:text-slate-900 transition-colors flex items-center gap-1 py-2">
              Shop <ChevronDown className={`w-4 h-4 transition-transform ${isShopHovered ? 'rotate-180' : ''}`} />
            </Link>

            {isShopHovered && (
              <div className="absolute top-full left-0 w-48 bg-white border border-slate-200 rounded-md shadow-lg py-2 z-50">
                {shopCategories.map((cat) => (
                  <Link 
                    key={cat.name} 
                    href={cat.href} 
                    className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    onClick={() => setIsShopHovered(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-slate-900 transition-colors py-2">
              {link.name}
            </Link>
          ))}

          {/* Cart / Checkout Button */}
          <Link 
            href="/checkout" 
            id="header-cart-button"
            className="relative bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 ml-2 font-semibold shadow-sm"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-400" />
            <span>Checkout</span>
            {isLoaded && itemCount > 0 && (
              <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="lg:hidden flex items-center space-x-3">
          <Link 
            href="/checkout" 
            id="mobile-header-cart-button"
            className="relative p-2 text-slate-900 hover:text-emerald-600 transition"
            aria-label="View Cart and Checkout"
          >
            <ShoppingCart className="w-6 h-6" />
            {isLoaded && itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[11px] font-bold h-5 min-w-[20px] px-1 rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-slate-900 focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b shadow-lg py-4 px-4 flex flex-col space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div className="space-y-2">
             <div className="font-bold text-slate-900 text-lg">Shop Categories</div>
             <div className="pl-4 flex flex-col space-y-2 border-l-2 border-slate-100">
                {shopCategories.map((cat) => (
                  <Link 
                    key={cat.name} 
                    href={cat.href} 
                    className="text-slate-600 hover:text-slate-900 font-medium text-base"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {cat.name}
                  </Link>
                ))}
             </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-600 hover:text-slate-900 font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            href="/checkout"
            className="bg-emerald-600 text-white px-4 py-3 rounded-lg text-center font-bold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Go to Checkout ({itemCount} items)</span>
          </Link>
        </div>
      )}
    </header>
  );
}

