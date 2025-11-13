import { BaseCard } from '../base/BaseCard.js';

export class CardLayout12 extends BaseCard {
  static get layoutId() {
    return 'layout-12';
  }

  getTemplate() {
    return `
      <style>
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        :host {
          display: block;
          font-family: 'Lato', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .card-container {
          width: 244px;
          height: 527px;
          margin: 0 auto;
          background: #000000;
          border: 4px solid #16212F;
          border-radius: 16px;
          position: relative;
          overflow-y: auto;
          overflow-x: hidden;
        }

        /* Scrollbar styling */
        .card-container::-webkit-scrollbar {
          width: 4px;
        }

        .card-container::-webkit-scrollbar-track {
          background: transparent;
        }

        .card-container::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2);
          border-radius: 2px;
        }

        /* Logo - Fixed at top */
        .logo {
          position: absolute;
          top: 18px;
          left: 18px;
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .logo-icon svg {
          width: 10px;
          height: 22px;
        }

        .logo-text {
          font-family: 'NATS', 'Arial', sans-serif;
          font-weight: 400;
          font-size: 9.28px;
          line-height: 1em;
          text-transform: uppercase;
          color: #FFFFFF;
          letter-spacing: 0.5px;
          white-space: pre-line;
        }

        /* Header Background with Geometric Pattern */
        .header-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 284px;
          overflow: hidden;
        }

        /* Background shapes */
        .bg-shapes {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 284px;
        }

        .bg-shape {
          position: absolute;
        }

        /* Dark blue large circle - top left */
        .shape-1 {
          width: 342.48px;
          height: 342.48px;
          background: #204373;
          border-radius: 50%;
          top: -152px;
          left: -108px;
        }

        /* Bright blue circle - top right */
        .shape-2 {
          width: 271.75px;
          height: 271.75px;
          background: #4794FE;
          border-radius: 50%;
          top: -157px;
          left: 118px;
        }

        /* Bright blue circle - bottom left */
        .shape-3 {
          width: 271.75px;
          height: 271.75px;
          background: #4794FE;
          border-radius: 50%;
          top: 148px;
          left: -120px;
        }

        /* Dark blue circle - bottom right */
        .shape-4 {
          width: 271.75px;
          height: 271.75px;
          background: #204373;
          border-radius: 50%;
          top: 148px;
          left: 152px;
        }

        /* White circle - middle left */
        .shape-5 {
          width: 132.21px;
          height: 132.21px;
          background: #FFFFFF;
          border-radius: 50%;
          top: 119px;
          left: -12px;
        }

        /* White circle - middle right */
        .shape-6 {
          width: 132.21px;
          height: 132.21px;
          background: #FFFFFF;
          border-radius: 50%;
          top: 46px;
          left: 185px;
        }

        /* Profile Image Container - Diamond shape */
        .profile-section {
          position: absolute;
          top: 10px;
          left: 16px;
          width: 232px;
          height: 274px;
          z-index: 20;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-diamond {
          width: 270px;
          height: 270px;
          transform: rotate(45deg);
          overflow: hidden;
          position: relative;
        }

        .profile-image-wrapper {
          width: 100%;
          height: 100%;
          position: relative;
        }

        .profile-image {
          width: 141.42%;
          height: 141.42%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          object-fit: cover;
        }

        .profile-initials {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          font-size: 72px;
          color: #FFFFFF;
          transform: rotate(-45deg);
          background: linear-gradient(135deg, #204373 0%, #4794FE 50%, #204373 100%);
        }

        /* Content Section */
        .content {
          position: relative;
          padding: 308px 18px 100px 18px;
        }

        /* User Info */
        .user-info-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .user-info-inner {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .name-line {
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          font-size: 18px;
          line-height: 1.2em;
          color: #FFFFFF;
        }

        .job-title {
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 1.2em;
          color: #4794FE;
        }

        .divider-line {
          width: 100%;
          height: 3px;
          background: #4794FE;
        }

        /* Summary */
        .summary {
          width: 208px;
          font-family: 'Lato', sans-serif;
          font-weight: 300;
          font-size: 12px;
          line-height: 1.2em;
          color: #FFFFFF;
          margin-bottom: 16px;
        }

        /* Contact Cards */
        .contact-cards {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .contact-card {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 10px 16px 10px 0;
          cursor: pointer;
          transition: opacity 0.2s;
          border-radius: 4px;
          width: 208px;
        }

        .contact-card:hover {
          opacity: 0.8;
        }

        .contact-icon-wrapper {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
        }

        .contact-icon-wrapper svg {
          width: 100%;
          height: 100%;
        }

        .contact-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .contact-type {
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          font-size: 10px;
          line-height: 1.2em;
          color: #4794FE;
        }

        .contact-value {
          font-family: 'Lato', sans-serif;
          font-weight: 400;
          font-size: 12px;
          line-height: 1em;
          color: #FFFFFF;
        }

        /* Additional Contact Items */
        .extra-contacts {
          margin-top: 24px;
        }

        .extra-contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 31px;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .extra-contact-item:hover {
          opacity: 0.8;
        }

        .extra-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(22, 113, 249, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .extra-icon {
          width: 24px;
          height: 24px;
        }

        .extra-icon svg {
          width: 100%;
          height: 100%;
          fill: #FFFFFF;
        }

        .extra-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .extra-label {
          font-family: 'Open Sans', sans-serif;
          font-weight: 600;
          font-size: 14px;
          color: #FFFFFF;
          opacity: 0.4;
          line-height: 1.36em;
        }

        .extra-value {
          font-family: 'Open Sans', sans-serif;
          font-weight: 600;
          font-size: 18px;
          color: #FFFFFF;
          line-height: 1.36em;
          word-break: break-word;
        }

        /* Divider */
        .section-divider {
          height: 1px;
          background: rgba(0, 0, 0, 0.1);
          margin: 16px 0 24px 0;
        }

        /* Social Section */
        .social-section {
          text-align: center;
          margin-bottom: 40px;
        }

        .social-title {
          font-family: 'Open Sans', sans-serif;
          font-weight: 400;
          font-size: 18px;
          color: #FFFFFF;
          line-height: 1.36em;
          margin-bottom: 24px;
        }

        .social-grid {
          display: flex;
          justify-content: center;
          gap: 16px;
        }

        .social-link {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: transform 0.2s;
        }

        .social-link:hover {
          transform: scale(1.1);
        }

        .social-icon {
          width: 30px;
          height: 30px;
        }

        .social-icon svg {
          width: 100%;
          height: 100%;
          fill: #FFFFFF;
        }

        /* User Icon Button */
        .user-icon-btn {
          position: fixed;
          bottom: 22px;
          right: 16px;
          width: 40px;
          height: 40px;
          background: #4794FE;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
          box-shadow: 0px 8px 25px 0px rgba(0, 0, 0, 0.25);
          z-index: 40;
        }

        .user-icon-btn:hover {
          transform: scale(1.1);
        }

        .user-icon-btn svg {
          width: 18px;
          height: 18px;
          fill: #00171F;
        }

        .hidden {
          display: none !important;
        }
      </style>
      
      <div class="card-container">
        <!-- Header Background with Geometric Pattern -->
        <div class="header-bg">
          <div class="bg-shapes">
            <div class="bg-shape shape-1"></div>
            <div class="bg-shape shape-2"></div>
            <div class="bg-shape shape-3"></div>
            <div class="bg-shape shape-4"></div>
            <div class="bg-shape shape-5"></div>
            <div class="bg-shape shape-6"></div>
          </div>
        </div>

        <!-- Logo -->
        <div class="logo">
          <div class="logo-icon">
            <svg viewBox="0 0 10 23" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.02 2.71L10.04 0V21.65L5.02 19.74V2.71Z" fill="#FFFFFF"/>
              <path d="M0 2.71L5.02 0V21.65L0 19.74V2.71Z" stroke="#FFFFFF" stroke-width="1.546"/>
            </svg>
          </div>
          <div class="logo-text">OAKWOOD
REALTY</div>
        </div>

        <!-- Profile Image in Diamond Shape -->
        <div class="profile-section">
          <div class="profile-diamond">
            <div class="profile-image-wrapper">
              <img class="profile-image hidden" alt="Profile" />
              <div class="profile-initials hidden"></div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="content">
          <!-- User Info -->
          <div class="user-info-section">
            <div class="user-info-inner">
              <div class="name-line"></div>
              <div class="job-title hidden"></div>
            </div>
            <div class="divider-line"></div>
          </div>

          <!-- Summary -->
          <div class="summary hidden"></div>

          <!-- Contact Cards -->
          <div class="contact-cards"></div>

          <!-- Extra Contacts -->
          <div class="extra-contacts"></div>

          <!-- Divider -->
          <div class="section-divider"></div>

          <!-- Social Section -->
          <div class="social-section">
            <div class="social-title">Let's connect</div>
            <div class="social-grid"></div>
          </div>
        </div>

        <!-- User Icon Button -->
        <div class="user-icon-btn">
          <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 2.25C10.864 2.25 12.375 3.761 12.375 5.625C12.375 7.489 10.864 9 9 9C7.136 9 5.625 7.489 5.625 5.625C5.625 3.761 7.136 2.25 9 2.25Z" fill="currentColor"/>
            <path d="M3.75 15.75V14.25C3.75 13.2554 4.14509 12.3016 4.84835 11.5984C5.55161 10.8951 6.50544 10.5 7.5 10.5H10.5C11.4946 10.5 12.4484 10.8951 13.1516 11.5984C13.8549 12.3016 14.25 13.2554 14.25 14.25V15.75" fill="currentColor"/>
          </svg>
        </div>
      </div>
    `;
  }

