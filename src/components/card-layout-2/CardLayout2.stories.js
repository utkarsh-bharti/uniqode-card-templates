import { CardLayout2 } from './CardLayout2.js';

export default {
  title: 'Components/CardLayout2',
  component: 'uniqode-layout-2',
  parameters: {
    docs: {
      description: {
        component: 'Header Background Card Layout - Features a header background with logo, profile image positioned over header/main boundary, and clean main container with rounded top corners.'
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
    pronouns_v2: { control: 'text' },
    'customizations.background_color': { control: 'color' },
    'customizations.icon_color': { control: 'color' },
    'customizations.button_color': { control: 'color' },
    'customizations.font_style': { 
      control: 'select',
      options: ['Work Sans', 'Inter', 'Roboto', 'Open Sans', 'Lato']
    }
  }
};

// Sample data for stories
const sampleData = {
  first_name: 'Sarah',
  last_name: 'Johnson',
  designation: 'Senior Marketing Manager',
  company: 'Tech Solutions Inc.',
  department: 'Marketing',
  summary: 'Passionate marketing professional with 8+ years of experience in digital marketing, brand strategy, and customer engagement.',
  user_image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
  logo_url: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=80&fit=crop',
  pronouns_v2: 'she/her',
  phone_v2: [
    { value: '+1 (555) 123-4567', label: 'work' },
    { value: '+1 (555) 987-6543', label: 'mobile' }
  ],
  email_v2: [
    { value: 'sarah.johnson@techsolutions.com', label: 'work' },
    { value: 'sarah@personal.com', label: 'personal' }
  ],
  website_v2: [
    { value: 'https://sarahjohnson.com', label: 'portfolio' }
  ],
  address_v2: '123 Business Ave\nSuite 100\nSan Francisco, CA 94105',
  social_links: {
    linkedin: 'https://linkedin.com/in/sarahjohnson',
    twitter: 'https://twitter.com/sarahjohnson',
    instagram: 'https://instagram.com/sarahjohnson'
  },
  customizations: {
    background_color: '#2563eb',
    icon_color: '#2563eb',
    button_color: '#2563eb',
    font_style: 'Work Sans, sans-serif',
    typography: {
      company_details: { google_font_size: 18 },
      button: { google_font_colour: 'white' }
    }
  },
  lead_collection: true
};

const Template = (args) => {
  // Flatten nested properties for Storybook controls
  const cardData = {
    ...sampleData,
    ...args,
    customizations: {
      ...sampleData.customizations,
      background_color: args['customizations.background_color'] || sampleData.customizations.background_color,
      icon_color: args['customizations.icon_color'] || sampleData.customizations.icon_color,
      button_color: args['customizations.button_color'] || sampleData.customizations.button_color,
      font_style: args['customizations.font_style'] || sampleData.customizations.font_style
    }
  };

  const element = document.createElement('uniqode-layout-2');
  element.cardData = cardData;
  
  // Add event listeners for demo
  element.addEventListener('lead-collect', (e) => {
    console.log('Lead collect clicked:', e.detail);
  });
  
  element.addEventListener('contact-save', (e) => {
    console.log('Save contact clicked:', e.detail);
  });
  
  return element;
};

export const Default = Template.bind({});
Default.args = {};
