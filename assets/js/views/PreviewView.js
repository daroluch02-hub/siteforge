/**
 * PreviewView - Manages the preview panel UI
 */
import { $, $$, createElement, setText, setHTML, clear } from '../utils/dom.js';
import { eventBus, EVENTS } from '../core/EventBus.js';

export class PreviewView {
    constructor() {
        this.previewFrame = null;
        this.codeOutput = null;
        this.mvcTree = null;
        
        this.init();
    }

    init() {
        this.previewFrame = $('preview-frame');
        this.codeOutput = $('code-output');
        this.mvcTree = $('mvc-tree');
    }

    /**
     * Render HTML content in the iframe
     * @param {string} html 
     */
    render(html) {
        if (!this.previewFrame) return;

        const doc = this.previewFrame.contentDocument || this.previewFrame.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();
    }

    /**
     * Display code in the code viewer
     * @param {string} code 
     */
    showCode(code) {
        if (this.codeOutput) {
            setText(this.codeOutput, code);
        }
    }

    /**
     * Display MVC structure tree
     * @param {Object} project - Project data
     */
    showMVCStructure(project) {
        if (!this.mvcTree) return;

        const structure = {
            'Project': [
                `index.html (${project.type})`,
                'styles.css',
                'app.js'
            ],
            'Models': ['ProjectModel.js'],
            'Views': ['EditorView.js', 'PreviewView.js', 'TemplateView.js'],
            'Controllers': ['AppController.js', 'GeneratorController.js'],
            'Services': ['ParserService.js', 'GeneratorService.js', 'RenderService.js'],
            'Templates': ['TemplateLibrary.js'],
            'Core': ['EventBus.js'],
            'Utils': ['dom.js']
        };

        let html = '<div class="folder">📁 SiteForge Project\n';
        Object.entries(structure).forEach(([folder, files]) => {
            html += `  <div class="folder">📁 ${folder}\n`;
            files.forEach(file => {
                html += `    <div class="file">📄 ${file}</div>\n`;
            });
            html += '  </div>\n';
        });
        html += '</div>';

        setHTML(this.mvcTree, html);
    }

    /**
     * Clear all views
     */
    clear() {
        this.render('<html><body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0;background:#1e1e1e;color:#ccc;font-family:sans-serif;"><div style="text-align:center;"><h2>No Preview</h2><p>Generate a site or app to see the preview</p></div></body></html>');
        this.showCode('// Code will appear here after generation');
        this.mvcTree && setHTML(this.mvcTree, '<p style="opacity:0.5;">MVC structure will appear here</p>');
    }

    /**
     * Get the preview frame element
     * @returns {HTMLIFrameElement}
     */
    getFrame() {
        return this.previewFrame;
    }

    /**
     * Set device preview mode
     * @param {string} device - 'desktop', 'tablet', 'mobile'
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
        this.previewFrame.style.transition = 'width 0.3s ease';
    }

    /**
     * Refresh the preview
     */
    refresh() {
        if (this.previewFrame) {
            const doc = this.previewFrame.contentDocument || this.previewFrame.contentWindow.document;
            const html = doc.documentElement.outerHTML;
            this.render(html);
        }
    }
}

export default PreviewView;