  render() {
    if (!this._cardData) return;
    
    this.renderProfile();
    this.renderUserInfo();
    this.renderSummary();
    this.renderPrimaryContacts();
    this.renderExtraContacts();
    this.renderSocialLinks();
  }

  renderProfile() {
    const { user_image_url, first_name, last_name } = this._cardData;
    const imageEl = this.shadowRoot.querySelector('.profile-image');
    const initialsEl = this.shadowRoot.querySelector('.profile-initials');
    
    if (user_image_url) {
      imageEl.src = user_image_url;
      imageEl.classList.remove('hidden');
      initialsEl.classList.add('hidden');
    } else {
      const initials = this.getInitials(first_name, last_name);
      initialsEl.textContent = initials;
      initialsEl.classList.remove('hidden');
      imageEl.classList.add('hidden');
    }
  }

  renderUserInfo() {
    const { first_name, last_name, pronouns_v2, designation, company } = this._cardData;
    
    // Name with pronouns
    const nameLine = this.shadowRoot.querySelector('.name-line');
    const fullName = `${first_name || ''} ${last_name || ''}`.trim();
    const pronouns = pronouns_v2 ? ` (${pronouns_v2})` : '';
    nameLine.textContent = fullName + pronouns;

    // Job title with company
    const jobTitleEl = this.shadowRoot.querySelector('.job-title');
    if (designation || company) {
      const parts = [designation, company].filter(Boolean);
      jobTitleEl.textContent = parts.join('  |  ');
      jobTitleEl.classList.remove('hidden');
    } else {
      jobTitleEl.classList.add('hidden');
    }
  }

