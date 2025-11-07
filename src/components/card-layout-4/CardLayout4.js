import { BaseCard } from '../base/BaseCard.js';
import { hexToRGBA } from '../../shared/utils/colors.js';
import { getInitials } from '../../shared/utils/initials.js';
import { isValidEmail, isValidPhone, isValidUrl } from '../../shared/utils/validation.js';

export class CardLayout4 extends BaseCard {
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
        ${this.renderProfileSection()}
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
    
    return `
      *,
      *::before,
      *::after {
        box-sizing: border-box;
      }

      .container {
        min-width: 100%;
        height: calc(100vh);
        top: 0px;
        max-width: 500px;
        position: relative;
        overflow-x: hidden;
        font-family: ${customizations.font_style || 'Work Sans, sans-serif'};
        background-color: #FFFFFF;
      }

      .ellipse {
        width: 148vw;
        height: 220px;
        top: -80px;
        left: -64px;
        border-radius: 50%;
        position: absolute;
        background-color: ${customizations.background_color || '#007bff'};
      }

      .logo {
        padding-top: 104px;
        padding-left: 86px;
        height: 40px;
        max-width: 100px;
        position: relative;
        z-index: 2;
      }

      .profile {
        width: 150px;
        height: 150px;
        top: 1rem;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 8px rgba(0.5, 0.5, 0.5, 0.15);
        position: relative;
        z-index: 2;
      }

      .flex-center {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .flex-column {
        flex-direction: column;
      }

      .user-image {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        object-fit: cover;
      }

      .user-name {
        font-weight: 600;
        font-size: 30px;
        line-height: 1;
        word-break: break-word;
        text-align: center;
        color: ${customizations.user_info_color || '#333333'};
        margin: 20px 0 10px 0;
      }

      .pronunciation {
        font-style: italic;
        font-weight: 400;
        opacity: 0.4;
        color: ${customizations.user_info_color || '#333333'};
        font-size: 16px;
      }

      .user-name-container {
        top: 10rem;
        width: 100%;
        text-align: center;
        position: relative;
        z-index: 2;
      }

      .designation {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        margin: 5px 0;
      }

      .company {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 16px;
        font-weight: 400;
        text-align: center;
        margin: 5px 0;
      }

      .summary {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        margin: 15px 0;
        padding: 0 20px;
        line-height: 1.4;
      }

      .contacts-container {
        margin: 0px 26px;
        width: 80%;
        margin-bottom: 40px;
        position: relative;
        z-index: 2;
      }

      .contact-item {
        display: flex;
        align-items: center;
        margin: 15px 0;
        padding: 12px;
        background-color: rgba(255, 255, 255, 0.9);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .contact-icon {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        color: ${customizations.icon_color || '#007bff'};
      }

      .contact-text {
        color: ${customizations.user_info_color || '#333333'};
        font-size: 14px;
        text-decoration: none;
      }

      .contact-label {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 12px;
        opacity: 0.7;
        margin-left: 8px;
      }

      .social-links {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
        margin: 30px 0;
        position: relative;
        z-index: 2;
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

      .profile-svg-container {
        position: relative;
        z-index: 1;
        width: 100%;
        height: 405px;
        margin-bottom: -200px;
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
        border: 2px solid rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 8px rgba(0.5, 0.5, 0.5, 0.15);
      }

      @media only screen and (min-width: 300px) {
        .ellipse {
          width: 141vw;
        }
        .contacts-container {
          margin: 0px 38px;
          width: 75%;
        }
      }

      @media only screen and (min-width: 350px) {
        .ellipse {
          width: 135vw;
        }
        .contacts-container {
          margin: 0px 28px;
          width: 82%;
        }
      }

      @media only screen and (min-width: 400px) {
        .ellipse {
          width: 130vw;
        }
        .contacts-container {
          margin: 30px;
          width: 85%;
        }
      }

      @media only screen and (min-width: 450px) {
        .container {
          max-width: 450px;
          min-width: 500px;
        }
        .ellipse {
          width: 620px;
        }
        .contacts-container {
          margin: 10px 40px;
        }
        .action-buttons {
          width: 390px;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    `;
  }

  renderProfileSection() {
    const data = this._cardData || {};
    
    return `
      <div class="profile-svg-container">
        <svg viewBox="0 0 500 450" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%;">
          <defs>
            <clipPath id="profileView">
              <path d="M 0 0 V 405.487 C 0 405.487 68.6349 405.239 125.641 405.487 C 241.695 405.994 305.739 320.727 421.795 320.727 H 500 V 0 H 0 Z" fill="white"/>
            </clipPath>
          </defs>
          ${data.user_image_url ? 
            `<image href="${data.user_image_url}" clip-path="url(#profileView)" preserveAspectRatio="xMidYMid slice" width="500" height="450"/>` :
            `<rect width="500" height="450" fill="${data.customizations?.background_color || '#007bff'}" clip-path="url(#profileView)"/>
             <foreignObject x="175" y="125" width="150" height="150" clip-path="url(#profileView)">
               <div class="initials">${getInitials(data.first_name, data.last_name)}</div>
             </foreignObject>`
          }
        </svg>
      </div>
      ${data.logo_url ? `
        <div class="logo">
          <img src="${data.logo_url}" alt="Logo" style="max-width: 100%; max-height: 40px;">
        </div>
      ` : ''}
    `;
  }

  renderUserInfo() {
    const data = this._cardData || {};
    const name = this.getFullName(data);
    
    return `
      <div class="user-name-container">
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
        if (phone.value && isValidPhone(phone.value)) {
          html += `
            <div class="contact-item">
              <i class="fas fa-phone contact-icon"></i>
              <a href="tel:${phone.value}" class="contact-text">${phone.value}</a>
              ${phone.label ? `<span class="contact-label">${phone.label}</span>` : ''}
            </div>
          `;
        }
      });
    }
    
    // Email addresses
    if (data.email_v2 && data.email_v2.length > 0) {
      data.email_v2.forEach(email => {
        if (email.value && isValidEmail(email.value)) {
          html += `
            <div class="contact-item">
              <i class="fas fa-envelope contact-icon"></i>
              <a href="mailto:${email.value}" class="contact-text">${email.value}</a>
              ${email.label ? `<span class="contact-label">${email.label}</span>` : ''}
            </div>
          `;
        }
      });
    }
    
    // Websites
    if (data.website_v2 && data.website_v2.length > 0) {
      data.website_v2.forEach(website => {
        if (website.value && isValidUrl(website.value)) {
          html += `
            <div class="contact-item">
              <i class="fas fa-globe contact-icon"></i>
              <a href="${website.value}" target="_blank" class="contact-text">${website.value}</a>
              ${website.label ? `<span class="contact-label">${website.label}</span>` : ''}
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

customElements.define('uniqode-layout-4', CardLayout4);
