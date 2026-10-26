import React, { useState, useMemo } from 'react';
import { GeneratorConfig, PaymentMethod } from './types/payment';
import { PAYMENT_METHODS } from './data/paymentMethods';
import { Header } from './components/Header';
import { PresetBar } from './components/PresetBar';
import { MethodSelector } from './components/MethodSelector';
import { DesignControls } from './components/DesignControls';
import { LivePreview } from './components/LivePreview';
import { CodeExportModal } from './components/CodeExportModal';
import { Footer } from './components/Footer';
import { downloadSvg } from './utils/svgGenerator';
import { generateSvgString } from './utils/svgGenerator';
import { ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

const DEFAULT_SELECTED_IDS = [
  'visa',
  'mastercard',
  'amex',
  'discover',
  'upi',
  'paypal',
  'metamask',
  'applepay',
  'googlepay',
  'binance',
];

export default function App() {
  const [config, setConfig] = useState<GeneratorConfig>({
    selectedIds: DEFAULT_SELECTED_IDS,
    layout: 'horizontal-row',
    badgeTheme: 'colored-card',
    badgeRadius: 'md',
    badgeSize: 'md',
    customWidth: 68,
    customHeight: 42,
    gap: 10,
    showLabels: false,
    grayscale: false,
    grayscaleOnHover: false,
    titleStyle: 'simple',
    customTitle: 'We Accept',
    showSubtitle: false,
    customSubtitle: 'Guaranteed Safe & Secure Checkout',
    containerBackground: 'transparent',
    customContainerBg: '#FFFFFF',
    containerBorder: false,
    containerShadow: false,
    containerPadding: 16,
    alignment: 'center',
    maxWidth: 900,
  });

  const [methodsList, setMethodsList] = useState<PaymentMethod[]>(PAYMENT_METHODS);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  // Compute selected payment methods in the customized order
  const selectedMethods = useMemo(() => {
    const map = new Map(methodsList.map((m) => [m.id, m]));
    return config.selectedIds
      .map((id) => map.get(id))
      .filter((m): m is PaymentMethod => Boolean(m));
  }, [config.selectedIds, methodsList]);

  const handleToggleMethod = (id: string) => {
    setConfig((prev) => {
      const exists = prev.selectedIds.includes(id);
      if (exists) {
        return {
          ...prev,
          selectedIds: prev.selectedIds.filter((item) => item !== id),
        };
      } else {
        return {
          ...prev,
          selectedIds: [...prev.selectedIds, id],
        };
      }
    });
  };

  const handleSelectAll = () => {
    setConfig((prev) => ({
      ...prev,
      selectedIds: methodsList.map((m) => m.id),
    }));
  };

  const handleClearAll = () => {
    setConfig((prev) => ({
      ...prev,
      selectedIds: [],
    }));
  };

  const handleResetDefault = () => {
    setConfig((prev) => ({
      ...prev,
      selectedIds: DEFAULT_SELECTED_IDS,
    }));
  };

  const handleMoveMethod = (id: string, direction: 'up' | 'down') => {
    setConfig((prev) => {
      const idx = prev.selectedIds.indexOf(id);
      if (idx === -1) return prev;
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= prev.selectedIds.length) return prev;

      const newSelected = [...prev.selectedIds];
      const [removed] = newSelected.splice(idx, 1);
      newSelected.splice(targetIdx, 0, removed);

      return {
        ...prev,
        selectedIds: newSelected,
      };
    });
  };

  const handleUpdateConfig = (partial: Partial<GeneratorConfig>) => {
    setConfig((prev) => ({ ...prev, ...partial }));
  };

  const handleApplyPreset = (presetPartial: Partial<GeneratorConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...presetPartial,
    }));
  };

  const handleQuickDownload = () => {
    const svgStr = generateSvgString(config, selectedMethods);
    downloadSvg(svgStr, 'payment-icons.svg');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Bar Navigation */}
      <Header
        onQuickDownload={handleQuickDownload}
        selectedCount={selectedMethods.length}
      />

      {/* Hero Intro Bar */}
      <section className="bg-white border-b border-slate-200 py-10 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 text-balance">
              Payment Method Icons &amp; &quot;We Accept&quot; Badge Generator
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed text-balance">
              Generate pixel-perfect, responsive payment method icon badges for your checkout pages,
              cart drawers, and store footers. Select your payment gateways, customize layouts from rows to 4-col grids,
              and download clean vector SVG or high-resolution PNG assets with zero dependencies.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Visa, Mastercard, Amex, Discover, UPI, PayPal &amp; Crypto
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>100% Vector SVG &amp; Retina 3x PNG</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>No signup required</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Presets Strip */}
      <PresetBar
        onApplyPreset={handleApplyPreset}
        currentLayout={config.layout}
        currentTheme={config.badgeTheme}
      />

      {/* Main Workspace: 2-Column Split */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configuration Controls (Method Selector + Design Controls) */}
          <div className="lg:col-span-7 space-y-6">
            <MethodSelector
              methods={methodsList}
              selectedIds={config.selectedIds}
              onToggleMethod={handleToggleMethod}
              onSelectAll={handleSelectAll}
              onClearAll={handleClearAll}
              onResetDefault={handleResetDefault}
              onMoveMethod={handleMoveMethod}
            />

            <DesignControls
              config={config}
              onChange={handleUpdateConfig}
            />
          </div>

          {/* Right Column: Sticky Live Preview & Export Hub */}
          <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-6">
            <LivePreview
              config={config}
              selectedMethods={selectedMethods}
              onOpenCodeModal={() => setIsCodeModalOpen(true)}
            />

            {/* Quick Tips Box */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs text-slate-600 space-y-2">
              <h3 className="font-bold text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Integration Pro Tips
              </h3>
              <p className="leading-relaxed">
                • <strong>Shopify &amp; WooCommerce:</strong> Download SVG or copy the Liquid snippet to paste directly into your store theme footer.
              </p>
              <p className="leading-relaxed">
                • <strong>Retina Display:</strong> Export PNG at <strong>2x or 3x</strong> for crisp rendering on high-DPI smartphone displays.
              </p>
              <p className="leading-relaxed">
                • <strong>Equal Prominence:</strong> Keep payment methods uniform in size to adhere to Visa and Mastercard co-branding compliance guidelines.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Embed Code Modal */}
      <CodeExportModal
        isOpen={isCodeModalOpen}
        onClose={() => setIsCodeModalOpen(false)}
        config={config}
        selectedMethods={selectedMethods}
      />

      {/* Comprehensive Legal & Disclaimer Footer */}
      <Footer />
    </div>
  );
}
