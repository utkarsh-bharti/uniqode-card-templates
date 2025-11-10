import { BaseCard } from '../base/BaseCard.js';

/**
 * Uniqode Card Layout 12 - Madgamer Style
 * Modern gaming/tech company card with curved header and bold colors
 * 
 * Features:
 * - Dark theme with curved cyan header
 * - Prominent company branding
 * - Multiple email contacts with labels
 * - Social media integration
 * - Clean, modern aesthetic
 */
export class CardLayout12 extends BaseCard {
  constructor() {
    super();
    this.shadowRoot.innerHTML = this.getTemplate();
  }
  
  static get layoutId() {
    return 'layout-12';
  }
  
  getTemplate() {
    return `
      <style>
        :host {
          display: block;
          font-family: var(--font-family, 'Open Sans', sans-serif);
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          box-sizing: border-box;
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* Main container with dark background */
        .card-container {
          background: #131A40;
          border: 4px solid #16212F;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          min-height: 600px;
        }
        
        /* Top curved section with cyan background */
        .header-section {
          background: #84E9F1;
          border-radius: 0 0 90px 0;
          padding: 18px 18px 12px;
          position: relative;
          z-index: 1;
        }
        
        /* Logo section */
        .logo-container {
          margin-bottom: 100px;
        }
        
        .company-logo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .logo-icon {
          width: 20px;
          height: 15px;
          background: #F3FDFE;
          border-radius: 4px;
          flex-shrink: 0;
        }
        
        .logo-text {
          font-family: 'Changa', sans-serif;
          font-weight: 700;
          font-size: 12px;
          color: #F3FDFE;
          letter-spacing: 0.5px;
        }
        
        .logo-image {
          max-height: 20px;
          width: auto;
        }
        
        /* User info section */
        .user-info {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .name-container {
          display: flex;
          align-items: center;
          gap: 4px;
          flex-wrap: wrap;
        }
        
        .name {
          font-family: 'Cambay', sans-serif;
          font-weight: 700;
          font-size: 18px;
          line-height: 1em;
          color: #000000;
        }
        
        .pronouns {
          font-family: 'Cambay', sans-serif;
          font-weight: 700;
          font-size: 18px;
          line-height: 1em;
          color: #000000;
        }
        
        .designation, .company {
          font-family: 'Cambay', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 1em;
          color: #000000;
        }
        
        /* Summary/Bio section */
        .summary-section {
          margin-top: 24px;
        }
        
        .summary-text {
          font-family: 'Cambay', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 1em;
          color: #F3FDFE;
          text-align: center;
          white-space: pre-line;
          max-width: 208px;
          margin: 0 auto;
        }
        
        /* Primary email contact button */
        .primary-contact {
          margin-top: 24px;
        }
        
        .primary-email-btn {
          background: #6130A6;
          border-radius: 100px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: opacity 0.2s;
          max-width: 208px;
          margin: 0 auto;
        }
        
        .primary-email-btn:hover {
          opacity: 0.9;
        }
        
        .email-icon {
          width: 18px;
          height: 14px;
          flex-shrink: 0;
        }
        
        .email-icon svg {
          width: 100%;
          height: 100%;
        }
        
        .primary-email-text {
          font-family: 'Cambay', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 1em;
          color: #F3FDFE;
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        /* Profile image section */
        .profile-section {
          position: absolute;
          top: 50px;
          right: 32px;
          z-index: 2;
        }
        
        .profile-image-container {
          width: 212px;
          height: 179px;
          position: relative;
          border-radius: 0 0 0 90px;
          overflow: hidden;
        }
        
        .profile-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .profile-initials {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #6130A6 0%, #84E9F1 100%);
          font-size: 64px;
          font-weight: 700;
          color: white;
        }
        
        /* Status badge */
        .status-badge {
          position: absolute;
          top: 19px;
          right: 0;
          background: #6130A6;
          border-radius: 21px 0 0 21px;
          padding: 4px 12px 4px 4px;
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .status-dot {
          width: 21px;
          height: 21px;
          background: white;
          border-radius: 50%;
        }
        
        /* Contact info section */
        .contact-info-section {
          padding: 24px 16px;
          margin-top: 200px;
        }
        
        .contact-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 24px;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        
        .contact-item:hover {
          opacity: 0.8;
        }
        
        .contact-icon-container {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(22, 113, 249, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .contact-icon-container svg {
          width: 24px;
          height: 24px;
          fill: white;
        }
        
        .contact-details {
          flex: 1;
          min-width: 0;
        }
        
        .contact-value {
          font-family: 'Open Sans', sans-serif;
          font-weight: 600;
          font-size: 18px;
          line-height: 1.36em;
          color: white;
          word-break: break-word;
        }
        
        .contact-label {
          font-family: 'Open Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          line-height: 1.36em;
          color: white;
          opacity: 0.4;
          margin-top: 2px;
        }
        
        /* Divider */
        .divider {
          height: 1px;
          background: rgba(0, 0, 0, 0.1);
          margin: 32px 16px;
        }
        
        /* Social links section */
        .social-section {
          padding: 0 16px;
          text-align: center;
        }
        
        .social-title {
          font-family: 'Open Sans', sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 1.36em;
          color: white;
          margin-bottom: 24px;
        }
        
        .social-links {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        
        .social-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
        }
        
        .social-link:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .social-link svg {
          width: 20px;
          height: 20px;
          fill: white;
        }
        
        /* CTA Button */
        .cta-button {
          border: 2px solid #1671F9;
          border-radius: 30px;
          padding: 16px 24px;
          margin: 0 16px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .cta-button:hover {
          background: rgba(22, 113, 249, 0.1);
        }
        
        .cta-text {
          font-family: 'Open Sans', sans-serif;
          font-weight: 600;
          font-size: 18px;
          line-height: 1.36em;
          color: #1671F9;
        }
        
        /* Quick action button (floating) */
        .quick-action-btn {
          position: absolute;
          bottom: 24px;
          right: 16px;
          width: 40px;
          height: 40px;
          background: #84E9F1;
          border-radius: 50%;
          box-shadow: 0px 2px 8px 0px rgba(129, 132, 136, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }
        
        .quick-action-btn:hover {
          transform: scale(1.1);
        }
        
        .quick-action-btn svg {
          width: 18px;
          height: 18px;
          fill: #000000;
        }
        
        .hidden {
          display: none !important;
        }
        
        /* Responsive design */
        @media (max-width: 480px) {
          :host {
            max-width: 100%;
          }
          
          .card-container {
            border-radius: 0;
            border-left: 0;
            border-right: 0;
          }
          
          .profile-image-container {
            width: 180px;
            height: 150px;
          }
          
          .contact-info-section {
            margin-top: 170px;
          }
        }
      </style>
      
      <div class="card-container">
        <!-- Header with cyan background -->
        <div class="header-section">
          <!-- Logo -->
          <div class="logo-container">
            <div class="company-logo">
              <img class="logo-image hidden" alt="Company Logo" />
              <div class="logo-icon hidden"></div>
              <div class="logo-text hidden"></div>
            </div>
          </div>
          
          <!-- User info -->
          <div class="user-info">
            <div class="name-container">
              <span class="name"></span>
              <span class="pronouns hidden"></span>
            </div>
            <div class="designation hidden"></div>
            <div class="company hidden"></div>
          </div>
          
          <!-- Summary -->
          <div class="summary-section hidden">
            <p class="summary-text"></p>
          </div>
          
          <!-- Primary email contact -->
          <div class="primary-contact hidden">
            <div class="primary-email-btn">
              <div class="email-icon">
                <svg viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1H17V13H1V1Z" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M17 2L9 8L1 2" stroke="#FFFFFF" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="primary-email-text"></span>
            </div>
          </div>
        </div>
        
        <!-- Profile image section -->
        <div class="profile-section">
          <div class="profile-image-container">
            <img class="profile-image hidden" alt="Profile" />
            <div class="profile-initials hidden"></div>
          </div>
          <div class="status-badge hidden">
            <div class="status-dot"></div>
          </div>
        </div>
        
        <!-- Contact information -->
        <div class="contact-info-section">
          <div class="contacts-list"></div>
          
          <div class="address-item hidden"></div>
        </div>
        
        <!-- Divider -->
        <div class="divider"></div>
        
        <!-- Social links -->
        <div class="social-section">
          <div class="social-title">Let's connect</div>
          <div class="social-links"></div>
        </div>
        
        <!-- CTA Button -->
        <div class="cta-button">
          <div class="cta-text">Share Your Contact</div>
        </div>
        
        <!-- Quick action button -->
        <div class="quick-action-btn hidden">
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.5 2.25C1.5 1.85218 1.65804 1.47064 1.93934 1.18934C2.22064 0.908035 2.60218 0.75 3 0.75H12L16.5 5.25V15.75C16.5 16.1478 16.342 16.5294 16.0607 16.8107C15.7794 17.092 15.3978 17.25 15 17.25H3C2.60218 17.25 2.22064 17.092 1.93934 16.8107C1.65804 16.5294 1.5 16.1478 1.5 15.75V2.25Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 0.75V5.25H16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    `;
  }
  
