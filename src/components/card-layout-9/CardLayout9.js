import { BaseCard } from '../base/BaseCard.js';
import { hexToRGBA } from '../../shared/utils/colors.js';
import { getInitials } from '../../shared/utils/initials.js';

export class CardLayout9 extends BaseCard {
  constructor() {
    super();
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  render() {
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  getTemplate() {
    return `
      <style>${this.getStyles()}</style>
      <div class="container">
        ${this.renderContent()}
        ${this.renderActionButtons()}
      </div>
    `;
  }

  getStyles() {
    const customizations = this._cardData?.customizations || {};
    const mixedColor = this.mixWhite(customizations.background_color || '#007bff');
    
    return `
      *, *::before, *::after { box-sizing: border-box; }
      .container {
        min-width: 100%; height: 100vh; position: relative; overflow-x: hidden;
        font-family: ${customizations.font_style || 'Work Sans, sans-serif'};
        background-color: white; padding: 20px;
      }
      .header-section {
        background: ${mixedColor}; padding: 30px 20px; border-radius: 15px;
        text-align: center; margin-bottom: 20px;
      }
      .profile-image, .initials {
        width: 100px; height: 100px; border-radius: 50%; margin: 0 auto 15px;
        border: 3px solid white; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      .initials {
        background-color: ${hexToRGBA(customizations.background_color || '#007bff', 0.3)};
        color: ${customizations.background_color || '#007bff'}; font-size: 30px; font-weight: 600;
        display: flex; align-items: center; justify-content: center;
      }
      .profile-image { object-fit: cover; }
      .user-name {
        font-weight: 700; font-size: 24px; margin: 15px 0;
        color: ${customizations.user_info_color || '#333333'};
      }
      .designation, .company {
        color: ${customizations.secondary_color || '#666666'}; font-size: 14px; margin: 5px 0;
      }
      .summary {
        color: ${customizations.secondary_color || '#666666'}; font-size: 13px;
        line-height: 1.5; margin: 15px 0; max-width: 300px; margin-left: auto; margin-right: auto;
      }
      .contact-section { margin: 20px 0; }
      .contact-item {
        display: flex; align-items: center; margin: 12px 0; padding: 12px;
        background: ${hexToRGBA(customizations.background_color || '#007bff', 0.05)};
        border-radius: 8px; border-left: 3px solid ${customizations.icon_color || '#007bff'};
      }
      .contact-icon {
        width: 35px; height: 35px; border-radius: 50%;
        background: ${hexToRGBA(customizations.icon_color || '#007bff', 0.2)};
        display: flex; align-items: center; justify-content: center;
        margin-right: 12px; color: ${customizations.icon_color || '#007bff'}; font-size: 16px;
      }
      .contact-text {
        color: ${customizations.secondary_color || '#666666'}; font-size: 14px; text-decoration: none;
      }
      .social-section {
        background: ${hexToRGBA(customizations.background_color || '#007bff', 0.05)};
        padding: 20px; border-radius: 12px; margin: 20px 0; text-align: center;
      }
      .social-title {
        color: ${customizations.user_info_color || '#333333'}; font-weight: 600;
        font-size: 16px; margin-bottom: 15px;
      }
      .social-links { display: flex; justify-content: center; gap: 12px; flex-wrap: wrap; }
      .social-icon {
        width: 40px; height: 40px; border-radius: 8px;
        background: ${customizations.icon_color || '#007bff'}; display: flex;
        align-items: center; justify-content: center; color: white;
        text-decoration: none; font-size: 18px; transition: all 0.2s;
      }
      .social-icon:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.2); }
      .action-buttons {
        position: fixed; bottom: 0; left: 0; right: 0; display: flex;
        background: white; box-shadow: 0 -2px 10px rgba(0,0,0,0.1); z-index: 3;
      }
      .action-button {
        flex: 1; padding: 16px; background: ${customizations.button_color || '#007bff'};
        color: white; border: none; font-size: 16px; font-weight: 600; cursor: pointer;
      }
      .action-button:first-child { background: ${customizations.secondary_color || '#666666'}; }
      .branding-footer-margin { padding-bottom: 80px; }
    `;
  }

  mixWhite(hex) {
    if (!hex) return 'rgba(0,123,255,0.1)';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${Math.round(r * 0.9 + 255 * 0.1)}, ${Math.round(g * 0.9 + 255 * 0.1)}, ${Math.round(b * 0.9 + 255 * 0.1)}, 1)`;
  }

  renderContent() {
    const data = this._cardData || {};
    const name = this.getFullName(data);
    
    let html = '<div class="header-section">';
    
    if (data.user_image_url) {
      html += `<img src="${data.user_image_url}" alt="${name}" class="profile-image">`;
    } else if (data.first_name) {
      html += `<div class="initials">${getInitials(data.first_name, data.last_name)}</div>`;
    }
    
    html += `<div class="user-name">${name}</div>`;
    if (data.designation) html += `<div class="designation">${data.designation}</div>`;
    if (data.company) html += `<div class="company">${data.company}</div>`;
    if (data.summary) html += `<div class="summary">${data.summary}</div>`;
    html += '</div>';
    
    html += '<div class="contact-section">';
    if (data.phone_v2?.length > 0) {
      data.phone_v2.forEach(phone => {
        if (phone.value?.trim()) {
          html += `
            <div class="contact-item">
              <div class="contact-icon"><i class="fas fa-phone"></i></div>
              <a href="tel:${phone.value}" class="contact-text">${phone.value}</a>
            </div>
          `;
        }
      });
    }
    
    if (data.email_v2?.length > 0) {
      data.email_v2.forEach(email => {
        if (email.value?.trim()) {
          html += `
            <div class="contact-item">
              <div class="contact-icon"><i class="fas fa-envelope"></i></div>
              <a href="mailto:${email.value}" class="contact-text">${email.value}</a>
            </div>
          `;
        }
      });
    }
    
    if (data.website_v2?.length > 0) {
      data.website_v2.forEach(website => {
        if (website.value?.trim()) {
          html += `
            <div class="contact-item">
              <div class="contact-icon"><i class="fas fa-globe"></i></div>
              <a href="${website.value}" target="_blank" class="contact-text">${website.value}</a>
            </div>
          `;
        }
      });
    }
    html += '</div>';
    
    const socialLinks = data.social_links || {};
    const hasSocial = Object.values(socialLinks).some(link => link);
    
    if (hasSocial) {
      html += '<div class="social-section">';
      html += '<div class="social-title">Connect with me</div>';
      html += this.renderSocialLinks();
      html += '</div>';
    }
    
    return html;
  }

  renderSocialLinks() {
    const socialLinks = this._cardData?.social_links || {};
    const socialIcons = {
      linkedin: 'fab fa-linkedin-in', twitter: 'fab fa-twitter', facebook: 'fab fa-facebook-f',
      instagram: 'fab fa-instagram', github: 'fab fa-github', youtube: 'fab fa-youtube',
      tiktok: 'fab fa-tiktok', snapchat: 'fab fa-snapchat-ghost', whatsapp: 'fab fa-whatsapp'
    };
    
    let html = '<div class="social-links">';
    Object.keys(socialIcons).forEach(platform => {
      if (socialLinks[platform]) {
        html += `<a href="${socialLinks[platform]}" target="_blank" class="social-icon"><i class="${socialIcons[platform]}"></i></a>`;
      }
    });
    html += '</div>';
    return html;
  }

  renderActionButtons() {
    return `
      <div class="branding-footer-margin">
        <div class="action-buttons">
          <button class="action-button" onclick="this.getRootNode().host.handleSaveContact()">Save Contact</button>
          <button class="action-button" onclick="this.getRootNode().host.handleLeadCollect()">Share</button>
        </div>
      </div>
    `;
  }

  getFullName(data) {
    let name = data.first_name || '';
    if (data.last_name) name += ' ' + data.last_name;
    if (data.prefix) name = data.prefix + ' ' + name;
    if (data.suffix) name += ', ' + data.suffix;
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

customElements.define('uniqode-layout-9', CardLayout9);
