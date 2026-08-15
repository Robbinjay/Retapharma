'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle2, 
  Copy, 
  Check, 
  Building2, 
  Coins, 
  Smartphone, 
  Printer, 
  ShoppingBag, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  Truck
} from 'lucide-react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const queryOrderId = searchParams?.get('orderId');
  const [orderData] = useState<any>(() => {
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem('retapharma_last_order');
        if (stored) {
          return JSON.parse(stored);
        }
      } catch (e) {
        console.error('Failed to load order from session storage', e);
      }
    }
    return null;
  });
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const orderId = queryOrderId || orderData?.orderId || 'RP-CONFIRMED';
  const customer = orderData?.customer || {
    fullName: 'Valued Client',
    email: 'Your email',
    address: 'Provided address',
    city: '',
    postalCode: '',
    country: 'UK',
  };
  const items = orderData?.items || [];
  const paymentMethod = orderData?.paymentMethod || 'bank_transfer';
  const total = orderData?.grandTotal || orderData?.total || 0;
  const shippingFee = orderData?.shippingFee || 15;
  const subtotal = orderData?.subtotal || (total - shippingFee);
  const shippingOption = orderData?.shippingOption || { name: 'Normal Shipping' };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Top Success Banner */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center mb-8 shadow-sm">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-1 block">
            Order Successfully Placed
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">
            Thank You For Your Order!
          </h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto mb-6">
            Your order has been registered and reserved in our laboratory inventory. A formal confirmation and invoice has been dispatched to your email via Zoho Mail.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center gap-3 bg-slate-50 border border-slate-200 rounded-2xl px-6 py-3">
            <div className="text-left">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Assigned Order Reference ID
              </span>
              <span className="text-lg font-mono font-extrabold text-slate-900">
                {orderId}
              </span>
            </div>
            <button
              onClick={() => copyToClipboard(orderId, 'orderId')}
              className="inline-flex items-center gap-1.5 bg-white border border-slate-300 text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg text-xs font-bold transition shadow-xs"
            >
              {copiedKey === 'orderId' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'orderId' ? 'Copied' : 'Copy ID'}</span>
            </button>
          </div>

          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span>Confirmation sent to <strong>{customer.email}</strong></span>
          </div>
        </div>

        {/* Payment Instructions Card */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 mb-8 shadow-xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              {paymentMethod === 'bank_transfer' && <Building2 className="w-6 h-6 text-emerald-400" />}
              {paymentMethod === 'crypto' && <Coins className="w-6 h-6 text-emerald-400" />}
              {paymentMethod === 'revolut' && <Smartphone className="w-6 h-6 text-emerald-400" />}
              <div>
                <h2 className="text-xl font-bold">
                  {paymentMethod === 'bank_transfer' && 'Bank Transfer Payment Details'}
                  {paymentMethod === 'crypto' && 'Cryptocurrency Deposit Details'}
                  {paymentMethod === 'revolut' && 'Revolut App Settlement Instructions'}
                </h2>
                <p className="text-xs text-slate-400">
                  Please complete payment using the details below for prompt order dispatch
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Total Due</span>
              <span className="text-2xl font-bold text-emerald-400 font-mono">
                £{total.toFixed(2)} GBP
              </span>
            </div>
          </div>

          {/* Bank Transfer Details */}
          {paymentMethod === 'bank_transfer' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-slate-800/80 p-5 rounded-2xl border border-slate-700">
                <div>
                  <span className="text-xs text-slate-400 block">Bank Name</span>
                  <span className="font-semibold text-white">Barclays Bank UK PLC</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Account Name</span>
                  <span className="font-semibold text-white">RetaPharma UK Ltd</span>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Sort Code</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-base">20-04-15</span>
                    <button onClick={() => copyToClipboard('20-04-15', 'sortCode')} className="text-slate-400 hover:text-white">
                      {copiedKey === 'sortCode' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <span className="text-xs text-slate-400 block">Account Number</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-base">83920194</span>
                    <button onClick={() => copyToClipboard('83920194', 'accNum')} className="text-slate-400 hover:text-white">
                      {copiedKey === 'accNum' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
                <div className="sm:col-span-2 pt-2 border-t border-slate-700">
                  <span className="text-xs text-slate-400 block">IBAN (International Transfers)</span>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm text-slate-200">GB29BARC20041583920194</span>
                    <button onClick={() => copyToClipboard('GB29BARC20041583920194', 'iban')} className="text-slate-400 hover:text-white text-xs inline-flex items-center gap-1">
                      {copiedKey === 'iban' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy IBAN</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-200">
                  <strong className="text-emerald-300 block text-sm mb-0.5">Important Payment Reference:</strong>
                  Please enter <code className="bg-emerald-900/80 px-2 py-0.5 rounded font-mono font-bold text-white">{orderId}</code> in the reference/memo box when transferring funds.
                </div>
              </div>
            </div>
          )}

          {/* Crypto Details */}
          {paymentMethod === 'crypto' && (
            <div className="space-y-4">
              <div className="space-y-3 bg-slate-800/80 p-5 rounded-2xl border border-slate-700 text-xs">
                <div>
                  <span className="text-slate-400 font-bold block mb-1">USDT (TRC-20 Network):</span>
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-700">
                    <code className="font-mono text-slate-200 break-all">TYh8Lp2WqZ99xM1N88KvB312RtQ9w4XyzP</code>
                    <button onClick={() => copyToClipboard('TYh8Lp2WqZ99xM1N88KvB312RtQ9w4XyzP', 'usdt')} className="text-emerald-400 hover:text-white px-2">
                      {copiedKey === 'usdt' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block mb-1">Bitcoin (BTC):</span>
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-700">
                    <code className="font-mono text-slate-200 break-all">bc1q9v8k3f4x7z2j5w8m1n0r4t6y9u2p5s8d1f4g7</code>
                    <button onClick={() => copyToClipboard('bc1q9v8k3f4x7z2j5w8m1n0r4t6y9u2p5s8d1f4g7', 'btc')} className="text-emerald-400 hover:text-white px-2">
                      {copiedKey === 'btc' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 font-bold block mb-1">Ethereum (ETH / ERC-20):</span>
                  <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-xl border border-slate-700">
                    <code className="font-mono text-slate-200 break-all">0x71C94B4E38A3F1d7b36B7963A0F81f1De8167812</code>
                    <button onClick={() => copyToClipboard('0x71C94B4E38A3F1d7b36B7963A0F81f1De8167812', 'eth')} className="text-emerald-400 hover:text-white px-2">
                      {copiedKey === 'eth' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 text-xs text-emerald-200">
                After broadcasting your transaction, reply to your confirmation email or contact support with your Transaction Hash (TxID) and Order ID <strong className="text-white font-mono">{orderId}</strong>.
              </div>
            </div>
          )}

          {/* Revolut Details */}
          {paymentMethod === 'revolut' && (
            <div className="space-y-4">
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Revolut Revtag:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-lg">@retapharma</span>
                    <button onClick={() => copyToClipboard('@retapharma', 'revtag')} className="text-slate-400 hover:text-white">
                      {copiedKey === 'revtag' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Account Name:</span>
                  <span className="font-semibold text-white">RetaPharma Ltd</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Transfer Note / Reference:</span>
                  <span className="font-mono font-bold text-emerald-400">{orderId}</span>
                </div>
              </div>

              <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-2xl p-4 text-xs text-emerald-200">
                Open your Revolut app, navigate to Transfer, search for <strong>@retapharma</strong>, enter £{total.toFixed(2)} and make sure to include <strong>{orderId}</strong> in the note.
              </div>
            </div>
          )}
        </div>

        {/* Itemized Order Receipt Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
            <h3 className="text-xl font-bold text-slate-900">
              Receipt &amp; Dispatch Details
            </h3>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 px-3.5 py-2 rounded-xl transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Receipt</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 text-sm">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                <Truck className="w-4 h-4 text-emerald-600" />
                <span>Shipping Address</span>
              </div>
              <p className="text-slate-700">{customer.fullName}</p>
              <p className="text-slate-600">{customer.address}{customer.apartment ? `, ${customer.apartment}` : ''}</p>
              <p className="text-slate-600">{customer.city} {customer.postalCode}</p>
              <p className="text-slate-600">{customer.country}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-2 font-bold text-slate-900 mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Order Specifications</span>
              </div>
              <p className="text-slate-600">Shipping: <strong>{shippingOption?.name || 'Tracked Shipping'}</strong></p>
              <p className="text-slate-600">Payment: <strong>{paymentMethod.replace('_', ' ').toUpperCase()}</strong></p>
              <p className="text-slate-600">Status: <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-bold">Awaiting Settlement</span></p>
            </div>
          </div>

          {/* Items Table */}
          {items.length > 0 && (
            <div className="mb-6">
              <h4 className="font-bold text-slate-900 text-sm mb-3">Ordered Items</h4>
              <div className="border border-slate-200 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500">
                    <tr>
                      <th className="p-3.5">Product</th>
                      <th className="p-3.5 text-center">Qty</th>
                      <th className="p-3.5 text-right">Price</th>
                      <th className="p-3.5 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {items.map((item: any, idx: number) => (
                      <tr key={idx}>
                        <td className="p-3.5 font-semibold text-slate-900">
                          {item.product?.name || item.name}
                        </td>
                        <td className="p-3.5 text-center text-slate-600">
                          {item.quantity}
                        </td>
                        <td className="p-3.5 text-right text-slate-600">
                          £{(item.product?.price || item.price).toFixed(2)}
                        </td>
                        <td className="p-3.5 text-right font-bold text-slate-900">
                          £{((item.product?.price || item.price) * item.quantity).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Pricing Totals */}
          <div className="ml-auto max-w-xs space-y-2 text-sm pt-4 border-t border-slate-100">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-900">£{subtotal.toFixed(2)} GBP</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Shipping Fee:</span>
              <span className="font-semibold text-slate-900">£{shippingFee.toFixed(2)} GBP</span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-slate-900 pt-2 border-t border-slate-200">
              <span>Total Amount:</span>
              <span className="text-emerald-600 text-xl">£{total.toFixed(2)} GBP</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/shop"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-slate-800 transition shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Return to Shop</span>
          </Link>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-800 border border-slate-300 font-bold px-8 py-3.5 rounded-xl hover:bg-slate-50 transition shadow-xs"
          >
            <span>Contact Support</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-600"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
