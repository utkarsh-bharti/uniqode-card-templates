import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { CardData, DataPreset, Template, FormSchema, FormField } from '../types';

/**
 * Utility function to merge Tailwind classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generate form schema for card data
 */
export function generateFormSchema(): FormSchema {
  const fields: FormField[] = [
    // Personal Information
    {
      key: 'first_name',
      label: 'First Name',
      type: 'text',
      placeholder: 'John',
      required: true,
      section: 'personal'
    },
    {
      key: 'last_name',
      label: 'Last Name',
      type: 'text',
      placeholder: 'Doe',
      section: 'personal'
    },
    {
      key: 'prefix',
      label: 'Prefix',
      type: 'text',
      placeholder: 'Mr.',
      section: 'personal'
    },
    {
      key: 'suffix',
      label: 'Suffix',
      type: 'text',
      placeholder: 'Jr.',
      section: 'personal'
    },
    {
      key: 'pronouns_v2',
      label: 'Pronouns',
      type: 'text',
      placeholder: 'he/him',
      section: 'personal'
    },
    {
      key: 'designation',
      label: 'Job Title',
      type: 'text',
      placeholder: 'Software Engineer',
      section: 'personal'
    },
    {
      key: 'company',
      label: 'Company',
      type: 'text',
      placeholder: 'Tech Corp',
      section: 'personal'
    },
    {
      key: 'department',
      label: 'Department',
      type: 'text',
      placeholder: 'Engineering',
      section: 'personal'
    },
    {
      key: 'summary',
      label: 'Bio/Summary',
      type: 'textarea',
      placeholder: 'Tell us about yourself...',
      section: 'personal'
    },

    // Contact Information
    {
      key: 'phone_v2',
      label: 'Phone Numbers',
      type: 'array',
      section: 'contact'
    },
    {
      key: 'email_v2',
      label: 'Email Addresses',
      type: 'array',
      section: 'contact'
    },
    {
      key: 'website_v2',
      label: 'Websites',
      type: 'array',
      section: 'contact'
    },
    {
      key: 'address_v2',
      label: 'Address',
      type: 'textarea',
      placeholder: '123 Main St\nCity, State 12345',
      section: 'contact'
    },

    // Social Links
    {
      key: 'social_links.linkedin',
      label: 'LinkedIn',
      type: 'url',
      placeholder: 'https://linkedin.com/in/username',
      section: 'social'
    },
    {
      key: 'social_links.twitter',
      label: 'Twitter',
      type: 'url',
      placeholder: 'https://twitter.com/username',
      section: 'social'
    },
    {
      key: 'social_links.github',
      label: 'GitHub',
      type: 'url',
      placeholder: 'https://github.com/username',
      section: 'social'
    },
    {
      key: 'social_links.instagram',
      label: 'Instagram',
      type: 'url',
      placeholder: 'https://instagram.com/username',
      section: 'social'
    },

    // Customization
    {
      key: 'customizations.background_color',
      label: 'Background Color',
      type: 'color',
      defaultValue: '#ffffff',
      section: 'customization'
    },
    {
      key: 'customizations.icon_color',
      label: 'Text/Icon Color',
      type: 'color',
      defaultValue: '#333333',
      section: 'customization'
    },
    {
      key: 'customizations.button_color',
      label: 'Button Color',
      type: 'color',
      defaultValue: '#007bff',
      section: 'customization'
    },
    {
      key: 'customizations.font_style',
      label: 'Font Family',
      type: 'select',
      options: [
        { value: 'Work Sans', label: 'Work Sans' },
        { value: 'Inter', label: 'Inter' },
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Open Sans', label: 'Open Sans' },
        { value: 'Poppins', label: 'Poppins' }
      ],
      defaultValue: 'Work Sans',
      section: 'customization'
    }
  ];

  return {
    sections: ['personal', 'contact', 'social', 'customization'],
    fields
  };
}

/**
 * Get available templates
 */
export function getAvailableTemplates(): Template[] {
  return [
    {
      id: 'layout-1',
      name: 'Professional Card',
      description: 'Clean, professional design with circular profile image',
      component: 'uniqode-card-layout-1',
      schema: generateFormSchema(),
      features: ['Circular Profile', 'Contact Icons', 'Social Links', 'Clean Layout'],
      category: 'professional'
    },
    {
      id: 'layout-2',
      name: 'Modern Card',
      description: 'Modern design with geometric elements (Coming Soon)',
      component: 'uniqode-card-layout-2',
      schema: generateFormSchema(),
      features: ['Geometric Design', 'Modern Typography', 'Color Gradients'],
      category: 'modern'
    },
    {
      id: 'layout-4',
      name: 'Creative Card',
      description: 'Creative layout with unique profile section (Coming Soon)',
      component: 'uniqode-card-layout-4',
      schema: generateFormSchema(),
      features: ['Creative Layout', 'Unique Profile', 'Custom Styling'],
      category: 'creative'
    }
  ];
}

