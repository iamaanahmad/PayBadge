export type PaymentCategory = 'all' | 'cards' | 'wallets' | 'crypto' | 'bnpl';

export type LayoutType =
  | 'horizontal-row'
  | 'vertical-stack'
  | 'grid-2'
  | 'grid-3'
  | 'grid-4'
  | 'grid-5'
  | 'compact-inline';

export type BadgeTheme =
  | 'colored-card'      // White card, subtle border, official logo colors
  | 'flat-borderless'   // Transparent background, official colors
  | 'dark-card'         // Dark sleek card, official colors
  | 'monochrome-light'  // Grayscale dark icons for minimal white store
  | 'monochrome-dark'   // White/light gray monochrome icons
  | 'outline';          // Stroke-only card with clean border

export type BadgeRadius = 'none' | 'sm' | 'md' | 'lg' | 'full';

export type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'custom';

export type TitleStyle = 'simple' | 'shield' | 'lock' | 'none';

export interface PaymentMethod {
  id: string;
  name: string;
  category: 'cards' | 'wallets' | 'crypto' | 'bnpl';
  description: string;
  brandColor: string;
  defaultSelected: boolean;
  viewBox: string; // e.g. "0 0 100 64" or custom for crisp vector centering
  svgInner: string; // Inner SVG contents
  aspectRatio?: number; // width / height, standard ~ 1.56 (50/32)
}

export interface GeneratorConfig {
  selectedIds: string[];
  layout: LayoutType;
  badgeTheme: BadgeTheme;
  badgeRadius: BadgeRadius;
  badgeSize: BadgeSize;
  customWidth: number;
  customHeight: number;
  gap: number;
  showLabels: boolean;
  grayscale: boolean;
  grayscaleOnHover: boolean;
  
  // Header / Trust
  titleStyle: TitleStyle;
  customTitle: string;
  showSubtitle: boolean;
  customSubtitle: string;
  
  // Container
  containerBackground: 'transparent' | 'white' | 'slate-50' | 'slate-900' | 'custom';
  customContainerBg: string;
  containerBorder: boolean;
  containerShadow: boolean;
  containerPadding: number;
  alignment: 'left' | 'center' | 'right';
  maxWidth: number;
}
