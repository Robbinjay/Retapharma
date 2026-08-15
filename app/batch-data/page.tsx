"use client";

import { useState } from 'react';
import { Search, FileText, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// Mock Batch Database
const batches = [
  {
    id: 'RET-10-2311',
    product: 'Retatrutide 10mg',
    date: '2023-11-10',
    purity: '99.4%',
    laboratory: 'Janus Analytics Labs',
    method: 'HPLC-UV / LC-MS',
    status: 'Verified',
  },
  {
    id: 'RET-5-2310',
    product: 'Retatrutide 5mg',
    date: '2023-10-25',
    purity: '99.2%',
    laboratory: 'Janus Analytics Labs',
    method: 'HPLC-UV / LC-MS',
    status: 'Verified',
  },
  {
    id: 'MT2-10-2309',
    product: 'Melanotan II (MT2) 10mg',
    date: '2023-09-15',
    purity: '99.8%',
    laboratory: 'Janus Analytics Labs',
    method: 'HPLC-UV / LC-MS',
    status: 'Verified',
  }
];

export default function BatchData() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredBatches = batches.filter(batch => 
    batch.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    batch.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <ShieldCheck className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Batch & Purity Data</h1>
          <p className="text-lg text-slate-300">
            Transparency is core to our philosophy. Search for your product&apos;s batch number to access specific analytical testing documentation, including HPLC purity reports and mass spectrometry data.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-12 -mt-24 relative z-10">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-grow w-full">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Search Batch Number or Product</label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. RET-10-2311 or Retatrutide"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
            <button className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors w-full md:w-auto h-[58px]">
              Search
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {filteredBatches.length > 0 ? (
            filteredBatches.map((batch) => (
              <div key={batch.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="bg-emerald-50 p-3 rounded-xl flex-shrink-0">
                    <FileText className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">{batch.product}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-600">
                      <span className="font-mono text-slate-900 font-medium">Batch: {batch.id}</span>
                      <span>Tested: {batch.date}</span>
                      <span>Method: {batch.method}</span>
                      <span>Lab: {batch.laboratory}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t border-slate-100 md:border-none pt-4 md:pt-0 mt-2 md:mt-0">
                  <div className="text-center">
                    <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">Purity</div>
                    <div className="text-xl font-bold text-emerald-600 flex items-center justify-center gap-1">
                      {batch.purity} <CheckCircle2 className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <button className="bg-slate-100 text-slate-900 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-slate-200 transition-colors">
                    <Download className="w-4 h-4" />
                    View COA
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <FileText className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-slate-900 mb-2">No batches found</h3>
              <p className="text-slate-500">Please check your batch number and try again.</p>
            </div>
          )}
        </div>
        
        <div className="mt-12 bg-slate-900 text-slate-300 rounded-2xl p-8 text-sm leading-relaxed">
          <h3 className="text-white font-bold text-lg mb-2">Understanding COAs</h3>
          <p className="mb-4">
            A Certificate of Analysis (COA) provides critical information regarding the identity and purity of a synthesized peptide. 
            <strong> HPLC (High-Performance Liquid Chromatography)</strong> determines the purity by separating the peptide from synthesis impurities (such as truncated sequences). 
            <strong> Mass Spectrometry (LC-MS)</strong> confirms the identity of the peptide by measuring its exact molecular mass, ensuring the correct amino acid sequence was synthesized.
          </p>
          <Link href="/laboratory-testing" className="text-emerald-400 hover:text-emerald-300 underline font-medium">
            Read our full guide to laboratory testing and reading COAs &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
