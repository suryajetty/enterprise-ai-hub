export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import Newsletter from '@/components/layout/newsletter';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>; // <-- searchParams is now a Promise
}) {
  const articles = getAllArticles();
  
  // 1. Await the params before using them
  const resolvedParams = await searchParams;
  const selectedTag = resolvedParams.tag;

  // 2. Extract all unique tags from the articles and sort them alphabetically
  const allTags = Array.from(
    new Set(articles.flatMap((article) => article.tags))
  ).sort();

  // 3. Filter articles if a tag is clicked, otherwise show all
  const filteredArticles = selectedTag
    ? articles.filter((article) => article.tags.includes(selectedTag))
    : articles;

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-slate-200">
      <div className="mx-auto max-w-4xl">
        {/* Hero Section */}
        <header className="mb-12 border-b border-cyan-900/50 pb-12">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-white md:text-6xl">
            Enterprise AI <span className="text-cyan-400">Explained Visually.</span>
          </h1>
          <p className="text-xl text-slate-400">
            Real-world architectures, code, and lessons learned from deploying AI into production environments.
          </p>
        </header>

        {/* Tag Filter Menu */}
        <section className="mb-10">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !selectedTag
                  ? 'bg-cyan-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              All Blueprints
            </Link>

            {allTags.map((tag) => (
              <Link
                key={tag}
                href={`/?tag=${encodeURIComponent(tag)}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                }`}
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>

        {/* Article Feed */}
        <section className="mb-16">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-white">
              {selectedTag ? `Results for "${selectedTag}"` : 'Latest Blueprints'}
            </h2>
            <span className="text-sm text-slate-500">
              {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
            </span>
          </div>

          <div className="grid gap-6">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Link href={`/articles/${article.slug}`} key={article.slug} className="group block">
                  <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 transition-all hover:border-cyan-500/50 hover:bg-slate-900">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-sm text-cyan-400">{article.date}</span>
                      <div className="flex gap-2">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full px-3 py-1 text-xs ${
                              selectedTag === tag
                                ? 'border border-cyan-500/30 bg-cyan-900/50 text-cyan-300'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white group-hover:text-cyan-300">
                      {article.title}
                    </h3>
                    <p className="text-slate-400">{article.description}</p>
                  </article>
                </Link>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-700 p-12 text-center text-slate-500">
                No articles found for this category yet.
              </div>
            )}
          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </div>
    </main>
  );
}