  renderSummary() {
    const { summary } = this._cardData;
    const summaryEl = this.shadowRoot.querySelector('.summary');
    
    if (summary) {
      summaryEl.textContent = summary;
      summaryEl.classList.remove('hidden');
    } else {
      summaryEl.classList.add('hidden');
    }
  }

  renderPrimaryContacts() {
    const { phone_v2, email_v2 } = this._cardData;
    const container = this.shadowRoot.querySelector('.contact-cards');
    container.innerHTML = '';

    // Phone (first one)
    if (phone_v2 && phone_v2.length > 0) {
      const phoneCard = this.createContactCard('phone', phone_v2[0].value, 'Phone');
      container.appendChild(phoneCard);
    }

    // Email (first one)
    if (email_v2 && email_v2.length > 0) {
      const emailCard = this.createContactCard('email', email_v2[0].value, 'Email');
      container.appendChild(emailCard);
    }
  }

  createContactCard(type, value, label) {
    const card = document.createElement('div');
    card.className = 'contact-card';
    
    const icon = type === 'phone' 
      ? `<svg viewBox="0 0 18 18" fill="none" stroke="#4794FE" stroke-width="1.5"><path d="M15.75 12.74v2.51c0 .28-.11.54-.29.74-.19.19-.44.3-.71.3-5.52 0-10-4.48-10-10 0-.27.11-.52.3-.71.2-.18.46-.29.74-.29h2.51c.27 0 .52.11.71.29.19.19.29.44.29.71 0 .78.13 1.54.38 2.26.08.23.05.49-.08.7l-1.09 1.09c1.06 1.86 2.71 3.51 4.57 4.57l1.09-1.09c.21-.13.47-.16.7-.08.72.25 1.48.38 2.26.38.27 0 .52.1.71.29.18.19.29.44.29.71z"/></svg>`
      : `<svg viewBox="0 0 18 14" fill="none"><rect x="1" y="1" width="16" height="12" stroke="#FFFFFF" stroke-width="1" fill="none"/><path d="M17 2L9 8L1 2" stroke="#FFFFFF" stroke-width="1"/></svg>`;

    card.innerHTML = `
      <div class="contact-icon-wrapper">${icon}</div>
      <div class="contact-details">
        <div class="contact-type">${label}</div>
        <div class="contact-value">${value}</div>
      </div>
    `;

    card.addEventListener('click', () => {
      this.handleContactClick(type, value);
    });

    return card;
  }

