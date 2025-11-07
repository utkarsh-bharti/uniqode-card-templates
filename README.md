# @uniqode/card-templates

[![npm version](https://badge.fury.io/js/@uniqode%2Fcard-templates.svg)](https://badge.fury.io/js/@uniqode%2Fcard-templates)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://github.com/uniqode/card-templates/workflows/CI/badge.svg)](https://github.com/uniqode/card-templates/actions)

> Universal Web Components library for digital business card templates. Framework-agnostic, customizable, and production-ready.

## 🎯 Overview

`@uniqode/card-templates` is a comprehensive Web Components library that provides 11 professionally designed digital business card layouts. Built with modern web standards, it works seamlessly with any framework (React, Angular, Vue, Vanilla JS) and offers extensive customization options.

## ✨ Features

- **🌐 Framework Agnostic** - Works with React, Angular, Vue, Svelte, or vanilla JavaScript
- **🎨 11 Professional Layouts** - Diverse designs for different business needs
- **🔧 Fully Customizable** - Colors, fonts, styling, and data fields
- **📱 Responsive Design** - Mobile-first approach with perfect scaling
- **🔒 Shadow DOM Encapsulation** - No style conflicts with your application
- **⚡ Lightweight** - Individual components (13-29KB) or full bundle (148KB)
- **🎭 TypeScript Ready** - Full type definitions included
- **♿ Accessible** - WCAG compliant components
- **🚀 Production Ready** - Thoroughly tested and optimized

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

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import '@uniqode/card-templates';
  </script>
</head>
<body>
  <uniqode-layout-1 id="myCard"></uniqode-layout-1>
  
  <script>
    const card = document.getElementById('myCard');
    card.cardData = {
      first_name: 'John',
      last_name: 'Doe',
      designation: 'Software Engineer',
      company: 'Tech Corp',
      email_v2: [{ value: 'john@techcorp.com', label: 'Work' }],
      phone_v2: [{ value: '+1 (555) 123-4567', label: 'Mobile' }],
      customizations: {
        background_color: '#007bff',
        user_info_color: '#333333'
      }
    };
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
    if (cardRef.current) {
      cardRef.current.cardData = cardData;
    }
  }, [cardData]);
  
  return <uniqode-layout-1 ref={cardRef} />;
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

// component.html
<uniqode-layout-1 [cardData]="cardData"></uniqode-layout-1>
```

### Vue

```vue
<template>
  <uniqode-layout-1 :card-data="cardData" />
</template>

<script setup>
import '@uniqode/card-templates';

const cardData = {
  first_name: 'John',
  last_name: 'Doe',
  // ... more data
};
</script>
```

## 🎨 Available Layouts

| Layout | Description | Best For |
|--------|-------------|----------|
| `uniqode-layout-1` | Professional centered card | Corporate professionals |
| `uniqode-layout-2` | Two-column with profile image | Sales & marketing |
| `uniqode-layout-3` | Modern card with social focus | Social media influencers |
| `uniqode-layout-4` | SVG clipped profile design | Creative professionals |
| `uniqode-layout-5` | Split section with header | Executives & managers |
| `uniqode-layout-6` | Clean centered with logo | Small business owners |
| `uniqode-layout-7` | Minimalist design | Consultants & freelancers |
| `uniqode-layout-8` | Gradient background | Tech professionals |
| `uniqode-layout-9` | Sectioned with contact grid | Service providers |
| `uniqode-layout-11` | Premium with contact actions | Enterprise professionals |
| `uniqode-layout-comprehensive` | All data fields showcase | Testing & development |

## 📋 Data Structure

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
  
  // Social Media Links
  social_links: {
    linkedin: 'https://linkedin.com/in/johndoe',
    twitter: 'https://twitter.com/johndoe',
    instagram: 'https://instagram.com/johndoe',
    facebook: 'https://facebook.com/johndoe',
    github: 'https://github.com/johndoe',
    youtube: 'https://youtube.com/@johndoe'
  },
  
  // Media
  user_image_url: 'https://example.com/profile.jpg',
  logo_url: 'https://example.com/logo.png',
  
  // Customization
  customizations: {
    background_color: '#007bff',
    user_info_color: '#333333',
    secondary_color: '#666666',
    button_color: '#007bff',
    icon_color: '#007bff',
    font_style: 'Work Sans, sans-serif'
  },
  
  // Custom Fields
  custom_fields: [
    { value: 'Available for consulting', label: 'Note' }
  ]
};
```

