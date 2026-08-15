import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Reta Pharma</h3>
          <p className="text-sm leading-relaxed text-slate-400">
            Premium peptide research and education. Dedicated to transparency, high-quality analytical testing, and providing researchers with reliable scientific materials.
          </p>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
            <li><Link href="/retatrutide" className="hover:text-white transition-colors">Retatrutide</Link></li>
            <li><Link href="/mt2" className="hover:text-white transition-colors">MT2</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Research</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/retatrutide" className="hover:text-white transition-colors">Retatrutide Info</Link></li>
            <li><Link href="/peptide-information" className="hover:text-white transition-colors">Peptide Information</Link></li>
            <li><Link href="/laboratory-testing" className="hover:text-white transition-colors">Laboratory Testing</Link></li>
            <li><Link href="/batch-data" className="hover:text-white transition-colors">Batch Data</Link></li>
            <li><Link href="/peptide-calculator" className="hover:text-white transition-colors">Peptide Calculator</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Policies</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/terms-of-use" className="hover:text-white transition-colors">Terms of Use</Link></li>
            <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
            <li><Link href="/returns-policy" className="hover:text-white transition-colors">Returns Policy</Link></li>
            <li><Link href="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between">
        <p>&copy; {new Date().getFullYear()} Reta Pharma. All rights reserved.</p>
        <p className="mt-4 md:mt-0 max-w-xl text-xs text-center md:text-right">
          Disclaimer: Products are provided for research and human consumption, therapeutic use, or medical treatment.
        </p>
      </div>
    </footer>
  );
}
