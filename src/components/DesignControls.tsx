import React from 'react';
import { GeneratorConfig, LayoutType, BadgeTheme, BadgeRadius, BadgeSize, TitleStyle } from '../types/payment';
import {
  Rows3,
  Columns3,
  Grid2X2,
  Grid3X3,
  LayoutGrid,
  Shield,
  Lock,
  Type,
  EyeOff,
  Palette,
  Sliders,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';

interface DesignControlsProps {
  config: GeneratorConfig;
  onChange: (updated: Partial<GeneratorConfig>) => void;
}

export const DesignControls: React.FC<DesignControlsProps> = ({ config, onChange }) => {
  return (
    <div id="customize-section" className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 space-y-6">
      <div>
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          2. Customize Design & Layout
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Choose grid arrangements, badge card aesthetics, security badges, and container styling
        </p>
      </div>

      {/* 1. Layout Mode */}
      <div>
        <label className="text-xs font-bold text-slate-800 flex items-center justify-between mb-2">
          <span>Layout Arrangement</span>
          <span className="text-[11px] font-normal text-slate-500 capitalize">
            {config.layout.replace('-', ' ')}
          </span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => onChange({ layout: 'horizontal-row' })}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              config.layout === 'horizontal-row'
                ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-2xs'
                : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Rows3 className="w-4 h-4 shrink-0 text-slate-500" />
            <span className="truncate">Horizontal Row</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ layout: 'vertical-stack' })}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              config.layout === 'vertical-stack'
                ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-2xs'
                : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Columns3 className="w-4 h-4 shrink-0 text-slate-500" />
            <span className="truncate">Vertical Stack</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ layout: 'grid-2' })}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              config.layout === 'grid-2'
                ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-2xs'
                : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Grid2X2 className="w-4 h-4 shrink-0 text-slate-500" />
            <span className="truncate">2 Col Grid</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ layout: 'grid-3' })}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              config.layout === 'grid-3'
                ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-2xs'
                : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Grid3X3 className="w-4 h-4 shrink-0 text-slate-500" />
            <span className="truncate">3 Col Grid</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ layout: 'grid-4' })}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              config.layout === 'grid-4'
                ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-2xs'
                : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0 text-slate-500" />
            <span className="truncate">4 Col Grid</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ layout: 'grid-5' })}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              config.layout === 'grid-5'
                ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-2xs'
                : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <LayoutGrid className="w-4 h-4 shrink-0 text-slate-500" />
            <span className="truncate">5 Col Grid</span>
          </button>

          <button
            type="button"
            onClick={() => onChange({ layout: 'compact-inline' })}
            className={`col-span-2 flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
              config.layout === 'compact-inline'
                ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-2xs'
                : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            <Rows3 className="w-4 h-4 shrink-0 text-slate-500" />
            <span className="truncate">Compact Wrap Strip (6 Cols / Wrap)</span>
          </button>
        </div>
      </div>

      {/* 2. Badge Aesthetic Style */}
      <div className="pt-4 border-t border-slate-100">
        <label className="text-xs font-bold text-slate-800 flex items-center justify-between mb-2">
          <span>Badge Card Theme</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {[
            { id: 'colored-card', label: 'Clean White Card', desc: 'White surface, subtle border' },
            { id: 'flat-borderless', label: 'Flat Transparent', desc: 'No background box' },
            { id: 'dark-card', label: 'Dark Sleek Card', desc: 'Charcoal surface, glowing edge' },
            { id: 'monochrome-light', label: 'Monochrome Grayscale', desc: 'Minimalist high-end store' },
            { id: 'monochrome-dark', label: 'Monochrome Dark', desc: 'White icons on dark card' },
            { id: 'outline', label: 'Outline Stroke', desc: 'Transparent with crisp border' },
          ].map((theme) => (
            <button
              key={theme.id}
              type="button"
              onClick={() => onChange({ badgeTheme: theme.id as BadgeTheme })}
              className={`p-2.5 text-left rounded-lg border transition-all ${
                config.badgeTheme === theme.id
                  ? 'border-blue-600 bg-blue-50/50 shadow-2xs'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <p className={`text-xs font-bold ${config.badgeTheme === theme.id ? 'text-blue-900' : 'text-slate-800'}`}>
                {theme.label}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                {theme.desc}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Badge Sizing & Corner Radius */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Size Presets */}
        <div>
          <label className="text-xs font-bold text-slate-800 block mb-2">
            Badge Size
          </label>
          <div className="grid grid-cols-6 gap-1 p-1 bg-slate-100 rounded-lg">
            {[
              { id: 'xs', label: 'XS' },
              { id: 'sm', label: 'SM' },
              { id: 'md', label: 'MD' },
              { id: 'lg', label: 'LG' },
              { id: 'xl', label: 'XL' },
              { id: 'custom', label: 'Custom' },
            ].map((size) => (
              <button
                key={size.id}
                type="button"
                onClick={() => onChange({ badgeSize: size.id as BadgeSize })}
                className={`py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                  config.badgeSize === size.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>

          {config.badgeSize === 'custom' && (
            <div className="grid grid-cols-2 gap-3 mt-3 p-2.5 bg-slate-50 border border-slate-200 rounded-lg">
              <div>
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Width</span>
                  <span className="font-mono text-slate-500">{config.customWidth}px</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="140"
                  step="2"
                  value={config.customWidth}
                  onChange={(e) => onChange({ customWidth: Number(e.target.value) })}
                  className="w-full accent-slate-900 cursor-pointer"
                />
              </div>
              <div>
                <div className="flex justify-between items-center text-[11px] font-semibold text-slate-700 mb-1">
                  <span>Height</span>
                  <span className="font-mono text-slate-500">{config.customHeight}px</span>
                </div>
                <input
                  type="range"
                  min="24"
                  max="90"
                  step="2"
                  value={config.customHeight}
                  onChange={(e) => onChange({ customHeight: Number(e.target.value) })}
                  className="w-full accent-slate-900 cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>

        {/* Corner Radius */}
        <div>
          <label className="text-xs font-bold text-slate-800 block mb-2">
            Corner Radius
          </label>
          <div className="grid grid-cols-5 gap-1.5 p-1 bg-slate-100 rounded-lg">
            {[
              { id: 'none', label: '0px' },
              { id: 'sm', label: '4px' },
              { id: 'md', label: '8px' },
              { id: 'lg', label: '14px' },
              { id: 'full', label: 'Pill' },
            ].map((rad) => (
              <button
                key={rad.id}
                type="button"
                onClick={() => onChange({ badgeRadius: rad.id as BadgeRadius })}
                className={`py-1 text-xs font-semibold rounded-md transition-all ${
                  config.badgeRadius === rad.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {rad.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Gap, Padding & Alignment */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Gap Slider */}
        <div>
          <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
            <span>Badge Spacing</span>
            <span className="font-mono text-slate-500 font-normal">{config.gap}px</span>
          </div>
          <input
            type="range"
            min="4"
            max="28"
            step="2"
            value={config.gap}
            onChange={(e) => onChange({ gap: Number(e.target.value) })}
            className="w-full accent-slate-900 cursor-pointer"
          />
        </div>

        {/* Container Padding Slider */}
        <div>
          <div className="flex justify-between items-center text-xs font-bold text-slate-800 mb-1.5">
            <span>Container Padding</span>
            <span className="font-mono text-slate-500 font-normal">{config.containerPadding}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="40"
            step="4"
            value={config.containerPadding}
            onChange={(e) => onChange({ containerPadding: Number(e.target.value) })}
            className="w-full accent-slate-900 cursor-pointer"
          />
        </div>

        {/* Alignment */}
        <div>
          <label className="text-xs font-bold text-slate-800 block mb-1.5">
            Alignment
          </label>
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              type="button"
              onClick={() => onChange({ alignment: 'left' })}
              className={`flex-1 py-1 flex justify-center items-center rounded-md text-xs transition-colors ${
                config.alignment === 'left' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Align Left"
            >
              <AlignLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onChange({ alignment: 'center' })}
              className={`flex-1 py-1 flex justify-center items-center rounded-md text-xs transition-colors ${
                config.alignment === 'center' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Align Center"
            >
              <AlignCenter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onChange({ alignment: 'right' })}
              className={`flex-1 py-1 flex justify-center items-center rounded-md text-xs transition-colors ${
                config.alignment === 'right' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Align Right"
            >
              <AlignRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Header & Security Trust Badges */}
      <div className="pt-4 border-t border-slate-100 space-y-3">
        <label className="text-xs font-bold text-slate-800 block">
          Trust & Heading Header
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'simple', label: 'Text Only', icon: Type },
            { id: 'shield', label: 'SSL Shield', icon: Shield },
            { id: 'lock', label: 'Lock Security', icon: Lock },
            { id: 'none', label: 'No Header', icon: EyeOff },
          ].map((style) => {
            const Icon = style.icon;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => onChange({ titleStyle: style.id as TitleStyle })}
                className={`flex items-center gap-2 p-2 rounded-lg border text-xs font-medium transition-all ${
                  config.titleStyle === style.id
                    ? 'border-blue-600 bg-blue-50/50 text-blue-900 font-semibold shadow-2xs'
                    : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-slate-500" />
                <span>{style.label}</span>
              </button>
            );
          })}
        </div>

        {config.titleStyle !== 'none' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="text-[11px] font-medium text-slate-600 block mb-1">
                Heading Text
              </label>
              <input
                type="text"
                value={config.customTitle}
                onChange={(e) => onChange({ customTitle: e.target.value })}
                placeholder="We Accept"
                className="w-full px-3 py-1.5 text-xs text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[11px] font-medium text-slate-600">
                  Subtitle Trust Notice
                </label>
                <input
                  type="checkbox"
                  checked={config.showSubtitle}
                  onChange={(e) => onChange({ showSubtitle: e.target.checked })}
                  className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
                />
              </div>
              <input
                type="text"
                disabled={!config.showSubtitle}
                value={config.customSubtitle}
                onChange={(e) => onChange({ customSubtitle: e.target.value })}
                placeholder="Guaranteed 256-bit SSL encrypted checkout"
                className="w-full px-3 py-1.5 text-xs text-slate-900 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 disabled:bg-slate-50 disabled:text-slate-400"
              />
            </div>
          </div>
        )}
      </div>

      {/* 6. Container Box & Background */}
      <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-800 block mb-2">
            Container Canvas
          </label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-lg">
            {[
              { id: 'transparent', label: 'Clear' },
              { id: 'white', label: 'White' },
              { id: 'slate-50', label: 'Off-White' },
              { id: 'slate-900', label: 'Dark' },
            ].map((bg) => (
              <button
                key={bg.id}
                type="button"
                onClick={() => onChange({ containerBackground: bg.id as GeneratorConfig['containerBackground'] })}
                className={`py-1 text-xs font-semibold rounded-md transition-all ${
                  config.containerBackground === bg.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {bg.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-800 block mb-2">
            Container Accents
          </label>
          <div className="flex items-center gap-4 text-xs text-slate-700 h-9">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={config.containerBorder}
                onChange={(e) => onChange({ containerBorder: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span>Border</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={config.containerShadow}
                onChange={(e) => onChange({ containerShadow: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span>Shadow</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={config.grayscale}
                onChange={(e) => onChange({ grayscale: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5 cursor-pointer"
              />
              <span>Grayscale</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
