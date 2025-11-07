// Story for CardLayout5 Web Component

// Sample card data for stories
const defaultCardData = {
  first_name: 'John',
  last_name: 'Doe',
  designation: 'Software Engineer',
  company: 'Tech Corp',
  department: 'Engineering',
  summary: 'Passionate software engineer with 5+ years of experience building scalable web applications and leading development teams.',
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
  custom_fields: [
    { value: 'Available for consulting', label: 'Note' }
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

// Template function for creating stories
const Template = (args) => {
  const container = document.createElement('div');
  container.style.cssText = 'max-width: 400px; margin: 0 auto; padding: 20px;';
  
  const webComponent = document.createElement('uniqode-layout-5');
  webComponent.cardData = args.cardData;
  
  container.appendChild(webComponent);
  return container;
};

export default {
  title: 'Components/CardLayout5',
  component: 'uniqode-layout-5',
  parameters: {
    docs: {
      description: {
        component: `
# Card Layout 5 - Split Section Card

A professional business card layout with split sections featuring a colored header with user info and clipped profile image.

## Features
- Split section design with colored header
- Clipped circular profile image
- Separate summary section
- Detailed contact information with icons
- Custom fields support
- Social media integration
- Mobile-optimized

## Usage
\`\`\`html
<uniqode-layout-5></uniqode-layout-5>
\`\`\`

Set card data via JavaScript:
\`\`\`javascript
const card = document.querySelector('uniqode-layout-5');
card.cardData = {
  first_name: 'John',
  last_name: 'Doe',
  // ... more data
};
\`\`\`
        `,
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

// Default story
export const Default = Template.bind({});
Default.args = {
  cardData: defaultCardData,
};
