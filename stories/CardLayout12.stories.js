import '../src/components/premium/card-layout-12/CardLayout12.js';

export default {
  title: 'Card Templates/Layout 12',
  tags: ['autodocs'],
  argTypes: {
    // ==================== PLATFORM CONFIG ====================
    platform: {
      control: { type: 'select' },
      options: ['server', 'mobile', 'dashboard'],
      description: 'Target platform rendering mode',
      table: { category: '🔧 Config' }
    },
    clicks_disabled: {
      control: 'boolean',
      description: 'Disable all click interactions',
      table: { category: '🔧 Config' }
    },

    // ==================== PERSONAL INFO (snake_case) ====================
    first_name: { control: 'text', table: { category: '👤 Personal' } },
    last_name: { control: 'text', table: { category: '👤 Personal' } },
    pronouns_v2: { control: 'text', table: { category: '👤 Personal' } },
    designation: { control: 'text', table: { category: '👤 Personal' } },
    company: { control: 'text', table: { category: '👤 Personal' } },
    summary: { control: 'text', table: { category: '👤 Personal' } },

    // ==================== IMAGES (snake_case) ====================
    user_image_url: { control: 'text', table: { category: '🖼️ Images' } },
    cover_image_url: { control: 'text', table: { category: '🖼️ Images' } },

    // ==================== CONTACT INFO ====================
    phone: { control: 'text', description: 'Phone number', table: { category: '📞 Contact' } },
    email: { control: 'text', description: 'Email address', table: { category: '📞 Contact' } },
    website: { control: 'text', description: 'Website URL', table: { category: '📞 Contact' } },
    address_v2: { control: 'text', description: 'Full address', table: { category: '📞 Contact' } },

    // ==================== SOCIAL LINKS ====================
    facebook: { control: 'text', table: { category: '🔗 Social' } },
    instagram: { control: 'text', table: { category: '🔗 Social' } },
    twitter: { control: 'text', table: { category: '🔗 Social' } },
    linkedin: { control: 'text', table: { category: '🔗 Social' } },

    // ==================== COLORS (snake_case to match schema) ====================
    background_color: { control: 'color', table: { category: '🎨 Colors' } },
    button_color: { control: 'color', table: { category: '🎨 Colors' } },
    icon_color: { control: 'color', table: { category: '🎨 Colors' } },
    secondary_color: { control: 'color', table: { category: '🎨 Colors' } },
    user_info_color: { control: 'color', table: { category: '🎨 Colors' } },

    // ==================== TYPOGRAPHY COLORS (snake_case) ====================
    personal_info_font_color: { control: 'color', description: 'Name color', table: { category: '✍️ Typography Colors' } },
    company_details_font_color: { control: 'color', description: 'Designation color', table: { category: '✍️ Typography Colors' } },
    bio_font_color: { control: 'color', description: 'Bio color', table: { category: '✍️ Typography Colors' } },
    contact_details_font_color: { control: 'color', description: 'Contact color', table: { category: '✍️ Typography Colors' } },

    // ==================== TYPOGRAPHY SETTINGS (snake_case) ====================
    font_family: {
      control: { type: 'select' },
      options: ['Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Poppins'],
      table: { category: '✍️ Typography' }
    },
    personal_info_font_size: { control: { type: 'range', min: 16, max: 48, step: 1 }, table: { category: '✍️ Typography' } },
    company_details_font_size: { control: { type: 'range', min: 12, max: 32, step: 1 }, table: { category: '✍️ Typography' } },
    bio_font_size: { control: { type: 'range', min: 12, max: 24, step: 1 }, table: { category: '✍️ Typography' } },

    // ==================== MULTILINGUAL (snake_case) ====================
    include_multilingual: { control: 'boolean', table: { category: '🌍 Multilingual' } },
    default_language: {
      control: { type: 'select' },
      options: ['en', 'fr', 'es', 'de'],
      table: { category: '🌍 Multilingual' }
    }
  }
};

/**
 * Create card data from Storybook args
 */
