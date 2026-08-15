import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, FileText, CheckCircle2, ChevronRight } from 'lucide-react';
import AddToCartButton from '@/components/cart/add-to-cart-button';

const generateMetadata = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params;
  const product = products.find(p => p.slug === resolvedParams?.slug);
  if (!product) return { title: 'Product Not Found' };
  
  return {
    title: `${product.name} | Reta Pharma`,
    description: product.shortDescription,
  };
};

export { generateMetadata };

const ProductPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params;
  const product = products.find(p => p.slug === resolvedParams?.slug);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="flex items-center text-sm text-slate-500 mb-8">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <Link href="/shop" className="hover:text-slate-900">Shop</Link>
          <ChevronRight className="w-4 h-4 mx-2" />
          <span className="text-slate-900 font-medium">{product.name}</span>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Product Image */}
            <div className="relative h-[420px] md:h-full min-h-[380px] bg-slate-50 border-b md:border-b-0 md:border-r border-slate-100 overflow-hidden flex items-center justify-center p-8">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Product Info */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <div className="text-sm font-bold uppercase tracking-widest text-emerald-600 mb-4">
                {product.category}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>
              <p className="text-xl text-slate-600 mb-6 border-b border-slate-100 pb-6">
                {product.shortDescription}
              </p>
              
              <div className="text-3xl font-bold text-slate-900 mb-8">
                £{product.price.toFixed(2)}
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Format</span>
                    <span className="text-slate-600">{product.format}</span>
                  </div>
                </div>
                {product.batchDataAvailable && (
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="font-semibold text-slate-900 block">Batch Data</span>
                      <span className="text-slate-600">Analytical data available. <Link href="/batch-data" className="text-emerald-600 hover:underline">Search batches</Link></span>
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-slate-900 block">Research and Human Consumption</span>
                    <span className="text-slate-600">For human consumption or therapeutic use.</span>
                  </div>
                </div>
              </div>
              
              <AddToCartButton product={product} />
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 p-8 md:p-12 lg:p-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">Product Description & Research Information</h2>
          <div className="prose prose-lg text-slate-700 max-w-none">
            <p>{product.description}</p>
            <h3 className="text-lg font-bold text-slate-900 mt-8 mb-4">Storage Guidelines</h3>
            <p>
              Lyophilized peptides should be stored at -20°C (freezer) for long-term stability. Before reconstitution, allow the vial to reach room temperature in a desiccator. Reconstituted solutions should be stored at 4°C and typically used within a few weeks, depending on the specific peptide and diluent used.
            </p>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-6 mt-8 rounded-r-xl">
              <h4 className="font-bold text-emerald-900 mb-2">Product Information &amp; Usage</h4>
              <p className="text-sm text-emerald-800 m-0">
                This product is provided for research and human consumption, or therapeutic use. Please ensure proper handling, storage, and reconstitution according to standard guidelines. By purchasing, you agree to our Terms of Use and product policies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
