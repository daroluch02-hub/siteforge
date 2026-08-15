/**
 * Template Engine Service
 * Generates HTML, CSS, and JavaScript templates based on requirements
 */

export class TemplateEngine {
  constructor(templateDir = './templates') {
    this.templateDir = templateDir;
    this.templates = new Map();
    this.initializeDefaultTemplates();
  }

  /**
   * Initialize default templates
   */
  initializeDefaultTemplates() {
    // HTML Templates
    this.templates.set('html-basic', this.getBasicHTMLTemplate());
    this.templates.set('html-landing', this.getLandingPageTemplate());
    this.templates.set('html-dashboard', this.getDashboardTemplate());
    this.templates.set('html-form', this.getFormTemplate());
    
    // CSS Templates
    this.templates.set('css-reset', this.getResetCSSTemplate());
    this.templates.set('css-modern', this.getModernCSSTemplate());
    this.templates.set('css-responsive', this.getResponsiveCSSTemplate());
    
    // JavaScript Templates
    this.templates.set('js-basic', this.getBasicJSTemplate());
    this.templates.set('js-interactive', this.getInteractiveJSTemplate());
    this.templates.set('js-api', this.getAPIJSTemplate());
  }

  /**
   * Generate templates based on requirements
   * @param {Object} requirements - Parsed requirements
   * @param {string} type - Project type
   * @returns {Promise<Array>} Array of file objects
   */
  async generateTemplates(requirements, type = 'website') {
    const files = [];
    
    try {
      // Determine which templates to use based on type and requirements
      const htmlTemplate = this.selectHTMLTemplate(requirements, type);
      const cssTemplate = this.selectCSSTemplate(requirements, type);
      const jsTemplate = this.selectJSTemplate(requirements, type);
      
      // Generate HTML file
      files.push({
        path: 'index.html',
        content: this.renderHTML(htmlTemplate, requirements)
      });
      
      // Generate CSS file
      files.push({
        path: 'css/styles.css',
        content: this.renderCSS(cssTemplate, requirements)
      });
      
      // Generate JavaScript file
      files.push({
        path: 'js/app.js',
        content: this.renderJavaScript(jsTemplate, requirements)
      });
      
      // Add additional pages if required
      if (requirements.pages && requirements.pages.length > 0) {
        for (const page of requirements.pages) {
          files.push({
            path: `${page}.html`,
            content: this.renderHTML(htmlTemplate, { ...requirements, currentPage: page })
          });
        }
      }
      
      // Add components if required
      if (requirements.components) {
        for (const component of requirements.components) {
          const componentFiles = await this.generateComponent(component, requirements);
          files.push(...componentFiles);
        }
      }
      
      return files;
    } catch (error) {
      console.error('Failed to generate templates:', error.message);
      throw error;
    }
  }

  /**
   * Select appropriate HTML template
   * @private
   */
  selectHTMLTemplate(requirements, type) {
    if (type === 'landing-page') {
      return this.templates.get('html-landing');
    }
    if (requirements.dashboard) {
      return this.templates.get('html-dashboard');
    }
    if (requirements.forms) {
      return this.templates.get('html-form');
    }
    return this.templates.get('html-basic');
  }

  /**
   * Select appropriate CSS template
   * @private
   */
  selectCSSTemplate(requirements, type) {
    if (requirements.responsive !== false) {
      return this.templates.get('css-responsive');
    }
    if (requirements.modern) {
      return this.templates.get('css-modern');
    }
    return this.templates.get('css-reset');
  }

  /**
   * Select appropriate JavaScript template
   * @private
   */
  selectJSTemplate(requirements, type) {
    if (requirements.api) {
      return this.templates.get('js-api');
    }
    if (requirements.interactive) {
      return this.templates.get('js-interactive');
    }
    return this.templates.get('js-basic');
  }