  renderExtraContacts() {
    const { email_v2, phone_v2, website_v2, address_v2 } = this._cardData;
    const container = this.shadowRoot.querySelector('.extra-contacts');
    container.innerHTML = '';

    // Additional emails (skip first one)
    if (email_v2 && email_v2.length > 1) {
      email_v2.slice(1).forEach(email => {
        const item = this.createExtraContactItem('email', email.value, email.label);
        container.appendChild(item);
      });
    }

    // Additional phones (skip first one)
    if (phone_v2 && phone_v2.length > 1) {
      phone_v2.slice(1).forEach(phone => {
        const item = this.createExtraContactItem('phone', phone.value, phone.label);
        container.appendChild(item);
      });
    }

    // Websites
    if (website_v2 && website_v2.length > 0) {
      website_v2.forEach(website => {
        const item = this.createExtraContactItem('website', website.value, website.label);
        container.appendChild(item);
      });
    }

    // Address
    if (address_v2) {
      const item = this.createExtraContactItem('address', address_v2, 'Address');
      container.appendChild(item);
    }
  }

  createExtraContactItem(type, value, label) {
    const item = document.createElement('div');
    item.className = 'extra-contact-item';
    
    const icon = this.getContactIcon(type);
    
    item.innerHTML = `
      <div class="extra-icon-circle">
        <div class="extra-icon">${icon}</div>
      </div>
      <div class="extra-text">
        <div class="extra-label">${label || type}</div>
        <div class="extra-value">${value}</div>
      </div>
    `;

    item.addEventListener('click', () => {
      this.handleContactClick(type, value);
    });

    return item;
  }

  renderSocialLinks() {
    const { social_links } = this._cardData;
    const socialGrid = this.shadowRoot.querySelector('.social-grid');
    socialGrid.innerHTML = '';

    if (!social_links) return;

    const platforms = ['instagram', 'facebook', 'twitter', 'whatsapp'];
    
    platforms.forEach(platform => {
      if (social_links[platform]) {
        const link = document.createElement('div');
        link.className = 'social-link';
        link.innerHTML = `
          <div class="social-icon">${this.getSocialIcon(platform)}</div>
        `;
        
        link.addEventListener('click', () => {
          this.handleSocialClick(platform, social_links[platform]);
        });

        socialGrid.appendChild(link);
      }
    });
  }

