export const metadata = { title: 'Shipping Policy | Reta Pharma' };
export default function ShippingPolicy() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Shipping Policy</h1>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 prose prose-slate max-w-none">
          <h3>Domestic Shipping (UK)</h3>
          <p>All domestic orders are processed within 1-2 business days. Standard shipping typically takes 2-4 business days. Expedited options are available at checkout.</p>
          <h3>International Shipping</h3>
          <p>We offer international shipping to most major research hubs. Delivery times vary between 5-15 business days depending on customs clearance. Please note that buyers are responsible for any import duties, taxes, or customs fees.</p>
          <h3>Tracking</h3>
          <p>Once your order has shipped, you will receive an email confirmation with tracking information.</p>
        </div>
      </div>
    </div>
  );
}