  render() {
    if (!this._cardData) return;
    
    this.applyCustomizations();
    this.renderLogo();
    this.renderUserInfo();
    this.renderSummary();
    this.renderPrimaryEmail();
    this.renderProfile();
    this.renderContacts();
    this.renderAddress();
    this.renderSocialLinks();
  }
  
  renderLogo() {
    const { logo_url, company } = this._cardData;
    const logoImage = this.shadowRoot.querySelector('.logo-image');
    const logoText = this.shadowRoot.querySelector('.logo-text');
    
    if (logo_url) {
      logoImage.src = logo_url;
      logoImage.classList.remove('hidden');
    } else if (company) {
      logoText.textContent = company.toUpperCase();
      logoText.classList.remove('hidden');
    }
  }
  
  renderUserInfo() {
    const { pronouns_v2, designation, company, department } = this._cardData;
    
    // Name
    const nameEl = this.shadowRoot.querySelector('.name');
    nameEl.textContent = this.getFullName();
    
    // Pronouns
    const pronounsEl = this.shadowRoot.querySelector('.pronouns');
    if (pronouns_v2) {
      pronounsEl.textContent = `(${pronouns_v2})`;
      pronounsEl.classList.remove('hidden');
    }
    
    // Designation
    const designationEl = this.shadowRoot.querySelector('.designation');
    if (designation) {
      designationEl.textContent = designation;
      designationEl.classList.remove('hidden');
    }
    
    // Company/Department
    const companyEl = this.shadowRoot.querySelector('.company');
    if (company || department) {
      companyEl.textContent = company || department;
      companyEl.classList.remove('hidden');
    }
  }
  
