import Link from 'next/link';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div id="not-found-page" className="min-h-[70vh] flex items-center justify-center bg-slate-50 px-4">
      <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
        <h2 className="text-xl font-semibold text-slate-800 mb-3">Page Not Found</h2>
        <p className="text-slate-600 mb-6 text-sm">
          The requested research page or resource could not be found. Please verify the URL or return to the main catalog.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            id="not-found-home-btn"
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Return Home
          </Link>
          <Link
            id="not-found-shop-btn"
            href="/shop"
            className="inline-flex items-center justify-center gap-2 border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
