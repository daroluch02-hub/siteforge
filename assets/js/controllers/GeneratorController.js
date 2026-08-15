/**
 * GeneratorController - Handles generation workflow and state
 */
import { eventBus, EVENTS } from '../core/EventBus.js';
import ParserService from '../services/ParserService.js';
import GeneratorService from '../services/GeneratorService.js';

export class GeneratorController {
    constructor() {
        this.parser = new ParserService();
        this.generator = new GeneratorService();
        this.isGenerating = false;
        this.currentProject = null;
        
        this.init();
    }

    init() {
        // Listen for generation requests
        eventBus.on(EVENTS.GENERATE_REQUESTED, (data) => {
            if (typeof data === 'string') {
                this.generateFromPrompt(data);
            } else if (data && data.prompt) {
                this.generateFromPrompt(data.prompt);
            }
        });

        // Template selection triggers generation
        eventBus.on(EVENTS.TEMPLATE_SELECTED, (template) => {
            if (template && template.prompt) {
                this.generateFromPrompt(template.prompt);
            }
        });
    }

    /**
     * Generate project from text prompt
     * @param {string} prompt - User's natural language description
     */
    async generateFromPrompt(prompt) {
        if (this.isGenerating) {
            console.warn('Generation already in progress');
            return;
        }

        try {
            this.isGenerating = true;
            eventBus.emit(EVENTS.GENERATE_STARTED, { prompt });

            // Step 1: Parse the prompt
            eventBus.emit(EVENTS.PARSE_STARTED, { prompt });
            const parsed = this.parser.parse(prompt);
            eventBus.emit(EVENTS.PARSE_COMPLETED, parsed);

            // Step 2: Generate the project
            const project = this.generator.generate(parsed);
            
            // Store current project
            this.currentProject = project;

            // Step 3: Emit completion
            eventBus.emit(EVENTS.GENERATE_COMPLETED, project);

            return project;

        } catch (error) {
            console.error('Generation failed:', error);
            eventBus.emit(EVENTS.GENERATE_ERROR, error);
            throw error;
        } finally {
            this.isGenerating = false;
        }
    }

    /**
     * Get current project
     * @returns {Object|null}
     */
    getCurrentProject() {
        return this.currentProject;
    }

    /**
     * Check if generation is in progress
     * @returns {boolean}
     */
    getIsGenerating() {
        return this.isGenerating;
    }

    /**
     * Re-generate with modified settings
     * @param {Object} modifications - Settings to modify
     */
    async regenerate(modifications) {
        if (!this.currentProject) {
            throw new Error('No project to regenerate');
        }

        const updatedProject = {
            ...this.currentProject,
            ...modifications
        };

        this.currentProject = updatedProject;
        eventBus.emit(EVENTS.GENERATE_COMPLETED, updatedProject);

        return updatedProject;
    }

    /**
     * Export current project
     * @returns {Object}
     */
    exportProject() {
        if (!this.currentProject) {
            return null;
        }

        return {
            ...this.currentProject,
            exportedAt: new Date().toISOString()
        };
    }

    /**
     * Clear current project
     */
    clearProject() {
        this.currentProject = null;
        eventBus.emit(EVENTS.PROJECT_CLEARED);
    }
}

export default GeneratorController;