  renderSummary() {
    const { summary } = this._cardData;
    const summarySection = this.shadowRoot.querySelector('.summary-section');
    const summaryText = this.shadowRoot.querySelector('.summary-text');
    
    if (summary) {
      summaryText.textContent = summary;
      summarySection.classList.remove('hidden');
    }
  }
  
  renderPrimaryEmail() {
    const { email_v2 } = this._cardData;
    const primaryContact = this.shadowRoot.querySelector('.primary-contact');
    const primaryEmailText = this.shadowRoot.querySelector('.primary-email-text');
    const primaryEmailBtn = this.shadowRoot.querySelector('.primary-email-btn');
    
    if (email_v2 && email_v2.length > 0 && email_v2[0].value) {
      const primaryEmail = email_v2[0];
      primaryEmailText.textContent = primaryEmail.value;
      primaryContact.classList.remove('hidden');
      
      primaryEmailBtn.onclick = () => this.handleContactClick('email', primaryEmail.value, primaryEmail.label);
    }
  }
  
  renderProfile() {
    const { user_image_url } = this._cardData;
    const profileImage = this.shadowRoot.querySelector('.profile-image');
    const profileInitials = this.shadowRoot.querySelector('.profile-initials');
    
    if (user_image_url) {
      profileImage.src = user_image_url;
      profileImage.classList.remove('hidden');
    } else {
      profileInitials.textContent = this.getInitials();
      profileInitials.classList.remove('hidden');
    }
  }
  
  renderContacts() {
    const contactsList = this.shadowRoot.querySelector('.contacts-list');
    contactsList.innerHTML = '';
    
    const { email_v2, phone_v2, website_v2 } = this._cardData;
    
    // Skip first email if already shown as primary
    if (email_v2 && email_v2.length > 1) {
      email_v2.slice(1).forEach((email, index) => {
        if (email.value) {
          contactsList.appendChild(this.createContactItem('email', email.value, email.label));
        }
      });
    }
    
    // Phone contacts
    if (phone_v2 && phone_v2.length > 0) {
      phone_v2.forEach(phone => {
        if (phone.value) {
          contactsList.appendChild(this.createContactItem('phone', phone.value, phone.label));
        }
      });
    }
    
    // Website contacts
    if (website_v2 && website_v2.length > 0) {
      website_v2.forEach(website => {
        if (website.value) {
          contactsList.appendChild(this.createContactItem('website', website.value, website.label));
        }
      });
    }
  }
  
