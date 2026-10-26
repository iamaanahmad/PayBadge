# PayBadge – Payment Method Icons & "We Accept" Badge Generator

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE.md)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![Production Host](https://img.shields.io/badge/Hosted_at-PayBadge.cit.org.in-10b981)](https://paybadge.cit.org.in/)

**PayBadge** is a modern, responsive, open-source web application designed for e-commerce store owners, web developers, and UI/UX designers to customize, generate, and export pixel-perfect **"We Accept"** payment method badge sets and grid layouts.

Export clean, lightweight vector **SVG** or high-resolution **Retina PNG** assets (1x, 2x, 3x) ready to drop into Shopify, WooCommerce, Webflow, Next.js, or custom checkout funnels.

---

## ✨ Features

- **24+ Global & Regional Payment Networks**:
  - **Credit & Debit Cards**: Visa, Mastercard, American Express (Amex), Discover, JCB, Diners Club, UnionPay, Bancontact.
  - **Digital Wallets & Accelerated Checkout**: Apple Pay, Google Pay, PayPal, Shop Pay, Alipay, WeChat Pay, iDEAL, SEPA Direct Debit.
  - **India & Real-Time Payments**: UPI (Unified Payments Interface).
  - **Web3 & Cryptocurrencies**: MetaMask, Binance (Binance Pay), Bitcoin (BTC), Ethereum (ETH), Solana (SOL).
  - **Buy Now, Pay Later (BNPL)**: Klarna, Afterpay.
- **Authentic Brand Vector Assets**:
  - Powered by official vector graphics from `react-pay-icons` (Datatrans collection) and official brand repositories.
  - Preserved native `viewBox` geometry with automatic aspect ratio scaling and centering.
- **Multiple Layout Arrangements**:
  - Horizontal Row (single-line checkout strip)
  - Vertical Stack
  - 2-Column Grid
  - 3-Column Grid
  - 4-Column Grid
  - 5-Column Grid
  - Compact Wrap Strip (responsive 6-column auto-wrap)
- **Extensive Design & Aesthetic Controls**:
  - **Themes**: Clean White Card, Flat Borderless, Dark Sleek Card, Monochrome Grayscale (for luxury stores), Monochrome Dark, and Outline Stroke.
  - **Sizes**: Extra Small (XS), Small (SM), Medium (MD), Large (LG), Extra Large (XL), and **Custom** with live width & height sliders.
  - **Corner Radius**: Sharp (0px), Subtle (4px), Standard (8px), Smooth (14px), and Full Pill (rounded-full) with automatic SVG `<clipPath>` conformity.
  - **Spacing & Padding**: Live badge gap and container padding sliders.
  - **Alignment**: Left, Center, or Right.
  - **Security Trust Badges**: 256-bit SSL trust shield, security lock, or simple text header.
- **Live Preview & Store Simulation**:
  - Real-time vector rendering at 60 FPS.
  - 4 canvas preview modes: Transparent Checkerboard, Clean Light, Dark Slate, and a Simulated E-Commerce Checkout modal.
  - Zoom controls (50% to 200%) with live dimension counters.
- **Export Formats**:
  - **Download SVG**: Lightweight, resolution-independent vector file.
  - **Download PNG**: Client-side canvas rasterization with multi-scale exports (**1x**, **2x Retina**, and **3x Ultra-HD**).
  - **1-Click Copy SVG**: Instantly copied to clipboard.
  - **Embed Code Modal**: Copyable code snippets for Inline SVG, React/Next.js components, and Shopify Liquid snippets.
- **Web Security & Privacy**:
  - 100% client-side execution; zero financial data or card numbers are ever handled.
  - Strict input sanitization defends against XSS and SVG injection attacks.
  - `X-Content-Type-Options: nosniff` and `strict-origin-when-cross-origin` referrer policy.
- **SEO Optimized for Production**:
  - Pre-configured canonical URL: `https://paybadge.cit.org.in/`.
  - Schema.org `WebApplication` JSON-LD structured data.
  - OpenGraph and Twitter/X social preview cards.
  - Included `robots.txt` and `sitemap.xml`.

---

## 🚀 Quick Start

### Prerequisites

- Node.js (version 18 or higher)
- npm, pnpm, or bun

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/paybadge.git
   cd paybadge
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Run TypeScript verification**:
   ```bash
   npm run lint
   ```

---

## 📁 Project Structure

```text
├── public/
│   ├── robots.txt            # Search engine crawling rules
│   └── sitemap.xml           # XML sitemap for paybadge.cit.org.in
├── src/
│   ├── components/
│   │   ├── CodeExportModal.tsx # Embed code modal (SVG, React, Liquid)
│   │   ├── DesignControls.tsx  # Layout, theme, size, and header controls
│   │   ├── Footer.tsx          # Legal disclaimer & trademark attribution
│   │   ├── Header.tsx          # Navigation bar following top-bar contract
│   │   ├── LivePreview.tsx     # Canvas preview with zoom & export triggers
│   │   ├── MethodSelector.tsx  # Searchable checkbox list of payment methods
│   │   └── PresetBar.tsx       # 1-click quick design presets
│   ├── data/
│   │   └── paymentMethods.ts   # Catalog of 24+ payment vector assets
│   ├── types/
│   │   └── payment.ts          # TypeScript type definitions
│   ├── utils/
│   │   └── svgGenerator.ts     # Standalone SVG builder & PNG canvas exporter
│   ├── App.tsx                 # Main layout and state container
│   ├── index.css               # Tailwind CSS v4 styling
│   └── main.tsx                # React application entry point
├── index.html                  # HTML entry point with SEO & security meta
├── metadata.json               # Application metadata
├── package.json                # Project dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

---

## 🔒 Security Architecture

PayBadge is built as a static client-side generator:
- **No Sensitive Data**: PayBadge never collects, stores, or transmits credit card numbers, CVVs, expiration dates, or bank account credentials.
- **Input Sanitization**: All user-provided heading text and subtitles pass through `sanitizeTextInput()` to strip dangerous control characters and encode XML entities (`<`, `>`, `&`, `"`, `'`).
- **Color Validation**: Custom container colors pass through `sanitizeColor()` to prevent CSS or attribute breakout attacks.
- **Safe Canvas Operations**: PNG exports use isolated offscreen HTML5 `<canvas>` elements with local object URLs.

---

## ⚖️ Trademark Notice & Legal Disclaimer

All brand names, trade names, service marks, logos, and registered trademarks displayed on this site and included in generated badge files are the intellectual property of their respective owners (including Visa Inc., Mastercard Incorporated, American Express Company, Discover Financial Services, PayPal Inc., Apple Inc., Google LLC, ConsenSys Inc., Binance Holdings Ltd., NPCI, and others).

Their inclusion in this tool is intended exclusively for non-infringing, informational, and illustrative purposes to assist merchants, web developers, and designers in generating accurate payment acceptance indicators in accordance with each provider's merchant brand guidelines. PayBadge is not sponsored by, endorsed by, or affiliated with any of the referenced trademark holders.

---

## 🤝 Contributing

Contributions are warmly welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on code style, testing, and the process for submitting pull requests.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE.md](LICENSE.md) file for details. Third-party brand logos remain the property of their respective trademark owners.