function createCardData(args) {
  const cardData = {
    // Personal Info (snake_case matches library schema, NO fallbacks for debugging)
    first_name: args.first_name,
    last_name: args.last_name,
    pronouns_v2: args.pronouns_v2,
    designation: args.designation,
    company: args.company,
    summary: args.summary,
    
    // Contact Info (v2 arrays with proper structure)
    phone_v2: args.phone ? [{ 
      label: 'Work', 
      valid: 'valid', 
      value: args.phone 
    }] : [],
    
    email_v2: args.email ? [{ 
      label: 'Work', 
      valid: 'valid', 
      value: args.email 
    }] : [],
    
    website_v2: args.website ? [{ 
      label: 'Company', 
      valid: 'valid', 
      value: args.website 
    }] : [],
    
    address_v2: args.address_v2,
    
    // Contact ordering (default)
    contact_info_ordering: {
      "0": "phone_v2",
      "1": "email_v2",
      "2": "website_v2",
      "3": "custom_fields"
    },
    
    // Images (snake_case, NO fallbacks)
    user_image_url: args.user_image_url,
    cover_image_url: args.cover_image_url,
    logo_url: '',
    logo_size: 80,
    
    // Social Links (NO fallbacks)
    social_links: {
      facebook: args.facebook,
      instagram: args.instagram,
      twitter: args.twitter,
      linkedin: args.linkedin,
      youtube: '',
      tiktok: '',
      whatsapp: '',
      telegram: '',
      snapchat: '',
      pinterest: '',
      github: '',
      vimeo: '',
      yelp: '',
      paypal: '',
      venmo: '',
      cashapp: '',
      calendly: '',
      shopify: '',
      dribbble: '',
      behance: '',
      twitch: '',
      wistia: '',
      discord: '',
      custom_url: ''
    },
    
    // Social ordering (for platforms that have URLs)
    social_links_ordering: {
      "0": "facebook",
      "1": "instagram",
      "2": "twitter",
      "3": "linkedin"
    },
    
    // Customizations (ONLY official properties from schema, NO fallbacks)
    customizations: {
      // Core colors (snake_case)
      background_color: args.background_color,
      button_color: args.button_color,
      icon_color: args.icon_color,
      secondary_color: args.secondary_color,
      user_info_color: args.user_info_color,
      
      // Typography settings
      font_type: 'google',
      font_style: args.font_family,
      title_font_size: args.personal_info_font_size,
      custom_font_url: '',
      custom_font_style: '',
      profile_info: 'Semi Bold',
      company_details: 'Regular',
      contact_details: 'Medium',
      button: 'Regular',
      
      // Typography object (detailed settings, NO fallbacks)
      typography: {
        font_type: 'google',
        font_family: args.font_family,
        
        personal_info: {
          google_font_size: args.personal_info_font_size,
          google_font_style: 'Semi Bold',
          google_font_colour: args.personal_info_font_color
        },
        
        company_details: {
          google_font_size: args.company_details_font_size,
          google_font_style: 'Regular',
          google_font_colour: args.company_details_font_color
        },
        
        contact_details: {
          google_font_size: 14,
          google_font_style: 'Medium',
          google_font_colour: args.contact_details_font_color
        },
        
        bio: {
          google_font_size: args.bio_font_size,
          google_font_style: 'Regular',
          google_font_colour: args.bio_font_color
        },
        
        button: {
          google_font_size: 20,
          google_font_style: 'Regular',
          google_font_colour: '#ffffff'
        }
      },
      
      // Background
      background: {
        type: 'color',
        value: '#ffffff'
      }
    },
    
    // Layout configuration
    layoutConfig: getPlatformConfig(args.platform),
  };
  
  // Add multilingual support if enabled
  if (args.include_multilingual) {
    cardData.default_language = args.default_language;
    cardData.language_data = {
      fr: {
        first_name: 'Olivie',
        last_name: 'Baxter',
        designation: 'Designer Fondatrice',
        company: 'Schoen & Co.',
        summary: "Je dirige la conception dans plusieurs équipes pour Schoen & Co. et ses filiales.",
        pronouns_v2: 'elle',
        phone_v2: args.phone ? [{ label: 'Travail', valid: 'valid', value: args.phone }] : [],
        email_v2: args.email ? [{ label: 'Travail', valid: 'valid', value: args.email }] : [],
        website_v2: args.website ? [{ label: 'Entreprise', valid: 'valid', value: args.website }] : [],
        address_v2: args.address || '',
        social_links: cardData.social_links,
        contact_info_ordering: cardData.contact_info_ordering
      },
      es: {
        first_name: 'Olivia',
        last_name: 'Baxter',
        designation: 'Diseñadora Fundadora',
        company: 'Schoen & Co.',
        summary: "Dirijo el diseño en varios equipos para Schoen & Co. y sus subsidiarias.",
        pronouns_v2: 'ella',
        phone_v2: args.phone ? [{ label: 'Trabajo', valid: 'valid', value: args.phone }] : [],
        email_v2: args.email ? [{ label: 'Trabajo', valid: 'valid', value: args.email }] : [],
        website_v2: args.website ? [{ label: 'Empresa', valid: 'valid', value: args.website }] : [],
        address_v2: args.address || '',
        social_links: cardData.social_links,
        contact_info_ordering: cardData.contact_info_ordering
      }
    };
  }
  
  return cardData;
}

