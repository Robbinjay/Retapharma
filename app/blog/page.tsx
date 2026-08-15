import Link from 'next/link';
import { articles } from '@/lib/data';

export const metadata = { title: 'Blog & Education | Reta Pharma' };
export default function Blog() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Blog & Education</h1>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl">Explore the latest articles on peptide research, handling best practices, and scientific advancements.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
              <div className="p-6 flex flex-col flex-grow">
                <div className="text-xs font-semibold text-emerald-600 mb-2">{article.category}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{article.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-100">
                  <span>{article.author}</span>
                  <span>{article.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
