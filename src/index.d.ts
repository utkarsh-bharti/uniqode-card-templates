// Main TypeScript declarations for @uniqode/card-templates
export * from './types/index';

// Re-export types for easier access
export type {
  CardData,
  ContactInfo,
  SocialLinks,
  Typography,
  Background,
  Customizations,
  BaseTemplateProps,
  Layout1Props,
  Layout2Props,
  Layout3Props,
  LayoutComprehensiveProps,
  ContactClickEvent,
  ShareEvent,
  LeadCollectEvent,
  CardEvent,
  UniqodeCardTemplatesLibrary
} from './types/index';

// Component classes (available at runtime)
declare const CardLayout1: any;
declare const CardLayout2: any;
declare const CardLayout3: any;
declare const CardLayout4: any;
declare const CardLayout5: any;
declare const CardLayout6: any;
declare const CardLayout7: any;
declare const CardLayout8: any;
declare const CardLayout9: any;
declare const CardLayout11: any;
declare const CardLayoutComprehensive: any;
declare const BaseCard: any;

// Utility modules
declare const ColorUtils: any;
declare const InitialsUtils: any;
declare const ValidationUtils: any;

// Library info
declare const LIBRARY_INFO: {
  name: string;
  version: string;
  description: string;
  author: string;
};

// Main library export
declare const UniqodeCardTemplates: {
  name: string;
  version: string;
  description: string;
  author: string;
  components: {
    BaseCard: any;
    CardLayout1: any;
    CardLayout2: any;
    CardLayout3: any;
    CardLayout4: any;
    CardLayout5: any;
    CardLayout6: any;
    CardLayout7: any;
    CardLayout8: any;
    CardLayout9: any;
    CardLayout11: any;
    CardLayoutComprehensive: any;
  };
  utils: {
    ColorUtils: any;
    InitialsUtils: any;
    ValidationUtils: any;
  };
};

export default UniqodeCardTemplates;
