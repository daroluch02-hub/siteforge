/**
 * RenderService - Renders generated content into the preview iframe
 */
export class RenderService {
    constructor() {
        this.previewFrame = null;
    }

    /**
     * Initialize the preview iframe
     * @param {HTMLIFrameElement} iframe - The iframe element
     */
    init(iframe) {
        this.previewFrame = iframe;
    }

    /**
     * Render content into the preview iframe
     * @param {string} html - Complete HTML document
     */
    render(html) {
        if (!this.previewFrame) {
            throw new Error('Preview iframe not initialized');
        }

        const doc = this.previewFrame.contentDocument || this.previewFrame.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();

        // Wait for content to load
        return new Promise((resolve) => {
            this.previewFrame.onload = () => {
                resolve();
            };
            // Fallback timeout
            setTimeout(resolve, 100);
        });
    }

    /**
     * Render project data
     * @param {Object} project - Project data from GeneratorService
     */
    async renderProject(project) {
        if (project.generatedHTML) {
            await this.render(project.generatedHTML);
        }
    }

    /**
     * Clear the preview
     */
    clear() {
        if (this.previewFrame) {
            const doc = this.previewFrame.contentDocument || this.previewFrame.contentWindow.document;
            doc.open();
            doc.write('<html><body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#1e1e1e;color:#ccc;font-family:sans-serif;"><div style="text-align:center;"><h2>No Preview</h2><p>Generate a site to see the preview</p></div></body></html>');
            doc.close();
        }
    }

    /**
     * Get rendered content
     * @returns {string}
     */
    getContent() {
        if (!this.previewFrame) return '';
        const doc = this.previewFrame.contentDocument || this.previewFrame.contentWindow.document;
        return doc.documentElement.outerHTML;
    }

    /**
     * Refresh the preview
     */
    refresh() {
        if (this.previewFrame) {
            const src = this.previewFrame.srcdoc || this.getContent();
            this.previewFrame.srcdoc = src;
        }
    }

    /**
     * Set zoom level for preview
     * @param {number} level - Zoom level (0.5 to 2)
     */
    setZoom(level) {
        if (!this.previewFrame) return;
        this.previewFrame.style.transform = `scale(${level})`;
        this.previewFrame.style.transformOrigin = 'top left';
    }

    /**
     * Toggle device preview mode
     * @param {string} device - 'desktop', 'tablet', or 'mobile'
     */
    setDeviceMode(device) {
        if (!this.previewFrame) return;

        const widths = {
            'desktop': '100%',
            'tablet': '768px',
            'mobile': '375px'
        };

        this.previewFrame.style.width = widths[device] || '100%';
        this.previewFrame.style.margin = '0 auto';
    }
}

export default RenderService;
