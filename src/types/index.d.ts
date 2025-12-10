// Core TypeScript definitions for Uniqode Card Templates
import * as React from 'react';
import { 
  PRODUCT_STATE, 
  LEAD_COLLECT_TYPE, 
  DBC_BACKGROUND_TYPE, 
  CONTACT_DETAIL,
  TEXT_FIELD_VALIDATIONS,
  contactInfoType,
  default_contact_info_ordering 
} from './enums';

// Re-export enums for external use
export { 
  PRODUCT_STATE, 
  LEAD_COLLECT_TYPE, 
  DBC_BACKGROUND_TYPE, 
  CONTACT_DETAIL,
  TEXT_FIELD_VALIDATIONS,
  contactInfoType,
  default_contact_info_ordering 
};

// ============================================================================
// CORE DATA INTERFACES
// ============================================================================

/**
 * Contact information structure (phone, email, website, custom fields)
 * Used in phone_v2, email_v2, website_v2, custom_fields arrays
 */
export interface ContactInfo {
  value: string;
  label: string;
  valid?: TEXT_FIELD_VALIDATIONS | 'valid' | 'error' | 'warning';  // Validation state
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

/**
 * Typography configuration structure
 * Aligned with Angular model - uses 'personal_info' not 'user_info'
 */
export interface Typography {
  font_type?: 'google' | 'custom';
  font_family?: string;  // e.g., 'Open Sans', 'Roboto'
  
  personal_info?: {  // ⚠️ Changed from 'user_info' to match Angular model
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
  
  // @deprecated - Use 'personal_info' instead (kept for backward compatibility)
  user_info?: {
    google_font_style?: string;
    google_font_colour?: string;
    google_font_size?: number;
  };
}

/**
 * Background configuration for card
 */
export interface Background {
  type: DBC_BACKGROUND_TYPE | 'color' | 'gradient' | 'image';
  value: string;  // Hex color, image URL, or gradient CSS
}

/**
 * Card customization options (colors, fonts, styling)
 * Based on Angular backend model - these are the ONLY customizable properties
 */
export interface Customizations {
  // Colors
  background_color?: string;
  user_info_color?: string;
  secondary_color?: string;
  button_color?: string;
  icon_color?: string;
  
  // Typography
  font_style?: string;
  title_font_size?: number;
  font_type?: 'google' | 'custom';
  custom_font_url?: string;
  custom_font_style?: string;
  profile_info?: string;
  company_details?: string;
  contact_details?: string;
  button?: string;
  typography?: Typography;
  
  // Background
  background?: Background;
}

/**
 * Lead collection attribute configuration
 */
export interface LeadAttribute {
  phone: boolean;
  designation: boolean;
  notes: boolean;
  connection: LEAD_COLLECT_TYPE;
  company: boolean;
}

/**
 * User agreement links for lead collection
 */
export interface AgreementLinksModal {
  label: string;
  url: string;
}

/**
 * Lead user agreement configuration
 */
export interface LeadUserAgreementAttribute {
  user_agreement_urls: AgreementLinksModal[];
}

/**
 * Contact info list item (used internally for rendering)
 */
export interface ContactInfoListType {
  key: contactInfoType;
  value: ContactInfo[];
}

/**
 * Multi-language content structure
 * Contains all translatable fields for a specific language
 */
export interface MultiLanguageContent {
  first_name?: string;
  last_name?: string;
  prefix?: string;
  suffix?: string;
  designation?: string;
  department?: string;
  pronouns_v2?: string;
  company?: string;
  summary?: string;
  logo_url?: string;
  logo_size?: number;
  phone_v2?: ContactInfo[];
  email_v2?: ContactInfo[];
  website_v2?: ContactInfo[];
  custom_fields?: ContactInfo[];
  address_url?: string;
  address_v2?: string;
  social_links?: SocialLinks;
  user_image_url?: string;
  cover_image_url?: string;
  contact_info_ordering?: Record<string, contactInfoType>;
  __contact_info_list__?: ContactInfoListType[];
}

// ============================================================================
// MAIN CARD DATA INTERFACE (Complete Schema)
// ============================================================================

/**
 * Complete Digital Business Card data structure
 * Aligned with Django backend model and Angular frontend
 */
export interface CardData {
  // ===== BASIC INFO =====
  id?: number;
  first_name?: string;
  last_name?: string;
  name?: string;  // Computed full name
  designation?: string;
  company?: string;
  department?: string;
  summary?: string;
  prefix?: string;
  suffix?: string;
  pronouns_v2?: string;

