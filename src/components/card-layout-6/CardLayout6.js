import { BaseCard } from '../base/BaseCard.js';
import { hexToRGBA } from '../../shared/utils/colors.js';
import { getInitials } from '../../shared/utils/initials.js';
import { isValidEmail, isValidPhone, isValidUrl } from '../../shared/utils/validation.js';

export class CardLayout6 extends BaseCard {
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
        ${this.renderUserInfo()}
        ${this.renderContactInfo()}
        ${this.renderSocialLinks()}
        ${this.renderActionButtons()}
      </div>
    `;
  }

  getStyles() {
    const data = this._cardData || {};
    const customizations = data.customizations || {};
    const userInfoBgColor = hexToRGBA('#000000', 0.05);
    
    return `
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      .container {
        min-width: 100%;
        height: 100vh;
        position: relative;
        overflow-x: hidden;
        font-family: ${customizations.font_style || 'Work Sans, sans-serif'};
        background-color: white;
      }

      .header-section {
        background-color: ${customizations.background_color || '#007bff'};
        width: 100%;
        height: 101px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .logo {
        max-width: 120px;
        max-height: auto;
      }

      .user-info-section {
        text-align: center;
        background: rgba(131, 121, 121, 0.1);
        padding: 40px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      }

      .profile-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 20px;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .initials {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-color: ${hexToRGBA(customizations.background_color || '#007bff', 0.2)};
        color: ${customizations.background_color || '#007bff'};
        font-family: ${customizations.font_style || 'Work Sans, sans-serif'};
        font-size: 48px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 20px;
        border: 3px solid white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }

      .user-name {
        font-weight: 600;
        font-size: 28px;
        line-height: 1.2;
        color: ${customizations.user_info_color || '#333333'};
        margin-bottom: 8px;
        text-align: center;
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
        margin: 8px 0;
      }

      .company {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 16px;
        font-weight: 400;
        margin: 8px 0;
      }

      .summary {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 14px;
        font-weight: 400;
        line-height: 1.5;
        margin: 20px 0;
        max-width: 400px;
        text-align: center;
      }

      .personal-info-section {
        background: ${userInfoBgColor};
        padding: 30px 20px;
        margin: 20px;
        border-radius: 12px;
      }

      .contacts-container {
        margin: 20px;
      }

      .contact-item {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        padding: 15px;
        background-color: white;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .contact-icon-container {
        margin-right: 15px;
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

      .contact-text {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 14px;
        text-decoration: none;
        font-weight: 400;
      }

      .contact-label {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 12px;
        opacity: 0.7;
        margin-top: 4px;
      }

      .social-links {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
        margin: 30px 20px;
      }

      .social-icon {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        background-color: ${customizations.icon_color || '#007bff'};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        font-size: 20px;
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
          margin: 0 auto;
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
    
    return `
      <div class="header-section">
        ${data.logo_url ? `<img src="${data.logo_url}" alt="Logo" class="logo">` : ''}
      </div>
    `;
  }

  renderUserInfo() {
    const data = this._cardData || {};
    const name = this.getFullName(data);
    
    return `
      <div class="user-info-section">
        ${data.user_image_url ? 
          `<img src="${data.user_image_url}" alt="${name}" class="profile-image">` :
          data.first_name ? `<div class="initials">${getInitials(data.first_name, data.last_name)}</div>` : ''
        }
        <div class="user-name">${name}</div>
        ${data.pronouns_v2 ? `<div class="pronunciation">(${data.pronouns_v2})</div>` : ''}
        ${data.designation ? `<div class="designation">${data.designation}</div>` : ''}
        ${data.company ? `<div class="company">${data.company}</div>` : ''}
        ${data.summary ? `<div class="summary">${data.summary}</div>` : ''}
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
                  <i class="fas fa-phone" style="color: ${this._cardData?.customizations?.icon_color || '#007bff'}; font-size: 18px;"></i>
                </div>
              </div>
              <div>
                <a href="tel:${phone.value}" class="contact-text">${phone.value}</a>
                ${phone.label ? `<div class="contact-label">${phone.label}</div>` : ''}
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
                  <i class="fas fa-envelope" style="color: ${this._cardData?.customizations?.icon_color || '#007bff'}; font-size: 18px;"></i>
                </div>
              </div>
              <div>
                <a href="mailto:${email.value}" class="contact-text">${email.value}</a>
                ${email.label ? `<div class="contact-label">${email.label}</div>` : ''}
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
                  <i class="fas fa-globe" style="color: ${this._cardData?.customizations?.icon_color || '#007bff'}; font-size: 18px;"></i>
                </div>
              </div>
              <div>
                <a href="${website.value}" target="_blank" class="contact-text">${website.value}</a>
                ${website.label ? `<div class="contact-label">${website.label}</div>` : ''}
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

customElements.define('uniqode-layout-6', CardLayout6);
