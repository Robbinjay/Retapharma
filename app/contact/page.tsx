import { Mail, Clock, MessageCircle, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';
import { WHATSAPP_CONFIG, getWhatsAppLink } from '@/lib/whatsapp';

export const metadata = { 
  alternates: { canonical: '/contact' },
  title: 'Contact Us & Live WhatsApp Support | Reta Pharma',
  description: 'Contact Reta Pharma for peptide research support, WhatsApp live chat ordering, and batch analytical documentation.',
};

export default function Contact() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Contact &amp; Customer Support</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our UK team is available to assist researchers with product guidance, WhatsApp direct ordering, payment instructions, and batch documentation.
          </p>
        </div>

        {/* WhatsApp Fast Track Banner */}
        <div className="mb-12 bg-gradient-to-r from-emerald-600 to-teal-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-white/20 p-3.5 rounded-2xl flex-shrink-0 backdrop-blur-xs">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-400 text-emerald-950 text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                  Fastest Response
                </span>
                <span className="text-xs text-emerald-100 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse"></span> Online Now
                </span>
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">WhatsApp Live Support &amp; Direct Ordering</h2>
              <p className="text-emerald-100 text-sm max-w-xl">
                Chat directly with our UK support team at <span className="font-mono font-bold text-white">{WHATSAPP_CONFIG.displayPhone}</span> for instant questions or to complete your order over chat.
              </p>
            </div>
          </div>

          <a
            href={getWhatsAppLink(WHATSAPP_CONFIG.greetings.general)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-emerald-50 text-emerald-900 font-bold px-6 py-4 rounded-2xl transition shadow-md whitespace-nowrap active:scale-[0.98]"
          >
            <MessageCircle className="w-5 h-5 text-emerald-600" />
            <span>Chat on WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send an Email Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">First Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-emerald-500" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-emerald-500" placeholder="Doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-emerald-500" placeholder="john.doe@example.com" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Subject</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-700">
                  <option>Order &amp; Payment Inquiry</option>
                  <option>Batch Documentation &amp; COA Request</option>
                  <option>Product Information</option>
                  <option>Other Question</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Message</label>
                <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-hidden focus:ring-2 focus:ring-emerald-500" placeholder="How can we assist your research?"></textarea>
              </div>
              
              <button type="button" className="w-full bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                Send Email Inquiry
              </button>
            </form>
          </div>

          {/* Contact Info Channels */}
          <div className="space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-10 shadow-sm">
              <h2 className="text-2xl font-bold mb-6">Direct Channels</h2>
              
              <div className="space-y-6">
                {/* WhatsApp */}
                <div className="flex items-start gap-4 pb-6 border-b border-slate-800">
                  <div className="bg-emerald-500/20 p-3 rounded-xl flex-shrink-0 text-emerald-400">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-300 mb-0.5">WhatsApp Live Support</h3>
                    <p className="text-white font-mono font-bold text-lg">{WHATSAPP_CONFIG.displayPhone}</p>
                    <p className="text-xs text-emerald-400 mt-1">Instant chat support &amp; WhatsApp ordering</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 pb-6 border-b border-slate-800">
                  <div className="bg-white/10 p-3 rounded-xl flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-300 mb-0.5">Email Support</h3>
                    <p className="text-white font-medium text-lg">support@retapharma.uk</p>
                    <p className="text-xs text-slate-400 mt-1">We aim to reply within 24 hours.</p>
                  </div>
                </div>
                
                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl flex-shrink-0">
                    <Clock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-300 mb-0.5">Operating Hours</h3>
                    <p className="text-white font-medium">{WHATSAPP_CONFIG.operatingHours}</p>
                    <p className="text-xs text-slate-400 mt-1">Same-day UK dispatch for orders placed before 2:00 PM GMT.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <h3 className="font-bold text-slate-900 text-lg">Official Support Guarantee</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                All communications and order requests placed via WhatsApp or email are handled securely by our UK team with verifiable COA documentation and discreet tracked dispatch.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">HPLC Verified</span>
                <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Tracked Royal Mail</span>
                <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-3 py-1 rounded-full">Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

