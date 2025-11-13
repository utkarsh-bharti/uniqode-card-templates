# @uniqode/card-templates

[![npm version](https://badge.fury.io/js/@uniqode%2Fcard-templates.svg)](https://badge.fury.io/js/@uniqode%2Fcard-templates)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> Production-grade Web Components library for digital business card templates. Framework-agnostic, data-driven, and battle-tested.

## 🎯 Overview

`@uniqode/card-templates` provides professionally designed digital business card layouts as framework-agnostic Web Components. Built with modern web standards, it works seamlessly with any framework (React, Angular, Vue, Django, plain JavaScript) and offers production-grade data handling with comprehensive event system.

## ✨ Key Features

- **🌐 Framework Agnostic** - Works with React, Angular, Vue, Django, Express, or vanilla JavaScript
- **📊 Data-Driven Rendering** - Pass data declaratively via properties or attributes
- **🎭 Production-Grade Events** - Comprehensive event system with `preventDefault` support
- **🔒 Shadow DOM Encapsulation** - No style conflicts with your application
- **⚡ Lightweight** - Individual components (~30KB) or full bundle
- **🎨 Fully Customizable** - Colors, fonts, styling, and data fields
- **📱 Responsive Design** - Mobile-first approach with perfect scaling
- **🎭 TypeScript Ready** - Full type definitions included
- **♿ Accessible** - WCAG compliant components
- **🚀 Production Ready** - Used in production by Uniqode/Beaconstac

## 📦 Installation

```bash
# Using npm
npm install @uniqode/card-templates

# Using yarn
yarn add @uniqode/card-templates

# Using pnpm
pnpm add @uniqode/card-templates
```

## 🚀 Quick Start

### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="https://unpkg.com/@uniqode/card-templates@latest/dist/card-layout-12.js"></script>
</head>
<body>
  <uniqode-layout-12 id="myCard"></uniqode-layout-12>
  
  <script>
    // Wait for component to be defined
    customElements.whenDefined('uniqode-layout-12').then(() => {
      const card = document.getElementById('myCard');
      
      // Set data via property (recommended)
      card.cardData = {
        first_name: 'John',
        last_name: 'Doe',
        designation: 'Software Engineer',
        company: 'Tech Corp',
        email_v2: [{ value: 'john@techcorp.com', label: 'Work' }],
        phone_v2: [{ value: '+1 (555) 123-4567', label: 'Mobile' }],
        user_image_url: 'https://i.pravatar.cc/300',
        customizations: {
          background_color: '#131A40',
          primary_color: '#84E9F1',
          button_color: '#6366F1'
        }
      };
      
      // Listen for events
      card.addEventListener('contact-click', (e) => {
        console.log('Contact clicked:', e.detail);
      });
      
      card.addEventListener('share', (e) => {
        console.log('Share clicked:', e.detail);
        // e.preventDefault(); // Prevent default share action
      });
    });
  </script>
</body>
</html>
```

### React

```jsx
import { useEffect, useRef } from 'react';
import '@uniqode/card-templates';

function BusinessCard({ cardData }) {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    // Set data via property (declarative)
    element.cardData = cardData;

    // Attach event listeners
    const handleContactClick = (e) => {
      console.log('Contact clicked:', e.detail);
    };

    const handleShare = (e) => {
      console.log('Share clicked:', e.detail);
      // e.preventDefault(); // Optional: override default behavior
    };

    element.addEventListener('contact-click', handleContactClick);
    element.addEventListener('share', handleShare);

    // Cleanup
    return () => {
      element.removeEventListener('contact-click', handleContactClick);
      element.removeEventListener('share', handleShare);
    };
  }, [cardData]);
  
  return <uniqode-layout-12 ref={cardRef} />;
}

