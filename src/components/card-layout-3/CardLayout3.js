import { BaseCard } from '../base/BaseCard.js';

/**
 * Uniqode Card Layout 3 - Default Section-Based Card Layout
 * Exact replica of layout3-template.ts (defaultTemplateHtml) implementation
 * 
 * Features:
 * - Header with logo and profile info
 * - Large circular action buttons for phone, email, address
 * - Section-based contact information with box shadows
 * - Social media icons grid
 */
export class CardLayout3 extends BaseCard {
  constructor() {
    super();
    this.shadowRoot.innerHTML = this.getTemplate();
  }
  
  render() {
    this.shadowRoot.innerHTML = this.getTemplate();
  }
  
  static get layoutId() {
    return 'layout-3';
  }

  getTemplate() {
    const data = this._cardData || {};
    const customizations = data.customizations || {};
    
    // Build full name exactly like original
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
    
    const bgColor = customizations.background_color || '#007bff';
    const iconColor = customizations.icon_color || '#007bff';
    const buttonColor = customizations.button_color || '#007bff';
    const fontStyle = customizations.font_style || 'Work Sans, sans-serif';
    
    // Box shadow colors for sections
    const bioBoxShadowColor = this.getBoxShadowColor('bio');
    const contactBoxShadowColor = this.getBoxShadowColor('contact_details');
    
    // Process contact info
    const contactInfoList = this.processContactInfoList();
    
    return `
      <style>
        :host {
          display: block;
          font-family: 'Lucida Grande', 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
          background: white;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .content {
          word-break: break-word;
          max-width: 500px;
          margin: auto;
          min-height: calc(100vh - 42px);
          margin-bottom: 30px;
        }
        
        .logo_image_container {
          padding-top: 24px;
          padding-left: 22px;
          height: 40px;
        }
        
        .logo_image_container img {
          max-height: 40px;
          max-width: 150px;
        }
        
        .header-section {
          background-color: ${bgColor};
          padding-bottom: 70px;
          padding-left: 2px;
          padding-right: 2px;
        }
        
        .user_info {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          padding: 20px 0;
        }
        
        .user_image {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          object-fit: cover;
        }
        
        .initials_container {
          background-color: white;
          width: 130px;
          height: 130px;
          border-radius: 50%;
        }
        
        .initials_styles {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 44px;
          height: 100%;
        }
        
        .initials_custom_styles {
          background-color: ${this.hexToRGBA(bgColor, 0.2)};
          color: ${bgColor};
          font-family: ${fontStyle};
        }
        
        .user_name {
          color: #fff;
          margin-bottom: 2px;
          margin-top: 11px;
          font-weight: 500;
          text-align: center;
          word-break: break-word;
          font-size: 24px;
        }
        
        .pronunciation {
          font-style: italic;
          font-weight: 400;
          opacity: 0.7;
          padding-left: 5px;
        }
        
        .user_designation {
          color: #fff;
          margin-top: 6px;
          margin-bottom: 0px;
          font-weight: 300;
          text-align: center;
          word-break: break-word;
          white-space: pre-line;
          font-size: 16px;
        }
        
        .company-info {
          color: #fff;
          margin-top: 3px;
          text-align: center;
          word-break: break-word;
          font-size: 16px;
        }
        
        .button_container {
          display: flex;
          justify-content: center;
          position: relative;
          top: -35px;
          border: none;
          gap: 1rem;
        }
        
        .button_image {
          height: 70px;
          width: 72px;
          border-radius: 50%;
          display: inline-block;
          margin: 0;
          padding: 0;
          background: white;
          cursor: pointer;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.08);
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
        }
        
        .button_image:hover {
          transform: translateY(-2px);
          box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.12);
        }
        
        .content-container-child {
          padding-left: 15px;
          padding-right: 15px;
          padding-bottom: 80px;
        }
        
        .summary_container {
          display: flex;
          align-items: center;
          position: relative;
          top: -50px;
          border: none;
          box-shadow: 0 2px 0 ${bioBoxShadowColor};
          margin-bottom: -50px;
        }
        
        .summary {
          font-size: 18px;
          color: #3b3b3b;
          margin: 0;
          padding: 15px;
          white-space: pre-line;
          word-break: break-word;
        }
        
        .section_container {
          padding-bottom: 15px;
          box-shadow: 0 2px 0 ${contactBoxShadowColor};
          line-height: 1.5;
        }
        
        .section_container:last-child {
          box-shadow: none;
        }
        
        .title {
          line-height: 1%;
          font-weight: 400 !important;
          margin: 0;
          padding-top: 30px;
          padding-bottom: 15px;
          opacity: 0.5;
          font-size: 16px;
        }
        
        .contact_paragraph {
          color: #3b3b3b;
          font-size: 18px;
          margin-bottom: 10px;
          margin-top: 0px;
          padding-top: 15px;
        }
        
        .titleColor {
          font-size: 14px;
          color: #74637B;
          margin: 0;
          padding-bottom: 0;
          opacity: 0.5;
        }
        
        .address-section {
          padding-bottom: 15px;
          box-shadow: 0 2px 0 ${contactBoxShadowColor};
        }
        
        .paragraph {
          font-size: 18px;
          color: #3b3b3b;
          margin: 0;
          padding: 0;
          line-height: 21px;
          word-break: break-word;
          text-wrap: auto;
        }
        
        .button_icon_container {
          display: grid;
          grid-template-columns: auto auto auto auto;
          padding: 0px 15px;
          justify-content: center;
          background-color: transparent;
        }
        
        .grid-item {
          margin-left: auto;
          margin-right: auto;
          background-color: transparent;
        }
        
        .social_logo {
          text-decoration: none;
          margin: 10px;
          cursor: pointer;
          object-fit: cover;
          width: 75%;
          max-height: 75%;
        }
        
        #leadModalBtn {
          width: calc(100% - 30px);
          height: 60px;
          margin: 30px 15px;
          border: 2px solid ${buttonColor};
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .button {
          color: ${buttonColor};
        }
        
        .flex-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      </style>
      
      <div class="content">
        <div class="header-section">
          ${data.logo_url ? `<div class="logo_image_container"><img src="${data.logo_url}" /></div>` : '<div style="height: 40px; padding-top: 24px;"></div>'}
          
          <div class="user_info">
            ${this.renderProfileImage()}
            
            <div class="user_name">
              ${name}
              ${data.pronouns_v2 ? `<span class="pronunciation">(${data.pronouns_v2})</span>` : ''}
            </div>
            
            ${data.designation ? `<div class="user_designation">${data.designation}</div>` : ''}
            
            ${this.renderCompanyInfo()}
          </div>
        </div>
        
        ${this.renderActionButtons()}
        
        <div class="content-container-child">
          ${this.renderSummarySection()}
          ${this.renderContactSections()}
          ${this.renderAddressSection()}
        </div>
        
        ${this.renderSocialLinks()}
        
        ${this.renderLeadButton()}
      </div>
    `;
  }
  
