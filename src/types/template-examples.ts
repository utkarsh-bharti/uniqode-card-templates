// Examples of how different templates consume data selectively
import { CardData, DataConsumptionMap } from './index';

// ============================================================================
// TEMPLATE DATA CONSUMPTION PATTERNS
// ============================================================================

// Layout 1: Minimal business card - only uses basic info
export const Layout1DataMap: DataConsumptionMap<
  'first_name' | 'last_name' | 'designation' | 'company' | 'email_v2' | 'phone_v2' | 'customizations'
> = {
  first_name: { required: true, fallback: 'Unknown' },
  last_name: { required: false, fallback: '' },
  designation: { required: true, fallback: 'Professional' },
  company: { required: true, fallback: 'Company' },
  email_v2: { required: true, fallback: [] },
  phone_v2: { required: false, fallback: [] },
  customizations: { required: false, fallback: {} }
};

// Layout 2: Social-focused card - emphasizes social links
export const Layout2DataMap: DataConsumptionMap<
  'first_name' | 'last_name' | 'designation' | 'social_links' | 'user_image_url' | 'customizations'
> = {
  first_name: { required: true, fallback: 'User' },
  last_name: { required: false, fallback: '' },
  designation: { required: false, fallback: 'Creator' },
  social_links: { required: true, fallback: {} },
  user_image_url: { required: false, fallback: null },
  customizations: { required: false, fallback: {} }
};

// Layout 3: Executive card - uses comprehensive professional info
export const Layout3DataMap: DataConsumptionMap<
  'first_name' | 'last_name' | 'designation' | 'company' | 'department' | 'summary' | 
  'email_v2' | 'phone_v2' | 'website_v2' | 'address_v2' | 'logo_url' | 'customizations'
> = {
  first_name: { required: true, fallback: 'Executive' },
  last_name: { required: true, fallback: '' },
  designation: { required: true, fallback: 'Executive' },
  company: { required: true, fallback: 'Organization' },
  department: { required: false, fallback: '' },
  summary: { required: false, fallback: '' },
  email_v2: { required: true, fallback: [] },
  phone_v2: { required: true, fallback: [] },
  website_v2: { required: false, fallback: [] },
  address_v2: { required: false, fallback: '' },
  logo_url: { required: false, fallback: null },
  customizations: { required: false, fallback: {} }
};

// Comprehensive Layout: Uses ALL available data points
export const ComprehensiveDataMap: DataConsumptionMap<keyof CardData> = {
  id: { required: false, fallback: null },
  first_name: { required: true, fallback: 'Individual' },
  last_name: { required: false, fallback: '' },
  designation: { required: false, fallback: '' },
  company: { required: false, fallback: '' },
  department: { required: false, fallback: '' },
  summary: { required: false, fallback: '' },
  prefix: { required: false, fallback: '' },
  suffix: { required: false, fallback: '' },
  pronouns_v2: { required: false, fallback: '' },
  phone_v2: { required: false, fallback: [] },
  email_v2: { required: false, fallback: [] },
  website_v2: { required: false, fallback: [] },
  custom_fields: { required: false, fallback: [] },
  phone: { required: false, fallback: {} },
  email: { required: false, fallback: '' },
  website: { required: false, fallback: '' },
  address_v2: { required: false, fallback: '' },
  user_image_url: { required: false, fallback: null },
  logo_url: { required: false, fallback: null },
  social_links: { required: false, fallback: {} },
  customizations: { required: false, fallback: {} },
  layout: { required: false, fallback: '1' },
  contact_info_ordering: { required: false, fallback: [] }
};

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Basic usage with minimal data
export const basicUsageExample = {
  cardData: {
    first_name: 'John',
    last_name: 'Doe',
    designation: 'Software Engineer',
    company: 'Tech Corp',
    email_v2: [{ value: 'john@techcorp.com', label: 'Work' }],
    phone_v2: [{ value: '+1234567890', label: 'Mobile' }]
  }
};

// Example 2: Advanced usage with custom handlers and configuration
export const advancedUsageExample = {
  cardData: {
    first_name: 'Jane',
    last_name: 'Smith',
    designation: 'CEO',
    company: 'Innovation Inc',
    email_v2: [{ value: 'jane@innovation.com', label: 'Work' }],
    social_links: {
      linkedin: 'https://linkedin.com/in/janesmith',
      twitter: 'https://twitter.com/janesmith'
    }
  },
  dataSetters: {
    setName: (first: string, last: string) => console.log(`Name updated: ${first} ${last}`),
    setCompany: (company: string, designation?: string) => console.log(`Company updated: ${designation} at ${company}`)
  },
  onContactClick: (event) => console.log('Contact clicked:', event),
  onShare: (event) => console.log('Share requested:', event),
  config: {
    showSocialLinks: true,
    enableSharing: true,
    theme: 'auto' as const
  }
};

// Example 3: Template-specific configuration
export const layout1SpecificExample = {
  cardData: basicUsageExample.cardData,
  config: {
    showProfileImage: true,
    compactMode: false,
    showLogo: true
  }
};

export const layout2SpecificExample = {
  cardData: advancedUsageExample.cardData,
  config: {
    showBackgroundPattern: true,
    gradientStyle: 'radial' as const,
    showSocialLinks: true
  }
};
