import ProductImage from '@/components/ui/product-image';
import Link from 'next/link';

export const metadata = {
  title: 'MT2 (Melanotan II) | Research & Peptide Sales | Reta Pharma',
  description: 'Research Melanotan II (MT2) synthetic cyclic heptapeptide analog. High purity MT2 for laboratory testing.',
};

export default function MT2Page() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-16 border border-slate-200 shadow-sm">
          <div className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">Peptide Profile</div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Melanotan II (MT2)</h1>
          
          <div className="prose prose-lg text-slate-700 max-w-none prose-headings:text-slate-900">
            <p className="lead text-xl text-slate-600 mb-8 border-b border-slate-100 pb-8">
              Melanotan II (MT2) is a synthetic cyclic heptapeptide analog of the naturally occurring alpha-melanocyte-stimulating hormone (a-MSH). It is supplied by Reta Pharma strictly for laboratory research use.
            </p>
            
            <h2>What is MT2?</h2>
            <p>
              Developed initially at the University of Arizona, Melanotan II is structurally similar to alpha-MSH, a hormone involved in melanogenesis (the production of melanin). In laboratory settings, MT2 acts as a non-selective agonist of the melanocortin receptors (MC1, MC3, MC4, and MC5).
            </p>
            
            <h2>Research Applications</h2>
            <p>
              In <em>in-vitro</em> and <em>in-vivo</em> animal models, MT2 is utilized by researchers investigating:
            </p>
            <ul>
              <li>Melanocortin receptor binding affinities</li>
              <li>Pathways related to melanogenesis and pigmentation</li>
              <li>Energy homeostasis and feeding behavior (via MC4 receptor interactions)</li>
              <li>Sexual arousal mechanisms in laboratory models</li>
            </ul>

            <h2>Safety & Regulatory Information</h2>
            <p>
              <strong>Important:</strong> Melanotan II is not an approved medicine. It has not been approved by regulatory bodies (such as the MHRA in the UK or the FDA in the US) for human use. 
            </p>
            <p>
              Reta Pharma supplies high-purity MT2 for research and human consumption, or therapeutic use.
            </p>

            <div className="mt-12 pt-8 border-t border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Available MT2 Materials</h3>
              <div className="space-y-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 bg-white rounded-xl border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                      <ProductImage
                        src="/products/melanotan-mt2-10mg.png"
                        alt="Melanotan MT-2 10mg"
                        fill
                        className="object-contain p-1"
                        fallbackCategory="MT2"
                      />
                    </div>
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Category: MT2</span>
                      <h4 className="font-bold text-slate-900 text-lg">Melanotan MT-2 10mg</h4>
                      <p className="text-sm text-slate-600">Lyophilised Research Peptide Vial. High Purity.</p>
                      <p className="text-base font-bold text-slate-900 mt-1">£45.00 GBP</p>
                    </div>
                  </div>
                  <Link href="/shop/melanotan-mt2-10mg" className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-colors w-full md:w-auto text-center shadow-sm">
                    View Product &amp; Order
                  </Link>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 bg-white rounded-xl border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                      <ProductImage
                        src="/products/melanotan-ii-mt2-10mg.png"
                        alt="Melanotan II (MT2) 10mg"
                        fill
                        className="object-contain p-1"
                        fallbackCategory="Peptides"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">Melanotan II (MT2) 10mg</h4>
                      <p className="text-sm text-slate-600">Lyophilized Powder. HPLC Tested.</p>
                      <p className="text-base font-bold text-slate-900 mt-1">£22.95 GBP</p>
                    </div>
                  </div>
                  <Link href="/shop/melanotan-ii-mt2-10mg" className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors w-full md:w-auto text-center shadow-sm">
                    View Product
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