  renderProfileImage() {
    const data = this._cardData || {};
    
    if (data.user_image_url) {
      return `<img src="${data.user_image_url}" class="user_image" />`;
    } else if (data.first_name) {
      return `
        <div class="user_image initials_container">
          <div class="initials_styles initials_custom_styles">${this.getInitials()}</div>
        </div>
      `;
    } else {
      return `<img src="https://d3nvy39jvu7woe.cloudfront.net/static/images/vcard_plus/default_vcard_image.png" class="user_image" />`;
    }
  }
  
  renderCompanyInfo() {
    const data = this._cardData || {};
    
    if (data.company && data.department) {
      return `<div class="company-info">${data.department} • ${data.company}</div>`;
    } else if (data.company) {
      return `<div class="company-info">${data.company}</div>`;
    } else if (data.department) {
      return `<div class="company-info">${data.department}</div>`;
    }
    
    return '';
  }
  
  processContactInfoList() {
    const data = this._cardData || {};
    const contactList = [];
    
    // Phone numbers
    if (data.phone_v2 && Array.isArray(data.phone_v2)) {
      contactList.push({
        key: 'PHONE_V2',
        value: data.phone_v2.filter(phone => phone.value && phone.value.trim())
      });
    }
    
    // Emails
    if (data.email_v2 && Array.isArray(data.email_v2)) {
      contactList.push({
        key: 'EMAIL_V2', 
        value: data.email_v2.filter(email => email.value && email.value.trim())
      });
    }
    
    // Websites
    if (data.website_v2 && Array.isArray(data.website_v2)) {
      contactList.push({
        key: 'WEBSITE_V2',
        value: data.website_v2.filter(website => website.value && website.value.trim())
      });
    }
    
    // Custom fields
    if (data.custom_fields && Array.isArray(data.custom_fields)) {
      contactList.push({
        key: 'CUSTOM_FIELDS',
        value: data.custom_fields.filter(field => field.value && field.value.trim())
      });
    }
    
    return contactList;
  }
  