## 🎛️ Customization Options

### Colors

```javascript
customizations: {
  background_color: '#007bff',    // Primary background color
  user_info_color: '#333333',    // Text color for names/titles
  secondary_color: '#666666',    // Secondary text color
  button_color: '#007bff',       // Action button color
  icon_color: '#007bff'          // Icon and accent color
}
```

### Typography

```javascript
customizations: {
  font_style: 'Inter, sans-serif', // Font family
  typography: {
    personal_info: {
      google_font_size: 24,        // Name font size
      google_font_colour: '#333'   // Name color override
    },
    company_details: {
      google_font_size: 16         // Company/title font size
    },
    contact_details: {
      google_font_size: 14         // Contact info font size
    }
  }
}
```

## 🎪 Events

All components emit custom events for user interactions:

```javascript
// Listen for contact clicks
card.addEventListener('contact-click', (event) => {
  const { type, value, label } = event.detail;
  console.log(`Contact clicked: ${type} - ${value}`);
});

// Listen for card sharing
card.addEventListener('card-share', (event) => {
  const { cardData, layout } = event.detail;
  console.log('Card shared:', layout);
});

// Listen for lead collection
card.addEventListener('lead-collect', (event) => {
  const { cardData } = event.detail;
  console.log('Lead collect initiated');
});
```

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
npm run dev              # Start Storybook development server
npm start               # Alias for npm run dev
npm run build:dev       # Build library in watch mode

# Building
npm run build:lib       # Build the Web Components library
npm run build:storybook # Build Storybook static site
npm run build          # Build both library and Storybook

# Testing & Quality
npm run test:integration # Run integration tests
npm run lint            # Lint source code
npm run lint:fix        # Fix linting issues

# Package Management
npm run prepublishOnly  # Prepare for npm publishing (auto-runs)
```

### Project Structure

```
├── src/
│   ├── components/          # Web Components
│   │   ├── base/           # BaseCard class
│   │   ├── card-layout-*/  # Individual layouts
│   │   └── ...
│   ├── shared/
│   │   └── utils/          # Utility functions
│   └── index.js            # Main entry point
├── dist/                   # Built files
├── test/                   # Integration tests
├── .storybook/            # Storybook configuration
└── storybook-static/      # Built Storybook
```

## 📊 Bundle Sizes

| Bundle | Size (Minified) | Description |
|--------|----------------|-------------|
| `index.js` | 148KB | Complete library with all components |
| `card-layout-1.js` | 24KB | Individual Layout 1 component |
| `card-layout-2.js` | 29KB | Individual Layout 2 component |
| `card-layout-3.js` | 25KB | Individual Layout 3 component |
| ... | 13-29KB | Other individual components |

### Tree Shaking

Import only the components you need:

```javascript
// Import specific component (recommended)
import '@uniqode/card-templates/dist/card-layout-1.js';

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
<!-- Load from CDN -->
<script type="module" src="https://unpkg.com/@uniqode/card-templates@latest/dist/index.js"></script>

<!-- Or specific component -->
<script type="module" src="https://unpkg.com/@uniqode/card-templates@latest/dist/card-layout-1.js"></script>
```

## 🧪 Testing

The library includes comprehensive integration tests:

```bash
# Run all tests
npm run test:integration

# Test specific functionality
node test/integration.js
```

## 📖 Storybook

Explore all components interactively:

```bash
# Start Storybook
npm run dev

# Build static Storybook
npm run build:storybook
```

Visit [http://localhost:6006](http://localhost:6006) to see all components with live examples.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: [dev@uniqode.com](mailto:dev@uniqode.com)
- 🐛 Issues: [GitHub Issues](https://github.com/uniqode/card-templates/issues)
- 📖 Documentation: [GitHub Wiki](https://github.com/uniqode/card-templates/wiki)

## 🎉 Acknowledgments

- Built with [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- Developed with [Storybook](https://storybook.js.org/)
- Bundled with [Webpack](https://webpack.js.org/)
- Styled with modern CSS and [Font Awesome](https://fontawesome.com/) icons

---

<div align="center">
  <strong>Made with ❤️ by the Uniqode Team</strong>
</div>