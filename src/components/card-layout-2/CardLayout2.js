import { BaseCard } from '../base/BaseCard.js';

/**
 * Uniqode Card Layout 2 - Header Background Card Layout
 * Exact replica of layout2-template.ts implementation
 * 
 * Features:
 * - Header background with logo
 * - Profile image positioned over header/main boundary
 * - Clean main container with rounded top corners
 * - Contact information with icons
 * - Social media links
 */
export class CardLayout2 extends BaseCard {
  constructor() {
    super();
    this.shadowRoot.innerHTML = this.getTemplate();
  }
  
  render() {
    this.shadowRoot.innerHTML = this.getTemplate();
  }
  
  static get layoutId() {
    return 'layout-2';
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
    
    // Typography
    const typography = customizations.typography || {};
    const designationFontSize = this.getDesignationFontSize(typography);
    const addToContactIconColor = this.getAddToContactIconColor(typography);
    
    // Process contact info
    const contactInfoList = this.processContactInfoList();
    
    return `
      <style>
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        :host {
          display: block;
          font-family: ${fontStyle};
          background: white;
          width: 100%;
          max-width: 500px;
          margin: 0 auto;
          overflow: hidden;
        }
        
        .content {
          overflow: hidden;
        }
        
        .top-container {
          height: 11rem;
          background-color: ${bgColor};
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 30px;
        }
        
        .logo {
          height: 50px;
          max-height: 3rem;
          width: auto;
        }
        
        .main_container {
          border-radius: 10px 10px 0px 0px;
          margin-top: -10px;
          background: white;
          margin-bottom: 30px;
        }
        
        .profile {
          width: 116px;
          height: 116px;
          position: relative;
          top: -58px;
          margin: 0 auto;
          border-radius: 6px;
          border: 2px solid rgba(255, 255, 255, 1);
          box-shadow: 0px 2px 8px rgba(0.5058823823928833, 0.5176470875740051, 0.5333333611488342, 0.15000000596046448);
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }
        
        .user-image {
          width: 118px;
          height: 118px;
          object-fit: cover;
        }
        
        .initials_container {
          background-color: white;
          width: 118px;
          height: 118px;
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
        
        .flex-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .flex-column {
          flex-direction: column;
        }
        
        .user-name-container {
          margin-top: -2rem;
          width: 100%;
        }
        
        .pl-4 {
          padding-left: 4px;
        }
        
        .user-name {
          font-weight: 600;
          font-size: 25px;
          line-height: 1;
          word-break: break-word;
          text-align: center;
          margin-bottom: 0;
          margin-top: 0;
        }
        
        .pronunciation {
          font-style: italic;
          font-weight: 400;
          opacity: 0.7;
        }
        
        .user-designation {
          text-align: center;
          opacity: 0.7;
          margin-top: 5px;
          margin-bottom: 0;
          white-space: pre-line;
        }
        
        .company {
          font-size: 20px;
          opacity: 1;
          margin-top: 5px;
        }
        
        .mt-5 {
          margin-top: 5px;
        }
        
        .mb-0 {
          margin-bottom: 0;
        }
        
        .summary-container {
          position: relative;
          display: flex;
          justify-content: center;
        }
        
        .summary {
          font-weight: 400;
          font-size: 16px;
          text-align: center;
          color: #1d2535;
          padding: 0px 26px;
          white-space: pre-line;
          word-break: break-word;
        }
        
        .contacts-container {
          margin: 2rem 40px 100px 40px;
        }
        
        .d-flex {
          display: flex;
        }
        
        .my-20 {
          margin: 20px 0;
        }
        
        .word-break {
          word-break: break-all;
        }
        
        .align-items-center {
          align-items: center;
        }
        
        .pl-12 {
          padding-left: 12px;
        }
        
        .svg-container {
          height: 45px;
          width: 45px;
          border-radius: 6px;
          border: 1px solid #e5e5e5;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .secondary_data {
          font-size: 16px;
          color: #1d2535;
        }
        
        .sub-title {
          margin-top: 1px;
          margin-bottom: 1px;
          font-weight: 400;
        }
        
        .secondary_data_label {
          opacity: 0.5;
        }
        
        .grid-layout {
          display: grid;
          margin-top: 10px;
          grid-template-columns: auto auto auto auto;
          justify-content: center;
        }
        
        .grid-item {
          padding: 0px 10px;
        }
        
        .social-logo {
          height: 3rem;
          cursor: pointer;
        }
        
        .btn-container {
          width: calc(100% - 80px);
          margin: 0 40px;
          background-color: ${buttonColor};
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 16px 0px;
          border-radius: 10px;
          cursor: pointer;
          border: none;
        }
        
        .btn-contact {
          color: ${addToContactIconColor};
          font-size: 18px;
          font-weight: 600;
          margin-left: 8px;
        }
        
        #leadModalBtn {
          width: calc(100% - 80px);
          height: 60px;
          margin: 30px 40px;
          border-radius: 10px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          border: 2px solid ${buttonColor};
          background: transparent;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        
        .button {
          color: ${buttonColor};
        }
      </style>
      
      <div class="content">
        <div class="top-container d-flex flex-column">
          <div class="flex-center">
            ${data.logo_url ? `<img src="${data.logo_url}" class="logo" />` : ''}
          </div>
        </div>
        
        <div class="main_container">
          <div class="profile flex-center">
            ${this.renderProfileImage()}
          </div>
          
          <div class="flex-center user-name-container flex-column">
            <div class="flex-center pl-4">
              <p class="user-name mb-0 mt-0">
                ${name}
                ${data.pronouns_v2 ? `<span class="pronunciation">&nbsp;(${data.pronouns_v2})</span>` : ''}
              </p>
            </div>
            
            ${data.designation ? `<p class="user-designation mt-5 mb-0" style="font-size: ${designationFontSize}">${data.designation}</p>` : ''}
            
            ${this.renderCompanyInfo()}
          </div>
          
          ${data.summary ? `
            <div class="flex-center summary-container">
              <p class="summary">${data.summary}</p>
            </div>
          ` : ''}
          
          <div class="flex-center flex-column mt-5">
            ${this.renderSocialLinks()}
            
            <div class="contacts-container">
              ${this.renderContactInfo()}
            </div>
            
            ${this.renderActionButtons()}
          </div>
        </div>
      </div>
    `;
  }
  
