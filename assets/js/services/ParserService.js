/**
 * ParserService - Parses natural language input to extract project requirements
 */
export class ParserService {
    constructor() {
        this.businessTypes = ['restaurant', 'portfolio', 'saas', 'business', 'ecommerce', 'blog', 'landing'];
        this.appTypes = ['todo', 'calculator', 'quiz', 'timer', 'pomodoro', 'notes', 'counter', 'stopwatch'];
        this.sections = [
            'about', 'features', 'services', 'menu', 'pricing', 'testimonials', 
            'faq', 'contact', 'hero', 'gallery', 'team', 'stats'
        ];
        this.themes = ['dark', 'light', 'minimal', 'modern', 'professional'];
        this.colors = {
            'blue': '#007acc',
            'red': '#e74c3c',
            'green': '#27ae60',
            'purple': '#9b59b6',
            'orange': '#e67e22',
            'pink': '#e91e63',
            'teal': '#009688',
            'yellow': '#f39c12',
            'indigo': '#667eea',
            'cyan': '#00bcd4'
        };
    }

    /**
     * Parse user input and extract requirements
     * @param {string} input - User's natural language description
     * @returns {Object} Parsed requirements
     */
    parse(input) {
        if (!input || typeof input !== 'string') {
            throw new Error('Invalid input: expected a string');
        }

        const text = input.toLowerCase();
        
        const result = {
            type: this.detectType(text),
            theme: this.detectTheme(text),
            accentColor: this.detectColor(text),
            sections: this.detectSections(text),
            appName: this.extractAppName(input),
            features: this.detectFeatures(text),
            isApp: this.isApplication(text),
            rawInput: input
        };

        return result;
    }

    /**
     * Detect business/app type from input
     * @param {string} text 
     * @returns {string}
     */
    detectType(text) {
        // Check for app types first
        for (const appType of this.appTypes) {
            if (text.includes(appType) || text.includes(appType.replace('o', 'o '))) {
                return appType;
            }
        }

        // Check for business types
        const typeKeywords = {
            'restaurant': ['restaurant', 'cafe', 'coffee', 'food', 'menu', 'dining', 'bistro'],
            'portfolio': ['portfolio', 'personal', 'resume', 'cv', 'showcase', 'photographer', 'artist'],
            'saas': ['saas', 'software', 'platform', 'app', 'subscription', 'dashboard'],
            'ecommerce': ['ecommerce', 'shop', 'store', 'products', 'buy', 'sell', 'marketplace'],
            'blog': ['blog', 'news', 'articles', 'magazine', 'publication'],
            'landing': ['landing', 'product launch', 'coming soon', 'waitlist'],
            'business': ['business', 'company', 'corporate', 'agency', 'services']
        };

        for (const [type, keywords] of Object.entries(typeKeywords)) {
            for (const keyword of keywords) {
                if (text.includes(keyword)) {
                    return type;
                }
            }
        }

        return 'business'; // Default type
    }

    /**
     * Detect theme preference
     * @param {string} text 
     * @returns {string}
     */
    detectTheme(text) {
        if (text.includes('dark')) return 'dark';
        if (text.includes('light')) return 'light';
        if (text.includes('minimal')) return 'minimal';
        if (text.includes('modern')) return 'modern';
        if (text.includes('professional') || text.includes('corporate')) return 'professional';
        return 'dark'; // Default to dark theme for IDE feel
    }

    /**
     * Detect accent color
     * @param {string} text 
     * @returns {string} Hex color code
     */
    detectColor(text) {
        for (const [colorName, hexCode] of Object.entries(this.colors)) {
            if (text.includes(colorName)) {
                return hexCode;
            }
        }
        return '#007acc'; // Default blue
    }

