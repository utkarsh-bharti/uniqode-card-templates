const fs = require('fs');
const path = require('path');

/**
 * Build script for Uniqode Card Templates
 * Creates individual component builds and processes assets
 */

const srcDir = path.join(__dirname, '../src');
const libDir = path.join(__dirname, '../lib');

console.log('🔨 Building Uniqode Card Templates...');

// Ensure lib directory exists
if (!fs.existsSync(libDir)) {
  fs.mkdirSync(libDir, { recursive: true });
  console.log('📁 Created lib directory');
}

// Copy source files to lib (for now, we'll just copy them)
// In a more complex setup, you might want to transpile, minify, etc.

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const files = fs.readdirSync(src);
  
  files.forEach(file => {
    const srcFile = path.join(src, file);
    const destFile = path.join(dest, file);
    
    if (fs.statSync(srcFile).isDirectory()) {
      copyDirectory(srcFile, destFile);
    } else {
      fs.copyFileSync(srcFile, destFile);
    }
  });
}

try {
  // Copy all source files to lib
  copyDirectory(srcDir, libDir);
  console.log('📄 Copied source files to lib/');
  
  // Create package info file
  const packageInfo = {
    name: '@uniqode/card-templates',
    version: '1.0.0',
    built: new Date().toISOString(),
    components: [
      'uniqode-card-layout-1'
    ]
  };
  
  fs.writeFileSync(
    path.join(libDir, 'package-info.json'), 
    JSON.stringify(packageInfo, null, 2)
  );
  
  console.log('✅ Component build completed successfully!');
  console.log(`📦 Built ${packageInfo.components.length} component(s)`);
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
