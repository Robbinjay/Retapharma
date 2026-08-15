import { Beaker, Search, Activity, FileCheck } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Peptide Laboratory Testing & COA Information | Reta Pharma',
  description: 'Understand how peptides are tested using HPLC and Mass Spectrometry, and learn how to interpret a Certificate of Analysis (COA).',
};

export default function LaboratoryTesting() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl mb-6">
            <Activity className="w-8 h-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Peptide Laboratory Testing</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A transparent guide to analytical testing methods, ensuring researchers have complete confidence in the integrity of their materials.
          </p>
        </div>

        <div className="space-y-12">
          {/* Section 1 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-4">
              <Beaker className="text-emerald-500 w-8 h-8" />
              High-Performance Liquid Chromatography (HPLC)
            </h2>
            <div className="prose prose-lg text-slate-700 max-w-none">
              <p>
                HPLC is the gold standard for determining the purity of synthesized peptides. During solid-phase peptide synthesis (SPPS), amino acids are added one by one. Occasionally, an amino acid might be missed (creating a deletion sequence) or added twice.
              </p>
              <p>
                HPLC separates the components of a sample based on their interactions with a stationary phase (the column) and a mobile phase (the solvent). 
              </p>
              <ul>
                <li>The main peptide peak represents the pure compound.</li>
                <li>Smaller surrounding peaks represent synthesis impurities.</li>
              </ul>
              <p>
                The area under the main peak relative to the total area of all peaks gives the purity percentage (e.g., 99.2%).
              </p>
            </div>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 flex items-center gap-4">
              <Search className="text-blue-500 w-8 h-8" />
              Mass Spectrometry (LC-MS)
            </h2>
            <div className="prose prose-lg text-slate-700 max-w-none">
              <p>
                While HPLC tells you <em>how pure</em> a sample is, it cannot definitively tell you <em>what</em> the substance is. That is the role of Mass Spectrometry.
              </p>
              <p>
                Mass Spectrometry measures the mass-to-charge ratio of ions. By ionizing the peptide, the instrument can determine the precise molecular weight of the compound in the main HPLC peak.
              </p>
              <p>
                If the measured molecular weight matches the theoretical molecular weight of the target sequence (e.g., Retatrutide), the identity of the peptide is confirmed. Without Mass Spec data, an HPLC report is essentially meaningless, as you could have a 99.9% pure sample of the wrong substance.
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 border border-slate-800 shadow-xl relative overflow-hidden">
            <div className="absolute right-0 top-0 opacity-10 p-8">
              <FileCheck className="w-48 h-48" />
            </div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Reading a Certificate of Analysis (COA)</h2>
              <div className="prose prose-lg prose-invert max-w-none">
                <p>
                  A genuine COA should contain both HPLC and MS data. When interpreting a Reta Pharma COA, look for:
                </p>
                <ol>
                  <li><strong>Batch Number:</strong> Must match the physical vial.</li>
                  <li><strong>Testing Date:</strong> Ensures the test is recent and relevant.</li>
                  <li><strong>Target Mass vs. Observed Mass:</strong> These should be nearly identical (within acceptable instrument variance, usually ±1.0 Da).</li>
                  <li><strong>Purity Area %:</strong> We target &gt;99% purity for all research peptides.</li>
                </ol>
                <div className="mt-8 pt-8 border-t border-slate-800">
                  <Link href="/batch-data" className="inline-flex items-center justify-center bg-white text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-slate-100 transition-colors">
                    Access Batch Data Portal
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
