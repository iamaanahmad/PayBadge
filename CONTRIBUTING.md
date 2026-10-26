# Contributing to PayBadge

Thank you for your interest in contributing to **PayBadge**! Open source contributions help make payment method integration smoother for merchants and developers around the world.

Please take a moment to review this document before submitting issues or pull requests.

---

## Code of Conduct

We are committed to providing a welcoming, inclusive, and harassment-free experience for everyone. Please be respectful, constructive, and considerate in all communications.

---

## How Can You Contribute?

### 1. Reporting Bugs & Issues
If you encounter a broken icon, misaligned layout, or browser rendering issue:
- Check existing issues to see if it has already been reported.
- Open a new issue with a clear, descriptive title.
- Provide steps to reproduce, browser version, operating system, and screenshot/preview if applicable.

### 2. Suggesting Features & Layouts
Have an idea for a new badge layout, color theme, or export option?
- Open an issue describing your proposal, the target use case (e.g., Shopify drawer, mobile checkout, dark theme), and expected behavior.

### 3. Adding a New Payment Method
We welcome additions of globally or regionally significant payment networks, wallets, and crypto protocols.

---

## Adding a New Payment Method: Step-by-Step

Follow these steps to add a new payment gateway or card brand:

### Step 1: Obtain the Official Vector Artwork
- Always source the official brand logo from the network's merchant brand portal (e.g., [Datatrans Payment Logos](https://github.com/datatrans/payment-logos), Visa Brand Center, or official press kit).
- Clean up any unnecessary metadata, inline scripts, or embedded raster images.
- Ensure the SVG has a clean, well-proportioned `viewBox` (e.g. `0 0 120 40`, `0 0 60 40`, `0 0 100 64`, or `0 0 24 24`).

### Step 2: Add the Method Entry in `src/data/paymentMethods.ts`
Add your new method object to the `PAYMENT_METHODS` array:

```typescript
{
  id: 'method-id',                // Unique lowercase identifier (e.g., 'venmo')
  name: 'Brand Name',             // Official brand name (e.g., 'Venmo')
  category: 'wallets',            // 'cards' | 'wallets' | 'crypto' | 'bnpl'
  description: 'Short 1-line description of the network',
  brandColor: '#008CFF',          // Primary brand hex color
  defaultSelected: false,         // Set to false for new optional additions
  viewBox: '0 0 60 40',           // Native viewBox of the vector artwork
  svgInner: `...`                 // Clean inner SVG elements (paths, polygons, rects)
}
```

### Step 3: Add Trademark Attribution in `src/components/Footer.tsx`
Add a bullet point acknowledging the brand's registered trademark ownership under the appropriate column in `src/components/Footer.tsx`:
```tsx
<li>• <strong>Brand Name</strong> is a registered trademark of Brand Corporation.</li>
```

### Step 4: Verify Compilation & Alignment
Run the local build to ensure no TypeScript or syntax issues:
```bash
npm run lint
npm run build
```
Check the live preview at [http://localhost:3000](http://localhost:3000) across all badge sizes (XS to XL) and layout arrangements (horizontal row, vertical stack, grids).

---

## Development Workflow

1. **Fork and clone the repository**:
   ```bash
   git clone https://github.com/your-username/paybadge.git
   cd paybadge
   ```

2. **Create a topic branch**:
   ```bash
   git checkout -b feat/add-venmo-support
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the local server**:
   ```bash
   npm run dev
   ```

5. **Run tests & typecheck before committing**:
   ```bash
   npm run lint
   npm run build
   ```

---

## Pull Request Checklist

Before submitting your pull request, please verify:
- [ ] Code compiles cleanly with `npm run build` and `npm run lint`.
- [ ] Vector icons maintain original geometric proportions without stretching or clipping.
- [ ] Any user-controlled inputs remain sanitized against XSS / SVG injection.
- [ ] Trademark ownership notice is added in `Footer.tsx` if a new brand was introduced.
- [ ] Commit messages are concise and descriptive (e.g., `feat: add Venmo payment method`).

Thank you for helping make PayBadge better for everyone!
