import { BaseCard } from '../../base/BaseCard.js';

export class CardLayout12 extends BaseCard {
  static get layoutId() {
    return 'layout-12';
  }

  connectedCallback() {
    // Ensure Font Awesome is loaded globally
    this.loadFontAwesome();
    // Call parent connectedCallback
    super.connectedCallback();
  }

  loadFontAwesome() {
    // Check if Font Awesome is already loaded
    if (document.getElementById('font-awesome-cdn')) {
      return;
    }

    // Add Font Awesome to document head
    const link = document.createElement('link');
    link.id = 'font-awesome-cdn';
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    
    document.head.appendChild(link);
  }

  getTemplate() {
    // Get layout configuration from config (NOT from cardData)
    // Config is set via: cardElement.config = { layoutConfig: {...} }
    const layoutConfig = this._config?.layoutConfig || {};
    const {
      width = 'auto',           // 'auto', '100%', '500px', or any CSS value
      maxWidth = '500px',       // Max width constraint
      height = 'auto',          // 'auto', '100%', '100vh', or any CSS value
      minHeight = '100vh',      // Min height constraint
      centered = true,          // Center the card horizontally
      fullWidth = false,        // Force full width (for mobile/Flutter)
      padding = '0', // '16px 21px 180px 21px',  // Content padding
      clicksDisabled = false,   // Disable all click interactions
      heroHeight = '361px',     // Hero image height ('361px', '50%', 'auto')
      footerClicksDisabled = false  // Disable footer button clicks (for preview mode)
    } = layoutConfig;

    // Calculate container styles based on config
    const containerWidth = fullWidth ? '100%' : width;
    const containerMaxWidth = fullWidth ? 'none' : maxWidth;
    const containerHeight = height;
    const containerMinHeight = minHeight;
    const containerMargin = centered ? '0 auto' : '0';

    return `
      <style>
        /* Import Font Awesome into Shadow DOM */
        @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css');
        
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :host {
          display: block;
          width: 100%;
          height: 100%;
          overflow: hidden; /* Prevent parent scrolling */
          position: relative; /* For absolute positioning of footer/form */
        }

        .uqc-card-container {
          width: ${containerWidth};
          max-width: ${containerMaxWidth};
          height: ${containerHeight};
          min-height: ${containerMinHeight};
          max-height: 100%; /* Don't exceed host height */
          margin: ${containerMargin};
          background: var(--card-bg, #F0EFED);
          position: relative;
          overflow: hidden;  /* Container doesn't scroll, wrapper does */
          ${clicksDisabled ? 'pointer-events: none; user-select: none;' : ''}
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
        }
        
        /* Fixed elements wrapper - take full card width */
        .uqc-fixed-btn-container {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          left: 0;
          right: 0;
        }
        
        /* Lead drawer - take full card width (transform handled by LeadFormMixin) */
        .uqc-lead-drawer {
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          left: 0;
          right: 0;
        }

        /* Scrollbar styling for better UX */
        .uqc-card-content-wrapper::-webkit-scrollbar {
          width: 6px;
        }

        .uqc-card-content-wrapper::-webkit-scrollbar-track {
          background: transparent;
        }

        .uqc-card-content-wrapper::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 3px;
        }

        .uqc-card-content-wrapper::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.3);
        }

        /* Responsive behavior */
        @media only screen and (max-width: 500px) {
          .uqc-card-container {
            max-width: 100%;
          }
        }

        /* Card content wrapper - scrolls when content overflows */
        .uqc-card-content-wrapper {
          flex: 0 1 auto;
          min-height: 0;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          overflow-x: hidden;
          -webkit-overflow-scrolling: touch;
        }

        /* Hero Image Section - configurable height */
        .uqc-hero-section {
          position: relative;
          width: 100%;
          height: ${heroHeight};
          overflow: hidden;
          flex-shrink: 0;
        }

        .uqc-hero-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        /* Logo Section - Positioned on hero image (top left) */
        .uqc-logo-section {
          position: absolute;
          top: 24px;
          left: 32px;
          z-index: 10;
        }

        .uqc-logo-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .uqc-logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 4px;
          text-transform: uppercase;
          color: #EAEAEA;
        }

        /* Content Section - takes only needed space */
        .uqc-content-section {
          padding: 16px;
          flex-shrink: 0;
        }

        /* Personal Info Section */
        .uqc-personal-info {
          margin-bottom: 12px;
        }

        .uqc-name-line {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 4px;
        }

        .uqc-name {
          font-family: var(--font-family, 'Avenir Next'), sans-serif;
          font-weight: var(--personal-info-weight, 700);
          font-size: var(--personal-info-size, 26px);
          line-height: 1.1em;
          letter-spacing: -0.03em;
          text-transform: uppercase;
          color: var(--personal-info-color, var(--user-info-color, #203D99));
        }

        .uqc-pronouns {
          font-family: var(--font-family, 'Inter'), sans-serif;
          font-weight: var(--personal-info-weight, 400);
          font-size: calc(var(--personal-info-size, 26px) * 0.5);
          line-height: 1.21em;
          color: var(--personal-info-color, var(--user-info-color, #203D99));
          opacity: 0.8;
        }

        .uqc-job-title {
          font-family: var(--font-family, 'Avenir Next'), sans-serif;
          font-weight: var(--company-details-weight, 400);
          font-size: var(--company-details-size, 14.4px);
          line-height: 1.37em;
          color: var(--company-details-color, var(--user-info-color, #203D99));
          margin-bottom: 12px;
        }

        /* Dividers - color is darker version of card background */
        .uqc-divider-top {
          width: 100%;
          height: 1px;
          background: var(--divider-color, #E0E0E0);
          margin-bottom: 12px;
        }

        .uqc-divider-bottom {
          width: 100%;
          height: 1px;
          background: var(--divider-color, #E0E0E0);
          margin: 24px 0 16px 0;
        }

        /* Bio Section */
        .uqc-bio-section {
          margin-bottom: 24px;
        }

        .uqc-bio-text {
          font-family: var(--font-family, 'Avenir Next'), sans-serif;
          font-weight: var(--bio-weight, 400);
          font-size: var(--bio-size, 14.4px);
          line-height: 1.37em;
          color: var(--bio-color, var(--user-info-color, #203D99));
          max-width: 249px;
        }

        /* Contact Info Section */
        .uqc-contact-info {
          margin-bottom: 24px;
        }

        .uqc-contact-item {
          margin-bottom: 8px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .contact-item:hover {
          opacity: 0.8;
        }

        .contact-item:last-child {
          margin-bottom: 0;
        }

        .uqc-contact-value {
          font-family: var(--font-family, 'Avenir Next'), sans-serif;
          font-weight: var(--contact-details-weight, 400);
          font-size: var(--contact-details-size, 14.4px);
          line-height: 1.37em;
          color: var(--contact-details-color, var(--user-info-color, #203D99));
        }

        /* Social Links Section */
        .uqc-social-section {
          margin-bottom: 32px;
        }

        .uqc-social-links {
          display: flex;
          flex-wrap: wrap;  /* ✅ Wrap to multiple rows when needed */
          gap: 15px;
          align-items: center;
        }

        .uqc-social-icon {
          width: 20px;
          height: 20px;
          cursor: pointer;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .social-icon:hover {
          opacity: 0.7;
        }

        .social-icon svg {
          width: 100%;
          height: 100%;
          fill: var(--icon-color, #000000);
        }

        .social-icon i {
          font-size: 20px;
        }

        /* Color Stripes - Fills ALL remaining space in card container */
        .uqc-color-stripes {
          width: 100%;
          display: flex;
          flex-direction: column;
          flex: 1 1 auto;  /* Grow to fill ALL available space */
          min-height: 40px;  /* Minimum 4 stripes × 10px */
        }

        .uqc-stripe {
          width: 100%;
          flex: 1;  /* Each stripe grows equally */
          min-height: 10px;  /* Minimum height per stripe */
        }

        /* Button Section - Part of flex flow, sits right after stripes */
        /* NOT absolute positioned - stripes end where button begins */
        .uqc-fixed-button-section {
          width: 100%;
          flex-shrink: 0;  /* Don't shrink - always show full button */
          z-index: 1000;
          pointer-events: none;  /* Allow scroll events to pass through */
        }

        /* Color palette generated from primary color (background_color) */
        .uqc-stripe-1 { background: var(--stripe-color-1); }
        .uqc-stripe-2 { background: var(--stripe-color-2); }
        .uqc-stripe-3 { background: var(--stripe-color-3); }
        .uqc-stripe-4 { background: var(--stripe-color-4); }

        /* Button Container - Inside fixed bottom section */
        .uqc-button-container {
          width: 100%;
          padding: 12px 16px 8px 16px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: ${footerClicksDisabled ? 'none' : 'auto'};  /* Disabled in preview mode */
          /* Background color applied dynamically via updateStickyButtons() */
        }

        /* Button Styles */
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
          pointer-events: auto;
        }

        .uqc-btn-connect-container {
          display: none;
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

        /* Footer */
        .uqc-footer-with-exchange {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          width: 100%;
          flex-wrap: wrap;
          margin-top: 8px;
        }

        .uqc-powered-by-text, .uqc-brand-name, .uqc-separator {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        .uqc-brand-name {
          font-weight: 600;
        }

        .uqc-separator {
          margin: 0 4px;
        }

        .uqc-footer-cta-link {
          font-family: 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          cursor: pointer;
        }

        .uqc-hidden {
          display: none !important;
        }
      </style>
      
      <div class="uqc-card-container">
        <!-- Language Dropdown (inside card at top right) -->
        ${this.getLanguageDropdownTemplate()}
        
        <!-- Card content wrapper (hero + content) -->
        <div class="uqc-card-content-wrapper">
          <!-- Hero Image Section (logo positioned inside) -->
          <div class="uqc-hero-section uqc-hidden">
            <img class="uqc-hero-image uqc-hidden" alt="Hero" />
            
            <!-- Company Logo on top of hero (top left circle) -->
            <div class="uqc-logo-section uqc-hidden">
              <div class="uqc-logo-circle">
                <img class="uqc-logo-image uqc-hidden" alt="Company Logo" />
              </div>
            </div>
          </div>

          <!-- Content Section -->
          <div class="uqc-content-section">
            <!-- Personal Info -->
            <div class="uqc-personal-info">
              <div class="uqc-name-line">
                <div class="uqc-name"></div>
                <div class="uqc-pronouns uqc-hidden"></div>
              </div>
              <div class="uqc-job-title uqc-hidden"></div>
            </div>

            <!-- Divider -->
            <div class="uqc-divider-top"></div>

            <!-- Bio -->
            <div class="uqc-bio-section uqc-hidden">
              <div class="uqc-bio-text"></div>
            </div>

            <!-- Divider -->
            <div class="uqc-divider-bottom"></div>

            <!-- Contact Info -->
            <div class="uqc-contact-info"></div>

            <!-- Social Links -->
            <div class="uqc-social-section">
              <div class="uqc-social-links"></div>
            </div>
          </div>
        </div>
        
        <!-- Color Stripes - Fills ALL remaining space -->
        <div class="uqc-color-stripes">
          <div class="uqc-stripe uqc-stripe-1"></div>
          <div class="uqc-stripe uqc-stripe-2"></div>
          <div class="uqc-stripe uqc-stripe-3"></div>
          <div class="uqc-stripe uqc-stripe-4"></div>
        </div>
        
        <!-- Fixed Button Section - Inside card container, positioned at bottom -->
        <div class="uqc-fixed-button-section">
          <div class="uqc-button-container">
            ${this.getButtonsHTML()}
          </div>
        </div>
      </div>
      
      <!-- Lead Collection Form (outside scrolling container, fixed to :host) -->
      ${this._config?.leadCollection !== false ? this.getLeadFormTemplate() : ''}
      
      <!-- Card Exchange Animation (outside card, full screen overlay) -->
      ${this._config?.enableAnimation !== false ? this.getAnimationFrameTemplate() : ''}
    `;
  }

