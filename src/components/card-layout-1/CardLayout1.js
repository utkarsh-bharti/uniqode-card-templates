import { BaseCard } from '../base/BaseCard.js';

/**
 * Uniqode Card Layout 1 - Professional Card Layout
 * Based on your existing layout1-template.ts implementation
 * 
 * Features:
 * - Circular profile image with ellipse background
 * - Centered layout with professional styling
 * - Contact information with icons
 * - Social media links
 * - Customizable colors and typography
 */
export class CardLayout1 extends BaseCard {
  constructor() {
    super();
    this.shadowRoot.innerHTML = this.getTemplate();
  }
  
  static get layoutId() {
    return 'layout-1';
  }
  
  getTemplate() {
    return `
      <style>
        /* Import shared styles */
        :host {
          display: block;
          font-family: var(--font-family, 'Work Sans', sans-serif);
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        
        /* Main container */
        .content {
          position: relative;
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          min-height: 500px;
        }
        
        /* Top ellipse background - matches your layout1 design */
        .ellipse {
          position: relative;
          height: 140px;
          background: var(--bg-color, #ffffff);
          border-radius: 0 0 50% 50% / 0 0 100% 100%;
          overflow: hidden;
        }
        
        /* Logo positioning */
        .logo {
          position: absolute;
          top: 20px;
          left: 20px;
          max-height: 50px;
          max-width: 150px;
          object-fit: contain;
          z-index: 2;
        }
        
        .logo.hidden {
          display: none;
        }
        
        /* Profile image container */
        .profile-container {
          position: absolute;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 3;
        }
        
        .profile {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          overflow: hidden;
          background: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .user-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .initials {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          font-weight: bold;
          color: var(--bg-color, #ffffff);
          background: var(--text-color, #333333);
        }
        
        .hidden {
          display: none !important;
        }
        
        /* User information section */
        .user-info {
          padding: 70px 24px 24px;
          text-align: center;
        }
        
        .name {
          font-size: var(--name-font-size, 24px);
          font-weight: 600;
          color: var(--text-color, #333333);
          margin: 0 0 8px 0;
          line-height: 1.2;
        }
        
        .pronouns {
          font-size: 18px;
          font-weight: 400;
          color: var(--text-color, #666666);
          opacity: 0.8;
          margin: 0 0 12px 0;
        }
        
        .designation {
          font-size: var(--designation-font-size, 16px);
          color: var(--text-color, #666666);
          margin: 0 0 8px 0;
          line-height: 1.4;
          word-break: break-word;
        }
        
        .company {
          font-size: 16px;
          color: var(--text-color, #666666);
          margin: 0 0 16px 0;
        }
        
        .summary {
          font-size: var(--bio-font-size, 14px);
          color: var(--text-color, #666666);
          margin: 16px 0;
          line-height: 1.5;
          white-space: pre-line;
          word-break: break-word;
          text-align: left;
        }
        
        /* Contacts section */
        .contacts {
          padding: 0 24px;
          margin-bottom: 20px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          padding: 12px 0;
          cursor: pointer;
          transition: all 0.2s ease;
          border-radius: 8px;
        }
        
        .contact-item:hover {
          background-color: rgba(0, 0, 0, 0.05);
          padding-left: 8px;
          padding-right: 8px;
        }
        
        .contact-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--text-color, #007bff);
          opacity: 0.15;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;
          flex-shrink: 0;
        }
        
        .contact-icon svg {
          width: 20px;
          height: 20px;
          fill: var(--text-color, #333333);
        }
        
        .contact-content {
          flex: 1;
          min-width: 0; /* Allow text to truncate */
        }
        
        .contact-value {
          display: block;
          font-size: var(--contact-font-size, 14px);
          color: var(--text-color, #333333);
          font-weight: 500;
          word-break: break-all;
          line-height: 1.3;
        }
        
        .contact-label {
          display: block;
          font-size: 12px;
          color: var(--text-color, #666666);
          opacity: 0.7;
          margin-top: 2px;
          text-transform: capitalize;
        }
        
        /* Address section */
        .address {
          padding: 12px 24px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
          margin-top: 16px;
        }
        
        .address .contact-item {
          cursor: default;
        }
        
        .address .contact-item:hover {
          background: none;
          padding: 12px 0;
        }
        
        /* Social links */
        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          padding: 20px 24px;
          justify-content: center;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          background: var(--text-color, #007bff);
          opacity: 0.15;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s ease;
          text-decoration: none;
        }
        
        .social-link:hover {
          opacity: 1;
        }
        
        .social-link svg {
          width: 20px;
          height: 20px;
          fill: var(--text-color, #333333);
        }
        
        /* Share button */
        .share-button {
          background: var(--button-color, #007bff);
          color: white;
          border: none;
          padding: 16px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          width: calc(100% - 48px);
          margin: 0 24px 24px 24px;
          transition: all 0.2s ease;
        }
        
        .share-button:hover {
          opacity: 0.9;
          transform: translateY(-1px);
        }
        
        .share-button:active {
          transform: translateY(0);
        }
        
        /* Multi-language support */
        .multilang-shift {
          margin-top: 60px;
        }
        
        /* Responsive design */
        @media (max-width: 480px) {
          :host {
            max-width: 100%;
          }
          
          .content {
            border-radius: 0;
          }
          
          .user-info,
          .contacts,
          .social-links {
            padding-left: 16px;
            padding-right: 16px;
          }
          
          .share-button {
            margin: 0 16px 16px 16px;
            width: calc(100% - 32px);
          }
        }
      </style>
      
      <div class="content">
        <!-- Top ellipse with logo -->
        <div class="ellipse">
          <img class="logo hidden" alt="Company Logo">
        </div>
        
        <!-- Profile image -->
        <div class="profile-container">
          <div class="profile">
            <img class="user-image hidden" alt="Profile Picture">
            <div class="initials hidden"></div>
          </div>
        </div>
        
        <!-- User information -->
        <div class="user-info">
          <h1 class="name"></h1>
          <div class="pronouns hidden"></div>
          <div class="designation hidden"></div>
          <div class="company hidden"></div>
          <div class="summary hidden"></div>
        </div>
        
        <!-- Contact information -->
        <div class="contacts"></div>
        
        <!-- Address -->
        <div class="address hidden">
          <div class="contact-item">
            <div class="contact-icon">
              <svg viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <div class="contact-content">
              <span class="contact-value address-text"></span>
              <span class="contact-label">Address</span>
            </div>
          </div>
        </div>
        
        <!-- Social links -->
        <div class="social-links hidden"></div>
        
        <!-- Share button -->
        <button class="share-button">Share Contact</button>
      </div>
    `;
  }
  