  getSocialIcon(platform) {
    const icons = {
      instagram: `<svg viewBox="0 0 30 30" fill="currentColor"><path d="M15 8.438A6.562 6.562 0 108.438 15 6.57 6.57 0 0015 8.438zM15 19.688A4.688 4.688 0 1119.688 15 4.693 4.693 0 0115 19.688z"/><circle cx="21.844" cy="8.156" r="1.594"/><path d="M25.313 0H4.687A4.693 4.693 0 000 4.688v20.625A4.693 4.693 0 004.688 30h20.625A4.693 4.693 0 0030 25.313V4.687A4.693 4.693 0 0025.313 0zm2.813 25.313a2.816 2.816 0 01-2.813 2.813H4.687a2.816 2.816 0 01-2.812-2.813V4.687A2.816 2.816 0 014.688 1.876h20.625a2.816 2.816 0 012.813 2.813z"/></svg>`,
      facebook: `<svg viewBox="0 0 30 30" fill="currentColor"><path d="M28.344 0H1.656A1.656 1.656 0 000 1.656v26.688A1.656 1.656 0 001.656 30h14.367V18.398h-3.91v-4.523h3.91v-3.336c0-3.875 2.367-5.984 5.824-5.984 1.656 0 3.078.123 3.492.178v4.05l-2.396.001c-1.88 0-2.244.893-2.244 2.203v2.888h4.484l-.584 4.523h-3.9V30h7.645A1.656 1.656 0 0030 28.344V1.656A1.656 1.656 0 0028.344 0z"/></svg>`,
      twitter: `<svg viewBox="0 0 30 24" fill="currentColor"><path d="M30 2.839a12.3 12.3 0 01-3.534.97 6.168 6.168 0 002.704-3.401 12.33 12.33 0 01-3.907 1.493A6.153 6.153 0 0020.77 0c-3.398 0-6.153 2.755-6.153 6.153 0 .482.054.951.16 1.402A17.466 17.466 0 012.087 1.106a6.153 6.153 0 001.904 8.21 6.127 6.127 0 01-2.787-.77v.078a6.153 6.153 0 004.935 6.03 6.153 6.153 0 01-2.777.105 6.153 6.153 0 005.745 4.271A12.34 12.34 0 010 21.29 17.408 17.408 0 009.435 24c11.322 0 17.512-9.38 17.512-17.512 0-.267-.006-.533-.017-.797A12.512 12.512 0 0030 2.839z"/></svg>`,
      whatsapp: `<svg viewBox="0 0 30 30" fill="currentColor"><path d="M15 0C6.716 0 0 6.716 0 15c0 2.654.693 5.152 1.904 7.318L.061 28.78a.938.938 0 001.16 1.16l6.463-1.843A14.906 14.906 0 0015 30c8.284 0 15-6.716 15-15S23.284 0 15 0zm7.362 21.238c-.295.829-1.693 1.556-2.373 1.623-.616.062-1.115.276-4.603-.963-4.21-1.495-6.927-5.756-7.137-6.024-.206-.268-1.695-2.252-1.695-4.295 0-2.043 1.073-3.045 1.453-3.462.38-.417.829-.521 1.105-.521.276 0 .552.003.795.014.254.012.596-.097.933.711.342.82 1.166 2.844 1.268 3.048.103.204.171.443.034.711-.137.268-.206.437-.411.674-.206.237-.432.529-.617.71-.206.204-.42.425-.18.833.237.408 1.058 1.744 2.273 2.825 1.562 1.391 2.88 1.823 3.29 2.028.412.206.653.171.893-.103.237-.274.682-.83 1.073-1.389.296-.417.657-.471 1.1-.279.444.191 2.809 1.323 3.292 1.565.483.242.81.36.927.557.116.197.116 1.133-.179 1.962z"/></svg>`
    };
    return icons[platform] || '';
  }

  getContactIcon(type) {
    const icons = {
      email: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
      phone: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>`,
      website: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`,
      address: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>`
    };
    return icons[type] || icons.email;
  }
}

customElements.define('uniqode-layout-12', CardLayout12);
export default CardLayout12;
