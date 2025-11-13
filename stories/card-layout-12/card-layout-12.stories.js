import './CardLayout12.js';

export default {
  title: 'Card Templates/Layout 12 - Madgamer',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Modern gaming/tech company card with curved header, bold colors, and prominent branding. Perfect for creative industries, gaming companies, and tech startups.',
      },
    },
  },
  argTypes: {
    first_name: { control: 'text', description: 'First name' },
    last_name: { control: 'text', description: 'Last name' },
    pronouns_v2: { control: 'text', description: 'Pronouns (e.g., he/him, she/her)' },
    designation: { control: 'text', description: 'Job title' },
    company: { control: 'text', description: 'Company name' },
    department: { control: 'text', description: 'Department' },
    summary: { control: 'text', description: 'Bio/summary' },
    user_image_url: { control: 'text', description: 'Profile image URL' },
    logo_url: { control: 'text', description: 'Company logo URL' },
    background_color: { control: 'color', description: 'Header background color' },
    icon_color: { control: 'color', description: 'Icon and accent color' },
    button_color: { control: 'color', description: 'Button color' },
  },
};

// Sample data matching the Figma design
const createCardData = (overrides = {}) => ({
  first_name: 'Brian',
  last_name: 'Jenkins',
  pronouns_v2: 'he/him',
  designation: 'Co-founder',
  company: 'MadGamer Ltd.',
  department: '',
  summary: 'Unleash the gamer within!\n\nMadgamer is where innovation meets entertainment. We\'re not just building games; we\'re shaping experiences.',
  phone_v2: [
    { value: '+1 (555) 123-4567', label: 'Mobile' },
    { value: '+1 (555) 987-6543', label: 'Work' }
  ],
  email_v2: [
    { value: 'jenkins.b@madgamer.com', label: 'Work' },
    { value: 'ash@amazon.design', label: 'Work' },
    { value: 'ashleyrocks@gmail.com', label: 'Personal' }
  ],
  website_v2: [
    { value: 'https://madgamer.com', label: 'Company' },
    { value: 'https://brianjenkins.dev', label: 'Portfolio' }
  ],
  address_v2: '301, Peter\'s Cote, 3rd Avenue St., Sunnyville, California',
  social_links: {
    instagram: 'https://instagram.com/madgamer',
    facebook: 'https://facebook.com/madgamer',
    twitter: 'https://twitter.com/madgamer',
    whatsapp: 'https://wa.me/15551234567',
    linkedin: 'https://linkedin.com/in/brianjenkins'
  },
  user_image_url: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400&h=400&fit=crop&crop=face',
  logo_url: '',
  customizations: {
    background_color: '#84E9F1',
    user_info_color: '#000000',
    secondary_color: '#F3FDFE',
    button_color: '#1671F9',
    icon_color: '#FFFFFF',
    font_style: 'Open Sans, sans-serif'
  },
  contact_info_ordering: ['phone_v2', 'email_v2', 'website_v2'],
  layout: '12',
  ...overrides,
});

const Template = (args) => {
  const container = document.createElement('div');
  container.style.maxWidth = '400px';
  container.style.margin = '20px auto';
  container.style.padding = '20px';
  container.style.background = '#f5f5f5';
  container.style.borderRadius = '8px';
  
  const card = document.createElement('uniqode-layout-12');
  card.cardData = createCardData(args);
  
  // Add event listeners for demo
  card.addEventListener('contact-click', (e) => {
    console.log('Contact clicked:', e.detail);
    alert(`Contact clicked: ${e.detail.type} - ${e.detail.value}`);
  });
  
  card.addEventListener('card-share', (e) => {
    console.log('Card share requested:', e.detail);
    alert('Card share requested!');
  });
  
  container.appendChild(card);
  return container;
};

export const Default = Template.bind({});
Default.args = {};

export const WithoutPhoto = Template.bind({});
WithoutPhoto.args = {
  user_image_url: '',
};
WithoutPhoto.parameters = {
  docs: {
    description: {
      story: 'Card displays with initials when no profile image is provided.',
    },
  },
};