  // ===== CONTACT INFORMATION (v2 arrays) =====
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

  // ===== ADDRESS =====
  address_v2?: string;  // Full address string
  address_line1?: string;
  address_line2?: string;
  city?: string;
  address_state?: string;  // State/Province
  country?: string;
  zip?: string;
  address_url?: string;  // Google Maps URL

  // ===== MEDIA =====
  user_image_url?: string;
  cover_image_url?: string;  // Hero/cover image
  logo_url?: string;
  logo_size?: number;

  // ===== SOCIAL LINKS =====
  social_links?: SocialLinks;
  social_links_ordering?: string[];  // Order of social links display

  // ===== STYLING & CUSTOMIZATION =====
  customizations?: Customizations;

  // ===== CONFIGURATION =====
  layout?: string;
  template?: any;
  card_template?: any;
  
  // Contact info ordering (⚠️ Changed from string[] to Record)
  contact_info_ordering?: Record<string, contactInfoType>;
  __contact_info_list__?: ContactInfoListType[];  // Computed field

  // ===== LEAD COLLECTION =====
  lead_collection?: boolean;
  lead_attribute?: LeadAttribute;
  lead_user_agreement?: boolean;
  lead_user_agreement_attribute?: LeadUserAgreementAttribute;
  name_in_lead_consent?: string;
  consent_placeholder?: string;  // Used for lead form consent text

  // Follow-up email
  follow_up_email?: boolean;
  follow_up_email_subject?: string;
  follow_up_email_body?: string;
  follow_up_email_delay?: number;

  // ===== MULTI-LANGUAGE SUPPORT =====
  default_language?: string;  // e.g., 'en', 'fr', 'es'
  language_data?: { [languageCode: string]: MultiLanguageContent };

  // ===== METADATA =====
  state?: PRODUCT_STATE;
  url?: string;
  slug?: string;
  created?: string;
  updated?: string;
  organization?: number;
  maintainer?: number;
  card_owner?: any;
  threat_active?: boolean;
  meta?: object;
  is_template?: boolean;

  // ===== ANALYTICS =====
  views?: number;
  saves?: number;

  // ===== FEATURES =====
  autodownload_v2?: boolean;
  autodownload_url?: string;  // vCard download URL
  location_enabled?: boolean;
  ip_location_enabled?: boolean;
  branding_footer?: boolean;
  
  // Marketing pixels
  fb_pixel_id?: string;
  google_conversion_id?: string;

  // ===== TAGS =====
  tags?: any[];
  tags_data?: any[];

  // ===== SERVER/PREVIEW ONLY FIELDS (prefixed with __) =====
  __views__?: number;
  __downloads__?: number;
  __auto_generated_slug__?: boolean;
  __show_lead_form_in_preview__?: boolean;
  __show_new_sticky_btn__?: boolean;
  __zoom__?: number;
  __footer__branding__text__?: boolean;
  __onboarding_layout__?: boolean;
  __work_email__?: boolean;
  __show_add_to_contacts__?: boolean;
  __consent_placeholder__?: string;

  // ===== SERVER-SPECIFIC FIELDS =====
  jwt_update_token?: string;
  static_assets_url?: string;  // Base URL for static assets

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

  // Configuration - uses BaseCardConfig for comprehensive type safety
  config?: BaseCardConfig;

