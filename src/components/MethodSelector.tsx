import React, { useState, useMemo } from 'react';
import { PaymentMethod, PaymentCategory } from '../types/payment';
import { CATEGORIES } from '../data/paymentMethods';
import { Search, CheckSquare, Square, RotateCcw, ArrowUp, ArrowDown } from 'lucide-react';

interface MethodSelectorProps {
  methods: PaymentMethod[];
  selectedIds: string[];
  onToggleMethod: (id: string) => void;
  onSelectAll: () => void;
  onClearAll: () => void;
  onResetDefault: () => void;
  onMoveMethod: (id: string, direction: 'up' | 'down') => void;
}

export const MethodSelector: React.FC<MethodSelectorProps> = ({
  methods,
  selectedIds,
  onToggleMethod,
  onSelectAll,
  onClearAll,
  onResetDefault,
  onMoveMethod,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<PaymentCategory>('all');

  const filteredMethods = useMemo(() => {
    return methods.filter((method) => {
      const matchesSearch =
        method.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        method.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        method.id.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === 'all' || method.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [methods, searchQuery, activeCategory]);

  return (
    <div id="methods-section" className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            1. Select Payment Methods
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span className="font-semibold text-slate-900">{selectedIds.length}</span> of {methods.length} methods selected
            <span aria-hidden="true">·</span>
            <span>Tick to include in your set</span>
          </div>
        </div>

        {/* Bulk Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onSelectAll}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
          >
            Select All
          </button>
          <button
            onClick={onClearAll}
            className="px-2.5 py-1 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors whitespace-nowrap"
          >
            Clear All
          </button>
          <button
            onClick={onResetDefault}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors whitespace-nowrap"
            title="Reset to the 10 requested methods"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset Default</span>
          </button>
        </div>
      </div>

      {/* Search and Category Filters */}
      <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Visa, PayPal, MetaMask, Apple Pay..."
            className="w-full pl-9 pr-3 py-1.5 text-xs text-slate-900 placeholder:text-slate-400 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as PaymentCategory)}
              className={`px-3 py-1 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                activeCategory === cat.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Methods Selection Grid */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredMethods.map((method) => {
          const isSelected = selectedIds.includes(method.id);
          const currentIndex = selectedIds.indexOf(method.id);

          return (
            <div
              key={method.id}
              onClick={() => onToggleMethod(method.id)}
              className={`group relative p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between gap-2.5 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/40 shadow-2xs'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Checkbox Icon */}
                <div className="shrink-0 text-slate-400 group-hover:text-slate-600">
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-blue-600" />
                  ) : (
                    <Square className="w-4 h-4" />
                  )}
                </div>

                {/* Badge SVG Icon Preview */}
                <div className="w-12 h-7 bg-white rounded border border-slate-200 shrink-0 shadow-2xs flex items-center justify-center p-1 overflow-hidden">
                  <svg
                    viewBox={method.viewBox}
                    preserveAspectRatio="xMidYMid meet"
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: method.svgInner }}
                  />
                </div>

                {/* Method Name & Category */}
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 truncate">
                    {method.name}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate capitalize">
                    {method.category === 'bnpl' ? 'Buy Now Pay Later' : method.category}
                  </p>
                </div>
              </div>

              {/* Order Controls (if selected) */}
              {isSelected && (
                <div
                  className="flex items-center gap-0.5 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onMoveMethod(method.id, 'up')}
                    disabled={currentIndex === 0}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 transition-colors"
                    title="Move left / up in sequence"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onMoveMethod(method.id, 'down')}
                    disabled={currentIndex === selectedIds.length - 1}
                    className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 transition-colors"
                    title="Move right / down in sequence"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredMethods.length === 0 && (
        <div className="p-8 text-center text-xs text-slate-500">
          No payment methods found matching &quot;{searchQuery}&quot;.
        </div>
      )}
    </div>
  );
};
