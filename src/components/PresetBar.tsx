import React from 'react';
import { GeneratorConfig } from '../types/payment';
import { Sparkles, Check } from 'lucide-react';

interface PresetBarProps {
  onApplyPreset: (partialConfig: Partial<GeneratorConfig>) => void;
  currentLayout: string;
  currentTheme: string;
}

interface PresetOption {
  id: string;
  name: string;
  description: string;
  config: Partial<GeneratorConfig>;
}

export const PRESETS: PresetOption[] = [
  {
    id: 'classic-row',
    name: 'Classic Checkout',
    description: 'Horizontal row with white card borders and "We Accept" heading',
    config: {
      layout: 'horizontal-row',
      badgeTheme: 'colored-card',
      badgeRadius: 'md',
      badgeSize: 'md',
      gap: 10,
      titleStyle: 'simple',
      customTitle: 'We Accept',
      showSubtitle: false,
      containerBackground: 'transparent',
      containerBorder: false,
      containerShadow: false,
      alignment: 'center',
      grayscale: false,
    }
  },
  {
    id: 'ecommerce-secure',
    name: 'Guaranteed Secure',
    description: '4-column layout with 256-bit SSL trust shield and soft card container',
    config: {
      layout: 'grid-4',
      badgeTheme: 'colored-card',
      badgeRadius: 'md',
      badgeSize: 'md',
      gap: 12,
      titleStyle: 'shield',
      customTitle: 'Guaranteed Safe & Secure Checkout',
      showSubtitle: true,
      customSubtitle: 'All major payment methods protected by 256-Bit SSL encryption',
      containerBackground: 'white',
      containerBorder: true,
      containerShadow: true,
      containerPadding: 24,
      alignment: 'center',
      grayscale: false,
    }
  },
  {
    id: 'dark-saas',
    name: 'Dark Sleek',
    description: 'Modern 3-column slate card grid with high-contrast logos',
    config: {
      layout: 'grid-3',
      badgeTheme: 'dark-card',
      badgeRadius: 'md',
      badgeSize: 'md',
      gap: 10,
      titleStyle: 'lock',
      customTitle: 'Accepted Payment Methods',
      showSubtitle: true,
      customSubtitle: 'Instant activation across cards and crypto',
      containerBackground: 'slate-900',
      containerBorder: true,
      containerShadow: false,
      containerPadding: 20,
      alignment: 'center',
      grayscale: false,
    }
  },
  {
    id: 'minimal-grayscale',
    name: 'Minimal Luxury',
    description: 'Clean monochrome icons with hairline borders for high-end fashion/editorial',
    config: {
      layout: 'horizontal-row',
      badgeTheme: 'monochrome-light',
      badgeRadius: 'sm',
      badgeSize: 'sm',
      gap: 12,
      titleStyle: 'none',
      customTitle: '',
      showSubtitle: false,
      containerBackground: 'transparent',
      containerBorder: false,
      containerShadow: false,
      alignment: 'left',
      grayscale: true,
    }
  },
  {
    id: 'crypto-web3',
    name: 'Crypto & Web3 Strip',
    description: 'Dark background tailored for Binance, MetaMask, and decentralized assets',
    config: {
      selectedIds: ['metamask', 'binance', 'bitcoin', 'ethereum', 'solana', 'paypal', 'visa', 'mastercard'],
      layout: 'grid-4',
      badgeTheme: 'dark-card',
      badgeRadius: 'lg',
      badgeSize: 'md',
      gap: 12,
      titleStyle: 'shield',
      customTitle: 'Pay with Crypto or Fiat',
      showSubtitle: true,
      customSubtitle: 'Decentralized Web3 wallets and card networks supported',
      containerBackground: 'slate-900',
      containerBorder: true,
      containerShadow: false,
      containerPadding: 24,
      alignment: 'center',
      grayscale: false,
    }
  },
  {
    id: 'compact-footer',
    name: 'Compact Footer',
    description: 'Small badges designed to nest seamlessly at the bottom of shop footers',
    config: {
      layout: 'compact-inline',
      badgeTheme: 'flat-borderless',
      badgeRadius: 'none',
      badgeSize: 'xs',
      gap: 8,
      titleStyle: 'none',
      customTitle: '',
      showSubtitle: false,
      containerBackground: 'transparent',
      containerBorder: false,
      containerShadow: false,
      alignment: 'center',
      grayscale: false,
    }
  }
];

export const PresetBar: React.FC<PresetBarProps> = ({ onApplyPreset }) => {
  return (
    <div id="presets-section" className="bg-slate-50 border-b border-slate-200 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold tracking-tight text-slate-900">
                Quick Start Presets
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a pre-designed layout tailored for checkout pages, footers, or crypto gateways
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onApplyPreset(preset.config)}
              className="group p-3 text-left rounded-xl bg-white border border-slate-200 hover:border-slate-400 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <p className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {preset.name}
                </p>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {preset.description}
                </p>
              </div>
              <span className="mt-3 text-[10px] font-semibold text-blue-600 inline-flex items-center gap-1">
                Apply Preset &rarr;
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
