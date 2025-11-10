/**
 * Uniqode Card Templates Library
 * Universal card layout components for web applications
 * 
 * @version 1.0.0
 * @author Uniqode Team
 */

// Import all component classes
import { CardLayout1 } from './components/card-layout-1/CardLayout1.js';
import { CardLayout2 } from './components/card-layout-2/CardLayout2.js';
import { CardLayout3 } from './components/card-layout-3/CardLayout3.js';
import { CardLayout4 } from './components/card-layout-4/CardLayout4.js';
import { CardLayout5 } from './components/card-layout-5/CardLayout5.js';
import { CardLayout6 } from './components/card-layout-6/CardLayout6.js';
import { CardLayout7 } from './components/card-layout-7/CardLayout7.js';
import { CardLayout8 } from './components/card-layout-8/CardLayout8.js';
import { CardLayout9 } from './components/card-layout-9/CardLayout9.js';
import { CardLayout11 } from './components/card-layout-11/CardLayout11.js';
import { CardLayout12 } from './components/card-layout-12/CardLayout12.js';
import { CardLayoutComprehensive } from './components/card-layout-comprehensive/CardLayoutComprehensive.js';

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
  CardLayout2,
  CardLayout3,
  CardLayout4,
  CardLayout5,
  CardLayout6,
  CardLayout7,
  CardLayout8,
  CardLayout9,
  CardLayout11,
  CardLayout12,
  CardLayoutComprehensive
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
    'uniqode-layout-1',
    'uniqode-layout-2',
    'uniqode-layout-3',
    'uniqode-layout-4',
    'uniqode-layout-5',
    'uniqode-layout-6',
    'uniqode-layout-7',
    'uniqode-layout-8',
    'uniqode-layout-9',
    'uniqode-layout-11',
    'uniqode-layout-12',
    'uniqode-layout-comprehensive'
  ]);
}

// Global library object for non-module environments
if (typeof window !== 'undefined') {
  window.UniqodeCardTemplates = {
    ...LIBRARY_INFO,
    components: {
      BaseCard,
      CardLayout1,
      CardLayout2,
      CardLayout3,
      CardLayout4,
      CardLayout5,
      CardLayout6,
      CardLayout7,
      CardLayout8,
      CardLayout9,
      CardLayout11,
      CardLayout12,
      CardLayoutComprehensive
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
    CardLayout1,
    CardLayout2,
    CardLayout3,
    CardLayout4,
    CardLayout5,
    CardLayout6,
    CardLayout7,
    CardLayout8,
    CardLayout9,
    CardLayout11,
    CardLayout12,
    CardLayoutComprehensive
  },
  utils: {
    ColorUtils,
    InitialsUtils,
    ValidationUtils
  }
};