  createContactItem(type, value, label) {
    const item = document.createElement('div');
    item.className = 'contact-item';
    
    item.innerHTML = `
      <div class="contact-icon-container">
        ${this.getContactIcon(type)}
      </div>
      <div class="contact-details">
        <div class="contact-value">${value}</div>
        ${label ? `<div class="contact-label">${label}</div>` : ''}
      </div>
    `;
    
    item.onclick = () => this.handleContactClick(type, value, label);
    
    return item;
  }
  
  renderAddress() {
    const { address_v2 } = this._cardData;
    const contactsList = this.shadowRoot.querySelector('.contacts-list');
    
    if (address_v2) {
      const addressItem = this.createContactItem('address', address_v2, 'Address');
      contactsList.appendChild(addressItem);
    }
  }
  
  renderSocialLinks() {
    const { social_links } = this._cardData;
    const socialLinksContainer = this.shadowRoot.querySelector('.social-links');
    
    if (!social_links || typeof social_links !== 'object') return;
    
    socialLinksContainer.innerHTML = '';
    
    Object.entries(social_links).forEach(([platform, url]) => {
      if (url && url.trim()) {
        const link = document.createElement('a');
        link.className = 'social-link';
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.innerHTML = this.getSocialIcon(platform);
        link.title = platform.charAt(0).toUpperCase() + platform.slice(1);
        socialLinksContainer.appendChild(link);
      }
    });
  }
  
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
      </svg>`
    };
    
    return icons[type] || icons.email;
  }
  
  getSocialIcon(platform) {
    const icons = {
      instagram: `<svg viewBox="0 0 30 30" fill="currentColor">
        <path d="M15 2.16c4.07 0 4.56.02 6.16.09 4.13.19 6.05 2.14 6.24 6.24.07 1.6.09 2.09.09 6.16s-.02 4.56-.09 6.16c-.19 4.09-2.11 6.05-6.24 6.24-1.6.07-2.09.09-6.16.09s-4.56-.02-6.16-.09c-4.14-.19-6.05-2.16-6.24-6.24-.07-1.6-.09-2.09-.09-6.16s.02-4.56.09-6.16C2.79 4.3 4.71 2.35 8.84 2.16c1.6-.07 2.09-.09 6.16-.09zM15 0c-4.14 0-4.66.02-6.29.09-5.53.25-8.61 3.31-8.86 8.86C-.02 10.58 0 11.1 0 15.65s.02 5.07.09 6.7c.25 5.53 3.31 8.61 8.86 8.86 1.63.07 2.15.09 6.7.09s5.07-.02 6.7-.09c5.52-.25 8.61-3.33 8.86-8.86.07-1.63.09-2.15.09-6.7s-.02-5.07-.09-6.7C30.96 3.4 27.88.32 22.35.09 20.72.02 20.2 0 15.65 0H15zm0 7.29c-4.32 0-7.82 3.5-7.82 7.82s3.5 7.82 7.82 7.82 7.82-3.5 7.82-7.82-3.5-7.82-7.82-7.82zm0 12.9c-2.81 0-5.09-2.28-5.09-5.09s2.28-5.09 5.09-5.09 5.09 2.28 5.09 5.09-2.28 5.09-5.09 5.09zm8.14-13.21c0 1.01-.82 1.83-1.83 1.83s-1.83-.82-1.83-1.83.82-1.83 1.83-1.83 1.83.82 1.83 1.83z"/>
      </svg>`,
      facebook: `<svg viewBox="0 0 30 30" fill="currentColor">
        <path d="M30 15.09c0-8.28-6.72-15-15-15s-15 6.72-15 15c0 7.49 5.48 13.69 12.66 14.84v-10.49H8.85v-4.35h3.81V11.8c0-3.76 2.24-5.84 5.67-5.84 1.64 0 3.36.29 3.36.29v3.69h-1.89c-1.86 0-2.45 1.16-2.45 2.34v2.81h4.16l-.66 4.35h-3.5v10.49C24.52 28.78 30 22.58 30 15.09z"/>
      </svg>`,
      twitter: `<svg viewBox="0 0 30 24.37" fill="currentColor">
        <path d="M29.94 2.88c-1.1.49-2.28.82-3.52.97 1.27-.76 2.24-1.96 2.7-3.39-1.19.7-2.5 1.21-3.9 1.48C24.11.74 22.51 0 20.74 0c-3.39 0-6.14 2.75-6.14 6.14 0 .48.05.95.16 1.4C9.67 7.32 5.13 4.86 2.1 1.13c-.53.91-.83 1.96-.83 3.09 0 2.13 1.08 4.01 2.73 5.11-.51-.02-.99-.16-1.4-.38v.08c0 2.97 2.12 5.46 4.93 6.02-.51.14-1.06.21-1.62.21-.4 0-.78-.04-1.16-.11.78 2.44 3.05 4.22 5.74 4.27-2.1 1.65-4.75 2.63-7.63 2.63-.5 0-.99-.03-1.47-.08 2.73 1.75 5.97 2.77 9.44 2.77 11.33 0 17.52-9.39 17.52-17.52 0-.27 0-.53-.02-.8 1.2-.87 2.24-1.95 3.07-3.19z"/>
      </svg>`,
      whatsapp: `<svg viewBox="0 0 30 30" fill="currentColor">
        <path d="M15 0C6.72 0 0 6.72 0 15c0 2.66.69 5.16 1.91 7.34L.07 29.93l7.78-2.04C10.01 29.14 12.43 30 15 30c8.28 0 15-6.72 15-15S23.28 0 15 0zm7.19 21.2c-.3.84-1.47 1.54-2.41 1.75-.65.14-1.49.25-4.33-.93-3.64-1.51-5.98-5.2-6.16-5.44-.18-.24-1.5-2-1.5-3.81s.95-2.71 1.29-3.08c.34-.37.74-.46.99-.46.25 0 .5.01.71.01.23 0 .54-.09.84.64.3.73 1.03 2.51 1.12 2.69.09.18.15.39.03.63-.12.24-.18.39-.36.6-.18.21-.38.47-.54.63-.18.18-.37.37-.16.72.21.35 .93 1.54 2 2.49 1.38 1.22 2.54 1.6 2.9 1.78.36.18.57.15.78-.09.21-.24.9-.99 1.14-1.33.24-.34.48-.28.81-.17.33.11 2.1 .99 2.46 1.17.36.18.6.27.69.42.09.15.09.87-.21 1.71z"/>
      </svg>`,
      linkedin: `<svg viewBox="0 0 30 30" fill="currentColor">
        <path d="M27.26 0H2.74C1.23 0 0 1.23 0 2.74v24.52C0 28.77 1.23 30 2.74 30h24.52c1.51 0 2.74-1.23 2.74-2.74V2.74C30 1.23 28.77 0 27.26 0zM8.9 25.52H4.45V11.23H8.9v14.29zM6.67 9.27c-1.42 0-2.57-1.15-2.57-2.57 0-1.42 1.15-2.57 2.57-2.57 1.42 0 2.57 1.15 2.57 2.57 0 1.42-1.14 2.57-2.57 2.57zm18.85 16.25h-4.45v-6.94c0-1.66-.03-3.79-2.31-3.79-2.31 0-2.67 1.81-2.67 3.67v7.06h-4.45V11.23h4.27v1.95h.06c.59-1.13 2.05-2.31 4.21-2.31 4.5 0 5.34 2.96 5.34 6.82v7.58z"/>
      </svg>`
    };
    
    return icons[platform] || icons.instagram;
  }
  
  setupEventListeners() {
    // CTA button
    const ctaButton = this.shadowRoot.querySelector('.cta-button');
    this.addEventListenerWithCleanup(ctaButton, 'click', this.handleCardShare);
    
    // Quick action button
    const quickActionBtn = this.shadowRoot.querySelector('.quick-action-btn');
    this.addEventListenerWithCleanup(quickActionBtn, 'click', this.handleCardShare);
  }
}

// Register the Web Component
customElements.define('uniqode-layout-12', CardLayout12);

export default CardLayout12;

