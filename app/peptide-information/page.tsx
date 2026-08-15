import Link from 'next/link';
import { BookOpen, Thermometer, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Peptide Information & Education Hub | Reta Pharma',
  description: 'Comprehensive educational resources on peptide science, stability, storage principles, and analytical testing methodologies.',
};

export default function PeptideInfo() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Peptide Education Hub</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Scientific resources and best practices for peptide handling, storage, and research methodology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">What are Peptides?</h3>
            <p className="text-slate-600 mb-6 line-clamp-3">
              Peptides are short chains of amino acids linked by peptide bonds. They are smaller than proteins (typically under 50 amino acids) and play crucial signaling roles in biological systems.
            </p>
            <div className="text-emerald-600 font-medium">Read Article &rarr;</div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center mb-6">
              <Thermometer className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Storage Principles</h3>
            <p className="text-slate-600 mb-6 line-clamp-3">
              Understanding how temperature, light, and reconstitution media affect peptide stability. Learn the optimal conditions for lyophilized and liquid states to prevent degradation.
            </p>
            <div className="text-emerald-600 font-medium">Read Article &rarr;</div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Peptide Purity</h3>
            <p className="text-slate-600 mb-6 line-clamp-3">
              What does &ldquo;99% purity&rdquo; actually mean? Explore synthesis impurities, the difference between net peptide content and HPLC purity, and why trace elements matter.
            </p>
            <div className="text-emerald-600 font-medium">Read Article &rarr;</div>
          </div>
        </div>

        <div className="mt-16 bg-slate-900 rounded-3xl p-8 md:p-12 text-center border border-slate-800">
          <h2 className="text-3xl font-bold text-white mb-4">Laboratory Testing Guide</h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Deep dive into the analytical methods used to verify peptide identity and purity. Understand how to interpret HPLC and Mass Spectrometry data correctly.
          </p>
          <Link href="/laboratory-testing" className="inline-block bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors">
            Explore Laboratory Testing
          </Link>
        </div>
      </div>
    </div>
  );
}
