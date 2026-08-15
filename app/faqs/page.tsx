export const metadata = { title: 'Frequently Asked Questions | Reta Pharma' };
export default function Faqs() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {[
            { q: 'Are your products tested?', a: 'Yes, all our peptides undergo rigorous third-party analytical testing, including HPLC and MS, to ensure high purity (typically >99%).' },
            { q: 'Are these products for human use?', a: 'All products provided by Reta Pharma are available for research and human consumption, or therapeutic use.' },
            { q: 'How should I store lyophilized peptides?', a: 'Lyophilized peptides should be stored in a freezer at -20°C or colder for long-term stability. Avoid repeated freeze-thaw cycles.' },
            { q: 'Do you ship internationally?', a: 'Yes, we provide international shipping for most research items. Please refer to our Shipping Policy for detailed information on regions and restrictions.' }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{faq.q}</h3>
              <p className="text-slate-600">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
