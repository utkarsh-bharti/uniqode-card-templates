import React from 'react';
import { 
  Bars3Icon, 
  XMarkIcon,
  UserIcon,
  PhoneIcon,
  GlobeAltIcon,
  PaintBrushIcon,
  ClockIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import FormBuilder from '../FormBuilder';
import TemplatePreview from '../TemplatePreview';
import { useDevWorkspaceStore } from '../../stores/devWorkspaceStore';
import { getAvailableTemplates, getDataPresets, formatTimestamp, cn } from '../../utils';
import type { FormSection, ComponentEvent } from '../../types';

const sectionConfig = {
  personal: {
    icon: UserIcon,
    label: 'Personal Info',
    description: 'Name, job title, company, and bio'
  },
  contact: {
    icon: PhoneIcon,
    label: 'Contact Info',
    description: 'Phone, email, website, and address'
  },
  social: {
    icon: GlobeAltIcon,
    label: 'Social Links',
    description: 'LinkedIn, Twitter, GitHub, and more'
  },
  customization: {
    icon: PaintBrushIcon,
    label: 'Customization',
    description: 'Colors, fonts, and styling'
  }
};

const EventsPanel: React.FC<{
  events: ComponentEvent[];
  onClear: () => void;
}> = ({ events, onClear }) => {
  return (
    <div className="bg-gray-900 text-white p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ClockIcon className="w-4 h-4" />
          <h3 className="text-sm font-medium">Event Log</h3>
        </div>
        <button
          onClick={onClear}
          className="p-1 text-gray-400 hover:text-white transition-colors"
          title="Clear events"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
      
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {events.length === 0 ? (
          <div className="text-gray-400 text-xs italic">
            No events yet. Interact with the template to see events here.
          </div>
        ) : (
          events.slice(0, 10).map((event) => (
            <div key={event.id} className="text-xs">
              <div className="flex items-center justify-between">
                <span className="text-green-400 font-mono">
                  [{formatTimestamp(event.timestamp)}]
                </span>
                <span className="text-blue-400">{event.templateId}</span>
              </div>
              <div className="text-yellow-400">
                {event.type}: {JSON.stringify(event.data, null, 0)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const DevWorkspace: React.FC = () => {
  const {
    selectedTemplate,
    cardData,
    previewMode,
    sidebarOpen,
    activeSection,
    events,
    setSelectedTemplate,
    updateCardData,
    setPreviewMode,
    toggleSidebar,
    setActiveSection,
    addEvent,
    clearEvents,
    loadPreset,
    resetData
  } = useDevWorkspaceStore();

  const templates = getAvailableTemplates();
  const presets = getDataPresets();
  const currentTemplate = templates.find(t => t.id === selectedTemplate);

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handlePreviewModeChange = (mode: 'desktop' | 'mobile' | 'tablet') => {
    setPreviewMode(mode);
  };

  const handleSectionChange = (section: FormSection) => {
    setActiveSection(section);
  };

  const handleComponentEvent = (event: Omit<ComponentEvent, 'id' | 'timestamp'>) => {
    addEvent(event);
  };

  const handlePresetLoad = (presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    if (preset) {
      loadPreset(preset);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={cn(
        "bg-white shadow-lg transition-all duration-300 flex flex-col",
        sidebarOpen ? "w-80" : "w-0 overflow-hidden"
      )}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-lg font-bold text-gray-900">
              🎨 Template Studio
            </h1>
            <button
              onClick={toggleSidebar}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Template Selector */}
          <div className="mb-4">
            <label className="form-label">Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="form-input text-sm"
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
            {currentTemplate && (
              <p className="text-xs text-gray-500 mt-1">
                {currentTemplate.description}
              </p>
            )}
          </div>

          {/* Data Presets */}
          <div className="mb-4">
            <label className="form-label">Quick Load</label>
            <div className="flex gap-1">
              <select
                onChange={(e) => e.target.value && handlePresetLoad(e.target.value)}
                className="form-input text-sm flex-1"
                defaultValue=""
              >
                <option value="">Load preset...</option>
                {presets.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.name}
                  </option>
                ))}
              </select>
              <button
                onClick={resetData}
                className="btn-secondary text-xs px-2"
                title="Reset to default"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Section Navigation */}
          <div>
            <label className="form-label">Edit Section</label>
            <div className="space-y-1">
              {Object.entries(sectionConfig).map(([key, config]) => {
                const Icon = config.icon;
                return (
                  <button
                    key={key}
                    onClick={() => handleSectionChange(key as FormSection)}
                    className={cn(
                      "w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors text-sm",
                      activeSection === key
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50"
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{config.label}</div>
                      <div className="text-xs text-gray-500 truncate">
                        {config.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form Builder */}
        <div className="flex-1 overflow-y-auto p-4">
          <FormBuilder
            data={cardData}
            onChange={updateCardData}
            activeSection={activeSection}
          />
        </div>

        {/* Events Panel */}
        <div className="p-4 border-t border-gray-200">
          <EventsPanel events={events} onClear={clearEvents} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button
                  onClick={toggleSidebar}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <Bars3Icon className="w-5 h-5" />
                </button>
              )}
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {currentTemplate?.name || 'Template Preview'}
                </h2>
                <p className="text-sm text-gray-500">
                  {currentTemplate?.description || 'Live template development environment'}
                </p>
              </div>
            </div>

            {/* Preview Mode Controls */}
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {(['desktop', 'tablet', 'mobile'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => handlePreviewModeChange(mode)}
                    className={cn(
                      "px-3 py-1 text-sm font-medium rounded-md transition-colors capitalize",
                      previewMode === mode
                        ? "bg-white text-blue-600 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    )}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Template Preview */}
        <div className="flex-1 p-6 overflow-hidden">
          <TemplatePreview
            templateId={selectedTemplate}
            cardData={cardData}
            previewMode={previewMode}
            onEvent={handleComponentEvent}
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default DevWorkspace;
