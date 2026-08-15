/**
 * Project Manager Service
 * Handles project creation, storage, and management
 */

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

export class ProjectManager {
  constructor(outputDir = './output') {
    this.outputDir = outputDir;
    this.projects = new Map();
    this.initialized = false;
  }

  /**
   * Initialize the project manager
   */
  async initialize() {
    if (!this.initialized) {
      try {
        await fs.mkdir(this.outputDir, { recursive: true });
        this.initialized = true;
      } catch (error) {
        console.error('Failed to initialize ProjectManager:', error.message);
        throw error;
      }
    }
  }

  /**
   * Create a new project
   * @param {string} name - Project name
   * @param {Object} structure - Project structure
   * @returns {Promise<string>} Project path
   */
  async createProject(name, structure) {
    await this.initialize();
    
    const projectId = structure.id || uuidv4();
    const projectPath = path.join(this.outputDir, name);
    
    try {
      // Create project directory
      await fs.mkdir(projectPath, { recursive: true });
      
      // Store project metadata
      const projectData = {
        id: projectId,
        name,
        path: projectPath,
        structure,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        type: structure.type || 'website'
      };
      
      this.projects.set(projectId, projectData);
      
      // Save project metadata to disk
      const metadataPath = path.join(projectPath, '.siteforge.json');
      await fs.writeFile(metadataPath, JSON.stringify(projectData, null, 2));
      
      return projectPath;
    } catch (error) {
      console.error('Failed to create project:', error.message);
      throw error;
    }
  }

  /**
   * Get project by ID
   * @param {string} projectId - Project ID
   * @returns {Promise<Object|null>} Project data or null
   */
  async getProject(projectId) {
    await this.initialize();
    
    // Check in-memory cache first
    if (this.projects.has(projectId)) {
      return this.projects.get(projectId);
    }
    
    // Try to load from disk
    try {
      const projects = await this.listProjects();
      const project = projects.find(p => p.id === projectId);
      
      if (project) {
        this.projects.set(projectId, project);
      }
      
      return project || null;
    } catch (error) {
      console.error('Failed to get project:', error.message);
      return null;
    }
  }

  /**
   * List all projects
   * @returns {Promise<Array>} Array of project data
   */
  async listProjects() {
    await this.initialize();
    
    const projects = [];
    
    try {
      const entries = await fs.readdir(this.outputDir, { withFileTypes: true });
      
      for (const entry of entries) {
        if (entry.isDirectory()) {
          const metadataPath = path.join(this.outputDir, entry.name, '.siteforge.json');
          
          try {
            const metadata = await fs.readFile(metadataPath, 'utf-8');
            const projectData = JSON.parse(metadata);
            projects.push(projectData);
          } catch {
            // Skip directories without metadata
          }
        }
      }
      
      return projects;
    } catch (error) {
      console.error('Failed to list projects:', error.message);
      return [];
    }
  }

  /**
   * Update project
   * @param {string} projectId - Project ID
   * @param {Object} updates - Updates to apply
   * @returns {Promise<boolean>} Success status
   */
  async updateProject(projectId, updates) {
    await this.initialize();
    
    const project = await this.getProject(projectId);
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    try {
      const updatedData = {
        ...project,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      this.projects.set(projectId, updatedData);
      
      // Update metadata file
      const metadataPath = path.join(project.path, '.siteforge.json');
      await fs.writeFile(metadataPath, JSON.stringify(updatedData, null, 2));
      
      return true;
    } catch (error) {
      console.error('Failed to update project:', error.message);
      throw error;
    }
  }

  /**
   * Delete project
   * @param {string} projectId - Project ID
   * @returns {Promise<boolean>} Success status
   */
  async deleteProject(projectId) {
    await this.initialize();
    
    const project = await this.getProject(projectId);
    
    if (!project) {
      return false;
    }
    
    try {
      // Remove directory
      await fs.rm(project.path, { recursive: true, force: true });
      
      // Remove from cache
      this.projects.delete(projectId);
      
      return true;
    } catch (error) {
      console.error('Failed to delete project:', error.message);
      throw error;
    }
  }

  /**
   * Write files to project directory
   * @param {string} projectPath - Project path
   * @param {Array} files - Array of file objects {path, content}
   * @returns {Promise<boolean>} Success status
   */
  async writeFiles(projectPath, files) {
    await this.initialize();
    
    try {
      for (const file of files) {
        const filePath = path.join(projectPath, file.path);
        const dir = path.dirname(filePath);
        
        // Create directory if it doesn't exist
        await fs.mkdir(dir, { recursive: true });
        
        // Write file content
        await fs.writeFile(filePath, file.content);
      }
      
      return true;
    } catch (error) {
      console.error('Failed to write files:', error.message);
      throw error;
    }
  }

  /**
   * Export project to archive
   * @param {string} projectId - Project ID
   * @param {string} format - Export format
   * @returns {Promise<string>} Path to exported archive
   */
  async exportProject(projectId, format = 'zip') {
    await this.initialize();
    
    const project = await this.getProject(projectId);
    
    if (!project) {
      throw new Error('Project not found');
    }
    
    try {
      // For now, just return the project path
      // In a real implementation, this would create a zip/tar archive
      const exportPath = `${project.path}.${format}`;
      
      // Placeholder for actual archive creation
      console.log(`Exporting project ${projectId} to ${format} format...`);
      
      return exportPath;
    } catch (error) {
      console.error('Failed to export project:', error.message);
      throw error;
    }
  }
}

export default ProjectManager;
