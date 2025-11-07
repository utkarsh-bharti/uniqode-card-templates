import { BaseCard } from '../base/BaseCard.js';
import { hexToRGBA } from '../../shared/utils/colors.js';
import { getInitials } from '../../shared/utils/initials.js';
import { isValidEmail, isValidPhone, isValidUrl } from '../../shared/utils/validation.js';

export class CardLayout5 extends BaseCard {
  constructor() {
    super();
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  render() {
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  getTemplate() {
    const data = this._cardData || {};
    const customizations = data.customizations || {};
    
    return `
      <style>
        ${this.getStyles()}
      </style>
      <div class="container">
        ${this.renderHeader()}
        ${this.renderSummary()}
        ${this.renderContactInfo()}
        ${this.renderSocialLinks()}
        ${this.renderActionButtons()}
      </div>
    `;
  }

  getStyles() {
    const data = this._cardData || {};
    const customizations = data.customizations || {};
    const secondaryBackgroundColor = hexToRGBA(customizations.background_color || '#007bff', 0.1);
    
    return `
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      .container {
        min-width: 100%;
        height: 100vh;
        top: 0px;
        max-width: 500px;
        position: relative;
        overflow-x: hidden;
        font-family: ${customizations.font_style || 'Work Sans, sans-serif'};
        background-color: white;
      }

      .header-section {
        background-color: ${customizations.background_color || '#007bff'};
        padding: 54px 32px;
        position: relative;
        overflow: hidden;
      }

      .user-info-section {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        position: relative;
      }

      .user-details {
        flex: 1;
        max-width: 50%;
      }

      .user-image-section {
        position: absolute;
        right: -56%;
        top: 0;
        width: 49%;
      }

      .user-image-section.no-image {
        right: -2%;
        display: flex;
        justify-content: flex-end;
      }

      .user-image {
        border-radius: 50%;
        clip-path: inset(0 8px 0 0);
        width: 100%;
        height: auto;
        aspect-ratio: 1;
        object-fit: cover;
      }

      .initials-container {
        display: flex;
        justify-content: flex-end;
      }

      .initials {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-color: ${hexToRGBA(customizations.background_color || '#007bff', 0.2)};
        color: ${customizations.background_color || '#007bff'};
        font-family: ${customizations.font_style || 'Work Sans, sans-serif'};
        font-size: 36px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        clip-path: inset(0 8px 0 0);
      }

      .logo {
        margin-bottom: 40px;
      }

      .logo img {
        height: 40px;
        max-width: 100%;
      }

      .user-name {
        font-weight: 600;
        font-size: 30px;
        line-height: 1.2;
        color: ${customizations.user_info_color || '#333333'};
        margin-bottom: 8px;
        max-width: 200px;
        word-break: break-word;
      }

      .pronunciation {
        font-style: italic;
        font-weight: 400;
        opacity: 0.4;
        color: ${customizations.user_info_color || '#333333'};
        font-size: 16px;
        margin-bottom: 8px;
      }

      .designation {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 16px;
        font-weight: 400;
        margin-top: 16px;
        max-width: 200px;
        line-height: 1.3;
      }

      .company {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 16px;
        font-weight: 400;
        margin-top: 8px;
        max-width: 200px;
        line-height: 1.3;
      }

      .summary-section {
        padding: 68px 32px 48px 32px;
        background: ${secondaryBackgroundColor};
        position: relative;
      }

      .summary {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        white-space: pre-line;
        word-break: break-word;
        text-align: left;
      }

      .contacts-container {
        margin: 24px 32px;
        position: relative;
      }

      .contact-item {
        display: flex;
        margin-bottom: 20px;
        word-break: break-all;
      }

      .contact-icon-container {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .svg-container {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: ${hexToRGBA(customizations.icon_color || '#007bff', 0.2)};
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .contact-details-container {
        padding-left: 12px;
        display: flex;
        align-items: center;
      }

      .contact-info {
        display: flex;
        flex-direction: column;
      }

      .contact-text {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 14px;
        text-decoration: none;
        font-weight: 400;
      }

      .contact-label {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 12px;
        opacity: 0.5;
        margin-top: 5px;
        text-transform: capitalize;
      }

      .social-links {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
        margin: 30px 0;
        padding: 0 32px;
      }

      .social-icon {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: ${customizations.icon_color || '#007bff'};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        font-size: 18px;
        transition: transform 0.2s;
      }

      .social-icon:hover {
        transform: scale(1.1);
      }

      .action-buttons {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        background-color: white;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        z-index: 3;
      }

      .action-button {
        flex: 1;
        padding: 15px;
        background-color: ${customizations.button_color || '#007bff'};
        color: white;
        border: none;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
      }

      .action-button:first-child {
        background-color: ${customizations.secondary_color || '#666666'};
      }

      .action-button:hover {
        opacity: 0.9;
      }

      .branding-footer-margin {
        padding-bottom: ${data.branding_footer ? '7rem' : '9rem'};
      }

      @media only screen and (min-width: 450px) {
        .container {
          max-width: 450px;
        }
        .action-buttons {
          width: 390px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    `;
  }

  renderHeader() {
    const data = this._cardData || {};
    const name = this.getFullName(data);
    
    return `
      <div class="header-section">
        ${data.logo_url ? `
          <div class="logo">
            <img src="${data.logo_url}" alt="Logo">
          </div>
        ` : ''}
        
        <div class="user-info-section">
          <div class="user-details">
            <div class="user-name">${name}</div>
            ${data.pronouns_v2 ? `<div class="pronunciation">(${data.pronouns_v2})</div>` : ''}
            ${data.designation ? `<div class="designation">${data.designation}</div>` : ''}
            ${data.company ? `
              <div class="company">
                ${data.department ? `${data.department} • ` : ''}${data.company}
              </div>
            ` : data.department ? `<div class="company">${data.department}</div>` : ''}
          </div>
          
          <div class="user-image-section ${!data.user_image_url ? 'no-image' : ''}">
            ${data.user_image_url ? 
              `<img src="${data.user_image_url}" alt="${name}" class="user-image">` :
              data.first_name ? `
                <div class="initials-container">
                  <div class="initials">${getInitials(data.first_name, data.last_name)}</div>
                </div>
              ` : ''
            }
          </div>
        </div>
      </div>
    `;
  }

  renderSummary() {
    const data = this._cardData || {};
    
    if (!data.summary) return '';
    
    return `
      <div class="summary-section">
        <div class="summary">${data.summary}</div>
      </div>
    `;
  }

  renderContactInfo() {
    const data = this._cardData || {};
    let html = '<div class="contacts-container">';
    
    // Phone numbers
    if (data.phone_v2 && data.phone_v2.length > 0) {
      data.phone_v2.forEach(phone => {
        if (phone.value && phone.value.trim() !== '') {
          html += `
            <div class="contact-item">
              <div class="contact-icon-container">
                <div class="svg-container">
                  <svg width="22" height="22" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.4296 16.1327L17.0546 14.2577C16.8677 14.178 16.6599 14.1612 16.4627 14.2098C16.2654 14.2585 16.0893 14.3698 15.9608 14.5272L14.0233 16.8944C10.9825 15.4607 8.53535 13.0136 7.10165 9.97283L9.46888 8.0353C9.62657 7.90704 9.73818 7.73091 9.78681 7.53355C9.83545 7.33619 9.81846 7.12837 9.73842 6.94153L7.86338 2.56645C7.77554 2.36505 7.62016 2.2006 7.42406 2.10148C7.22796 2.00236 7.00341 1.97477 6.78915 2.02347L2.72658 2.96099C2.52 3.00869 2.33569 3.12501 2.20373 3.29095C2.07177 3.45689 1.99995 3.66266 2 3.87468C2 13.8944 10.1212 22 20.1253 22C20.3374 22.0001 20.5433 21.9284 20.7093 21.7964C20.8753 21.6644 20.9917 21.4801 21.0394 21.2734L21.9769 17.2108C22.0253 16.9955 21.9971 16.7701 21.8972 16.5733C21.7973 16.3765 21.632 16.2207 21.4296 16.1327Z" fill="${this._cardData?.customizations?.icon_color || '#007bff'}"/>
                  </svg>
                </div>
              </div>
              <div class="contact-details-container">
                <div class="contact-info">
                  <a href="tel:${phone.value}" class="contact-text">${phone.value}</a>
                  ${phone.label ? `<div class="contact-label">${phone.label}</div>` : ''}
                </div>
              </div>
            </div>
          `;
        }
      });
    }
    
    // Email addresses
    if (data.email_v2 && data.email_v2.length > 0) {
      data.email_v2.forEach(email => {
        if (email.value && email.value.trim() !== '') {
          html += `
            <div class="contact-item">
              <div class="contact-icon-container">
                <div class="svg-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.6211 9.45312C21.7734 9.33203 22 9.44531 22 9.63672V17.625C22 18.6602 21.1602 19.5 20.125 19.5H3.875C2.83984 19.5 2 18.6602 2 17.625V9.64062C2 9.44531 2.22266 9.33594 2.37891 9.45703C3.25391 10.1367 4.41406 11 8.39844 13.8945C9.22266 14.4961 10.6133 15.7617 12 15.7539C13.3945 15.7656 14.8125 14.4727 15.6055 13.8945C19.5898 11 20.7461 10.1328 21.6211 9.45312ZM12 14.5C12.9062 14.5156 14.2109 13.3594 14.8672 12.8828C20.0508 9.12109 20.4453 8.79297 21.6406 7.85547C21.8672 7.67969 22 7.40625 22 7.11719V6.375C22 5.33984 21.1602 4.5 20.125 4.5H3.875C2.83984 4.5 2 5.33984 2 6.375V7.11719C2 7.40625 2.13281 7.67578 2.35938 7.85547C3.55469 8.78906 3.94922 9.12109 9.13281 12.8828C9.78906 13.3594 11.0938 14.5156 12 14.5Z" fill="${this._cardData?.customizations?.icon_color || '#007bff'}"/>
                  </svg>
                </div>
              </div>
              <div class="contact-details-container">
                <div class="contact-info">
                  <a href="mailto:${email.value}" class="contact-text">${email.value}</a>
                  ${email.label ? `<div class="contact-label">${email.label}</div>` : ''}
                </div>
              </div>
            </div>
          `;
        }
      });
    }
    
    // Websites
    if (data.website_v2 && data.website_v2.length > 0) {
      data.website_v2.forEach(website => {
        if (website.value && website.value.trim() !== '') {
          html += `
            <div class="contact-item">
              <div class="contact-icon-container">
                <div class="svg-container">
                  <svg width="24" height="24" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5706 6.12903C12.9859 2.52823 11.6069 0 10.0021 0C8.39724 0 7.0182 2.52823 6.43353 6.12903H13.5706ZM6.13111 10C6.13111 10.8952 6.17949 11.754 6.26417 12.5806H13.7359C13.8206 11.754 13.869 10.8952 13.869 10C13.869 9.10484 13.8206 8.24597 13.7359 7.41935H6.26417C6.17949 8.24597 6.13111 9.10484 6.13111 10ZM19.2239 6.12903C18.0706 3.39113 15.7359 1.27419 12.8529 0.419355C13.8368 1.78226 14.5142 3.83468 14.869 6.12903H19.2239ZM7.14724 0.419355C4.2682 1.27419 1.92949 3.39113 0.780301 6.12903H5.13514C5.48595 3.83468 6.16337 1.78226 7.14724 0.419355ZM19.6553 7.41935H15.0303C15.115 8.26613 15.1634 9.13306 15.1634 10C15.1634 10.8669 15.115 11.7339 15.0303 12.5806H19.6513C19.873 11.754 19.998 10.8952 19.998 10C19.998 9.10484 19.873 8.24597 19.6553 7.41935ZM4.84079 10C4.84079 9.13306 4.88917 8.26613 4.97385 7.41935H0.348849C0.131107 8.24597 0.0020752 9.10484 0.0020752 10C0.0020752 10.8952 0.131107 11.754 0.348849 12.5806H4.96982C4.88917 11.7339 4.84079 10.8669 4.84079 10ZM6.43353 13.871C7.0182 17.4718 8.39724 20 10.0021 20C11.6069 20 12.9859 17.4718 13.5706 13.871H6.43353ZM12.8569 19.5806C15.7359 18.7258 18.0747 16.6089 19.2279 13.871H14.873C14.5182 16.1653 13.8408 18.2177 12.8569 19.5806ZM0.780301 13.871C1.93353 16.6089 4.2682 18.7258 7.15127 19.5806C6.1674 18.2177 5.48998 16.1653 5.13514 13.871H0.780301Z" fill="${this._cardData?.customizations?.icon_color || '#007bff'}"/>
                  </svg>
                </div>
              </div>
              <div class="contact-details-container">
                <div class="contact-info">
                  <a href="${website.value}" target="_blank" class="contact-text">${website.value}</a>
                  ${website.label ? `<div class="contact-label">${website.label}</div>` : ''}
                </div>
              </div>
            </div>
          `;
        }
      });
    }

    // Custom fields
    if (data.custom_fields && data.custom_fields.length > 0) {
      data.custom_fields.forEach(field => {
        if (field.value && field.value.trim() !== '') {
          html += `
            <div class="contact-item">
              <div class="contact-icon-container">
                <div class="svg-container">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.03125 18.5714H9.8125V12.9286H9.03125C8.59977 12.9286 8.25 12.5788 8.25 12.1473V10.2812C8.25 9.84977 8.59977 9.5 9.03125 9.5H13.4062C13.8377 9.5 14.1875 9.84977 14.1875 10.2812V18.5714H14.9688C15.4002 18.5714 15.75 18.9212 15.75 19.3527V21.2188C15.75 21.6502 15.4002 22 14.9688 22H9.03125C8.59977 22 8.25 21.6502 8.25 21.2188V19.3527C8.25 18.9212 8.59977 18.5714 9.03125 18.5714ZM12 2C10.4467 2 9.1875 3.25918 9.1875 4.8125C9.1875 6.36582 10.4467 7.625 12 7.625C13.5533 7.625 14.8125 6.36582 14.8125 4.8125C14.8125 3.25918 13.5533 2 12 2Z" fill="${this._cardData?.customizations?.icon_color || '#007bff'}"/>
                  </svg>
                </div>
              </div>
              <div class="contact-details-container">
                <div class="contact-info">
                  <div class="contact-text">${field.value}</div>
                  ${field.label ? `<div class="contact-label">${field.label}</div>` : ''}
                </div>
              </div>
            </div>
          `;
        }
      });
    }
    
    html += '</div>';
    return html;
  }

  renderSocialLinks() {
    const data = this._cardData || {};
    const socialLinks = data.social_links || {};
    
    const socialIcons = {
      linkedin: 'fab fa-linkedin-in',
      twitter: 'fab fa-twitter',
      facebook: 'fab fa-facebook-f',
      instagram: 'fab fa-instagram',
      github: 'fab fa-github',
      youtube: 'fab fa-youtube',
      tiktok: 'fab fa-tiktok',
      snapchat: 'fab fa-snapchat-ghost',
      whatsapp: 'fab fa-whatsapp',
      telegram: 'fab fa-telegram-plane',
      pinterest: 'fab fa-pinterest-p',
      discord: 'fab fa-discord',
      twitch: 'fab fa-twitch',
      vimeo: 'fab fa-vimeo-v',
      dribbble: 'fab fa-dribbble',
      behance: 'fab fa-behance',
      custom_url: 'fas fa-link'
    };
    
    let html = '<div class="social-links">';
    
    Object.keys(socialIcons).forEach(platform => {
      if (socialLinks[platform]) {
        const iconClass = socialIcons[platform];
        html += `
          <a href="${socialLinks[platform]}" target="_blank" class="social-icon">
            <i class="${iconClass}"></i>
          </a>
        `;
      }
    });
    
    html += '</div>';
    return html;
  }

  renderActionButtons() {
    return `
      <div class="branding-footer-margin">
        <div class="action-buttons">
          <button class="action-button" onclick="this.getRootNode().host.handleSaveContact()">
            <i class="fas fa-download" style="margin-right: 8px;"></i>
            Save Contact
          </button>
          <button class="action-button" onclick="this.getRootNode().host.handleLeadCollect()">
            <i class="fas fa-share" style="margin-right: 8px;"></i>
            Share
          </button>
        </div>
      </div>
    `;
  }

  getFullName(data) {
    let name = data.first_name || '';
    if (data.last_name) {
      name += ' ' + data.last_name;
    }
    if (data.prefix) {
      name = data.prefix + ' ' + name;
    }
    if (data.suffix) {
      name += ', ' + data.suffix;
    }
    return name;
  }

  handleSaveContact() {
    this.dispatchEvent(new CustomEvent('save-contact', {
      detail: { action: 'save-contact', cardData: this._cardData },
      bubbles: true
    }));
  }

  handleLeadCollect() {
    this.dispatchEvent(new CustomEvent('lead-collect', {
      detail: { action: 'lead-collect', cardData: this._cardData },
      bubbles: true
    }));
  }
}

customElements.define('uniqode-layout-5', CardLayout5);
