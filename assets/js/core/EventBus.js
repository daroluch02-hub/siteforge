/**
 * EventBus - Central event hub for SiteForge
 * Implements publish/subscribe pattern for decoupled communication
 */
export class EventBus {
    constructor() {
        this.events = new Map();
    }

    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {Function} Unsubscribe function
     */
    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);

        // Return unsubscribe function
        return () => {
            const callbacks = this.events.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        };
    }

    /**
     * Publish an event
     * @param {string} event - Event name
     * @param {*} data - Event data
     */
    emit(event, data = null) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Error in event handler for "${event}":`, error);
                }
            });
        }
    }

    /**
     * Remove all listeners for an event
     * @param {string} event - Event name
     */
    off(event) {
        if (this.events.has(event)) {
            this.events.delete(event);
        }
    }

    /**
     * Clear all events
     */
    clear() {
        this.events.clear();
    }

    /**
     * Get all registered events
     * @returns {Array<string>} List of event names
     */
    getEvents() {
        return Array.from(this.events.keys());
    }
}

// Create global instance
export const eventBus = new EventBus();

// Event constants
export const EVENTS = {
    // Generator events
    GENERATE_REQUESTED: 'generate:requested',
    GENERATE_STARTED: 'generate:started',
    GENERATE_COMPLETED: 'generate:completed',
    GENERATE_ERROR: 'generate:error',

    // Parser events
    PARSE_STARTED: 'parse:started',
    PARSE_COMPLETED: 'parse:completed',
    PARSE_ERROR: 'parse:error',

    // Render events
    RENDER_STARTED: 'render:started',
    RENDER_COMPLETED: 'render:completed',
    RENDER_ERROR: 'render:error',

    // UI events
    TAB_CHANGED: 'ui:tabChanged',
    STATUS_UPDATE: 'ui:statusUpdate',
    PROJECT_CREATED: 'ui:projectCreated',
    PROJECT_CLEARED: 'ui:projectCleared',

    // Template events
    TEMPLATE_SELECTED: 'template:selected',
    TEMPLATES_LOADED: 'templates:loaded'
};

export default eventBus;
