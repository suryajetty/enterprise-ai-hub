'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
} catch (error) {
      console.error('Newsletter subscription failed:', error);
      setStatus('error');
    }
  };

  return (
    <div className="my-16 rounded-2xl border border-cyan-900/50 bg-slate-900/50 p-8 text-center sm:p-12">
      <div className="mx-auto max-w-lg">
        <Mail className="mx-auto mb-4 h-8 w-8 text-cyan-500" />
        <h2 className="mb-2 text-2xl font-bold text-white">Join the Enterprise AI Shift</h2>
        <p className="mb-6 text-slate-400">
          Join other architects and engineers mastering the transition from legacy systems to production-grade AI. Get a new technical blueprint sent to your inbox every week.
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-2 rounded-lg border border-green-900/50 bg-green-950/30 p-4 text-green-400">
            <CheckCircle size={20} />
            <span>Blueprint secured! Check your inbox.</span>
          </div>
        ) : (
          <form onSubmit={subscribe} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="engineer@enterprise.com"
              required
              className="flex-grow rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-200 placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-cyan-500 disabled:opacity-70"
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe'}
              {status !== 'loading' && <ArrowRight size={18} />}
            </button>
          </form>
        )}
        
        {status === 'error' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-red-400">
            <AlertCircle size={16} />
            <span>Something went wrong. Please try again.</span>
          </div>
        )}
      </div>
    </div>
  );
}