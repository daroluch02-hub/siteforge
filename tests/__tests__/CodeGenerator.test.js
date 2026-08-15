/**
 * Unit tests for CodeGenerator service
 */

import { CodeGenerator } from '../../src/services/CodeGenerator.js';

describe('CodeGenerator', () => {
  let codeGenerator;

  beforeEach(() => {
    codeGenerator = new CodeGenerator();
  });

  describe('parseRequirements', () => {
    test('should parse basic description', async () => {
      const description = 'Create a simple website';
      const requirements = await codeGenerator.parseRequirements(description);
      
      expect(requirements.title).toBeDefined();
      expect(requirements.description).toBe(description);
      expect(requirements.type).toBe('website');
    });

    test('should detect dashboard type', async () => {
      const description = 'Build an analytics dashboard with charts';
      const requirements = await codeGenerator.parseRequirements(description);
      
      expect(requirements.dashboard).toBe(true);
      expect(requirements.type).toBe('dashboard');
    });

    test('should detect forms requirement', async () => {
      const description = 'Create a contact form for the website';
      const requirements = await codeGenerator.parseRequirements(description);
      
      expect(requirements.forms).toBe(true);
    });

    test('should detect modern design requirement', async () => {
      const description = 'Build a modern and sleek website';
      const requirements = await codeGenerator.parseRequirements(description);
      
      expect(requirements.modern).toBe(true);
    });

    test('should detect interactive requirement', async () => {
      const description = 'Create an interactive web application with animations';
      const requirements = await codeGenerator.parseRequirements(description);
      
      expect(requirements.interactive).toBe(true);
    });

    test('should detect API requirement', async () => {
      const description = 'Build a web app with backend API integration';
      const requirements = await codeGenerator.parseRequirements(description);
      
      expect(requirements.api).toBe(true);
    });

    test('should extract title from quotes', async () => {
      const description = 'Create a website called "My Awesome Site"';
      const requirements = await codeGenerator.parseRequirements(description);
      
      expect(requirements.title).toBe('My Awesome Site');
    });

    test('should extract pages from description', async () => {
      const description = 'Build a website with home, about, and contact pages';
      const requirements = await codeGenerator.parseRequirements(description);
      
      expect(requirements.pages).toContain('home');
      expect(requirements.pages).toContain('about');
      expect(requirements.pages).toContain('contact');
    });

    test('should return default values for minimal input', async () => {
      const description = 'site';
      const requirements = await codeGenerator.parseRequirements(description);
      
      expect(requirements.responsive).toBe(true);
      expect(requirements.features).toEqual(expect.any(Array));
    });
  });

  describe('generateStructure', () => {
    test('should generate project structure with required fields', async () => {
      const requirements = await codeGenerator.parseRequirements('Test project');
      const structure = codeGenerator.generateStructure(requirements, 'website');
      
      expect(structure.id).toBeDefined();
      expect(structure.type).toBe('website');
      expect(structure.name).toBeDefined();
      expect(structure.version).toBe('1.0.0');
      expect(structure.files).toContain('index.html');
      expect(structure.files).toContain('css/styles.css');
      expect(structure.files).toContain('js/app.js');
      expect(structure.directories).toContain('css');
      expect(structure.directories).toContain('js');
    });

    test('should generate unique IDs for different structures', async () => {
      const requirements1 = await codeGenerator.parseRequirements('Project 1');
      const requirements2 = await codeGenerator.parseRequirements('Project 2');
      
      const structure1 = codeGenerator.generateStructure(requirements1);
      const structure2 = codeGenerator.generateStructure(requirements2);
      
      expect(structure1.id).not.toBe(structure2.id);
    });

    test('should include metadata in structure', async () => {
      const requirements = await codeGenerator.parseRequirements('Test');
      const structure = codeGenerator.generateStructure(requirements);
      
      expect(structure.metadata).toBeDefined();
      expect(structure.metadata.generator).toBe('SiteForge CodeGenerator');
      expect(structure.metadata.createdAt).toBeDefined();
    });
  });

  describe('mergeStructures', () => {
    test('should merge features from both structures', async () => {
      const existingReqs = await codeGenerator.parseRequirements('Existing site');
      const existing = codeGenerator.generateStructure(existingReqs);
      
      const updates = {
        features: ['new-feature']
      };
      
      const merged = codeGenerator.mergeStructures(existing, updates);
      
      expect(merged.metadata.requirements.features).toContain('new-feature');
    });

    test('should merge pages without duplicates', async () => {
      const existingReqs = await codeGenerator.parseRequirements('Site with home page');
      const existing = codeGenerator.generateStructure(existingReqs);
      
      const updates = {
        pages: ['home', 'about']
      };
      
      const merged = codeGenerator.mergeStructures(existing, updates);
      
      const pages = merged.metadata.requirements.pages;
      expect(pages).toContain('home');
      expect(pages).toContain('about');
      
      // Check no duplicates
      const uniquePages = [...new Set(pages)];
      expect(uniquePages.length).toBe(pages.length);
    });

    test('should update timestamp on merge', () => {
      const existing = {
        id: 'test-123',
        metadata: {
          requirements: {}
        }
      };
      
      const merged = codeGenerator.mergeStructures(existing, { features: ['test'] });
      
      expect(merged.metadata.updatedAt).toBeDefined();
    });
  });

  describe('extractTitle', () => {
    test('should extract title from quoted text', () => {
      const description = 'Build "My Website" please';
      const title = codeGenerator.extractTitle(description);
      expect(title).toBe('My Website');
    });

    test('should extract title after "called"', () => {
      const description = 'Create a website called TestSite';
      const title = codeGenerator.extractTitle(description);
      expect(title).toBe('TestSite');
    });

    test('should use first sentence as fallback', () => {
      const description = 'This is my awesome project. It does many things.';
      const title = codeGenerator.extractTitle(description);
      expect(title).toBe('This is my awesome project');
    });

    test('should return default for empty description', () => {
      const title = codeGenerator.extractTitle('');
      expect(title).toBe('SiteForge App');
    });
  });

  describe('detectType', () => {
    test('should detect landing-page type', () => {
      expect(codeGenerator.detectType('landing page')).toBe('landing-page');
    });

    test('should detect webapp type', () => {
      expect(codeGenerator.detectType('web application')).toBe('webapp');
      expect(codeGenerator.detectType('mobile app')).toBe('webapp');
    });

    test('should detect dashboard type', () => {
      expect(codeGenerator.detectType('admin dashboard')).toBe('dashboard');
    });

    test('should default to website type', () => {
      expect(codeGenerator.detectType('simple site')).toBe('website');
    });
  });

  describe('extractPages', () => {
    test('should extract common page names', () => {
      const description = 'Include home, about, contact, and blog pages';
      const pages = codeGenerator.extractPages(description);
      
      expect(pages).toContain('home');
      expect(pages).toContain('about');
      expect(pages).toContain('contact');
      expect(pages).toContain('blog');
    });

    test('should return empty array for no pages', () => {
      const pages = codeGenerator.extractPages('no specific pages');
      expect(pages).toEqual([]);
    });
  });

  describe('extractColors', () => {
    test('should extract color with hex value', () => {
      const description = 'Use primary color: #FF5733';
      const colors = codeGenerator.extractColors(description);
      expect(colors.primary).toBe('#FF5733');
    });

    test('should extract color without hash', () => {
      const description = 'Use secondary color: 3498db';
      const colors = codeGenerator.extractColors(description);
      expect(colors.secondary).toBe('#3498db');
    });

    test('should return empty object for no colors', () => {
      const colors = codeGenerator.extractColors('no colors specified');
      expect(colors).toEqual({});
    });
  });
});