export const MinimalContact = Template.bind({});
MinimalContact.args = {
  first_name: 'Alex',
  last_name: 'Smith',
  pronouns_v2: '',
  designation: 'Game Designer',
  company: 'PixelForge',
  summary: 'Creating immersive gaming experiences.',
  email_v2: [
    { value: 'alex@pixelforge.com', label: 'Work' }
  ],
  phone_v2: [],
  website_v2: [],
  address_v2: '',
  social_links: {
    twitter: 'https://twitter.com/alexsmith',
    linkedin: 'https://linkedin.com/in/alexsmith'
  },
  user_image_url: '',
};
MinimalContact.parameters = {
  docs: {
    description: {
      story: 'Minimal contact information with only essential details.',
    },
  },
};

export const TechStartup = Template.bind({});
TechStartup.args = {
  first_name: 'Sarah',
  last_name: 'Chen',
  pronouns_v2: 'she/her',
  designation: 'Chief Technology Officer',
  company: 'NeuralTech AI',
  summary: 'Building the future of artificial intelligence. Passionate about machine learning and ethical AI development.',
  email_v2: [
    { value: 'sarah.chen@neuraltech.ai', label: 'Work' }
  ],
  phone_v2: [
    { value: '+1 (415) 555-0123', label: 'Office' }
  ],
  website_v2: [
    { value: 'https://neuraltech.ai', label: 'Company' },
    { value: 'https://sarahchen.tech', label: 'Personal' }
  ],
  address_v2: '100 Innovation Drive, San Francisco, CA 94103',
  social_links: {
    linkedin: 'https://linkedin.com/in/sarahchen',
    twitter: 'https://twitter.com/sarahchen_ai',
    instagram: 'https://instagram.com/neuraltech'
  },
  user_image_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
  customizations: {
    background_color: '#7C3AED',
    button_color: '#EC4899',
  }
};
TechStartup.parameters = {
  docs: {
    description: {
      story: 'Tech startup executive with custom purple branding.',
    },
  },
};

export const CreativeAgency = Template.bind({});
CreativeAgency.args = {
  first_name: 'Marco',
  last_name: 'Rivera',
  pronouns_v2: 'he/him',
  designation: 'Creative Director',
  company: 'Vivid Studios',
  summary: 'Award-winning creative director specializing in brand identity and digital experiences. Let\'s create something amazing together!',
  email_v2: [
    { value: 'marco@vividstudios.co', label: 'Work' },
    { value: 'hello@marcorivera.design', label: 'Personal' }
  ],
  phone_v2: [
    { value: '+1 (323) 555-0199', label: 'Studio' }
  ],
  website_v2: [
    { value: 'https://vividstudios.co', label: 'Studio' },
    { value: 'https://marcorivera.design', label: 'Portfolio' }
  ],
  address_v2: '456 Creative Lane, Los Angeles, CA 90028',
  social_links: {
    instagram: 'https://instagram.com/vividstudios',
    facebook: 'https://facebook.com/vividstudios',
    linkedin: 'https://linkedin.com/in/marcorivera',
    twitter: 'https://twitter.com/marcorivera'
  },
  user_image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  customizations: {
    background_color: '#F59E0B',
    button_color: '#EF4444',
  }
};
CreativeAgency.parameters = {
  docs: {
    description: {
      story: 'Creative agency professional with vibrant orange/red branding.',
    },
  },
};

export const GamingInfluencer = Template.bind({});
GamingInfluencer.args = {
  first_name: 'Phoenix',
  last_name: 'Storm',
  pronouns_v2: 'they/them',
  designation: 'Gaming Content Creator',
  company: 'StormGaming',
  summary: '🎮 Professional gamer & content creator\n🏆 Multiple esports champion\n📺 Streaming daily on multiple platforms',
  email_v2: [
    { value: 'business@stormgaming.tv', label: 'Business' }
  ],
  phone_v2: [],
  website_v2: [
    { value: 'https://stormgaming.tv', label: 'Website' },
    { value: 'https://twitch.tv/phoenixstorm', label: 'Twitch' }
  ],
  social_links: {
    twitter: 'https://twitter.com/phoenixstorm',
    instagram: 'https://instagram.com/phoenixstorm',
    facebook: 'https://facebook.com/stormgaming',
    whatsapp: 'https://wa.me/message/EXAMPLE'
  },
  user_image_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face',
  customizations: {
    background_color: '#06B6D4',
    button_color: '#8B5CF6',
  }
};
GamingInfluencer.parameters = {
  docs: {
    description: {
      story: 'Gaming influencer/content creator with cyan and purple theme.',
    },
  },
};