    /**
     * Detect requested sections
     * @param {string} text 
     * @returns {Array<string>}
     */
    detectSections(text) {
        const foundSections = [];
        
        for (const section of this.sections) {
            if (text.includes(section) || text.includes(section + ' section') || text.includes('about us')) {
                if (section === 'about' && text.includes('about us')) {
                    foundSections.push('about');
                } else if (!foundSections.includes(section)) {
                    foundSections.push(section);
                }
            }
        }

        // Add default sections based on type
        const defaultSections = {
            'restaurant': ['hero', 'menu', 'about', 'contact'],
            'portfolio': ['hero', 'about', 'gallery', 'contact'],
            'saas': ['hero', 'features', 'pricing', 'testimonials', 'contact'],
            'business': ['hero', 'services', 'about', 'contact'],
            'ecommerce': ['hero', 'features', 'pricing', 'contact'],
            'blog': ['hero', 'features', 'contact'],
            'landing': ['hero', 'features', 'pricing', 'contact']
        };

        if (foundSections.length === 0 && defaultSections[this.detectType(text)]) {
            return defaultSections[this.detectType(text)];
        }

        return foundSections.length > 0 ? foundSections : ['hero', 'about', 'contact'];
    }

    /**
     * Extract app/project name from input
     * @param {string} input 
     * @returns {string}
     */
    extractAppName(input) {
        // Try to find quoted name
        const quotedMatch = input.match(/["']([^"']+)["']/);
        if (quotedMatch) {
            return quotedMatch[1];
        }

        // Try to find "called X" or "named X"
        const namedMatch = input.match(/(?:called|named)\s+([A-Za-z][A-Za-z0-9\s-]+)/i);
        if (namedMatch) {
            return namedMatch[1].trim();
        }

        // Generate from first few words
        const words = input.split(/\s+/).slice(0, 3);
        return words.join(' ').replace(/[^a-zA-Z0-9\s]/g, '').trim() || 'My Site';
    }

    /**
     * Detect special features
     * @param {string} text 
     * @returns {Array<string>}
     */
    detectFeatures(text) {
        const features = [];
        const featureMap = {
            'contact form': 'contactForm',
            'newsletter': 'newsletter',
            'search': 'search',
            'login': 'auth',
            'signup': 'auth',
            'cart': 'cart',
            'checkout': 'checkout',
            'dark mode': 'darkMode',
            'responsive': 'responsive',
            'animation': 'animations',
            'gallery': 'gallery',
            'slider': 'slider',
            'video': 'video',
            'map': 'map',
            'social': 'socialMedia',
            'blog': 'blog',
            'comments': 'comments'
        };

        for (const [keyword, feature] of Object.entries(featureMap)) {
            if (text.includes(keyword)) {
                features.push(feature);
            }
        }

        return features;
    }

    /**
     * Check if input describes an interactive app vs static site
     * @param {string} text 
     * @returns {boolean}
     */
    isApplication(text) {
        const appIndicators = [
            'todo', 'calculator', 'quiz', 'timer', 'pomodoro', 
            'notes', 'counter', 'stopwatch', 'interactive', 
            'app', 'application', 'tool'
        ];
        
        return appIndicators.some(indicator => text.includes(indicator));
    }

    /**
     * Get detection summary as chips data
     * @param {Object} parsedResult 
     * @returns {Array<Object>}
     */
    getDetectionChips(parsedResult) {
        const chips = [];

        if (parsedResult.type) {
            chips.push({
                label: parsedResult.type.charAt(0).toUpperCase() + parsedResult.type.slice(1),
                type: 'type'
            });
        }

        if (parsedResult.theme) {
            chips.push({
                label: parsedResult.theme.charAt(0).toUpperCase() + parsedResult.theme.slice(1) + ' Theme',
                type: 'theme'
            });
        }

        if (parsedResult.accentColor) {
            const colorName = Object.keys(this.colors).find(key => this.colors[key] === parsedResult.accentColor);
            chips.push({
                label: (colorName || 'Custom') + ' Accent',
                type: 'color'
            });
        }

        if (parsedResult.sections && parsedResult.sections.length > 0) {
            parsedResult.sections.forEach(section => {
                chips.push({
                    label: section.charAt(0).toUpperCase() + section.slice(1),
                    type: 'section'
                });
            });
        }

        return chips;
    }
}

export default ParserService;