  render() {
    if (!this._cardData) return;
    
    // Apply customizations first
    this.applyCustomizations();
    
    // Render all sections
    this.renderBasicInfo();
    this.renderProfile();
    this.renderContacts('.contacts');
    this.renderAddress();
    this.renderSocialLinks();
  }
  
  renderBasicInfo() {
    const { pronouns_v2, designation, company, department, summary, logo_url } = this._cardData;
    
    // Name
    const nameEl = this.shadowRoot.querySelector('.name');
    nameEl.textContent = this.getFullName();
    
    // Pronouns
    const pronounsEl = this.shadowRoot.querySelector('.pronouns');
    if (pronouns_v2) {
      pronounsEl.textContent = `(${pronouns_v2})`;
      pronounsEl.classList.remove('hidden');
    } else {
      pronounsEl.classList.add('hidden');
    }
    
    // Designation
    const designationEl = this.shadowRoot.querySelector('.designation');
    if (designation) {
      designationEl.textContent = designation;
      designationEl.classList.remove('hidden');
    } else {
      designationEl.classList.add('hidden');
    }
    
    // Company/Department
    const companyEl = this.shadowRoot.querySelector('.company');
    if (company || department) {
      let companyText = '';
      if (department && company) {
        companyText = `${department} • ${company}`;
      } else {
        companyText = company || department;
      }
      companyEl.textContent = companyText;
      companyEl.classList.remove('hidden');
    } else {
      companyEl.classList.add('hidden');
    }
    
    // Summary/Bio
    const summaryEl = this.shadowRoot.querySelector('.summary');
    if (summary) {
      summaryEl.textContent = summary;
      summaryEl.classList.remove('hidden');
    } else {
      summaryEl.classList.add('hidden');
    }
    
    // Logo
    const logoEl = this.shadowRoot.querySelector('.logo');
    if (logo_url) {
      logoEl.src = logo_url;
      logoEl.classList.remove('hidden');
    } else {
      logoEl.classList.add('hidden');
    }
  }
  