export const LongContent = Template.bind({});
LongContent.args = {
  first_name: 'Dr. Katherine',
  last_name: 'Williams-Johnson',
  pronouns_v2: 'she/her',
  designation: 'Chief Innovation Officer & Co-Founder',
  company: 'GameTech Innovations International',
  summary: 'Leading the charge in next-generation gaming technology with over 15 years of experience in interactive entertainment. Specializing in VR/AR experiences, procedural generation, and AI-driven game design. Passionate about creating inclusive gaming environments and mentoring the next generation of game developers.',
  email_v2: [
    { value: 'katherine.williams-johnson@gametechinnovations.com', label: 'Work' },
    { value: 'dr.kwilliams@university.edu', label: 'Academic' },
    { value: 'kate.personal@email.com', label: 'Personal' }
  ],
  phone_v2: [
    { value: '+1 (555) 123-4567', label: 'Office' },
    { value: '+1 (555) 987-6543', label: 'Mobile' }
  ],
  website_v2: [
    { value: 'https://gametechinnovationsinternational.com', label: 'Company' },
    { value: 'https://katherinewilliamsjohnson.com', label: 'Personal' }
  ],
  address_v2: '12345 Technology Boulevard, Suite 9876, Innovation District, San Francisco, California 94105, United States',
  social_links: {
    linkedin: 'https://linkedin.com/in/katherinewilliamsjohnson',
    twitter: 'https://twitter.com/drkwilliams',
    instagram: 'https://instagram.com/gametechinnovations',
    facebook: 'https://facebook.com/gametechinnovations',
    whatsapp: 'https://wa.me/15551234567'
  },
  user_image_url: '',
};
LongContent.parameters = {
  docs: {
    description: {
      story: 'Tests layout with very long text content and multiple contact methods.',
    },
  },
};

export const CustomColors = Template.bind({});
CustomColors.args = {
  customizations: {
    background_color: '#10B981',
    button_color: '#F59E0B',
  }
};
CustomColors.parameters = {
  docs: {
    description: {
      story: 'Custom color scheme with green header and orange button.',
    },
  },
};

export const NoSocialMedia = Template.bind({});
NoSocialMedia.args = {
  social_links: {},
};
NoSocialMedia.parameters = {
  docs: {
    description: {
      story: 'Professional card without social media presence.',
    },
  },
};

export const MultiplePhones = Template.bind({});
MultiplePhones.args = {
  phone_v2: [
    { value: '+1 (555) 100-0001', label: 'Mobile' },
    { value: '+1 (555) 100-0002', label: 'Office' },
    { value: '+1 (555) 100-0003', label: 'Home' },
    { value: '+44 20 7123 4567', label: 'UK Office' }
  ],
  email_v2: [
    { value: 'main@company.com', label: 'Primary' }
  ],
};
MultiplePhones.parameters = {
  docs: {
    description: {
      story: 'Card with multiple phone numbers for different purposes.',
    },
  },
};

// Interactive Demo
export const InteractiveDemo = () => {
  const container = document.createElement('div');
  container.style.maxWidth = '400px';
  container.style.margin = '20px auto';
  container.style.padding = '20px';
  container.style.background = '#f5f5f5';
  container.style.borderRadius = '8px';
  
  const card = document.createElement('uniqode-layout-12');
  card.cardData = createCardData();
  
  // Event logging
  const log = document.createElement('div');
  log.style.marginTop = '20px';
  log.style.padding = '15px';
  log.style.background = 'white';
  log.style.borderRadius = '8px';
  log.style.fontFamily = 'monospace';
  log.style.fontSize = '12px';
  log.style.maxHeight = '200px';
  log.style.overflow = 'auto';
  log.innerHTML = '<strong>Event Log:</strong><br/>';
  
  card.addEventListener('contact-click', (e) => {
    const entry = document.createElement('div');
    entry.style.padding = '5px 0';
    entry.style.borderBottom = '1px solid #eee';
    entry.innerHTML = `📞 Contact: ${e.detail.type} - ${e.detail.value}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  });
  
  card.addEventListener('card-share', (e) => {
    const entry = document.createElement('div');
    entry.style.padding = '5px 0';
    entry.style.borderBottom = '1px solid #eee';
    entry.innerHTML = `📤 Share requested`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
  });
  
  container.appendChild(card);
  container.appendChild(log);
  
  return container;
};
InteractiveDemo.parameters = {
  docs: {
    description: {
      story: 'Interactive demo showing event logging. Click on contacts and buttons to see events.',
    },
  },
};

