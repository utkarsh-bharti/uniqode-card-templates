import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { 
  DevWorkspaceState, 
  CardData, 
  ComponentEvent, 
  FormSection,
  DataPreset 
} from '../types';

interface DevWorkspaceStore extends DevWorkspaceState {
  // Actions
  setSelectedTemplate: (templateId: string) => void;
  updateCardData: (data: Partial<CardData>) => void;
  setCardData: (data: CardData) => void;
  setPreviewMode: (mode: 'desktop' | 'mobile' | 'tablet') => void;
  toggleSidebar: () => void;
  setActiveSection: (section: FormSection) => void;
  addEvent: (event: Omit<ComponentEvent, 'id' | 'timestamp'>) => void;
  clearEvents: () => void;
  loadPreset: (preset: DataPreset) => void;
  resetData: () => void;
}

const defaultCardData: CardData = {
  first_name: 'John',
  last_name: 'Doe',
  designation: 'Software Engineer',
  company: 'Tech Innovations Inc.',
  department: 'Engineering',
  summary: 'Passionate software engineer with 8+ years of experience building scalable web applications and leading development teams.',
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
  custom_fields: [
    { value: 'Available for consulting', label: 'Note' }
  ],
  address_v2: '123 Tech Street, Suite 456\nSan Francisco, CA 94105\nUnited States',
  social_links: {
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    github: 'https://github.com/johndoe',
    instagram: 'https://instagram.com/johndoe'
  },
  logo_url: 'https://via.placeholder.com/200x80/007bff/ffffff?text=LOGO',
  user_image_url: 'https://via.placeholder.com/200x200/28a745/ffffff?text=JD',
  customizations: {
    background_color: '#f8f9fa',
    user_info_color: '#FFFFFF',
    secondary_color: '#000000',
    font_style: 'Work Sans',
    title_font_size: 24,
    font_type: 'google',
    custom_font_url: '',
    custom_font_style: '',
    profile_info: 'Bold',
    company_details: 'Regular',
    contact_details: 'Medium',
    button: 'Bold',
    typography: {
      font_type: 'google',
      font_family: 'Work Sans',
      personal_info: {
        google_font_style: 'Regular',
        google_font_colour: '#212529',
        google_font_size: 24,
      },
      company_details: {
        google_font_style: 'Regular',
        google_font_colour: '#6c757d',
        google_font_size: 16,
      },
      contact_details: {
        google_font_style: 'Regular',
        google_font_colour: '#495057',
        google_font_size: 14,
      },
      button: {
        google_font_style: 'Regular',
        google_font_colour: '#FFFFFF',
        google_font_size: 16,
      },
      bio: {
        google_font_style: 'Regular',
        google_font_colour: '#6c757d',
        google_font_size: 14,
      }
    },
    button_color: '#007bff',
    icon_color: '#495057',
    background: {
      type: 'color',
      value: '#FFFFFF'
    }
  },
  contact_info_ordering: ['phone_v2', 'email_v2', 'website_v2', 'custom_fields']
};

export const useDevWorkspaceStore = create<DevWorkspaceStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        selectedTemplate: 'layout-1',
        cardData: defaultCardData,
        previewMode: 'desktop',
        sidebarOpen: true,
        activeSection: 'personal',
        events: [],

        // Actions
        setSelectedTemplate: (templateId) =>
          set({ selectedTemplate: templateId }, false, 'setSelectedTemplate'),

        updateCardData: (data) =>
          set(
            (state) => ({
              cardData: { ...state.cardData, ...data }
            }),
            false,
            'updateCardData'
          ),

        setCardData: (data) =>
          set({ cardData: data }, false, 'setCardData'),

        setPreviewMode: (mode) =>
          set({ previewMode: mode }, false, 'setPreviewMode'),

        toggleSidebar: () =>
          set((state) => ({ sidebarOpen: !state.sidebarOpen }), false, 'toggleSidebar'),

        setActiveSection: (section) =>
          set({ activeSection: section }, false, 'setActiveSection'),

        addEvent: (event) =>
          set(
            (state) => ({
              events: [
                {
                  ...event,
                  id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  timestamp: new Date()
                },
                ...state.events.slice(0, 49) // Keep only last 50 events
              ]
            }),
            false,
            'addEvent'
          ),

        clearEvents: () =>
          set({ events: [] }, false, 'clearEvents'),

        loadPreset: (preset) =>
          set({ cardData: preset.data }, false, 'loadPreset'),

        resetData: () =>
          set({ cardData: defaultCardData }, false, 'resetData'),
      }),
      {
        name: 'dev-workspace-storage',
        partialize: (state) => ({
          selectedTemplate: state.selectedTemplate,
          cardData: state.cardData,
          previewMode: state.previewMode,
          sidebarOpen: state.sidebarOpen,
          activeSection: state.activeSection
        })
      }
    ),
    { name: 'DevWorkspaceStore' }
  )
);

export default useDevWorkspaceStore;
