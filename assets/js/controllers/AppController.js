/**
 * AppController - Main application controller
 * Handles UI interactions and coordinates between views and services
 */
import { $, $$, createElement, setText, setHTML, clear, addClass, removeClass } from '../utils/dom.js';
import { eventBus, EVENTS } from '../core/EventBus.js';
import ProjectModel from '../models/ProjectModel.js';
import ParserService from '../services/ParserService.js';
import GeneratorService from '../services/GeneratorService.js';
import RenderService from '../services/RenderService.js';
import TemplateLibrary from '../templates/TemplateLibrary.js';
import EditorView from '../views/EditorView.js';
import PreviewView from '../views/PreviewView.js';

export class AppController {
    constructor() {
        this.model = new ProjectModel();
        this.parser = new ParserService();
        this.generator = new GeneratorService();
        this.renderer = new RenderService();
        this.templates = new TemplateLibrary();
        this.editorView = new EditorView();
        this.previewView = new PreviewView();
        
        this.currentTab = 'preview';
        
        this.init();
    }

    init() {
        // Initialize renderer with iframe
        this.renderer.init(this.previewView.getFrame());
        
        // Load templates
        this.loadTemplates();
        
        // Bind global events
        this.bindEvents();
        
        // Setup tab switching
        this.setupTabs();
        
        // Setup header buttons
        this.setupHeaderButtons();
        
        // Clear preview initially
        this.previewView.clear();
        
        this.updateStatus('Ready');
    }

    bindEvents() {
        // Generate requested
        eventBus.on(EVENTS.GENERATE_REQUESTED, (prompt) => {
            this.handleGenerate(prompt);
        });

        // Template selected
        eventBus.on(EVENTS.TEMPLATE_SELECTED, (template) => {
            this.handleTemplateSelected(template);
        });

        // Status updates
        eventBus.on(EVENTS.STATUS_UPDATE, (message) => {
            this.updateStatus(message);
        });
    }

    setupTabs() {
        const tabBtns = $$('.tab-btn');
        
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;
                const parentPanel = btn.closest('.panel');
                
                // Update active button
                parentPanel.querySelectorAll('.tab-btn').forEach(b => {
                    removeClass(b, 'active');
                });
                addClass(btn, 'active');
                
                // Update active content
                const contentId = `tab-${tabId}`;
                parentPanel.querySelectorAll('.tab-content').forEach(content => {
                    removeClass(content, 'active');
                });
                const targetContent = $(contentId);
                if (targetContent) {
                    addClass(targetContent, 'active');
                }
                
                this.currentTab = tabId;
                eventBus.emit(EVENTS.TAB_CHANGED, tabId);
            });
        });
    }

    setupHeaderButtons() {
        const newBtn = $('btn-new');
        const downloadBtn = $('btn-download');
        
        if (newBtn) {
            newBtn.addEventListener('click', () => {
                this.handleNewProject();
            });
        }
        
        if (downloadBtn) {
            downloadBtn.addEventListener('click', () => {
                this.handleDownload();
            });
        }
    }

    loadTemplates() {
        const allTemplates = this.templates.getAll();
        this.editorView.renderTemplates(allTemplates);
        eventBus.emit(EVENTS.TEMPLATES_LOADED, allTemplates);
    }

    async handleGenerate(prompt) {
        try {
            this.editorView.setLoading(true);
            this.updateStatus('Parsing requirements...');
            
            // Parse the prompt
            const parsed = this.parser.parse(prompt);
            
            // Show detection results
            const chips = this.parser.getDetectionChips(parsed);
            this.editorView.showDetectionResults(chips);
            
            this.updateStatus('Generating site...');
            
            // Generate the project
            const project = this.generator.generate(parsed);
            
            // Update model
            this.model.setProject(project);
            
            this.updateStatus('Rendering preview...');
            
            // Render in preview
            await this.renderer.renderProject(project);
            
            // Update code view
            const fullCode = project.generatedHTML;
            this.previewView.showCode(fullCode);
            
            // Update MVC view
            this.previewView.showMVCStructure(project);
            
            this.updateStatus(`Generated: ${project.name} (${project.type})`);
            eventBus.emit(EVENTS.GENERATE_COMPLETED, project);
            
        } catch (error) {
            console.error('Generation error:', error);
            this.updateStatus(`Error: ${error.message}`);
            eventBus.emit(EVENTS.GENERATE_ERROR, error);
        } finally {
            this.editorView.setLoading(false);
        }
    }

    handleTemplateSelected(template) {
        this.updateStatus(`Selected template: ${template.name}`);
    }

    handleNewProject() {
        this.model.reset();
        this.editorView.clear();
        this.editorView.hideDetectionResults();
        this.previewView.clear();
        this.updateStatus('New project started');
        eventBus.emit(EVENTS.PROJECT_CLEARED);
    }

    handleDownload() {
        const project = this.model.getProject();
        
        if (!project.generatedHTML) {
            this.updateStatus('Nothing to download. Generate a site first.');
            return;
        }
        
        // Create downloadable HTML file
        const blob = new Blob([project.generatedHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${project.name.replace(/\s+/g, '-').toLowerCase()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.updateStatus(`Downloaded: ${a.download}`);
    }

    updateStatus(message) {
        const statusEl = $('status-message');
        if (statusEl) {
            setText(statusEl, message);
        }
        eventBus.emit(EVENTS.STATUS_UPDATE, message);
    }
}

export default AppController;
