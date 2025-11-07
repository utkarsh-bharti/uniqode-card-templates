// Comprehensive Card Layout Story with ALL data points

// Complete sample data with every possible field
const comprehensiveCardData = {
  // Basic Information
  id: 12345,
  first_name: 'Alexandra',
  last_name: 'Rodriguez-Chen',
  prefix: 'Dr.',
  suffix: 'PhD, MBA',
  pronouns_v2: 'she/her',
  designation: 'Chief Technology Officer',
  company: 'InnovateTech Solutions',
  department: 'Engineering & Innovation',
  summary: 'Passionate technology leader with 15+ years of experience driving digital transformation and innovation in Fortune 500 companies. Expert in AI, machine learning, and scalable cloud architectures.',
  
  // Profile Images
  user_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
  logo_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop',
  
  // Contact Information (v2 - New format)
  phone_v2: [
    { value: '+1 (555) 123-4567', label: 'Mobile' },
    { value: '+1 (555) 987-6543', label: 'Work' },
    { value: '+1 (555) 555-0123', label: 'Direct' }
  ],
  email_v2: [
    { value: 'alexandra.rodriguez@innovatetech.com', label: 'Work' },
    { value: 'alex.chen@gmail.com', label: 'Personal' },
    { value: 'cto@innovatetech.com', label: 'Executive' }
  ],
  website_v2: [
    { value: 'https://alexandra-rodriguez.dev', label: 'Portfolio' },
    { value: 'https://innovatetech.com', label: 'Company' },
    { value: 'https://techblog.alexandra.com', label: 'Blog' }
  ],
  
  // Legacy Contact Information (for backward compatibility)
  phone: {
    mobile: '+1 (555) 123-4567',
    work: '+1 (555) 987-6543',
    home: '+1 (555) 111-2222'
  },
  email: 'alexandra.rodriguez@innovatetech.com',
  website: 'https://alexandra-rodriguez.dev',
  
  // Address Information
  address_v2: '1234 Innovation Drive, Suite 500, San Francisco, CA 94105, United States',
  address_line1: '1234 Innovation Drive',
  address_line2: 'Suite 500',
  city: 'San Francisco',
  address_state: 'California',
  zip: '94105',
  country: 'United States',
  address_url: 'https://maps.google.com/?q=1234+Innovation+Drive,+San+Francisco,+CA+94105',
  
  // Social Media Links (ALL platforms)
  social_links: {
    linkedin: 'https://linkedin.com/in/alexandra-rodriguez-cto',
    twitter: 'https://twitter.com/alextech_cto',
    facebook: 'https://facebook.com/alexandra.rodriguez.tech',
    instagram: 'https://instagram.com/alexandra_codes',
    youtube: 'https://youtube.com/@TechLeadershipTalks',
    github: 'https://github.com/alexandra-rodriguez',
    dribbble: 'https://dribbble.com/alexandra-design',
    behance: 'https://behance.net/alexandra-creative',
    tiktok: 'https://tiktok.com/@techtips_alex',
    snapchat: 'https://snapchat.com/add/alex_tech_snap',
    whatsapp: '+15551234567',
    telegram: 'https://t.me/alexandra_tech',
    discord: 'alexandra_tech#1234',
    twitch: 'https://twitch.tv/alexandra_codes',
    pinterest: 'https://pinterest.com/alexandra_tech_pins',
    vimeo: 'https://vimeo.com/alexandra_tech',
    wistia: 'https://alexandra.wistia.com',
    yelp: 'https://yelp.com/biz/innovatetech-solutions',
    paypal: 'https://paypal.me/alexandrarodriguez',
    venmo: '@alexandra-rodriguez-tech',
    cashapp: '$AlexandraTech',
    calendly: 'https://calendly.com/alexandra-rodriguez/30min',
    shopify: 'https://alexandra-tech-store.myshopify.com',
    custom_url: 'https://alexandra-rodriguez.com/links'
  },
  
  // Custom Fields
  custom_fields: [
    { label: 'Employee ID', value: 'EMP-2024-001' },
    { label: 'Office Location', value: 'San Francisco HQ' },
    { label: 'Time Zone', value: 'PST (UTC-8)' },
    { label: 'Languages', value: 'English, Spanish, Mandarin' },
    { label: 'Certifications', value: 'AWS Solutions Architect, PMP' },
    { label: 'Availability', value: 'Mon-Fri 9AM-6PM PST' },
    { label: 'Team Size', value: '150+ Engineers' },
    { label: 'Years at Company', value: '5 years' }
  ],
  
  // Customizations (Design & Typography)
  customizations: {
    background_color: '#1a1a2e',
    user_info_color: '#ffffff',
    secondary_color: '#cccccc',
    button_color: '#0f4c75',
    icon_color: '#3282b8',
    font_style: 'Inter',
    title_font_size: 28,
    font_type: 'google',
    profile_info: 'Bold',
    company_details: 'Medium',
    contact_details: 'Regular',
    button: 'Bold',
    typography: {
      font_type: 'google',
      font_family: 'Inter',
      personal_info: {
        google_font_style: 'Bold',
        google_font_colour: '#ffffff',
        google_font_size: 24,
      },
      company_details: {
        google_font_style: 'Medium',
        google_font_colour: '#cccccc',
        google_font_size: 16,
      },
      contact_details: {
        google_font_style: 'Regular',
        google_font_colour: '#ffffff',
        google_font_size: 14,
      },
      button: {
        google_font_style: 'Bold',
        google_font_colour: '#ffffff',
        google_font_size: 16,
      },
      bio: {
        google_font_style: 'Regular',
        google_font_colour: '#cccccc',
        google_font_size: 14,
      }
    },
    background: {
      type: 'color',
      value: '#1a1a2e'
    }
  },
  
  // Additional Business Data
  layout: '1',
  organization: 12345,
  maintainer: 67890,
  slug: 'alexandra-rodriguez-cto',
  views: 1250,
  saves: 89,
  tags: ['CTO', 'Technology', 'AI', 'Innovation', 'Leadership'],
  
  // Lead Collection Settings
  lead_collection: true,
  lead_attribute: {
    phone: true,
    designation: true,
    notes: true,
    company: true,
    connection: 'SHARE_FIRST'
  },
  
  // Multi-language Support
  default_language: 'en',
  language_data: {
    'es': {
      first_name: 'Alexandra',
      last_name: 'Rodriguez-Chen',
      designation: 'Directora de Tecnología',
      company: 'InnovateTech Solutions',
      summary: 'Líder tecnológica apasionada con más de 15 años de experiencia impulsando la transformación digital e innovación en empresas Fortune 500.'
    }
  },
  
  // Settings & Features
  autodownload_v2: false,
  ip_location_enabled: true,
  branding_footer: false,
  follow_up_email: true,
  follow_up_email_subject: 'Great meeting you!',
  follow_up_email_body: 'Thank you for connecting with me. Looking forward to our collaboration!',
  follow_up_email_delay: 2,
  
  // Analytics & Metadata
  created: '2024-01-15T10:30:00Z',
  updated: '2024-11-07T14:20:00Z',
  meta: {
    industry: 'Technology',
    company_size: '1000+',
    founded: '2010'
  }
};

