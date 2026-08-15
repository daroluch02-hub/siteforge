/**
 * SiteForge Core Module
 * Main entry point for the application logic
 */

import { ProjectManager } from './services/ProjectManager.js';
import { TemplateEngine } from './services/TemplateEngine.js';
import { CodeGenerator } from './services/CodeGenerator.js';
import { Validator } from './utils/Validator.js';

export class SiteForge {
  constructor(options = {}) {
    this.options = {
      outputDir: options.outputDir || './output',
      templateDir: options.templateDir || './templates',
      ...options
    };
    
    this.projectManager = new ProjectManager(this.options.outputDir);
    this.templateEngine = new TemplateEngine(this.options.templateDir);
    this.codeGenerator = new CodeGenerator();
    this.validator = new Validator();
  }

  /**
   * Create a new project from text description
   * @param {string} description - Text description of the app/website
   * @param {string} projectName - Name of the project
   * @param {string} type - Type of project: 'website' or 'app'
   * @returns {Promise<Object>} Created project details
   */
  async createProject(description, projectName, type = 'website') {
    try {
      // Validate inputs
      if (!this.validator.validateText(description)) {
        throw new Error('Invalid project description');
      }
      
      if (!this.validator.validateProjectName(projectName)) {
        throw new Error('Invalid project name');
      }

      // Parse the description to extract requirements
      const requirements = await this.codeGenerator.parseRequirements(description);
      
      // Generate project structure
      const projectStructure = this.codeGenerator.generateStructure(requirements, type);
      
      // Create project directory
      const projectPath = await this.projectManager.createProject(projectName, projectStructure);
      
      // Generate templates based on requirements
      const templates = await this.templateEngine.generateTemplates(requirements, type);
      
      // Write files to disk
      await this.projectManager.writeFiles(projectPath, templates);
      
      return {
        success: true,
        projectId: projectStructure.id,
        projectName,
        projectPath,
        type,
        createdAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error creating project:', error.message);
      throw error;
    }
  }

  /**
   * Update an existing project
   * @param {string} projectId - ID of the project to update
   * @param {string} changes - Description of changes to apply
   * @returns {Promise<Object>} Update result
   */
  async updateProject(projectId, changes) {
    try {
      if (!this.validator.validateText(changes)) {
        throw new Error('Invalid changes description');
      }

      const project = await this.projectManager.getProject(projectId);
      
      if (!project) {
        throw new Error('Project not found');
      }

      const parsedChanges = await this.codeGenerator.parseRequirements(changes);
      const updatedStructure = this.codeGenerator.mergeStructures(project.structure, parsedChanges);
      
      const templates = await this.templateEngine.generateTemplates(parsedChanges, project.type);
      await this.projectManager.writeFiles(project.path, templates);
      
      await this.projectManager.updateProject(projectId, updatedStructure);
      
      return {
        success: true,
        projectId,
        updatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error updating project:', error.message);
      throw error;
    }
  }

  /**
   * Delete a project
   * @param {string} projectId - ID of the project to delete
   * @returns {Promise<Object>} Deletion result
   */
  async deleteProject(projectId) {
    try {
      const result = await this.projectManager.deleteProject(projectId);
      
      return {
        success: result,
        projectId,
        deletedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error deleting project:', error.message);
      throw error;
    }
  }

  /**
   * List all projects
   * @returns {Promise<Array>} List of projects
   */
  async listProjects() {
    return await this.projectManager.listProjects();
  }

  /**
   * Get project details
   * @param {string} projectId - ID of the project
   * @returns {Promise<Object>} Project details
   */
  async getProject(projectId) {
    return await this.projectManager.getProject(projectId);
  }

  /**
   * Export project to archive
   * @param {string} projectId - ID of the project to export
   * @param {string} format - Export format: 'zip', 'tar'
   * @returns {Promise<string>} Path to exported archive
   */
  async exportProject(projectId, format = 'zip') {
    const project = await this.projectManager.getProject(projectId);
    
    if (!project) {
      throw new Error('Project not found');
    }

    return await this.projectManager.exportProject(projectId, format);
  }
}

export default SiteForge;
