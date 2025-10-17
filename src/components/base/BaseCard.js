import { validateCardData } from '../../shared/utils/validation.js';
import { getInitials } from '../../shared/utils/initials.js';
import { hexToRGBA } from '../../shared/utils/colors.js';

/**
 * Base class for all Uniqode Card Template Components
 * Provides shared functionality and consistent behavior across all layouts
 */
export class BaseCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Internal state
    this._cardData = {};
    this._isConnected = false;
    this._eventListeners = new Map();
    
    // Bind methods to maintain context
    this.handleCardShare = this.handleCardShare.bind(this);
    this.handleContactClick = this.handleContactClick.bind(this);
    this.handleLeadCollect = this.handleLeadCollect.bind(this);
  }
  
  // ===== LIFECYCLE METHODS =====
  
  connectedCallback() {
    this._isConnected = true;
    this.setupComponent();
    this.setupEventListeners();
    this.render();
  }
  
  disconnectedCallback() {
    this._isConnected = false;
    this.cleanup();
  }
  
  // ===== PROPERTIES =====
  
  /**
   * Set card data and trigger re-render
   * @param {Object} data - Card data object
   */
  set cardData(data) {
    if (!data) {
      console.warn('Card data is null or undefined');
      return;
    }
    
    // Validate data structure
    const validationResult = validateCardData(data);
    if (!validationResult.isValid) {
      console.warn('Invalid card data:', validationResult.errors);
      return;
    }
    
    // Deep clone to prevent external mutations
    this._cardData = JSON.parse(JSON.stringify(data));
    
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
  
  // ===== SHARED UTILITY METHODS =====
  
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
   * @param {string} hex - Hex color code
   * @param {number} opacity - Opacity value (0-1)
   * @returns {string} RGBA color string
   */
  hexToRGBA(hex, opacity = 0.2) {
    return hexToRGBA(hex, opacity);
  }
  
  /**
   * Get full formatted name from card data
   * @returns {string} Full name
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
   * Apply visual customizations to component
   */
  applyCustomizations() {
    const { customizations } = this._cardData;
    if (!customizations) return;
    
    // Apply CSS custom properties
    const cssVars = {
      '--bg-color': customizations.background_color || '#ffffff',
      '--text-color': customizations.icon_color || '#333333',
      '--button-color': customizations.button_color || '#007bff',
      '--font-family': customizations.font_style || 'Work Sans, sans-serif'
    };
    
    Object.entries(cssVars).forEach(([property, value]) => {
      this.style.setProperty(property, value);
    });
    
    // Apply typography if available
    if (customizations.typography) {
      this.applyTypography(customizations.typography);
    }
  }
  
  /**
   * Apply typography settings
   * @param {Object} typography - Typography configuration
   */
  applyTypography(typography) {
    const typographyVars = {
      '--name-font-size': typography.personal_info?.google_font_size ? `${typography.personal_info.google_font_size}px` : '24px',
      '--designation-font-size': typography.company_details?.google_font_size ? `${typography.company_details.google_font_size}px` : '16px',
      '--contact-font-size': typography.contact_details?.google_font_size ? `${typography.contact_details.google_font_size}px` : '14px',
      '--bio-font-size': typography.bio?.google_font_size ? `${typography.bio.google_font_size}px` : '14px'
    };
    
    Object.entries(typographyVars).forEach(([property, value]) => {
      this.style.setProperty(property, value);
    });
  }
  
  /**
   * Render contact items (phone, email, website)
   * @param {string} containerSelector - CSS selector for contacts container
   */
  renderContacts(containerSelector) {
    const container = this.shadowRoot.querySelector(containerSelector);
    if (!container) return;
    
    container.innerHTML = '';
    
    // Render contacts in order based on contact_info_ordering or default order
    const orderList = this._cardData.contact_info_ordering || ['phone_v2', 'email_v2', 'website_v2'];
    
    orderList.forEach(contactType => {
      switch (contactType) {
        case 'phone_v2':
          this.renderContactType('phone_v2', container, 'phone');
          break;
        case 'email_v2':
          this.renderContactType('email_v2', container, 'email');
          break;
        case 'website_v2':
          this.renderContactType('website_v2', container, 'website');
          break;
        case 'custom_fields':
          this.renderContactType('custom_fields', container, 'custom');
          break;
      }
    });
  }
  
  /**
   * Render specific contact type
   * @param {string} dataKey - Key in card data
   * @param {Element} container - Container element
   * @param {string} type - Contact type
   */
  renderContactType(dataKey, container, type) {
    const contacts = this._cardData[dataKey];
    if (!contacts || !Array.isArray(contacts)) return;
    
    contacts.forEach((contact, index) => {
      if (!contact.value || !contact.value.trim()) return;
      
      const contactEl = document.createElement('div');
      contactEl.className = `contact-item contact-${type}`;
      contactEl.innerHTML = this.getContactHTML(contact, type);
      contactEl.onclick = () => this.handleContactClick(type, contact.value, contact.label);
      
      // Add data attributes for extensions
      contactEl.setAttribute('data-contact-type', type);
      contactEl.setAttribute('data-contact-value', contact.value);
      contactEl.setAttribute('data-contact-index', index);
      
      container.appendChild(contactEl);
    });
  }
  
  /**
   * Get HTML template for contact item
   * Override in subclasses for custom contact layouts
   * @param {Object} contact - Contact object
   * @param {string} type - Contact type
   * @returns {string} HTML string
   */
  getContactHTML(contact, type) {
    return `
      <div class="contact-icon">
        ${this.getContactIcon(type)}
      </div>
      <div class="contact-content">
        <span class="contact-value">${contact.value}</span>
        ${contact.label ? `<span class="contact-label">${contact.label}</span>` : ''}
      </div>
    `;
  }
  
  /**
   * Get SVG icon for contact type
   * @param {string} type - Contact type
   * @returns {string} SVG icon
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
      custom: `<svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>`
    };
    
    return icons[type] || icons.custom;
  }
  
  // ===== EVENT HANDLING =====
  
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
  
  /**
   * Add event listener with automatic cleanup
   * @param {Element} element - Target element
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   */
  addEventListenerWithCleanup(element, event, handler) {
    element.addEventListener(event, handler);
    this._eventListeners.set(element, { event, handler });
  }
  
  /**
   * Handle card share event
   */
  handleCardShare() {
    const shareData = {
      cardData: this._cardData,
      layout: this.constructor.layoutId,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };
    
    this.dispatchEvent(new CustomEvent('card-share', {
      detail: shareData,
      bubbles: true,
      composed: true
    }));
    
    // Analytics tracking
    this.trackEvent('card_shared', shareData);
  }
  
  /**
   * Handle contact click event
   * @param {string} type - Contact type
   * @param {string} value - Contact value
   * @param {string} label - Contact label
   */
  handleContactClick(type, value, label) {
    const clickData = { type, value, label };
    
    this.dispatchEvent(new CustomEvent('contact-click', {
      detail: clickData,
      bubbles: true,
      composed: true
    }));
    
    // Default behavior for contact actions
    this.executeContactAction(type, value);
    
    // Analytics tracking
    this.trackEvent('contact_clicked', clickData);
  }
  
  /**
   * Handle lead collection event
   */
  handleLeadCollect() {
    const leadData = {
      cardData: this._cardData,
      layout: this.constructor.layoutId,
      timestamp: new Date().toISOString()
    };
    
    this.dispatchEvent(new CustomEvent('lead-collect', {
      detail: leadData,
      bubbles: true,
      composed: true
    }));
    
    // Analytics tracking
    this.trackEvent('lead_collect_initiated', leadData);
  }
  
  /**
   * Execute default contact action
   * @param {string} type - Contact type
   * @param {string} value - Contact value
   */
  executeContactAction(type, value) {
    try {
      switch (type) {
        case 'phone':
          window.open(`tel:${value}`);
          break;
        case 'email':
          window.open(`mailto:${value}`);
          break;
        case 'website':
          // Ensure URL has protocol
          const url = value.startsWith('http') ? value : `https://${value}`;
          window.open(url, '_blank', 'noopener,noreferrer');
          break;
      }
    } catch (error) {
      console.warn(`Failed to execute ${type} action:`, error);
    }
  }
  
  /**
   * Track analytics event
   * @param {string} eventName - Event name
   * @param {Object} data - Event data
   */
  trackEvent(eventName, data) {
    // Integration with analytics systems
    if (window.gtag) {
      window.gtag('event', eventName, {
        custom_parameter: data
      });
    }
    
    if (window.analytics && window.analytics.track) {
      window.analytics.track(eventName, data);
    }
    
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`📊 Analytics Event: ${eventName}`, data);
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
