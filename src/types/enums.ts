/**
 * Enums for Uniqode Card Templates
 * Aligned with Angular/Django backend models
 */

/**
 * Product state enum
 * Represents the lifecycle state of a digital business card
 */
export enum PRODUCT_STATE {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  ARCHIVED = 'archived',
  DRAFT = 'draft'
}

/**
 * Lead collection type
 * Determines when lead information is collected
 */
export enum LEAD_COLLECT_TYPE {
  SHARE_FIRST = 'share_first',  // User shares contact first, then lead form appears
  COLLECT_FIRST = 'collect_first'  // Lead form appears first before sharing
}

/**
 * Background type for card customization
 */
export enum DBC_BACKGROUND_TYPE {
  Color = 'color',
  Image = 'image',
  Gradient = 'gradient'
}

/**
 * Contact detail types for ordering
 */
export enum CONTACT_DETAIL {
  PHONE_V2 = 'phone_v2',
  EMAIL_V2 = 'email_v2',
  WEBSITE_V2 = 'website_v2',
  CUSTOM_FIELDS = 'custom_fields'
}

/**
 * Text field validation states
 */
export enum TEXT_FIELD_VALIDATIONS {
  VALID = 'valid',
  ERROR = 'error',
  WARNING = 'warning'
}

/**
 * Contact info type (used in contact_info_ordering)
 */
export type contactInfoType = 
  | CONTACT_DETAIL.PHONE_V2 
  | CONTACT_DETAIL.EMAIL_V2 
  | CONTACT_DETAIL.WEBSITE_V2 
  | CONTACT_DETAIL.CUSTOM_FIELDS;

/**
 * Default contact info ordering
 */
export const default_contact_info_ordering: Record<string, contactInfoType> = {
  '0': CONTACT_DETAIL.PHONE_V2,
  '1': CONTACT_DETAIL.EMAIL_V2,
  '2': CONTACT_DETAIL.WEBSITE_V2,
  '3': CONTACT_DETAIL.CUSTOM_FIELDS
};

