// Core TypeScript definitions for Uniqode Card Templates
import * as React from 'react';

// ============================================================================
// CORE DATA INTERFACES
// ============================================================================

export interface ContactInfo {
  value: string;
  label: string;
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  instagram?: string;
  facebook?: string;
  youtube?: string;
  whatsapp?: string;
  telegram?: string;
  tiktok?: string;
  snapchat?: string;
  vimeo?: string;
  wistia?: string;
  twitch?: string;
  discord?: string;
  pinterest?: string;
  yelp?: string;
  paypal?: string;
  venmo?: string;
  cashapp?: string;
  calendly?: string;
  shopify?: string;
  dribbble?: string;
  behance?: string;
  custom_url?: string;
}

export interface Typography {
  user_info?: {
    google_font_style?: string;
    google_font_colour?: string;
    google_font_size?: number;
  };
  company_details?: {
    google_font_style?: string;
    google_font_colour?: string;
    google_font_size?: number;
  };
  contact_details?: {
    google_font_style?: string;
    google_font_colour?: string;
    google_font_size?: number;
  };
  button?: {
    google_font_style?: string;
    google_font_colour?: string;
    google_font_size?: number;
  };
  bio?: {
    google_font_style?: string;
    google_font_colour?: string;
    google_font_size?: number;
  };
}

export interface Background {
  type: 'color' | 'gradient' | 'image';
  value: string;
}

export interface Customizations {
  background_color?: string;
  user_info_color?: string;
  secondary_color?: string;
  button_color?: string;
  icon_color?: string;
  font_style?: string;
  title_font_size?: number;
  font_type?: string;
  custom_font_url?: string;
  custom_font_style?: string;
  profile_info?: string;
  company_details?: string;
  contact_details?: string;
  button?: string;
  typography?: Typography;
  background?: Background;
}

// ============================================================================
// MAIN CARD DATA INTERFACE (Complete Schema)
// ============================================================================

export interface CardData {
  // Basic Info
  id?: number;
  first_name?: string;
  last_name?: string;
  designation?: string;
  company?: string;
  department?: string;
  summary?: string;
  prefix?: string;
  suffix?: string;
  pronouns_v2?: string;

  // Contact Information (v2 arrays)
  phone_v2?: ContactInfo[];
  email_v2?: ContactInfo[];
  website_v2?: ContactInfo[];
  custom_fields?: ContactInfo[];

  // Legacy contact info (for backward compatibility)
  phone?: {
    mobile?: string;
    work?: string;
    home?: string;
  };
  email?: string;
  website?: string;

  // Address
  address_v2?: string;

  // Media
  user_image_url?: string;
  logo_url?: string;

  // Social Links
  social_links?: SocialLinks;

  // Styling & Customization
  customizations?: Customizations;

  // Configuration
  layout?: string;
  contact_info_ordering?: string[];

  // Additional fields that might be used by specific templates
  [key: string]: any;
}

// ============================================================================
// EVENT SYSTEM
// ============================================================================

export interface CardEvent<T = any> {
  type: string;
  data: T;
  templateId: string;
  timestamp: number;
}

export interface ContactClickEvent {
  contactType: 'phone' | 'email' | 'website' | 'social' | 'custom';
  value: string;
  label?: string;
}

export interface ShareEvent {
  method: 'native' | 'copy' | 'qr' | 'download';
  format?: 'vcard' | 'url' | 'image';
}

export interface LeadCollectEvent {
  fields: Record<string, any>;
  source: string;
}

// ============================================================================
// TEMPLATE-SPECIFIC CONFIGURATIONS
// ============================================================================

// Base template props that all templates support
export interface BaseTemplateProps {
  cardData?: CardData;
  
  // Data setters - allow external control of specific data points
  dataSetters?: {
    setName?: (first: string, last: string) => void;
    setCompany?: (company: string, designation?: string) => void;
    setContact?: (type: 'phone' | 'email' | 'website', value: string, label?: string) => void;
    setSocialLink?: (platform: keyof SocialLinks, url: string) => void;
    setCustomization?: (key: keyof Customizations, value: any) => void;
  };

  // Event handlers
  onContactClick?: (event: ContactClickEvent) => void;
  onShare?: (event: ShareEvent) => void;
  onLeadCollect?: (event: LeadCollectEvent) => void;
  onCustomEvent?: (event: CardEvent) => void;

  // Template behavior configuration
  config?: {
    showLogo?: boolean;
    showSocialLinks?: boolean;
    showCustomFields?: boolean;
    enableLeadCollection?: boolean;
    enableSharing?: boolean;
    maxContactFields?: number;
    theme?: 'light' | 'dark' | 'auto';
  };

  // Styling overrides
  style?: React.CSSProperties;
  className?: string;
}

// Template-specific props (each template can extend BaseTemplateProps)
export interface Layout1Props extends BaseTemplateProps {
  config?: BaseTemplateProps['config'] & {
    showProfileImage?: boolean;
    compactMode?: boolean;
  };
}

export interface Layout2Props extends BaseTemplateProps {
  config?: BaseTemplateProps['config'] & {
    showBackgroundPattern?: boolean;
    gradientStyle?: 'linear' | 'radial';
  };
}

export interface Layout3Props extends BaseTemplateProps {
  config?: BaseTemplateProps['config'] & {
    cardStyle?: 'minimal' | 'detailed' | 'executive';
  };
}

// Add more layout-specific props as needed...
export interface LayoutComprehensiveProps extends BaseTemplateProps {
  config?: BaseTemplateProps['config'] & {
    showAllFields?: boolean;
    groupSimilarFields?: boolean;
    expandableSection?: boolean;
  };
}

// ============================================================================
// WEB COMPONENT DECLARATIONS FOR JSX
// ============================================================================

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'uniqode-layout-1': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Layout1Props;
      'uniqode-layout-2': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Layout2Props;
      'uniqode-layout-3': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & Layout3Props;
      'uniqode-layout-4': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BaseTemplateProps;
      'uniqode-layout-5': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BaseTemplateProps;
      'uniqode-layout-6': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BaseTemplateProps;
      'uniqode-layout-7': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BaseTemplateProps;
      'uniqode-layout-8': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BaseTemplateProps;
      'uniqode-layout-9': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BaseTemplateProps;
      'uniqode-layout-11': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & BaseTemplateProps;
      'uniqode-layout-comprehensive': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & LayoutComprehensiveProps;
    }
  }
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

// Helper type for template data consumption patterns
export type DataConsumptionMap<T extends keyof CardData> = {
  [K in T]: {
    required: boolean;
    fallback?: CardData[K];
    transform?: (value: CardData[K]) => any;
  };
};

// Template registration info
export interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  version: string;
  dataRequirements: (keyof CardData)[];
  optionalData: (keyof CardData)[];
  supportedEvents: string[];
  configOptions: string[];
}

// Library exports
export interface UniqodeCardTemplatesLibrary {
  version: string;
  components: Record<string, any>;
  utils: {
    ColorUtils: any;
    InitialsUtils: any;
    ValidationUtils: any;
  };
  getTemplateInfo: (templateId: string) => TemplateInfo | null;
  getAllTemplates: () => TemplateInfo[];
}

// ============================================================================
// MODULE DECLARATIONS
// ============================================================================

declare module '@uniqode/card-templates' {
  const library: UniqodeCardTemplatesLibrary;
  export = library;
}

export default UniqodeCardTemplatesLibrary;
