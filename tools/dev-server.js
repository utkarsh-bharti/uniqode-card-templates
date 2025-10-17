const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from src directory
app.use('/src', express.static(path.join(__dirname, '../src')));
app.use('/lib', express.static(path.join(__dirname, '../lib')));
app.use('/examples', express.static(path.join(__dirname, '../examples')));

// Main development page
app.get('/', (req, res) => {
  res.send(generateDevelopmentPage());
});

// API endpoint to get sample card data
app.get('/api/sample-data', (req, res) => {
  res.json(getSampleCardData());
});

// API endpoint to validate card data
app.post('/api/validate', express.json(), (req, res) => {
  // Basic validation endpoint for testing
  const { cardData } = req.body;
  
  if (!cardData) {
    return res.status(400).json({ error: 'Card data is required' });
  }
  
  res.json({ 
    valid: true, 
    message: 'Card data is valid',
    timestamp: new Date().toISOString()
  });
});

function generateDevelopmentPage() {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>🎨 Uniqode Card Templates - Development</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f8f9fa;
      color: #333;
      line-height: 1.6;
    }
    
    .header {
      background: #fff;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    
    .header h1 {
      color: #007bff;
      margin-bottom: 5px;
    }
    
    .header p {
      color: #666;
    }
    
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }
    
    .controls {
      background: #fff;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 30px;
    }
    
    .controls h3 {
      margin-bottom: 20px;
      color: #333;
    }
    
    .form-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 15px;
      margin-bottom: 20px;
    }
    
    .form-group {
      display: flex;
      flex-direction: column;
    }
    
    .form-group label {
      font-weight: 500;
      margin-bottom: 5px;
      color: #555;
    }
    
    .form-group input,
    .form-group textarea {
      padding: 10px 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 14px;
      transition: border-color 0.2s;
    }
    
    .form-group input:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #007bff;
    }
    
    .form-group textarea {
      resize: vertical;
      min-height: 80px;
    }
    
    .color-input {
      width: 60px !important;
      height: 40px !important;
      padding: 2px !important;
      cursor: pointer;
    }
    
    .button {
      background: #007bff;
      color: white;
      border: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    
    .button:hover {
      background: #0056b3;
    }
    
    .button.secondary {
      background: #6c757d;
    }
    
    .button.secondary:hover {
      background: #545b62;
    }
    
    .preview-section {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 30px;
    }
    
    .preview-card {
      background: #fff;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .preview-card h3 {
      margin-bottom: 15px;
      color: #333;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #28a745;
    }
    
    .component-container {
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 20px;
      background: #f8f9fa;
      min-height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .event-log {
      margin-top: 20px;
      padding: 15px;
      background: #f8f9fa;
      border-radius: 6px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      max-height: 150px;
      overflow-y: auto;
    }
    
    .event-log-title {
      font-weight: 600;
      margin-bottom: 10px;
      font-family: inherit;
    }
    
    .loading {
      text-align: center;
      color: #666;
      font-style: italic;
    }
    
    @media (max-width: 768px) {
      .container {
        padding: 0 15px;
      }
      
      .form-grid {
        grid-template-columns: 1fr;
      }
      
      .preview-section {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="container">
      <h1>🎨 Uniqode Card Templates</h1>
      <p>Development Environment - Component Library v1.0.0</p>
    </div>
  </div>

  <div class="container">
    <!-- Live Editor Controls -->
    <div class="controls">
      <h3>📝 Live Card Editor</h3>
      <div class="form-grid">
        <div class="form-group">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" value="John" placeholder="Enter first name">
        </div>
        
        <div class="form-group">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" value="Doe" placeholder="Enter last name">
        </div>
        
        <div class="form-group">
          <label for="designation">Job Title</label>
          <input type="text" id="designation" value="Software Engineer" placeholder="Enter job title">
        </div>
        
        <div class="form-group">
          <label for="company">Company</label>
          <input type="text" id="company" value="Tech Corp" placeholder="Enter company name">
        </div>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" value="john@example.com" placeholder="Enter email">
        </div>
        
        <div class="form-group">
          <label for="phone">Phone</label>
          <input type="tel" id="phone" value="+1 (555) 123-4567" placeholder="Enter phone">
        </div>
        
        <div class="form-group">
          <label for="bgColor">Background Color</label>
          <input type="color" id="bgColor" value="#ffffff" class="color-input">
        </div>
        
        <div class="form-group">
          <label for="textColor">Text Color</label>
          <input type="color" id="textColor" value="#333333" class="color-input">
        </div>
        
        <div class="form-group">
          <label for="buttonColor">Button Color</label>
          <input type="color" id="buttonColor" value="#007bff" class="color-input">
        </div>
      </div>
      
      <div class="form-group" style="margin-bottom: 20px;">
        <label for="summary">Summary/Bio</label>
        <textarea id="summary" placeholder="Enter a brief summary or bio">Passionate software engineer with 5+ years of experience building scalable web applications.</textarea>
      </div>
      
      <div style="display: flex; gap: 10px; flex-wrap: wrap;">
        <button class="button" onclick="updateAllCards()">🔄 Update Cards</button>
        <button class="button secondary" onclick="loadSampleData()">📄 Load Sample Data</button>
        <button class="button secondary" onclick="resetForm()">🔄 Reset Form</button>
        <button class="button secondary" onclick="clearEventLog()">🗑️ Clear Events</button>
      </div>
    </div>

    <!-- Component Previews -->
    <div class="preview-section">
      <div class="preview-card">
        <h3>
          <span class="status-indicator"></span>
          Layout 1 - Professional Card
        </h3>
        <div class="component-container">
          <uniqode-card-layout-1 id="card1"></uniqode-card-layout-1>
        </div>
        <div class="event-log">
          <div class="event-log-title">Event Log:</div>
          <div id="eventLog1">Ready for events...</div>
        </div>
      </div>
      
      <!-- Placeholder for future layouts -->
      <div class="preview-card">
        <h3>
          <span class="status-indicator" style="background: #ffc107;"></span>
          Layout 2 - Coming Soon
        </h3>
        <div class="component-container">
          <div class="loading">Layout 2 component will be implemented next...</div>
        </div>
      </div>
    </div>
  </div>

  <!-- Load the component library -->
  <script type="module">
    import './src/index.js';
    
    // Wait for components to be defined
    await customElements.whenDefined('uniqode-card-layout-1');
    
    const card1 = document.getElementById('card1');
    const eventLog1 = document.getElementById('eventLog1');
    
    // Sample data
    let currentCardData = ${JSON.stringify(getSampleCardData(), null, 2)};
    
    // Initialize card with sample data
    card1.cardData = currentCardData;
    
    // Event listeners for card interactions
    card1.addEventListener('card-share', (event) => {
      logEvent('eventLog1', '📤 Card Shared', event.detail);
    });
    
    card1.addEventListener('contact-click', (event) => {
      logEvent('eventLog1', '📞 Contact Clicked', event.detail);
    });
    
    card1.addEventListener('lead-collect', (event) => {
      logEvent('eventLog1', '📋 Lead Collection', event.detail);
    });
    
    // Global functions for form interactions
    window.updateAllCards = function() {
      const updatedData = {
        ...currentCardData,
        first_name: document.getElementById('firstName').value,
        last_name: document.getElementById('lastName').value,
        designation: document.getElementById('designation').value,
        company: document.getElementById('company').value,
        summary: document.getElementById('summary').value,
        customizations: {
          ...currentCardData.customizations,
          background_color: document.getElementById('bgColor').value,
          icon_color: document.getElementById('textColor').value,
          button_color: document.getElementById('buttonColor').value
        },
        email_v2: [{
          value: document.getElementById('email').value,
          label: 'Work'
        }],
        phone_v2: [{
          value: document.getElementById('phone').value,
          label: 'Mobile'
        }]
      };
      
      currentCardData = updatedData;
      card1.cardData = updatedData;
      
      logEvent('eventLog1', '🔄 Card Updated', { timestamp: new Date().toISOString() });
    };
    
    window.loadSampleData = async function() {
      try {
        const response = await fetch('/api/sample-data');
        const sampleData = await response.json();
        
        // Update form fields
        document.getElementById('firstName').value = sampleData.first_name;
        document.getElementById('lastName').value = sampleData.last_name;
        document.getElementById('designation').value = sampleData.designation;
        document.getElementById('company').value = sampleData.company;
        document.getElementById('summary').value = sampleData.summary;
        document.getElementById('bgColor').value = sampleData.customizations.background_color;
        document.getElementById('textColor').value = sampleData.customizations.icon_color;
        document.getElementById('buttonColor').value = sampleData.customizations.button_color;
        
        if (sampleData.email_v2 && sampleData.email_v2[0]) {
          document.getElementById('email').value = sampleData.email_v2[0].value;
        }
        if (sampleData.phone_v2 && sampleData.phone_v2[0]) {
          document.getElementById('phone').value = sampleData.phone_v2[0].value;
        }
        
        currentCardData = sampleData;
        card1.cardData = sampleData;
        
        logEvent('eventLog1', '📄 Sample Data Loaded', {});
      } catch (error) {
        logEvent('eventLog1', '❌ Error Loading Sample Data', { error: error.message });
      }
    };
    
    window.resetForm = function() {
      document.getElementById('firstName').value = 'John';
      document.getElementById('lastName').value = 'Doe';
      document.getElementById('designation').value = 'Software Engineer';
      document.getElementById('company').value = 'Tech Corp';
      document.getElementById('email').value = 'john@example.com';
      document.getElementById('phone').value = '+1 (555) 123-4567';
      document.getElementById('summary').value = 'Passionate software engineer with 5+ years of experience building scalable web applications.';
      document.getElementById('bgColor').value = '#ffffff';
      document.getElementById('textColor').value = '#333333';
      document.getElementById('buttonColor').value = '#007bff';
      
      window.updateAllCards();
      logEvent('eventLog1', '🔄 Form Reset', {});
    };
    
    window.clearEventLog = function() {
      eventLog1.innerHTML = 'Event log cleared...';
    };
    
    function logEvent(logElementId, eventName, data) {
      const logElement = document.getElementById(logElementId);
      const timestamp = new Date().toLocaleTimeString();
      const logEntry = \`[\${timestamp}] \${eventName}\`;
      
      if (logElement.innerHTML === 'Ready for events...' || logElement.innerHTML === 'Event log cleared...') {
        logElement.innerHTML = logEntry;
      } else {
        logElement.innerHTML = logEntry + '<br>' + logElement.innerHTML;
      }
      
      // Keep only last 10 entries
      const lines = logElement.innerHTML.split('<br>');
      if (lines.length > 10) {
        logElement.innerHTML = lines.slice(0, 10).join('<br>');
      }
      
      console.log(\`📊 \${eventName}:\`, data);
    }
    
    console.log('🚀 Development server ready!');
    console.log('📦 Component library loaded successfully');
  </script>
</body>
</html>
  `;
}

function getSampleCardData() {
  return {
    first_name: 'John',
    last_name: 'Doe',
    prefix: '',
    suffix: '',
    pronouns_v2: 'he/him',
    designation: 'Senior Software Engineer',
    company: 'Tech Innovations Inc.',
    department: 'Engineering',
    summary: 'Passionate software engineer with 8+ years of experience building scalable web applications and leading development teams. Specialized in React, Node.js, and cloud architecture.',
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
    address_v2: '123 Tech Street, Suite 456\\nSan Francisco, CA 94105\\nUnited States',
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
      icon_color: '#495057',
      button_color: '#007bff',
      font_style: 'Work Sans',
      typography: {
        personal_info: {
          google_font_size: 24,
          google_font_colour: '#212529'
        },
        company_details: {
          google_font_size: 16,
          google_font_colour: '#6c757d'
        },
        contact_details: {
          google_font_size: 14,
          google_font_colour: '#495057'
        },
        bio: {
          google_font_size: 14,
          google_font_colour: '#6c757d'
        }
      }
    },
    contact_info_ordering: ['phone_v2', 'email_v2', 'website_v2', 'custom_fields']
  };
}

app.listen(PORT, () => {
  console.log(`🚀 Uniqode Card Templates Development Server`);
  console.log(`📍 Server running at: http://localhost:${PORT}`);
  console.log(`📖 Component library documentation available`);
  console.log(`🎨 Live editor ready for testing`);
  console.log(`\n📦 Available endpoints:`);
  console.log(`   GET  /              - Development interface`);
  console.log(`   GET  /api/sample-data - Sample card data`);
  console.log(`   POST /api/validate   - Validate card data`);
  console.log(`\n🔧 Available components:`);
  console.log(`   • uniqode-card-layout-1 (Professional Card)`);
  console.log(`\n💡 Next steps:`);
  console.log(`   1. Open http://localhost:${PORT} in your browser`);
  console.log(`   2. Test the live editor`);
  console.log(`   3. Check browser console for component events`);
});