  /**
   * Get buttons HTML for the fixed bottom section
   * Returns Add to Contact, Exchange Contacts, or Connect+Create buttons based on config
   */
  getButtonsHTML() {
    const cardData = this._cardData || {};
    const config = this._config || {};
    const lead_collection = cardData.lead_collection ?? false;
    const showConnectButtons = config.showConnectButtons ?? false;
    const autodownloadUrl = cardData.autodownload_url || '#';
    const cardSlug = cardData.slug || 'slug';
    const hideFooter = config.hideFooter ?? false;
    const branding_footer = cardData.branding_footer ?? false;

    const addToContactBtn = `
      <a class="uqc-btn" id="uqc-btn-add-to-contact" href="${autodownloadUrl}" data-add-to-contact style="text-decoration: none;">
        <i class="fas fa-user-plus" style="font-size: 20px;"></i>
        Add to Contacts
      </a>
    `;

    const exchangeBtn = `
      <button class="uqc-btn-exchange" id="uqc-btn-exchange" data-exchange-contacts>
        <i class="fas fa-exchange-alt" style="font-size: 20px;"></i>
        Exchange Contacts
      </button>
    `;

    const connectButtons = `
      <div class="uqc-btn-connect-container" id="uqc-btn-connect-container">
        <button class="uqc-btn uqc-btn-connect" data-connect>
          <i class="fas fa-link" style="font-size: 20px;"></i>
          Connect
        </button>
        <button class="uqc-btn uqc-btn-connect" data-create-card data-card-slug="${cardSlug}">
          <i class="fas fa-plus-circle" style="font-size: 20px;"></i>
          Create Now
        </button>
      </div>
    `;

    const footer = (hideFooter || branding_footer) ? '' : `
      <div class="uqc-footer-with-exchange" id="uqc-footer-with-exchange">
        <span class="uqc-powered-by-text">Powered by</span>
        <span class="uqc-brand-name">Uniqode</span>
        <span class="uqc-separator">•</span>
        <a href="#" class="uqc-footer-cta-link" data-footer-cta data-card-slug="${cardSlug}">
          Create your free card with Uniqode
        </a>
      </div>
    `;

    // Return all buttons (visibility controlled by updateStickyButtons)
    return addToContactBtn + exchangeBtn + connectButtons + footer;
  }

