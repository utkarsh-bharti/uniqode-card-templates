/**
 * Card Event Types
 * 
 * Centralized event type definitions for all card layouts
 * Use these constants when emitting or listening to card events
 * 
 * Usage:
 * ```js
 * import { CARD_EVENTS } from '@shared/constants/events';
 * this.emitEvent(CARD_EVENTS.CONTACT_CLICK, { type: 'email', value: 'test@example.com' });
 * ```
 */

export const CARD_EVENTS = {
  // Card Lifecycle Events
  CARD_READY: 'card-ready',
  CARD_UPDATED: 'card-updated',
  
  // Contact Interaction Events
  CONTACT_CLICK: 'contact-click',
  SAVE_CONTACT: 'save-contact',
  SOCIAL_CLICK: 'social-click',
  SHARE: 'share',
  
  // Language Events
  LANGUAGE_CHANGE: 'language-change',
  
  // Lead Collection Events
  LEAD_FORM_OPEN: 'lead-form-open',
  LEAD_FORM_CLOSE: 'lead-form-close',
  LEAD_FORM_SUBMIT: 'lead-form-submit',
  LEAD_FORM_SUCCESS: 'lead-form-success',
  LEAD_FORM_ERROR: 'lead-form-error',
  LEAD_COLLECT: 'lead-collect', // Legacy/alternative event name
  
  // Footer/CTA Events
  ADD_TO_CONTACT_CLICK: 'add-to-contact-click',
  EXCHANGE_CONTACTS_CLICK: 'exchange-contacts-click',
  CONNECT_CLICK: 'connect-click',
  CREATE_NOW_CLICK: 'create-now-click',
  FOOTER_CTA_CLICK: 'footer-cta-click',
  FOOTER_LOGO_CLICK: 'footer-logo-click',
  
  // Animation Events
  ANIMATION_STARTED: 'animation-started',
  ANIMATION_ENDED: 'animation-ended'
};

/**
 * Event Detail Type Definitions (for TypeScript/JSDoc)
 * 
 * @typedef {Object} ContactClickDetail
 * @property {string} type - Contact type (email, phone, website, address, custom)
 * @property {string} value - Contact value
 * @property {string} [label] - Contact label
 * 
 * @typedef {Object} SocialClickDetail
 * @property {string} platform - Social platform name
 * @property {string} url - Social profile URL
 * 
 * @typedef {Object} LanguageChangeDetail
 * @property {string} language - Selected language code
 * @property {Object} cardData - Card data for selected language
 * 
 * @typedef {Object} LeadFormSubmitDetail
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} [phone_number]
 * @property {string} [company_name]
 * @property {string} [designation]
 * @property {string} [notes]
 * @property {boolean} [marketing_consent]
 * 
 * @typedef {Object} AddToContactDetail
 * @property {string} url - VCard download URL
 * 
 * @typedef {Object} CreateNowDetail
 * @property {string} slug - Card slug
 * 
 * @typedef {Object} FooterCtaDetail
 * @property {string} slug - Card slug
 * 
 * @typedef {Object} AnimationDetail
 * @property {Object} leadData - Lead data for animation
 */

export default CARD_EVENTS;