  renderActionButtons() {
    const data = this._cardData || {};
    const customizations = data.customizations || {};
    const iconColor = customizations.icon_color || '#007bff';
    let html = '<div class="button_container">';
    
    // Phone button
    if (data.phone_v2 && data.phone_v2.length > 0 && data.phone_v2[0].value && data.phone_v2[0].value.trim()) {
      html += `
        <div class="button_image" onclick="window.open('tel:${data.phone_v2[0].value}', '_self')">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.4296 16.1327L17.0546 14.2577C16.8677 14.178 16.6599 14.1612 16.4627 14.2098C16.2654 14.2585 16.0893 14.3698 15.9608 14.5272L14.0233 16.8944C10.9825 15.4607 8.53535 13.0136 7.10165 9.97283L9.46888 8.0353C9.62657 7.90704 9.73818 7.73091 9.78681 7.53355C9.83545 7.33619 9.81846 7.12837 9.73842 6.94153L7.86338 2.56645C7.77554 2.36505 7.62016 2.2006 7.42406 2.10148C7.22796 2.00236 7.00341 1.97477 6.78915 2.02347L2.72658 2.96099C2.52 3.00869 2.33569 3.12501 2.20373 3.29095C2.07177 3.45689 1.99995 3.66266 2 3.87468C2 13.8944 10.1212 22 20.1253 22C20.3374 22.0001 20.5433 21.9284 20.7093 21.7964C20.8753 21.6644 20.9917 21.4801 21.0394 21.2734L21.9769 17.2108C22.0253 16.9955 21.9971 16.7701 21.8972 16.5733C21.7973 16.3765 21.632 16.2207 21.4296 16.1327Z" fill="${iconColor}"/>
          </svg>
        </div>
      `;
    }
    
    // Email button
    if (data.email_v2 && data.email_v2.length > 0 && data.email_v2[0].value && data.email_v2[0].value.trim()) {
      html += `
        <div class="button_image" onclick="window.open('mailto:${data.email_v2[0].value}', '_self')">
          <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.6211 9.45312C21.7734 9.33203 22 9.44531 22 9.63672V17.625C22 18.6602 21.1602 19.5 20.125 19.5H3.875C2.83984 19.5 2 18.6602 2 17.625V9.64062C2 9.44531 2.22266 9.33594 2.37891 9.45703C3.25391 10.1367 4.41406 11 8.39844 13.8945C9.22266 14.4961 10.6133 15.7617 12 15.7539C13.3945 15.7656 14.8125 14.4727 15.6055 13.8945C19.5898 11 20.7461 10.1328 21.6211 9.45312ZM12 14.5C12.9062 14.5156 14.2109 13.3594 14.8672 12.8828C20.0508 9.12109 20.4453 8.79297 21.6406 7.85547C21.8672 7.67969 22 7.40625 22 7.11719V6.375C22 5.33984 21.1602 4.5 20.125 4.5H3.875C2.83984 4.5 2 5.33984 2 6.375V7.11719C2 7.40625 2.13281 7.67578 2.35938 7.85547C3.55469 8.78906 3.94922 9.12109 9.13281 12.8828C9.78906 13.3594 11.0938 14.5156 12 14.5Z" fill="${iconColor}"/>
          </svg>
        </div>
      `;
    }
    
    // Address button
    if (data.address_v2 && data.address_v2.trim()) {
      const encodedAddress = encodeURIComponent(data.address_v2);
      html += `
        <div class="button_image" onclick="window.open('https://maps.google.com/?q=${encodedAddress}', '_blank')">
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M35.255 50.1102C33.7244 47.8914 32.4213 46.035 31.3125 44.4554C29.3256 41.625 27.9626 39.6834 27.0328 38.1373C26.3147 36.9434 25.874 36.0146 25.6094 35.1211C25.3459 34.2315 25.25 33.3527 25.25 32.25C25.25 26.3129 30.0629 21.5 36 21.5C41.9371 21.5 46.75 26.3129 46.75 32.25C46.75 33.3527 46.6541 34.2315 46.3906 35.1211C46.126 36.0146 45.6852 36.9434 44.9672 38.1373C44.0374 39.6834 42.6744 41.625 40.6875 44.4554C39.5787 46.035 38.2756 47.8913 36.7451 50.1101C36.3852 50.6299 35.6148 50.6299 35.255 50.1102ZM36 37.4375C38.865 37.4375 41.1875 35.115 41.1875 32.25C41.1875 29.385 38.865 27.0625 36 27.0625C33.135 27.0625 30.8125 29.385 30.8125 32.25C30.8125 35.115 33.135 37.4375 36 37.4375Z" fill="${iconColor}"/>
          </svg>
        </div>
      `;
    }
    
    html += '</div>';
    return html;
  }
  
