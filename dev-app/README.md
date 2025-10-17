# 🎨 Uniqode Card Templates - Development Environment

A modern React-based development environment for building and testing card templates.

## ✨ Features

- **🎨 Live Template Editor** - Real-time form editing with instant preview updates
- **📱 Multi-Device Preview** - Desktop, tablet, and mobile preview modes
- **🔧 Dynamic Form Builder** - Auto-generated forms based on template schemas
- **📊 Event Monitoring** - Real-time logging of component interactions
- **💾 State Persistence** - Automatic saving of workspace state
- **🎯 Data Presets** - Quick loading of test data scenarios
- **🎪 Template Comparison** - Side-by-side template testing

## 🚀 Getting Started

### Prerequisites

Make sure you have the parent Web Components library built:

```bash
# From the parent directory (uniqode-card-templates/)
npm run build
```

### Development Server

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

## 🏗️ Architecture

### Components

- **DevWorkspace** - Main development interface
- **FormBuilder** - Dynamic form generation and handling
- **TemplatePreview** - Web Component wrapper with device simulation
- **EventsPanel** - Real-time event logging

### State Management

Uses Zustand for lightweight, efficient state management:

- **Persistent Storage** - Workspace state saved to localStorage
- **Real-time Updates** - Instant synchronization between form and preview
- **Event Tracking** - Complete audit trail of component interactions

### Type Safety

Comprehensive TypeScript types based on your DigitalBusinessCard model:

- **CardData** - Complete card data structure
- **FormSchema** - Dynamic form configuration
- **ComponentEvents** - Template interaction events

## 🎯 Usage

### 1. Template Selection
Choose from available templates in the sidebar dropdown.

### 2. Data Editing
Edit card data using the dynamic form builder:
- **Personal Info** - Name, job title, bio
- **Contact Info** - Phone, email, website, address
- **Social Links** - LinkedIn, Twitter, GitHub, etc.
- **Customization** - Colors, fonts, styling

### 3. Live Preview
See instant updates in the preview panel:
- **Device Modes** - Desktop, tablet, mobile
- **Real-time Updates** - Changes appear immediately
- **Event Monitoring** - Track all component interactions

### 4. Data Presets
Quickly load test data:
- **Complete Profile** - Full data set
- **Minimal Profile** - Basic information only
- **Edge Cases** - Long text, special characters

## 🔧 Development Workflow

### Adding New Templates

1. **Create Web Component** in parent library
2. **Build Library** (`npm run build` in parent)
3. **Add Template Config** in `utils/index.ts`
4. **Test in Dev Environment**

### Testing Data Scenarios

1. **Load Preset** from dropdown
2. **Edit Fields** in form builder
3. **Monitor Events** in events panel
4. **Test Interactions** in preview

### Debugging

- **Browser DevTools** - Standard React debugging
- **Events Panel** - Real-time component events
- **Console Logs** - Detailed logging for development
- **State Inspector** - Zustand devtools integration

## 📱 Responsive Testing

Test templates across different screen sizes:

- **Desktop** - Full layout (1200px+)
- **Tablet** - Medium layout (768px)
- **Mobile** - Compact layout (375px)

## 🎨 Customization

### Adding Form Fields

```typescript
// In utils/index.ts
const newField: FormField = {
  key: 'new_field',
  label: 'New Field',
  type: 'text',
  section: 'personal',
  placeholder: 'Enter value...'
};
```

### Adding Data Presets

```typescript
// In utils/index.ts
const newPreset: DataPreset = {
  id: 'my-preset',
  name: 'My Preset',
  description: 'Custom test data',
  category: 'complete',
  data: { /* your data */ }
};
```

## 🚀 Building for Production

```bash
npm run build
```

Builds the development environment for deployment.

## 🔗 Integration

This development environment is designed to work with:

- **Web Components Library** - Parent uniqode-card-templates
- **Angular Portal** - beaconstac_angular_portal
- **Django Server** - beaconstac_server

## 📊 Performance

- **Instant Updates** - <5ms form-to-preview latency
- **Efficient Rendering** - Only re-renders changed components
- **Memory Optimized** - Automatic cleanup of event listeners
- **Responsive UI** - Smooth animations and transitions

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Zustand.