// Minimal data for comparison
const minimalCardData = {
  first_name: 'John',
  last_name: 'Doe',
  designation: 'Software Engineer',
  company: 'Tech Corp',
  email_v2: [{ value: 'john@techcorp.com', label: 'Work' }],
  phone_v2: [{ value: '+1 (555) 123-4567', label: 'Mobile' }],
  customizations: {
    background_color: '#ffffff',
    user_info_color: '#333333',
    button_color: '#007bff',
    icon_color: '#007bff'
  }
};

// Business executive data
const executiveCardData = {
  first_name: 'Michael',
  last_name: 'Thompson',
  prefix: 'Mr.',
  designation: 'Chief Executive Officer',
  company: 'Global Enterprises Inc.',
  department: 'Executive Leadership',
  summary: 'Visionary leader with 20+ years of experience scaling businesses from startup to IPO. Expert in strategic planning, mergers & acquisitions, and global expansion.',
  user_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
  logo_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop',
  phone_v2: [
    { value: '+1 (555) 999-0001', label: 'Executive' },
    { value: '+1 (555) 999-0002', label: 'Assistant' }
  ],
  email_v2: [
    { value: 'michael.thompson@globalenterprises.com', label: 'Executive' },
    { value: 'ceo@globalenterprises.com', label: 'Public' }
  ],
  website_v2: [
    { value: 'https://globalenterprises.com', label: 'Company' },
    { value: 'https://michaelthompson-leadership.com', label: 'Personal' }
  ],
  social_links: {
    linkedin: 'https://linkedin.com/in/michael-thompson-ceo',
    twitter: 'https://twitter.com/mthompson_ceo',
    youtube: 'https://youtube.com/@LeadershipInsights'
  },
  customizations: {
    background_color: '#000000',
    user_info_color: '#ffffff',
    secondary_color: '#cccccc',
    button_color: '#gold',
    icon_color: '#gold',
    typography: {
      font_family: 'Playfair Display'
    }
  }
};

