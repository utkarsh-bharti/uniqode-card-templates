import { validateCardData } from '../../shared/utils/validation.js';
import { getInitials } from '../../shared/utils/initials.js';
import { hexToRGBA } from '../../shared/utils/colors.js';
import { CARD_EVENTS } from '../../shared/constants/events.js';
import { LanguageDropdownMixin } from './LanguageDropdown.js';
import { LeadFormMixin } from './LeadFormMixin.js';
import { StickyButtonFooterMixin } from './StickyButtonFooterMixin.js';
import { AnimationMixin } from './AnimationMixin.js';

// Library Version
const LIBRARY_VERSION = '1.0.0';
const BUILD_DATE = new Date().toLocaleString('en-US', { 
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', second: '2-digit', 
  hour12: true 
}); // MM/DD/YYYY, HH:MM:SS AM/PM

/**
 * Base class for all Uniqode Card Template Components
 * 
 * Production-Grade Features:
 * - Attribute-based data passing (declarative)
 * - Property-based data passing (imperative)
 * - Comprehensive event system with preventDefault support
 * - Framework-agnostic design
 * - Performance optimized
 * - Configurable Shadow DOM mode (closed by default, open for server analytics)
 * 
 * IMPORTANT: Configure Shadow DOM mode BEFORE loading this module!
 * 
 * @example Server Environment (Open Mode for Analytics)
 * <script>
 *   window.UniqodeCardConfig = { shadowMode: 'open' };
 * </script>
 * <script type="module" src="card-layout-12.js"></script>
 * 
 * @example Web Frameworks (Closed Mode - Default)
 * import '@uniqode/card-templates';  // Defaults to 'closed'
 * 
 * @example Declarative (via attributes)
 * <uniqode-layout-12 card-data='{"first_name":"John"}' config='{"showLogo":true}'></uniqode-layout-12>
 * 
 * @example Imperative (via properties)
 * const card = document.querySelector('uniqode-layout-12');
 * card.cardData = { first_name: "John", last_name: "Doe" };
 * card.addEventListener('contact-click', (e) => console.log(e.detail));
 */

// ============================================================================
// SHADOW DOM CONFIGURATION
// ============================================================================

/**
 * Read Shadow DOM mode at MODULE LOAD TIME (immutable after this point)
 * - 'closed' (default): Web frameworks - Perfect style encapsulation
 * - 'open': Server environments - Allows analytics tracking inside Shadow DOM
 * 
 * @constant {string}
 */
// Ensure UniqodeCardConfig exists and add EVENTS before freezing
if (typeof window !== 'undefined') {
  if (!window.UniqodeCardConfig) {
    window.UniqodeCardConfig = {};
  }
  
  // Add EVENTS to config BEFORE freezing (accessible to server templates)
  window.UniqodeCardConfig.EVENTS = CARD_EVENTS;
}

// Read Shadow DOM mode from config
const SHADOW_DOM_MODE = (
  typeof window !== 'undefined' && 
  window.UniqodeCardConfig?.shadowMode === 'open'
) ? 'open' : 'closed';

// Log configuration (helps with debugging)
if (typeof window !== 'undefined') {
  const configSource = window.UniqodeCardConfig.shadowMode
    ? `configured as '${SHADOW_DOM_MODE}'` 
    : `default '${SHADOW_DOM_MODE}' (no config provided)`;
  
  console.log(
    `%c[UniqodeCardTemplates] Shadow DOM mode: ${configSource}`,
    'color: #10b981; font-weight: bold'
  );
  console.log(
    '%c[UniqodeCardTemplates] Event constants: window.UniqodeCardConfig.EVENTS',
    'color: #10b981; font-weight: bold'
  );
  
  // NOW freeze the config to prevent modification after module loads
  const originalConfig = { ...window.UniqodeCardConfig };
  Object.freeze(originalConfig.EVENTS); // Freeze events object
  
  Object.defineProperty(window, 'UniqodeCardConfig', {
    get() { return originalConfig; },
    set(newValue) {
      console.error(
        '%c[UniqodeCardTemplates] ERROR: Cannot change UniqodeCardConfig after module has loaded!\n' +
        'Shadow DOM mode is locked to: ' + SHADOW_DOM_MODE + '\n' +
        'Set configuration BEFORE importing the library.',
        'color: #ef4444; font-weight: bold'
      );
      return originalConfig;
    },
    configurable: false
  });
}

// ============================================================================
// BASE CARD COMPONENT
// ============================================================================

export class BaseCard extends HTMLElement {
  /**
   * Static accessor for typed event constants
   * Usage: BaseCard.EVENTS.CONTACT_CLICK or CardLayout12.EVENTS.CONTACT_CLICK
   * 
   * @returns {Object} CARD_EVENTS constants
   */
  static get EVENTS() {
    return CARD_EVENTS;
  }
  
  constructor() {
    super();
    
    // Use the IMMUTABLE constant (set at module load time)
    // Store reference to shadow root (needed for 'closed' mode)
    this._shadowRoot = this.attachShadow({ mode: SHADOW_DOM_MODE });
    
    // Apply mixins: Language Dropdown + Lead Form + Sticky Button & Footer + Animation
    Object.assign(this, LanguageDropdownMixin);
    Object.assign(this, LeadFormMixin);
    Object.assign(this, StickyButtonFooterMixin);
    Object.assign(this, AnimationMixin);
    
    // Internal state
    this._cardData = {};
    this._config = {};
    this._isConnected = false;
    this._eventListeners = new Map();
    this._lastDataString = '';  // Cache for performance
    this._lastConfigString = '';
    
    // Bind methods to maintain context
    this.handleCardShare = this.handleCardShare.bind(this);
    this.handleContactClick = this.handleContactClick.bind(this);
    this.handleSaveContact = this.handleSaveContact.bind(this);
    this.handleLeadCollect = this.handleLeadCollect.bind(this);
    this.handleSocialClick = this.handleSocialClick.bind(this);
    this.handleCustomFieldClick = this.handleCustomFieldClick.bind(this);
  }
  
  // ===== WEB COMPONENT LIFECYCLE =====
  
  /**
   * Get Shadow DOM mode for this component instance
   * @returns {'open'|'closed'}
   */
  getShadowMode() {
    return SHADOW_DOM_MODE;
  }
  
  /**
   * Static method to get configured Shadow DOM mode
   * Useful for checking configuration before creating components
   * @returns {'open'|'closed'}
   */
  static getShadowDOMMode() {
    return SHADOW_DOM_MODE;
  }
  
