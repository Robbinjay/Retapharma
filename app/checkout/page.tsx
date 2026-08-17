'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import ProductImage from '@/components/ui/product-image';
import Link from 'next/link';
import { useCart, SHIPPING_OPTIONS, MIN_ORDER_AMOUNT, ShippingOption } from '@/context/cart-context';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Building2, 
  Coins, 
  Smartphone, 
  Trash2, 
  Plus, 
  Minus, 
  AlertCircle, 
  CheckCircle2, 
  ArrowLeft, 
  Lock, 
  ArrowRight,
  Info
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    itemCount, 
    isMinOrderMet, 
    minOrderShortfall, 
    isLoaded 
  } = useCart();

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United Kingdom',
    notes: '',
  });

  const [selectedShipping, setSelectedShipping] = useState<ShippingOption>(SHIPPING_OPTIONS[0]);
  const [selectedPayment, setSelectedPayment] = useState<'bank_transfer' | 'crypto' | 'revolut'>('bank_transfer');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const shippingFee = selectedShipping.price;
  const grandTotal = subtotal + shippingFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (cart.length === 0) {
      setErrorMessage('Your cart is empty. Please add items before placing an order.');
      return;
    }

    if (!isMinOrderMet) {
      setErrorMessage(`The minimum order requirement is £${MIN_ORDER_AMOUNT.toFixed(2)} GBP. Please add £${minOrderShortfall.toFixed(2)} more to proceed.`);
      return;
    }

    if (!formData.fullName || !formData.email || !formData.address || !formData.city || !formData.postalCode) {
      setErrorMessage('Please fill in all required shipping and contact details.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Please confirm agreement to the Terms of Service and research use guidelines.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/checkout/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer: formData,
          items: cart.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
            format: item.product.format,
            image: item.product.image,
            slug: item.product.slug,
          })),
          shippingOption: selectedShipping,
          paymentMethod: selectedPayment,
          subtotal,
          shippingFee,
          total: grandTotal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process order. Please try again.');
      }

      // Store completed order info in session storage for the confirmation page
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('retapharma_last_order', JSON.stringify({
          ...data,
          items: cart,
          customer: formData,
          shippingOption: selectedShipping,
          paymentMethod: selectedPayment,
          subtotal,
          shippingFee,
          grandTotal,
        }));
      }

      // Clear Cart
      clearCart();

      // Redirect to Order Success receipt
      router.push(`/checkout/success?orderId=${data.orderId}`);
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMessage(err.message || 'An unexpected error occurred. Please contact support.');
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/80 py-10">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb / Top Bar */}
        <div className="flex items-center justify-between mb-8">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 tracking-tight">
          Checkout &amp; Order Placement
        </h1>

        {/* Empty Cart Banner */}
        {cart.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-2xl mx-auto shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Truck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
            <p className="text-slate-600 mb-6 text-sm">
              Explore our catalogue of research compounds, peptide pens, and laboratory supplies.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition shadow-sm"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder}>
            
            {/* Minimum Order Warning Banner */}
            {!isMinOrderMet && (
              <div 
                id="min-order-alert-banner"
                className="mb-8 bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-amber-950 font-bold text-base">
                      Minimum Order Requirement: £{MIN_ORDER_AMOUNT.toFixed(2)} GBP
                    </h3>
                    <p className="text-amber-800 text-sm mt-0.5">
                      Your current subtotal is <span className="font-bold">£{subtotal.toFixed(2)}</span>. Please add <span className="font-bold text-amber-950">£{minOrderShortfall.toFixed(2)}</span> more to place your order.
                    </p>
                  </div>
                </div>
                <Link
                  href="/shop"
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl whitespace-nowrap transition shadow-sm"
                >
                  Add More Items
                </Link>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-8 bg-rose-50 border border-rose-200 text-rose-800 rounded-2xl p-4 flex items-center gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600" />
                <span className="text-sm font-semibold">{errorMessage}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (Customer Information, Shipping, Payment) */}
              <div className="lg:col-span-7 space-y-8">
                
                {/* 1. Customer & Shipping Information */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                      1
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                      Customer &amp; Shipping Details
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Dr. John Davies"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-slate-900 text-sm transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address (for order receipts &amp; dispatch alerts) *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john.davies@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-slate-900 text-sm transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+44 7123 456789"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-slate-900 text-sm transition"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="14 Oxford Street, Laboratory Suite"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-slate-900 text-sm transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Apartment / Suite / Unit (Optional)
                      </label>
                      <input
                        type="text"
                        name="apartment"
                        value={formData.apartment}
                        onChange={handleInputChange}
                        placeholder="Suite 4B"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-slate-900 text-sm transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="London"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-slate-900 text-sm transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Postcode / ZIP *
                      </label>
                      <input
                        type="text"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        placeholder="W1D 1AR"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-slate-900 text-sm transition"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-slate-900 text-sm transition bg-white"
                      >
                        <option value="United Kingdom">United Kingdom (UK)</option>
                        <option value="United States">United States (USA)</option>
                        <option value="Canada">Canada</option>
                        <option value="Australia">Australia</option>
                        <option value="Ireland">Ireland</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Netherlands">Netherlands</option>
                        <option value="Switzerland">Switzerland</option>
                        <option value="Other">Other International Destination</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Order Notes / Special Delivery Instructions (Optional)
                      </label>
                      <textarea
                        name="notes"
                        rows={2}
                        value={formData.notes}
                        onChange={handleInputChange}
                        placeholder="e.g. Leave in reception, require cold-pack delivery confirmation..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-600/20 outline-none text-slate-900 text-sm transition"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Shipping Tier Selection */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Select Shipping Tier
                      </h2>
                      <p className="text-xs text-slate-500">
                        Discreet packaging with temperature-managed dispatch
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3.5">
                    {SHIPPING_OPTIONS.map((option) => {
                      const isSelected = selectedShipping.id === option.id;
                      return (
                        <label
                          key={option.id}
                          className={`flex items-center justify-between p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-emerald-600 bg-emerald-50/50 shadow-sm'
                              : 'border-slate-200 hover:border-slate-300 bg-white'
                          }`}
                        >
                          <div className="flex items-center gap-3.5">
                            <input
                              type="radio"
                              name="shipping"
                              checked={isSelected}
                              onChange={() => setSelectedShipping(option)}
                              className="w-4 h-4 text-emerald-600 focus:ring-emerald-500"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-slate-900 text-sm">
                                  {option.name}
                                </span>
                                <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                                  {option.estimatedDelivery}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-0.5">
                                {option.description}
                              </p>
                            </div>
                          </div>
                          <span className="font-extrabold text-slate-900 text-base">
                            £{option.price.toFixed(2)} GBP
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Payment Method Selection */}
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900">
                        Payment Method
                      </h2>
                      <p className="text-xs text-slate-500">
                        Select your preferred payment channel
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {/* Bank Transfer */}
                    <button
                      type="button"
                      onClick={() => setSelectedPayment('bank_transfer')}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                        selectedPayment === 'bank_transfer'
                          ? 'border-emerald-600 bg-emerald-50/60 shadow-sm text-emerald-950'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <Building2 className="w-6 h-6 mb-2 text-emerald-600" />
                      <span className="font-bold text-sm">Bank Transfer</span>
                      <span className="text-[11px] text-slate-500 mt-1">BACS / Faster Pay</span>
                    </button>

                    {/* Crypto Currency */}
                    <button
                      type="button"
                      onClick={() => setSelectedPayment('crypto')}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                        selectedPayment === 'crypto'
                          ? 'border-emerald-600 bg-emerald-50/60 shadow-sm text-emerald-950'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <Coins className="w-6 h-6 mb-2 text-emerald-600" />
                      <span className="font-bold text-sm">Crypto Currency</span>
                      <span className="text-[11px] text-slate-500 mt-1">USDT / BTC / ETH</span>
                    </button>

                    {/* Revolut App */}
                    <button
                      type="button"
                      onClick={() => setSelectedPayment('revolut')}
                      className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all ${
                        selectedPayment === 'revolut'
                          ? 'border-emerald-600 bg-emerald-50/60 shadow-sm text-emerald-950'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <Smartphone className="w-6 h-6 mb-2 text-emerald-600" />
                      <span className="font-bold text-sm">Revolut App</span>
                      <span className="text-[11px] text-slate-500 mt-1">Instant Revtag Pay</span>
                    </button>
                  </div>

                  {/* Payment Guide Box */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                    {selectedPayment === 'bank_transfer' && (
                      <div className="text-xs text-slate-700 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                          <Building2 className="w-4 h-4 text-emerald-600" />
                          <span>Bank Wire / Online Banking Transfer (UK &amp; Global)</span>
                        </div>
                        <p>
                          Account details (Barclays Sort Code &amp; Account Number, IBAN for international wires) and a unique Reference ID will be generated upon order completion and emailed via Zoho.
                        </p>
                      </div>
                    )}

                    {selectedPayment === 'crypto' && (
                      <div className="text-xs text-slate-700 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                          <Coins className="w-4 h-4 text-emerald-600" />
                          <span>Cryptocurrency Direct Transfer (USDT-TRC20, BTC, ETH)</span>
                        </div>
                        <p>
                          Verified direct wallet deposit addresses will be provided on screen and emailed to your inbox. You can reply with your TxHash for immediate order release.
                        </p>
                      </div>
                    )}

                    {selectedPayment === 'revolut' && (
                      <div className="text-xs text-slate-700 space-y-2">
                        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
                          <Smartphone className="w-4 h-4 text-emerald-600" />
                          <span>Revolut Instant In-App Payment</span>
                        </div>
                        <p>
                          Instant Revtag address (<strong>@retapharma</strong>) and reference code will be generated for instant in-app settlement without card processing fees.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column (Sticky Order Summary) */}
              <div className="lg:col-span-5 sticky top-24 space-y-6">
                
                <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                    <h3 className="text-xl font-bold text-slate-900">
                      Order Summary
                    </h3>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                      {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>

                  {/* Item List */}
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-1 mb-6">
                    {cart.map((item) => (
                      <div 
                        key={item.product.id} 
                        className="flex items-center gap-3.5 pb-4 border-b border-slate-100 last:border-0"
                      >
                        <div className="relative w-14 h-14 rounded-xl bg-slate-50 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                          <ProductImage
                            src={item.product.image}
                            alt={item.product.name}
                            fill
                            sizes="56px"
                            className="object-contain p-1"
                            fallbackCategory={item.product.category}
                          />
                        </div>

                        <div className="flex-grow min-w-0">
                          <h4 className="text-sm font-bold text-slate-900 truncate">
                            {item.product.name}
                          </h4>
                          <span className="text-xs text-slate-500 block">
                            £{item.product.price.toFixed(2)} each · {item.product.format}
                          </span>
                          
                          {/* Quantity adjustments */}
                          <div className="flex items-center gap-2 mt-1.5">
                            <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50 px-1 py-0.5">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 text-slate-600 hover:text-slate-900 transition"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="px-2 text-xs font-bold text-slate-800">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 text-slate-600 hover:text-slate-900 transition"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeFromCart(item.product.id)}
                              className="p-1 text-slate-400 hover:text-rose-600 transition"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="text-right flex-shrink-0 font-bold text-sm text-slate-900">
                          £{(item.product.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Calculations */}
                  <div className="space-y-3 pt-2 border-t border-slate-100 text-sm">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Products Subtotal:</span>
                      <span className="font-semibold text-slate-900">£{subtotal.toFixed(2)} GBP</span>
                    </div>

                    <div className="flex items-center justify-between text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-4 h-4 text-slate-400" />
                        <span>Shipping ({selectedShipping.name}):</span>
                      </div>
                      <span className="font-semibold text-slate-900">£{shippingFee.toFixed(2)} GBP</span>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-lg font-extrabold text-slate-900">
                      <span>Total Amount:</span>
                      <span className="text-emerald-600 text-2xl">£{grandTotal.toFixed(2)} GBP</span>
                    </div>
                  </div>

                  {/* Terms Checkbox */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <label className="flex items-start gap-3 cursor-pointer text-xs text-slate-600">
                      <input
                        type="checkbox"
                        required
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="mt-0.5 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>
                        I agree to the <Link href="/terms-of-use" target="_blank" className="underline font-semibold hover:text-slate-900">Terms of Use</Link>, understand that all products are supplied for research and analytical use, and verify my shipping details.
                      </span>
                    </label>
                  </div>

                  {/* Place Order CTA Button */}
                  <div className="mt-6">
                    <button
                      type="submit"
                      id="place-order-submit-btn"
                      disabled={!isMinOrderMet || isSubmitting}
                      className={`w-full py-4 rounded-2xl font-bold text-base transition-all shadow-md flex items-center justify-center gap-2 ${
                        !isMinOrderMet
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                          : isSubmitting
                          ? 'bg-emerald-700 text-white cursor-wait opacity-80'
                          : 'bg-emerald-600 hover:bg-emerald-700 text-white active:scale-[0.99]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                          <span>Processing Order via Zoho...</span>
                        </>
                      ) : !isMinOrderMet ? (
                        <span>£{MIN_ORDER_AMOUNT.toFixed(2)} Minimum Required</span>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5" />
                          <span>Place Order · £{grandTotal.toFixed(2)} GBP</span>
                        </>
                      )}
                    </button>

                    {!isMinOrderMet && (
                      <p className="text-center text-xs text-amber-700 mt-2.5 font-medium">
                        Add £{minOrderShortfall.toFixed(2)} more to reach the £100 minimum threshold.
                      </p>
                    )}
                  </div>

                  {/* Trust Signals */}
                  <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-2 gap-3 text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Instant Email Confirmation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Discreet Tracked Courier</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>COA &amp; Batch Traceable</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>Direct Support Available</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

          </form>
        )}

      </div>
    </div>
  );
}
