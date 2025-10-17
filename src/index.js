/**
 * Uniqode Card Templates Library
 * Universal card layout components for web applications
 * 
 * @version 1.0.0
 * @author Uniqode Team
 */

// Import all component classes
import { CardLayout1 } from './components/card-layout-1/CardLayout1.js';
// import { CardLayout2 } from './components/card-layout-2/CardLayout2.js';
// import { CardLayout4 } from './components/card-layout-4/CardLayout4.js';
// import { CardLayout5 } from './components/card-layout-5/CardLayout5.js';
// import { CardLayout6 } from './components/card-layout-6/CardLayout6.js';

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
  CardLayout1,
  // CardLayout2,
  // CardLayout4,
  // CardLayout5,
  // CardLayout6
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
    'uniqode-card-layout-1'
    // 'uniqode-card-layout-2',
    // 'uniqode-card-layout-4',
    // 'uniqode-card-layout-5',
    // 'uniqode-card-layout-6'
  ]);
}

// Global library object for non-module environments
if (typeof window !== 'undefined') {
  window.UniqodeCardTemplates = {
    ...LIBRARY_INFO,
    components: {
      BaseCard,
      CardLayout1,
      // CardLayout2,
      // CardLayout4,
      // CardLayout5,
      // CardLayout6
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
    CardLayout1
  },
  utils: {
    ColorUtils,
    InitialsUtils,
    ValidationUtils
  }
};