  /**
   * Render HTML template
   * @private
   */
  renderHTML(template, requirements) {
    let html = template;
    
    // Replace placeholders
    html = html.replace('{{title}}', requirements.title || 'SiteForge App');
    html = html.replace('{{description}}', requirements.description || 'Built with SiteForge');
    html = html.replace('{{year}}', new Date().getFullYear().toString());
    
    // Add navigation if required
    if (requirements.navigation) {
      const navHTML = this.generateNavigation(requirements.navigation);
      html = html.replace('<!-- NAVIGATION -->', navHTML);
    }
    
    // Add main content
    if (requirements.content) {
      html = html.replace('<!-- CONTENT -->', requirements.content);
    }
    
    return html;
  }

  /**
   * Render CSS template
   * @private
   */
  renderCSS(template, requirements) {
    let css = template;
    
    // Add custom colors if provided
    if (requirements.colors) {
      const colorVars = Object.entries(requirements.colors)
        .map(([key, value]) => `  --${key}: ${value};`)
        .join('\n');
      css = css.replace('/* COLOR_VARS */', `:root {\n${colorVars}\n}`);
    } else {
      css = css.replace('/* COLOR_VARS */', '');
    }
    
    return css;
  }

  /**
   * Render JavaScript template
   * @private
   */
  renderJavaScript(template, requirements) {
    let js = template;
    
    // Replace app name
    js = js.replace('{{appName}}', requirements.title || 'SiteForgeApp');
    
    // Add API endpoints if required
    if (requirements.apiEndpoints) {
      const endpoints = JSON.stringify(requirements.apiEndpoints, null, 2);
      js = js.replace('// API_ENDPOINTS', `const API_ENDPOINTS = ${endpoints};`);
    }
    
    return js;
  }

  /**
   * Generate navigation HTML
   * @private
   */
  generateNavigation(items) {
    const navItems = items.map(item => 
      `<li><a href="${item.href || '#'}">${item.label}</a></li>`
    ).join('\n          ');
    
    return `<nav class="navbar">
        <ul class="nav-list">
          ${navItems}
        </ul>
      </nav>`;
  }

  /**
   * Generate component files
   * @private
   */
  async generateComponent(component, requirements) {
    const files = [];
    const componentName = component.name.toLowerCase();
    
    // Generate component HTML
    files.push({
      path: `components/${componentName}.html`,
      content: this.getComponentHTML(component)
    });
    
    // Generate component CSS
    files.push({
      path: `components/${componentName}.css`,
      content: this.getComponentCSS(component)
    });
    
    // Generate component JS
    files.push({
      path: `components/${componentName}.js`,
      content: this.getComponentJS(component)
    });
    
    return files;
  }

  /**
   * Get component HTML
   * @private
   */
  getComponentHTML(component) {
    return `<!-- ${component.name} Component -->
<div class="${component.name.toLowerCase()}-container">
  <!-- Component content goes here -->
</div>`;
  }

  /**
   * Get component CSS
   * @private
   */
  getComponentCSS(component) {
    return `/* ${component.name} Component Styles */
.${component.name.toLowerCase()}-container {
  /* Add your styles here */
}`;
  }

  /**
   * Get component JavaScript
   * @private
   */
  getComponentJS(component) {
    return `// ${component.name} Component
class ${component.name}Component {
  constructor(options = {}) {
    this.options = options;
    this.init();
  }

  init() {
    console.log('${component.name} component initialized');
  }
}

export default ${component.name}Component;`;
  }

  // Template getters
  getBasicHTMLTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <meta name="description" content="{{description}}">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- NAVIGATION -->
  
  <main class="container">
    <!-- CONTENT -->
    <h1>{{title}}</h1>
    <p>Welcome to your SiteForge application!</p>
  </main>

  <footer>
    <p>&copy; {{year}} SiteForge. All rights reserved.</p>
  </footer>

