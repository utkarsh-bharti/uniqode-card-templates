import React, { useEffect, useRef, useCallback } from 'react';
import { DevicePhoneMobileIcon, ComputerDesktopIcon, DeviceTabletIcon } from '@heroicons/react/24/outline';
import type { CardData, ComponentEvent } from '../../types';
import { cn } from '../../utils';

interface TemplatePreviewProps {
  templateId: string;
  cardData: CardData;
  previewMode: 'desktop' | 'mobile' | 'tablet';
  onEvent?: (event: ComponentEvent) => void;
  className?: string;
}

interface WebComponentElement extends HTMLElement {
  cardData: CardData;
}

const TemplatePreview: React.FC<TemplatePreviewProps> = ({
  templateId,
  cardData,
  previewMode,
  onEvent,
  className
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const componentRef = useRef<WebComponentElement | null>(null);

  // Load the Web Component script
  useEffect(() => {
    const loadWebComponent = async () => {
      try {
        // Load the main bundle which contains all components
        const bundleId = 'web-component-bundle';
        if (!document.getElementById(bundleId)) {
          const script = document.createElement('script');
          script.id = bundleId;
          script.type = 'module';
          // Load from the public directory (served by Vite from ../lib)
          script.src = '/bundle.js';
          script.onload = () => {
            console.log('✅ Web Components bundle loaded successfully');
          };
          script.onerror = () => {
            console.error('❌ Failed to load Web Components bundle');
          };
          document.head.appendChild(script);
        }
      } catch (error) {
        console.warn(`Failed to load web component for ${templateId}:`, error);
      }
    };

    loadWebComponent();
  }, []);

  // Create and configure the Web Component
  useEffect(() => {
    if (!containerRef.current) return;

    const componentTagName = getComponentTagName(templateId);
    console.log(`🔍 Attempting to create Web Component: ${componentTagName}`);
    
    // Wait for the custom element to be defined
    customElements.whenDefined(componentTagName).then(() => {
      console.log(`✅ Web Component ${componentTagName} is defined`);
      if (containerRef.current) {
        // Clear existing content
        containerRef.current.innerHTML = '';
        
        // Create the Web Component
        const webComponent = document.createElement(componentTagName) as WebComponentElement;
        console.log(`🎨 Created Web Component element:`, webComponent);
        
        // Set card data
        webComponent.cardData = cardData;
        console.log(`📝 Set card data:`, cardData);
        
        // Store reference for updates
        componentRef.current = webComponent;
        
        // Add event listeners
        webComponent.addEventListener('card-share', handleCardShare);
        webComponent.addEventListener('contact-click', handleContactClick);
        webComponent.addEventListener('lead-collect', handleLeadCollect);
        
        // Add to container
        containerRef.current.appendChild(webComponent);
        console.log(`🎯 Web Component added to container`);
        
        // Debug: Check dimensions and visibility
        setTimeout(() => {
          const rect = webComponent.getBoundingClientRect();
          console.log(`📏 Web Component dimensions:`, {
            width: rect.width,
            height: rect.height,
            visible: rect.width > 0 && rect.height > 0,
            display: getComputedStyle(webComponent).display,
            visibility: getComputedStyle(webComponent).visibility
          });
        }, 100);
      }
    }).catch((error) => {
      console.error(`❌ Web Component ${componentTagName} failed to load:`, error);
      // Fallback: Create placeholder if component not available
      if (containerRef.current) {
        containerRef.current.innerHTML = `
          <div class="flex items-center justify-center h-96 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300">
            <div class="text-center">
              <div class="text-gray-500 text-lg font-medium mb-2">Template Preview</div>
              <div class="text-gray-400 text-sm">${templateId} component not loaded</div>
              <div class="text-gray-400 text-xs mt-2">
                Check console for details. Component tag: ${componentTagName}
              </div>
            </div>
          </div>
        `;
      }
    });

    // Cleanup function
    return () => {
      if (componentRef.current) {
        componentRef.current.removeEventListener('card-share', handleCardShare);
        componentRef.current.removeEventListener('contact-click', handleContactClick);
        componentRef.current.removeEventListener('lead-collect', handleLeadCollect);
      }
    };
  }, [templateId, cardData]);

  // Update component data when cardData changes
  useEffect(() => {
    if (componentRef.current && componentRef.current.cardData !== cardData) {
      componentRef.current.cardData = { ...cardData };
    }
  }, [cardData]);

  const handleCardShare = useCallback((event: Event) => {
    const customEvent = event as CustomEvent;
    onEvent?.({
      type: 'card-share',
      data: customEvent.detail,
      templateId
    });
  }, [onEvent, templateId]);

  const handleContactClick = useCallback((event: Event) => {
    const customEvent = event as CustomEvent;
    onEvent?.({
      type: 'contact-click',
      data: customEvent.detail,
      templateId
    });
  }, [onEvent, templateId]);

  const handleLeadCollect = useCallback((event: Event) => {
    const customEvent = event as CustomEvent;
    onEvent?.({
      type: 'lead-collect',
      data: customEvent.detail,
      templateId
    });
  }, [onEvent, templateId]);

  const getComponentTagName = (templateId: string): string => {
    // Convert template ID to component tag name
    return `uniqode-card-${templateId}`;
  };

  const getPreviewDimensions = () => {
    switch (previewMode) {
      case 'mobile':
        return { width: '375px', height: '600px' };
      case 'tablet':
        return { width: '768px', height: '600px' };
      case 'desktop':
      default:
        return { width: '100%', height: 'auto', minHeight: '500px' };
    }
  };

  const dimensions = getPreviewDimensions();

  return (
    <div className={cn("flex flex-col", className)}>
      {/* Preview Mode Selector */}
      <div className="flex items-center justify-center gap-2 mb-4 p-2 bg-gray-100 rounded-lg">
        <button
          onClick={() => {/* This would be handled by parent component */}}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            previewMode === 'desktop'
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <ComputerDesktopIcon className="w-4 h-4" />
          Desktop
        </button>
        <button
          onClick={() => {/* This would be handled by parent component */}}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            previewMode === 'tablet'
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <DeviceTabletIcon className="w-4 h-4" />
          Tablet
        </button>
        <button
          onClick={() => {/* This would be handled by parent component */}}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
            previewMode === 'mobile'
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          )}
        >
          <DevicePhoneMobileIcon className="w-4 h-4" />
          Mobile
        </button>
      </div>

      {/* Preview Container */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg p-4 overflow-auto">
        <div
          className={cn(
            "bg-white rounded-lg shadow-lg transition-all duration-300",
            previewMode === 'mobile' && "max-w-sm mx-auto"
          )}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            minHeight: dimensions.minHeight,
            maxHeight: '80vh'
          }}
        >
          <div
            ref={containerRef}
            className="w-full h-full overflow-auto p-4"
            style={{ minHeight: '400px' }}
          />
        </div>
      </div>

      {/* Template Info */}
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-600">
          Template: <span className="font-medium text-gray-900">{templateId}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Preview Mode: {previewMode.charAt(0).toUpperCase() + previewMode.slice(1)}
        </div>
      </div>
    </div>
  );
};

export default TemplatePreview;
