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
  BaseCardConfig,
  CardLayout12Config,
  LayoutConfig,
  BaseTemplateProps,
  Layout12Props,
  ContactClickEvent,
  ShareEvent,
  LeadCollectEvent,
  CardEvent,
  UniqodeCardElement
} from './types/index';

