import React from 'react';
import { Download, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onQuickDownload: () => void;
  selectedCount: number;
}

export const Header: React.FC<HeaderProps> = ({ onQuickDownload, selectedCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a href="/" className="text-xl font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 flex items-center gap-2">
          <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-black text-sm">
            PB
          </span>
          <span>PayBadge</span>
        </a>

        {/* Zone 2: 4-5 single-line clean navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#methods-section" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Payment Methods
          </a>
          <a href="#customize-section" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Layout & Style
          </a>
          <a href="#presets-section" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Presets
          </a>
          <a href="#preview-section" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Live Preview
          </a>
          <a href="#security-section" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Security &amp; Host
          </a>
          <a href="#legal-section" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Legal &amp; Trademarks
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onQuickDownload}
            disabled={selectedCount === 0}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download SVG</span>
          </button>
        </div>
      </div>
    </header>
  );
};
