import { BaseCard } from '../base/BaseCard.js';
import { hexToRGBA } from '../../shared/utils/colors.js';
import { getInitials } from '../../shared/utils/initials.js';

export class CardLayout8 extends BaseCard {
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
    return `
      *, *::before, *::after { box-sizing: border-box; }
      .container {
        min-width: 100%; height: 100vh; position: relative; overflow-x: hidden;
        font-family: ${customizations.font_style || 'Work Sans, sans-serif'};
        background: linear-gradient(135deg, ${customizations.background_color || '#007bff'}, ${hexToRGBA(customizations.background_color || '#007bff', 0.7)});
        color: white; text-align: center; padding: 40px 20px;
      }
      .profile-image, .initials {
        width: 120px; height: 120px; border-radius: 50%; margin: 20px auto;
        border: 4px solid rgba(255,255,255,0.3);
      }
      .initials {
        background-color: rgba(255,255,255,0.2); color: white; font-size: 36px; font-weight: 600;
        display: flex; align-items: center; justify-content: center;
      }
      .profile-image { object-fit: cover; }
      .user-name { font-weight: 700; font-size: 28px; margin: 20px 0; text-shadow: 0 2px 4px rgba(0,0,0,0.3); }
      .designation, .company { font-size: 16px; margin: 8px 0; opacity: 0.9; }
      .summary { font-size: 14px; line-height: 1.6; margin: 25px 0; opacity: 0.8; max-width: 350px; margin-left: auto; margin-right: auto; }
      .contact-item {
        display: inline-block; margin: 8px 15px; padding: 10px 20px;
        background: rgba(255,255,255,0.2); border-radius: 25px; backdrop-filter: blur(10px);
      }
      .contact-text { color: white; text-decoration: none; font-size: 14px; }
      .social-links { display: flex; justify-content: center; gap: 20px; margin: 30px 0; }
      .social-icon {
        width: 45px; height: 45px; border-radius: 50%; background: rgba(255,255,255,0.2);
        display: flex; align-items: center; justify-content: center; color: white;
        text-decoration: none; font-size: 20px; transition: all 0.3s;
        backdrop-filter: blur(10px);
      }
      .social-icon:hover { transform: scale(1.1); background: rgba(255,255,255,0.3); }
      .action-buttons {
        position: fixed; bottom: 0; left: 0; right: 0; display: flex;
        background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); z-index: 3;
      }
      .action-button {
        flex: 1; padding: 18px; background: ${customizations.button_color || '#007bff'};
        color: white; border: none; font-size: 16px; font-weight: 600; cursor: pointer;
        transition: background-color 0.2s;
      }
      .action-button:first-child { background: ${customizations.secondary_color || '#666666'}; }
      .action-button:hover { opacity: 0.9; }
      .branding-footer-margin { padding-bottom: 80px; }
    `;
  }

  renderContent() {
    const data = this._cardData || {};
    const name = this.getFullName(data);
    
    let html = '';
    
    if (data.user_image_url) {
      html += `<img src="${data.user_image_url}" alt="${name}" class="profile-image">`;
    } else if (data.first_name) {
      html += `<div class="initials">${getInitials(data.first_name, data.last_name)}</div>`;
    }
    
    html += `<div class="user-name">${name}</div>`;
    if (data.designation) html += `<div class="designation">${data.designation}</div>`;
    if (data.company) html += `<div class="company">${data.company}</div>`;
    if (data.summary) html += `<div class="summary">${data.summary}</div>`;
    
    if (data.phone_v2?.[0]?.value) {
      html += `<div class="contact-item"><a href="tel:${data.phone_v2[0].value}" class="contact-text">${data.phone_v2[0].value}</a></div>`;
    }
    if (data.email_v2?.[0]?.value) {
      html += `<div class="contact-item"><a href="mailto:${data.email_v2[0].value}" class="contact-text">${data.email_v2[0].value}</a></div>`;
    }
    
    html += this.renderSocialLinks();
    
    return html;
  }

  renderSocialLinks() {
    const socialLinks = this._cardData?.social_links || {};
    const socialIcons = {
      linkedin: 'fab fa-linkedin-in', twitter: 'fab fa-twitter', facebook: 'fab fa-facebook-f',
      instagram: 'fab fa-instagram', github: 'fab fa-github', youtube: 'fab fa-youtube'
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

customElements.define('uniqode-layout-8', CardLayout8);