  renderProfile() {
    const { user_image_url } = this._cardData;
    const userImageEl = this.shadowRoot.querySelector('.user-image');
    const initialsEl = this.shadowRoot.querySelector('.initials');
    
    if (user_image_url) {
      userImageEl.src = user_image_url;
      userImageEl.classList.remove('hidden');
      initialsEl.classList.add('hidden');
    } else {
      userImageEl.classList.add('hidden');
      initialsEl.textContent = this.getInitials();
      initialsEl.classList.remove('hidden');
    }
  }
  
  renderAddress() {
    const { address_v2 } = this._cardData;
    const addressEl = this.shadowRoot.querySelector('.address');
    const addressTextEl = this.shadowRoot.querySelector('.address-text');
    
    if (address_v2 && address_v2.trim()) {
      addressTextEl.textContent = address_v2;
      addressEl.classList.remove('hidden');
    } else {
      addressEl.classList.add('hidden');
    }
  }
  
  renderSocialLinks() {
    const { social_links } = this._cardData;
    const socialLinksEl = this.shadowRoot.querySelector('.social-links');
    
    if (!social_links || typeof social_links !== 'object') {
      socialLinksEl.classList.add('hidden');
      return;
    }
    
    // Clear existing links
    socialLinksEl.innerHTML = '';
    
    // Add social links
    Object.entries(social_links).forEach(([platform, url]) => {
      if (url && url.trim()) {
        const linkEl = document.createElement('a');
        linkEl.className = 'social-link';
        linkEl.href = url;
        linkEl.target = '_blank';
        linkEl.rel = 'noopener noreferrer';
        linkEl.innerHTML = this.getSocialIcon(platform);
        linkEl.title = platform.charAt(0).toUpperCase() + platform.slice(1);
        socialLinksEl.appendChild(linkEl);
      }
    });
    
    // Show/hide container based on content
    if (socialLinksEl.children.length > 0) {
      socialLinksEl.classList.remove('hidden');
    } else {
      socialLinksEl.classList.add('hidden');
    }
  }
  
  getSocialIcon(platform) {
    const icons = {
      linkedin: `<svg viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>`,
      twitter: `<svg viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>`,
      instagram: `<svg viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>`,
      facebook: `<svg viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>`,
      youtube: `<svg viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>`
    };
    
    return icons[platform] || `<svg viewBox="0 0 24 24">
      <path d="M12 0C5.374 0 0 5.373 0 12s5.374 12 12 12 12-5.373 12-12S18.626 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.173 4.71C13.93 14.34 12.414 15 10.68 15c-.987 0-1.93-.18-2.819-.54.976.058 1.884-.156 2.723-.642-.909-.017-1.68-.618-1.944-1.445.127.025.257.037.39.037.189 0 .372-.025.547-.07-.95-.192-1.666-.103-1.666-2.043v-.025c.281.155.601.25.94.26-.557-.372-.923-.99-.923-1.698 0-.374.1-.725.277-1.026 1.025 1.26 2.556 2.087 4.283 2.174-.035-.151-.054-.307-.054-.469 0-1.136.924-2.06 2.06-2.06.593 0 1.128.25 1.504.65.469-.092.91-.264 1.31-.5-.154.482-.481.887-.908 1.143.417-.049.814-.159 1.183-.322-.276.413-.625.776-1.028 1.066z"/>
    </svg>`;
  }
  
  setupEventListeners() {
    // Share button
    const shareButton = this.shadowRoot.querySelector('.share-button');
    this.addEventListenerWithCleanup(shareButton, 'click', this.handleCardShare);
  }
}

// Register the Web Component
customElements.define('uniqode-layout-1', CardLayout1);

export default CardLayout1;