  /**
   * Observed attributes for reactive updates
   * When these attributes change, attributeChangedCallback fires
   */
  static get observedAttributes() {
    return ['card-data', 'config', 'data-source', 'config-source'];
  }
  
  /**
   * Called when component is added to DOM
   */
  connectedCallback() {
    this._isConnected = true;
    
    // Log library version (only once per component type)
    if (!BaseCard._versionLogged) {
      console.log(
        `%c🎨 Uniqode Card Templates v${LIBRARY_VERSION}`,
        'background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
        `\n📦 Build: ${BUILD_DATE}\n🔧 Shadow DOM: ${SHADOW_DOM_MODE}\n✨ Features: Colors, Typography, Background, Multilingual`
      );
      BaseCard._versionLogged = true;
    }
    
    // Setup shadow DOM template
    this._shadowRoot.innerHTML = this.getTemplate();
    
    // Load data from attributes or data islands
    this.loadData();
    this.loadConfig();
    
    // Setup component-specific initialization
    this.setupComponent();
    
    // Setup event listeners
    this.setupEventListeners();
    
    // Initial render
    this.render();
    
    // Emit 'ready' event
    this.emitEvent(CARD_EVENTS.CARD_READY, {
      layout: this.constructor.layoutId,
      hasData: Object.keys(this._cardData).length > 0,
      hasConfig: Object.keys(this._config).length > 0,
      version: LIBRARY_VERSION
    });
    
    // Auto-open lead form if connection attribute is set
    this.checkAutoOpenLeadForm();
  }
  
  /**
   * Called when component is removed from DOM
   */
  disconnectedCallback() {
    this._isConnected = false;
    this.cleanup();
  }
  
  /**
   * Called when observed attributes change
   * Enables declarative, reactive updates
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._isConnected || oldValue === newValue) return;
    
    switch (name) {
      case 'card-data':
        this.handleCardDataAttribute(newValue);
        break;
      case 'config':
        this.handleConfigAttribute(newValue);
        break;
      case 'data-source':
        this.loadDataFromSource(newValue);
        break;
      case 'config-source':
        this.loadConfigFromSource(newValue);
        break;
    }
  }
  
  // ===== DATA LOADING =====
  
  /**
   * Load card data from multiple sources (priority order)
   */
  loadData() {
    // Priority 1: data-source attribute (data island pattern - best for SSR)
    const dataSource = this.getAttribute('data-source');
    if (dataSource && this.loadDataFromSource(dataSource)) {
      return;
    }
    
    // Priority 2: card-data attribute (inline JSON)
    const cardDataAttr = this.getAttribute('card-data');
    if (cardDataAttr && this.handleCardDataAttribute(cardDataAttr)) {
      return;
    }
    
    // Priority 3: Property (programmatic use)
    if (this._cardData && Object.keys(this._cardData).length > 0) {
      return;
    }
    
    console.warn('[UniqodeCard] No card data provided. Use data-source, card-data attribute, or set cardData property.');
  }
  
  /**
   * Load config from multiple sources (priority order)
   */
  loadConfig() {
    // Priority 1: config-source attribute
    const configSource = this.getAttribute('config-source');
    if (configSource && this.loadConfigFromSource(configSource)) {
      return;
    }
    
    // Priority 2: config attribute
    const configAttr = this.getAttribute('config');
    if (configAttr && this.handleConfigAttribute(configAttr)) {
      return;
    }
    
    // Priority 3: Property or defaults
    this._config = { ...this.getDefaultConfig(), ...this._config };
  }
  
  /**
   * Load data from script tag (data island pattern)
   */
  loadDataFromSource(sourceId) {
    try {
      const dataElement = document.getElementById(sourceId);
      if (!dataElement) {
        console.warn(`[UniqodeCard] Data source element #${sourceId} not found`);
        return false;
      }
      
      const dataString = dataElement.textContent.trim();
      if (dataString === this._lastDataString) {
        return true; // No change, skip re-parse
      }
      
      this._cardData = JSON.parse(dataString);
      this._lastDataString = dataString;
      
      if (this._isConnected) this.render();
      return true;
    } catch (error) {
      console.error('[UniqodeCard] Error loading data from source:', error);
      return false;
    }
  }
  
  /**
   * Load config from script tag
   */
  loadConfigFromSource(sourceId) {
    try {
      const configElement = document.getElementById(sourceId);
      if (!configElement) {
        console.warn(`[UniqodeCard] Config source element #${sourceId} not found`);
        return false;
      }
      
      const configString = configElement.textContent.trim();
      if (configString === this._lastConfigString) {
        return true;
      }
      
      this._config = { ...this.getDefaultConfig(), ...JSON.parse(configString) };
      this._lastConfigString = configString;
      
      if (this._isConnected) this.render();
      return true;
    } catch (error) {
      console.error('[UniqodeCard] Error loading config from source:', error);
      return false;
    }
  }
  
  /**
   * Handle card-data attribute (inline JSON)
   */
  handleCardDataAttribute(value) {
    if (!value || value === this._lastDataString) {
      return false;
    }
    
    try {
      this._cardData = JSON.parse(value);
      this._lastDataString = value;
      
      if (this._isConnected) this.render();
      return true;
    } catch (error) {
      console.error('[UniqodeCard] Invalid card-data JSON:', error);
      return false;
    }
  }
  
  /**
   * Handle config attribute (inline JSON)
   */
  handleConfigAttribute(value) {
    if (!value || value === this._lastConfigString) {
      return false;
    }
    
    try {
      this._config = { ...this.getDefaultConfig(), ...JSON.parse(value) };
      this._lastConfigString = value;
      
      if (this._isConnected) this.render();
      return true;
    } catch (error) {
      console.error('[UniqodeCard] Invalid config JSON:', error);
      return false;
    }
  }
  
  // ===== PROPERTIES (for programmatic use) =====
  
  /**
   * Set card data programmatically
   * @param {Object} data - Card data object
   */
  set cardData(data) {
    if (!data) {
      console.warn('[UniqodeCard] Card data is null or undefined');
      return;
    }
    
    // Validate data structure
    const validationResult = validateCardData(data);
    if (!validationResult.isValid) {
      console.warn('[UniqodeCard] Invalid card data:', validationResult.errors);
    }
    
    // Performance: Only update if data actually changed
    const dataString = JSON.stringify(data);
    if (dataString === this._lastDataString) {
      return; // No change, skip update
    }
    
    // Deep clone to prevent external mutations
    this._cardData = JSON.parse(dataString);
    this._lastDataString = dataString;
    
    if (this._isConnected) {
      this.render();
    }
  }
  
  /**
   * Get current card data (read-only copy)
   * @returns {Object} Card data
   */
  get cardData() {
    return JSON.parse(JSON.stringify(this._cardData));
  }
  