  render() {
    if (!this._cardData) return;
    
    // IMPORTANT: Apply colors FIRST before rendering anything
    // This ensures all rendering methods have access to current colors
    this.applyCustomColors();
    this.applyStripeColorPalette();
    
    // Update dynamic content (DOM already exists from connectedCallback)
    this.renderLanguageDropdown();  // Render language dropdown
    this.renderHeroImage();
    this.renderLogo();
    this.renderPersonalInfo();
    this.renderBio();
    this.renderContactInfo();
    this.renderSocialLinks();
    this.updateStickyButtons();  // Update button visibility based on lead_collection
    
    // Attach event listeners ONLY on first render
    if (!this._listenersAttached) {
      this.attachEventListeners();
      this.attachStickyButtonFooterListeners();  // Attach sticky button & footer listeners (from mixin)
      
      // Only attach lead form listeners if lead collection is enabled
      if (this._config?.leadCollection !== false) {
        this.attachLeadFormListeners();  // Attach lead form listeners (from mixin)
      }
      
      this._listenersAttached = true;
    }
  }

  // ===== COLORS =====
  // Note: applyCustomColors() is now inherited from BaseCard
  // Use getColor() to access any color value

  /**
   * Generate and apply stripe color palette from primary color (background_color)
   * Uses BaseCard color utilities to create proper lighter variants
   * 
   * Pattern based on Figma design:
   * - Primary at ~36% lightness
   * - Stripes go from ~51% to ~91% lightness (all lighter than primary)
   * - Stripe 4 (closest to button): ~15% lighter than primary
   * - Stripe 1 (top): lightest at ~91%
   */
  applyStripeColorPalette() {
    const primaryColor = this.getColor('primary-color');
    const stripesContainer = this._shadowRoot?.querySelector('.uqc-color-stripes');
    if (!stripesContainer || !primaryColor) {
      console.warn('[CardLayout12] Cannot apply stripe colors - missing primary color or stripes container');
      return;
    }
    
    // Get primary color's lightness to calculate relative stripe lightness
    const primaryHSL = this.hexToHSL(primaryColor);
    const primaryLightness = primaryHSL.l;
    
    // Calculate stripe lightness values relative to primary
    // Stripe 4: primary + 15%, Stripe 3: primary + 35%, Stripe 2: primary + 48%, Stripe 1: primary + 55%
    // Cap at 95% to avoid pure white
    const stripe4L = Math.min(95, primaryLightness + 15);  // Closest to button
    const stripe3L = Math.min(95, primaryLightness + 35);
    const stripe2L = Math.min(95, primaryLightness + 48);
    const stripe1L = Math.min(95, primaryLightness + 55);  // Lightest (top)
    
    const lightnessValues = [stripe1L, stripe2L, stripe3L, stripe4L];
    const stripeColors = this.generateColorPalette(primaryColor, lightnessValues);
    
    // Apply stripe colors directly to stripe elements
    const stripes = stripesContainer.querySelectorAll('.uqc-stripe');
    stripes.forEach((stripe, index) => {
      if (stripeColors[index]) {
        stripe.style.backgroundColor = stripeColors[index];
        console.log(`[CardLayout12] Stripe ${index + 1}: ${stripeColors[index]} (L: ${lightnessValues[index].toFixed(0)}%)`);
      }
    });
    
    console.log('[CardLayout12] Applied stripe colors from primary:', primaryColor, '(L:', primaryLightness.toFixed(0) + '%)');
  }