// Template function for creating stories
const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 400px; margin: 0 auto; padding: 20px;';
  
  const webComponent = document.createElement('uniqode-layout-comprehensive');
  webComponent.cardData = args.cardData;
  
  container.appendChild(webComponent);
  return container;
};

export default {
  title: 'Components/CardLayoutComprehensive',
  component: 'uniqode-layout-comprehensive',
  parameters: {
    docs: {
      description: {
        component: `
# Comprehensive Card Layout - The Ultimate Card Design

This is the most comprehensive business card layout that displays **ALL possible data points** from the DigitalBusinessCard model.

## Features
- ✅ **Complete Data Coverage** - Every field from the original model
- ✅ **Modern Design** - Clean, professional layout
- ✅ **Responsive** - Works on all screen sizes  
- ✅ **Social Media** - All 23+ platforms supported
- ✅ **Contact Methods** - Multiple phones, emails, websites
- ✅ **Custom Fields** - Unlimited additional information
- ✅ **Rich Typography** - Full customization support
- ✅ **Interactive** - Clickable links and buttons

## Data Points Included
- **Personal**: Name, pronouns, title, company, department, bio
- **Contact**: Multiple phones, emails, websites (v2 format + legacy)
- **Address**: Full address with Google Maps integration
- **Social**: 23+ social media platforms
- **Custom Fields**: Unlimited key-value pairs
- **Images**: Profile photo, company logo
- **Customization**: Colors, fonts, typography
- **Actions**: Share card, save contact

## Usage
\`\`\`html
<uniqode-layout-comprehensive></uniqode-layout-comprehensive>
\`\`\`

\`\`\`javascript
const card = document.querySelector('uniqode-layout-comprehensive');
card.cardData = comprehensiveData;
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    cardData: {
      control: 'object',
      description: 'Complete card data object with all possible fields',
    },
  },
};

// Stories
export const ComprehensiveData = Template.bind({});
ComprehensiveData.args = {
  cardData: comprehensiveCardData,
};
ComprehensiveData.parameters = {
  docs: {
    description: {
      story: 'Shows ALL possible data points - the ultimate comprehensive card with every field populated.',
    },
  },
};

export const ExecutiveProfile = Template.bind({});
ExecutiveProfile.args = {
  cardData: executiveCardData,
};
ExecutiveProfile.parameters = {
  docs: {
    description: {
      story: 'Executive-level card with premium styling and essential business information.',
    },
  },
};

export const MinimalData = Template.bind({});
MinimalData.args = {
  cardData: minimalCardData,
};
MinimalData.parameters = {
  docs: {
    description: {
      story: 'Minimal data example showing how the card gracefully handles limited information.',
    },
  },
};

export const Interactive = Template.bind({});
Interactive.args = {
  cardData: comprehensiveCardData,
};
Interactive.parameters = {
  docs: {
    description: {
      story: 'Use the controls below to modify any data field and see real-time updates in the card design.',
    },
  },
};
