import React, { useState } from 'react';
import { X, Copy, Check, Terminal } from 'lucide-react';
import { GeneratorConfig, PaymentMethod } from '../types/payment';
import { generateSvgString } from '../utils/svgGenerator';

interface CodeExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: GeneratorConfig;
  selectedMethods: PaymentMethod[];
}

export const CodeExportModal: React.FC<CodeExportModalProps> = ({
  isOpen,
  onClose,
  config,
  selectedMethods,
}) => {
  const [activeTab, setActiveTab] = useState<'svg' | 'react' | 'shopify'>('svg');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const rawSvg = generateSvgString(config, selectedMethods);

  let snippet = '';
  if (activeTab === 'svg') {
    snippet = rawSvg;
  } else if (activeTab === 'react') {
    // Generate clean React component code
    snippet = `import React from 'react';

/**
 * Auto-generated Accepted Payment Methods Component
 * Powered by PayBadge
 */
export const AcceptedPaymentMethods: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={\`inline-flex items-center justify-center \${className}\`}>
      ${rawSvg.replace(/class="/g, 'className="')}
    </div>
  );
};

export default AcceptedPaymentMethods;
`;
  } else if (activeTab === 'shopify') {
    snippet = `<!-- Shopify / WooCommerce Footer Payment Icons Snippet -->
<div class="payment-methods-strip" style="display: flex; justify-content: center; margin: 1.5rem 0;">
  ${rawSvg}
</div>
`;
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900">
              Embed & Export Code
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="px-6 pt-3 border-b border-slate-100 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('svg')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'svg'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Inline SVG (Universal)
          </button>
          <button
            onClick={() => setActiveTab('react')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'react'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            React / Next.js Component
          </button>
          <button
            onClick={() => setActiveTab('shopify')}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'shopify'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            Shopify / Liquid Snippet
          </button>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950 font-mono text-xs text-slate-200">
          <pre className="whitespace-pre-wrap break-all leading-relaxed select-all">
            {snippet}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <p className="text-xs text-slate-500">
            Vector graphic scales smoothly to any resolution without raster artifacts.
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
