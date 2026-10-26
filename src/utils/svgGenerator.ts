import { GeneratorConfig, PaymentMethod, BadgeRadius } from '../types/payment';

export function getRadiusPixels(radius: BadgeRadius, height: number): number {
  switch (radius) {
    case 'none':
      return 0;
    case 'sm':
      return 4;
    case 'md':
      return 8;
    case 'lg':
      return 14;
    case 'full':
      return Math.round(height / 2);
    default:
      return 8;
  }
}

export function getSizeDimensions(size: GeneratorConfig['badgeSize'], customW: number, customH: number) {
  switch (size) {
    case 'xs':
      return { width: 48, height: 30 };
    case 'sm':
      return { width: 60, height: 38 };
    case 'md':
      return { width: 74, height: 46 };
    case 'lg':
      return { width: 92, height: 58 };
    case 'xl':
      return { width: 114, height: 72 };
    case 'custom':
      return { width: customW || 74, height: customH || 46 };
    default:
      return { width: 74, height: 46 };
  }
}

export function generateSvgString(config: GeneratorConfig, methods: PaymentMethod[]): string {
  const { width: cardW, height: cardH } = getSizeDimensions(config.badgeSize, config.customWidth, config.customHeight);
  const gap = config.gap;
  const padding = config.containerPadding;
  const radius = getRadiusPixels(config.badgeRadius, cardH);
  const count = methods.length;

  if (count === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="90" viewBox="0 0 340 90">
      <rect width="100%" height="100%" fill="#F8FAFC" rx="10"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#94A3B8" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="14" font-weight="600">No payment methods selected</text>
    </svg>`;
  }

  // Calculate grid columns and rows based on layout
  let cols = 1;
  let rows = 1;

  switch (config.layout) {
    case 'horizontal-row':
      cols = count;
      rows = 1;
      break;
    case 'vertical-stack':
      cols = 1;
      rows = count;
      break;
    case 'grid-2':
      cols = Math.min(2, count);
      rows = Math.ceil(count / 2);
      break;
    case 'grid-3':
      cols = Math.min(3, count);
      rows = Math.ceil(count / 3);
      break;
    case 'grid-4':
      cols = Math.min(4, count);
      rows = Math.ceil(count / 4);
      break;
    case 'grid-5':
      cols = Math.min(5, count);
      rows = Math.ceil(count / 5);
      break;
    case 'compact-inline':
      cols = Math.min(6, count);
      rows = Math.ceil(count / 6);
      break;
  }

  const gridWidth = cols * cardW + (cols - 1) * gap;
  const gridHeight = rows * cardH + (rows - 1) * gap;

  // Header height
  let headerHeight = 0;
  if (config.titleStyle !== 'none' && config.customTitle.trim().length > 0) {
    headerHeight += 38;
    if (config.showSubtitle && config.customSubtitle.trim().length > 0) {
      headerHeight += 20;
    }
  }

  const totalWidth = gridWidth + padding * 2;
  const totalHeight = gridHeight + headerHeight + padding * 2;

  // Container styling
  let containerBgFill = 'none';
  if (config.containerBackground === 'white') containerBgFill = '#FFFFFF';
  else if (config.containerBackground === 'slate-50') containerBgFill = '#F8FAFC';
  else if (config.containerBackground === 'slate-900') containerBgFill = '#0F172A';
  else if (config.containerBackground === 'custom') containerBgFill = sanitizeColor(config.customContainerBg, '#FFFFFF');

  let containerStroke = config.containerBorder ? '#E2E8F0' : 'none';
  if (config.containerBackground === 'slate-900' && config.containerBorder) {
    containerStroke = '#334155';
  }

  // Card theme styling
  let cardFill = '#FFFFFF';
  let cardBorder = '#E2E8F0';
  let cardStrokeWidth = 1;
  let textColor = '#0F172A';

  if (config.badgeTheme === 'flat-borderless') {
    cardFill = 'none';
    cardBorder = 'none';
    cardStrokeWidth = 0;
  } else if (config.badgeTheme === 'dark-card') {
    cardFill = '#18181B';
    cardBorder = '#27272A';
    textColor = '#F8FAFC';
  } else if (config.badgeTheme === 'outline') {
    cardFill = 'none';
    cardBorder = config.containerBackground === 'slate-900' ? '#475569' : '#CBD5E1';
    cardStrokeWidth = 1.25;
  } else if (config.badgeTheme === 'monochrome-light') {
    cardFill = '#FFFFFF';
    cardBorder = '#E2E8F0';
    textColor = '#0F172A';
  } else if (config.badgeTheme === 'monochrome-dark') {
    cardFill = '#18181B';
    cardBorder = '#27272A';
    textColor = '#F8FAFC';
  }

  // Generate header SVG markup
  let headerMarkup = '';
  if (config.titleStyle !== 'none' && config.customTitle.trim().length > 0) {
    let titleX = padding;
    let anchor = 'start';
    if (config.alignment === 'center') {
      titleX = totalWidth / 2;
      anchor = 'middle';
    } else if (config.alignment === 'right') {
      titleX = totalWidth - padding;
      anchor = 'end';
    }

    let titleColor = config.containerBackground === 'slate-900' ? '#F8FAFC' : '#1E293B';
    let subtitleColor = config.containerBackground === 'slate-900' ? '#94A3B8' : '#64748B';

    let iconSvg = '';
    if (config.titleStyle === 'shield') {
      const iconX = config.alignment === 'center' ? titleX - 90 : (config.alignment === 'right' ? titleX - 180 : titleX);
      iconSvg = `<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="none" stroke="${titleColor}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" transform="translate(${iconX - 22}, ${padding + 3}) scale(0.7)"/>`;
    } else if (config.titleStyle === 'lock') {
      const iconX = config.alignment === 'center' ? titleX - 80 : (config.alignment === 'right' ? titleX - 160 : titleX);
      iconSvg = `<g transform="translate(${iconX - 20}, ${padding + 3}) scale(0.7)"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" fill="none" stroke="${titleColor}" stroke-width="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4" fill="none" stroke="${titleColor}" stroke-width="2"/></g>`;
    }

    headerMarkup = `
      <g class="header-group">
        ${iconSvg}
        <text x="${titleX}" y="${padding + 20}" text-anchor="${anchor}" fill="${titleColor}" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="0.3">${sanitizeTextInput(config.customTitle)}</text>
        ${config.showSubtitle && config.customSubtitle.trim().length > 0 ? `
          <text x="${titleX}" y="${padding + 38}" text-anchor="${anchor}" fill="${subtitleColor}" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-size="11" font-weight="400">${sanitizeTextInput(config.customSubtitle)}</text>
        ` : ''}
      </g>
    `;
  }

  // Calculate start positions
  const startY = padding + headerHeight;
  let startX = padding;
  if (config.alignment === 'center') {
    startX = (totalWidth - gridWidth) / 2;
  } else if (config.alignment === 'right') {
    startX = totalWidth - padding - gridWidth;
  }

  // Generate individual card items with nested SVG for automatic centering and proportion preservation
  const cardsMarkup = methods.map((method, idx) => {
    let r = 0;
    let c = 0;

    switch (config.layout) {
      case 'horizontal-row':
        r = 0;
        c = idx;
        break;
      case 'vertical-stack':
        r = idx;
        c = 0;
        break;
      case 'grid-2':
        r = Math.floor(idx / 2);
        c = idx % 2;
        break;
      case 'grid-3':
        r = Math.floor(idx / 3);
        c = idx % 3;
        break;
      case 'grid-4':
        r = Math.floor(idx / 4);
        c = idx % 4;
        break;
      case 'grid-5':
        r = Math.floor(idx / 5);
        c = idx % 5;
        break;
      case 'compact-inline':
        r = Math.floor(idx / 6);
        c = idx % 6;
        break;
    }

    const itemX = startX + c * (cardW + gap);
    const itemY = startY + r * (cardH + gap);

    // Dynamic inner padding for breathing space inside card
    const padX = config.badgeTheme === 'flat-borderless' ? 0 : Math.max(1, Math.round(cardW * 0.04));
    const padY = config.badgeTheme === 'flat-borderless' ? 0 : Math.max(1, Math.round(cardH * 0.04));
    const innerW = cardW - padX * 2;
    const innerH = cardH - padY * 2;
    const clipId = `clip-${method.id}-${idx}`;

    // Apply color / grayscale / dark theme adjustments
    let innerSvg = method.svgInner;

    const isDarkSurface = config.badgeTheme === 'dark-card' || config.badgeTheme === 'monochrome-dark' || (config.badgeTheme === 'flat-borderless' && config.containerBackground === 'slate-900');

    if (isDarkSurface) {
      innerSvg = innerSvg.replace(/fill="currentColor"/g, 'fill="#FFFFFF"');
    } else {
      innerSvg = innerSvg.replace(/fill="currentColor"/g, `fill="${textColor}"`);
    }

    if (config.badgeTheme === 'monochrome-dark') {
      innerSvg = innerSvg.replace(/class="brand-fill"/g, 'fill="#FFFFFF"');
    } else if (config.badgeTheme === 'monochrome-light') {
      innerSvg = innerSvg.replace(/class="brand-fill"/g, 'fill="#0F172A"');
    }

    // Shadow definition
    const shadowFilter = config.containerShadow && config.badgeTheme === 'colored-card' ? 'filter="url(#badge-shadow)"' : '';

    return `
      <g transform="translate(${itemX}, ${itemY})" class="payment-badge" id="badge-${method.id}">
        <clipPath id="${clipId}">
          <rect width="${cardW}" height="${cardH}" rx="${radius}" />
        </clipPath>
        <!-- Badge Surface -->
        <rect width="${cardW}" height="${cardH}" rx="${radius}" fill="${cardFill}" stroke="${cardBorder}" stroke-width="${cardStrokeWidth}" ${shadowFilter} />
        <!-- Logo Nested SVG with Auto Centering & Radius Clip -->
        <g clip-path="url(#${clipId})">
          <svg x="${padX}" y="${padY}" width="${innerW}" height="${innerH}" viewBox="${method.viewBox}" preserveAspectRatio="xMidYMid meet">
            ${innerSvg}
          </svg>
        </g>
        <!-- Overlay Border to keep crisp outline -->
        ${config.badgeTheme !== 'flat-borderless' ? `
        <rect width="${cardW}" height="${cardH}" rx="${radius}" fill="none" stroke="${cardBorder}" stroke-width="${cardStrokeWidth}" />
        ` : ''}
      </g>
    `;
  }).join('\n');

  // Filter definitions for monochrome, drop shadow
  const defs = `
    <defs>
      <filter id="grayscale-filter">
        <feColorMatrix type="matrix" values="0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0 0 0.3333 0.3333 0 0 0 0 0 1 0"/>
      </filter>
      <filter id="badge-shadow" x="-8%" y="-8%" width="120%" height="120%">
        <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" flood-color="#0F172A" flood-opacity="0.08"/>
      </filter>
    </defs>
  `;

  const isGrayscale = config.grayscale || config.badgeTheme === 'monochrome-light' || config.badgeTheme === 'monochrome-dark';
  const grayscaleClass = isGrayscale ? 'filter="url(#grayscale-filter)"' : '';

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="${totalHeight}" viewBox="0 0 ${totalWidth} ${totalHeight}">
  ${defs}
  <!-- Container Background -->
  ${containerBgFill !== 'none' || config.containerBorder ? `
  <rect width="100%" height="100%" rx="12" fill="${containerBgFill}" stroke="${containerStroke}" stroke-width="${config.containerBorder ? 1 : 0}"/>
  ` : ''}
  ${headerMarkup}
  <g class="badges-container" ${grayscaleClass}>
    ${cardsMarkup}
  </g>
