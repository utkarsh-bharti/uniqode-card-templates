import { BaseCard } from '../base/BaseCard.js';
import { hexToRGBA } from '../../shared/utils/colors.js';
import { getInitials } from '../../shared/utils/initials.js';

export class CardLayout11 extends BaseCard {
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
        background: linear-gradient(45deg, #f0f0f0, white); padding: 20px;
      }
      .card-wrapper {
        max-width: 400px; margin: 0 auto; background: white;
        border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        overflow: hidden; position: relative;
      }
      .header-accent {
        height: 6px; background: linear-gradient(90deg, ${customizations.background_color || '#007bff'}, ${hexToRGBA(customizations.background_color || '#007bff', 0.7)});
      }
      .content-section { padding: 30px 25px; text-align: center; }
      .profile-image, .initials {
        width: 110px; height: 110px; border-radius: 50%; margin: 0 auto 20px;
        border: 4px solid ${hexToRGBA(customizations.background_color || '#007bff', 0.2)};
      }
      .initials {
        background: linear-gradient(135deg, ${customizations.background_color || '#007bff'}, ${hexToRGBA(customizations.background_color || '#007bff', 0.8)});
        color: white; font-size: 32px; font-weight: 700;
        display: flex; align-items: center; justify-content: center;
      }
      .profile-image { object-fit: cover; }
      .user-name {
        font-weight: 700; font-size: 26px; margin: 20px 0 8px;
        color: ${customizations.user_info_color || '#333333'}; letter-spacing: -0.5px;
      }
      .designation {
        color: ${customizations.background_color || '#007bff'}; font-size: 16px;
        font-weight: 600; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 1px;
      }
      .company {
        color: ${customizations.secondary_color || '#666666'}; font-size: 15px;
        margin-bottom: 20px; font-weight: 500;
      }
      .summary {
        color: ${customizations.secondary_color || '#666666'}; font-size: 14px;
        line-height: 1.6; margin: 20px 0; font-style: italic;
      }
      .divider {
        width: 50px; height: 3px; background: ${customizations.background_color || '#007bff'};
        margin: 20px auto; border-radius: 2px;
      }
      .contact-grid {
        display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 25px 0;
      }
      .contact-item {
        padding: 15px; background: ${hexToRGBA(customizations.background_color || '#007bff', 0.05)};
        border-radius: 12px; text-align: center; transition: all 0.2s;
        border: 1px solid ${hexToRGBA(customizations.background_color || '#007bff', 0.1)};
      }
      .contact-item:hover {
        transform: translateY(-2px); box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        background: ${hexToRGBA(customizations.background_color || '#007bff', 0.08)};
      }
      .contact-icon {
        width: 40px; height: 40px; border-radius: 50%;
        background: ${customizations.icon_color || '#007bff'}; margin: 0 auto 8px;
        display: flex; align-items: center; justify-content: center;
        color: white; font-size: 16px;
      }
      .contact-text {
        color: ${customizations.secondary_color || '#666666'}; font-size: 12px;
        text-decoration: none; font-weight: 500; display: block;
      }
      .social-section { margin: 25px 0; }
      .social-title {
        color: ${customizations.user_info_color || '#333333'}; font-weight: 600;
        font-size: 14px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 1px;
      }
      .social-links { display: flex; justify-content: center; gap: 10px; }
      .social-icon {
        width: 38px; height: 38px; border-radius: 50%;
        background: ${customizations.icon_color || '#007bff'}; display: flex;
        align-items: center; justify-content: center; color: white;
        text-decoration: none; font-size: 16px; transition: all 0.3s;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
      }
      .social-icon:hover {
        transform: translateY(-3px) scale(1.1); box-shadow: 0 6px 20px rgba(0,0,0,0.3);
      }
      .action-buttons {
        position: fixed; bottom: 0; left: 0; right: 0; display: flex;
        background: white; box-shadow: 0 -3px 15px rgba(0,0,0,0.1); z-index: 3;
      }
      .action-button {
        flex: 1; padding: 18px; background: ${customizations.button_color || '#007bff'};
        color: white; border: none; font-size: 16px; font-weight: 600; cursor: pointer;
        text-transform: uppercase; letter-spacing: 0.5px; transition: all 0.2s;
      }
      .action-button:first-child { background: ${customizations.secondary_color || '#666666'}; }
      .action-button:hover { opacity: 0.9; transform: translateY(-1px); }
      .branding-footer-margin { padding-bottom: 80px; }
    `;
  }

  renderContent() {
    const data = this._cardData || {};
    const name = this.getFullName(data);
    
    let html = '<div class="card-wrapper">';
    html += '<div class="header-accent"></div>';
    html += '<div class="content-section">';
    
    if (data.user_image_url) {
      html += `<img src="${data.user_image_url}" alt="${name}" class="profile-image">`;
    } else if (data.first_name) {
      html += `<div class="initials">${getInitials(data.first_name, data.last_name)}</div>`;
    }
    
    html += `<div class="user-name">${name}</div>`;
    if (data.designation) html += `<div class="designation">${data.designation}</div>`;
    if (data.company) html += `<div class="company">${data.company}</div>`;
    
    html += '<div class="divider"></div>';
    
    if (data.summary) html += `<div class="summary">"${data.summary}"</div>`;
    
    // Contact grid
    html += '<div class="contact-grid">';
    
    if (data.phone_v2?.[0]?.value) {
      html += `
        <a href="tel:${data.phone_v2[0].value}" class="contact-item">
          <div class="contact-icon"><i class="fas fa-phone"></i></div>
          <div class="contact-text">Call Me</div>
        </a>
      `;
    }
    
    if (data.email_v2?.[0]?.value) {
      html += `
        <a href="mailto:${data.email_v2[0].value}" class="contact-item">
          <div class="contact-icon"><i class="fas fa-envelope"></i></div>
          <div class="contact-text">Email Me</div>
        </a>
      `;
    }
    
    if (data.website_v2?.[0]?.value) {
      html += `
        <a href="${data.website_v2[0].value}" target="_blank" class="contact-item">
          <div class="contact-icon"><i class="fas fa-globe"></i></div>
          <div class="contact-text">Visit Website</div>
        </a>
      `;
    }
    
    if (data.social_links?.linkedin) {
      html += `
        <a href="${data.social_links.linkedin}" target="_blank" class="contact-item">
          <div class="contact-icon"><i class="fab fa-linkedin-in"></i></div>
          <div class="contact-text">Connect</div>
        </a>
      `;
    }
    
    html += '</div>';
    
    // Social links
    const socialLinks = data.social_links || {};
    const hasSocial = Object.values(socialLinks).some(link => link);
    
    if (hasSocial) {
      html += '<div class="social-section">';
      html += '<div class="social-title">Follow Me</div>';
      html += this.renderSocialLinks();
      html += '</div>';
    }
    
    html += '</div></div>';
    
    return html;
  }

  renderSocialLinks() {
    const socialLinks = this._cardData?.social_links || {};
    const socialIcons = {
      linkedin: 'fab fa-linkedin-in', twitter: 'fab fa-twitter', facebook: 'fab fa-facebook-f',
      instagram: 'fab fa-instagram', github: 'fab fa-github', youtube: 'fab fa-youtube',
      tiktok: 'fab fa-tiktok', snapchat: 'fab fa-snapchat-ghost'
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

customElements.define('uniqode-layout-11', CardLayout11);
