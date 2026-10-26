import React from 'react';
import { ShieldAlert, ExternalLink, Scale, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="legal-section" className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Web Security & Host Information Banner */}
        <div id="security-section" className="bg-slate-800/90 rounded-xl p-5 border border-slate-700/80 mb-8">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide flex items-center gap-2">
                  <span>Web Security &amp; Host Infrastructure</span>
                  <span className="font-mono text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                    paybadge.cit.org.in
                  </span>
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">TLS 1.3 Encrypted · Client-Side Isolated</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                PayBadge is engineered with strict client-side data boundaries. <strong>Zero payment card details, CVVs, or personal financial data are ever collected, processed, or transmitted.</strong> All SVG generation, canvas rasterization, and vector file downloads execute purely within your local browser sandbox.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>Input sanitization defends against SVG/XSS injection</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>Strict Origin referrer &amp; nosniff content security</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                  <span>Zero tracking scripts, cookies, or telemetry</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Disclaimer Banner */}
        <div className="bg-slate-800/60 rounded-xl p-5 border border-slate-700/80 mb-10">
          <div className="flex items-start gap-3">
            <Scale className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                Trademark Notice &amp; Legal Disclaimer
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                All brand names, trade names, service marks, logos, and registered trademarks displayed on this site and included in generated badge files are the intellectual property of their respective owners. Their inclusion in this tool is intended exclusively for non-infringing, informational, and illustrative purposes to help merchants, web developers, and designers generate accurate &quot;accepted payment methods&quot; checkout indicators in accordance with applicable merchant brand presentation guidelines.
              </p>
              <p className="text-xs text-slate-400 leading-relaxed">
                PayBadge is an independent developer utility and is not sponsored, endorsed, affiliated with, or officially associated with Visa Inc., Mastercard Incorporated, American Express Company, Discover Financial Services, PayPal Inc., Apple Inc., Google LLC, ConsenSys Inc. (MetaMask), Binance Holdings Ltd., NPCI (UPI), or any of their affiliates or subsidiaries.
              </p>
            </div>
          </div>
        </div>

        {/* Specific Trademark Attributions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10 border-b border-slate-800">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
              Card Networks
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
              <li>• <strong>Visa</strong> is a registered trademark of Visa International Service Association.</li>
              <li>• <strong>Mastercard</strong> and the circles design are registered trademarks of Mastercard International Incorporated.</li>
              <li>• <strong>American Express</strong> (Amex) is a registered trademark of American Express Company.</li>
              <li>• <strong>Discover</strong> is a registered service mark of Discover Financial Services.</li>
              <li>• <strong>JCB</strong> is a registered trademark of JCB Co., Ltd.</li>
              <li>• <strong>UnionPay</strong> is a registered trademark of China UnionPay Co., Ltd.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
              Digital Wallets & Fintech
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
              <li>• <strong>Apple Pay</strong> and the Apple logo are trademarks of Apple Inc., registered in the U.S. and other countries.</li>
              <li>• <strong>Google Pay</strong> is a trademark of Google LLC.</li>
              <li>• <strong>PayPal</strong> and the double P logo are registered trademarks of PayPal, Inc.</li>
              <li>• <strong>UPI</strong> (Unified Payments Interface) is a trademark of National Payments Corporation of India (NPCI).</li>
              <li>• <strong>Cash App</strong> is a registered trademark of Block, Inc.</li>
              <li>• <strong>Shop Pay</strong> is a registered trademark of Shopify Inc.</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-2">
              Crypto & BNPL Platforms
            </h4>
            <ul className="space-y-1.5 text-[11px] text-slate-400 leading-relaxed">
              <li>• <strong>MetaMask</strong> and the fox logo are trademarks of ConsenSys Software Inc.</li>
              <li>• <strong>Binance</strong> and Binance Pay are trademarks of Binance Holdings Ltd.</li>
              <li>• <strong>Bitcoin</strong> and <strong>Ethereum</strong> are decentralized open-source cryptocurrency protocols.</li>
              <li>• <strong>Klarna</strong> is a registered trademark of Klarna Bank AB.</li>
              <li>• <strong>Afterpay</strong> is a registered trademark of Afterpay Pty Ltd.</li>
              <li>• <strong>Stripe</strong> is a registered trademark of Stripe, Inc.</li>
            </ul>
          </div>
        </div>

        {/* Merchant Guidelines Best Practice Tips */}
        <div className="py-8 border-b border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-6 text-[11px]">
          <div>
            <h5 className="font-bold text-slate-200 mb-1">Equal Prominence Rule</h5>
            <p className="text-slate-400 leading-relaxed">
              Major card brand guidelines (e.g. Visa & Mastercard) require merchant checkout screens to display all accepted payment networks with equal visual weight and parity.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-slate-200 mb-1">Maintain Aspect Ratio</h5>
            <p className="text-slate-400 leading-relaxed">
              Never stretch, skew, crop, or recolor individual brand marks independently. Vector SVGs generated by PayBadge preserve original logo geometric proportions.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-slate-200 mb-1">Clear Acceptance Signaling</h5>
            <p className="text-slate-400 leading-relaxed">
              Place accepted payment indicators prominently on product pages, cart drawers, and website footers to reduce cart abandonment and establish buyer security trust.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} PayBadge. Designed for online merchants, developers, and e-commerce designers worldwide.
          </p>
          <div className="flex items-center gap-4">
            <span>Responsive SVG & High-DPI PNG</span>
            <span aria-hidden="true">·</span>
            <span>Commercial & Personal Use</span>
            <span aria-hidden="true">·</span>
            <span>Zero Tracking</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