// TypeScript support: Add to global.d.ts
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'uniqode-layout-12': React.HTMLAttributes<HTMLElement> & { ref?: React.Ref<any> };
    }
  }
}
```

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import '@uniqode/card-templates';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

// component.ts
import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-business-card',
  template: '<uniqode-layout-12 #card></uniqode-layout-12>'
})
export class BusinessCardComponent implements AfterViewInit {
  @ViewChild('card') cardElement!: ElementRef;

  ngAfterViewInit() {
    const card = this.cardElement.nativeElement;
    
    // Set data
    card.cardData = {
      first_name: 'John',
      last_name: 'Doe',
      // ... more data
    };

    // Listen for events
    card.addEventListener('contact-click', (e: any) => {
      console.log('Contact clicked:', e.detail);
    });
  }
}
```

### Vue 3

```vue
<template>
  <uniqode-layout-12 ref="cardRef"></uniqode-layout-12>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import '@uniqode/card-templates';

const cardRef = ref(null);

const cardData = {
  first_name: 'John',
  last_name: 'Doe',
  designation: 'Software Engineer',
  // ... more data
};

onMounted(() => {
  const card = cardRef.value;
  
  // Set data
  card.cardData = cardData;
  
  // Listen for events
  card.addEventListener('contact-click', (e) => {
    console.log('Contact clicked:', e.detail);
  });
});
</script>
```

### Django (Server-Side)

#### Method 1: Data Island Pattern (Recommended)

```django
{% load static %}

<!DOCTYPE html>
<html>
<head>
    <script type="module" src="{% static 'js/uniqode-card-templates/card-layout-12.js' %}"></script>
</head>
<body>
    <!-- Web Component -->
    <uniqode-layout-12 data-source="#card-data"></uniqode-layout-12>
    
    <!-- Data Island (JSON) -->
    {{ card_data|json_script:"card-data" }}
    
    <script>
        // Listen for events
        document.querySelector('uniqode-layout-12').addEventListener('contact-click', (e) => {
            console.log('Contact clicked:', e.detail);
            
            // Send to backend
            fetch('/api/track-contact-click/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(e.detail)
            });
        });
    </script>
</body>
</html>
```

```python
# views.py
from django.shortcuts import render
from django.http import JsonResponse

def card_view(request, card_id):
    # Fetch card data from database
    card = DigitalCard.objects.get(id=card_id)
    
    # Transform to component format
    card_data = {
        'first_name': card.first_name,
        'last_name': card.last_name,
        'designation': card.designation,
        'company': card.company,
        'email_v2': [{'value': e.email, 'label': e.label} for e in card.emails.all()],
        'phone_v2': [{'value': p.phone, 'label': p.label} for p in card.phones.all()],
        'user_image_url': card.profile_image.url if card.profile_image else None,
        'customizations': card.get_customizations(),
    }
    
    return render(request, 'card_template.html', {'card_data': card_data})
```

#### Method 2: Direct Property Setting

```django
<!DOCTYPE html>
<html>
<head>
    <script type="module" src="{% static 'js/uniqode-card-templates/card-layout-12.js' %}"></script>
</head>
<body>
    <uniqode-layout-12 id="card"></uniqode-layout-12>
    
    <script>
        window.addEventListener('DOMContentLoaded', () => {
            customElements.whenDefined('uniqode-layout-12').then(() => {
                const card = document.getElementById('card');
                
                // Set data from Django template context
                card.cardData = {{ card_data|safe }};
                
                // Event handlers
                card.addEventListener('contact-click', (e) => {
                    console.log('Contact clicked:', e.detail);
                });
            });
        });
    </script>
</body>
</html>
```

### Express.js / Node.js (Server-Side)

```javascript
// server.js
import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();

// Serve the Web Component bundle
app.use('/static', express.static('node_modules/@uniqode/card-templates/dist'));

app.get('/card/:id', async (req, res) => {
    // Fetch card data from database
    const cardData = await db.getCard(req.params.id);
    
    // Render HTML with embedded data
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <script type="module" src="/static/card-layout-12.js"></script>
        </head>
        <body>
            <uniqode-layout-12 id="card"></uniqode-layout-12>
            
            <script>
                customElements.whenDefined('uniqode-layout-12').then(() => {
                    document.getElementById('card').cardData = ${JSON.stringify(cardData)};
                });
            </script>
        </body>
        </html>
    `);
});