</svg>`;
}

export function sanitizeTextInput(unsafe: string, maxLength = 80): string {
  if (!unsafe) return '';
  // Truncate to maximum safe length to prevent buffer/DOM bloat
  const trimmed = unsafe.slice(0, maxLength);
  // Strip control characters (except standard space) and unicode direction overrides
  const clean = trimmed.replace(/[\x00-\x1F\x7F\u202A-\u202E]/g, '');
  // Escape XML sensitive characters
  return clean.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&#39;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export function sanitizeColor(color: string, fallback = '#FFFFFF'): string {
  if (!color) return fallback;
  const clean = color.trim();
  // Strictly allow standard 3, 4, 6, or 8 digit hex color codes
  if (/^#([0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(clean)) {
    return clean;
  }
  return fallback;
}

export function downloadSvg(svgContent: string, filename = 'payment-methods.svg') {
  const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

export function exportAsPng(
  svgContent: string,
  scale = 2,
  filename = 'payment-methods.png'
): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const blobUrl = URL.createObjectURL(svgBlob);

    img.onload = () => {
      try {
        const parsedW = parseInt(svgContent.match(/width="(\d+)"/)?.[1] || '400', 10);
        const parsedH = parseInt(svgContent.match(/height="(\d+)"/)?.[1] || '120', 10);
        const targetW = img.naturalWidth > 0 ? img.naturalWidth : parsedW;
        const targetH = img.naturalHeight > 0 ? img.naturalHeight : parsedH;

        const canvas = document.createElement('canvas');
        canvas.width = targetW * scale;
        canvas.height = targetH * scale;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get 2D canvas context'));
          return;
        }

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';
        ctx.drawImage(img, 0, 0, targetW * scale, targetH * scale);

        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error('Failed to create PNG blob'));
            return;
          }
          const pngUrl = URL.createObjectURL(blob);
          const anchor = document.createElement('a');
          anchor.href = pngUrl;
          anchor.download = filename;
          document.body.appendChild(anchor);
          anchor.click();
          document.body.removeChild(anchor);
          URL.revokeObjectURL(pngUrl);
          URL.revokeObjectURL(blobUrl);
          resolve();
        }, 'image/png');
      } catch (err) {
        URL.revokeObjectURL(blobUrl);
        reject(err);
      }
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(blobUrl);
      reject(err);
    };

    img.src = blobUrl;
  });
}
