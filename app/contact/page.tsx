import { Mail, MapPin, Phone, Clock } from 'lucide-react';

export const metadata = {
  title: 'Contact Us | Reta Pharma',
  description: 'Contact Reta Pharma for inquiries regarding our research peptides and batch documentation.',
};

export default function Contact() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Contact Us</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Our UK-based team is available to assist qualified researchers with product inquiries, batch documentation, and order support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">First Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">Last Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Subject</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700">
                  <option>Order Inquiry</option>
                  <option>Batch Documentation Request</option>
                  <option>Product Information</option>
                  <option>Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Message</label>
                <textarea rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"></textarea>
              </div>
              
              <button type="button" className="w-full bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div>
            <div className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-300 mb-1">Email Support</h3>
                    <p className="text-white font-medium text-lg">support@retapharma.co.uk</p>
                    <p className="text-sm text-slate-400 mt-1">We aim to reply within 24 hours.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-white/10 p-3 rounded-xl flex-shrink-0">
                    <Clock className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-300 mb-1">Business Hours</h3>
                    <p className="text-white font-medium">Monday - Friday: 9:00 AM - 5:00 PM (GMT)</p>
                    <p className="text-sm text-slate-400 mt-1">Closed weekends and UK bank holidays.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8">
              <h3 className="font-bold text-slate-900 mb-2">Customer &amp; Technical Support</h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Our support team is available to assist with inquiries regarding product specifications, batch documentation, ordering, and shipping details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