app.listen(3000);
```

## 📊 Data Structure

```javascript
const cardData = {
  // Personal Information
  first_name: 'John',
  last_name: 'Doe',
  prefix: 'Mr.',
  suffix: 'Jr.',
  pronouns_v2: 'he/him',
  designation: 'Software Engineer',
  company: 'Tech Corp',
  department: 'Engineering',
  summary: 'Passionate software engineer...',
  
  // Contact Information (arrays for multiple entries)
  phone_v2: [
    { value: '+1 (555) 123-4567', label: 'Mobile' },
    { value: '+1 (555) 987-6543', label: 'Work' }
  ],
  email_v2: [
    { value: 'john@techcorp.com', label: 'Work' },
    { value: 'john.doe@gmail.com', label: 'Personal' }
  ],
  website_v2: [
    { value: 'https://johndoe.dev', label: 'Portfolio' }
  ],
  
  // Address
  address_v2: '123 Tech Street, San Francisco, CA 94105',
  
  // Social Media Links
  social_links: {
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    instagram: 'https://instagram.com/johndoe',
    facebook: 'https://facebook.com/johndoe',
    github: 'https://github.com/johndoe',
    youtube: 'https://youtube.com/@johndoe',
    twitch: 'https://twitch.tv/johndoe',
    discord: 'https://discord.gg/johndoe'
  },
  
  // Media
  user_image_url: 'https://example.com/profile.jpg',
  logo_url: 'https://example.com/logo.png',
  
  // Customization
  customizations: {
    background_color: '#131A40',
    primary_color: '#84E9F1',
    button_color: '#6366F1',
    icon_color: '#84E9F1',
    font_style: 'Roboto, sans-serif'
  },
  
  // Ordering
  contact_info_ordering: ['phone_v2', 'email_v2', 'website_v2', 'address_v2'],
  social_links_ordering: ['linkedin', 'twitter', 'github']
};
```

## 🎪 Event System

All components emit custom events for user interactions with full `preventDefault` support:

```javascript
const card = document.querySelector('uniqode-layout-12');

// 1. Contact Click Event
card.addEventListener('contact-click', (event) => {
  const { type, value, label } = event.detail;
  console.log(`Contact clicked: ${type} - ${value}`);
  
  // Optional: Prevent default action (e.g., opening email client)
  event.preventDefault();
  
  // Custom handler
  openCustomModal(type, value);
});

// 2. Share Event
card.addEventListener('share', (event) => {
  const { cardData } = event.detail;
  console.log('Card share requested');
  
  // Optional: Prevent default share dialog
  event.preventDefault();
  
  // Custom share implementation
  openCustomShareDialog(cardData);
});

// 3. Save Contact Event (vCard download)
card.addEventListener('save-contact', (event) => {
  const { cardData, vcard } = event.detail;
  console.log('Save contact triggered');
  
  // Optional: Prevent default vCard download
  event.preventDefault();
  
  // Track in analytics
  analytics.track('contact_saved', { card_id: cardData.id });
});

// 4. Lead Collect Event
card.addEventListener('lead-collect', (event) => {
  const { cardData } = event.detail;
  console.log('Lead collection triggered');
  
  // Send to backend
  fetch('/api/collect-lead/', {
    method: 'POST',
    body: JSON.stringify({ card_id: cardData.id })
  });
});

// 5. Social Link Click Event
card.addEventListener('social-click', (event) => {
  const { platform, url } = event.detail;
  console.log(`Social link clicked: ${platform}`);
  
  // Track social clicks
  analytics.track('social_click', { platform });
});

