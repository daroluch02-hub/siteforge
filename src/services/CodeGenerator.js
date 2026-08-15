/**
 * Code Generator Service
 * Parses text descriptions and generates code structures
 */

export class CodeGenerator {
  constructor() {
    this.keywords = {
      website: ['website', 'site', 'web page', 'landing page'],
      app: ['app', 'application', 'webapp', 'web app'],
      dashboard: ['dashboard', 'admin', 'panel', 'analytics'],
      form: ['form', 'contact', 'signup', 'registration', 'login'],
      responsive: ['responsive', 'mobile', 'adaptive'],
      modern: ['modern', 'contemporary', 'sleek', 'minimal'],
      interactive: ['interactive', 'dynamic', 'animated'],
      api: ['api', 'backend', 'server', 'database']
    };
  }

  /**
   * Parse requirements from text description
   * @param {string} description - Text description
   * @returns {Promise<Object>} Parsed requirements
   */
  async parseRequirements(description) {
    try {
      const lowerDesc = description.toLowerCase();
      
      const requirements = {
        title: this.extractTitle(description),
        description: description.trim(),
        type: this.detectType(lowerDesc),
        features: [],
        pages: [],
        components: [],
        colors: {},
        navigation: [],
        dashboard: false,
        forms: false,
        responsive: true,
        modern: false,
        interactive: false,
        api: false
      };

      // Detect features based on keywords
      if (this.hasKeyword(lowerDesc, 'dashboard')) {
        requirements.dashboard = true;
        requirements.features.push('dashboard');
      }

      if (this.hasKeyword(lowerDesc, 'form') || this.hasKeyword(lowerDesc, 'contact')) {
        requirements.forms = true;
        requirements.features.push('forms');
      }

      if (this.hasKeyword(lowerDesc, 'modern')) {
        requirements.modern = true;
        requirements.features.push('modern-design');
      }

      if (this.hasKeyword(lowerDesc, 'interactive') || this.hasKeyword(lowerDesc, 'animated')) {
        requirements.interactive = true;
        requirements.features.push('interactive');
      }

      if (this.hasKeyword(lowerDesc, 'api') || this.hasKeyword(lowerDesc, 'backend')) {
        requirements.api = true;
        requirements.features.push('api-integration');
      }

      // Extract pages mentioned
      requirements.pages = this.extractPages(lowerDesc);

      // Extract navigation items
      requirements.navigation = this.extractNavigation(lowerDesc);

      // Extract color preferences
      requirements.colors = this.extractColors(lowerDesc);

      return requirements;
    } catch (error) {
      console.error('Failed to parse requirements:', error.message);
      throw error;
    }
  }

  /**
   * Generate project structure
   * @param {Object} requirements - Parsed requirements
   * @param {string} type - Project type
   * @returns {Object} Project structure
   */
  generateStructure(requirements, type = 'website') {
    const id = this.generateId();
    
    return {
      id,
      type: requirements.type || type,
      name: requirements.title?.toLowerCase().replace(/\s+/g, '-') || 'siteforge-project',
      version: '1.0.0',
      files: [
        'index.html',
        'css/styles.css',
        'js/app.js',
        'README.md',
        '.siteforge.json'
      ],
      directories: [
        'css',
        'js',
        'assets',
        'components'
      ],
      metadata: {
        createdAt: new Date().toISOString(),
        generator: 'SiteForge CodeGenerator',
        requirements
      }
    };
  }

  /**
   * Merge two project structures
   * @param {Object} existing - Existing structure
   * @param {Object} updates - Updates to merge
   * @returns {Object} Merged structure
   */
  mergeStructures(existing, updates) {
    const merged = { ...existing };

    // Merge features
    if (updates.features) {
      merged.metadata.requirements.features = [
        ...(existing.metadata?.requirements?.features || []),
        ...updates.features
      ].filter((v, i, a) => a.indexOf(v) === i); // Remove duplicates
    }

    // Merge pages
    if (updates.pages) {
      merged.metadata.requirements.pages = [
        ...(existing.metadata?.requirements?.pages || []),
        ...updates.pages
      ].filter((v, i, a) => a.indexOf(v) === i);
    }

    // Update timestamp
    merged.metadata.updatedAt = new Date().toISOString();

    return merged;
  }

  /**
   * Extract title from description
   * @private
   */
  extractTitle(description) {
    // Try to find title in quotes
    const quotedMatch = description.match(/["']([^"']+)["']/);
    if (quotedMatch) {
      return quotedMatch[1];
    }

    // Try to find title after "called" or "named"
    const namedMatch = description.match(/(?:called|named)\s+["']?([^"'\n.]+)["']?/i);
    if (namedMatch) {
      return namedMatch[1].trim();
    }

    // Use first sentence as title
    const firstSentence = description.split('.')[0].trim();
    if (firstSentence.length > 0 && firstSentence.length < 100) {
      return firstSentence;
    }

    return 'SiteForge App';
  }

  /**
   * Detect project type from description
   * @private
   */
  detectType(description) {
    if (this.hasKeyword(description, 'landing page')) {
      return 'landing-page';
    }
    if (this.hasKeyword(description, 'app') || this.hasKeyword(description, 'application')) {
      return 'webapp';
    }
    if (this.hasKeyword(description, 'dashboard')) {
      return 'dashboard';
    }
    return 'website';
  }

  /**
   * Extract pages from description
   * @private
   */
  extractPages(description) {
    const pages = [];
    const pageKeywords = ['home', 'about', 'contact', 'services', 'products', 'blog', 'faq', 'pricing'];

    for (const keyword of pageKeywords) {
      if (description.includes(keyword)) {
        pages.push(keyword);
      }
    }

    return pages;
  }

  /**
   * Extract navigation items from description
   * @private
   */
  extractNavigation(description) {
    const navItems = [];
    const navPatterns = [
      /navigation[:\s]+([^.\n]+)/i,
      /menu[:\s]+([^.\n]+)/i,
      /links[:\s]+([^.\n]+)/i
    ];

    for (const pattern of navPatterns) {
      const match = description.match(pattern);
      if (match) {
        const items = match[1].split(',').map(item => item.trim());
        for (const item of items) {
          if (item.length > 0) {
            navItems.push({
              label: item.charAt(0).toUpperCase() + item.slice(1),
              href: `/${item.toLowerCase().replace(/\s+/g, '-')}`
            });
          }
        }
        break;
      }
    }

    return navItems;
  }

  /**
   * Extract color preferences from description
   * @private
   */
  extractColors(description) {
    const colors = {};
    const colorPatterns = {
      primary: /primary\s+color[:\s]+(#?[a-f0-9]+)/i,
      secondary: /secondary\s+color[:\s]+(#?[a-f0-9]+)/i,
      accent: /accent\s+color[:\s]+(#?[a-f0-9]+)/i,
      background: /background\s+color[:\s]+(#?[a-f0-9]+)/i
    };

    for (const [key, pattern] of Object.entries(colorPatterns)) {
      const match = description.match(pattern);
      if (match) {
        let color = match[1];
        // Add # if missing
        if (!color.startsWith('#')) {
          color = `#${color}`;
        }
        colors[key] = color;
      }
    }

    return colors;
  }

  /**
   * Check if description contains any of the keywords
   * @private
   */
  hasKeyword(description, keyword) {
    return description.includes(keyword.toLowerCase());
  }

  /**
   * Generate unique ID
   * @private
   */
  generateId() {
    return `sf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default CodeGenerator;