/**
 * Get data presets for testing
 */
export function getDataPresets(): DataPreset[] {
  return [
    {
      id: 'complete-profile',
      name: 'Complete Profile',
      description: 'Full profile with all fields filled',
      category: 'complete',
      data: {
        first_name: 'John',
        last_name: 'Doe',
        prefix: 'Dr.',
        suffix: 'PhD',
        pronouns_v2: 'he/him',
        designation: 'Senior Software Engineer',
        company: 'Tech Innovations Inc.',
        department: 'Engineering',
        summary: 'Passionate software engineer with 8+ years of experience building scalable web applications and leading development teams. Specialized in React, Node.js, and cloud architecture.',
        phone_v2: [
          { value: '+1 (555) 123-4567', label: 'Mobile' },
          { value: '+1 (555) 987-6543', label: 'Work' }
        ],
        email_v2: [
          { value: 'john.doe@techinnov.com', label: 'Work' },
          { value: 'john@example.com', label: 'Personal' }
        ],
        website_v2: [
          { value: 'https://johndoe.dev', label: 'Portfolio' },
          { value: 'https://techinnov.com', label: 'Company' }
        ],
        address_v2: '123 Tech Street, Suite 456\nSan Francisco, CA 94105\nUnited States',
        social_links: {
          linkedin: 'https://linkedin.com/in/johndoe',
          twitter: 'https://twitter.com/johndoe',
          github: 'https://github.com/johndoe',
          instagram: 'https://instagram.com/johndoe'
        },
        customizations: {
          background_color: '#f8f9fa',
          icon_color: '#495057',
          button_color: '#007bff',
          font_style: 'Work Sans'
        } as any
      }
    },
    {
      id: 'minimal-profile',
      name: 'Minimal Profile',
      description: 'Basic profile with essential information only',
      category: 'minimal',
      data: {
        first_name: 'Jane',
        last_name: 'Smith',
        designation: 'Designer',
        company: 'Creative Studio',
        email_v2: [
          { value: 'jane@creative.com', label: 'Work' }
        ],
        phone_v2: [
          { value: '+1 (555) 555-5555', label: 'Mobile' }
        ],
        customizations: {
          background_color: '#ffffff',
          icon_color: '#333333',
          button_color: '#28a745',
          font_style: 'Inter'
        } as any
      }
    },
    {
      id: 'edge-case',
      name: 'Edge Case Testing',
      description: 'Long names, special characters, and edge cases',
      category: 'edge-case',
      data: {
        first_name: 'María José',
        last_name: 'García-Rodríguez',
        designation: 'Senior Full-Stack Developer & Technical Lead',
        company: 'Международная Технологическая Компания',
        summary: 'Very long bio text that should test the layout limits and see how the component handles extensive content that might overflow or cause layout issues in various screen sizes and devices.',
        phone_v2: [
          { value: '+34 123 456 789', label: 'España' },
          { value: '+1 (555) 999-8888', label: 'USA Office' }
        ],
        email_v2: [
          { value: 'maria.garcia-rodriguez@very-long-company-name.international', label: 'Work' }
        ],
        customizations: {
          background_color: '#ff6b6b',
          icon_color: '#ffffff',
          button_color: '#4ecdc4',
          font_style: 'Poppins'
        } as any
      }
    }
  ];
}

/**
 * Deep merge objects
 */
export function deepMerge(target: any, source: any): any {
  const output = Object.assign({}, target);
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target))
          Object.assign(output, { [key]: source[key] });
        else
          output[key] = deepMerge(target[key], source[key]);
      } else {
        Object.assign(output, { [key]: source[key] });
      }
    });
  }
  return output;
}

function isObject(item: any): boolean {
  return item && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Set nested object property by path
 */
export function setNestedProperty(obj: any, path: string, value: any): any {
  const keys = path.split('.');
  const result = { ...obj };
  let current = result;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {};
    } else {
      current[key] = { ...current[key] };
    }
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
  return result;
}

/**
 * Get nested object property by path
 */
export function getNestedProperty(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(date);
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/.test(url);
  }
}

export default {
  cn,
  generateFormSchema,
  getAvailableTemplates,
  getDataPresets,
  deepMerge,
  setNestedProperty,
  getNestedProperty,
  formatTimestamp,
  isValidEmail,
  isValidUrl
};
