import { BaseCard } from '../base/BaseCard.js';
import { getInitials } from '../../shared/utils/initials.js';
import { hexToRGBA, getContrastColor } from '../../shared/utils/colors.js';

/**
 * Comprehensive Card Layout - Shows ALL possible data points
 * This is the ultimate card design that displays every field available
 */
export class CardLayoutComprehensive extends BaseCard {
  constructor() {
    super();
    // Initialize with template
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  render() {
    // Update the shadow root with new content
    this.shadowRoot.innerHTML = this.getTemplate();
  }

  getTemplate() {
    const data = this.cardData || {};
    const customizations = data.customizations || {};
    
    // Get colors with fallbacks
    const bgColor = customizations.background_color || '#ffffff';
    const textColor = customizations.user_info_color || '#333333';
    const secondaryColor = customizations.secondary_color || '#666666';
    const buttonColor = customizations.button_color || '#007bff';
    const iconColor = customizations.icon_color || '#007bff';
    
    // Typography settings
    const typography = customizations.typography || {};
    const fontFamily = typography.font_family || 'Inter, system-ui, sans-serif';
    
    return `
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        :host {
          display: block;
          width: 100%;
          max-width: 400px;
          margin: 0 auto;
          font-family: ${fontFamily};
          background: ${bgColor};
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          color: ${textColor};
        }
        
        .card-container {
          padding: 24px;
          background: linear-gradient(135deg, ${bgColor} 0%, ${hexToRGBA(bgColor, 0.9)} 100%);
          position: relative;
        }
        
        /* Header Section */
        .header-section {
          text-align: center;
          margin-bottom: 24px;
          position: relative;
        }
        
        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid ${buttonColor};
          margin: 0 auto 16px;
          display: block;
        }
        
        .initials-circle {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: ${buttonColor};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          font-weight: bold;
          color: ${getContrastColor(buttonColor)};
          margin: 0 auto 16px;
          border: 4px solid ${hexToRGBA(buttonColor, 0.3)};
        }
        
        .name-section {
          margin-bottom: 8px;
        }
        
        .full-name {
          font-size: 28px;
          font-weight: bold;
          color: ${textColor};
          margin-bottom: 4px;
          line-height: 1.2;
        }
        
        .pronouns {
          font-size: 14px;
          color: ${secondaryColor};
          font-style: italic;
        }
        
        .title-section {
          margin-bottom: 16px;
        }
        
        .designation {
          font-size: 18px;
          font-weight: 600;
          color: ${buttonColor};
          margin-bottom: 4px;
        }
        
        .company {
          font-size: 16px;
          color: ${secondaryColor};
          margin-bottom: 4px;
        }
        
        .department {
          font-size: 14px;
          color: ${secondaryColor};
          font-style: italic;
        }
        
        /* Summary Section */
        .summary-section {
          margin-bottom: 24px;
          text-align: center;
        }
        
        .summary {
          font-size: 14px;
          line-height: 1.5;
          color: ${secondaryColor};
          background: ${hexToRGBA(buttonColor, 0.1)};
          padding: 12px;
          border-radius: 8px;
          border-left: 4px solid ${buttonColor};
        }
        
        /* Contact Information */
        .contact-section {
          margin-bottom: 24px;
        }
        
        .section-title {
          font-size: 16px;
          font-weight: bold;
          color: ${textColor};
          margin-bottom: 12px;
          padding-bottom: 4px;
          border-bottom: 2px solid ${buttonColor};
        }
        
        .contact-grid {
          display: grid;
          gap: 12px;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          border-radius: 6px;
          background: ${hexToRGBA(buttonColor, 0.05)};
          transition: all 0.2s ease;
        }
        
        .contact-item:hover {
          background: ${hexToRGBA(buttonColor, 0.1)};
          transform: translateX(4px);
        }
        
        .contact-icon {
          width: 20px;
          height: 20px;
          color: ${iconColor};
          flex-shrink: 0;
        }
        
        .contact-info {
          flex: 1;
        }
        
        .contact-label {
          font-size: 12px;
          color: ${secondaryColor};
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        
        .contact-value {
          font-size: 14px;
          color: ${textColor};
          font-weight: 500;
          word-break: break-all;
        }
        
        /* Address Section */
        .address-section {
          margin-bottom: 24px;
        }
        
        .address-content {
          background: ${hexToRGBA(buttonColor, 0.05)};
          padding: 12px;
          border-radius: 8px;
          border-left: 4px solid ${buttonColor};
        }
        
        .address-line {
          font-size: 14px;
          color: ${textColor};
          margin-bottom: 4px;
        }
        
        /* Social Links */
        .social-section {
          margin-bottom: 24px;
        }
        
        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(40px, 1fr));
          gap: 8px;
          max-width: 300px;
          margin: 0 auto;
        }
        
        .social-link {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${buttonColor};
          display: flex;
          align-items: center;
          justify-content: center;
          color: ${getContrastColor(buttonColor)};
          text-decoration: none;
          font-size: 18px;
          transition: all 0.2s ease;
          position: relative;
        }
        
        .social-link:hover {
          transform: scale(1.1);
          box-shadow: 0 4px 12px ${hexToRGBA(buttonColor, 0.3)};
        }
        
        .social-link::after {
          content: attr(data-platform);
          position: absolute;
          bottom: -24px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          color: ${secondaryColor};
          white-space: nowrap;
          opacity: 0;
          transition: opacity 0.2s ease;
        }
        
        .social-link:hover::after {
          opacity: 1;
        }
        
        /* Custom Fields */
        .custom-fields-section {
          margin-bottom: 24px;
        }
        
        .custom-field {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          background: ${hexToRGBA(buttonColor, 0.05)};
          border-radius: 6px;
          margin-bottom: 8px;
        }
        
        .custom-field-label {
          font-size: 12px;
          color: ${secondaryColor};
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .custom-field-value {
          font-size: 14px;
          color: ${textColor};
          font-weight: 500;
        }
        
        /* Action Buttons */
        .actions-section {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-top: 24px;
        }
        
        .action-button {
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .primary-button {
          background: ${buttonColor};
          color: ${getContrastColor(buttonColor)};
        }
        
        .secondary-button {
          background: transparent;
          color: ${buttonColor};
          border: 2px solid ${buttonColor};
        }
        
        .action-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px ${hexToRGBA(buttonColor, 0.3)};
        }
        
        /* Company Logo */
        .company-logo {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 40px;
          height: 40px;
          object-fit: contain;
          border-radius: 4px;
        }
        
        /* Responsive Design */
        @media (max-width: 480px) {
          .card-container {
            padding: 16px;
          }
          
          .profile-image,
          .initials-circle {
            width: 100px;
            height: 100px;
          }
          
          .initials-circle {
            font-size: 40px;
          }
          
          .full-name {
            font-size: 24px;
          }
          
          .social-grid {
            grid-template-columns: repeat(auto-fit, minmax(35px, 1fr));
          }
          
          .social-link {
            width: 35px;
            height: 35px;
            font-size: 16px;
          }
        }
      </style>
      
      <div class="card-container">
        ${this.renderCompanyLogo(data)}
        ${this.renderHeader(data)}
        ${this.renderSummary(data)}
        ${this.renderContactInfo(data)}
        ${this.renderAddress(data)}
        ${this.renderSocialLinks(data)}
        ${this.renderCustomFields(data)}
        ${this.renderActions(data)}
      </div>
    `;
  }
  
  renderCompanyLogo(data) {
    if (!data.logo_url) return '';
    return `<img src="${data.logo_url}" alt="Company Logo" class="company-logo">`;
  }
  
  renderHeader(data) {
    const fullName = `${data.prefix || ''} ${data.first_name || 'John'} ${data.last_name || 'Doe'} ${data.suffix || ''}`.trim();
    const initials = getInitials(data.first_name || 'John', data.last_name || 'Doe');
    
    return `
      <div class="header-section">
        ${data.user_image_url 
          ? `<img src="${data.user_image_url}" alt="Profile" class="profile-image">` 
          : `<div class="initials-circle">${initials}</div>`
        }
        
        <div class="name-section">
          <div class="full-name">${fullName}</div>
          ${data.pronouns_v2 ? `<div class="pronouns">(${data.pronouns_v2})</div>` : ''}
        </div>
        
        <div class="title-section">
          ${data.designation ? `<div class="designation">${data.designation}</div>` : ''}
          ${data.company ? `<div class="company">${data.company}</div>` : ''}
          ${data.department ? `<div class="department">${data.department}</div>` : ''}
        </div>
      </div>
    `;
  }
  
  renderSummary(data) {
    if (!data.summary) return '';
    return `
      <div class="summary-section">
        <div class="summary">${data.summary}</div>
      </div>
    `;
  }
  
  renderContactInfo(data) {
    const contacts = [];
    
    // Phone numbers (v2)
    if (data.phone_v2 && data.phone_v2.length > 0) {
      data.phone_v2.forEach(phone => {
        if (phone.value) {
          contacts.push({
            icon: '📱',
            label: phone.label || 'Phone',
            value: phone.value,
            href: `tel:${phone.value}`
          });
        }
      });
    }
    
    // Emails (v2)
    if (data.email_v2 && data.email_v2.length > 0) {
      data.email_v2.forEach(email => {
        if (email.value) {
          contacts.push({
            icon: '✉️',
            label: email.label || 'Email',
            value: email.value,
            href: `mailto:${email.value}`
          });
        }
      });
    }
    
    // Websites (v2)
    if (data.website_v2 && data.website_v2.length > 0) {
      data.website_v2.forEach(website => {
        if (website.value) {
          contacts.push({
            icon: '🌐',
            label: website.label || 'Website',
            value: website.value,
            href: website.value.startsWith('http') ? website.value : `https://${website.value}`
          });
        }
      });
    }
    
    // Legacy phone
    if (data.phone?.mobile) {
      contacts.push({
        icon: '📱',
        label: 'Mobile',
        value: data.phone.mobile,
        href: `tel:${data.phone.mobile}`
      });
    }
    
    if (data.phone?.work) {
      contacts.push({
        icon: '☎️',
        label: 'Work',
        value: data.phone.work,
        href: `tel:${data.phone.work}`
      });
    }
    
    // Legacy email
    if (data.email) {
      contacts.push({
        icon: '✉️',
        label: 'Email',
        value: data.email,
        href: `mailto:${data.email}`
      });
    }
    
    // Legacy website
    if (data.website) {
      contacts.push({
        icon: '🌐',
        label: 'Website',
        value: data.website,
        href: data.website.startsWith('http') ? data.website : `https://${data.website}`
      });
    }
    
    if (contacts.length === 0) return '';
    
    return `
      <div class="contact-section">
        <div class="section-title">Contact Information</div>
        <div class="contact-grid">
          ${contacts.map(contact => `
            <a href="${contact.href}" class="contact-item">
              <div class="contact-icon">${contact.icon}</div>
              <div class="contact-info">
                <div class="contact-label">${contact.label}</div>
                <div class="contact-value">${contact.value}</div>
              </div>
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  renderAddress(data) {
    const addressParts = [];
    
    if (data.address_v2) {
      addressParts.push(data.address_v2);
    } else {
      // Legacy address fields
      if (data.address_line1) addressParts.push(data.address_line1);
      if (data.address_line2) addressParts.push(data.address_line2);
      
      const cityStateZip = [data.city, data.address_state, data.zip].filter(Boolean).join(', ');
      if (cityStateZip) addressParts.push(cityStateZip);
      
      if (data.country) addressParts.push(data.country);
    }
    
    if (addressParts.length === 0) return '';
    
    const addressUrl = data.address_url || `https://maps.google.com/?q=${encodeURIComponent(addressParts.join(', '))}`;
    
    return `
      <div class="address-section">
        <div class="section-title">📍 Address</div>
        <a href="${addressUrl}" target="_blank" class="address-content">
          ${addressParts.map(part => `<div class="address-line">${part}</div>`).join('')}
        </a>
      </div>
    `;
  }
  
  renderSocialLinks(data) {
    if (!data.social_links) return '';
    
    const socialPlatforms = [
      { key: 'linkedin', icon: '💼', name: 'LinkedIn' },
      { key: 'twitter', icon: '🐦', name: 'Twitter' },
      { key: 'facebook', icon: '📘', name: 'Facebook' },
      { key: 'instagram', icon: '📷', name: 'Instagram' },
      { key: 'youtube', icon: '📺', name: 'YouTube' },
      { key: 'github', icon: '💻', name: 'GitHub' },
      { key: 'dribbble', icon: '🎨', name: 'Dribbble' },
      { key: 'behance', icon: '🎭', name: 'Behance' },
      { key: 'tiktok', icon: '🎵', name: 'TikTok' },
      { key: 'snapchat', icon: '👻', name: 'Snapchat' },
      { key: 'whatsapp', icon: '💬', name: 'WhatsApp' },
      { key: 'telegram', icon: '✈️', name: 'Telegram' },
      { key: 'discord', icon: '🎮', name: 'Discord' },
      { key: 'twitch', icon: '🎮', name: 'Twitch' },
      { key: 'pinterest', icon: '📌', name: 'Pinterest' },
      { key: 'vimeo', icon: '📹', name: 'Vimeo' },
      { key: 'wistia', icon: '🎬', name: 'Wistia' },
      { key: 'yelp', icon: '⭐', name: 'Yelp' },
      { key: 'paypal', icon: '💰', name: 'PayPal' },
      { key: 'venmo', icon: '💸', name: 'Venmo' },
      { key: 'cashapp', icon: '💵', name: 'CashApp' },
      { key: 'calendly', icon: '📅', name: 'Calendly' },
      { key: 'shopify', icon: '🛍️', name: 'Shopify' }
    ];
    
    const activeSocials = socialPlatforms.filter(platform => 
      data.social_links[platform.key] && data.social_links[platform.key].trim()
    );
    
    if (data.social_links.custom_url) {
      activeSocials.push({
        key: 'custom_url',
        icon: '🔗',
        name: 'Link',
        url: data.social_links.custom_url
      });
    }
    
    if (activeSocials.length === 0) return '';
    
    return `
      <div class="social-section">
        <div class="section-title">🌐 Social Links</div>
        <div class="social-grid">
          ${activeSocials.map(social => `
            <a href="${social.url || data.social_links[social.key]}" 
               target="_blank" 
               class="social-link" 
               data-platform="${social.name}">
              ${social.icon}
            </a>
          `).join('')}
        </div>
      </div>
    `;
  }
  
  renderCustomFields(data) {
    if (!data.custom_fields || data.custom_fields.length === 0) return '';
    
    return `
      <div class="custom-fields-section">
        <div class="section-title">📋 Additional Information</div>
        ${data.custom_fields.map(field => `
          <div class="custom-field">
            <div class="custom-field-label">${field.label || 'Custom Field'}</div>
            <div class="custom-field-value">${field.value || ''}</div>
          </div>
        `).join('')}
      </div>
    `;
  }
  
  renderActions(data) {
    return `
      <div class="actions-section">
        <button class="action-button primary-button" onclick="this.getRootNode().host.handleShare()">
          📤 Share Card
        </button>
        <button class="action-button secondary-button" onclick="this.getRootNode().host.handleSaveContact()">
          💾 Save Contact
        </button>
      </div>
    `;
  }
  
  handleShare() {
    this.dispatchEvent(new CustomEvent('card-share', {
      detail: { action: 'share', cardData: this.cardData },
      bubbles: true
    }));
  }
  
  handleSaveContact() {
    this.dispatchEvent(new CustomEvent('contact-save', {
      detail: { action: 'save-contact', cardData: this.cardData },
      bubbles: true
    }));
  }
  
}

// Register the Web Component
customElements.define('uniqode-layout-comprehensive', CardLayoutComprehensive);

export default CardLayoutComprehensive;