// 6. Card Ready Event
card.addEventListener('card-ready', (event) => {
  console.log('Card rendered and ready');
  
  // Hide loading spinner
  document.querySelector('.loader').style.display = 'none';
});
```

### Event Details

| Event | Detail | Cancelable | Description |
|-------|--------|-----------|-------------|
| `contact-click` | `{ type, value, label }` | ✅ Yes | User clicked phone/email/website |
| `share` | `{ cardData }` | ✅ Yes | User clicked share button |
| `save-contact` | `{ cardData, vcard }` | ✅ Yes | User clicked save to contacts |
| `lead-collect` | `{ cardData }` | ✅ Yes | User clicked lead collection CTA |
| `social-click` | `{ platform, url }` | ✅ Yes | User clicked social media link |
| `card-ready` | `{ layoutId }` | ❌ No | Card finished rendering |

## 🎨 Available Layouts

Currently available layout:

| Layout | Description | Best For |
|--------|-------------|----------|
| `uniqode-layout-12` | Modern gaming/tech card with dark theme | Gaming, Tech, Creative professionals |

*More layouts coming soon! The architecture supports easy addition of new layouts.*

## 🎛️ Customization

### Colors

```javascript
customizations: {
  background_color: '#131A40',    // Primary background
  primary_color: '#84E9F1',       // Accent/header color
  button_color: '#6366F1',        // Action button color
  icon_color: '#84E9F1',          // Icon color
  font_style: 'Roboto, sans-serif' // Font family
}
```

### Typography

```javascript
customizations: {
  font_style: 'Inter, system-ui, sans-serif',
  typography: {
    user_info: {
      google_font_size: 24,
      google_font_colour: '#333'
    },
    company_details: {
      google_font_size: 16
    },
    contact_details: {
      google_font_size: 14
    }
  }
}
```

## 🏗️ Architecture

### Component Structure

```
CardLayout12 (Web Component)
    ↓
BaseCard (Enhanced base class)
    ├── Data Loading (properties, attributes, data islands)
    ├── Event System (preventDefault support)
    ├── Rendering Engine
    └── Utility Methods (vCard, share, etc.)
```

### CSS Architecture

Components use **CSS-in-JS with Shadow DOM** for true style encapsulation:

```javascript
// styles.js - Separate CSS module
export const styles = `
  :host { display: block; }
  .card-container { /* ... */ }
`;

// CardLayout12.js - Component imports styles
import { styles } from './styles.js';

getTemplate() {
  return `<style>${styles}</style><div>...</div>`;
}
```

**Benefits:**
- ✅ True encapsulation via Shadow DOM
- ✅ No style conflicts with consumer app
- ✅ Single bundle distribution
- ✅ Maintainable separated CSS
- ✅ Framework-agnostic

## 🔧 Development

### Prerequisites

- Node.js >= 16.0.0
- npm >= 8.0.0

### Setup

```bash
# Clone the repository
git clone https://github.com/uniqode/card-templates.git
cd card-templates

# Install dependencies
npm install

# Start development server (Storybook)
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev              # Start Storybook (http://localhost:6006)
npm start               # Alias for npm run dev
npm run build:dev       # Build in watch mode

# Building
npm run build:lib       # Build Web Components (outputs to dist/)
npm run build:storybook # Build Storybook static site
npm run build          # Build both

# Testing & Quality
npm run test:integration # Run integration tests
npm run lint            # Lint source code
npm run lint:fix        # Fix linting issues

