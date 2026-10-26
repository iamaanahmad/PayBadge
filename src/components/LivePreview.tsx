import React, { useState } from 'react';
import { GeneratorConfig, PaymentMethod } from '../types/payment';
import { generateSvgString, downloadSvg, exportAsPng } from '../utils/svgGenerator';
import {
  Download,
  Copy,
  Check,
  Code,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Lock,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

interface LivePreviewProps {
  config: GeneratorConfig;
  selectedMethods: PaymentMethod[];
  onOpenCodeModal: () => void;
}

export const LivePreview: React.FC<LivePreviewProps> = ({
  config,
  selectedMethods,
  onOpenCodeModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [downloadingPng, setDownloadingPng] = useState(false);
  const [pngScale, setPngScale] = useState<number>(2);
  const [previewBg, setPreviewBg] = useState<'checkerboard' | 'white' | 'dark' | 'simulation'>('checkerboard');
  const [zoom, setZoom] = useState<number>(100);

  const svgContent = generateSvgString(config, selectedMethods);

  const [downloadedSvg, setDownloadedSvg] = useState(false);
  const [downloadedPng, setDownloadedPng] = useState(false);

  const handleCopySvg = async () => {
    try {
      await navigator.clipboard.writeText(svgContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = svgContent;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownloadSvg = () => {
    downloadSvg(svgContent, 'payment-icons.svg');
    setDownloadedSvg(true);
    setTimeout(() => setDownloadedSvg(false), 2200);
  };

  const handleDownloadPng = async () => {
    setDownloadingPng(true);
    try {
      await exportAsPng(svgContent, pngScale, `payment-icons-${pngScale}x.png`);
      setDownloadedPng(true);
      setTimeout(() => setDownloadedPng(false), 2200);
    } catch (err) {
      console.error('PNG export failed', err);
    } finally {
      setDownloadingPng(false);
    }
  };

  return (
    <div id="preview-section" className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 flex flex-col h-full">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <span>3. Live Preview & Export</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-mono tabular-nums">
            {selectedMethods.length} payment {selectedMethods.length === 1 ? 'method' : 'methods'} active
          </p>
        </div>

        {/* Preview Background Switcher & Zoom */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Canvas Background Options */}
          <div className="flex items-center gap-0.5 p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setPreviewBg('checkerboard')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                previewBg === 'checkerboard' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Transparent checkerboard"
            >
              Grid
            </button>
            <button
              onClick={() => setPreviewBg('white')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                previewBg === 'white' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Clean White background"
            >
              Light
            </button>
            <button
              onClick={() => setPreviewBg('dark')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                previewBg === 'dark' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Dark slate background"
            >
              Dark
            </button>
            <button
              onClick={() => setPreviewBg('simulation')}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                previewBg === 'simulation' ? 'bg-white text-slate-900 shadow-2xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Simulated Checkout Experience"
            >
              Store Mockup
            </button>
          </div>

          {/* Zoom controls */}
          <div className="hidden sm:flex items-center gap-1 text-slate-500 bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setZoom((z) => Math.max(50, z - 25))}
              className="p-1 hover:text-slate-900 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono tabular-nums px-1 w-9 text-center">
              {zoom}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(200, z + 25))}
              className="p-1 hover:text-slate-900 transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="mt-4 flex-1 min-h-[340px] flex items-center justify-center rounded-xl overflow-auto p-4 sm:p-8 relative border border-slate-200">
        {/* Background Styling */}
        {previewBg === 'checkerboard' && (
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(45deg, #cbd5e1 25%, transparent 25%), linear-gradient(-45deg, #cbd5e1 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #cbd5e1 75%), linear-gradient(-45deg, transparent 75%, #cbd5e1 75%)`,
              backgroundSize: '16px 16px',
              backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
            }}
          />
        )}
        {previewBg === 'white' && <div className="absolute inset-0 bg-white pointer-events-none" />}
        {previewBg === 'dark' && <div className="absolute inset-0 bg-slate-950 pointer-events-none" />}

        {/* Simulation Store Mockup wrapper */}
        {previewBg === 'simulation' ? (
          <div className="relative z-10 w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Mock Checkout Modal / Box */}
            <div className="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" />
                <span>Acme Store Checkout</span>
              </div>
              <span className="font-mono text-emerald-400">$149.00 USD</span>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                <span className="text-slate-500">Order Summary (2 items)</span>
                <span className="font-semibold text-slate-800">Free Worldwide Shipping</span>
              </div>

              {/* Real Generated Component embedded in simulation */}
              <div className="py-2 flex justify-center">
                <div
                  style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
                  className="transition-transform duration-150"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                />
              </div>

              <button
                type="button"
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center gap-2"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Complete Purchase</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            className="relative z-10 transition-transform duration-150"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center center' }}
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>

      {/* Export Toolbar */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Left Action: Copy SVG & Embed Code */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopySvg}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Copied SVG!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-500" />
                <span>Copy SVG</span>
              </>
            )}
          </button>

          <button
            onClick={onOpenCodeModal}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg border border-slate-200 text-slate-700 bg-white hover:bg-slate-50 transition-colors"
          >
            <Code className="w-3.5 h-3.5 text-slate-500" />
            <span>Embed Code</span>
          </button>
        </div>

        {/* Right Actions: Download SVG & PNG */}
        <div className="flex items-center gap-2">
          {/* PNG Scale selector */}
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden text-xs bg-slate-50">
            <span className="px-2 text-[10px] font-bold text-slate-400">PNG</span>
            {[1, 2, 3].map((scale) => (
              <button
                key={scale}
                onClick={() => setPngScale(scale)}
                className={`px-2 py-2 text-[11px] font-mono font-semibold transition-colors ${
                  pngScale === scale ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {scale}x
              </button>
            ))}
          </div>

          <button
            onClick={handleDownloadPng}
            disabled={downloadingPng || selectedMethods.length === 0}
            className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap disabled:opacity-50 cursor-pointer"
          >
            {downloadedPng ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Saved PNG!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingPng ? 'Rendering...' : 'Download PNG'}</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadSvg}
            disabled={selectedMethods.length === 0}
            className="flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {downloadedSvg ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved SVG!</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download SVG</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