  renderProfileImage() {
    const data = this._cardData || {};
    
    if (data.user_image_url) {
      return `<img src="${data.user_image_url}" class="user-image" />`;
    } else if (data.first_name) {
      return `
        <div class="user-image initials_container">
          <div class="initials_styles initials_custom_styles">${this.getInitials()}</div>
        </div>
      `;
    } else {
      return `<img src="https://d3nvy39jvu7woe.cloudfront.net/static/images/vcard_plus/profile_square.png" class="user-image" />`;
    }
  }
  
  renderCompanyInfo() {
    const data = this._cardData || {};
    
    if (data.company && data.department) {
      return `<p class="user-designation company mt-5 opacity-1">${data.department}<span> • </span>${data.company}</p>`;
    } else if (data.company) {
      return `<p class="user-designation company mt-5 mb-0 opacity-1">${data.company}</p>`;
    } else if (data.department) {
      return `<p class="user-designation company mt-5 opacity-1">${data.department}</p>`;
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
  
  renderContactInfo() {
    const data = this._cardData || {};
    const customizations = data.customizations || {};
    const iconColor = customizations.icon_color || '#007bff';
    const contactList = this.processContactInfoList();
    let html = '';
    
    contactList.forEach(contact => {
      if (contact.value.length > 0) {
        switch (contact.key) {
          case 'PHONE_V2':
            contact.value.forEach(phone => {
              html += `
                <div class="d-flex my-20 word-break">
                  <div class="flex-center">
                    <div class="svg-container d-flex flex-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.1492 4.44035C12.9909 4.60425 13.7644 5.01511 14.3708 5.62033C14.9772 6.22556 15.3888 6.99761 15.5531 7.83769M12.1492 1C13.8979 1.19389 15.5286 1.97549 16.7735 3.21645C18.0184 4.45741 18.8035 6.08398 19 7.82909M18.1383 14.6926V17.2728C18.1392 17.5124 18.0901 17.7495 17.9939 17.969C17.8978 18.1884 17.7568 18.3854 17.5799 18.5474C17.4031 18.7093 17.1943 18.8326 16.967 18.9093C16.7396 18.9861 16.4987 19.0146 16.2597 18.993C13.608 18.7054 11.0608 17.8011 8.82292 16.3526C6.74082 15.032 4.97557 13.2701 3.65252 11.192C2.19617 8.94824 1.28985 6.3936 1.00699 3.73508C0.98546 3.49723 1.01378 3.25752 1.09015 3.0312C1.16652 2.80488 1.28927 2.59691 1.45059 2.42054C1.6119 2.24416 1.80824 2.10324 2.02711 2.00675C2.24598 1.91026 2.48258 1.86031 2.72185 1.86009H5.30705C5.72525 1.85598 6.13069 2.00379 6.44778 2.27597C6.76487 2.54815 6.97198 2.92612 7.03051 3.33944C7.13963 4.16518 7.34199 4.97595 7.63373 5.75628C7.74967 6.06413 7.77476 6.39869 7.70603 6.72034C7.63731 7.04198 7.47764 7.33722 7.24595 7.57106L6.15155 8.66337C7.37827 10.8166 9.16456 12.5995 11.322 13.8239L12.4164 12.7316C12.6506 12.5003 12.9465 12.341 13.2687 12.2724C13.591 12.2038 13.9262 12.2288 14.2346 12.3445C15.0164 12.6357 15.8288 12.8377 16.6561 12.9466C17.0747 13.0055 17.457 13.216 17.7303 13.5379C18.0035 13.8598 18.1488 14.2708 18.1383 14.6926Z" stroke="${iconColor}" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div class="pl-12 d-flex align-items-center">
                    <div class="d-flex flex-column">
                      <a class="secondary_data">${phone.value}</a>
                      ${phone.label ? `<p class="sub-title mt-5 secondary_data_label">${phone.label.charAt(0).toUpperCase() + phone.label.slice(1)}</p>` : ''}
                    </div>
                  </div>
                </div>
              `;
            });
            break;
            
          case 'EMAIL_V2':
            contact.value.forEach(email => {
              html += `
                <div class="d-flex my-20 word-break">
                  <div class="flex-center">
                    <div class="svg-container d-flex flex-center">
                      <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2.8 1H17.2C18.19 1 19 1.7875 19 2.75V13.25C19 14.2125 18.19 15 17.2 15H2.8C1.81 15 1 14.2125 1 13.25V2.75C1 1.7875 1.81 1 2.8 1Z" stroke="${iconColor}" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M19 3L10 9L1 3" stroke="${iconColor}" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div class="pl-12 d-flex align-items-center">
                    <div class="d-flex flex-column">
                      <a class="secondary_data">${email.value}</a>
                      ${email.label ? `<p class="sub-title mt-5 secondary_data_label">${email.label.charAt(0).toUpperCase() + email.label.slice(1)}</p>` : ''}
                    </div>
                  </div>
                </div>
              `;
            });
            break;
            
          case 'WEBSITE_V2':
            contact.value.forEach(website => {
              html += `
                <div class="d-flex my-20 word-break">
                  <div class="flex-center">
                    <div class="svg-container d-flex flex-center">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 19C14.9706 19 19 14.9706 19 10C19 5.02944 14.9706 1 10 1C5.02944 1 1 5.02944 1 10C1 14.9706 5.02944 19 10 19Z" stroke="${iconColor}" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M1 10H19" stroke="${iconColor}" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.0004 1C12.2515 3.46452 13.5309 6.66283 13.6004 10C13.5309 13.3372 12.2515 16.5355 10.0004 19C7.74924 16.5355 6.46991 13.3372 6.40039 10C6.46991 6.66283 7.74924 3.46452 10.0004 1V1Z" stroke="${iconColor}" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div class="pl-12 d-flex align-items-center">
                    <div class="d-flex flex-column">
                      <a class="secondary_data">${website.value}</a>
                      ${website.label ? `<p class="sub-title mt-5 secondary_data_label">${website.label.charAt(0).toUpperCase() + website.label.slice(1)}</p>` : ''}
                    </div>
                  </div>
                </div>
              `;
            });
            break;
            
          case 'CUSTOM_FIELDS':
            contact.value.forEach(field => {
              html += `
                <div class="d-flex my-20 word-break">
                  <div class="flex-center">
                    <div class="svg-container">
                      <svg style="padding-top: 9px;" width="30" height="32" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.03125 18.5714H9.8125V12.9286H9.03125C8.59977 12.9286 8.25 12.5788 8.25 12.1473V10.2812C8.25 9.84977 8.59977 9.5 9.03125 9.5H13.4062C13.8377 9.5 14.1875 9.84977 14.1875 10.2812V18.5714H14.9688C15.4002 18.5714 15.75 18.9212 15.75 19.3527V21.2188C15.75 21.6502 15.4002 22 14.9688 22H9.03125C8.59977 22 8.25 21.6502 8.25 21.2188V19.3527C8.25 18.9212 8.59977 18.5714 9.03125 18.5714ZM12 2C10.4467 2 9.1875 3.25918 9.1875 4.8125C9.1875 6.36582 10.4467 7.625 12 7.625C13.5533 7.625 14.8125 6.36582 14.8125 4.8125C14.8125 3.25918 13.5533 2 12 2Z" stroke="${iconColor}" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <div class="pl-12 d-flex align-items-center">
                    <div style="padding-top: 3px" class="d-flex flex-column">
                      <a class="secondary_data">${field.value}</a>
                      ${field.label ? `<p class="sub-title mt-5 secondary_data_label">${field.label}</p>` : ''}
                    </div>
                  </div>
                </div>
              `;
            });
            break;
        }
      }
    });
    
    // Address
    if (data.address_v2 && data.address_v2.trim()) {
      const tempAddress = data.address_v2.replace(/ +\n/g, '\n').replace(/\n +/g, '\n').trim();
      html += `
        <div class="d-flex my-20 word-break">
          <div class="flex-center">
            <div class="svg-container d-flex flex-center">
              <svg width="19" height="23" viewBox="0 0 19 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.1818 9.59091C18.1818 16.2727 9.59091 22 9.59091 22C9.59091 22 1 16.2727 1 9.59091C1 7.31246 1.90511 5.12733 3.51622 3.51622C5.12733 1.90511 7.31246 1 9.59091 1C11.8694 1 14.0545 1.90511 15.6656 3.51622C17.2767 5.12733 18.1818 7.31246 18.1818 9.59091Z" stroke="${iconColor}" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9.59118 12.4548C11.1727 12.4548 12.4548 11.1727 12.4548 9.59118C12.4548 8.00963 11.1727 6.72754 9.59118 6.72754C8.00963 6.72754 6.72754 8.00963 6.72754 9.59118C6.72754 11.1727 8.00963 12.4548 9.59118 12.4548Z" stroke="${iconColor}" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
          <div class="pl-12">
            <span style="word-break: break-word;" class="secondary_data">${tempAddress}</span>
            <p class="sub-title mt-5 secondary_data_label">Address</p>
          </div>
        </div>
      `;
    }
    
    return html;
  }
  
  renderSocialLinks() {
    const data = this._cardData || {};
    const socialLinks = data.social_links || {};
    
    // Check if we have any social links
    const hasSocialLinks = Object.values(socialLinks).some(link => link && link.trim());
    if (!hasSocialLinks) return '';
    
    let html = '<div class="grid-layout">';
    
    const socialPlatforms = [
      'facebook', 'instagram', 'twitter', 'linkedin', 'tiktok', 'snapchat',
      'whatsapp', 'telegram', 'youtube', 'pinterest', 'github', 'behance'
    ];
    
    socialPlatforms.forEach(platform => {
      if (socialLinks[platform] && socialLinks[platform].trim()) {
        html += `
          <a class="grid-item" onclick="window.open('${socialLinks[platform]}', '_blank')">
            <img src="https://d3nvy39jvu7woe.cloudfront.net/static/images/vcard_plus/social_link_icons/${platform}_icon.png" 
                 class="social-logo" alt="${platform}" />
          </a>
        `;
      }
    });
    
    html += '</div>';
    return html;
  }
  
  renderActionButtons() {
    const data = this._cardData || {};
    const customizations = data.customizations || {};
    const buttonColor = customizations.button_color || '#007bff';
    let html = '';
    
    // Lead collection button
    if (data.lead_collection && !data.__show_new_sticky_btn__) {
      html += `
        <div id="leadModalBtn" onclick="this.getRootNode().host.handleLeadCollect()">
          <div class="flex-center button">Share your contact</div>
        </div>
      `;
    }
    
    // Add to contacts button
    if (!data.__show_new_sticky_btn__) {
      const addToContactIconColor = this.getAddToContactIconColor(customizations.typography);
      html += `
        <div class="btn-container flex-center" onclick="this.getRootNode().host.handleSaveContact()">
          <div class="flex-center">
            <svg width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 19C15.5 19.2761 15.7239 19.5 16 19.5C16.2761 19.5 16.5 19.2761 16.5 19H15.5ZM16 17H16.5H16ZM12 13V12.5V13ZM5 13L5 12.5L5 13ZM1 17H0.5H1ZM0.5 19C0.5 19.2761 0.723858 19.5 1 19.5C1.27614 19.5 1.5 19.2761 1.5 19H0.5ZM20.5 6C20.5 5.72386 20.2761 5.5 20 5.5C19.7239 5.5 19.5 5.72386 19.5 6H20.5ZM19.5 12C19.5 12.2761 19.7239 12.5 20 12.5C20.2761 12.5 20.5 12.2761 20.5 12H19.5ZM23 9.5C23.2761 9.5 23.5 9.27614 23.5 9C23.5 8.72386 23.2761 8.5 23 8.5V9.5ZM17 8.5C16.7239 8.5 16.5 8.72386 16.5 9C16.5 9.27614 16.7239 9.5 17 9.5V8.5ZM16.5 19V17H15.5V19H16.5ZM16.5 17C16.5 15.8065 16.0259 14.6619 15.182 13.818L14.4749 14.5251C15.1313 15.1815 15.5 16.0717 15.5 17H16.5ZM15.182 13.818C14.3381 12.9741 13.1935 12.5 12 12.5L12 13.5C12.9283 13.5 13.8185 13.8687 14.4749 14.5251L15.182 13.818ZM12 12.5H5V13.5H12V12.5ZM5 12.5C3.80653 12.5 2.66193 12.9741 1.81802 13.818L2.52513 14.5251C3.1815 13.8687 4.07174 13.5 5 13.5L5 12.5ZM1.81802 13.818C0.974106 14.6619 0.5 15.8065 0.5 17H1.5C1.5 16.0717 1.86875 15.1815 2.52513 14.5251L1.81802 13.818ZM0.5 17V19H1.5V17H0.5ZM12 5C12 6.933 10.433 8.5 8.5 8.5V9.5C10.9853 9.5 13 7.48528 13 5H12ZM8.5 8.5C6.567 8.5 5 6.933 5 5H4C4 7.48528 6.01472 9.5 8.5 9.5V8.5ZM5 5C5 3.067 6.567 1.5 8.5 1.5V0.5C6.01472 0.5 4 2.51472 4 5H5ZM8.5 1.5C10.433 1.5 12 3.067 12 5H13C13 2.51472 10.9853 0.5 8.5 0.5V1.5ZM19.5 6V12H20.5V6H19.5ZM23 8.5H17V9.5H23V8.5Z" fill="${addToContactIconColor}" />
            </svg>
            <a class="pl-4 btn-contact">Add to Contacts</a>
          </div>
        </div>
      `;
    }
    
    return html;
  }
  
  // Helper methods
  getDesignationFontSize(typography) {
    if (typography && typography.company_details && typography.company_details.google_font_size) {
      return `${typography.company_details.google_font_size}px`;
    }
    return '16px';
  }
  
  getAddToContactIconColor(typography) {
    if (typography && typography.button && typography.button.google_font_colour) {
      return typography.button.google_font_colour;
    }
    return 'white';
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
  
  handleSaveContact() {
    this.dispatchEvent(new CustomEvent('contact-save', {
      detail: { action: 'save-contact', cardData: this._cardData },
      bubbles: true
    }));
  }
}

// Register the Web Component
customElements.define('uniqode-layout-2', CardLayout2);

export default CardLayout2;