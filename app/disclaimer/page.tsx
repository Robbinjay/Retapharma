import { AlertTriangle } from 'lucide-react';

export const metadata = {
  title: 'Legal Disclaimer | Reta Pharma',
  description: 'Important legal disclaimer regarding the research-only nature of products sold by Reta Pharma.',
};

export default function Disclaimer() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-8">
            <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Legal Disclaimer</h1>
              <p className="text-slate-600">Please read carefully before using this website or purchasing products.</p>
            </div>
          </div>

          <div className="prose prose-lg text-slate-700 max-w-none prose-headings:text-slate-900">
            <h2>Research and Human Consumption</h2>
            <p>
              All products provided by Reta Pharma (including Retatrutide and Melanotan II) are available for research and human consumption, or therapeutic use.
            </p>
            
            <h2>Not Approved Medicines</h2>
            <p>
              The materials we supply are investigational compounds. They have not been evaluated or approved by the MHRA, FDA, or any other regulatory body for the treatment, cure, mitigation, or prevention of any disease or medical condition.
            </p>

            <h2>Educational Content</h2>
            <p>
              The information provided on this website, including all articles, product descriptions, calculators, and laboratory explanations, is provided for educational and informational purposes only. It is intended to support laboratory researchers in understanding the chemical and biological properties of these materials in an <em>in-vitro</em> context.
            </p>
            <p>
              <strong>None of the information on this website constitutes medical advice.</strong> Reta Pharma does not provide medical guidelines, dosing protocols for human use, or treatment recommendations. Any mention of biological pathways or receptor interactions is in reference to laboratory models and published scientific literature, not clinical applications.
            </p>

            <h2>Buyer Responsibility</h2>
            <p>
              By purchasing from Reta Pharma, the buyer acknowledges and agrees that:
            </p>
            <ul>
              <li>They are a qualified researcher, laboratory technician, or institutional representative equipped to handle the materials safely.</li>
              <li>They understand the health and safety hazards associated with handling investigational research chemicals.</li>
              <li>The products will not be used in clinical trials involving human subjects or administered to humans or animals in any manner.</li>
              <li>They bear full responsibility for the safe storage, handling, use, and disposal of the materials in accordance with all applicable local, national, and international regulations.</li>
            </ul>

            <h2>Liability</h2>
            <p>
              Reta Pharma, its directors, employees, and affiliates shall not be held liable for any damages, incidental or consequential, arising from the improper use, handling, or administration of our products.
            </p>
            
            <p className="font-bold text-slate-900 mt-12 pt-8 border-t border-slate-100">
              Please review all terms, product specifications, and documentation before completing your order.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