# Utilities
npm run size           # Check bundle sizes
npm run clean          # Clean build artifacts
```

### Project Structure

```
uniqode-card-templates/
├── src/
│   ├── components/
│   │   ├── base/
│   │   │   └── BaseCard.js           # Enhanced base class
│   │   └── card-layout-12/
│   │       ├── CardLayout12.js       # Component logic
│   │       ├── styles.js             # Separate CSS module
│   │       └── CardLayout12.stories.js
│   ├── shared/
│   │   └── utils/                    # Utility functions
│   ├── types/                        # TypeScript definitions
│   ├── index.js                      # Main entry point
│   └── Introduction.stories.js       # Storybook welcome
├── dist/                             # Built files
│   ├── card-layout-12.js            # Individual bundle
│   ├── index.js                     # Full bundle
│   └── index.d.ts                   # TypeScript definitions
├── test/                            # Integration tests
├── .storybook/                      # Storybook config
├── webpack.config.js                # Webpack config
└── package.json
```

## 📊 Bundle Sizes

| Bundle | Size | Description |
|--------|------|-------------|
| `card-layout-12.js` | ~30KB | Individual Layout 12 component |
| `index.js` | ~35KB | Full bundle with all layouts |

### Tree Shaking

Import only what you need:

```javascript
// Import specific component (recommended)
import '@uniqode/card-templates/dist/card-layout-12.js';

// Import all components
import '@uniqode/card-templates';
```

## 🌐 Browser Support

- Chrome >= 63
- Firefox >= 63
- Safari >= 13
- Edge >= 79
- Mobile browsers with Web Components support

For older browsers, include the Web Components polyfill:

```html
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2/webcomponents-bundle.js"></script>
```

## 🔗 CDN Usage

```html
<!-- Full bundle -->
<script type="module" src="https://unpkg.com/@uniqode/card-templates@latest/dist/index.js"></script>

<!-- Individual component (recommended) -->
<script type="module" src="https://unpkg.com/@uniqode/card-templates@latest/dist/card-layout-12.js"></script>
```

## 🚀 Production Deployment

### Django Static Files

```bash
# Copy built files to Django static directory
cp node_modules/@uniqode/card-templates/dist/*.js \
   your_project/static/js/uniqode-card-templates/

# Collect static
python manage.py collectstatic --noinput
```

### CDN Integration

```python
# settings.py
UNIQODE_TEMPLATES_VERSION = "1.0.0"
UNIQODE_TEMPLATES_CDN = f"https://cdn.example.com/uniqode-templates/{UNIQODE_TEMPLATES_VERSION}"

# template.html
<script type="module" src="{{ UNIQODE_TEMPLATES_CDN }}/card-layout-12.js"></script>
```

### Security Considerations

```html
<!-- Subresource Integrity (SRI) -->
<script 
  type="module" 
  src="https://cdn.example.com/card-layout-12.js"
  integrity="sha384-..."
  crossorigin="anonymous"
></script>
```

## 🧪 Testing

```bash
# Run integration tests
npm run test:integration

# Test in Storybook
npm run dev
# Visit http://localhost:6006
```

## 📖 API Reference

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `cardData` | `Object` | Card data (see Data Structure) |
| `config` | `Object` | Component configuration |

### Methods

| Method | Description |
|--------|-------------|
| `render()` | Force re-render with current data |
| `getAttribute(name)` | Get attribute value |
| `setAttribute(name, value)` | Set attribute value |

### Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `card-data` | `String` | JSON string of card data |
| `data-source` | `String` | CSS selector for data island |
| `config` | `String` | JSON string of config |

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: [dev@uniqode.com](mailto:dev@uniqode.com)
- 🐛 Issues: [GitHub Issues](https://github.com/uniqode/card-templates/issues)
- 📖 Documentation: [GitHub Wiki](https://github.com/uniqode/card-templates/wiki)
- 💬 Discussions: [GitHub Discussions](https://github.com/uniqode/card-templates/discussions)

## 🎉 Acknowledgments

- Built with [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- Developed with [Storybook](https://storybook.js.org/)
- Bundled with [Webpack](https://webpack.js.org/)
- Production-tested by [Uniqode](https://uniqode.com) / [Beaconstac](https://beaconstac.com)

---

<div align="center">
  <strong>Made with ❤️ by the Uniqode Team</strong>
  <br>
  <sub>Used in production by thousands of digital business cards</sub>
</div>
