# 🎨 Uniqode Card Templates

Universal card layout components for web applications. Built with Web Components for maximum compatibility across frameworks.

## ✨ Features

- 🌐 **Universal Compatibility** - Works with Angular, React, Vue, and vanilla JavaScript
- 🎨 **Multiple Layouts** - Professional card designs based on proven templates
- ⚡ **Real-time Updates** - Instant rendering with data changes
- 🔒 **Type Safe** - Full TypeScript support with comprehensive validation
- 📱 **Responsive** - Mobile-first design with perfect scaling
- 🎯 **Customizable** - Colors, typography, and styling options
- 🧪 **Well Tested** - Comprehensive test coverage

## 🚀 Quick Start

### Installation

```bash
# Install from NPM (when published)
npm install @uniqode/card-templates

# Or use CDN
<script src="https://cdn.uniqode.com/card-templates/v1/bundle.js"></script>
```

### Basic Usage

```html
<!-- Simple HTML usage -->
<uniqode-card-layout-1 id="myCard"></uniqode-card-layout-1>

<script>
  const card = document.getElementById('myCard');
  card.cardData = {
    first_name: 'John',
    last_name: 'Doe',
    designation: 'Software Engineer',
    company: 'Tech Corp',
    email_v2: [{ value: 'john@example.com', label: 'Work' }],
    phone_v2: [{ value: '+1234567890', label: 'Mobile' }],
    customizations: {
      background_color: '#ffffff',
      icon_color: '#007bff',
      button_color: '#28a745'
    }
  };
</script>
```

## 📦 Available Components

### Layout 1 - Professional Card
- **Element**: `<uniqode-card-layout-1>`
- **Style**: Centered layout with circular profile image
- **Best for**: Business professionals, corporate use

### Layout 2 - Modern Card (Coming Soon)
- **Element**: `<uniqode-card-layout-2>`
- **Style**: Modern design with geometric elements

### Layout 4 - Creative Card (Coming Soon)
- **Element**: `<uniqode-card-layout-4>`
- **Style**: Creative layout with unique profile section

## 🛠️ Development

### Prerequisites

- Node.js 16+
- npm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/uniqode/card-templates.git
cd card-templates

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Server

The development server provides a live editor for testing components:

```bash
npm run dev
# Opens http://localhost:3001
```

Features:
- 📝 Live card editor with form controls
- 🎨 Real-time preview updates
- 📊 Event logging for interactions
- 🔄 Sample data loading

### Building

```bash
# Build for production
npm run build

# Build for development (with watch)
npm run build:dev
```

### Testing

```bash
# Run unit tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run end-to-end tests
npm run test:e2e
```

## 📖 API Reference

### CardData Interface

```typescript
interface CardData {
  // Personal Information
  first_name?: string;
  last_name?: string;
  prefix?: string;
  suffix?: string;
  pronouns_v2?: string;
  designation?: string;
  company?: string;
  department?: string;
  summary?: string;
  
  // Contact Information
  phone_v2?: ContactItem[];
  email_v2?: ContactItem[];
  website_v2?: ContactItem[];
  custom_fields?: ContactItem[];
  address_v2?: string;
  
  // Visual Assets
  logo_url?: string;
  user_image_url?: string;
  social_links?: SocialLinks;
  
  // Customization
  customizations?: {
    background_color?: string;
    icon_color?: string;
    button_color?: string;
    font_style?: string;
    typography?: TypographySettings;
  };
  
  // Configuration
  contact_info_ordering?: string[];
}
```

### Events

All components emit the following events:

#### card-share
Fired when the share button is clicked.
```javascript
card.addEventListener('card-share', (event) => {
  console.log('Card shared:', event.detail);
  // event.detail contains: { cardData, layout, timestamp, url }
});
```

#### contact-click
Fired when a contact item is clicked.
```javascript
card.addEventListener('contact-click', (event) => {
  console.log('Contact clicked:', event.detail);
  // event.detail contains: { type, value, label }
});
```

#### lead-collect
Fired when lead collection is initiated.
```javascript
card.addEventListener('lead-collect', (event) => {
  console.log('Lead collection:', event.detail);
  // event.detail contains: { cardData, layout, timestamp }
});
```

## 🎨 Customization

### Colors

```javascript
card.cardData = {
  // ... other data
  customizations: {
    background_color: '#f8f9fa',  // Card background
    icon_color: '#495057',        // Icons and text
    button_color: '#007bff'       // Action buttons
  }
};
```

### Typography

```javascript
card.cardData = {
  // ... other data
  customizations: {
    font_style: 'Work Sans',
    typography: {
      personal_info: {
        google_font_size: 24,
        google_font_colour: '#212529'
      },
      company_details: {
        google_font_size: 16,
        google_font_colour: '#6c757d'
      }
    }
  }
};
```

## 🔧 Framework Integration

### Angular

```typescript
// app.module.ts
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

// component.ts
import '@uniqode/card-templates';

@Component({
  template: `
    <uniqode-card-layout-1 
      [cardData]="cardData"
      (card-share)="onCardShare($event)">
    </uniqode-card-layout-1>
  `
})
export class CardComponent {
  cardData = { /* your data */ };
  
  onCardShare(event: CustomEvent) {
    console.log('Card shared:', event.detail);
  }
}
```

### React

```jsx
import '@uniqode/card-templates';

function CardComponent() {
  const cardData = { /* your data */ };
  
  const handleCardShare = (event) => {
    console.log('Card shared:', event.detail);
  };
  
  useEffect(() => {
    const card = document.getElementById('myCard');
    card.cardData = cardData;
    card.addEventListener('card-share', handleCardShare);
    
    return () => {
      card.removeEventListener('card-share', handleCardShare);
    };
  }, []);
  
  return <uniqode-card-layout-1 id="myCard" />;
}
```

### Vue

```vue
<template>
  <uniqode-card-layout-1 
    ref="cardRef"
    @card-share="onCardShare">
  </uniqode-card-layout-1>
</template>

<script>
import '@uniqode/card-templates';

export default {
  mounted() {
    this.$refs.cardRef.cardData = this.cardData;
  },
  data() {
    return {
      cardData: { /* your data */ }
    };
  },
  methods: {
    onCardShare(event) {
      console.log('Card shared:', event.detail);
    }
  }
};
</script>
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation
- Ensure all tests pass
- Keep components lightweight and performant

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- 📧 Email: dev@uniqode.com
- 🐛 Issues: [GitHub Issues](https://github.com/uniqode/card-templates/issues)
- 📖 Documentation: [Full Documentation](https://docs.uniqode.com/card-templates)

---

Made with ❤️ by the Uniqode Team
