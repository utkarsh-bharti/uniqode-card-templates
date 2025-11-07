import { BaseCard } from '../base/BaseCard.js';
import { hexToRGBA } from '../../shared/utils/colors.js';
import { getInitials } from '../../shared/utils/initials.js';

export class CardLayout7 extends BaseCard {
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
        ${this.renderContent()}
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
        height: 100vh;
        position: relative;
        overflow-x: hidden;
        font-family: ${customizations.font_style || 'Work Sans, sans-serif'};
        background-color: white;
      }

      .content {
        padding: 20px;
        text-align: center;
      }

      .profile-image {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        object-fit: cover;
        margin: 20px auto;
        border: 3px solid ${customizations.background_color || '#007bff'};
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
        margin: 20px auto;
        border: 3px solid ${customizations.background_color || '#007bff'};
      }

      .user-name {
        font-weight: 600;
        font-size: 24px;
        color: ${customizations.user_info_color || '#333333'};
        margin: 15px 0;
      }

      .designation {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 16px;
        margin: 10px 0;
      }

      .company {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 16px;
        margin: 10px 0;
      }

      .summary {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 14px;
        line-height: 1.5;
        margin: 20px 0;
        max-width: 400px;
        margin-left: auto;
        margin-right: auto;
      }

      .contact-item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 15px 0;
        padding: 12px;
        background-color: ${hexToRGBA(customizations.background_color || '#007bff', 0.1)};
        border-radius: 8px;
        max-width: 300px;
        margin-left: auto;
        margin-right: auto;
      }

      .contact-icon {
        margin-right: 10px;
        color: ${customizations.icon_color || '#007bff'};
        font-size: 18px;
      }

      .contact-text {
        color: ${customizations.secondary_color || '#666666'};
        font-size: 14px;
        text-decoration: none;
      }

      .social-links {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 15px;
        margin: 30px 0;
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
        padding-bottom: 80px;
      }
    `;
  }

  renderContent() {
    const data = this._cardData || {};
    const name = this.getFullName(data);
    
    let html = '<div class="content">';
    
    // Profile image or initials
    if (data.user_image_url) {
      html += `<img src="${data.user_image_url}" alt="${name}" class="profile-image">`;
    } else if (data.first_name) {
      html += `<div class="initials">${getInitials(data.first_name, data.last_name)}</div>`;
    }
    
    // User info
    html += `<div class="user-name">${name}</div>`;
    if (data.designation) {
      html += `<div class="designation">${data.designation}</div>`;
    }
    if (data.company) {
      html += `<div class="company">${data.company}</div>`;
    }
    if (data.summary) {
      html += `<div class="summary">${data.summary}</div>`;
    }
    
    // Contact info
    if (data.phone_v2 && data.phone_v2.length > 0) {
      data.phone_v2.forEach(phone => {
        if (phone.value && phone.value.trim() !== '') {
          html += `
            <div class="contact-item">
              <i class="fas fa-phone contact-icon"></i>
              <a href="tel:${phone.value}" class="contact-text">${phone.value}</a>
            </div>
          `;
        }
      });
    }
    
    if (data.email_v2 && data.email_v2.length > 0) {
      data.email_v2.forEach(email => {
        if (email.value && email.value.trim() !== '') {
          html += `
            <div class="contact-item">
              <i class="fas fa-envelope contact-icon"></i>
              <a href="mailto:${email.value}" class="contact-text">${email.value}</a>
            </div>
          `;
        }
      });
    }
    
    if (data.website_v2 && data.website_v2.length > 0) {
      data.website_v2.forEach(website => {
        if (website.value && website.value.trim() !== '') {
          html += `
            <div class="contact-item">
              <i class="fas fa-globe contact-icon"></i>
              <a href="${website.value}" target="_blank" class="contact-text">${website.value}</a>
            </div>
          `;
        }
      });
    }
    
    // Social links
    html += this.renderSocialLinks();
    
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
            Save Contact
          </button>
          <button class="action-button" onclick="this.getRootNode().host.handleLeadCollect()">
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

customElements.define('uniqode-layout-7', CardLayout7);
