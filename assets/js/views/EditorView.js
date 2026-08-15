/**
 * EditorView - Manages the editor/generator panel UI
 */
import { $, $$, createElement, setText, setHTML, clear, show, hide } from '../utils/dom.js';
import { eventBus, EVENTS } from '../core/EventBus.js';

export class EditorView {
    constructor() {
        this.promptInput = null;
        this.generateBtn = null;
        this.detectedInfo = null;
        this.detectionChips = null;
        this.templateGallery = null;
        
        this.init();
        this.bindEvents();
    }

    init() {
        this.promptInput = $('prompt-input');
        this.generateBtn = $('btn-generate');
        this.detectedInfo = $('detected-info');
        this.detectionChips = $('detection-chips');
        this.templateGallery = $('template-gallery');
    }

    bindEvents() {
        if (this.generateBtn) {
            this.generateBtn.addEventListener('click', () => {
                const prompt = this.getPrompt();
                if (prompt.trim()) {
                    eventBus.emit(EVENTS.GENERATE_REQUESTED, prompt);
                }
            });
        }

        if (this.promptInput) {
            this.promptInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.ctrlKey) {
                    const prompt = this.getPrompt();
                    if (prompt.trim()) {
                        eventBus.emit(EVENTS.GENERATE_REQUESTED, prompt);
                    }
                }
            });
        }
    }

    /**
     * Get current prompt from input
     * @returns {string}
     */
    getPrompt() {
        return this.promptInput ? this.promptInput.value : '';
    }

    /**
     * Set prompt in input
     * @param {string} prompt 
     */
    setPrompt(prompt) {
        if (this.promptInput) {
            this.promptInput.value = prompt;
        }
    }

    /**
     * Show detection results as chips
     * @param {Array} chips - Array of chip objects {label, type}
     */
    showDetectionResults(chips) {
        if (!this.detectedInfo || !this.detectionChips) return;

        clear(this.detectionChips);

        chips.forEach(chip => {
            const chipEl = createElement('span', {
                className: `chip ${chip.type}`
            }, chip.label);
            this.detectionChips.appendChild(chipEl);
        });

        show(this.detectedInfo);
    }

    /**
     * Hide detection results
     */
    hideDetectionResults() {
        if (this.detectedInfo) {
            hide(this.detectedInfo);
        }
    }

    /**
     * Render template gallery
     * @param {Array} templates - Array of template objects
     */
    renderTemplates(templates) {
        if (!this.templateGallery) return;

        clear(this.templateGallery);

        templates.forEach(template => {
            const card = createElement('div', {
                className: 'template-card',
                onClick: () => {
                    eventBus.emit(EVENTS.TEMPLATE_SELECTED, template);
                    this.setPrompt(template.prompt);
                }
            });

            const title = createElement('h4', {}, `${template.icon} ${template.name}`);
            const desc = createElement('p', {}, template.description);

            card.appendChild(title);
            card.appendChild(desc);
            this.templateGallery.appendChild(card);
        });
    }

    /**
     * Clear the editor
     */
    clear() {
        if (this.promptInput) {
            this.promptInput.value = '';
        }
        this.hideDetectionResults();
    }

    /**
     * Set loading state
     * @param {boolean} isLoading 
     */
    setLoading(isLoading) {
        if (this.generateBtn) {
            this.generateBtn.disabled = isLoading;
            this.generateBtn.textContent = isLoading ? 'Generating...' : 'Generate Site';
        }
    }
}

export default EditorView;
