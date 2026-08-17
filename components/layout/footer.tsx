import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Mail, Clock } from 'lucide-react';
import { WHATSAPP_CONFIG, getWhatsAppLink } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-1">
          <Link href="/" className="inline-block mb-4 group" id="footer-logo-link">
            <div className="bg-white/95 rounded-xl px-3 py-1.5 inline-flex items-center shadow-xs group-hover:bg-white transition-colors">
              <Image
                src="/logo.png"
                alt="Reta Pharma - Certified Research Peptides Official Logo"
                width={150}
                height={40}
                className="h-8 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </Link>
          <p className="text-sm leading-relaxed text-slate-400 mb-4">
            Premium peptide research and education. Dedicated to transparency, high-quality analytical testing, and reliable materials.
          </p>

          <a
            href={getWhatsAppLink(WHATSAPP_CONFIG.greetings.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/30 px-3 py-2 rounded-xl text-xs font-semibold transition"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp: {WHATSAPP_CONFIG.displayPhone}</span>
          </a>
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
          <h4 className="text-white font-semibold mb-4">Company &amp; Support</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link href="/faqs" className="hover:text-white transition-colors">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            <li>
              <a
                href={getWhatsAppLink(WHATSAPP_CONFIG.greetings.orderHelp)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 font-medium inline-flex items-center gap-1"
              >
                <span>Order via WhatsApp</span>
              </a>
            </li>
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
