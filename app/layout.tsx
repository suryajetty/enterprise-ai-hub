import './globals.css';
import Link from 'next/link';
import { Terminal } from 'lucide-react';

export const metadata = {
  title: 'AI With Surya | Enterprise AI Explained',
  description: 'Real-world architectures, code, and lessons learned from deploying AI into production.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-slate-950 text-slate-200 antialiased">
        
        {/* Global Navigation Bar */}
        <nav className="sticky top-0 z-50 border-b border-cyan-900/50 bg-slate-950/80 backdrop-blur-md">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-2 text-white transition-colors hover:text-cyan-400">
              <Terminal size={24} className="text-cyan-500" />
              <span className="text-xl font-bold tracking-tight">AI With Surya</span>
            </Link>
            
            <div className="flex gap-6 text-sm font-medium text-slate-400">
              <Link href="/" className="transition-colors hover:text-cyan-400">
                Blueprints
              </Link>
              <Link href="https://www.linkedin.com/in/surya-j-19s26a/" target="_blank" className="transition-colors hover:text-cyan-400">
                LinkedIn
              </Link>
              <Link href="https://github.com/suryajetty" target="_blank" className="transition-colors hover:text-cyan-400">
                GitHub
              </Link>
            </div>
          </div>
        </nav>

        {/* Dynamic Page Content */}
        <div className="flex-grow">
          {children}
        </div>

        {/* Global Footer */}
        <footer className="mt-20 border-t border-slate-800 py-10 text-center text-sm text-slate-500">
          <div className="mx-auto max-w-4xl px-6">
            <p className="mb-2">© {new Date().getFullYear()} AI With Surya. Engineered for Production.</p>
            <p>Bridging the gap between legacy middleware and modern agentic workflows.</p>
          </div>
        </footer>

      </body>
    </html>
  );
}