/**
 * Card data validation utilities
 * Ensures data integrity for all card components
 */

/**
 * Validate card data structure
 * @param {Object} data - Card data to validate
 * @returns {Object} Validation result with isValid boolean and errors array
 */
export function validateCardData(data) {
  const errors = [];
  
  // Basic type check
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    errors.push('Card data must be a valid object');
    return { isValid: false, errors };
  }
  
  // Name validation - at least one name field should be present
  if (!data.first_name && !data.last_name && !data.name) {
    errors.push('At least one name field (first_name, last_name, or name) is required');
  }
  
  // Validate customizations structure
  if (data.customizations && typeof data.customizations !== 'object') {
    errors.push('Customizations must be an object');
  }
  
  // Validate contact arrays
  const contactFields = ['phone_v2', 'email_v2', 'website_v2', 'custom_fields'];
  contactFields.forEach(field => {
    if (data[field] && !Array.isArray(data[field])) {
      errors.push(`${field} must be an array`);
    }
    
    // Validate contact items structure
    if (Array.isArray(data[field])) {
      data[field].forEach((contact, index) => {
        if (contact && typeof contact === 'object') {
          if (!contact.value) {
            errors.push(`${field}[${index}] must have a value property`);
          }
        } else if (contact !== null && contact !== undefined) {
          errors.push(`${field}[${index}] must be an object or null`);
        }
      });
    }
  });
  
  // Validate social links structure
  if (data.social_links && typeof data.social_links !== 'object') {
    errors.push('Social links must be an object');
  }
  
  // Validate color codes in customizations
  if (data.customizations) {
    const colorFields = ['background_color', 'icon_color', 'button_color'];
    colorFields.forEach(field => {
      const color = data.customizations[field];
      if (color && !isValidColor(color)) {
        errors.push(`Invalid color format for ${field}: ${color}`);
      }
    });
  }
  
  // Validate URLs
  const urlFields = ['logo_url', 'user_image_url', 'address_url'];
  urlFields.forEach(field => {
    const url = data[field];
    if (url && !isValidUrl(url)) {
      errors.push(`Invalid URL format for ${field}: ${url}`);
    }
  });
  
  // Validate email format in email_v2 array
  if (Array.isArray(data.email_v2)) {
    data.email_v2.forEach((email, index) => {
      if (email && email.value && !isValidEmail(email.value)) {
        errors.push(`Invalid email format in email_v2[${index}]: ${email.value}`);
      }
    });
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate color format (hex, rgb, rgba, hsl, named colors)
 * @param {string} color - Color value to validate
 * @returns {boolean} True if valid color
 */
export function isValidColor(color) {
  if (!color || typeof color !== 'string') return false;
  
  // Hex colors
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(color)) return true;
  
  // RGB/RGBA colors
  if (/^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+)?\s*\)$/.test(color)) return true;
  
  // HSL/HSLA colors
  if (/^hsla?\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*(,\s*[\d.]+)?\s*\)$/.test(color)) return true;
  
  // Named colors (basic set)
  const namedColors = [
    'black', 'white', 'red', 'green', 'blue', 'yellow', 'orange', 'purple',
    'pink', 'brown', 'gray', 'grey', 'cyan', 'magenta', 'lime', 'navy',
    'maroon', 'olive', 'teal', 'silver', 'aqua', 'fuchsia', 'transparent'
  ];
  
  return namedColors.includes(color.toLowerCase());
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid URL
 */
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  
  try {
    new URL(url);
    return true;
  } catch {
    // Check for relative URLs or URLs without protocol
    return /^(https?:\/\/|\/\/|\/|\.\/)/.test(url) || 
           /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9]\.[a-zA-Z]{2,}/.test(url);
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  
  // Basic email regex - not perfect but covers most cases
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid phone
 */
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  
  // Remove all non-digit characters except + at the beginning
  const cleaned = phone.replace(/[^\d+]/g, '');
  
  // Check if it's a reasonable phone number length (7-15 digits)
  const digitCount = cleaned.replace(/^\+/, '').length;
  return digitCount >= 7 && digitCount <= 15;
}

/**
 * Sanitize card data by removing potentially harmful content
 * @param {Object} data - Card data to sanitize
 * @returns {Object} Sanitized card data
 */
export function sanitizeCardData(data) {
  if (!data || typeof data !== 'object') return {};
  
  const sanitized = JSON.parse(JSON.stringify(data)); // Deep clone
  
  // Remove script tags and javascript: URLs
  const sanitizeString = (str) => {
    if (typeof str !== 'string') return str;
    return str
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
  };
  
  // Recursively sanitize all string values
  const sanitizeObject = (obj) => {
    if (typeof obj === 'string') {
      return sanitizeString(obj);
    } else if (Array.isArray(obj)) {
      return obj.map(sanitizeObject);
    } else if (obj && typeof obj === 'object') {
      const sanitizedObj = {};
      Object.keys(obj).forEach(key => {
        sanitizedObj[key] = sanitizeObject(obj[key]);
      });
      return sanitizedObj;
    }
    return obj;
  };
  
  return sanitizeObject(sanitized);
}

/**
 * Get default card data structure
 * @returns {Object} Default card data
 */
export function getDefaultCardData() {
  return {
    first_name: '',
    last_name: '',
    designation: '',
    company: '',
    department: '',
    summary: '',
    phone_v2: [],
    email_v2: [],
    website_v2: [],
    custom_fields: [],
    address_v2: '',
    social_links: {},
    logo_url: '',
    user_image_url: '',
    customizations: {
      background_color: '#ffffff',
      icon_color: '#333333',
      button_color: '#007bff',
      font_style: 'Work Sans'
    },
    contact_info_ordering: ['phone_v2', 'email_v2', 'website_v2', 'custom_fields']
  };
}

export default {
  validateCardData,
  isValidColor,
  isValidUrl,
  isValidEmail,
  isValidPhone,
  sanitizeCardData,
  getDefaultCardData
};
