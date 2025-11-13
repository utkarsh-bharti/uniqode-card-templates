/**
 * @uniqode/card-templates
 * 
 * Production-grade Web Components for digital business card templates
 * Framework-agnostic, works with React, Angular, Vue, and vanilla JS
 * 
 * @example
 * // Import types for TypeScript
 * import type { CardData, UniqodeCardElement } from '@uniqode/card-templates';
 * 
 * // Import component (registers Web Component)
 * import '@uniqode/card-templates/dist/card-layout-12.js';
 * 
 * // Use in HTML
 * const card = document.querySelector('uniqode-layout-12') as UniqodeCardElement;
 * card.cardData = { first_name: "John", last_name: "Doe" };
 */

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export * from './types/index';

// Re-export commonly used types for convenience
export type {
  CardData,
  ContactInfo,
  SocialLinks,
  Typography,
  Background,
  Customizations,
  BaseTemplateProps,
  Layout12Props,
  ContactClickEvent,
  ShareEvent,
  LeadCollectEvent,
  CardEvent,
  UniqodeCardElement,
  UniqodeCardTemplatesLibrary
} from './types/index';

// ============================================================================
// COMPONENT DECLARATIONS
// ============================================================================

/**
 * Base class for all Uniqode Card components
 * Provides core functionality: data loading, event system, vCard generation
 */
export declare class BaseCard extends HTMLElement {
  // Properties
  cardData: CardData;
  config: {
    showProfileImage?: boolean;
    showLogo?: boolean;
    enableSharing?: boolean;
    enableLeadCollection?: boolean;
    compactMode?: boolean;
    theme?: 'light' | 'dark' | 'auto';
  };
  
  // Utility methods
  getInitials(): string;
  getFullName(): string;
  generateVCard(): string;
  downloadVCard(vcardData: string): void;
  
  // Event emitters (internal use)
  protected emitEvent(eventName: string, detail?: any): boolean;
  protected handleContactClick(type: string, value: string, label?: string): void;
  protected handleCardShare(): void;
  protected handleSaveContact(): void;
  protected handleLeadCollect(leadData: any): void;
  protected handleSocialClick(platform: string, url: string): void;
  protected handleCustomFieldClick(fieldId: string, fieldValue: any): void;
}

/**
 * CardLayout12 - "Madgamer" gaming/esports theme
 * Dark background with neon cyan accents (#84E9F1)
 */
export declare class CardLayout12 extends BaseCard {
  static layoutId: 'layout-12';
}

// ============================================================================
// UTILITY EXPORTS
// ============================================================================

/**
 * Color utility functions
 */
export declare const ColorUtils: {
  /**
   * Convert hex color to RGBA with opacity
   * @param hex - Hex color code (#RGB or #RRGGBB)
   * @param opacity - Opacity value (0-1), default 0.2
   * @returns RGBA color string
   */
  hexToRGBA(hex: string, opacity?: number): string;
  
  /**
   * Convert hex to RGB object
   * @param hex - Hex color code
   * @returns RGB object with r, g, b properties (0-255)
   */
  hexToRGB(hex: string): { r: number; g: number; b: number };
  
  /**
   * Check if string is a valid hex color code
   * @param hex - String to validate
   * @returns True if valid hex color
   */
  isHexColorCode(hex: string): boolean;
  
  /**
   * Get contrasting text color (black or white) for a background
   * @param backgroundColor - Background hex color
   * @returns '#000000' or '#ffffff'
   */
  getContrastColor(backgroundColor: string): string;
  
  /**
   * Lighten or darken a hex color
   * @param hex - Hex color code
   * @param amount - Amount to adjust (-255 to 255)
   * @returns Modified hex color
   */
  adjustBrightness(hex: string, amount: number): string;
};

/**
 * Initials generation utility
 */
export declare const InitialsUtils: {
  /**
   * Extract initials from first and last name
   * @param firstName - First name
   * @param lastName - Last name
   * @returns Initials (max 2 characters)
   */
  getInitials(firstName: string, lastName: string): string;
  
  /**
   * Extract initials from full name string
   * @param fullName - Full name string
   * @returns Initials
   */
  getInitialsFromFullName(fullName: string): string;
  
  /**
   * Get initials with fallback to company name
   * @param cardData - Card data object
   * @returns Initials
   */
  getInitialsWithFallback(cardData: Partial<CardData>): string;
  
  /**
   * Generate consistent background color for initials
   * @param name - Name to generate color for
   * @returns Hex color code
   */
  getInitialsBackgroundColor(name: string): string;
};

/**
 * Card data validation utility
 */
export declare const ValidationUtils: {
  /**
   * Validate complete card data structure
   * @param data - Card data to validate
   * @returns Validation result with isValid boolean and errors array
   */
  validateCardData(data: any): {
    isValid: boolean;
    errors: string[];
  };
  
  /**
   * Validate color format (hex, rgb, rgba, hsl, named)
   * @param color - Color value to validate
   * @returns True if valid color
   */
  isValidColor(color: string): boolean;
  
  /**
   * Validate URL format
   * @param url - URL to validate
   * @returns True if valid URL
   */
  isValidUrl(url: string): boolean;
  
  /**
   * Validate email format
   * @param email - Email to validate
   * @returns True if valid email
   */
  isValidEmail(email: string): boolean;
  
  /**
   * Validate phone number format
   * @param phone - Phone number to validate
   * @returns True if valid phone
   */
  isValidPhone(phone: string): boolean;
  
  /**
   * Sanitize card data by removing potentially harmful content
   * @param data - Card data to sanitize
   * @returns Sanitized card data
   */
  sanitizeCardData(data: any): CardData;
  
  /**
   * Get default card data structure
   * @returns Default card data
   */
  getDefaultCardData(): CardData;
};

// ============================================================================
// CONVENIENCE EXPORTS (for easier access)
// ============================================================================

// Color utilities
export declare function hexToRGBA(hex: string, opacity?: number): string;
export declare function isValidColor(color: string): boolean;
export declare function getContrastColor(backgroundColor: string): string;

// Initials utilities
export declare function getInitials(firstName: string, lastName: string): string;
export declare function getInitialsWithFallback(cardData: Partial<CardData>): string;

// Validation utilities
export declare function validateCardData(data: any): { isValid: boolean; errors: string[] };
export declare function sanitizeCardData(data: any): CardData;
export declare function getDefaultCardData(): CardData;

// ============================================================================
// LIBRARY METADATA
// ============================================================================

export declare const LIBRARY_INFO: {
  name: string;
  version: string;
  description: string;
  author: string;
  license: string;
};

// ============================================================================
// DEFAULT EXPORT (for CommonJS compatibility)
// ============================================================================

declare const UniqodeCardTemplates: {
  version: string;
  components: {
    BaseCard: typeof BaseCard;
    CardLayout12: typeof CardLayout12;
  };
  utils: {
    ColorUtils: typeof ColorUtils;
    InitialsUtils: typeof InitialsUtils;
    ValidationUtils: typeof ValidationUtils;
  };
};

export default UniqodeCardTemplates;
