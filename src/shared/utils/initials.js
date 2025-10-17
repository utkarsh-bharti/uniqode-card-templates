/**
 * Initials generation utility
 * Based on your existing getInitials logic from templates
 */

/**
 * Extract initials from first and last name
 * @param {string} firstName - First name
 * @param {string} lastName - Last name
 * @returns {string} Initials (max 2 characters)
 */
export function getInitials(firstName = '', lastName = '') {
  // Clean and validate inputs
  const first = (firstName || '').toString().trim();
  const last = (lastName || '').toString().trim();
  
  if (!first && !last) {
    return 'UN'; // Default for "Uniqode"
  }
  
  // Get first character of each name
  const firstInitial = first.charAt(0).toUpperCase();
  const lastInitial = last.charAt(0).toUpperCase();
  
  // Return combined initials (max 2 chars)
  return (firstInitial + lastInitial).substring(0, 2);
}

/**
 * Extract initials from full name string
 * @param {string} fullName - Full name string
 * @returns {string} Initials
 */
export function getInitialsFromFullName(fullName = '') {
  const nameParts = fullName.toString().trim().split(/\s+/);
  
  if (nameParts.length === 0 || nameParts[0] === '') {
    return 'UN';
  }
  
  if (nameParts.length === 1) {
    // Single name - take first 2 characters
    return nameParts[0].substring(0, 2).toUpperCase();
  }
  
  // Multiple names - take first character of first and last
  const firstInitial = nameParts[0].charAt(0).toUpperCase();
  const lastInitial = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  
  return firstInitial + lastInitial;
}

/**
 * Get initials with fallback to company name if personal name not available
 * @param {Object} cardData - Card data object
 * @returns {string} Initials
 */
export function getInitialsWithFallback(cardData = {}) {
  const { first_name, last_name, company, name } = cardData;
  
  // Try personal name first
  if (first_name || last_name) {
    return getInitials(first_name, last_name);
  }
  
  // Try full name field
  if (name) {
    return getInitialsFromFullName(name);
  }
  
  // Fallback to company name
  if (company) {
    return getInitialsFromFullName(company);
  }
  
  return 'UN';
}

/**
 * Generate background color for initials based on name
 * Creates consistent colors for the same name
 * @param {string} name - Name to generate color for
 * @returns {string} Hex color code
 */
export function getInitialsBackgroundColor(name = '') {
  if (!name) return '#007bff';
  
  // Simple hash function to generate consistent color
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  // Convert to HSL for better color distribution
  const hue = Math.abs(hash) % 360;
  const saturation = 65; // Fixed saturation for consistency
  const lightness = 50;  // Fixed lightness for readability
  
  return hslToHex(hue, saturation, lightness);
}

/**
 * Convert HSL to Hex color
 * @param {number} h - Hue (0-360)
 * @param {number} s - Saturation (0-100)
 * @param {number} l - Lightness (0-100)
 * @returns {string} Hex color code
 */
function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default {
  getInitials,
  getInitialsFromFullName,
  getInitialsWithFallback,
  getInitialsBackgroundColor
};
