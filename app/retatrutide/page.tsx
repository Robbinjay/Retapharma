import Image from 'next/image';
import Link from 'next/link';
import { Beaker, BookOpen, FileText, Activity } from 'lucide-react';

export const metadata = {
  title: 'Retatrutide | Research, Information & Laboratory Data | Reta Pharma',
  description: 'Comprehensive information on Retatrutide, an investigational triple hormone receptor agonist. Learn about its mechanism, research status, and laboratory testing.',
};

export default function RetatrutideHub() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero */}
      <div className="bg-slate-900 text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://picsum.photos/seed/reta-hero/1920/600"
            alt="Laboratory"
            fill
            priority
            className="object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-emerald-400 font-bold tracking-wider uppercase text-sm mb-4 block">Peptide Education Hub</span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">Retatrutide Research Information</h1>
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              Explore the science behind retatrutide, an investigational triple receptor agonist. We provide transparent information and high-purity materials for analytical testing.
            </p>
            <div className="flex gap-4">
              <Link href="/shop/retatrutide-10mg" className="bg-emerald-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-emerald-700 transition-colors">
                View Retatrutide Products
              </Link>
              <Link href="#research" className="bg-white/10 text-white border border-white/20 px-6 py-3 rounded-md font-semibold hover:bg-white/20 transition-colors">
                Read the Science
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            <div className="prose prose-lg text-slate-700 max-w-none prose-headings:text-slate-900 prose-a:text-emerald-600">
              <h2 id="research">What Is Retatrutide?</h2>
              <p>
                Retatrutide (LY3437943) is an investigational peptide developed for scientific research. It is classified as a triple hormone receptor agonist, meaning it is designed to simultaneously activate three specific cellular receptors:
              </p>
              <ul>
                <li><strong>GLP-1</strong> (Glucagon-like peptide-1)</li>
                <li><strong>GIP</strong> (Glucose-dependent insulinotropic polypeptide)</li>
                <li><strong>Glucagon</strong></li>
              </ul>
              <p>
                Unlike earlier compounds that target only one (e.g., semaglutide) or two (e.g., tirzepatide) of these receptors, retatrutide&apos;s unique structure allows it to interact with all three. This makes it a subject of intense scientific interest for researchers studying metabolic pathways and energy homeostasis.
              </p>

              <h2>Scientific Classification & Structure</h2>
              <p>
                Retatrutide is a synthetic peptide based on the GIP sequence but modified to include agonist activity at both the GLP-1 and glucagon receptors. It contains an acyl chain that extends its half-life in laboratory models. 
              </p>

              <h2>Current Research Status</h2>
              <p>
                Retatrutide is currently undergoing clinical trials by its original developer. <strong>It is not an approved medical treatment in the UK or elsewhere.</strong>
              </p>
              <p>
                The materials provided by Reta Pharma are available for research and human consumption, or therapeutic use. Researchers and clients utilize our high-purity lyophilized retatrutide to study receptor binding affinities, cellular signaling cascades, and peptide stability.
              </p>

              <h2>Laboratory Testing and Purity</h2>
              <p>
                When conducting research, the purity of the peptide is critical. Impurities can alter experimental outcomes or cause unintended reactions in <em>in-vitro</em> assays.
              </p>
              <p>
                Reta Pharma ensures that all retatrutide batches undergo rigorous analytical testing, including:
              </p>
              <ul>
                <li><strong>HPLC (High-Performance Liquid Chromatography):</strong> To determine the purity percentage by separating the components of the mixture.</li>
                <li><strong>Mass Spectrometry:</strong> To verify the molecular weight and confirm the identity of the peptide.</li>
              </ul>
              <p>
                Researchers can access batch-specific Certificates of Analysis (COAs) via our <Link href="/batch-data">Batch Data</Link> portal.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Related Topics</h3>
              <ul className="space-y-4">
                <li>
                  <Link href="/peptide-information" className="flex items-start gap-3 group">
                    <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">Peptide Education</div>
                      <div className="text-sm text-slate-500">Learn the basics of peptides</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/laboratory-testing" className="flex items-start gap-3 group">
                    <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">Analytical Testing</div>
                      <div className="text-sm text-slate-500">Understanding HPLC and MS</div>
                    </div>
                  </Link>
                </li>
                <li>
                  <Link href="/batch-data" className="flex items-start gap-3 group">
                    <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-emerald-100 group-hover:text-emerald-600 transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">Batch Documentation</div>
                      <div className="text-sm text-slate-500">View purity reports</div>
                    </div>
                  </Link>
                </li>
              </ul>

              <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-100 text-center">
                <Beaker className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-bold text-slate-900 mb-2">Need Materials?</h4>
                <p className="text-sm text-slate-600 mb-4">View our catalogue of high-purity retatrutide for laboratory research.</p>
                <Link href="/shop" className="block w-full bg-slate-900 text-white text-center py-2 rounded-md font-medium hover:bg-slate-800 transition-colors">
                  Shop Retatrutide
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
