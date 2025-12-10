# Uniqode Card Templates - Complete Library Guide

**Version:** 1.0.0  
**Last Updated:** November 2024

A production-ready Web Components library for rendering Digital Business Card layouts. Built with vanilla JavaScript, consumed by Django server, Angular dashboard, and Flutter mobile app.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Library Configuration](#library-configuration)
3. [Card Data Format](#card-data-format)
4. [Customizations & Styling](#customizations--styling)
5. [Premium vs Free Layouts](#premium-vs-free-layouts)
6. [Event System](#event-system)
7. [Public API Methods](#public-api-methods)
8. [Building the Library](#building-the-library)
9. [Consuming the Library](#consuming-the-library)
10. [Integration Examples](#integration-examples)

---

## Architecture Overview

### Core Principles

1. **Schema-First Approach**: All data structures match the database schema exactly (snake_case, no transformations)
2. **Web Components**: Framework-agnostic using Custom Elements API
3. **Shadow DOM**: Encapsulated styles, configurable mode (open/closed)
4. **Pure Data Flow**: Consumer passes data once, library manages all state
5. **Event-Driven**: Library emits typed events, consumers listen and respond

### File Structure

```
uniqode-card-templates/
├── src/
│   ├── components/
│   │   ├── base/
│   │   │   ├── BaseCard.js              # Base class for all layouts
│   │   │   ├── LanguageDropdownMixin.js # Multi-language support
│   │   │   ├── LeadFormMixin.js         # Lead collection form
│   │   │   ├── StickyButtonFooterMixin.js # Footer & CTA buttons
│   │   │   └── AnimationMixin.js        # Card exchange animation
│   │   ├── premium/
│   │   │   └── card-layout-12/
│   │   │       └── CardLayout12.js      # Premium layout implementation
│   │   └── free/
│   │       └── (future free layouts)
│   ├── shared/
│   │   ├── constants/
│   │   │   └── events.js                # Typed event constants
│   │   └── utils/
│   │       ├── colors.js                # Color utilities
│   │       ├── validation.js            # Data validation
│   │       └── initials.js              # Name initials generation
│   └── types/
│       ├── index.d.ts                   # TypeScript definitions
│       └── enums.ts                     # Enums from backend
├── stories/                             # Storybook demos
├── webpack.config.js                    # Build configuration
└── dist/                                # Built files
    ├── card-layout-12.js
    ├── index.d.ts
    └── types/
```

---

## Library Configuration

### Shadow DOM Configuration

**IMPORTANT:** Configure Shadow DOM mode BEFORE loading the library.

```javascript
// Set Shadow DOM mode (BEFORE importing library)
window.UniqodeCardConfig = { 
    shadowMode: 'open'  // or 'closed' (default)
};
```

**Modes:**
- `'closed'` (default): Perfect style encapsulation, used by web frameworks
- `'open'`: Allows analytics tracking inside Shadow DOM, used by Django server

### After Library Loads

The library exposes event constants globally:

```javascript
// Available after library loads
window.UniqodeCardConfig.EVENTS = {
    CARD_READY: 'card-ready',
    CONTACT_CLICK: 'contact-click',
    LEAD_FORM_SUBMIT: 'lead-form-submit',
    // ... all event constants
};
```

---

## Card Data Format

### Core Structure

The library expects **pure database format** with **snake_case** field names:

```javascript
{
    // Personal Information
    first_name: "John",
    last_name: "Doe",
    prefix: "Dr.",
    suffix: "PhD",
    pronouns_v2: "he/him",
    designation: "Senior Engineer",
    company: "Acme Corp",
    department: "Engineering",
    summary: "Passionate about...",
    
    // Contact Information (v2 format)
    phone_v2: [
        { label: "mobile", value: "+1234567890", valid: "true" }
    ],
    email_v2: [
        { label: "work", value: "john@acme.com", valid: "true" }
    ],
    website_v2: [
        { label: "portfolio", value: "https://john.com", valid: "true" }
    ],
    address_v2: "123 Main St, City, State 12345",
    
    // Social Links
    social_links: {
        "linkedin": "https://linkedin.com/in/johndoe",
        "twitter": "https://twitter.com/johndoe"
    },
    social_links_ordering: {
        0: "linkedin",
        1: "twitter"
    },
    
    // Custom Fields
    custom_fields: [
        { label: "Employee ID", value: "EMP123" }
    ],
    
    // Media
    user_image_url: "https://cdn.com/user.jpg",
    logo_url: "https://cdn.com/logo.png",
    cover_image_url: "https://cdn.com/cover.jpg",
    
    // Customizations (see next section)
    customizations: {
        background_color: "#FFFFFF",
        button_color: "#203D99",
        // ... more customizations
    },
    
    // Multi-Language Support
    default_language: "en",
    language_data: {
        "es": {
            first_name: "Juan",
            designation: "Ingeniero Senior",
            // ... language-specific overrides
        },
        "fr": { /* French data */ }
    },
    
    // Database Flags
    lead_collection: true,
    branding_footer: false,
    pwa_preview: false,
    layout: "12"
}
```

### Key Points

- ✅ **Use `_v2` fields** (phone_v2, email_v2, website_v2, address_v2)
- ✅ **Snake_case field names** (first_name, not firstName)
- ✅ **No transformations** - Pass data exactly as stored in database
- ❌ **Don't use legacy fields** (phone, email, website) - Library ignores them

---

## Customizations & Styling

### Customizations Object Structure

```javascript
customizations: {
    // Colors
    background_color: "#FFFFFF",
    user_info_color: "#203D99",
    secondary_color: "#000000",
    button_color: "#203D99",
    icon_color: "#000000",
    
    // Background (color or image)
    background: {
        type: "color",  // or "image"
        value: "#F0EFED"  // or image URL
    },
    
    // Typography
    font_type: "google",
    font_style: "Roboto",
    typography: {
        personal_info: {
            google_font_style: "Bold",
            google_font_size: "24",
            google_font_colour: "#000000"
        },
        company_details: {
            google_font_style: "Regular",
            google_font_size: "16",
            google_font_colour: "#666666"
        },
        bio: {
            google_font_style: "Regular",
            google_font_size: "14",
            google_font_colour: "#333333"
        },
        contact_details: {
            google_font_style: "Regular",
            google_font_size: "14",
            google_font_colour: "#203D99"
        },
        button: {
            google_font_style: "Medium",
            google_font_size: "16",
            google_font_colour: "#FFFFFF"
        }
    }
}
```

### How Library Processes Customizations

**Step 1: Extract Customizations (BaseCard.js)**

```javascript
// BaseCard extracts and validates customizations
getCustomization() {
    return this._cardData?.customizations || {};
}

extractColors() {
    const customization = this.getCustomization();
    return {
        'card-bg': customization.background_color,
        'button-color': customization.button_color,
        'icon-color': customization.icon_color,
        'secondary-color': customization.secondary_color,
        'user-info-color': customization.user_info_color
    };
}

extractTypography() {
    const customization = this.getCustomization();
    const typography = customization.typography || {};
    
    return {
        fontFamily: this.getFontFamily(customization.font_style),
        fontType: customization.font_type || 'google',
        personalInfo: {
            fontSize: typography.personal_info?.google_font_size || 24,
            fontStyle: typography.personal_info?.google_font_style || 'Bold',
            fontColor: typography.personal_info?.google_font_colour || '#000000'
        },
        // ... more sections
    };
}
```

**Step 2: Apply as CSS Variables**

```javascript
applyCustomColors() {
    const colors = this.extractColors();
    const typography = this.extractTypography();
    const container = this._shadowRoot.querySelector('.uqc-card-container');
    
    // Apply colors as CSS variables
    container.style.setProperty('--card-bg', colors['card-bg']);
    container.style.setProperty('--button-color', colors['button-color']);
    
    // Apply typography
    container.style.setProperty('--font-family', typography.fontFamily);
    container.style.setProperty('--personal-info-size', `${typography.personalInfo.fontSize}px`);
    container.style.setProperty('--personal-info-color', typography.personalInfo.fontColor);
}
```

**Step 3: Use in Component Styles (CardLayout12.js)**

```css
.uqc-card-container {
    background: var(--card-bg, #F0EFED);
    font-family: var(--font-family, 'Inter', sans-serif);
}

.uqc-name {
    font-size: var(--personal-info-size, 24px);
    color: var(--personal-info-color, #000000);
}

.uqc-button {
    background-color: var(--button-color, #203D99);
    color: var(--button-text-color-final, #FFFFFF);
}

.uqc-social-icon svg {
    fill: var(--icon-color, #000000);
}
```

### Color Fallback Chain

```
var(--personal-info-color, var(--user-info-color, #000000))
       ↑                           ↑                  ↑
   Specific color           Base color         Hardcoded default
```

---

## Premium vs Free Layouts

### Layout Structure

```
components/
├── premium/
│   └── card-layout-12/
│       └── CardLayout12.js      # Premium layout (all features)
└── free/
    └── (future free layouts)    # Limited features
```

### Creating New Layouts

**1. Premium Layout Example:**

```javascript
// src/components/premium/card-layout-15/CardLayout15.js
import { BaseCard } from '../../base/BaseCard.js';

export class CardLayout15 extends BaseCard {
    static get layoutId() {
        return 'layout-15';
    }
    
    getTemplate() {
        // Your HTML template
        return `
            <style>
                /* Your styles */
            </style>
            <div class="uqc-card-container">
                <!-- Your layout -->
            </div>
        `;
    }
    
    attachEventListeners() {
        // Your event listeners
        this.attachLanguageDropdownListeners();
        this.attachStickyButtonFooterListeners();
        this.attachLeadFormListeners();
    }
}

customElements.define('uniqode-layout-15', CardLayout15);
```

**2. Update Webpack Config:**

```javascript
// webpack.config.js
entry: {
    'card-layout-12': './src/components/premium/card-layout-12/CardLayout12.js',
    'card-layout-15': './src/components/premium/card-layout-15/CardLayout15.js', // NEW
},
```

**3. Build produces:**
- `dist/card-layout-12.js` (existing)
- `dist/card-layout-15.js` (new)

### Premium vs Free Differences

| Feature | Premium | Free |
|---------|---------|------|
| **Lead Collection** | ✅ Full form with animations | ❌ Not available |
| **Sticky Footer** | ✅ CTA buttons + branding | ✅ Basic branding only |
| **Multi-Language** | ✅ Full support | ✅ Full support |
| **Customizations** | ✅ All colors & typography | ✅ Limited palette |
| **Social Icons** | ✅ Unlimited | ✅ Limited (5-10) |
| **Custom Fields** | ✅ Unlimited | ❌ Not available |

---

## Event System

### Available Events

**Lifecycle Events:**
```javascript
'card-ready'       // Card finished rendering
'card-updated'     // Card data updated
```

**Contact Interaction Events:**
```javascript
'contact-click'    // Phone, email, website, address clicked
'save-contact'     // Save to contacts clicked
'social-click'     // Social media link clicked
'share'            // Share button clicked
```

**Language Events:**
```javascript
'language-change'  // Language dropdown changed
```

**Lead Collection Events:**
```javascript
'lead-form-open'      // Lead form opened
'lead-form-close'     // Lead form closed
'lead-form-submit'    // Lead form submitted
'lead-form-success'   // Lead saved successfully
'lead-form-error'     // Lead save failed
'lead-collect'        // Alternative event
```

**Footer/CTA Events:**
```javascript
'add-to-contact-click'     // Add to Contact button
'exchange-contacts-click'  // Exchange Contacts button
'connect-click'            // Connect button
'create-now-click'         // Create Now button
'footer-cta-click'         // Footer CTA link
'footer-logo-click'        // Footer logo clicked
```

**Animation Events:**
```javascript
'animation-started'  // Card exchange animation started
'animation-ended'    // Card exchange animation ended
```

### Using Event Constants

**Library exposes typed constants:**

```javascript
// After library loads
const EVENTS = window.UniqodeCardConfig.EVENTS;

// Use in event listeners
cardElement.addEventListener(EVENTS.CONTACT_CLICK, (e) => {
    console.log('Contact clicked:', e.detail);
});

cardElement.addEventListener(EVENTS.LEAD_FORM_SUBMIT, async (e) => {
    const leadData = e.detail.data;
    // Handle lead submission
});
```

### Event Detail Structures

**contact-click:**
```javascript
{
    type: 'email',           // 'phone', 'email', 'website', 'address', 'custom'
    value: 'john@acme.com',
    label: 'work'
}
```

**social-click:**
```javascript
{
    platform: 'linkedin',
    url: 'https://linkedin.com/in/johndoe'
}
```

**language-change:**
```javascript
{
    language: 'es',
    cardData: { /* language-specific data */ }
}
```

**lead-form-submit:**
```javascript
{
    data: {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        phone_number: '+1234567890',
        company_name: 'Example Inc',
        designation: 'Manager',
        notes: 'Interested in product',
        marketing_consent: true
    }
}
```

**animation-started:**
```javascript
{
    leadData: {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane@example.com',
        company_name: 'Example Inc'
    }
}
```

---

## Public API Methods

### Card Element Methods

Once you have a reference to the card element, you can call these methods:

```javascript
const cardElement = document.querySelector('uniqode-layout-12');
```

**Lead Form Methods:**
```javascript
// Show lead collection form
cardElement.showLeadForm();

// Hide lead collection form
cardElement.hideLeadForm();

// Show lead form success state
cardElement.showLeadFormSuccess();

// Show lead form error
cardElement.showLeadFormError('Error message');
```

**Sticky Button Methods:**
```javascript
// Show "Connect" + "Create Now" buttons (after lead collection)
cardElement.showConnectButtons();

// Show "Exchange Contacts" button (before lead collection)
cardElement.showExchangeButton();
```

**Animation Methods:**
```javascript
// Show card exchange animation
cardElement.showCardExchangeAnimation({
    first_name: 'Jane',
    last_name: 'Smith',
    email: 'jane@example.com',
    company_name: 'Example Inc'
}, 3000); // Duration in ms
```

**Data Methods:**
```javascript
// Get current card data
const data = cardElement.cardData;

// Update card data (triggers re-render)
cardElement.cardData = newData;

// Get current config
const config = cardElement.config;

// Update config
cardElement.config = newConfig;
```

**Utility Methods:**
```javascript
// Get full name
const fullName = cardElement.getFullName(); // "Dr. John Doe PhD"

// Get initials
const initials = cardElement.getInitials(); // "JD"

// Get personal info
const info = cardElement.getPersonalInfo();
// Returns: { fullName, firstName, lastName, pronouns, designation, ... }

// Get contact info
const contacts = cardElement.getContactInfo();
// Returns: { phone, email, website, address, customFields }

// Get social links (ordered)
const socials = cardElement.getSocialLinks();
// Returns: [{ platform, url, icon }, ...]

// Get customizations
const customizations = cardElement.getAllCustomizations();
// Returns: { colors, typography, background, raw }
```

---

## Building the Library

### Prerequisites

```bash
npm install
```

### Build Commands

**Development build:**
```bash
npm run build
```

**Watch mode:**
```bash
npm run watch
```

**Storybook (development UI):**
```bash
npm run storybook
```

### Build Output

```
dist/
├── card-layout-12.js      # Bundled layout (ready to use)
├── index.d.ts             # TypeScript definitions
└── types/
    ├── index.d.ts
    └── enums.ts
```

### Build Process

1. **Webpack** bundles the component and all dependencies
2. **Babel** transpiles modern JS for browser compatibility
3. **CSS** is inlined into the JS bundle
4. **TypeScript definitions** are copied to dist/

### Versioning

Update version in `BaseCard.js`:

```javascript
const LIBRARY_VERSION = '1.0.0';
const BUILD_DATE = new Date().toLocaleString();
```

Console output after build:
```
🎨 Uniqode Card Templates v1.0.0 - Built: 11/26/2024, 5:48:30 PM
```

---

## Consuming the Library

### 1. Django Server Integration

**Step 1: Configure Shadow DOM**

```html
<!-- BEFORE loading library -->
<script>
    window.UniqodeCardConfig = { shadowMode: 'open' };
</script>
```

**Step 2: Load Library**

```html
<script type="module" src="/static/js/card-layouts/card-layout-12.js"></script>
```

**Step 3: Wait for Event Constants**

```html
<script>
    function waitForEvents(callback) {
        if (window.UniqodeCardConfig?.EVENTS) {
            callback(window.UniqodeCardConfig.EVENTS);
        } else {
            setTimeout(() => waitForEvents(callback), 50);
        }
    }
</script>
```

**Step 4: Add Card Element**

```html
<uniqode-layout-12 id="card"></uniqode-layout-12>
```

**Step 5: Hydrate with Data**

```javascript
const cardElement = document.getElementById('card');

// Pass pure database data
cardElement.cardData = {
    first_name: "John",
    last_name: "Doe",
    // ... all fields from database
};

// Optional config for dynamic UI state
cardElement.config = {
    platform: 'server',
    clicksDisabled: false,
    showConnectButtons: false,
    hideFooter: false
};
```

**Step 6: Listen to Events**

```javascript
waitForEvents((EVENTS) => {
    // Contact interactions
    cardElement.addEventListener(EVENTS.CONTACT_CLICK, (e) => {
        console.log('Contact clicked:', e.detail);
    });
    
    // Lead form submission
    cardElement.addEventListener(EVENTS.LEAD_FORM_SUBMIT, async (e) => {
        const leadData = e.detail.data;
        
        // Save lead to backend
        const response = await fetch('/api/leads/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        });
        
        if (response.ok) {
            // Show success animation
            cardElement.showLeadFormSuccess();
            cardElement.showCardExchangeAnimation(leadData, 3000);
            
            // After animation, show connect buttons
            setTimeout(() => {
                cardElement.showConnectButtons();
            }, 3000);
        } else {
            cardElement.showLeadFormError('Failed to save lead');
        }
    });
    
    // Language change
    cardElement.addEventListener(EVENTS.LANGUAGE_CHANGE, (e) => {
        console.log('Language changed to:', e.detail.language);
        // Update vCard download URL with language parameter
        updateDownloadUrl(e.detail.language);
    });
});
```

### 2. Angular Integration

**Step 1: Install as npm package** (if published)

```bash
npm install @uniqode/card-templates
```

**Step 2: Import in component**

```typescript
import '@uniqode/card-templates';
import { CardData, CardConfig } from '@uniqode/card-templates/types';
```

**Step 3: Use in template**

```html
<uniqode-layout-12 
    [attr.card-data]="cardDataJson"
    [attr.config]="configJson">
</uniqode-layout-12>
```

**Step 4: Set data in component**

```typescript
export class CardComponent implements AfterViewInit {
    @ViewChild('card') cardRef: ElementRef;
    
    cardData: CardData = {
        first_name: 'John',
        last_name: 'Doe',
        // ... database fields
    };
    
    ngAfterViewInit() {
        const cardElement = this.cardRef.nativeElement;
        
        // Set data imperatively (preferred)
        cardElement.cardData = this.cardData;
        cardElement.config = { platform: 'angular' };
        
        // Listen to events
        cardElement.addEventListener('contact-click', (e: CustomEvent) => {
            console.log('Contact clicked:', e.detail);
        });
    }
}
```

### 3. Flutter WebView Integration

**Step 1: Create HTML wrapper**

```html
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script>
        window.UniqodeCardConfig = { shadowMode: 'closed' };
    </script>
    <script type="module" src="./card-layout-12.js"></script>
</head>
<body>
    <uniqode-layout-12 id="card"></uniqode-layout-12>
    
    <script>
        // Receive data from Flutter
        window.setCardData = function(jsonData) {
            const cardElement = document.getElementById('card');
            cardElement.cardData = JSON.parse(jsonData);
        };
        
        // Send events to Flutter
        const cardElement = document.getElementById('card');
        cardElement.addEventListener('contact-click', (e) => {
            window.flutter_inappwebview.callHandler('onContactClick', e.detail);
        });
    </script>
</body>
</html>
```

**Step 2: Flutter code**

```dart
import 'package:flutter_inappwebview/flutter_inappwebview.dart';

class CardPreviewScreen extends StatelessWidget {
  final Map<String, dynamic> cardData;
  
  @override
  Widget build(BuildContext context) {
    return InAppWebView(
      initialFile: 'assets/card-preview.html',
      onWebViewCreated: (controller) {
        // Pass data to web component
        controller.evaluateJavascript(
          source: "window.setCardData('${jsonEncode(cardData)}');"
        );
      },
      onLoadStop: (controller, url) async {
        // Set up event handlers
        controller.addJavaScriptHandler(
          handlerName: 'onContactClick',
          callback: (args) {
            print('Contact clicked: ${args[0]}');
          }
        );
      },
    );
  }
}
```

---

## Integration Examples

### Example 1: Complete Django Template

```html
{% extends 'base.html' %}

{% block content %}
    <!-- Step 1: Configure Shadow DOM -->
    <script>
        window.UniqodeCardConfig = { shadowMode: 'open' };
    </script>
    
    <!-- Step 2: Load library -->
    <script type="module" src="{% static 'js/card-layouts/card-layout-12.js' %}"></script>
    
    <!-- Step 3: Wait for events helper -->
    <script>
        function waitForEvents(callback) {
            if (window.UniqodeCardConfig?.EVENTS) {
                callback(window.UniqodeCardConfig.EVENTS);
            } else {
                setTimeout(() => waitForEvents(callback), 50);
            }
        }
    </script>
    
    <!-- Step 4: Card data from Django -->
    <script>
        let cardData = {{ card_json|safe }};
    </script>
    
    <!-- Step 5: Container for background -->
    <div id="container" style="width: 100%; height: 100vh;">
        <uniqode-layout-12 id="card"></uniqode-layout-12>
    </div>
    
    <!-- Step 6: Set background -->
    <script>
        const container = document.getElementById('container');
        const bgType = '{{ card.background.type }}';
        const bgValue = '{{ card.background.value }}';
        
        if (bgType === 'color') {
            container.style.backgroundColor = bgValue;
        } else if (bgValue) {
            container.style.backgroundImage = `url('${bgValue}')`;
        }
    </script>
    
    <!-- Step 7: Initialize card -->
    <script>
        window.addEventListener('DOMContentLoaded', () => {
            customElements.whenDefined('uniqode-layout-12').then(() => {
                const cardElement = document.getElementById('card');
                
                // Hydrate with data
                cardElement.cardData = cardData;
                cardElement.config = {
                    platform: 'server',
                    clicksDisabled: false,
                    showConnectButtons: false,
                    hideFooter: false
                };
                
                // Attach event listeners
                waitForEvents((EVENTS) => {
                    // Lead form submission
                    cardElement.addEventListener(EVENTS.LEAD_FORM_SUBMIT, async (e) => {
                        const response = await fetch('/api/leads/', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRFToken': getCsrfToken()
                            },
                            body: JSON.stringify(e.detail.data)
                        });
                        
                        if (response.ok) {
                            cardElement.showLeadFormSuccess();
                            cardElement.showCardExchangeAnimation(e.detail.data, 3000);
                            setTimeout(() => cardElement.showConnectButtons(), 3000);
                        } else {
                            cardElement.showLeadFormError('Failed to save lead');
                        }
                    });
                    
                    // Other events...
                });
            });
        });
        
        function getCsrfToken() {
            return document.cookie
                .split('; ')
                .find(row => row.startsWith('csrftoken='))
                ?.split('=')[1];
        }
    </script>
{% endblock %}
```

### Example 2: Standalone HTML Page

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Business Card</title>
    
    <!-- Configure Shadow DOM -->
    <script>
        window.UniqodeCardConfig = { shadowMode: 'closed' };
    </script>
    
    <!-- Load library -->
    <script type="module" src="./card-layout-12.js"></script>
    
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
        }
        #container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f5f5f5;
        }
    </style>
</head>
<body>
    <div id="container">
        <uniqode-layout-12 id="card"></uniqode-layout-12>
    </div>
    
    <script>
        // Sample card data
        const cardData = {
            first_name: "John",
            last_name: "Doe",
            designation: "Senior Software Engineer",
            company: "Acme Corporation",
            phone_v2: [
                { label: "mobile", value: "+1 (555) 123-4567" }
            ],
            email_v2: [
                { label: "work", value: "john.doe@acme.com" }
            ],
            social_links: {
                linkedin: "https://linkedin.com/in/johndoe",
                twitter: "https://twitter.com/johndoe"
            },
            social_links_ordering: {
                0: "linkedin",
                1: "twitter"
            },
            customizations: {
                background_color: "#FFFFFF",
                button_color: "#203D99",
                icon_color: "#000000"
            },
            layout: "12",
            lead_collection: true,
            branding_footer: false
        };
        
        // Initialize when component is ready
        customElements.whenDefined('uniqode-layout-12').then(() => {
            const cardElement = document.getElementById('card');
            cardElement.cardData = cardData;
            
            // Listen to events
            cardElement.addEventListener('contact-click', (e) => {
                console.log('Contact clicked:', e.detail);
                
                // Open mailto/tel link
                if (e.detail.type === 'email') {
                    window.location.href = `mailto:${e.detail.value}`;
                } else if (e.detail.type === 'phone') {
                    window.location.href = `tel:${e.detail.value}`;
                }
            });
        });
    </script>
</body>
</html>
```

---

## Best Practices

### 1. Data Management

✅ **DO:**
- Pass pure database data (snake_case, no transformations)
- Use `_v2` fields (phone_v2, email_v2, etc.)
- Include all customizations in single object
- Provide language_data for multi-lingual cards

❌ **DON'T:**
- Transform data before passing to library
- Use legacy fields (phone, email without _v2)
- Mix camelCase and snake_case
- Modify data structure from database

### 2. Event Handling

✅ **DO:**
- Use typed event constants (`EVENTS.CONTACT_CLICK`)
- Wait for events to load (`waitForEvents`)
- Handle all async operations (lead submission)
- Provide user feedback (success/error states)

❌ **DON'T:**
- Use string literals for event names
- Block UI during async operations
- Ignore error states
- Assume immediate event availability

### 3. Styling

✅ **DO:**
- Set page-level background on outer container
- Let library handle card-level styling
- Use customizations object for colors/fonts
- Test with various color combinations

❌ **DON'T:**
- Try to style inside Shadow DOM from outside
- Override library CSS variables
- Use !important in consumer styles
- Assume light/dark theme

### 4. Performance

✅ **DO:**
- Load library with `type="module"`
- Use Shadow DOM 'closed' mode when possible
- Lazy load library if card is below fold
- Cache cardData reference

❌ **DON'T:**
- Load library synchronously
- Re-create cardData object frequently
- Nest multiple card components
- Render 100+ cards on single page

---

## Troubleshooting

### Common Issues

**Issue: "Card element not found"**
```javascript
// Solution: Wait for custom element to be defined
customElements.whenDefined('uniqode-layout-12').then(() => {
    const cardElement = document.getElementById('card');
    // Now safe to use
});
```

**Issue: "Cannot read property 'EVENTS' of undefined"**
```javascript
// Solution: Wait for events to load
function waitForEvents(callback) {
    if (window.UniqodeCardConfig?.EVENTS) {
        callback(window.UniqodeCardConfig.EVENTS);
    } else {
        setTimeout(() => waitForEvents(callback), 50);
    }
}
```

**Issue: "Styles not applying"**
```javascript
// Check Shadow DOM mode is set BEFORE loading library
window.UniqodeCardConfig = { shadowMode: 'open' };
// Then load library
```

**Issue: "Colors not showing"**
```javascript
// Verify customizations object structure
cardData.customizations = {
    background_color: "#FFFFFF",  // Must include #
    button_color: "#203D99",      // Hex color
    // ... other colors
};
```

**Issue: "Language dropdown not showing"**
```javascript
// Ensure language_data exists with at least one language
cardData.language_data = {
    "es": { first_name: "Juan", /* ... */ }
};
cardData.default_language = "en";
```

---

## Version History

### v1.0.0 (November 2024)
- ✅ Initial production release
- ✅ Premium Layout 12 implementation
- ✅ Full mixin architecture (Language, LeadForm, StickyButton, Animation)
- ✅ Typed event system
- ✅ Global event constants exposure
- ✅ TypeScript definitions
- ✅ Django server integration
- ✅ Schema-first approach
- ✅ Pure data flow (no transformations)
- ✅ Comprehensive documentation

---

## Support & Contributing

### Reporting Issues

Please include:
1. Library version (check console log)
2. Browser & version
3. Card data structure (sanitized)
4. Console errors
5. Steps to reproduce

### Development Workflow

1. Clone repository
2. `npm install`
3. `npm run storybook` (development UI)
4. Make changes
5. `npm run build` (test build)
6. Test in consumer application
7. Submit PR with documentation updates

---

## License

Proprietary - Uniqode (Beaconstac)

---

## Contact

For questions or support, contact the Uniqode development team.

**Last Updated:** November 26, 2024  
**Document Version:** 1.0

