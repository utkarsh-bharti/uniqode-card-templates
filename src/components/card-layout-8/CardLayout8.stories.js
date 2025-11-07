// Story for CardLayout8 Web Component

const defaultCardData = {
  first_name: 'John', last_name: 'Doe', designation: 'Software Engineer', company: 'Tech Corp',
  summary: 'Passionate software engineer with 5+ years of experience.',
  email_v2: [{ value: 'john@techcorp.com', label: 'Work' }],
  phone_v2: [{ value: '+1 (555) 123-4567', label: 'Mobile' }],
  social_links: { linkedin: 'https://linkedin.com/in/johndoe', twitter: 'https://twitter.com/johndoe' },
  customizations: {
    background_color: '#007bff', user_info_color: '#333333', secondary_color: '#666666',
    button_color: '#007bff', icon_color: '#007bff', font_style: 'Work Sans, sans-serif'
  },
  user_image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
};

const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 400px; margin: 0 auto; padding: 20px;';
  const webComponent = document.createElement('uniqode-layout-8');
  webComponent.cardData = args.cardData;
  container.appendChild(webComponent);
  return container;
};

export default {
  title: 'Components/CardLayout8',
  component: 'uniqode-layout-8',
  parameters: { docs: { description: { component: 'Card Layout 8 - Gradient background card' } } },
  argTypes: { cardData: { control: 'object', description: 'Card data object' } },
};

export const Default = Template.bind({});
Default.args = { cardData: defaultCardData };
