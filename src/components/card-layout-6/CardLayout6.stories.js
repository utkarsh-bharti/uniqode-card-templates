// Story for CardLayout6 Web Component

const defaultCardData = {
  first_name: 'John',
  last_name: 'Doe',
  designation: 'Software Engineer',
  company: 'Tech Corp',
  summary: 'Passionate software engineer with 5+ years of experience building scalable web applications.',
  email_v2: [
    { value: 'john@techcorp.com', label: 'Work' },
    { value: 'john.doe@gmail.com', label: 'Personal' }
  ],
  phone_v2: [
    { value: '+1 (555) 123-4567', label: 'Mobile' },
    { value: '+1 (555) 987-6543', label: 'Work' }
  ],
  website_v2: [
    { value: 'https://johndoe.dev', label: 'Portfolio' }
  ],
  social_links: {
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    github: 'https://github.com/johndoe'
  },
  customizations: {
    background_color: '#007bff',
    user_info_color: '#333333',
    secondary_color: '#666666',
    button_color: '#007bff',
    icon_color: '#007bff',
    font_style: 'Work Sans, sans-serif'
  },
  user_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 400px; margin: 0 auto; padding: 20px;';
  
  const webComponent = document.createElement('uniqode-layout-6');
  webComponent.cardData = args.cardData;
  
  container.appendChild(webComponent);
  return container;
};

export default {
  title: 'Components/CardLayout6',
  component: 'uniqode-layout-6',
  parameters: {
    docs: {
      description: {
        component: 'Card Layout 6 - Centered profile card with header logo section',
      },
    },
  },
  argTypes: {
    cardData: {
      control: 'object',
      description: 'Card data object containing all personal and customization information',
    },
  },
};

export const Default = Template.bind({});
Default.args = {
  cardData: defaultCardData,
};