  renderHeroImage() {
    const images = this.getImages();  // ✅ Using BaseCard helper
    const heroImage = this._shadowRoot.querySelector('.uqc-hero-image');
    const heroSection = this._shadowRoot.querySelector('.uqc-hero-section');
    
    const hasHeroImage = !!images.profile;
    const hasLogo = !!images.logo;
    
    // Get heroHeight from config (dynamic, set via config)
    const layoutConfig = this._config?.layoutConfig || {};
    const heroHeight = layoutConfig.heroHeight || '361px'; // Default 361px
    
    // Hero section height logic:
    // - If hero image exists: Use heroHeight from config (e.g., 50px for mobile)
    // - If only logo exists: Use minimal height (logo size + padding)
    // - If neither exists: Hide section completely
    
    if (hasHeroImage) {
      // Hero image exists - show at full height from config
      heroImage.src = images.profile;
      heroImage.classList.remove('uqc-hidden');
      heroSection.classList.remove('uqc-hidden');
      heroSection.style.height = heroHeight; // Apply height from config
    } else if (hasLogo) {
      // No hero image, but logo exists - show section with minimal height for logo
      heroImage.classList.add('uqc-hidden');
      heroSection.classList.remove('uqc-hidden');
      // Minimal height = top padding + logo size + bottom padding
      const logoSize = images.logoSize || 50;
      const topPadding = 24; // CSS: top: 24px
      const bottomPadding = 24; // Space below logo
      heroSection.style.height = `${topPadding + logoSize + bottomPadding}px`;
    } else {
      // No hero image and no logo - hide section completely
      heroImage.classList.add('uqc-hidden');
      heroSection.classList.add('uqc-hidden');
    }
  }

