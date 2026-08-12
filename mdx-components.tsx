import type { MDXComponents } from 'mdx/types'
 
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Intercept standard markdown code blocks
    pre: (props) => (
      <div className="my-6 rounded-xl border border-cyan-500/20 bg-[#22272e] shadow-lg shadow-cyan-900/10 overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 border-b border-cyan-500/20 bg-slate-900/50 px-4 py-3">
          <div className="h-3 w-3 rounded-full bg-red-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500/80"></div>
          <div className="h-3 w-3 rounded-full bg-green-500/80"></div>
          <span className="ml-2 text-xs font-mono text-slate-400">enterprise_script.py</span>
        </div>
        {/* Actual Code content */}
        <pre {...props} className="p-4 text-sm font-mono overflow-x-auto" />
      </div>
    ),
  }
}