  renderSummarySection() {
    const data = this._cardData || {};
    
    if (!data.summary) return '';
    
    return `
      <div class="summary_container">
        <p class="summary">${data.summary}</p>
      </div>
    `;
  }
  
  renderContactSections() {
    const contactList = this.processContactInfoList();
    let html = '';
    
    contactList.forEach(contact => {
      let tempCode = '';
      if (contact.value.length > 0) {
        switch (contact.key) {
          case 'PHONE_V2':
            contact.value.forEach(item => {
              if (item.label) {
                tempCode += `<p class="title titleColor">${item.label.charAt(0).toUpperCase() + item.label.slice(1)}</p>`;
              }
              tempCode += `<p class="contact_paragraph">${item.value}</p><div style="margin: -20px"></div>`;
            });
            if (tempCode.length) {
              html += `<div class="section_container">${tempCode}</div>`;
            }
            break;
            
          case 'EMAIL_V2':
            contact.value.forEach(item => {
              if (item.label) {
                tempCode += `<p class="title titleColor">${item.label.charAt(0).toUpperCase() + item.label.slice(1)}</p>`;
              }
              tempCode += `<p class="contact_paragraph">${item.value}</p><div style="margin: -20px"></div>`;
            });
            if (tempCode.length) {
              html += `<div class="section_container">${tempCode}</div>`;
            }
            break;
            
          case 'WEBSITE_V2':
            contact.value.forEach(item => {
              if (item.label) {
                tempCode += `<p class="title titleColor">${item.label.charAt(0).toUpperCase() + item.label.slice(1)}</p>`;
              }
              tempCode += `<p class="contact_paragraph" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${item.value}</p><div style="margin: -20px"></div>`;
            });
            if (tempCode.length) {
              html += `<div class="section_container">${tempCode}</div>`;
            }
            break;
            
          case 'CUSTOM_FIELDS':
            contact.value.forEach(item => {
              if (item.label) {
                tempCode += `<p class="title titleColor" style="line-height: 1; margin-top: -7px; margin-bottom: -7px;">${item.label}</p>`;
              }
              tempCode += `<p class="contact_paragraph">${item.value}</p><div style="margin: -30px"></div>`;
            });
            if (tempCode.length) {
              html += `<div class="section_container" style="line-height: 1.5; padding-bottom: 25px;">${tempCode}</div>`;
            }
            break;
        }
      }
    });
    
    return html;
  }
  
