export const metadata = { title: 'About Us | Reta Pharma' };
export default function About() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-6">About Reta Pharma</h1>
        <div className="bg-white p-8 rounded-2xl border border-slate-200 prose prose-slate max-w-none">
          <p>Welcome to Reta Pharma. We are a dedicated team of professionals focused on providing the highest quality research peptides and analytical services for the scientific community.</p>
          <p>Our mission is to support scientific advancement through transparency, rigorous testing, and reliable supply chains.</p>
          <h3>Our Commitment to Quality</h3>
          <p>Every product we supply undergoes comprehensive third-party testing, including HPLC and Mass Spectrometry, to verify purity, identity, and quantity.</p>
          <h3>Research and Human Consumption</h3>
          <p>Products available on our platform are supplied for research and human consumption, or therapeutic use.</p>
        </div>
      </div>
    </div>
  );
}