  <script src="js/app.js"></script>
</body>
</html>`;
  }

  getLandingPageTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <meta name="description" content="{{description}}">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- NAVIGATION -->
  
  <header class="hero">
    <div class="container">
      <h1>{{title}}</h1>
      <p class="hero-subtitle">{{description}}</p>
      <button class="cta-button">Get Started</button>
    </div>
  </header>

  <section class="features">
    <div class="container">
      <h2>Features</h2>
      <!-- CONTENT -->
    </div>
  </section>

  <footer>
    <p>&copy; {{year}} SiteForge. All rights reserved.</p>
  </footer>

  <script src="js/app.js"></script>
</body>
</html>`;
  }

  getDashboardTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}} - Dashboard</title>
  <meta name="description" content="{{description}}">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <!-- NAVIGATION -->
    </aside>
    
    <main class="dashboard-content">
      <header class="dashboard-header">
        <h1>{{title}}</h1>
      </header>
      
      <div class="dashboard-widgets">
        <!-- CONTENT -->
      </div>
    </main>
  </div>

  <script src="js/app.js"></script>
</body>
</html>`;
  }

  getFormTemplate() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{title}}</title>
  <meta name="description" content="{{description}}">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- NAVIGATION -->
  
  <main class="container">
    <h1>{{title}}</h1>
    
    <form class="siteforge-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" required>
      </div>
      
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" required>
      </div>
      
      <div class="form-group">
        <label for="message">Message</label>
        <textarea id="message" name="message" rows="5"></textarea>
      </div>
      
      <button type="submit" class="submit-button">Submit</button>
    </form>
    
    <!-- CONTENT -->
  </main>

  <footer>
    <p>&copy; {{year}} SiteForge. All rights reserved.</p>
  </footer>

  <script src="js/app.js"></script>
</body>
</html>`;
  }

  getResetCSSTemplate() {
    return `/* CSS Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* COLOR_VARS */`;
  }

  getModernCSSTemplate() {
    return `/* Modern CSS Styles */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --accent-color: #e74c3c;
  --text-color: #2c3e50;
  --bg-color: #ecf0f1;
  --border-radius: 8px;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* COLOR_VARS */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
  background-color: var(--bg-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.btn {
  display: inline-block;
  padding: 12px 24px;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: var(--shadow);
}`;
  }

  getResponsiveCSSTemplate() {
    return `/* Responsive CSS Styles */
:root {
  --primary-color: #3498db;
  --secondary-color: #2ecc71;
  --text-color: #2c3e50;
  --bg-color: #ffffff;
}

/* COLOR_VARS */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: var(--text-color);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Responsive Navigation */
.navbar {
  background: var(--bg-color);
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-list {
  list-style: none;
  display: flex;
  gap: 1rem;
}

.nav-list a {
  text-decoration: none;
  color: var(--text-color);
  transition: color 0.3s ease;
}

.nav-list a:hover {
  color: var(--primary-color);
}

/* Responsive Grid */
.grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Mobile First */
@media (max-width: 767px) {
  .container {
    padding: 0 15px;
  }
  
  .nav-list {
    flex-direction: column;
  }
}`;
  }

  getBasicJSTemplate() {
    return `// {{appName}} - Main Application
console.log('{{appName}} initialized');

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded successfully');
  
  // Add any initialization code here
});`;
  }

  getInteractiveJSTemplate() {
    return `// {{appName}} - Interactive Application
console.log('{{appName}} initialized');

class App {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupEventListeners();
      console.log('App ready');
    });
  }

  setupEventListeners() {
    // Add click handlers
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleButtonClick(e));
    });

    // Add form handlers
    document.querySelectorAll('form').forEach(form => {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    });
  }

  handleButtonClick(event) {
    console.log('Button clicked:', event.target);
  }

  handleFormSubmit(event) {
    event.preventDefault();
    console.log('Form submitted');
  }
}

const app = new App();`;
  }

  getAPIJSTemplate() {
    return `// {{appName}} - API Integration
console.log('{{appName}} initialized');

// API_ENDPOINTS

class APIClient {
  constructor(baseURL = '') {
    this.baseURL = baseURL;
  }

  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data)
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

const api = new APIClient();
export default api;`;
  }
}

export default TemplateEngine;