  renderAddressSection() {
    const data = this._cardData || {};
    
    if (!data.address_v2 || !data.address_v2.trim()) return '';
    
    const tempAddress = data.address_v2.replace(/ +\n/g, '\n').replace(/\n +/g, '\n').trim();
    
    return `
      <div class="address-section">
        <p class="title titleColor">Address</p>
        <div style="line-height: 1.5">
          <pre class="paragraph">${tempAddress}</pre>
        </div>
      </div>
    `;
  }
  
  renderSocialLinks() {
    const data = this._cardData || {};
    const socialLinks = data.social_links || {};
    
    // Check if we have any social links
    const hasSocialLinks = Object.values(socialLinks).some(link => link && link.trim());
    if (!hasSocialLinks) return '';
    
    let html = '<div class="button_icon_container">';
    
    const socialPlatforms = [
      'facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'snapchat',
      'whatsapp', 'telegram', 'youtube', 'pinterest', 'github', 'behance'
    ];
    
    socialPlatforms.forEach(platform => {
      if (socialLinks[platform] && socialLinks[platform].trim()) {
        html += `
          <a class="grid-item" onclick="window.open('${socialLinks[platform]}', '_blank')">
            <img src="https://d3nvy39jvu7woe.cloudfront.net/static/images/vcard_plus/social_link_icons/${platform}_icon.png" 
                 class="social_logo" alt="${platform}" />
          </a>
        `;
      }
    });
    
    html += '</div>';
    return html;
  }
  
  renderLeadButton() {
    const data = this._cardData || {};
    
    if (!data.lead_collection || data.__show_new_sticky_btn__) return '';
    
    return `
      <div id="leadModalBtn" onclick="this.getRootNode().host.handleLeadCollect()">
        <div class="flex-center button">Share your contact</div>
      </div>
    `;
  }
  
  // Helper methods
  getBoxShadowColor(attribute) {
    const data = this._cardData || {};
    const typography = data.customizations?.typography;
    
    if (!typography) return 'rgba(0, 0, 0, 0.1)';
    
    if (typography.font_type === 'custom' && typography[attribute]?.custom_font_colour) {
      return this.hexToRGBA(typography[attribute].custom_font_colour, 0.1);
    }
    
    if (typography.font_type === 'google' && typography[attribute]?.google_font_colour) {
      return this.hexToRGBA(typography[attribute].google_font_colour, 0.1);
    }
    
    return 'rgba(0, 0, 0, 0.1)';
  }
  
  hexToRGBA(hex, opacity) {
    if (!hex) return `rgba(0, 123, 255, ${opacity})`;
    
    hex = hex.trim();
    if (!/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      return hex;
    }
    
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (result) {
      const r = parseInt(result[1], 16);
      const g = parseInt(result[2], 16);
      const b = parseInt(result[3], 16);
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    
    return hex;
  }
  
  // Event handlers
  handleLeadCollect() {
    this.dispatchEvent(new CustomEvent('lead-collect', {
      detail: { action: 'lead-collect', cardData: this._cardData },
      bubbles: true
    }));
  }
}

// Register the Web Component
customElements.define('uniqode-layout-3', CardLayout3);

export default CardLayout3;