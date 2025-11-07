export default {
  title: 'Introduction',
  parameters: {
    docs: {
      page: () => {
        const container = document.createElement('div');
        container.innerHTML = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="font-size: 2.5rem; color: #007bff; margin-bottom: 16px;">🎨 Uniqode Card Templates</h1>
              <p style="font-size: 1.2rem; color: #666; margin-bottom: 32px;">Universal Web Components for Digital Business Cards</p>
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 12px;">
                <h2 style="margin: 0; font-size: 1.5rem;">✨ Industry Standard Component Library</h2>
                <p style="margin: 8px 0 0 0; opacity: 0.9;">Built with Web Components • Framework Agnostic • Production Ready</p>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-bottom: 40px;">
              <div style="background: #f8f9fa; padding: 24px; border-radius: 12px; border: 1px solid #e9ecef;">
                <h3 style="color: #28a745; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
                  🌐 <span>Universal Compatibility</span>
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #666;">
                  <li>Works with Angular, React, Vue, Vanilla JS</li>
                  <li>No framework dependencies</li>
                  <li>Standard Web Components API</li>
                </ul>
              </div>

              <div style="background: #f8f9fa; padding: 24px; border-radius: 12px; border: 1px solid #e9ecef;">
                <h3 style="color: #007bff; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
                  ⚡ <span>Real-time Updates</span>
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #666;">
                  <li>Instant data binding</li>
                  <li>Live preview updates</li>
                  <li>Event-driven architecture</li>
                </ul>
              </div>

              <div style="background: #f8f9fa; padding: 24px; border-radius: 12px; border: 1px solid #e9ecef;">
                <h3 style="color: #6f42c1; margin: 0 0 16px 0; display: flex; align-items: center; gap: 8px;">
                  🎨 <span>Professional Designs</span>
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #666;">
                  <li>Multiple layout options</li>
                  <li>Customizable themes</li>
                  <li>Mobile-first responsive</li>
                </ul>
              </div>
            </div>

            <div style="background: #fff; border: 2px solid #007bff; border-radius: 12px; padding: 32px; text-align: center;">
              <h3 style="color: #007bff; margin: 0 0 16px 0;">🚀 Quick Start</h3>
              <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; text-align: left; font-family: 'Courier New', monospace; margin-bottom: 16px;">
<pre style="margin: 0; color: #333;">// Install via NPM
npm install @uniqode/card-templates

// Use in HTML
&lt;uniqode-layout-1&gt;&lt;/uniqode-layout-1&gt;

// Set data via JavaScript
const card = document.querySelector('uniqode-layout-1');
card.cardData = {
  first_name: 'John',
  last_name: 'Doe',
  designation: 'Software Engineer',
  company: 'Tech Corp'
};</pre>
              </div>
              <p style="color: #666; margin: 0;">
                Explore the stories in the sidebar to see all available components and their configurations.
              </p>
            </div>
          </div>
        `;
        return container;
      },
    },
  },
};

export const Welcome = () => {
  const container = document.createElement('div');
  container.innerHTML = `
    <div style="text-align: center; padding: 40px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
      <h2 style="color: #007bff;">Welcome to Uniqode Card Templates</h2>
      <p style="color: #666;">Navigate to the Components section to explore our card layouts.</p>
    </div>
  `;
  return container;
};
