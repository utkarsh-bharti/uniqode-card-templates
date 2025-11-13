/**
 * Uniqode Card Templates Library
 * Universal card layout components for web applications
 * 
 * @version 1.0.0
 * @author Uniqode Team
 */

// Import component
import { CardLayout12 } from './components/card-layout-12/CardLayout12.js';

// Import base class
import { BaseCard } from './components/base/BaseCard.js';

// Import utilities
import * as ColorUtils from './shared/utils/colors.js';
import * as InitialsUtils from './shared/utils/initials.js';
import * as ValidationUtils from './shared/utils/validation.js';

// Library metadata
export const LIBRARY_INFO = {
  name: 'Uniqode Card Templates',
  version: '1.0.0',
  description: 'Universal card layout components for web applications',
  author: 'Uniqode Team',
  license: 'MIT'
};

// Component exports
export {
  BaseCard,
  CardLayout12
};

// Utility exports
export {
  ColorUtils,
  InitialsUtils,
  ValidationUtils
};

// Convenience exports for common utilities
export const {
  hexToRGBA,
  isValidColor,
  getContrastColor
} = ColorUtils;

export const {
  getInitials,
  getInitialsWithFallback
} = InitialsUtils;

export const {
  validateCardData,
  sanitizeCardData,
  getDefaultCardData
} = ValidationUtils;

// Auto-registration flag (can be disabled by setting window.UNIQODE_AUTO_REGISTER = false)
const shouldAutoRegister = typeof window !== 'undefined' && 
  (window.UNIQODE_AUTO_REGISTER !== false);

if (shouldAutoRegister) {
  console.log(`🎉 ${LIBRARY_INFO.name} v${LIBRARY_INFO.version} loaded`);
  console.log('📦 Available components:', [
    'uniqode-layout-12'
  ]);
}

// Global library object for non-module environments
if (typeof window !== 'undefined') {
  window.UniqodeCardTemplates = {
    ...LIBRARY_INFO,
    components: {
      BaseCard,
      CardLayout12
    },
    utils: {
      ColorUtils,
      InitialsUtils,
      ValidationUtils
    }
  };
}

// Default export
export default {
  ...LIBRARY_INFO,
  components: {
    BaseCard,
    CardLayout12
  },
  utils: {
    ColorUtils,
    InitialsUtils,
    ValidationUtils
  }
};
