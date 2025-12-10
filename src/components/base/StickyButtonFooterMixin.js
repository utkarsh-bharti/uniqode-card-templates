/**
 * Sticky Button & Footer Component
 * 
 * Reusable sticky button container and footer for all card layouts
 * Handles Exchange Contacts, Add to Contact, Connect, and Create Now buttons
 * 
 * Usage in any layout:
 * 1. Call getStickyButtonFooterTemplate() in getTemplate()
 * 2. Call attachStickyButtonFooterListeners() in attachEventListeners()
 * 3. Pass config flags in config object
 * 
 * Architecture:
 * - Library renders button HTML + footer HTML
 * - Emits events: exchange-contacts-click, add-to-contact-click, connect-click, etc.
 * - Server listens to events and handles business logic
 */

import { CARD_EVENTS } from '../../shared/constants/events.js';

export const StickyButtonFooterMixin = {
  /**
   * Get HTML template for sticky button container and footer
   * @returns {string} HTML string for sticky buttons and footer
   */
  getStickyButtonFooterTemplate: function () {
    const config = this._config || {};
    const cardData = this._cardData || {};
    
    // Use EXACT database schema field names from cardData
    // Config is ONLY for dynamic UI state (not database fields)
    const lead_collection = cardData.lead_collection ?? false;
    const showConnectButtons = config.showConnectButtons ?? false; // Dynamic: changes after lead submit
    const hideFooter = config.hideFooter ?? false; // Dynamic: UI control
    const branding_footer = cardData.branding_footer ?? false; // Database field
    const pwa_preview = cardData.pwa_preview ?? false;
    const autodownloadUrl = cardData.autodownload_url || '#';
    const cardSlug = cardData.slug || 'slug';
    const staticAssetsUrl = cardData.static_assets_url || '';
    
    return `
      <style>
        /* Sticky Button Container - Fixed at bottom with primary color background */
        /* Background color is applied dynamically via updateStickyButtons() */
        .uqc-fixed-btn-container {
          position: absolute;
          display: ${pwa_preview ? 'none' : 'flex'};
          flex-direction: column;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          padding: 12px 16px 8px 16px;  /* top right bottom left - button at very bottom */
          box-sizing: border-box;
          align-items: center;
          z-index: 1000;
          pointer-events: none;
        }
        
        .uqc-fixed-btn-container > * {
          pointer-events: auto;
        }

        .uqc-btn, .uqc-btn-exchange {
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
          font-size: var(--button-size, 18px);
          font-weight: var(--button-weight, 400);
          font-family: var(--font-family, 'Inter'), sans-serif;
        }

        .uqc-btn:hover, .uqc-btn-exchange:hover {
          opacity: 0.9;
        }

        .uqc-btn-connect-container {
          display: ${showConnectButtons ? 'flex' : 'none'};
          flex-direction: row;
          gap: 8px;
          width: 90%;
        }

        .uqc-btn-connect {
          flex: 1;
          width: auto;
          min-width: 0;
          padding: 12px 16px;
        }

        /* Footer - Single horizontal line */
        .uqc-footer-with-exchange {
          display: ${hideFooter || branding_footer ? 'none' : 'flex'};
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 100%;
          flex-wrap: wrap;
        }

        .uqc-powered-by-text {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 300;
          line-height: 16px;
          color: rgba(22, 33, 47, 0.50);
          margin: 0;
          white-space: nowrap;
        }
        
        .uqc-brand-name {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 600;
          line-height: 16px;
          color: rgba(22, 33, 47, 0.50);
          margin: 0;
          white-space: nowrap;
        }
        
        .uqc-separator {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 300;
          line-height: 16px;
          color: rgba(22, 33, 47, 0.50);
          margin: 0 4px;
        }

        .uqc-footer-cta-link {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          line-height: 16px;
          color: rgba(22, 33, 47, 0.50);
          text-decoration: none;
          cursor: pointer;
          white-space: nowrap;
        }

        .uqc-footer-cta-link:hover {
          text-decoration: underline;
        }

        .uqc-hidden {
          display: none !important;
        }
      </style>

      <!-- Sticky Button Container -->
      <!-- All buttons rendered initially, visibility controlled by updateStickyButtons() -->
      <div class="uqc-fixed-btn-container">
        ${this.getAddToContactHTML(autodownloadUrl)}
        ${this.getExchangeButtonsHTML(showConnectButtons, cardSlug)}
        ${this.getFooterHTML(hideFooter || branding_footer, cardSlug, staticAssetsUrl)}
      </div>
    `;
  },

  /**
   * Get "Add to Contact" button HTML
   */
  getAddToContactHTML: function (autodownloadUrl) {
    return `
      <a 
        class="uqc-btn" 
        id="uqc-btn-add-to-contact"
        href="${autodownloadUrl}"
        data-add-to-contact
        style="text-decoration: none;"
      >
        <i class="fas fa-user-plus" style="font-size: 20px;"></i>
        Add to Contacts
      </a>
    `;
  },

  /**
   * Get "Exchange Contacts" OR "Connect + Create Now" buttons HTML
   */
  getExchangeButtonsHTML: function (showConnectButtons, cardSlug) {
    const exchangeBtn = `
      <button 
        class="uqc-btn-exchange" 
        id="uqc-btn-exchange"
        data-exchange-contacts
        style="display: ${showConnectButtons ? 'none' : 'flex'};"
      >
        <i class="fas fa-exchange-alt" style="font-size: 20px;"></i>
        Exchange Contacts
      </button>
    `;

    const connectButtons = `
      <div class="uqc-btn-connect-container" id="uqc-btn-connect-container" style="display: ${showConnectButtons ? 'flex' : 'none'};">
        <button 
          class="uqc-btn uqc-btn-connect" 
          data-connect
        >
          <i class="fas fa-link" style="font-size: 20px;"></i>
          Connect
        </button>
        <button 
          class="uqc-btn uqc-btn-connect" 
          data-create-card
          data-card-slug="${cardSlug}"
        >
          <i class="fas fa-plus-circle" style="font-size: 20px;"></i>
          Create Now
        </button>
      </div>
    `;

    return exchangeBtn + connectButtons;
  },

  /**
   * Get footer HTML (Powered by Uniqode)
   */
  getFooterHTML: function (hideFooter, cardSlug, staticAssetsUrl) {
    if (hideFooter) return '';

    return `
      <div class="uqc-footer-with-exchange" id="uqc-footer-with-exchange">
        <span class="uqc-powered-by-text">Powered by</span>
        <span class="uqc-brand-name">Uniqode</span>
        <span class="uqc-separator">•</span>
        <a 
          href="#" 
          class="uqc-footer-cta-link" 
          data-footer-cta
          data-card-slug="${cardSlug}"
        >
          Create your free card with Uniqode
        </a>
      </div>
    `;
  },

  /**
   * Get button text color based on background color
   * Ensures good contrast for accessibility
   */
  getButtonTextColor: function (bgColor) {
    // Remove # if present
    const hex = bgColor.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white for dark backgrounds, black for light backgrounds
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  },

  /**
   * Update sticky buttons based on current cardData and config
   * Called during render() to ensure buttons reflect current state
   */
  updateStickyButtons: function () {
    const cardData = this._cardData || {};
    const config = this._config || {};
    
    const lead_collection = cardData.lead_collection ?? false;
    const showConnectButtons = config.showConnectButtons ?? false;
    
    console.log('[StickyButton] updateStickyButtons - lead_collection:', lead_collection, 'showConnectButtons:', showConnectButtons);
    
    // Get button elements
    const addToContactBtn = this._shadowRoot.querySelector('#uqc-btn-add-to-contact');
    const exchangeBtn = this._shadowRoot.querySelector('#uqc-btn-exchange');
    const connectContainer = this._shadowRoot.querySelector('#uqc-btn-connect-container');
    
    // Apply primary color to button container background (supports both old and new structure)
    const btnContainer = this._shadowRoot.querySelector('.uqc-fixed-btn-container') || 
                         this._shadowRoot.querySelector('.uqc-button-container');
    
    if (btnContainer) {
      const primaryColor = cardData.customizations?.background_color;
      if (primaryColor) {
        btnContainer.style.backgroundColor = primaryColor;
        console.log('[StickyButton] Applied container background:', primaryColor);
      } else {
        console.warn('[StickyButton] No background_color found in customizations');
      }
    }
    
    if (lead_collection) {
      // Hide "Add to Contact", show exchange/connect buttons
      if (addToContactBtn) addToContactBtn.style.display = 'none';
      
      if (showConnectButtons) {
        // Show "Connect + Create Now" buttons
        if (exchangeBtn) exchangeBtn.style.display = 'none';
        if (connectContainer) connectContainer.style.display = 'flex';
      } else {
        // Show "Exchange Contacts" button
        if (exchangeBtn) exchangeBtn.style.display = 'flex';
        if (connectContainer) connectContainer.style.display = 'none';
      }
    } else {
      // Show "Add to Contact", hide exchange/connect buttons
      if (addToContactBtn) addToContactBtn.style.display = 'flex';
      if (exchangeBtn) exchangeBtn.style.display = 'none';
      if (connectContainer) connectContainer.style.display = 'none';
    }
  },

  /**
   * Attach event listeners for sticky buttons and footer
   * Called during component initialization
   */
  attachStickyButtonFooterListeners: function () {
    const config = this._config || {};
    const footerClicksDisabled = config.layoutConfig?.footerClicksDisabled || false;
    
    // Add to Contact button
    const addToContactBtn = this._shadowRoot.querySelector('[data-add-to-contact]');
    if (addToContactBtn) {
      addToContactBtn.addEventListener('click', (e) => {
        if (footerClicksDisabled) {
          console.log('[StickyButton] Add to Contact click blocked (footerClicksDisabled)');
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        const autodownloadUrl = this._cardData?.autodownload_url;
        console.log('[StickyButton] Add to Contact clicked:', autodownloadUrl);
        this.emitEvent(CARD_EVENTS.ADD_TO_CONTACT_CLICK, { url: autodownloadUrl });
      });
    }
    
    // Exchange Contacts button
    const exchangeBtn = this._shadowRoot.querySelector('[data-exchange-contacts]');
    if (exchangeBtn) {
      exchangeBtn.addEventListener('click', (e) => {
        if (footerClicksDisabled) {
          console.log('[StickyButton] Exchange Contacts click blocked (footerClicksDisabled)');
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        console.log('[StickyButton] Exchange Contacts clicked');
        
        // Open lead form (rendered by LeadFormMixin)
        if (this.openLeadForm) {
          this.openLeadForm();
        }
        
        // Also emit event for external listeners (e.g., analytics)
        this.emitEvent(CARD_EVENTS.EXCHANGE_CONTACTS_CLICK);
      });
    }
    
    // Connect button
    const connectBtn = this._shadowRoot.querySelector('[data-connect]');
    if (connectBtn) {
      connectBtn.addEventListener('click', (e) => {
        if (footerClicksDisabled) {
          console.log('[StickyButton] Connect click blocked (footerClicksDisabled)');
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        console.log('[StickyButton] Connect clicked');
        this.emitEvent(CARD_EVENTS.CONNECT_CLICK);
      });
    }
    
    // Create Now button
    const createBtn = this._shadowRoot.querySelector('[data-create-card]');
    if (createBtn) {
      createBtn.addEventListener('click', (e) => {
        if (footerClicksDisabled) {
          console.log('[StickyButton] Create Now click blocked (footerClicksDisabled)');
          e.preventDefault();
          e.stopPropagation();
          return;
        }
        const cardSlug = e.target.getAttribute('data-card-slug') || this._cardData?.slug || 'slug';
        console.log('[StickyButton] Create Now clicked:', cardSlug);
        this.emitEvent(CARD_EVENTS.CREATE_NOW_CLICK, { slug: cardSlug });
      });
    }
    
    // Footer CTA link
    const footerCta = this._shadowRoot.querySelector('[data-footer-cta]');
    if (footerCta) {
      footerCta.addEventListener('click', (e) => {
        e.preventDefault();
        const cardSlug = e.target.getAttribute('data-card-slug') || this._cardData?.slug || 'slug';
        console.log('[StickyButton] Footer CTA clicked:', cardSlug);
        this.emitEvent(CARD_EVENTS.FOOTER_CTA_CLICK, { slug: cardSlug });
      });
    }
    
    // Footer logo
    const footerLogo = this._shadowRoot.querySelector('[data-footer-logo]');
    if (footerLogo) {
      footerLogo.addEventListener('click', () => {
        console.log('[StickyButton] Footer logo clicked');
        this.emitEvent(CARD_EVENTS.FOOTER_LOGO_CLICK);
      });
    }
    
    console.log('[StickyButton] Event listeners attached');
  },

  /**
   * PUBLIC METHOD: Show "Connect" and "Create Now" buttons (called after lead exchange)
   */
  showConnectButtons: function () {
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
  },
  
  /**
   * PUBLIC METHOD: Reset to "Exchange Contacts" button (for testing/reset)
   */
  resetToExchangeButton: function () {
    this._config.showConnectButtons = false;
    this._config.hideFooter = false;
    
    const exchangeBtn = this._shadowRoot.getElementById('uqc-btn-exchange');
    const connectContainer = this._shadowRoot.getElementById('uqc-btn-connect-container');
    const footer = this._shadowRoot.getElementById('uqc-footer-with-exchange');
    
    if (exchangeBtn) exchangeBtn.style.display = 'flex';
    if (connectContainer) connectContainer.style.display = 'none';
    if (footer) footer.style.display = 'flex';
    
    console.log('[StickyButton] State reset: showing Exchange Contacts button');
  }
};