/**
 * Get platform-specific config
 */
function getPlatformConfig(platform) {
  const configs = {
    server: {
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      minHeight: '100vh',
      centered: true,
      heroHeight: '361px'
    },
    mobile: {
      width: '100%',
      maxWidth: 'none',
      height: '100%',
      minHeight: 'auto',
      centered: false,
      fullWidth: true,
      heroHeight: '240px'
    },
    dashboard: {
      width: '100%',
      maxWidth: 'none',
      height: '100%',
      minHeight: 'auto',
      centered: false,
      heroHeight: '280px'
    }
  };
  return configs[platform] || configs.server;
}

/**
 * Main Playground Story - Reactive to args changes
 */
export const Playground = (args, { id }) => {
  const container = document.createElement('div');
  container.style.cssText = `
    padding: 20px;
    background: #f5f5f5;
    min-height: 100vh;
  `;
  
  // Platform wrapper
  const wrapper = document.createElement('div');
  wrapper.style.cssText = args.platform === 'mobile' 
    ? 'width: 375px; height: 667px; margin: 0 auto; border: 2px solid #ccc; border-radius: 20px; overflow: hidden; background: #000;'
    : args.platform === 'dashboard'
    ? 'width: 400px; height: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);'
    : 'min-height: 100vh; background: #ffffff; display: flex; justify-content: center; align-items: flex-start;';
  
  // Create card
  const card = document.createElement('uniqode-layout-12');
  card.id = 'card';
  card.style.cssText = args.platform === 'server' 
    ? 'max-width: 450px; width: 100%; min-height: 100vh;'
    : 'width: 100%; height: 100%;';
  
  wrapper.appendChild(card);
  container.appendChild(wrapper);
  
  // Set initial data after mounting
  setTimeout(() => {
    card.cardData = createCardData(args);
    card.config = {
      ...getPlatformConfig(args.platform),
      clicksDisabled: args.clicks_disabled,
      showLanguageDropdown: args.include_multilingual ? 'auto' : false,
      leadCollection: false,
      hideFooter: true
    };
    
    // Event listeners (attach once)
    card.addEventListener('contact-click', (e) => console.log('📞 Contact clicked:', e.detail));
    card.addEventListener('social-click', (e) => console.log('🔗 Social clicked:', e.detail));
    card.addEventListener('language-change', (e) => console.log('🌍 Language changed:', e.detail));
    
    // Make story reactive: Poll for args changes and update card
    let lastArgs = JSON.stringify(args);
    const updateInterval = setInterval(() => {
      const currentArgs = JSON.stringify(args);
      if (currentArgs !== lastArgs) {
        lastArgs = currentArgs;
        
        // Update card data
        card.cardData = createCardData(args);
        
        // Update config if platform or flags changed
        card.config = {
          ...getPlatformConfig(args.platform),
          clicksDisabled: args.clicks_disabled,
          showLanguageDropdown: args.include_multilingual ? 'auto' : false,
          leadCollection: false,
          hideFooter: true
        };
      }
    }, 100);
    
    // Cleanup on story unmount
    const cleanup = () => clearInterval(updateInterval);
    window.addEventListener('beforeunload', cleanup);
  }, 0);
  
  return container;
};

