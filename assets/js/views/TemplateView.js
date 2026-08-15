/**
 * TemplateView - Manages the template gallery view
 */
import { $, $$, createElement, clear } from '../utils/dom.js';
import { eventBus, EVENTS } from '../core/EventBus.js';

export class TemplateView {
    constructor() {
        this.templateGallery = null;
        this.init();
    }

    init() {
        this.templateGallery = $('template-gallery');
    }

    /**
     * Render templates in the gallery
     * @param {Array} templates 
     */
    render(templates) {
        if (!this.templateGallery) return;

        clear(this.templateGallery);

        templates.forEach(template => {
            const card = createElement('div', {
                className: 'template-card'
            });

            const title = createElement('h4', {}, `${template.icon} ${template.name}`);
            const desc = createElement('p', {}, template.description);

            card.appendChild(title);
            card.appendChild(desc);

            card.addEventListener('click', () => {
                eventBus.emit(EVENTS.TEMPLATE_SELECTED, template);
            });

            this.templateGallery.appendChild(card);
        });
    }

    /**
     * Show loading state
     */
    showLoading() {
        if (this.templateGallery) {
            setHTML(this.templateGallery, '<p>Loading templates...</p>');
        }
    }

    /**
     * Clear the gallery
     */
    clear() {
        if (this.templateGallery) {
            clear(this.templateGallery);
        }
    }
}

export default TemplateView;
