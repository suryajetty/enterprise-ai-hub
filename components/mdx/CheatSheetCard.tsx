import { DownloadCloud } from "lucide-react";

export default function CheatSheetCard({ title, href }: { title: string, href: string }) {
  return (
    <div className="my-8 flex items-center justify-between rounded-lg border border-cyan-500/30 bg-slate-900 p-6 shadow-lg shadow-cyan-500/10">
      <div>
        <h3 className="text-lg font-bold text-white m-0">📄 {title}</h3>
        <p className="text-slate-400 text-sm mt-1 mb-0">
          Download the high-res architecture diagram and enterprise checklist.
        </p>
      </div>
      <a 
        href={href} 
        download
        className="flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500 transition-colors no-underline"
      >
        <DownloadCloud size={18} />
        Download PDF
      </a>
    </div>
  );
}