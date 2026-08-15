export const metadata = { title: 'Terms of Use | Reta Pharma' };
export default function TermsOfUse() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Terms of Use</h1>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 prose prose-slate max-w-none">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.</p>
          <h3>2. Intended Use</h3>
          <p>Products sold are available for research and human consumption, therapeutic use, or medical treatment.</p>
          <h3>3. Liability</h3>
          <p>Reta Pharma shall not be held liable for any damages resulting from the handling or contact with the products. It is the buyer&apos;s responsibility to understand the hazards and strictly follow laboratory safety protocols.</p>
        </div>
      </div>
    </div>
  );
}
