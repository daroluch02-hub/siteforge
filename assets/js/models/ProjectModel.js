/**
 * ProjectModel - Manages application state and data
 */
export class ProjectModel {
    constructor() {
        this.reset();
    }

    /**
     * Reset model to initial state
     */
    reset() {
        this.project = {
            id: null,
            name: '',
            description: '',
            type: 'business', // restaurant, portfolio, saas, business, app
            theme: 'dark',
            accentColor: '#007acc',
            sections: [],
            content: {},
            generatedHTML: '',
            generatedCSS: '',
            generatedJS: '',
            createdAt: null,
            updatedAt: null
        };
        this.detectionResults = null;
        this.templates = [];
    }

    /**
     * Set project from parsed data
     * @param {Object} data - Parsed project data
     */
    setProject(data) {
        this.project = {
            ...this.project,
            ...data,
            updatedAt: new Date().toISOString()
        };
        if (!this.project.createdAt) {
            this.project.createdAt = new Date().toISOString();
        }
        if (!this.project.id) {
            this.project.id = this.generateId();
        }
    }

    /**
     * Update specific project fields
     * @param {Object} fields - Fields to update
     */
    update(fields) {
        this.project = {
            ...this.project,
            ...fields,
            updatedAt: new Date().toISOString()
        };
    }

    /**
     * Set detection results
     * @param {Object} results - Parser detection results
     */
    setDetectionResults(results) {
        this.detectionResults = results;
    }

    /**
     * Get detection results
     * @returns {Object|null}
     */
    getDetectionResults() {
        return this.detectionResults;
    }

    /**
     * Set templates list
     * @param {Array} templates - Template list
     */
    setTemplates(templates) {
        this.templates = templates;
    }

    /**
     * Get templates
     * @returns {Array}
     */
    getTemplates() {
        return this.templates;
    }

    /**
     * Get current project
     * @returns {Object}
     */
    getProject() {
        return { ...this.project };
    }

    /**
     * Get project by ID
     * @param {string} id - Project ID
     * @returns {Object|null}
     */
    getProjectById(id) {
        if (this.project.id === id) {
            return { ...this.project };
        }
        return null;
    }

    /**
     * Generate unique ID
     * @returns {string}
     */
    generateId() {
        return 'proj_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Export project as JSON
     * @returns {string}
     */
    exportJSON() {
        return JSON.stringify(this.project, null, 2);
    }

    /**
     * Import project from JSON
     * @param {string} json - JSON string
     */
    importJSON(json) {
        try {
            const data = JSON.parse(json);
            this.setProject(data);
        } catch (error) {
            throw new Error('Invalid JSON format');
        }
    }

    /**
     * Get full HTML output
     * @returns {string}
     */
    getFullHTML() {
        return this.project.generatedHTML || '';
    }

    /**
     * Get full CSS output
     * @returns {string}
     */
    getFullCSS() {
        return this.project.generatedCSS || '';
    }

    /**
     * Get full JS output
     * @returns {string}
     */
    getFullJS() {
        return this.project.generatedJS || '';
    }

    /**
     * Set generated content
     * @param {string} html 
     * @param {string} css 
     * @param {string} js 
     */
    setGeneratedContent(html, css, js) {
        this.project.generatedHTML = html;
        this.project.generatedCSS = css;
        this.project.generatedJS = js;
        this.project.updatedAt = new Date().toISOString();
    }
}

export default ProjectModel;
