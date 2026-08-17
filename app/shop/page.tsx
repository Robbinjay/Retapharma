"use client";

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { products } from '@/lib/data';
import Image from 'next/image';
import ProductImage from '@/components/ui/product-image';
import Link from 'next/link';
import { CheckCircle2, Search, Filter, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/cart-context';

function ShopContent() {
  const { addToCart } = useCart();
  const searchParams = useSearchParams();
  const categoryParam = searchParams?.get('category');
  
  const [selectedCategoryOverride, setSelectedCategoryOverride] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const selectedCategory = selectedCategoryOverride ?? (categoryParam || 'All Products');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All Products' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Research Peptides</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            High-purity lyophilized materials strictly for in-vitro laboratory research and analytical testing.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold text-lg border-b border-slate-100 pb-4">
              <Filter className="w-5 h-5" />
              Filters
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Categories</h3>
                <div className="space-y-2">
                  {['All Products', 'Peptides', 'Alluvi', 'Reteva', 'Retatrutide', 'MT2', 'Supplies'].map((cat) => (
                    <label key={cat} className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 cursor-pointer">
                      <input 
                        type="radio" 
                        name="category" 
                        className="rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-600" 
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategoryOverride(cat)}
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">Availability</h3>
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-600" defaultChecked />
                  In Stock Only
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          {/* Search bar */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 mb-8 flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="w-full outline-none text-slate-700 bg-transparent placeholder:text-slate-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="relative h-64 w-full bg-slate-50/70 border-b border-slate-100 overflow-hidden flex items-center justify-center p-4">
                  <ProductImage
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    fallbackCategory={product.category}
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                    {product.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-slate-600 mb-6 line-clamp-2">{product.shortDescription}</p>
                  
                  <div className="space-y-2 mb-6 text-xs text-slate-600 mt-auto">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="truncate">{product.format}</span>
                    </div>
                    {product.batchDataAvailable && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span>Batch Data Available</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto gap-2">
                    <span className="text-xl font-bold text-slate-900">£{product.price.toFixed(2)}</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => addToCart(product, 1)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-2 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-sm"
                        title="Quick Add to Cart"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </button>
                      <Link
                        href={`/shop/${product.slug}`}
                        className="bg-slate-900 text-white px-3 py-2 rounded-lg font-medium text-xs hover:bg-slate-800 transition-colors"
                      >
                        Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No products found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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
