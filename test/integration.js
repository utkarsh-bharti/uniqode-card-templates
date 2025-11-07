#!/usr/bin/env node

/**
 * Integration test for Web Components package
 * Tests that components can be imported and used in a Node.js environment
 */

import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Set up DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.customElements = dom.window.customElements;

console.log('🧪 Starting Web Components Integration Tests...\n');

async function testComponentImport() {
  try {
    console.log('📦 Testing component imports...');
    
    // Test if dist files exist
    const distPath = path.resolve(process.cwd(), 'dist');
    if (!fs.existsSync(distPath)) {
      throw new Error('Dist directory not found. Run `npm run build:lib` first.');
    }
    
    const indexPath = path.join(distPath, 'index.js');
    if (!fs.existsSync(indexPath)) {
      throw new Error('Main bundle not found. Run `npm run build:lib` first.');
    }
    
    console.log('✅ Dist files exist');
    
    // Import the main bundle
    const { LIBRARY_INFO } = await import('../dist/index.js');
    
    console.log('✅ Main bundle imported successfully');
    console.log(`📋 Library: ${LIBRARY_INFO.name} v${LIBRARY_INFO.version}`);
    
    return true;
  } catch (error) {
    console.error('❌ Component import test failed:', error.message);
    return false;
  }
}

async function testComponentRegistration() {
  try {
    console.log('\n🔧 Testing component registration...');
    
    // Import components
    await import('../dist/index.js');
    
    // Check if components are registered
    const expectedComponents = [
      'uniqode-layout-1',
      'uniqode-layout-2',
      'uniqode-layout-3',
      'uniqode-layout-4',
      'uniqode-layout-5',
      'uniqode-layout-6',
      'uniqode-layout-7',
      'uniqode-layout-8',
      'uniqode-layout-9',
      'uniqode-layout-11',
      'uniqode-layout-comprehensive'
    ];
    
    for (const componentName of expectedComponents) {
      const element = document.createElement(componentName);
      if (element.constructor === HTMLElement) {
        throw new Error(`Component ${componentName} not properly registered`);
      }
    }
    
    console.log('✅ All components registered successfully');
    return true;
  } catch (error) {
    console.error('❌ Component registration test failed:', error.message);
    return false;
  }
}

async function testComponentUsage() {
  try {
    console.log('\n🎯 Testing component usage...');
    
    // Create a test component
    const card = document.createElement('uniqode-layout-1');
    
    // Set test data
    const testData = {
      first_name: 'Test',
      last_name: 'User',
      designation: 'Software Engineer',
      company: 'Test Company',
      email_v2: [{ value: 'test@example.com', label: 'Work' }],
      customizations: {
        background_color: '#007bff',
        user_info_color: '#333333'
      }
    };
    
    card.cardData = testData;
    
    // Add to DOM
    document.body.appendChild(card);
    
    // Check if component has shadow DOM
    if (!card.shadowRoot) {
      throw new Error('Component does not have shadow DOM');
    }
    
    // Check if component has content
    if (!card.shadowRoot.innerHTML) {
      throw new Error('Component shadow DOM is empty');
    }
    
    console.log('✅ Component usage test passed');
    return true;
  } catch (error) {
    console.error('❌ Component usage test failed:', error.message);
    return false;
  }
}

async function runTests() {
  const tests = [
    testComponentImport,
    testComponentRegistration,
    testComponentUsage
  ];
  
  let passed = 0;
  let failed = 0;
  
  for (const test of tests) {
    const result = await test();
    if (result) {
      passed++;
    } else {
      failed++;
    }
  }
  
  console.log('\n📊 Test Results:');
  console.log(`✅ Passed: ${passed}`);
  console.log(`❌ Failed: ${failed}`);
  
  if (failed > 0) {
    console.log('\n🚨 Some tests failed. Please fix the issues before publishing.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tests passed! Package is ready for distribution.');
    process.exit(0);
  }
}

// Install jsdom if not present
try {
  await import('jsdom');
} catch (error) {
  console.log('📦 Installing jsdom for testing...');
  const { execSync } = await import('child_process');
  execSync('npm install --save-dev jsdom', { stdio: 'inherit' });
  console.log('✅ jsdom installed');
}

runTests().catch(console.error);