  // ===== PERSONAL INFO RENDERING =====
  
  renderLogo() {
    const images = this.getImages();  // ✅ Using BaseCard helper
    
    const logoImage = this._shadowRoot.querySelector('.uqc-logo-image');
    const logoSection = this._shadowRoot.querySelector('.uqc-logo-section');
    const logoCircle = this._shadowRoot.querySelector('.uqc-logo-circle');
    
    // Use logo_url for logo section (company logo in top left circle)
    // If no logo, entire logo section remains hidden
    if (images.logo) {
      logoImage.src = images.logo;
      logoImage.classList.remove('uqc-hidden');
      logoSection.classList.remove('uqc-hidden');
      
      // Apply logo_size from cardData (default 50px if not specified)
      const logoSize = images.logoSize || 50;
      if (logoCircle) {
        logoCircle.style.width = `${logoSize}px`;
        logoCircle.style.height = `${logoSize}px`;
      }
    } else {
      logoSection.classList.add('uqc-hidden');
    }
  }

  renderPersonalInfo() {
    const info = this.getPersonalInfo();  // ✅ Using BaseCard helper
    
    // Name
    const nameEl = this._shadowRoot.querySelector('.uqc-name');
    nameEl.textContent = info.fullName;

    // Pronouns
    const pronounsEl = this._shadowRoot.querySelector('.uqc-pronouns');
    if (info.pronouns) {
      pronounsEl.textContent = `(${info.pronouns})`;
      pronounsEl.classList.remove('uqc-hidden');
    } else {
      pronounsEl.classList.add('uqc-hidden');
    }

    // Job title
    const jobTitleEl = this._shadowRoot.querySelector('.uqc-job-title');
    if (info.designation) {
      jobTitleEl.textContent = info.designation;
      jobTitleEl.classList.remove('uqc-hidden');
    } else {
      jobTitleEl.classList.add('uqc-hidden');
    }
  }