  /**
   * Set config programmatically
   * @param {Object} config - Configuration object
   */
  set config(config) {
    const configString = JSON.stringify(config);
    if (configString === this._lastConfigString) {
      return;
    }
    
    this._config = { ...this.getDefaultConfig(), ...config };
    this._lastConfigString = configString;
    
    if (this._isConnected) {
      this.render();
    }
  }
  
  /**
   * Get current config (read-only copy)
   * @returns {Object} Configuration
   */
  get config() {
    return { ...this._config };
  }
  
  /**
   * Get default configuration
   * Override in subclasses for layout-specific defaults
   * @returns {Object} Default config
   */
  getDefaultConfig() {
    return {
      showProfileImage: true,
      showLogo: true,
      enableSharing: true,
      enableLeadCollection: false,
      compactMode: false,
      theme: 'auto'
    };
  }
  
  // ===== EVENT SYSTEM =====
  
  /**
   * Emit custom event for consumers to handle
   * All events bubble and can cross shadow DOM boundary
   * 
   * Use CARD_EVENTS constants for type safety:
   * ```js
   * this.emitEvent(CARD_EVENTS.CONTACT_CLICK, { type: 'email', value: 'test@example.com' });
   * ```
   * 
   * @param {'card-ready'|'card-updated'|'contact-click'|'save-contact'|'social-click'|'language-change'|'lead-form-open'|'lead-form-close'|'lead-form-submit'|'lead-form-success'|'lead-form-error'|'add-to-contact-click'|'exchange-contacts-click'|'connect-click'|'create-now-click'|'footer-cta-click'|'footer-logo-click'|'animation-started'|'animation-ended'} eventName - Event name (use CARD_EVENTS constants)
   * @param {Object} detail - Event detail data
   * @returns {boolean} false if event was prevented, true otherwise
   */
  emitEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true,
      composed: true,  // Can cross shadow DOM boundary
      cancelable: true,
      detail: {
        ...detail,
        timestamp: Date.now(),
        layout: this.constructor.layoutId
      }
    });
    
    const dispatched = this.dispatchEvent(event);
    
    // If event was prevented, return false
    return dispatched;
  }
  
  /**
   * Handle contact click (email, phone, website, etc.)
   * Consumer can intercept via 'contact-click' event
   * 
   * @param {string} type - Contact type (email, phone, website, address)
   * @param {string} value - Contact value
   * @param {string} label - Contact label
   */
  handleContactClick(type, value, label) {
    const detail = { type, value, label };
    
    console.log(`%c[LIBRARY] 📱 Contact click triggered:`, 'color: #3b82f6; font-weight: bold', detail);
    
    // Emit event - consumer can preventDefault()
    const shouldContinue = this.emitEvent(CARD_EVENTS.CONTACT_CLICK, detail);
    
    if (!shouldContinue) {
      console.log(`%c[LIBRARY] 🚫 Default action prevented by consumer`, 'color: #ef4444; font-weight: bold');
      return; // Consumer prevented default action
    }
    
    console.log(`%c[LIBRARY] ✅ Executing default action for ${type}`, 'color: #3b82f6; font-weight: bold');
    // Default behavior if consumer doesn't prevent
    this.defaultContactAction(type, value);
  }
  
  /**
   * Default contact action implementation
   */
  defaultContactAction(type, value) {
    try {
      switch (type) {
        case 'email':
          window.location.href = `mailto:${value}`;
          break;
        case 'phone':
          window.location.href = `tel:${value}`;
          break;
        case 'website':
          const url = value.startsWith('http') ? value : `https://${value}`;
          window.open(url, '_blank', 'noopener,noreferrer');
          break;
        case 'address':
          const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`;
          window.open(mapsUrl, '_blank', 'noopener,noreferrer');
          break;
      }
    } catch (error) {
      console.warn(`[UniqodeCard] Failed to execute ${type} action:`, error);
    }
  }
  
  /**
   * Handle save contact (vCard download)
   * Consumer can provide custom vCard generation
   */
  handleSaveContact() {
    const vcardData = this.generateVCard();
    const detail = { vcardData, cardData: this._cardData };
    
    // Emit event - consumer can customize vCard
    const shouldContinue = this.emitEvent(CARD_EVENTS.SAVE_CONTACT, detail);
    
    if (!shouldContinue) {
      return; // Consumer will handle
    }
    
    // Default: download vCard
    this.downloadVCard(vcardData);
  }
  
  /**
   * Handle share action
   * Consumer can provide custom share logic
   */
  handleCardShare() {
    const shareData = {
      title: `${this._cardData.first_name || ''} ${this._cardData.last_name || ''}`.trim(),
      text: `Check out my digital business card`,
      url: window.location.href
    };
    
    const detail = { shareData, cardData: this._cardData };
    
    // Emit event
    const shouldContinue = this.emitEvent('share', detail);
    
    if (!shouldContinue) {
      return; // Consumer will handle
    }
    
    // Default: Web Share API or fallback
    this.defaultShareAction(shareData);
  }
  
  /**
   * Handle lead collection
   * Consumer MUST handle this (no default)
   */
  handleLeadCollect(leadData) {
    const detail = { 
      leadData,
      cardData: this._cardData 
    };
    
    // Emit event - no default action, consumer must handle
    this.emitEvent('lead-collect', detail);
  }
  
  /**
   * Handle social link click
   * Consumer can track or modify behavior
   */
  handleSocialClick(platform, url) {
    const detail = { platform, url };
    
    console.log(`%c[LIBRARY] 🔗 Social click triggered:`, 'color: #3b82f6; font-weight: bold', detail);
    
    const shouldContinue = this.emitEvent(CARD_EVENTS.SOCIAL_CLICK, detail);
    
    if (!shouldContinue) {
      console.log(`%c[LIBRARY] 🚫 Default action prevented by consumer`, 'color: #ef4444; font-weight: bold');
      return;
    }
    
    console.log(`%c[LIBRARY] ✅ Opening social link`, 'color: #3b82f6; font-weight: bold');
    // Default: open in new tab
    window.open(url, '_blank', 'noopener,noreferrer');
  }
  
  /**
   * Handle custom field click
   * Consumer defines behavior
   */
  handleCustomFieldClick(fieldId, fieldValue) {
    const detail = { fieldId, fieldValue };
    
    this.emitEvent('custom-field-click', detail);
  }
  
  // ===== UTILITY METHODS =====
  
  /**
   * Get initials from name fields
   * @returns {string} User initials
   */
  getInitials() {
    const { first_name = '', last_name = '' } = this._cardData;
    return getInitials(first_name, last_name);
  }
  
  /**
   * Convert hex color to RGBA with opacity
   */
  hexToRGBA(hex, opacity = 0.2) {
    return hexToRGBA(hex, opacity);
  }
  
  /**
   * Get full formatted name from card data
   */
  getFullName() {
    const { prefix, first_name = '', last_name = '', suffix } = this._cardData;
    
    let name = '';
    if (prefix) name += prefix + ' ';
    name += first_name;
    if (last_name) name += ' ' + last_name;
    if (suffix) name += ', ' + suffix;
    
    return name.trim();
  }
  
  /**
   * Generate vCard data
   */
  generateVCard() {
    const { first_name, last_name, company, designation, email_v2, phone_v2, website_v2, address_v2 } = this._cardData;
    
    let vcard = 'BEGIN:VCARD\nVERSION:3.0\n';
    vcard += `FN:${first_name || ''} ${last_name || ''}\n`;
    vcard += `N:${last_name || ''};${first_name || ''};;;\n`;
    
    if (company) vcard += `ORG:${company}\n`;
    if (designation) vcard += `TITLE:${designation}\n`;
    
    if (email_v2 && email_v2.length > 0) {
      email_v2.forEach(email => {
        if (email.value) vcard += `EMAIL;TYPE=INTERNET:${email.value}\n`;
      });
    }
    
    if (phone_v2 && phone_v2.length > 0) {
      phone_v2.forEach(phone => {
        if (phone.value) vcard += `TEL;TYPE=VOICE:${phone.value}\n`;
      });
    }
    
    if (website_v2 && website_v2.length > 0 && website_v2[0].value) {
      vcard += `URL:${website_v2[0].value}\n`;
    }
    
    if (address_v2) {
      vcard += `ADR;TYPE=WORK:;;${address_v2};;;;\n`;
    }
    
    vcard += 'END:VCARD';
    
    return vcard;
  }
  
  /**
   * Download vCard file
   */
  downloadVCard(vcardData) {
    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const fileName = `${this._cardData.first_name || 'contact'}_${this._cardData.last_name || 'card'}.vcf`;
    
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
  
  /**
   * Default share action using Web Share API or fallback
   */
  defaultShareAction(shareData) {
    if (navigator.share) {
      navigator.share(shareData).catch(err => {
        console.log('[UniqodeCard] Share cancelled or failed:', err);
      });
    } else {
      // Fallback: copy to clipboard
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareData.url).then(() => {
          console.log('[UniqodeCard] Link copied to clipboard');
        }).catch(err => {
          console.warn('[UniqodeCard] Failed to copy link:', err);
        });
      }
    }
  }
  
  /**
   * Get SVG icon for contact type
   */
  getContactIcon(type) {
    const icons = {
      phone: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
      </svg>`,
      email: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>`,
      website: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
      </svg>`,
      address: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>`,
      custom: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>`
    };
    
    return icons[type] || icons.custom;
  }
  
  // ===== COMPONENT LIFECYCLE HOOKS =====
  
  /**
   * Setup component-specific initialization
   * Override in subclasses
   */
  setupComponent() {
    // Override in subclasses
  }
  
  /**
   * Setup event listeners
   * Override in subclasses for custom events
   */
  setupEventListeners() {
    // Override in subclasses
  }
  
  /**
   * Cleanup resources and event listeners
   */
  cleanup() {
    // Remove all registered event listeners
    this._eventListeners.forEach((listener, element) => {
      element.removeEventListener(listener.event, listener.handler);
    });
    this._eventListeners.clear();
  }
  
  // ===== DATA EXTRACTION HELPERS (for child classes) =====
  
  /**
   * Get customizations object from card data
   * Uses official TypeScript interface naming (plural: customizations)
   * @returns {Object} Customization settings
   */
  getCustomization() {
    const customizations = this._cardData?.customizations || {};
    
    // Debug: Log customizations on first call
    if (!this._customizationsLogged && Object.keys(customizations).length > 0) {
      console.log('%c[BaseCard] ✅ Customizations loaded:', 'color: #10b981; font-weight: bold', customizations);
      this._customizationsLogged = true;
    } else if (!this._customizationsLogged) {
      console.warn('%c[BaseCard] ⚠️ No customizations found in cardData', 'color: #ef4444; font-weight: bold');
      this._customizationsLogged = true;
    }
    
    return customizations;
  }
  
  /**
   * Extract and normalize all color values from customizations
   * Uses official Customizations interface property names only
   * Layout-specific colors are handled by individual layouts
   * @returns {Object} Normalized color values with kebab-case keys
   */
  extractColors() {
    const customization = this.getCustomization();
    const typography = customization.typography || {};
    
    // Base colors - ONLY from Customizations interface
    const cardBg = customization.background?.value || '#FFFFFF';
    const colors = {
      'card-bg': cardBg,
      'button-color': customization.button_color,
      'icon-color': customization.icon_color,
      'secondary-color': customization.secondary_color,
      'user-info-color': customization.user_info_color,
      'primary-color': customization.background_color, // Primary color for stripes and other elements
      'divider-color': this.getDarkerColor(cardBg, 15) // Divider is 15% darker than card background
    };
    
    // Typography colors (from typography object)
    if (typography.personal_info) {
      colors['personal-info-color'] = typography.personal_info.google_font_colour;
    }
    if (typography.company_details) {
      colors['company-details-color'] = typography.company_details.google_font_colour;
    }
    if (typography.contact_details) {
      colors['contact-details-color'] = typography.contact_details.google_font_colour;
    }
    if (typography.bio) {
      colors['bio-color'] = typography.bio.google_font_colour;
    }
    if (typography.button) {
      colors['button-text-color'] = typography.button.google_font_colour;
    }
    if (typography.button) {
      colors['button-text-color-typo'] = typography.button.google_font_colour || colors['button-text-color'];
    }
    
    return colors;
  }
  
  /**
   * Convert Google Font style name to CSS font-weight
   * @param {string} styleName - Style name (e.g., 'Light', 'Regular', 'Semi Bold', 'Bold')
   * @returns {number} Font weight value (300-700)
   */
  getFontWeight(styleName) {
    const weightMap = {
      'Thin': 100,
      'Extra Light': 200,
      'Light': 300,
      'Regular': 400,
      'Medium': 500,
      'Semi Bold': 600,
      'Bold': 700,
      'Extra Bold': 800,
      'Black': 900
    };
    return weightMap[styleName] || 400; // Default to Regular (400)
  }

  /**
   * Extract typography settings from customization
   * @returns {Object} Typography settings
   */
  extractTypography() {
    const customization = this.getCustomization();
    const typography = customization.typography || {};
    
    return {
      // Font family
      fontFamily: typography.font_family || customization.font_style || 'Roboto',
      fontType: typography.font_type || customization.font_type || 'google',
      customFontUrl: customization.custom_font_url || '',
      
      // Personal info (name)
      personalInfo: {
        fontSize: typography.personal_info?.google_font_size || customization.title_font_size || 24,
        fontStyle: typography.personal_info?.google_font_style || customization.profile_info || 'Semi Bold',
        fontWeight: this.getFontWeight(typography.personal_info?.google_font_style || customization.profile_info || 'Semi Bold'),
        fontColor: typography.personal_info?.google_font_colour || customization.user_info_color || '#000000'
      },
      
      // Company details
      companyDetails: {
        fontSize: typography.company_details?.google_font_size || 16,
        fontStyle: typography.company_details?.google_font_style || customization.company_details || 'Regular',
        fontWeight: this.getFontWeight(typography.company_details?.google_font_style || customization.company_details || 'Regular'),
        fontColor: typography.company_details?.google_font_colour || '#000000'
      },
      
      // Contact details
      contactDetails: {
        fontSize: typography.contact_details?.google_font_size || 14,
        fontStyle: typography.contact_details?.google_font_style || customization.contact_details || 'Medium',
        fontWeight: this.getFontWeight(typography.contact_details?.google_font_style || customization.contact_details || 'Medium'),
        fontColor: typography.contact_details?.google_font_colour || '#000000'
      },
      
      // Bio/Summary
      bio: {
        fontSize: typography.bio?.google_font_size || 16,
        fontStyle: typography.bio?.google_font_style || 'Regular',
        fontWeight: this.getFontWeight(typography.bio?.google_font_style || 'Regular'),
        fontColor: typography.bio?.google_font_colour || '#000000'
      },
      
      // Button
      button: {
        fontSize: typography.button?.google_font_size || 20,
        fontStyle: typography.button?.google_font_style || customization.button || 'Regular',
        fontWeight: this.getFontWeight(typography.button?.google_font_style || customization.button || 'Regular'),
        fontColor: typography.button?.google_font_colour || '#FFFFFF'
      }
    };
  }
  
  /**
   * Extract background settings from customization
   * @returns {Object} Background settings
   */
  extractBackground() {
    const customization = this.getCustomization();
    const background = customization.background || {};
    
    return {
      type: background.type || 'color', // 'color' or 'image'
      value: background.value || customization.background_color || '#FFFFFF',
      color: customization.background_color || background.value || '#FFFFFF'
    };
  }
  
  /**
   * Get all customization settings in a structured format
   * @returns {Object} All customization settings
   */
  getAllCustomizations() {
    return {
      colors: this.extractColors(),
      typography: this.extractTypography(),
      background: this.extractBackground(),
      raw: this.getCustomization() // Raw customization object for custom access
    };
  }
  
  /**
   * Apply all customizations (colors, typography, background) to card container as CSS variables
   * Call this in render() BEFORE any content rendering
   * Stores customizations for quick access by child classes
   */
  applyCustomColors() {
    const colors = this.extractColors();
    const typography = this.extractTypography();
    const background = this.extractBackground();
    
    // Store for child classes to access
    this._colors = colors;
    this._typography = typography;
    this._background = background;
    
    // Apply CSS variables to BOTH the container AND the shadow root host
    // This ensures ALL elements (including fixed buttons outside container) inherit the variables
    const container = this._shadowRoot?.querySelector('.uqc-card-container');
    const shadowHost = this._shadowRoot?.host;
    
    if (!container) return;
    
    // Apply colors to both container and shadow host for inheritance
    const applyColorsTo = (element) => {
      Object.entries(colors).forEach(([key, value]) => {
        element.style.setProperty(`--${key}`, value);
      });
    };
    
    applyColorsTo(container);
    if (shadowHost) applyColorsTo(shadowHost);
    
    // Apply typography to both container and shadow host
    const applyTypographyTo = (element) => {
      element.style.setProperty('--font-family', typography.fontFamily);
      element.style.setProperty('--font-type', typography.fontType);
      
      // Personal info typography
      element.style.setProperty('--personal-info-size', `${typography.personalInfo.fontSize}px`);
      element.style.setProperty('--personal-info-style', typography.personalInfo.fontStyle);
      element.style.setProperty('--personal-info-weight', typography.personalInfo.fontWeight);
      element.style.setProperty('--personal-info-color', typography.personalInfo.fontColor);
      
      // Company details typography
      element.style.setProperty('--company-details-size', `${typography.companyDetails.fontSize}px`);
      element.style.setProperty('--company-details-style', typography.companyDetails.fontStyle);
      element.style.setProperty('--company-details-weight', typography.companyDetails.fontWeight);
      element.style.setProperty('--company-details-color', typography.companyDetails.fontColor);
      
      // Contact details typography
      element.style.setProperty('--contact-details-size', `${typography.contactDetails.fontSize}px`);
      element.style.setProperty('--contact-details-style', typography.contactDetails.fontStyle);
      element.style.setProperty('--contact-details-weight', typography.contactDetails.fontWeight);
      element.style.setProperty('--contact-details-color', typography.contactDetails.fontColor);
      
      // Bio typography
      element.style.setProperty('--bio-size', `${typography.bio.fontSize}px`);
      element.style.setProperty('--bio-style', typography.bio.fontStyle);
      element.style.setProperty('--bio-weight', typography.bio.fontWeight);
      element.style.setProperty('--bio-color', typography.bio.fontColor);
      
      // Button typography
      element.style.setProperty('--button-size', `${typography.button.fontSize}px`);
      element.style.setProperty('--button-style', typography.button.fontStyle);
      element.style.setProperty('--button-weight', typography.button.fontWeight);
      element.style.setProperty('--button-text-color-final', typography.button.fontColor);
    };
    
    applyTypographyTo(container);
    if (shadowHost) applyTypographyTo(shadowHost);
    
    // Apply background
    if (background.type === 'image' && background.value) {
      container.style.setProperty('--card-bg-type', 'image');
      container.style.setProperty('--card-bg-image', `url(${background.value})`);
    } else {
      container.style.setProperty('--card-bg-type', 'color');
      container.style.setProperty('--card-bg-color', background.color);
    }
    
    // Load Google Font or custom font if specified
    if (typography.fontType === 'google' && typography.fontFamily) {
      this.loadGoogleFont(typography.fontFamily);
    } else if (typography.customFontUrl) {
      this.loadCustomFont(typography.customFontUrl, typography.fontFamily);
    }
  }
  
  /**
   * Load Google Font from Google Fonts API
   * @param {string} family - Font family name (e.g., 'Roboto', 'Cookie', 'Open Sans')
   */
  loadGoogleFont(family) {
    if (!family) return;
    
    // Check if font is already loaded
    const fontId = `google-font-${family.replace(/\s+/g, '-').toLowerCase()}`;
    if (document.getElementById(fontId)) return;
    
    // Create link element for Google Fonts
    const link = document.createElement('link');
    link.id = fontId;
    link.rel = 'stylesheet';
    // Load multiple weights for the font family
    link.href = `https://fonts.googleapis.com/css2?family=${family.replace(/\s+/g, '+')}:wght@300;400;500;600;700&display=swap`;
    document.head.appendChild(link);
    
    console.log(`[BaseCard] 🔤 Loaded Google Font: ${family}`);
  }
  
  /**
   * Load custom font from URL
   * @param {string} url - Font URL
   * @param {string} family - Font family name
   */
  loadCustomFont(url, family) {
    if (!url) return;
    
    // Check if font is already loaded
    const fontId = `custom-font-${family.replace(/\s+/g, '-').toLowerCase()}`;
    if (document.getElementById(fontId)) return;
    
    // Create @font-face style
    const style = document.createElement('style');
    style.id = fontId;
    style.textContent = `
      @font-face {
        font-family: '${family}';
        src: url('${url}');
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }
  
  /**
   * Get a specific color value (reactive to cardData changes)
   * @param {string} colorName - Color name (e.g., 'icon-color', 'button-color')
   * @returns {string} Color value (hex)
   */
  getColor(colorName) {
    // Try cached colors first
    if (this._colors && this._colors[colorName]) {
      return this._colors[colorName];
    }
    
    // Fallback: read from CSS variable
    const container = this._shadowRoot?.querySelector('.uqc-card-container');
    return container?.style.getPropertyValue(`--${colorName}`) || '#000000';
  }
  
  /**
   * Get typography settings (reactive to cardData changes)
   * @returns {Object} Typography settings
   */
  getTypography() {
    return this._typography || this.extractTypography();
  }
  
  /**
   * Get specific typography for a section
   * @param {string} section - Section name ('personalInfo', 'companyDetails', 'contactDetails', 'bio', 'button')
   * @returns {Object} Typography settings for section
   */
  getTypographyFor(section) {
    const typography = this.getTypography();
    return typography[section] || { fontSize: 14, fontStyle: 'Regular', fontColor: '#000000' };
  }
  
  /**
   * Get background settings (reactive to cardData changes)
   * @returns {Object} Background settings
   */
  getBackground() {
    return this._background || this.extractBackground();
  }
  
  /**
   * Get font family from customization
   * @returns {string} Font family name
   */
  getFontFamily() {
    const typography = this.getTypography();
    return typography.fontFamily;
  }
  
  /**
   * Get personal information in a structured format
   * @returns {Object} Personal info with computed properties
   */
  getPersonalInfo() {
    const { 
      first_name, last_name, prefix, suffix, pronouns_v2,
      designation, company, department, summary 
    } = this._cardData;
    
    return {
      fullName: this.getFullName(),
      firstName: first_name,
      lastName: last_name,
      prefix,
      suffix,
      pronouns: pronouns_v2,
      designation,
      company,
      department,
      summary,
      initials: this.getInitials()
    };
  }
  
  /**
   * Get contact information with proper ordering
   * @returns {Array|Object} Contact info (ordered array if ordering specified, object otherwise)
   */
  getContactInfo() {
    const { 
      phone_v2, email_v2, website_v2, address_v2, 
      custom_fields, contact_info_ordering 
    } = this._cardData;
    
    const contactData = {
      phone_v2: phone_v2 || [],
      email_v2: email_v2 || [],
      website_v2: website_v2 || [],
      address_v2: address_v2 || '',
      custom_fields: custom_fields || []
    };
    
    // Apply ordering if specified
    if (contact_info_ordering) {
      return this.orderContactInfo(contactData, contact_info_ordering);
    }
    
    return contactData;
  }
  
  /**
   * Order contact info according to specified ordering
   * @param {Object} contactData - Raw contact data
   * @param {Object} ordering - Ordering specification
   * @returns {Array} Ordered contact items
   */
  orderContactInfo(contactData, ordering) {
    const orderedKeys = Object.keys(ordering)
      .sort((a, b) => parseInt(a) - parseInt(b))
      .map(key => ordering[key]);
    
    return orderedKeys.map(key => ({
      type: key,
      items: contactData[key]
    })).filter(item => {
      // Filter out empty items
      if (typeof item.items === 'string') {
        return !!item.items;
      }
      return Array.isArray(item.items) && item.items.length > 0;
    });
  }
  
  /**
   * Get social links with proper ordering
   * @returns {Array} Array of {platform, url} objects in correct order
   */
  getSocialLinks() {
    const { social_links, social_links_ordering } = this._cardData;
    
    if (!social_links) return [];
    
    let platforms;
    
    if (social_links_ordering) {
      // Use specified order
      platforms = Object.keys(social_links_ordering)
        .sort((a, b) => parseInt(a) - parseInt(b))
        .map(key => social_links_ordering[key])
        .filter(platform => social_links[platform]); // Only platforms with URLs
    } else {
      // Default: all platforms with URLs
      platforms = Object.keys(social_links).filter(platform => social_links[platform]);
    }
    
    return platforms.map(platform => ({
      platform,
      url: social_links[platform]
    }));
  }
  
  /**
   * Get image URLs
   * @returns {Object} All image URLs
   */
  getImages() {
    return {
      cover: this._cardData?.cover_image_url || '',
      profile: this._cardData?.user_image_url || '',
      logo: this._cardData?.logo_url || '',
      logoSize: this._cardData?.logo_size || 80
    };
  }
  
  // ============================================================================
  // STICKY BUTTON & FOOTER METHODS
  // ============================================================================
  
  /**
   * Get sticky button and footer template
   * @returns {string} HTML template with styles
   */
  getStickyButtonTemplate() {
    const config = this._config || {};
    
    // Get config flags
    const leadCollection = config.leadCollection || false;
    const showConnectButtons = config.showConnectButtons || false;
    const hideFooter = config.hideFooter || false;
    const pwaPreview = config.pwaPreview || false;
    const autodownloadUrl = this._cardData?.autodownload_url || '#';
    
    return `
      <style>
        .fixed-btn-container {
          position: fixed;
          display: ${pwaPreview ? 'none' : 'flex'};
          flex-direction: column;
          max-width: 500px;
          bottom: 0px;
          padding: 12px 0px;
          background: rgba(255, 255, 255, 0.80);
          box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.04);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          width: -webkit-fill-available;
          align-items: center;
          z-index: 1000;
        }

        .btn, .btn-exchange {
          background-color: var(--button-color, #203D99);
          color: var(--button-text-color, #EBEBEB);
          border-radius: 10px;
          box-shadow: 0px 4px 4px rgba(98, 62, 9, 0.16);
          height: 48px;
          width: 90%;
          cursor: pointer;
          border: none;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          font-size: 18px;
          font-weight: 400;
          font-family: 'Inter', sans-serif;
        }

        #btn-connect-container {
          display: ${showConnectButtons ? 'flex' : 'none'};
          justify-content: space-between;
          align-items: center;
          height: 48px;
          width: 90%;
          gap: 16px;
        }

        .btn-connect {
          border: 1px solid var(--button-color, #203D99);
          color: var(--button-color, #203D99);
          background: transparent;
          border-radius: 10px;
          box-shadow: 0px 4px 4px rgba(98, 62, 9, 0.16);
          cursor: pointer;
          width: 100%;
          height: 46px;
          font-size: 16px;
          font-family: 'Inter', sans-serif;
        }

        .btn-create {
          background: var(--button-color, #203D99);
          color: var(--button-text-color, #EBEBEB);
          border: none;
          border-radius: 10px;
          box-shadow: 0px 4px 4px rgba(98, 62, 9, 0.16);
          cursor: pointer;
          width: 100%;
          height: 48px;
          font-size: 16px;
          font-family: 'Inter', sans-serif;
        }

        .uniqode-branding-footer {
          display: ${hideFooter ? 'none' : 'flex'};
          justify-content: center;
          align-items: center;
          padding: 12px 0px 0px 0px;
        }

        .uniqode-branding-footer-text {
          line-height: 17px;
          font-size: 14px;
          font-weight: 400;
          font-family: 'Inter', sans-serif;
        }
        
        .uniqode-logo-image {
          height: 16px;
          width: auto;
          margin-left: 5px;
          margin-top: 4px;
        }

        .create-your-free-card-link {
          text-decoration: underline;
          color: inherit;
          cursor: pointer;
        }
      </style>
      
      <div class="fixed-btn-container">
        ${leadCollection ? this.getExchangeButtonsHTML(showConnectButtons) : this.getAddToContactHTML(autodownloadUrl)}
        ${this.getFooterHTML()}
      </div>
    `;
  }
  
  /**
   * Get "Add to Contacts" button HTML (when lead collection is disabled)
   */
  getAddToContactHTML(autodownloadUrl) {
    return `
      <div class="btn" id="add-to-contact-main-page" data-add-to-contact>
        <svg width="22" height="22" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_434_678)">
          <path d="M10.6667 14V12.6667C10.6667 11.9594 10.3857 11.2811 9.88564 10.781C9.38554 10.281 8.70726 10 8.00002 10H3.33335C2.62611 10 1.94783 10.281 1.44774 10.781C0.947639 11.2811 0.666687 11.9594 0.666687 12.6667V14M13.3334 5.33333V9.33333M15.3334 7.33333H11.3334M8.33335 4.66667C8.33335 6.13943 7.13945 7.33333 5.66669 7.33333C4.19393 7.33333 3.00002 6.13943 3.00002 4.66667C3.00002 3.19391 4.19393 2 5.66669 2C7.13945 2 8.33335 3.19391 8.33335 4.66667Z" stroke="var(--button-text-color, #EBEBEB)" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </g>
          <defs>
          <clipPath id="clip0_434_678">
          <rect width="16" height="16" fill="white"/>
          </clipPath>
          </defs>
        </svg>
        <span>Add to Contacts</span>
      </div>
    `;
  }
  
  /**
   * Get exchange/connect buttons HTML (when lead collection is enabled)
   */
  getExchangeButtonsHTML(showConnectButtons) {
    return `
      <div class="btn-exchange" id="btn-exchange" style="display: ${showConnectButtons ? 'none' : 'flex'};" data-exchange-contacts>
        <i class="fas fa-exchange-alt" style="color: var(--button-text-color, #EBEBEB); font-size: 22px;"></i>
        <span>Exchange Contacts</span>
      </div>

      <div id="btn-connect-container">
        <button class="btn-connect" id="btn-connect" data-connect>
          Connect
        </button>
        <button class="btn-create" id="btn-create" data-create-card>
          Create Now
        </button>
      </div>
    `;
  }
  
  /**
   * Get footer HTML
   */
  getFooterHTML() {
    const config = this._config || {};
    const hidePoweredBy = config.hidePoweredBy || false;
    const cardSlug = this._cardData?.slug || 'slug';
    const staticAssetsUrl = this._cardData?.static_assets_url || '';
    
    return `
      <div id="footer-with-exchange" class="uniqode-branding-footer">
        <span class="uniqode-branding-footer-text"> 
          ${hidePoweredBy 
            ? 'Created with'
            : '<a href="#" class="create-your-free-card-link" data-footer-cta data-card-slug="' + cardSlug + '">Create your free card</a> with'
          }
        </span> 
        <a href="https://www.uniqode.com/digital-business-card?utm_source=dbc_footer&utm_medium=referral&utm_campaign=flywheel"
          target="_blank" rel="noopener" data-footer-logo>
          <img src="${staticAssetsUrl}/static/images/footer/uniqode.svg" alt="Uniqode Logo" class="uniqode-logo-image">
        </a>
      </div>
    `;
  }
  
  /**
   * Get button text color based on background color
   */
  getButtonTextColor(bgColor) {
    // Simple contrast calculation
    const color = bgColor.replace('#', '');
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 186 ? '#000000' : '#ffffff';
  }
  
  // ===== COLOR UTILITIES =====
  
  /**
   * Convert hex color to HSL
   * @param {string} hex - Hex color (e.g., '#7c2538')
   * @returns {object} { h: 0-360, s: 0-100, l: 0-100 }
   */
  hexToHSL(hex) {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    return { h: h * 360, s: s * 100, l: l * 100 };
  }
  
  /**
   * Convert HSL to hex color
   * @param {number} h - Hue (0-360)
   * @param {number} s - Saturation (0-100)
   * @param {number} l - Lightness (0-100)
   * @returns {string} Hex color (e.g., '#7c2538')
   */
  hslToHex(h, s, l) {
    s /= 100;
    l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
  
  /**
   * Generate a color palette from a base color
   * Creates variants by adjusting lightness while keeping hue and saturation
   * @param {string} baseColor - Hex color (e.g., '#7c2538')
   * @param {number[]} lightnessValues - Array of lightness values (0-100)
   * @returns {string[]} Array of hex colors
   */
  generateColorPalette(baseColor, lightnessValues) {
    if (!baseColor) return [];
    const hsl = this.hexToHSL(baseColor);
    return lightnessValues.map(l => this.hslToHex(hsl.h, hsl.s, l));
  }
  
  /**
   * Get a darker version of a color by reducing lightness
   * @param {string} hexColor - Hex color (e.g., '#ffffff')
   * @param {number} amount - Amount to darken (0-100, percentage points to reduce lightness)
   * @returns {string} Darker hex color
   */
  getDarkerColor(hexColor, amount = 10) {
    if (!hexColor) return '#E0E0E0'; // Default gray if no color provided
    try {
      const hsl = this.hexToHSL(hexColor);
      // Reduce lightness, but don't go below 0
      const newLightness = Math.max(0, hsl.l - amount);
      return this.hslToHex(hsl.h, hsl.s, newLightness);
    } catch (e) {
      console.warn('[BaseCard] getDarkerColor failed:', e);
      return '#E0E0E0';
    }
  }
  
  /**
   * Attach event listeners for sticky buttons
   */
  attachStickyButtonListeners() {
    // Add to Contact button
    this._shadowRoot.querySelector('[data-add-to-contact]')?.addEventListener('click', (e) => {
      const autodownloadUrl = this._cardData?.autodownload_url;
      this.emitEvent(CARD_EVENTS.ADD_TO_CONTACT_CLICK, { url: autodownloadUrl });
    });
    
    // Exchange Contacts button
    this._shadowRoot.querySelector('[data-exchange-contacts]')?.addEventListener('click', () => {
      // Open lead form (rendered by LeadFormMixin)
      this.openLeadForm();
      
      // Also emit event for external listeners (e.g., analytics)
      this.emitEvent(CARD_EVENTS.EXCHANGE_CONTACTS_CLICK);
    });
    
    // Connect button
    this._shadowRoot.querySelector('[data-connect]')?.addEventListener('click', () => {
      this.emitEvent(CARD_EVENTS.CONNECT_CLICK);
    });
    
    // Create Now button
    this._shadowRoot.querySelector('[data-create-card]')?.addEventListener('click', (e) => {
      const cardSlug = this._cardData?.slug || 'slug';
      this.emitEvent(CARD_EVENTS.CREATE_NOW_CLICK, { slug: cardSlug });
    });
    
    // Footer CTA link
    this._shadowRoot.querySelector('[data-footer-cta]')?.addEventListener('click', (e) => {
      e.preventDefault();
      const cardSlug = e.target.getAttribute('data-card-slug');
      this.emitEvent(CARD_EVENTS.FOOTER_CTA_CLICK, { slug: cardSlug });
    });
    
    // Footer logo
    this._shadowRoot.querySelector('[data-footer-logo]')?.addEventListener('click', () => {
      this.emitEvent(CARD_EVENTS.FOOTER_LOGO_CLICK);
    });
  }
  
  /**
   * PUBLIC METHOD: Show "Connect" and "Create Now" buttons (called after lead exchange)
   */
  showConnectButtons() {
    // Update config
    this._config.showConnectButtons = true;
    this._config.hideFooter = true;
    
    // Update DOM directly without full re-render
    const exchangeBtn = this._shadowRoot.getElementById('uqc-btn-exchange');
    const connectContainer = this._shadowRoot.getElementById('uqc-btn-connect-container');
    const footer = this._shadowRoot.getElementById('uqc-footer-with-exchange');
    
    if (exchangeBtn) exchangeBtn.style.display = 'none';
    if (connectContainer) connectContainer.style.display = 'flex';
    if (footer) footer.style.display = 'none';
    
    console.log('[StickyButton] State changed: showing Connect + Create Now buttons');
  }
  
  /**
   * PUBLIC METHOD: Reset to "Exchange Contacts" button (for testing/reset)
   */
  resetToExchangeButton() {
    this._config.showConnectButtons = false;
    this._config.hideFooter = false;
    
    const exchangeBtn = this._shadowRoot.getElementById('uqc-btn-exchange');
    const connectContainer = this._shadowRoot.getElementById('uqc-btn-connect-container');
    const footer = this._shadowRoot.getElementById('uqc-footer-with-exchange');
    
    if (exchangeBtn) exchangeBtn.style.display = 'flex';
    if (connectContainer) connectContainer.style.display = 'none';
    if (footer) footer.style.display = 'flex';
  }
  
  /**
   * Check if lead form should auto-open on page load
   * Opens form if lead_collection is true and lead_attribute.connection is '1' or '1' (string/number)
   */
  checkAutoOpenLeadForm() {
    const cardData = this._cardData || {};
    const leadAttribute = cardData.lead_attribute || {};
    
    // Check if lead collection is enabled and connection attribute is set to '1' (or 1 as number)
    const connectionValue = leadAttribute.connection;
    const shouldAutoOpen = cardData.lead_collection && (connectionValue === '1' || connectionValue === 1);
    
    if (shouldAutoOpen) {
      console.log('[LeadForm] Auto-opening lead form (lead_collection=true, connection=' + connectionValue + ')');
      
      // Delay slightly to ensure DOM is fully ready
      setTimeout(() => {
        if (this.openLeadForm) {
          this.openLeadForm();
          
          // Emit event for analytics
          this.emitEvent(CARD_EVENTS.LEAD_FORM_OPEN, { source: 'automatic' });
        }
      }, 200);
    } else {
      console.log('[LeadForm] Auto-open skipped:', {
        lead_collection: cardData.lead_collection,
        connection: connectionValue,
        has_lead_attribute: !!cardData.lead_attribute
      });
    }
  }
  
  // ===== ABSTRACT METHODS (must be implemented by subclasses) =====
  
  /**
   * Render the component
   * Must be implemented by subclasses
   */
  render() {
    throw new Error(`render() method must be implemented by ${this.constructor.name}`);
  }
  
  /**
   * Get component template
   * Must be implemented by subclasses
   * @returns {string} HTML template string
   */
  getTemplate() {
    throw new Error(`getTemplate() method must be implemented by ${this.constructor.name}`);
  }
  
  // ===== STATIC PROPERTIES =====
  
  /**
   * Layout identifier
   * Must be defined by subclasses
   */
  static get layoutId() {
    throw new Error(`layoutId must be defined by ${this.name} class`);
  }
  
  /**
   * Component version
   */
  static get version() {
    return '1.0.0';
  }
}

export default BaseCard;
