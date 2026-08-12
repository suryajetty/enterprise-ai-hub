import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link 
        href="/" 
        className="mb-8 flex items-center gap-2 text-sm font-medium text-cyan-500 transition-colors hover:text-cyan-400"
      >
        <ArrowLeft size={16} />
        Back to Blueprints
      </Link>
      
      <article className="prose prose-invert prose-cyan prose-pre:bg-transparent prose-pre:p-0 max-w-none">
        {children}
      </article>
    </div>
  );
}