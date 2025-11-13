import './CardLayout12.js';

export default {
  title: 'Card Templates/Layout 12',
  tags: ['autodocs'],
  argTypes: {
    firstName: {
      control: 'text',
      description: 'First name',
      defaultValue: 'Rolf'
    },
    lastName: {
      control: 'text',
      description: 'Last name',
      defaultValue: 'Hodges'
    },
    pronouns: {
      control: 'text',
      description: 'Pronouns (e.g., he/him, she/her)',
      defaultValue: 'he/him'
    },
    designation: {
      control: 'text',
      description: 'Job title',
      defaultValue: 'Account Executive'
    },
    company: {
      control: 'text',
      description: 'Company name',
      defaultValue: 'Oakwood Realty'
    },
    summary: {
      control: 'text',
      description: 'Bio/summary',
      defaultValue: 'I leverage my expertise to help individuals and businesses find their perfect properties.'
    },
    profileImage: {
      control: 'text',
      description: 'Profile image URL',
      defaultValue: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400'
    },
    phone: {
      control: 'text',
      description: 'Phone number',
      defaultValue: '+91 99900 0887'
    },
    email: {
      control: 'text',
      description: 'Email address',
      defaultValue: 'rolf.h@oakwoodrealty.com'
    },
    website: {
      control: 'text',
      description: 'Website URL',
      defaultValue: 'https://oakwoodrealty.com'
    },
    street: {
      control: 'text',
      description: 'Street address',
      defaultValue: "301, Peter's Cote, 3rd Avenue St."
    },
    city: {
      control: 'text',
      description: 'City',
      defaultValue: 'Sunnyville'
    },
    state: {
      control: 'text',
      description: 'State',
      defaultValue: 'California'
    },
    instagram: {
      control: 'text',
      description: 'Instagram URL',
      defaultValue: 'https://instagram.com/oakwoodrealty'
    },
    facebook: {
      control: 'text',
      description: 'Facebook URL',
      defaultValue: 'https://facebook.com/oakwoodrealty'
    },
    twitter: {
      control: 'text',
      description: 'Twitter URL',
      defaultValue: 'https://twitter.com/oakwoodrealty'
    },
    whatsapp: {
      control: 'text',
      description: 'WhatsApp number',
      defaultValue: '+919990000887'
    }
  }
};

// Sample data generator
const createCardData = (args = {}) => ({
  first_name: args.firstName || 'Rolf',
  last_name: args.lastName || 'Hodges',
  pronouns_v2: args.pronouns || 'he/him',
  designation: args.designation || 'Account Executive',
  company: args.company || 'Oakwood Realty',
  summary: args.summary || 'I leverage my expertise to help individuals and businesses find their perfect properties.',
  phone_v2: [
    { value: args.phone || '+91 99900 0887', label: 'Phone' }
  ],
  email_v2: [
    { value: args.email || 'rolf.h@oakwoodrealty.com', label: 'Email' },
    { value: 'ash@amazon.design', label: 'Work' },
    { value: 'ashleyrocks@gmail.com', label: 'Personal' }
  ],
  website_v2: args.website ? [
    { value: args.website, label: 'Website' }
  ] : [],
  address: (args.street || args.city || args.state) ? {
    street: args.street || '',
    city: args.city || '',
    state: args.state || '',
    postal_code: '',
    country: ''
  } : null,
  social_media_links: {
    instagram: args.instagram || '',
    facebook: args.facebook || '',
    twitter: args.twitter || '',
    whatsapp: args.whatsapp || ''
  },
  profile_image: args.profileImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
});

/**
 * Default Layout 12 - Oakwood Realty Theme
 */
export const Default = (args) => {
  const container = document.createElement('div');
  container.innerHTML = `
    <div style="padding: 40px; background: #f5f5f5; min-height: 100vh; display: flex; justify-content: center; align-items: center;">
      <uniqode-layout-12 id="card"></uniqode-layout-12>
    </div>
  `;

  setTimeout(() => {
    const card = container.querySelector('#card');
    if (card) {
      card.cardData = createCardData(args);
      
      // Log events
      card.addEventListener('contact-click', (e) => {
        console.log('Contact clicked:', e.detail);
      });
      card.addEventListener('save-contact', (e) => {
        console.log('Save contact:', e.detail);
      });
      card.addEventListener('share', (e) => {
        console.log('Share:', e.detail);
      });
      card.addEventListener('social-click', (e) => {
        console.log('Social link clicked:', e.detail);
      });
    }
  }, 0);

  return container;
};

Default.args = {
  firstName: 'Rolf',
  lastName: 'Hodges',
  pronouns: 'he/him',
  designation: 'Account Executive',
  company: 'Oakwood Realty',
  summary: 'I leverage my expertise to help individuals and businesses find their perfect properties.',
  profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
  phone: '+91 99900 0887',
  email: 'rolf.h@oakwoodrealty.com',
  website: 'https://oakwoodrealty.com',
  street: "301, Peter's Cote, 3rd Avenue St.",
  city: 'Sunnyville',
  state: 'California',
  instagram: 'https://instagram.com/oakwoodrealty',
  facebook: 'https://facebook.com/oakwoodrealty',
  twitter: 'https://twitter.com/oakwoodrealty',
  whatsapp: '+919990000887'
};