  renderBio() {
    const info = this.getPersonalInfo();  // ✅ Using BaseCard helper
    const bioSection = this._shadowRoot.querySelector('.uqc-bio-section');
    const bioText = this._shadowRoot.querySelector('.uqc-bio-text');
    const dividerTop = this._shadowRoot.querySelector('.uqc-divider-top');
    const dividerBottom = this._shadowRoot.querySelector('.uqc-divider-bottom');
    
    if (info.summary) {
      bioText.textContent = info.summary;
      bioSection.classList.remove('uqc-hidden');
      // Show dividers when bio is present
      if (dividerTop) dividerTop.classList.remove('uqc-hidden');
      if (dividerBottom) dividerBottom.classList.remove('uqc-hidden');
    } else {
      bioSection.classList.add('uqc-hidden');
      // Hide dividers when bio is empty
      if (dividerTop) dividerTop.classList.add('uqc-hidden');
      if (dividerBottom) dividerBottom.classList.add('uqc-hidden');
    }
  }

  // ===== CONTACT INFO RENDERING =====
  
  renderContactInfo() {
    const contactInfo = this.getContactInfo();  // ✅ Using BaseCard helper (handles ordering automatically)
    
    // Performance: Skip if contact info hasn't changed
    const contactKey = JSON.stringify(contactInfo);
    if (this._lastContactKey === contactKey) return;
    this._lastContactKey = contactKey;
    
    const container = this._shadowRoot.querySelector('.uqc-contact-info');
    container.innerHTML = '';

    // Helper to render a contact type's items
    const renderContactType = (type, data) => {
      if (!data || !Array.isArray(data) || data.length === 0) return;
      
      data.forEach((item) => {
        if (item && item.value) {
          const contactItem = this.createContactItem(type, item.value, item.label);
          container.appendChild(contactItem);
        }
      });
    };

    // Check if contactInfo is ordered (array) or unordered (object)
    if (Array.isArray(contactInfo)) {
      // Ordered format from getContactInfo()
      contactInfo.forEach(({ type, items }) => {
        const displayType = type.replace('_v2', ''); // phone_v2 → phone
        if (type === 'address_v2' && typeof items === 'string') {
          // Address is a string, not an array
          const addressItem = this.createContactItem('address', items);
          container.appendChild(addressItem);
        } else if (type === 'custom_fields') {
          renderContactType('custom', items);
        } else {
          renderContactType(displayType, items);
        }
      });
    } else {
      // Unordered format (fallback)
      Object.entries(contactInfo).forEach(([type, items]) => {
        const displayType = type.replace('_v2', '');
        if (type === 'address_v2' && typeof items === 'string') {
          const addressItem = this.createContactItem('address', items);
          container.appendChild(addressItem);
        } else if (type === 'custom_fields') {
          renderContactType('custom', items);
        } else {
          renderContactType(displayType, items);
        }
      });
    }
  }

  createContactItem(type, value, label) {
    const item = document.createElement('div');
    item.className = 'uqc-contact-item';
    
    // Show label if provided
    if (label) {
      item.innerHTML = `
        <div class="uqc-contact-label" style="font-size: 12px; color: var(--contact-details-color, var(--user-info-color, #203D99)); margin-bottom: 4px;">${label}</div>
        <div class="uqc-contact-value">${value}</div>
      `;
    } else {
      item.innerHTML = `<div class="contact-value">${value}</div>`;
    }
    
    item.addEventListener('click', () => {
      this.handleContactClick(type, value);
    });

    return item;
  }

  // ===== SOCIAL LINKS RENDERING =====
  
  renderSocialLinks() {
    const socialLinks = this.getSocialLinks();  // ✅ Using BaseCard helper (handles ordering automatically)
    
    // Performance: Skip if social links haven't changed
    const socialKey = JSON.stringify(socialLinks);
    if (this._lastSocialKey === socialKey) return;
    this._lastSocialKey = socialKey;
    
    const container = this._shadowRoot.querySelector('.uqc-social-links');
    container.innerHTML = '';

    socialLinks.forEach(({ platform, url }) => {
      const icon = document.createElement('div');
      icon.className = 'uqc-social-icon';
      icon.innerHTML = this.getSocialIcon(platform);
      
      icon.addEventListener('click', () => {
        this.handleSocialClick(platform, url);
      });

      container.appendChild(icon);
    });
  }

