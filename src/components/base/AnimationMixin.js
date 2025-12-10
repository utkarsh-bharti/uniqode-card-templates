/**
 * Animation Mixin
 * 
 * Reusable card exchange animation (two cards sliding in opposite directions)
 * Used after successful lead collection to show visual feedback
 * 
 * Usage in any layout:
 * 1. Call getAnimationFrameTemplate() in getTemplate()
 * 2. Call showCardExchangeAnimation(leadData) when lead is collected
 * 3. Call hideCardExchangeAnimation() to close animation
 * 
 * Architecture:
 * - Library renders animation HTML
 * - Server calls showCardExchangeAnimation() after successful lead submission
 * - Animation auto-hides after 3 seconds
 */

import { CARD_EVENTS } from '../../shared/constants/events.js';

export const AnimationMixin = {
  /**
   * Get HTML template for card exchange animation
   * @returns {string} HTML string for animation container
   */
  getAnimationFrameTemplate: function () {
    return `
      <style>
        /* Animation Container */
        .uqc-animation-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          min-height: 100vh;
          display: none;
          justify-content: center;
          align-items: center;
          background: white;
          z-index: 2147483005;
        }
        
        .uqc-animation-container.show {
          display: flex !important;
        }
        
        /* Lead Card (slides right) */
        .uqc-lead-card-slide {
          width: 100%;
          max-width: 500px;
          position: absolute;
          top: 0;
          animation: 3s uqc-slide-right;
          animation-timing-function: ease-in-out;
          border-radius: 16px;
          box-shadow: 8px 4px 48px 0px rgba(0, 0, 0, 0.12);
          overflow: hidden;
        }
        
        @keyframes uqc-slide-right {
          0% {
            top: 0px;
            transform: rotate(-5deg);
          }
          25% {
            top: 80px;
            transform: translateX(-50%) rotate(-5deg);
          }
          80% {
            transform: translateX(50%) rotate(5deg);
          }
          100% {
            transform: translateX(100%) rotate(5deg);
            top: 80px;
          }
        }
        
        /* Owner Card (slides left) - optional, can be added if needed */
        .uqc-owner-card-slide {
          width: 100%;
          max-width: 500px;
          position: absolute;
          top: 0;
          animation: 3s uqc-slide-left;
          animation-timing-function: ease-in-out;
          border-radius: 16px;
          box-shadow: 8px 4px 48px 0px rgba(0, 0, 0, 0.12);
          overflow: hidden;
        }
        
        @keyframes uqc-slide-left {
          0% {
            top: 0px;
            transform: rotate(5deg);
          }
          25% {
            top: 80px;
            transform: translateX(50%) rotate(5deg);
          }
          80% {
            transform: translateX(-50%) rotate(-5deg);
          }
          100% {
            transform: translateX(-100%) rotate(-5deg);
            top: 80px;
          }
        }
        
        /* Lead Card Content */
        .uqc-lead-card-content {
          background: #ffffff;
          box-shadow: 8px 4px 48px 0px rgba(0, 0, 0, 0.12);
          border-radius: 16px;
          overflow: hidden;
        }
        
        .uqc-lead-header {
          padding: 30px 24px;
          background-color: var(--button-color, #3370f9);
          text-align: center;
        }
        
        .uqc-lead-profile {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: -40px;
          margin-bottom: 16px;
        }
        
        .uqc-lead-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 32px;
          font-weight: 600;
          color: var(--button-color, #3370f9);
          border: 4px solid white;
          box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        .uqc-lead-info {
          padding: 0 24px 24px;
          text-align: center;
        }
        
        .uqc-lead-name {
          font-family: 'Open Sans', sans-serif;
          font-weight: 600;
          font-size: 24px;
          color: #000000;
          margin-bottom: 8px;
        }
        
        .uqc-lead-company {
          font-family: 'Open Sans', sans-serif;
          font-weight: 400;
          font-size: 18px;
          color: #666666;
          margin-bottom: 16px;
        }
        
        .uqc-lead-email {
          font-family: 'Open Sans', sans-serif;
          font-weight: 400;
          font-size: 14px;
          color: #999999;
        }
      </style>

      <!-- Animation Container -->
      <div id="uqc-animation-container" class="uqc-animation-container">
        <div class="uqc-lead-card-slide">
          <div class="uqc-lead-card-content" id="uqc-lead-card-content">
            <!-- Lead card content will be populated dynamically -->
          </div>
        </div>
      </div>
    `;
  },

  /**
   * PUBLIC METHOD: Show card exchange animation with lead data
   * Called by server after successful lead collection
   * 
   * @param {object} leadData - Lead information
   * @param {string} leadData.first_name - First name
   * @param {string} leadData.last_name - Last name
   * @param {string} leadData.email - Email
   * @param {string} leadData.company_name - Company (optional)
   * @param {number} duration - Animation duration in ms (default 3000)
   */
  showCardExchangeAnimation: function (leadData, duration = 3000) {
    if (!leadData) {
      console.error('[Animation] No lead data provided');
      return;
    }

    const container = this._shadowRoot.querySelector('#uqc-animation-container');
    const cardContent = this._shadowRoot.querySelector('#uqc-lead-card-content');
    
    if (!container || !cardContent) {
      console.error('[Animation] Animation elements not found');
      return;
    }

    // Generate lead card HTML
    const leadHTML = this.generateLeadCardHTML(leadData);
    cardContent.innerHTML = leadHTML;

    // Show animation
    container.classList.add('show');
    
    console.log('[Animation] Card exchange animation started');
    
    // Emit event
    this.emitEvent(CARD_EVENTS.ANIMATION_STARTED, { leadData });

    // Auto-hide after duration
    setTimeout(() => {
      this.hideCardExchangeAnimation();
    }, duration);
  },

  /**
   * PUBLIC METHOD: Hide card exchange animation
   */
  hideCardExchangeAnimation: function () {
    const container = this._shadowRoot.querySelector('#uqc-animation-container');
    
    if (container) {
      container.classList.remove('show');
      console.log('[Animation] Card exchange animation ended');
      
      // Emit event
      this.emitEvent(CARD_EVENTS.ANIMATION_ENDED);
    }
  },

  /**
   * Generate lead card HTML from lead data
   * @param {object} leadData - Lead information
   * @returns {string} HTML string
   */
  generateLeadCardHTML: function (leadData) {
    const firstName = leadData.first_name || '';
    const lastName = leadData.last_name || '';
    const fullName = `${firstName} ${lastName}`.trim();
    const email = leadData.email || '';
    const company = leadData.company_name || leadData.designation || '';
    
    // Generate initials
    const initials = this.getInitialsFromName ? 
      this.getInitialsFromName(firstName, lastName) : 
      (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();

    return `
      <div class="uqc-lead-header"></div>
      <div class="uqc-lead-profile">
        <div class="uqc-lead-avatar">${initials}</div>
      </div>
      <div class="uqc-lead-info">
        <div class="uqc-lead-name">${fullName}</div>
        ${company ? `<div class="uqc-lead-company">${company}</div>` : ''}
        ${email ? `<div class="uqc-lead-email">${email}</div>` : ''}
      </div>
    `;
  },

  /**
   * Get initials from first and last name
   * @param {string} firstName
   * @param {string} lastName
   * @returns {string} Initials (max 2 characters)
   */
  getInitialsFromName: function (firstName, lastName) {
    const first = (firstName || '').trim();
    const last = (lastName || '').trim();
    
    if (!first && !last) return '??';
    if (!last) return first.substring(0, 2).toUpperCase();
    
    return (first.charAt(0) + last.charAt(0)).toUpperCase();
  }
};

