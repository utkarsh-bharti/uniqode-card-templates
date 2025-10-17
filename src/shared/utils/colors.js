/**
 * Color utility functions
 * Based on your existing hexToRGBA function from layout templates
 */

/**
 * Check if string is a valid hex color code
 * @param {string} hex - Hex color string
 * @returns {boolean} True if valid hex color
 */
export function isHexColorCode(hex) {
  if (!hex || typeof hex !== 'string') return false;
  return /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex);
}

/**
 * Convert hex color to RGBA with opacity
 * Based on your existing hexToRGBA function
 * @param {string} hex - Hex color code
 * @param {number} opacity - Opacity value (0-1)
 * @returns {string} RGBA color string
 */
export function hexToRGBA(hex, opacity = 0.2) {
  if (!hex || typeof hex !== 'string') {
    return 'rgba(0, 0, 0, 0)';
  }
  
  hex = hex.trim();
  
  if (!isHexColorCode(hex)) {
    // If not a valid hex, return original value (might be named color, rgba, etc.)
    return hex;
  }
  
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Convert 3-digit hex to 6-digit
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  // Parse RGB values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Ensure opacity is within valid range
  opacity = Math.max(0, Math.min(1, opacity));
  
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

/**
 * Convert hex to RGB object
 * @param {string} hex - Hex color code
 * @returns {Object} RGB object with r, g, b properties
 */
export function hexToRGB(hex) {
  if (!isHexColorCode(hex)) {
    return { r: 0, g: 0, b: 0 };
  }
  
  hex = hex.replace('#', '');
  
  if (hex.length === 3) {
    hex = hex.split('').map(char => char + char).join('');
  }
  
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16)
  };
}

/**
 * Get contrasting text color (black or white) for a background color
 * @param {string} backgroundColor - Background hex color
 * @returns {string} '#000000' or '#ffffff'
 */
export function getContrastColor(backgroundColor) {
  const { r, g, b } = hexToRGB(backgroundColor);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Lighten or darken a hex color
 * @param {string} hex - Hex color code
 * @param {number} amount - Amount to lighten (positive) or darken (negative)
 * @returns {string} Modified hex color
 */
export function adjustBrightness(hex, amount) {
  if (!isHexColorCode(hex)) return hex;
  
  const { r, g, b } = hexToRGB(hex);
  
  const adjust = (value) => {
    const adjusted = value + amount;
    return Math.max(0, Math.min(255, adjusted));
  };
  
  const newR = adjust(r).toString(16).padStart(2, '0');
  const newG = adjust(g).toString(16).padStart(2, '0');
  const newB = adjust(b).toString(16).padStart(2, '0');
  
  return `#${newR}${newG}${newB}`;
}

export default {
  isHexColorCode,
  hexToRGBA,
  hexToRGB,
  getContrastColor,
  adjustBrightness
};
