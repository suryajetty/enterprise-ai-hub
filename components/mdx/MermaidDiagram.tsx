'use client';

import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

// Configure Mermaid to match your cyberpunk/dark tech aesthetic
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  themeVariables: {
    primaryColor: '#0f172a', // slate-900
    primaryTextColor: '#fff',
    primaryBorderColor: '#06b6d4', // cyan-500
    lineColor: '#8b5cf6', // purple-500
    secondaryColor: '#1e293b',
    tertiaryColor: '#334155',
  },
  securityLevel: 'loose',
});

export default function MermaidDiagram({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Re-render when the chart content changes
    if (ref.current) {
      mermaid.contentLoaded();
    }
  }, [chart]);

  return (
    <div className="my-10 flex w-full justify-center overflow-x-auto rounded-xl border border-cyan-500/30 bg-slate-950 p-6 shadow-lg shadow-cyan-900/20">
      <div className="mermaid text-sm" ref={ref}>
        {chart}
      </div>
    </div>
  );
}