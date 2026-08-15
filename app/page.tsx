import type { Metadata } from 'next';
import Hero from '@/components/ui/hero';
import { getFeaturedProducts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ShieldCheck, 
  FileText, 
  Search, 
  Headset, 
  Beaker, 
  CheckCircle2, 
  Truck, 
  Snowflake, 
  FileCheck2, 
  HelpCircle, 
  Layers, 
  AlertTriangle,
  ArrowRight,
  Clock,
  ExternalLink,
  Lock,
  Building2,
  Activity,
  Check
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Buy Retatrutide UK & MT2 | Lab-Tested, COA Verified',
  description: 'Buy retatrutide UK with third-party COA, plus MT2 research peptides. 99%+ HPLC purity, cold-chain stored, same-day UK dispatch. Research use only.',
};

export default function Home() {
  const featuredProducts = getFeaturedProducts(15);

  return (
    <div className="w-full">
      {/* Dynamic Image Hero Slider */}
      <Hero />
      
      {/* 1. H1 Intro Section: Buy Retatrutide & MT2 in the UK */}
      <section id="introduction-section" className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>UK Reference Standards & Analytical Documentation</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
              Buy Retatrutide &amp; MT2 in the UK — Verified Purity Documentation, Full Batch Records, Fast UK Dispatch
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mt-4 text-slate-700 leading-relaxed">
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <p className="text-base">
                  If you are researching where to buy retatrutide UK-side, the deciding factor should be <span className="font-semibold text-slate-900">evidence rather than price</span>. RetaPharma is built around transparency: clear product specifications, batch documentation available for review, and defined quality control before anything reaches our catalogue.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <p className="text-base">
                  We publish what we know and stay candid about what remains unestablished. Our team includes professionals with laboratory experience, so technical questions about storage, handling or documentation receive specific answers rather than scripted replies. Ordering is secure, straightforward and free of pressure tactics — you review the information, then decide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. H2: Why Researchers Trust RetaPharma (Trust Bar / Pillars) */}
      <section id="trust-pillars-section" className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-3">
              Why Researchers Trust RetaPharma
            </h2>
            <p className="text-slate-400 text-base">
              A commitment to analytical rigor, lot-traceable verification, and domestic UK distribution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl flex flex-col hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Verified Product Documentation</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Laboratory analysis accompanies our products, so purity and identity information is available to review rather than simply asserted.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl flex flex-col hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Batch-Specific Information</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Each vial carries a lot number that corresponds to its own documentation. No generic reports, no ambiguity about which batch you received.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl flex flex-col hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Beaker className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Quality-Focused Sourcing</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                We work with established synthesis partners and apply defined acceptance criteria before any batch is listed for sale.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl flex flex-col hover:border-emerald-500/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">UK-Based Dispatch</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Stock is held and shipped from the United Kingdom — no customs delays, no import paperwork, no unexplained waiting.
              </p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-6 rounded-xl flex flex-col hover:border-emerald-500/50 transition-colors sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Fast UK Dispatch</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Orders are processed promptly on working days and sent tracked, in plain, discreet packaging as standard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Catalog Grid (12 Items) */}
      <section id="featured-products-section" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
                Pure Analytical Reference Materials
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">
                Featured Research Materials
              </h2>
              <p className="text-base text-slate-600 mt-2 max-w-2xl">
                High-purity peptides for research and human consumption, or therapeutic use.
              </p>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
            >
              <span>Explore All Catalog Products</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                id={`product-card-${product.slug}`}
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg hover:border-slate-300 transition-all duration-200 flex flex-col h-full"
              >
                <div className="relative h-52 w-full bg-slate-50/70 border-b border-slate-100 overflow-hidden flex items-center justify-center p-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs border border-slate-200 text-slate-700 text-xs font-medium px-2 py-0.5 rounded">
                    {product.category}
                  </div>
                </div>

                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-slate-900 mb-1.5 line-clamp-1">{product.name}</h3>
                  <p className="text-slate-600 mb-4 text-xs leading-relaxed line-clamp-2">{product.shortDescription}</p>
                  
                  <div className="space-y-1.5 mb-5 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{product.format}</span>
                    </div>
                    {product.batchDataAvailable && (
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Batch COA Documentation Available</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                    <div>
                      <span className="text-xs text-slate-500 block">From</span>
                      <span className="text-lg font-bold text-slate-900">£{product.price.toFixed(2)}</span>
                    </div>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="bg-slate-900 text-white px-3.5 py-1.5 rounded text-xs font-semibold hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>View Specifications</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-slate-800 transition-colors shadow-sm"
            >
              <span>VIEW ALL PRODUCTS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. H2: Why Choose RetaPharma? (Detailed Capabilities) */}
      <section id="why-choose-retapharma-section" className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 mb-2">
              Operational Standards
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Why Choose RetaPharma?
            </h2>
            <p className="text-base text-slate-700 leading-relaxed">
              If you are researching where to buy retatrutide UK-side, the deciding factor should be evidence rather than price. RetaPharma is built around transparency: clear product specifications, batch documentation available for review, and defined quality control before anything reaches our catalogue. We publish what we know and stay candid about what remains unestablished. Our team includes people with laboratory experience, so technical questions about storage, handling or documentation receive specific answers rather than scripted replies. Ordering is secure, straightforward and free of pressure tactics — you review the information, then decide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* H3: Cold-Chain Handling */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6">
                  <Snowflake className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Cold-Chain Handling That Protects Molecular Integrity
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Retatrutide is a 39-amino-acid peptide with a C20 fatty-diacid acylation designed for albumin binding, and MT2 is a cyclic heptapeptide. Both are sensitive to heat, light and moisture.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Our stock sits at <strong className="text-slate-900 font-semibold">−20°C from arrival to dispatch</strong>, then travels in insulated packaging with gel packs on short tracked transit windows. A peptide that was mishandled in a warehouse in July will not perform in your assay in August, no matter what the label says.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-blue-700">
                <Check className="w-4 h-4" />
                <span>Continuous −20°C climate-controlled storage</span>
              </div>
            </div>

            {/* H3: Fast, Discreet UK Fulfilment */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-6">
                  <Truck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Fast, Discreet UK Fulfilment
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Same-day dispatch on working-day orders confirmed before 3pm. Tracked UK delivery typically 24 to 48 hours, with a next-day upgrade available at checkout.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Packaging is plain and unbranded, with no external reference to contents. International routes are available to destinations where lawful import of research materials is permitted.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-emerald-700">
                <Check className="w-4 h-4" />
                <span>Same-day dispatch before 3pm (Mon–Fri)</span>
              </div>
            </div>

            {/* H3: Documentation That Passes an Audit */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-6">
                  <FileCheck2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Documentation That Passes an Audit
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Every order ships with a batch-referenced certificate of analysis, a dated VAT invoice and a materials declaration confirming research-use-only status.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  If your institution runs procurement reviews or your funder asks for provenance, the paperwork is already in the box and linked within your customer account.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-amber-800">
                <Check className="w-4 h-4" />
                <span>COA, VAT invoice &amp; RUO declaration included</span>
              </div>
            </div>

            {/* H3: Technical Support From Bench Experience */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:border-slate-300 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center mb-6">
                  <Headset className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Expert Support &amp; Professional Dosage Guidance
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Questions regarding storage temperatures, reconstitution, dosage protocols, chromatogram interpretation, or batch history reach experienced specialists with clinical and laboratory backgrounds.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Receive clear, personalized assistance and tailored dosage advice to ensure safe, effective, and well-informed application for your specific requirements.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center gap-2 text-xs font-semibold text-indigo-700">
                <Check className="w-4 h-4" />
                <span>Professional dosage guidance &amp; dedicated expert support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. H2: Retatrutide (LY3437943) — What the Published Science Actually Says */}
      <section id="retatrutide-science-section" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Scientific Literature Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-semibold">
                <span>Investigational Molecule Deep Dive</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                Retatrutide (LY3437943) — What the Published Science Actually Says
              </h2>

              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 leading-relaxed">
                <p>
                  Retatrutide attracts attention for a legitimate structural reason: it is the first peptide to engage three class-B G-protein-coupled receptors at once — the <strong>GLP-1 receptor</strong>, the <strong>GIP receptor</strong> and the <strong>glucagon receptor</strong>. Earlier incretin research explored single-receptor and then dual-receptor agonism. Retatrutide asks what happens when glucagon-receptor activity is layered onto a GIP-backbone peptide, and the trial literature suggests the answer is substantial.
                </p>

                <p>
                  In the phase 2 obesity programme published in <em>The New England Journal of Medicine</em>, retatrutide achieved mean weight reduction of up to 17.5% at 24 weeks, with a secondary endpoint reaching up to 24.2% at 48 weeks (Eli Lilly). A separate phase 2 study in type 2 diabetes examined HbA1c alongside body-weight change, and a phase 2a substudy looked at hepatic fat in MASLD. A 2026 peer-reviewed review characterises the molecule as an example of rational multi-agonist peptide engineering and a potential turning point in metabolic pharmacology (PubMed).
                </p>
              </div>

              {/* H3: Common In-Vitro Research Applications */}
              <div className="pt-4">
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-emerald-600" />
                  <span>Common In-Vitro Research Applications</span>
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed mb-4">
                  Within appropriately governed laboratory settings, retatrutide reference material supports:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>Receptor-binding &amp; cAMP-accumulation assays across all 3 receptors</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>Comparative potency work against single- and dual-agonist peptides</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>Analytical method development and HPLC/MS assay validation</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-slate-200 text-xs font-medium text-slate-800 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>Stability, thermal degradation profiling &amp; acylation structural studies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Retatrutide Product Specifications Table */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
                <div className="bg-slate-900 text-white p-5 border-b border-slate-800">
                  <div className="text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-1">Technical Datasheet</div>
                  <h3 className="text-xl font-bold">Retatrutide Product Specifications</h3>
                </div>
                
                <div className="divide-y divide-slate-100 text-sm">
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Compound</span>
                    <span className="col-span-2 text-slate-900 font-medium">Retatrutide (LY3437943)</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Sequence length</span>
                    <span className="col-span-2 text-slate-900">39 amino acids</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Receptor targets</span>
                    <span className="col-span-2 text-slate-900">GLP-1, GIP, glucagon</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Physical form</span>
                    <span className="col-span-2 text-slate-900">Lyophilised white powder</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Purity</span>
                    <span className="col-span-2 font-bold text-emerald-700">≥99% by RP-HPLC</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Identity</span>
                    <span className="col-span-2 text-slate-900">Mass spectrometry confirmed</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Presentation</span>
                    <span className="col-span-2 text-slate-900">Sealed, batch-numbered glass vial</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Storage</span>
                    <span className="col-span-2 text-slate-900">−20°C, protected from light</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors bg-emerald-50/50">
                    <span className="font-semibold text-emerald-900">Included</span>
                    <span className="col-span-2 text-emerald-900 font-medium">Third-party certificate of analysis</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200">
                  <Link
                    href="/shop/retatrutide-10mg"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm text-center block transition-colors shadow-xs"
                  >
                    View Retatrutide Vials &amp; COA
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. H2: Retatrutide UK Buy Guide — Five Checks Before You Order Anywhere */}
      <section id="retatrutide-buy-guide-section" className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-slate-100 text-slate-800 text-xs font-semibold mb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Procurement Due Diligence</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              Retatrutide UK Buy Guide — Five Checks Before You Order Anywhere
            </h2>
            <p className="text-slate-600 text-base">
              Use this whether you buy retatrutide from us or from anyone else. It is the fastest way to separate a real supplier from a reseller with a nice logo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {/* Check 1 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl relative flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center mb-4">
                  1
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Does the certificate carry a batch number that matches the vial?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A generic PDF headed &quot;Retatrutide 99%&quot; with no lot reference proves nothing about the specific vial being shipped to you.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>RetaPharma: Vial lot = COA lot match</span>
              </div>
            </div>

            {/* Check 2 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl relative flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center mb-4">
                  2
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Who performed the analysis?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  An in-house report is a self-assessment. An independent laboratory letterhead with verifiable contact details is evidence.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>RetaPharma: Independent 3rd-party lab analysis</span>
              </div>
            </div>

            {/* Check 3 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl relative flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center mb-4">
                  3
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Is there an actual chromatogram?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  A purity percentage with no HPLC trace cannot be checked. The trace should show a dominant single peak with impurities quantified.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>RetaPharma: Full UV-absorption HPLC traces published</span>
              </div>
            </div>

            {/* Check 4 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl relative flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center mb-4">
                  4
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Is identity confirmed separately from purity?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  HPLC measures how pure the sample is. Mass spectrometry confirms the molecule is what the label claims. A 99% pure sample of the wrong peptide is still the wrong peptide.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>RetaPharma: Dual HPLC + Mass Spectrometry</span>
              </div>
            </div>

            {/* Check 5 */}
            <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl relative flex flex-col justify-between md:col-span-2 lg:col-span-1">
              <div>
                <div className="w-8 h-8 rounded-full bg-slate-900 text-white font-bold text-sm flex items-center justify-center mb-4">
                  5
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Is storage and transit temperature stated?
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Ambient-shipped lyophilised peptide in a UK summer is a gamble. Ask, and treat a vague answer as an answer.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs font-medium text-emerald-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>RetaPharma: Continuous −20°C + insulated transit</span>
              </div>
            </div>
          </div>

          {/* Verification Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-emerald-950">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
              <p className="text-sm font-medium">
                <strong>RetaPharma satisfies all five before you reach the basket.</strong> Every product page links the current batch COA, the chromatogram and the storage conditions.
              </p>
            </div>
            <Link
              href="/batch-data"
              className="shrink-0 bg-emerald-700 text-white px-4 py-2 rounded-md text-xs font-bold hover:bg-emerald-800 transition-colors"
            >
              Verify Batch Library
            </Link>
          </div>
        </div>
      </section>

      {/* 6. H2: MT2 (Melanotan II) — A Melanocortin Research Reference Standard */}
      <section id="mt2-standard-section" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-200 text-slate-800 text-xs font-semibold">
                <span>Reference Peptide Profile</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                MT2 (Melanotan II) — A Melanocortin Research Reference Standard
              </h2>

              <div className="prose prose-slate max-w-none text-slate-700 space-y-4 leading-relaxed">
                <p>
                  MT2 is a synthetic cyclic analogue of alpha-melanocyte-stimulating hormone. Its research value comes from non-selective agonism across melanocortin receptor subtypes, which makes it a standard comparator in pigmentation biology, appetite-signalling research and melanocortin-pathway pharmacology. Because it engages several subtypes rather than one, researchers frequently use MT2 alongside selective analogues to attribute specific downstream effects to specific receptors.
                </p>
              </div>

              {/* H3: MT2 Research Applications */}
              <div className="pt-2">
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  MT2 Research Applications
                </h3>
                <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed">
                  Melanocortin receptor binding and selectivity profiling; melanogenesis assays in cultured melanocyte lines; structure–activity comparison against selective analogues; peptide cyclisation and stability research; and reference-standard use in analytical method development.
                </div>
              </div>
            </div>

            {/* Right: MT2 Product Specifications Table */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden sticky top-24">
                <div className="bg-slate-900 text-white p-5 border-b border-slate-800">
                  <div className="text-xs uppercase tracking-wider font-semibold text-emerald-400 mb-1">Analytical Datasheet</div>
                  <h3 className="text-xl font-bold">MT2 Product Specifications</h3>
                </div>
                
                <div className="divide-y divide-slate-100 text-sm">
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Compound</span>
                    <span className="col-span-2 text-slate-900 font-medium">MT2 (Melanotan II)</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Structure</span>
                    <span className="col-span-2 text-slate-900">Cyclic heptapeptide, α-MSH analogue</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Targets</span>
                    <span className="col-span-2 text-slate-900">Melanocortin receptors, non-selective</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Physical form</span>
                    <span className="col-span-2 text-slate-900">Lyophilised powder</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Purity</span>
                    <span className="col-span-2 font-bold text-emerald-700">≥99% by RP-HPLC</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Identity</span>
                    <span className="col-span-2 text-slate-900">Mass spectrometry confirmed</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Presentation</span>
                    <span className="col-span-2 text-slate-900">Sealed, batch-numbered glass vial</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-600">Storage</span>
                    <span className="col-span-2 text-slate-900">−20°C, protected from light</span>
                  </div>
                  <div className="grid grid-cols-3 p-3.5 hover:bg-slate-50 transition-colors bg-emerald-50/50">
                    <span className="font-semibold text-emerald-900">Included</span>
                    <span className="col-span-2 text-emerald-900 font-medium">Third-party certificate of analysis</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-200">
                  <Link
                    href="/shop/mt2-10mg"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 px-4 rounded-lg text-sm text-center block transition-colors shadow-xs"
                  >
                    View MT2 Reference Standard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. H2: How Ordering Works (Visual 3-Step Process + Guarantees) */}
      <section id="how-ordering-works-section" className="py-20 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-4">
              How Ordering Works
            </h2>
            <p className="text-slate-600 text-base">
              A frictionless, audit-ready purchasing workflow tailored for laboratories and academic institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl flex flex-col relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-base flex items-center justify-center mb-6 shadow-sm">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Select &amp; Confirm RUO</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Select your compound and vial size, confirm the research-use-only declaration at checkout, and pay through our secure encrypted gateway.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl flex flex-col relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-base flex items-center justify-center mb-6 shadow-sm">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Instant Documentation &amp; Tracking</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                You receive order confirmation immediately, a tracking reference on dispatch, and the batch certificate of analysis linked in your account.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 p-8 rounded-2xl flex flex-col relative">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-base flex items-center justify-center mb-6 shadow-sm">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">Fast Domestic Dispatch</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Working-day orders confirmed before 3pm are dispatched the same day. UK tracked delivery is typically 24 to 48 hours.
              </p>
            </div>
          </div>

          {/* International & Replacement Notice */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-100/80 p-6 rounded-xl border border-slate-200 text-sm text-slate-700">
              <strong className="text-slate-900 block mb-1">International Shipping:</strong>
              International shipping is available where local law permits import of research materials; purchasers are responsible for verifying their own jurisdiction&apos;s rules.
            </div>
            <div className="bg-slate-100/80 p-6 rounded-xl border border-slate-200 text-sm text-slate-700">
              <strong className="text-slate-900 block mb-1">Integrity &amp; Transit Guarantee:</strong>
              If a vial arrives damaged, thermally compromised or outside its stated specification, contact us within 48 hours with the batch number and we will replace it.
            </div>
          </div>
        </div>
      </section>

      {/* 8. H2: Buy Retatrutide UK — Ordering Made Straightforward */}
      <section id="uk-domestic-advantage-section" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider mb-6">
            <Building2 className="w-4 h-4 text-emerald-600" />
            <span>Domestic UK Infrastructure</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 mb-6">
            Buy Retatrutide UK — Ordering Made Straightforward
          </h2>

          <p className="text-slate-700 text-base sm:text-lg leading-relaxed max-w-3xl mx-auto mb-6">
            For UK researchers, a domestic supplier removes the friction that makes international ordering unpredictable. UK-held stock means shorter transit and better temperature control. Anyone comparing retatrutide UK buy options will find our stock held locally, dispatched on tracked UK services and supported by a team in your own time zone.
          </p>

          <p className="text-sm text-slate-500 max-w-2xl mx-auto">
            Purchasers remain responsible for ensuring their intended use complies with UK law and their institution&apos;s governance requirements.
          </p>
        </div>
      </section>

      {/* 9. H2: Review the Documentation, Then Decide (Final Action Section) */}
      <section id="final-cta-section" className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-6">
            Review the Documentation, Then Decide
          </h2>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Browse the catalogue, examine the batch information and buy with a clear understanding of what you are receiving.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/shop"
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span>Shop RetaPharma</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-4 rounded-xl font-bold text-base transition-colors flex items-center justify-center gap-2"
            >
              <span>Contact Our Team</span>
              <Headset className="w-5 h-5 text-slate-400" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
