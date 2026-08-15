/**
 * TemplateLibrary - Pre-built templates for quick site generation
 */
export class TemplateLibrary {
    constructor() {
        this.templates = [
            {
                id: 'restaurant',
                name: 'Restaurant',
                description: 'Perfect for restaurants and cafes',
                prompt: 'Create a restaurant website with dark theme, orange accent color, featuring hero, menu, about us, services, and contact sections',
                icon: '🍽️'
            },
            {
                id: 'portfolio',
                name: 'Portfolio',
                description: 'Showcase your work and skills',
                prompt: 'Create a portfolio website with modern theme, purple accent color, featuring hero, about, gallery, services, and contact sections',
                icon: '🎨'
            },
            {
                id: 'saas',
                name: 'SaaS Landing',
                description: 'Software as a Service landing page',
                prompt: 'Create a SaaS landing page with dark theme, blue accent color, featuring hero, features, pricing, testimonials, FAQ, and contact sections',
                icon: '💻'
            },
            {
                id: 'business',
                name: 'Business',
                description: 'Professional business website',
                prompt: 'Create a business website with professional theme, teal accent color, featuring hero, services, about, team, and contact sections',
                icon: '🏢'
            },
            {
                id: 'ecommerce',
                name: 'E-commerce',
                description: 'Online store template',
                prompt: 'Create an ecommerce website with modern theme, green accent color, featuring hero, features, pricing, testimonials, and contact sections',
                icon: '🛒'
            },
            {
                id: 'blog',
                name: 'Blog',
                description: 'Personal or company blog',
                prompt: 'Create a blog website with light theme, indigo accent color, featuring hero, features, about, and contact sections',
                icon: '📝'
            },
            {
                id: 'todo-app',
                name: 'Todo App',
                description: 'Interactive task manager',
                prompt: 'Create a todo app with dark theme and blue accent color',
                icon: '✅'
            },
            {
                id: 'calculator',
                name: 'Calculator',
                description: 'Functional calculator app',
                prompt: 'Create a calculator app with dark theme and orange accent color',
                icon: '🔢'
            },
            {
                id: 'quiz',
                name: 'Quiz App',
                description: 'Interactive quiz application',
                prompt: 'Create a quiz app with dark theme and purple accent color',
                icon: '🧠'
            },
            {
                id: 'pomodoro',
                name: 'Pomodoro Timer',
                description: 'Productivity timer app',
                prompt: 'Create a pomodoro timer app with dark theme and red accent color',
                icon: '🍅'
            },
            {
                id: 'notes',
                name: 'Notes App',
                description: 'Note-taking application',
                prompt: 'Create a notes app with dark theme and yellow accent color',
                icon: '📓'
            },
            {
                id: 'counter',
                name: 'Counter',
                description: 'Simple counter app',
                prompt: 'Create a counter app with dark theme and green accent color',
                icon: '🔢'
            }
        ];
    }

    /**
     * Get all templates
     * @returns {Array}
     */
    getAll() {
        return this.templates;
    }

    /**
     * Get template by ID
     * @param {string} id - Template ID
     * @returns {Object|null}
     */
    getById(id) {
        return this.templates.find(t => t.id === id) || null;
    }

    /**
     * Search templates by keyword
     * @param {string} query - Search query
     * @returns {Array}
     */
    search(query) {
        const q = query.toLowerCase();
        return this.templates.filter(t => 
            t.name.toLowerCase().includes(q) ||
            t.description.toLowerCase().includes(q)
        );
    }

    /**
     * Get template prompt
     * @param {string} id - Template ID
     * @returns {string|null}
     */
    getPrompt(id) {
        const template = this.getById(id);
        return template ? template.prompt : null;
    }

    /**
     * Add custom template
     * @param {Object} template - Template object
     */
    addTemplate(template) {
        if (!template.id || !template.name || !template.prompt) {
            throw new Error('Template must have id, name, and prompt');
        }
        this.templates.push(template);
    }

    /**
     * Remove template
     * @param {string} id - Template ID
     */
    removeTemplate(id) {
        this.templates = this.templates.filter(t => t.id !== id);
    }

    /**
     * Get templates by category
     * @param {string} category - 'website' or 'app'
     * @returns {Array}
     */
    getByCategory(category) {
        const appTemplates = ['todo-app', 'calculator', 'quiz', 'pomodoro', 'notes', 'counter'];
        
        if (category === 'app') {
            return this.templates.filter(t => appTemplates.includes(t.id));
        } else if (category === 'website') {
            return this.templates.filter(t => !appTemplates.includes(t.id));
        }
        return this.templates;
    }

    /**
     * Export templates as JSON
     * @returns {string}
     */
    exportJSON() {
        return JSON.stringify(this.templates, null, 2);
    }

    /**
     * Import templates from JSON
     * @param {string} json - JSON string
     */
    importJSON(json) {
        try {
            const imported = JSON.parse(json);
            if (Array.isArray(imported)) {
                this.templates = [...this.templates, ...imported];
            }
        } catch (error) {
            throw new Error('Invalid JSON format');
        }
    }
}

export default TemplateLibrary;
