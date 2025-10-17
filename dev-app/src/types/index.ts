// Core card data types based on your DigitalBusinessCard model
export interface ContactItem {
  value: string;
  label: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  tiktok?: string;
  snapchat?: string;
  whatsapp?: string;
  telegram?: string;
  vimeo?: string;
  youtube?: string;
  wistia?: string;
  twitch?: string;
  discord?: string;
  pinterest?: string;
  yelp?: string;
  paypal?: string;
  venmo?: string;
  cashapp?: string;
  calendly?: string;
  shopify?: string;
  github?: string;
  dribbble?: string;
  behance?: string;
  custom_url?: string;
}

export interface Typography {
  font_type: 'google' | 'custom';
  font_family: string;
  personal_info: {
    google_font_style: string;
    google_font_colour: string;
    google_font_size: number;
  };
  company_details: {
    google_font_style: string;
    google_font_colour: string;
    google_font_size: number;
  };
  contact_details: {
    google_font_style: string;
    google_font_colour: string;
    google_font_size: number;
  };
  button: {
    google_font_style: string;
    google_font_colour: string;
    google_font_size: number;
  };
  bio: {
    google_font_style: string;
    google_font_colour: string;
    google_font_size: number;
  };
}

export interface Customizations {
  background_color: string;
  user_info_color: string;
  secondary_color: string;
  font_style: string;
  title_font_size: number;
  font_type: string;
  custom_font_url: string;
  custom_font_style: string;
  profile_info: string;
  company_details: string;
  contact_details: string;
  button: string;
  typography: Typography;
  button_color: string;
  icon_color: string;
  background: {
    type: 'color' | 'image';
    value: string;
  };
}

export interface CardData {
  // Personal Information
  id?: number;
  first_name?: string;
  last_name?: string;
  prefix?: string;
  suffix?: string;
  pronouns_v2?: string;
  designation?: string;
  company?: string;
  department?: string;
  summary?: string;
  name?: string;

  // Contact Information
  phone_v2?: ContactItem[];
  email_v2?: ContactItem[];
  website_v2?: ContactItem[];
  custom_fields?: ContactItem[];
  address_v2?: string;

  // Legacy contact fields
  phone?: {
    mobile: string;
    work: string;
    home: string;
  };
  email?: string;
  website?: string;

  // Visual Assets
  logo_url?: string;
  logo_size?: number;
  user_image_url?: string;
  social_links?: SocialLinks;

  // Customization
  customizations?: Customizations;

  // Configuration
  contact_info_ordering?: string[];
  layout?: string;
  autodownload_v2?: boolean;

  // Advanced Features
  lead_collection?: boolean;
  branding_footer?: boolean;
  location_enabled?: boolean;
  views?: number;
  saves?: number;
}

// Form field types
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'tel' 
  | 'url' 
  | 'textarea' 
  | 'color' 
  | 'number' 
  | 'select' 
  | 'checkbox' 
  | 'array' 
  | 'object';

export interface FormField {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  validation?: {
    pattern?: string;
    message?: string;
  };
  options?: { value: string; label: string }[];
  defaultValue?: any;
  section: FormSection;
}

export type FormSection = 
  | 'personal' 
  | 'contact' 
  | 'social' 
  | 'customization' 
  | 'advanced';

export interface FormSchema {
  sections: FormSection[];
  fields: FormField[];
}

// Template types
export interface Template {
  id: string;
  name: string;
  description: string;
  component: string; // Web component tag name
  schema: FormSchema;
  previewImage?: string;
  features: string[];
  category: 'professional' | 'creative' | 'modern' | 'minimal';
}

// Development workspace types
export interface DevWorkspaceState {
  selectedTemplate: string;
  cardData: CardData;
  previewMode: 'desktop' | 'mobile' | 'tablet';
  sidebarOpen: boolean;
  activeSection: FormSection;
  events: ComponentEvent[];
}

export interface ComponentEvent {
  id: string;
  timestamp: Date;
  type: 'card-share' | 'contact-click' | 'lead-collect';
  data: any;
  templateId: string;
}

// Preset data types
export interface DataPreset {
  id: string;
  name: string;
  description: string;
  data: CardData;
  category: 'complete' | 'minimal' | 'edge-case';
}

export default CardData;
