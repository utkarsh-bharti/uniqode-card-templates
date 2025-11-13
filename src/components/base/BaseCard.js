import { validateCardData } from '../../shared/utils/validation.js';
import { getInitials } from '../../shared/utils/initials.js';
import { hexToRGBA } from '../../shared/utils/colors.js';

/**
 * Base class for all Uniqode Card Template Components
 * 
 * Production-Grade Features:
 * - Attribute-based data passing (declarative)
 * - Property-based data passing (imperative)
 * - Comprehensive event system with preventDefault support
 * - Framework-agnostic design
 * - Performance optimized
 * 
 * @example
 * // Declarative (via attributes)
 * <uniqode-layout-12 card-data='{"first_name":"John"}' config='{"showLogo":true}'></uniqode-layout-12>
 * 
 * @example
 * // Imperative (via properties)
 * const card = document.querySelector('uniqode-layout-12');
 * card.cardData = { first_name: "John", last_name: "Doe" };
 * card.addEventListener('contact-click', (e) => console.log(e.detail));
 */
export class BaseCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
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
    
    // Setup shadow DOM template
    this.shadowRoot.innerHTML = this.getTemplate();
    
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
    this.emitEvent('card-ready', {
      layout: this.constructor.layoutId,
      hasData: Object.keys(this._cardData).length > 0,
      hasConfig: Object.keys(this._config).length > 0
    });
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
   * @param {string} eventName - Event name
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
    
    // Emit event - consumer can preventDefault()
    const shouldContinue = this.emitEvent('contact-click', detail);
    
    if (!shouldContinue) {
      return; // Consumer prevented default action
    }
    
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
    const shouldContinue = this.emitEvent('save-contact', detail);
    
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
    
    const shouldContinue = this.emitEvent('social-click', detail);
    
    if (!shouldContinue) {
      return;
    }
    
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
