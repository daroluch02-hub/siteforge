/**
 * Unit tests for TemplateEngine service
 */

import { TemplateEngine } from '../../src/services/TemplateEngine.js';

describe('TemplateEngine', () => {
  let templateEngine;

  beforeEach(() => {
    templateEngine = new TemplateEngine();
  });

  describe('constructor', () => {
    test('should initialize with default template directory', () => {
      expect(templateEngine.templateDir).toBe('./templates');
    });

    test('should initialize templates map', () => {
      expect(templateEngine.templates).toBeDefined();
      expect(templateEngine.templates.size).toBeGreaterThan(0);
    });

    test('should have default HTML templates', () => {
      expect(templateEngine.templates.has('html-basic')).toBe(true);
      expect(templateEngine.templates.has('html-landing')).toBe(true);
      expect(templateEngine.templates.has('html-dashboard')).toBe(true);
      expect(templateEngine.templates.has('html-form')).toBe(true);
    });

    test('should have default CSS templates', () => {
      expect(templateEngine.templates.has('css-reset')).toBe(true);
      expect(templateEngine.templates.has('css-modern')).toBe(true);
      expect(templateEngine.templates.has('css-responsive')).toBe(true);
    });

    test('should have default JavaScript templates', () => {
      expect(templateEngine.templates.has('js-basic')).toBe(true);
      expect(templateEngine.templates.has('js-interactive')).toBe(true);
      expect(templateEngine.templates.has('js-api')).toBe(true);
    });
  });

  describe('generateTemplates', () => {
    test('should generate basic files array', async () => {
      const requirements = {
        title: 'Test Site',
        description: 'A test website'
      };
      
      const files = await templateEngine.generateTemplates(requirements, 'website');
      
      expect(Array.isArray(files)).toBe(true);
      expect(files.length).toBeGreaterThan(0);
      
      // Check for expected files
      const fileNames = files.map(f => f.path);
      expect(fileNames).toContain('index.html');
      expect(fileNames).toContain('css/styles.css');
      expect(fileNames).toContain('js/app.js');
    });

    test('should generate files with content', async () => {
      const requirements = {
        title: 'My App',
        description: 'Test description'
      };
      
      const files = await templateEngine.generateTemplates(requirements);
      
      for (const file of files) {
        expect(file.content).toBeDefined();
        expect(typeof file.content).toBe('string');
        expect(file.content.length).toBeGreaterThan(0);
      }
    });

    test('should select landing page template for landing-page type', async () => {
      const requirements = {
        title: 'Landing Page'
      };
      
      const files = await templateEngine.generateTemplates(requirements, 'landing-page');
      
      const htmlFile = files.find(f => f.path === 'index.html');
      expect(htmlFile.content).toContain('hero');
      expect(htmlFile.content).toContain('cta-button');
    });

    test('should select dashboard template for dashboard requirement', async () => {
      const requirements = {
        title: 'Dashboard',
        dashboard: true
      };
      
      const files = await templateEngine.generateTemplates(requirements);
      
      const htmlFile = files.find(f => f.path === 'index.html');
      expect(htmlFile.content).toContain('dashboard');
    });

    test('should generate additional pages if specified', async () => {
      const requirements = {
        title: 'Multi-page Site',
        pages: ['about', 'contact']
      };
      
      const files = await templateEngine.generateTemplates(requirements);
      
      const fileNames = files.map(f => f.path);
      expect(fileNames).toContain('about.html');
      expect(fileNames).toContain('contact.html');
    });
  });

  describe('renderHTML', () => {
    test('should replace title placeholder', () => {
      const template = '<title>{{title}}</title>';
      const requirements = { title: 'My Website' };
      
      const result = templateEngine.renderHTML(template, requirements);
      expect(result).toContain('<title>My Website</title>');
    });

    test('should replace description placeholder', () => {
      const template = '<meta name="description" content="{{description}}">';
      const requirements = { description: 'Site description' };
      
      const result = templateEngine.renderHTML(template, requirements);
      expect(result).toContain('Site description');
    });

    test('should replace year placeholder', () => {
      const template = '&copy; {{year}}';
      const requirements = {};
      
      const result = templateEngine.renderHTML(template, requirements);
      const currentYear = new Date().getFullYear().toString();
      expect(result).toContain(currentYear);
    });

    test('should use default title if not provided', () => {
      const template = '<title>{{title}}</title>';
      const requirements = {};
      
      const result = templateEngine.renderHTML(template, requirements);
      expect(result).toContain('SiteForge App');
    });

    test('should generate navigation if provided', () => {
      const template = '<!-- NAVIGATION -->';
      const requirements = {
        navigation: [
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' }
        ]
      };
      
      const result = templateEngine.renderHTML(template, requirements);
      expect(result).toContain('<nav');
      expect(result).toContain('Home');
      expect(result).toContain('About');
    });
  });

  describe('renderCSS', () => {
    test('should replace color variables if provided', () => {
      const template = '/* COLOR_VARS */';
      const requirements = {
        colors: {
          'primary-color': '#FF5733',
          'secondary-color': '#3498db'
        }
      };
      
      const result = templateEngine.renderCSS(template, requirements);
      expect(result).toContain(':root');
      expect(result).toContain('--primary-color: #FF5733');
      expect(result).toContain('--secondary-color: #3498db');
    });

    test('should remove color vars placeholder if no colors provided', () => {
      const template = '/* COLOR_VARS */';
      const requirements = {};
      
      const result = templateEngine.renderCSS(template, requirements);
      expect(result).not.toContain('/* COLOR_VARS */');
    });
  });

  describe('renderJavaScript', () => {
    test('should replace app name placeholder', () => {
      const template = '// {{appName}} - Main';
      const requirements = { title: 'MyApp' };
      
      const result = templateEngine.renderJavaScript(template, requirements);
      expect(result).toContain('// MyApp - Main');
    });

    test('should add API endpoints if provided', () => {
      const template = '// API_ENDPOINTS';
      const requirements = {
        apiEndpoints: {
          users: '/api/users',
          posts: '/api/posts'
        }
      };
      
      const result = templateEngine.renderJavaScript(template, requirements);
      expect(result).toContain('API_ENDPOINTS');
      expect(result).toContain('/api/users');
    });
  });

  describe('generateNavigation', () => {
    test('should generate nav HTML from items array', () => {
      const items = [
        { label: 'Home', href: '/' },
        { label: 'Contact', href: '/contact' }
      ];
      
      const result = templateEngine.generateNavigation(items);
      expect(result).toContain('<nav');
      expect(result).toContain('<ul');
      expect(result).toContain('Home');
      expect(result).toContain('Contact');
    });

    test('should use default href if not provided', () => {
      const items = [{ label: 'Link' }];
      
      const result = templateEngine.generateNavigation(items);
      expect(result).toContain('href="#"');
    });
  });

  describe('getComponentHTML', () => {
    test('should generate component HTML structure', () => {
      const component = { name: 'Header' };
      
      const result = templateEngine.getComponentHTML(component);
      expect(result).toContain('Header Component');
      expect(result).toContain('header-container');
    });
  });

  describe('getComponentCSS', () => {
    test('should generate component CSS structure', () => {
      const component = { name: 'Footer' };
      
      const result = templateEngine.getComponentCSS(component);
      expect(result).toContain('Footer Component Styles');
      expect(result).toContain('.footer-container');
    });
  });

  describe('getComponentJS', () => {
    test('should generate component JS class', () => {
      const component = { name: 'Modal' };
      
      const result = templateEngine.getComponentJS(component);
      expect(result).toContain('ModalComponent');
      expect(result).toContain('constructor');
      expect(result).toContain('init()');
    });
  });

  describe('selectHTMLTemplate', () => {
    test('should return landing template for landing-page type', () => {
      const result = templateEngine.selectHTMLTemplate({}, 'landing-page');
      expect(result).toContain('hero');
    });

    test('should return dashboard template for dashboard requirement', () => {
      const result = templateEngine.selectHTMLTemplate({ dashboard: true }, 'website');
      expect(result).toContain('dashboard-layout');
    });

    test('should return form template for forms requirement', () => {
      const result = templateEngine.selectHTMLTemplate({ forms: true }, 'website');
      expect(result).toContain('form');
    });

    test('should return basic template by default', () => {
      const result = templateEngine.selectHTMLTemplate({}, 'website');
      expect(result).toContain('<!DOCTYPE html>');
    });
  });

  describe('selectCSSTemplate', () => {
    test('should return responsive template by default', () => {
      const result = templateEngine.selectCSSTemplate({}, 'website');
      expect(result).toContain('@media');
    });

    test('should return modern template when modern flag is set and responsive is false', () => {
      const result = templateEngine.selectCSSTemplate({ modern: true, responsive: false }, 'website');
      expect(result).toContain('--border-radius');
    });

    test('should return reset template when responsive is false', () => {
      const result = templateEngine.selectCSSTemplate({ responsive: false }, 'website');
      expect(result).toContain('CSS Reset');
    });
  });

  describe('selectJSTemplate', () => {
    test('should return API template for api requirement', () => {
      const result = templateEngine.selectJSTemplate({ api: true }, 'website');
      expect(result).toContain('APIClient');
    });

    test('should return interactive template for interactive requirement', () => {
      const result = templateEngine.selectJSTemplate({ interactive: true }, 'website');
      expect(result).toContain('class App');
    });

    test('should return basic template by default', () => {
      const result = templateEngine.selectJSTemplate({}, 'website');
      expect(result).toContain('DOMContentLoaded');
    });
  });
});
