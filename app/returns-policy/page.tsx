export const metadata = { title: 'Returns Policy | Reta Pharma' };
export default function ReturnsPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Returns Policy</h1>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 prose prose-slate max-w-none">
          <h3>Return Eligibility</h3>
          <p>Due to the sensitive nature of research peptides and to ensure product integrity, we do not accept returns on any opened or reconstituted products.</p>
          <h3>Damaged or Incorrect Items</h3>
          <p>If you receive a damaged item or an incorrect product, please contact us within 48 hours of delivery. We will require photographic evidence of the damaged package/product to process a replacement.</p>
          <h3>Refunds</h3>
          <p>Eligible refunds will be processed within 5-7 business days of the returned item arriving at our facility. Shipping costs are non-refundable.</p>
        </div>
      </div>
    </div>
  );
}