  getSocialIcon(platform) {
    // Font Awesome mapping (most common platforms)
    const socialIconsFontClasses = {
      yelp: 'fab fa-yelp',
      vimeo: 'fab fa-vimeo',
      github: 'fab fa-github',
      paypal: 'fab fa-paypal',
      tiktok: 'fab fa-tiktok',
      twitch: 'fab fa-twitch',
      behance: 'fab fa-behance',
      discord: 'fab fa-discord',
      shopify: 'fab fa-shopify',
      youtube: 'fab fa-youtube',
      dribbble: 'fab fa-dribbble',
      facebook: 'fab fa-facebook',
      linkedin: 'fab fa-linkedin',
      snapchat: 'fab fa-snapchat',
      telegram: 'fab fa-telegram',
      whatsapp: 'fab fa-whatsapp',
      instagram: 'fab fa-instagram',
      pinterest: 'fab fa-pinterest'
    };

    // Get icon color using inherited BaseCard method
    const iconColor = this.getColor('icon-color');

    // If Font Awesome icon exists, use it
    if (socialIconsFontClasses[platform]) {
      return `<i class="${socialIconsFontClasses[platform]}" style="color: ${iconColor}; font-size: 20px;"></i>`;
    }

    // Otherwise, use custom SVG for platforms not in Font Awesome
    return this.getCustomColoredSocialIconSvg(platform, iconColor);
  }

  getCustomColoredSocialIconSvg(name, color) {
    switch (name) {
      case 'twitter':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill="${color}"/>
                </svg>`;
      case 'wistia':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 31 30" fill="none">
                  <path d="M9.5 13V17H12.5V24H16.5V17H19.5L20.5 13H16.5V11C16.5 10.7348 16.6054 10.4804 16.7929 10.2929C16.9804 10.1054 17.2348 10 17.5 10H20.5V6H17.5C16.1739 6 14.9021 6.52678 13.9645 7.46447C13.0268 8.40215 12.5 9.67392 12.5 11V13H9.5Z" stroke="${color}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>`;
      case 'custom_url':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 121 120" fill="none">
                  <circle cx="60.1324" cy="60" r="56.4849" stroke="${color}" stroke-width="7.03025"/>
                  <path d="M60.1324 115.055C75.3964 115.055 87.7703 90.4061 87.7703 60C87.7703 29.5938 75.3964 4.94482 60.1324 4.94482" stroke="${color}" stroke-width="7.03025"/>
                  <path d="M60.1324 4.94482C44.8685 4.94482 32.4946 29.5938 32.4946 60C32.4946 90.4061 44.8685 115.055 60.1324 115.055" stroke="${color}" stroke-width="7.03025"/>
                  <path d="M7.73383 60H112.531" stroke="${color}" stroke-width="7.03025"/>
                  <path d="M13.6699 35.2739H106.595" stroke="${color}" stroke-width="7.03025"/>
                  <path d="M13.6699 84.7261H106.595" stroke="${color}" stroke-width="7.03025"/>
                </svg>`;
      case 'calendly':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" fill="${color}"/>
                </svg>`;
      case 'venmo':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21.5 2h-19C1.67 2 1 2.67 1 3.5v17c0 .83.67 1.5 1.5 1.5h19c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5zM13.5 17h-3L8 7h3l1.5 7 2-7h3l-4 10z" fill="${color}"/>
                </svg>`;
      case 'cashapp':
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M21 5H3c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-5 10h-2v-2h2v2zm0-4h-2V9h2v2z" fill="${color}"/>
                </svg>`;
      default:
        // Default URL icon for unknown platforms
        return `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 121 120" fill="none">
                  <circle cx="60.1324" cy="60" r="56.4849" stroke="${color}" stroke-width="7.03025"/>
                  <path d="M60.1324 115.055C75.3964 115.055 87.7703 90.4061 87.7703 60C87.7703 29.5938 75.3964 4.94482 60.1324 4.94482" stroke="${color}" stroke-width="7.03025"/>
                  <path d="M60.1324 4.94482C44.8685 4.94482 32.4946 29.5938 32.4946 60C32.4946 90.4061 44.8685 115.055 60.1324 115.055" stroke="${color}" stroke-width="7.03025"/>
                  <path d="M7.73383 60H112.531" stroke="${color}" stroke-width="7.03025"/>
                  <path d="M13.6699 35.2739H106.595" stroke="${color}" stroke-width="7.03025"/>
                  <path d="M13.6699 84.7261H106.595" stroke="${color}" stroke-width="7.03025"/>
                </svg>`;
    }
  }

  getInvertedColor(hex) {
    // Remove # if present
    hex = hex.replace('#', '');
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return white for dark colors, black for light colors
    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }

  attachEventListeners() {
    // Attach language dropdown listeners
    this.attachLanguageDropdownListeners();
  }
}

customElements.define('uniqode-layout-12', CardLayout12);
export default CardLayout12;
