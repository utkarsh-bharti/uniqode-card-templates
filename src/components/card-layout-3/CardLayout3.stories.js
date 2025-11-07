import { CardLayout3 } from './CardLayout3.js';

export default {
  title: 'Components/CardLayout3',
  component: 'uniqode-layout-3',
  parameters: {
    docs: {
      description: {
        component: 'Default Section-Based Card Layout - Features header with logo and profile info, large circular action buttons, section-based contact information with box shadows, and social media icons grid.'
      }
    }
  },
  argTypes: {
    first_name: { control: 'text' },
    last_name: { control: 'text' },
    designation: { control: 'text' },
    company: { control: 'text' },
    department: { control: 'text' },
    summary: { control: 'text' },
    user_image_url: { control: 'text' },
    logo_url: { control: 'text' },
    'customizations.background_color': { control: 'color' },
    'customizations.icon_color': { control: 'color' },
    'customizations.button_color': { control: 'color' }
  }
};

const sampleData = {
  first_name: 'David',
  last_name: 'Wilson',
  designation: 'Product Manager',
  company: 'Innovation Labs',
  department: 'Product',
  summary: 'Experienced product manager with a passion for building user-centric solutions and driving product strategy.',
  user_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop',
  phone_v2: [
    { value: '+1 (555) 234-5678', label: 'work' },
    { value: '+1 (555) 876-5432', label: 'mobile' }
  ],
  email_v2: [
    { value: 'david.wilson@innovationlabs.com', label: 'work' }
  ],
  website_v2: [
    { value: 'https://davidwilson.com', label: 'portfolio' }
  ],
  address_v2: '456 Innovation Drive\nTech Park\nAustin, TX 78701',
  social_links: {
    linkedin: 'https://linkedin.com/in/davidwilson',
    twitter: 'https://twitter.com/davidwilson'
  },
  customizations: {
    background_color: '#059669',
    icon_color: '#059669',
    button_color: '#059669',
    font_style: 'Work Sans, sans-serif'
  },
  lead_collection: true
};

const Template = (args) => {
  const cardData = {
    ...sampleData,
    ...args,
    customizations: {
      ...sampleData.customizations,
      background_color: args['customizations.background_color'] || sampleData.customizations.background_color,
      icon_color: args['customizations.icon_color'] || sampleData.customizations.icon_color,
      button_color: args['customizations.button_color'] || sampleData.customizations.button_color
    }
  };

  const element = document.createElement('uniqode-layout-3');
  element.cardData = cardData;
  
  element.addEventListener('lead-collect', (e) => {
    console.log('Lead collect clicked:', e.detail);
  });
  
  return element;
};

export const Default = Template.bind({});
Default.args = {};