  // Styling overrides
  style?: React.CSSProperties;
  className?: string;
}

// Template-specific props (each template can extend BaseTemplateProps)

/**
 * Layout 12 - Modern Business Card Layout
 * Professional design with customizable colors, typography, and multi-language support
 */
export interface Layout12Props extends BaseTemplateProps {
  // CardLayout12 uses CardLayout12Config which extends BaseCardConfig
  // No additional layout-specific props currently
  config?: CardLayout12Config;
}

// ============================================================================
// WEB COMPONENT DECLARATIONS FOR JSX/TSX
// ============================================================================

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'uniqode-layout-12': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        ref?: React.Ref<HTMLElement & UniqodeCardElement>;
      };
    }
  }
}

// ============================================================================
// WEB COMPONENT ELEMENT INTERFACE
// ============================================================================

/**
 * Extended HTMLElement interface for Uniqode Card Web Components
 * Use this for type-safe access to card properties and methods
 */
export interface UniqodeCardElement extends HTMLElement {
  // Properties
  cardData: CardData;
  config: BaseCardConfig;
  
  // Event handlers are attached via addEventListener
  // See event types below for detail structures
}

// ============================================================================
// CONFIGURATION TYPES
// ============================================================================

/**
 * Layout configuration for card rendering
 * Controls dimensions, positioning, and responsive behavior
 */
export interface LayoutConfig {
  /** Card width - 'auto', '100%', '500px', or any CSS value */
  width?: string;
  /** Maximum width constraint */
  maxWidth?: string;
  /** Card height - 'auto', '100%', '100vh', or any CSS value */
  height?: string;
  /** Minimum height constraint */
  minHeight?: string;
  /** Center the card horizontally */
  centered?: boolean;
  /** Force full width (for mobile/Flutter) */
  fullWidth?: boolean;
  /** Content padding */
  padding?: string;
  /** Disable all click interactions (contact info, social icons, footer buttons) */
  clicksDisabled?: boolean;
  /** Disable ONLY footer button clicks (Exchange Contacts, Add to Contact, Connect, Create) - social icons and contact info remain clickable */
  footerClicksDisabled?: boolean;
  /** Hero image height ('361px', '50%', 'auto') */
  heroHeight?: string;
}

/**
 * Base configuration options available for all card layouts
 * These options control common features across all templates
 */
export interface BaseCardConfig {
  // Display toggles
  /** Show user profile image */
  showProfileImage?: boolean;
  /** Show company/organization logo */
  showLogo?: boolean;
  /** Enable sharing functionality */
  enableSharing?: boolean;
  /** Enable lead collection form */
  enableLeadCollection?: boolean;
  /** Enable compact/minimal mode */
  compactMode?: boolean;
  
  // Theme
  /** Theme mode - 'light', 'dark', or 'auto' (system preference) */
  theme?: 'light' | 'dark' | 'auto';
  
  // Lead collection & footer controls
  /** Enable lead collection (shows "Exchange Contacts" button) */
  leadCollection?: boolean;
  /** Show language dropdown for multi-language support */
  showLanguageDropdown?: boolean | 'auto';
  /** Show footer with branding */
  showFooter?: boolean;
  /** Hide footer completely */
  hideFooter?: boolean;
  /** Hide "Powered by Uniqode" branding text */
  hidePoweredBy?: boolean;
  /** Show animation frame for card exchange */
  showAnimation?: boolean;
  /** PWA preview mode (hides sticky buttons) */
  pwaPreview?: boolean;
  
  // Internal state (set programmatically)
  /** Show "Connect" and "Create Now" buttons (after lead exchange) */
  showConnectButtons?: boolean;
  
  // Platform-specific
  /** Platform identifier - 'mobile', 'dashboard', 'server', 'web' */
  platform?: 'mobile' | 'dashboard' | 'server' | 'web';
  
  // Layout configuration
  /** Layout-specific configuration (dimensions, positioning) */
  layoutConfig?: LayoutConfig;
}

/**
 * Configuration options specific to CardLayout12
 * Inherits all options from BaseCardConfig
 */
export interface CardLayout12Config extends BaseCardConfig {
  // CardLayout12 doesn't have layout-specific config currently
  // All config is inherited from BaseCardConfig
  // Future layout-specific options can be added here
}

// End of type definitions
