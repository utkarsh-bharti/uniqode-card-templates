/**
 * Lead Form Component
 * 
 * Reusable lead collection form for all card layouts
 * Handles lead form rendering, validation, and submission events
 * 
 * Usage in any layout:
 * 1. Call getLeadFormTemplate() in getTemplate()
 * 2. Call attachLeadFormListeners() in attachEventListeners()
 * 3. Pass lead_attribute config in cardData
 * 
 * Architecture:
 * - Library renders form HTML + handles client-side validation
 * - Server handles API call + success animation
 * - Event-based communication: lead-form-submit, lead-form-close
 */

import { CARD_EVENTS } from '../../shared/constants/events.js';

export const LeadFormMixin = {
  /**
   * Get HTML template for lead collection form (drawer)
   * @returns {string} HTML string for the form
   */
  getLeadFormTemplate: function () {
    const config = this._config || {};
    const cardData = this._cardData || {};
    const leadAttribute = cardData.lead_attribute || {};
    
    // Owner name for consent text
    const ownerName = cardData.consent_placeholder || 
                      `${cardData.first_name || ''} ${cardData.last_name || ''}`.trim() || 
                      cardData.first_name || 
                      'card owner';
    
    return `
      <style>
        /* Lead Form Overlay */
        .uqc-lead-overlay {
          position: fixed;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2147483003;
          display: none;
        }
        
        .uqc-lead-overlay.show {
          display: block;
        }
        
        /* Lead Form Drawer - Absolute positioned, overlays on card */
        /* Note: Width, left, right are controlled by CardLayout12.js */
        .uqc-lead-drawer {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding: 24px;
          position: absolute;
          bottom: 0;
          z-index: 2147483004;
          background-color: white;
          transition: transform 0.3s ease-in-out;
          transform: translateY(100%);
          box-sizing: border-box;
          border-top-left-radius: 12px;
          border-top-right-radius: 12px;
          max-height: 85%;
          font-family: 'Work Sans', sans-serif;
          pointer-events: auto;
        }
        
        .uqc-lead-drawer.show {
          width: 100%;
          transform: translateY(0);
          transition: transform 0.3s ease-in-out;
          min-height: 100px;
        }
        
        /* Form Title */
        .uqc-owner-info {
          font-weight: 300;
          font-size: 20px;
          font-family: "Work Sans", sans-serif;
          line-height: 28px;
          color: #16212F;
          margin-bottom: 24px;
          display: flex;
          flex-wrap: wrap;
          white-space: nowrap;
        }
        
        .uqc-owner-name {
          font-style: italic;
          font-weight: 600;
        }
        
        /* Form Container */
        .uqc-form-container {
          max-height: 150px;
          overflow: scroll;
          margin-bottom: 16px;
          font-family: "Work Sans", sans-serif;
          padding-right: 8px;
          row-gap: 16px;
          display: grid;
        }
        
        /* Form Field Container */
        .uqc-lead-field-container {
          margin-bottom: 0;
        }
        
        .uqc-lead-field-container.uqc-hidden {
          display: none !important;
        }
        
        /* Name Grid (First + Last) */
        .uqc-name-grid {
          display: flex;
          flex-direction: row;
        }
        
        #uqc-lead-first-name {
          border-radius: 5px 0px 0px 5px;
          border-right-width: 0.5px !important;
          width: 50%;
        }
        
        #uqc-lead-last-name {
          border-radius: 0px 5px 5px 0px;
          border-left-width: 0.5px !important;
          width: 50%;
        }
        
        /* Form Input (Matching server exactly) */
        .uqc-lead-input {
          background: #FAFAFA;
          border: 1px solid #E4E5E7;
          border-radius: 4px;
          padding: 8px;
          gap: 8px;
          height: 24px;
          font-size: 16px;
          width: -webkit-fill-available;
          font-family: "Work Sans", sans-serif;
          box-sizing: border-box;
        }
        
        .uqc-lead-input:focus {
          outline: none !important;
          border: 1px solid #2595FF !important;
        }
        
        .uqc-lead-input.error {
          border-color: #FF445E;
        }
        
        /* Textarea */
        .uqc-lead-textarea {
          height: 80px;
          resize: none;
          font-size: 16px;
        }
        
        /* Error Message (Matching server exactly) */
        .uqc-lead-error-message {
          display: none;
          padding: 0;
          padding-top: 8px;
          margin: 0;
          color: #FF445E;
          font-size: 13px;
        }
        
        .uqc-lead-error-message.show {
          display: block;
        }
        
        /* Marketing Consent (Matching server exactly) */
        .uqc-disclaimer {
          width: 100%;
          font-weight: 400;
          font-family: "Open Sans", sans-serif;
          font-size: 12px;
          color: #979797;
          margin-top: 16px;
          display: flex;
          align-items: start;
        }
        
        .uqc-lead-consent-checkbox {
          margin-right: 10px;
          cursor: pointer;
        }
        
        .uqc-tos-text {
          color: #979797;
          font-size: 12px;
          font-style: normal;
          font-family: "Open Sans", sans-serif;
          font-weight: 400;
          line-height: normal;
          text-align: start;
          letter-spacing: -0.33px;
        }
        
        .uqc-tos-anchor-links {
          color: #979797;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.33px;
          text-decoration-line: underline;
        }
        
        /* Submit Button Container */
        #uqc-submit-container {
          margin-top: 16px;
        }
        
        /* Submit Button (Matching server exactly) */
        .uqc-lead-submit-btn {
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 4px;
          height: 48px;
          padding: 0px;
          width: -webkit-fill-available;
          border: 0;
          cursor: pointer;
          background: #2595FF;
          min-height: 40px;
          font-family: 'Work Sans', sans-serif;
          font-size: 15px;
          font-weight: lighter;
        }
        
        .uqc-lead-submit-btn:hover {
          opacity: 0.95;
        }
        
        .uqc-lead-submit-btn:disabled {
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .uqc-lead-submit-btn .submitLead {
          color: #ffffff !important;
        }
        
        .uqc-connect-btn-cta {
          padding-left: 12px;
          color: #ffffff;
        }
        
        #uqc-lead-exchange-contact-icon {
          color: #ffffff;
        }
        
        /* Loading Spinner (Matching server exactly) */
        .uqc-lead-spinner {
          border: 3px solid #f3f3f3;
          border-radius: 50%;
          border-top: 3px solid #3498db;
          width: 14px;
          height: 14px;
          -webkit-animation: spin 2s linear infinite;
          animation: spin 2s linear infinite;
          display: none;
        }
        
        .uqc-lead-spinner.show {
          display: inline-block;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @-webkit-keyframes spin {
          0% { -webkit-transform: rotate(0deg); }
          100% { -webkit-transform: rotate(360deg); }
        }
      </style>

      <!-- Lead Form Overlay -->
      <div id="uqc-lead-overlay" class="uqc-lead-overlay"></div>

      <!-- Lead Form Drawer -->
      <div id="uqc-lead-drawer" class="uqc-lead-drawer">
        <!-- Title -->
        <div class="uqc-owner-info">
          Exchange contacts with&nbsp;<br />
          <span class="uqc-owner-name">${ownerName}</span>
        </div>
        
        <!-- Form -->
        <form id="uqc-lead-form" onsubmit="return false">
          <div class="uqc-form-container">
            <!-- Name Fields (Side by side) -->
            <div class="uqc-lead-field-container">
              <div class="uqc-name-grid">
                <input 
                  type="text" 
                  id="uqc-lead-first-name" 
                  class="uqc-lead-input" 
                  placeholder="First name" 
                  required
                  maxlength="128"
                />
                <input 
                  type="text" 
                  id="uqc-lead-last-name" 
                  class="uqc-lead-input" 
                  placeholder="Last name" 
                  required
                  maxlength="128"
                />
              </div>
              <p class="uqc-lead-error-message" id="uqc-lead-first-name-error">Please enter full name</p>
            </div>

            <!-- Email (Required) -->
            <div class="uqc-lead-field-container">
              <input 
                type="email" 
                id="uqc-lead-email" 
                class="uqc-lead-input" 
                placeholder="Email" 
                required
                maxlength="254"
              />
              <p class="uqc-lead-error-message" id="uqc-lead-email-error">Please enter a valid email address</p>
            </div>

            <!-- Company (Conditional) -->
            <div class="uqc-lead-field-container ${leadAttribute.company ? '' : 'hidden'}" id="uqc-lead-company-container">
              <input 
                type="text" 
                id="uqc-lead-company" 
                class="uqc-lead-input" 
                placeholder="Company" 
                maxlength="128"
              />
              <p class="uqc-lead-error-message" id="uqc-lead-company-error"></p>
            </div>

            <!-- Phone (Conditional) -->
            <div class="uqc-lead-field-container ${leadAttribute.phone ? '' : 'hidden'}" id="uqc-lead-phone-container">
              <input 
                type="tel" 
                id="uqc-lead-phone" 
                class="uqc-lead-input" 
                placeholder="Phone number" 
                maxlength="30"
              />
              <p class="uqc-lead-error-message" id="uqc-lead-phone-error">Please enter a valid phone number</p>
            </div>

            <!-- Designation (Conditional) -->
            <div class="uqc-lead-field-container ${leadAttribute.designation ? '' : 'hidden'}" id="uqc-lead-designation-container">
              <input 
                type="text" 
                id="uqc-lead-designation" 
                class="uqc-lead-input" 
                placeholder="Designation" 
                maxlength="128"
              />
              <p class="uqc-lead-error-message" id="uqc-lead-designation-error"></p>
            </div>

            <!-- Notes (Conditional) -->
            <div class="uqc-lead-field-container ${leadAttribute.notes ? '' : 'hidden'}" id="uqc-lead-notes-container">
              <textarea 
                id="uqc-lead-notes" 
                class="uqc-lead-input uqc-lead-textarea" 
                placeholder="Message"
                maxlength="500"
              ></textarea>
            </div>
          </div>
          
          <!-- Marketing Consent -->
          <div class="uqc-disclaimer">
            <input 
              type="checkbox" 
              id="uqc-lead-marketing-consent" 
              class="uqc-lead-consent-checkbox"
              checked
            />
            <div class="uqc-tos-text" id="uqc-lead-consent-text"></div>
          </div>

          <!-- Submit Button -->
          <div id="uqc-submit-container">
            <button type="submit" class="uqc-lead-submit-btn" id="uqc-lead-submit-btn">
              <i id="uqc-lead-exchange-contact-icon" class="fas fa-exchange-alt"></i>
              <i id="uqc-lead-spinner" class="uqc-lead-spinner"></i>
              <span class="submitLead uqc-connect-btn-cta">Connect</span>
            </button>
          </div>
        </form>
      </div>
    `;
  },

  /**
   * Generate Terms of Service consent text with user agreement URLs
   */
  generateTOSString: function () {
    const cardData = this._cardData || {};
    const ownerName = cardData.consent_placeholder || 
                      `${cardData.first_name || ''} ${cardData.last_name || ''}`.trim() || 
                      cardData.first_name || 
                      'card owner';
    
    let tosString = `I agree to receive communications from ${ownerName}.`;
    
    const links = cardData.lead_user_agreement_attribute?.user_agreement_urls || [];
    console.log('[LeadForm] generateTOSString - cardData.lead_user_agreement_attribute:', cardData.lead_user_agreement_attribute);
    console.log('[LeadForm] generateTOSString - links:', links);
    const parts = [];
    
    // Build up to 3 links
    if (links.length > 0 && links[0].label && links[0].url) {
      parts.push(`<a class="uqc-tos-anchor-links" href="${links[0].url}" target="_blank">${links[0].label}</a>`);
    }
    if (links.length > 1 && links[1].label && links[1].url) {
      parts.push(`<a class="uqc-tos-anchor-links" href="${links[1].url}" target="_blank">${links[1].label}</a>`);
    }
    if (links.length > 2 && links[2].label && links[2].url) {
      parts.push(`<a class="uqc-tos-anchor-links" href="${links[2].url}" target="_blank">${links[2].label}</a>`);
    }
    
    if (parts.length > 0) {
      tosString += ' ' + parts.join(', ') + '.';
    }
    
    const tosElement = this._shadowRoot.querySelector('#uqc-lead-consent-text');
    if (tosElement) {
      tosElement.innerHTML = tosString;
    }
  },

  /**
   * Open the lead form drawer
   */
  openLeadForm: function () {
    const overlay = this._shadowRoot.querySelector('#uqc-lead-overlay');
    const drawer = this._shadowRoot.querySelector('#uqc-lead-drawer');
    
    if (overlay && drawer) {
      // Generate TOS string with links before showing the form
      this.generateTOSString();
      
      overlay.classList.add('show');
      // Delay drawer animation slightly for smooth transition
      setTimeout(() => {
        drawer.classList.add('show');
      }, 10);
      
      console.log('[LeadForm] Form opened');
      this.emitEvent(CARD_EVENTS.LEAD_FORM_OPEN);
    }
  },

  /**
   * Close the lead form drawer
   */
  closeLeadForm: function () {
    const overlay = this._shadowRoot.querySelector('#uqc-lead-overlay');
    const drawer = this._shadowRoot.querySelector('#uqc-lead-drawer');
    
    if (overlay && drawer) {
      drawer.classList.remove('show');
      // Wait for animation before hiding overlay
      setTimeout(() => {
        overlay.classList.remove('show');
      }, 300);
      
      // Reset form
      const form = this._shadowRoot.querySelector('#uqc-lead-form');
      if (form) {
        form.reset();
        this.clearFormErrors();
      }
      
      console.log('[LeadForm] Form closed');
      this.emitEvent(CARD_EVENTS.LEAD_FORM_CLOSE);
    }
  },

  /**
   * Validate a single field
   * @param {string} fieldId - Field ID
   * @param {string} value - Field value
   * @returns {object} Validation result { valid, error }
   */
  validateField: function (fieldId, value) {
    const trimmedValue = value.trim();
    
    switch (fieldId) {
      case 'uqc-lead-first-name':
        if (!trimmedValue) return { valid: false, error: 'First name is required' };
        if (trimmedValue.length > 128) return { valid: false, error: 'First name too long' };
        return { valid: true };
        
      case 'uqc-lead-last-name':
        if (!trimmedValue) return { valid: false, error: 'Last name is required' };
        if (trimmedValue.length > 128) return { valid: false, error: 'Last name too long' };
        return { valid: true };
        
      case 'uqc-lead-email':
        if (!trimmedValue) return { valid: false, error: 'Email is required' };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmedValue)) return { valid: false, error: 'Invalid email format' };
        if (trimmedValue.length > 254) return { valid: false, error: 'Email too long' };
        return { valid: true };
        
      case 'uqc-lead-phone':
        if (trimmedValue && trimmedValue.length > 30) {
          return { valid: false, error: 'Phone number too long' };
        }
        return { valid: true };
        
      case 'uqc-lead-company':
        if (trimmedValue.length > 128) return { valid: false, error: 'Company name too long' };
        return { valid: true };
        
      case 'uqc-lead-designation':
        if (trimmedValue.length > 128) return { valid: false, error: 'Designation too long' };
        return { valid: true };
        
      default:
        return { valid: true };
    }
  },

  /**
   * Show field error
   */
  showFieldError: function (fieldId, errorMessage) {
    const input = this._shadowRoot.querySelector(`#${fieldId}`);
    const error = this._shadowRoot.querySelector(`#${fieldId}-error`);
    
    if (input) input.classList.add('error');
    if (error) {
      error.textContent = errorMessage;
      error.classList.add('show');
    }
  },

  /**
   * Clear field error
   */
  clearFieldError: function (fieldId) {
    const input = this._shadowRoot.querySelector(`#${fieldId}`);
    const error = this._shadowRoot.querySelector(`#${fieldId}-error`);
    
    if (input) input.classList.remove('error');
    if (error) error.classList.remove('show');
  },

  /**
   * Clear all form errors
   */
  clearFormErrors: function () {
    const errors = this._shadowRoot.querySelectorAll('.uqc-lead-error-message');
    const inputs = this._shadowRoot.querySelectorAll('.uqc-lead-input');
    
    errors.forEach(error => error.classList.remove('show'));
    inputs.forEach(input => input.classList.remove('error'));
  },

  /**
   * Validate entire form
   * @returns {object} { valid, data, errors }
   */
  validateForm: function () {
    const form = this._shadowRoot.querySelector('#uqc-lead-form');
    if (!form) return { valid: false, errors: ['Form not found'] };
    
    const cardData = this._cardData || {};
    const leadAttribute = cardData.lead_attribute || {};
    
    const formData = {
      first_name: form.querySelector('#uqc-lead-first-name')?.value || '',
      last_name: form.querySelector('#uqc-lead-last-name')?.value || '',
      email: form.querySelector('#uqc-lead-email')?.value || '',
      marketing_consent: form.querySelector('#uqc-lead-marketing-consent')?.checked || false
    };
    
    // Optional fields (only add if configured and provided)
    if (leadAttribute.phone) {
      const phone = form.querySelector('#uqc-lead-phone')?.value || '';
      if (phone.trim()) formData.phone_number = phone;
    }
    
    if (leadAttribute.company) {
      const company = form.querySelector('#uqc-lead-company')?.value || '';
      if (company.trim()) formData.company_name = company;
    }
    
    if (leadAttribute.designation) {
      const designation = form.querySelector('#uqc-lead-designation')?.value || '';
      if (designation.trim()) formData.designation = designation;
    }
    
    if (leadAttribute.notes) {
      const notes = form.querySelector('#uqc-lead-notes')?.value || '';
      if (notes.trim()) formData.notes = notes;
    }
    
    // Validate required fields
    const errors = [];
    let isValid = true;
    
    // Validate first name
    const firstNameValidation = this.validateField('uqc-lead-first-name', formData.first_name);
    if (!firstNameValidation.valid) {
      this.showFieldError('uqc-lead-first-name', firstNameValidation.error);
      errors.push(firstNameValidation.error);
      isValid = false;
    }
    
    // Validate last name
    const lastNameValidation = this.validateField('uqc-lead-last-name', formData.last_name);
    if (!lastNameValidation.valid) {
      this.showFieldError('uqc-lead-last-name', lastNameValidation.error);
      errors.push(lastNameValidation.error);
      isValid = false;
    }
    
    // Validate email
    const emailValidation = this.validateField('uqc-lead-email', formData.email);
    if (!emailValidation.valid) {
      this.showFieldError('uqc-lead-email', emailValidation.error);
      errors.push(emailValidation.error);
      isValid = false;
    }
    
    // Validate phone (if provided)
    if (formData.phone_number) {
      const phoneValidation = this.validateField('uqc-lead-phone', formData.phone_number);
      if (!phoneValidation.valid) {
        this.showFieldError('uqc-lead-phone', phoneValidation.error);
        errors.push(phoneValidation.error);
        isValid = false;
      }
    }
    
    return { valid: isValid, data: formData, errors };
  },

  /**
   * Show loading state on submit button
   */
  setFormLoading: function (loading) {
    const btn = this._shadowRoot.querySelector('#uqc-lead-submit-btn');
    const icon = this._shadowRoot.querySelector('#uqc-lead-icon');
    const text = this._shadowRoot.querySelector('#uqc-lead-submit-text');
    const spinner = this._shadowRoot.querySelector('#uqc-lead-spinner');
    
    if (loading) {
      if (btn) btn.disabled = true;
      if (icon) icon.style.display = 'none';
      if (text) text.style.display = 'none';
      if (spinner) spinner.classList.add('show');
    } else {
      if (btn) btn.disabled = false;
      if (icon) icon.style.display = 'inline';
      if (text) text.style.display = 'inline';
      if (spinner) spinner.classList.remove('show');
    }
  },

  /**
   * Attach event listeners for lead form
   * Called during component initialization
   */
  attachLeadFormListeners: function () {
    // Close button
    const closeBtn = this._shadowRoot.querySelector('#uqc-lead-close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        this.closeLeadForm();
      });
    }
    
    // Overlay click (close form)
    const overlay = this._shadowRoot.querySelector('#uqc-lead-overlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        this.closeLeadForm();
      });
    }
    
    // Real-time validation on input
    const inputs = ['uqc-lead-first-name', 'uqc-lead-last-name', 'uqc-lead-email', 'uqc-lead-phone'];
    inputs.forEach(inputId => {
      const input = this._shadowRoot.querySelector(`#${inputId}`);
      if (input) {
        input.addEventListener('input', (e) => {
          const validation = this.validateField(inputId, e.target.value);
          if (validation.valid) {
            this.clearFieldError(inputId);
          }
        });
      }
    });
    
    // Form submit
    const form = this._shadowRoot.querySelector('#uqc-lead-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        console.log('[LeadForm] Form submitted');
        
        // Clear previous errors
        this.clearFormErrors();
        
        // Validate form
        const validation = this.validateForm();
        
        if (!validation.valid) {
          console.log('[LeadForm] Validation failed:', validation.errors);
          return;
        }
        
        console.log('[LeadForm] Validation passed, emitting event');
        
        // Show loading state
        this.setFormLoading(true);
        
        // Emit event for server to handle API call
        this.emitEvent(CARD_EVENTS.LEAD_FORM_SUBMIT, validation.data);
      });
    }
    
    console.log('[LeadForm] Event listeners attached');
  },

  /**
   * PUBLIC METHOD: Show form success (called by server after successful submission)
   */
  showLeadFormSuccess: function () {
    this.setFormLoading(false);
    this.closeLeadForm();
  },

  /**
   * PUBLIC METHOD: Show form error (called by server if submission fails)
   */
  showLeadFormError: function (errorMessage) {
    this.setFormLoading(false);
    
    // Show generic error at top of form
    alert(`Error: ${errorMessage || 'Failed to submit form. Please try again.'}`);
  }
};