Playground.args = {
  // Platform
  platform: 'server',
  clicks_disabled: false,
  
  // Personal Info (snake_case to match library schema)
  first_name: 'Olivia',
  last_name: 'Baxter',
  pronouns_v2: 'she/her',
  designation: 'Founding Designer',
  company: 'Schoen & Co.',
  summary: "I lead design across teams for Schoen & Co. and it's subsidiaries.",
  
  // Images
  user_image_url: 'https://www.alucoildesign.com/assets/pages/media/profile/profile_user.jpg',
  cover_image_url: 'https://www.alucoildesign.com/assets/pages/media/profile/profile_user.jpg',
  
  // Contact
  phone: '+1 91139 74687',
  email: 'olivia@schoen.com',
  website: 'https://schoen.com',
  address_v2: '922 East Portertown, West Virginia 82571',
  
  // Social
  facebook: 'https://facebook.com/oliviabaxter',
  instagram: 'https://instagram.com/oliviabaxter',
  twitter: 'https://twitter.com/oliviabaxter',
  linkedin: 'https://linkedin.com/in/oliviabaxter',
  
  // Colors (snake_case to match Customizations schema)
  background_color: '#F0EFED',
  button_color: '#203D99',
  icon_color: '#000000',
  secondary_color: '#F1C98E',
  user_info_color: '#203D99',
  
  // Typography Colors
  personal_info_font_color: '#203D99',
  company_details_font_color: '#203D99',
  bio_font_color: '#203D99',
  contact_details_font_color: '#203D99',
  
  // Typography Settings
  font_family: 'Roboto',
  personal_info_font_size: 24,
  company_details_font_size: 20,
  bio_font_size: 16,
  
  // Multilingual
  include_multilingual: false,
  default_language: 'en'
};

/**
 * Simple Card Preview
 */
export const SimpleCard = () => {
  const container = document.createElement('div');
  container.style.cssText = `
    width: 100%;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
    padding: 20px;
  `;
  
  const card = document.createElement('uniqode-layout-12');
  card.style.cssText = 'max-width: 450px; width: 100%; min-height: 100vh;';
  container.appendChild(card);
  
  setTimeout(() => {
    card.cardData = createCardData({
      // Personal
      firstName: 'Olivia',
      lastName: 'Baxter',
      pronouns: 'she/her',
      designation: 'Founding Designer',
      company: 'Schoen & Co.',
      summary: "I lead design across teams for Schoen & Co. and it's subsidiaries.",
      
      // Contact
      phone: '+1 91139 74687',
      email: 'olivia@schoen.com',
      website: 'https://schoen.com',
      address: '922 East Portertown, West Virginia 82571',
      
      // Images
      profileImage: 'https://www.alucoildesign.com/assets/pages/media/profile/profile_user.jpg',
      coverImage: 'https://www.alucoildesign.com/assets/pages/media/profile/profile_user.jpg',
      
      // Social
      facebook: 'https://facebook.com/oliviabaxter',
      instagram: 'https://instagram.com/oliviabaxter',
      twitter: 'https://twitter.com/oliviabaxter',
      linkedin: 'https://linkedin.com/in/oliviabaxter',
      
      // Colors
      cardBackground: '#F0EFED',
      buttonColor: '#203D99',
      iconColor: '#000000',
      secondaryColor: '#F1C98E',
      userInfoColor: '#203D99',
      
      // Typography Colors
      personalInfoFontColor: '#203D99',
      companyDetailsFontColor: '#203D99',
      bioFontColor: '#203D99',
      contactDetailsFontColor: '#203D99',
      
      // Typography Settings
      fontFamily: 'Roboto',
      personalInfoFontSize: 24,
      companyDetailsFontSize: 20,
      bioFontSize: 16,
      
      // Platform
      platform: 'server',
      
      // Multilingual
      includeMultilingual: false
    });
    
    card.config = {
      width: '100%',
      maxWidth: '500px',
      height: 'auto',
      minHeight: '100vh',
      centered: true,
      heroHeight: '361px',
      clicksDisabled: false,
      leadCollection: false,
      hideFooter: true
    };
  }, 0);
  
  return container;
};

SimpleCard.parameters = {
  docs: { description: { story: 'A simple card with default settings.' } }
};
