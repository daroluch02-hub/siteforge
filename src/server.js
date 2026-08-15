/**
 * Express Server for SiteForge API
 */

import express from 'express';
import cors from 'cors';
import { SiteForge } from '../index.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize SiteForge
const siteForge = new SiteForge({
  outputDir: './output',
  templateDir: './templates'
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Create project endpoint
app.post('/api/projects', async (req, res) => {
  try {
    const { description, projectName, type } = req.body;

    if (!description || !projectName) {
      return res.status(400).json({
        error: 'Missing required fields: description and projectName'
      });
    }

    const result = await siteForge.createProject(description, projectName, type);
    res.status(201).json(result);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: error.message });
  }
});

// List projects endpoint
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await siteForge.listProjects();
    res.json(projects);
  } catch (error) {
    console.error('Error listing projects:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get project endpoint
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await siteForge.getProject(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error getting project:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update project endpoint
app.put('/api/projects/:id', async (req, res) => {
  try {
    const { changes } = req.body;

    if (!changes) {
      return res.status(400).json({ error: 'Missing changes field' });
    }

    const result = await siteForge.updateProject(req.params.id, changes);
    res.json(result);
  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete project endpoint
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const result = await siteForge.deleteProject(req.params.id);
    
    if (!result.success) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(result);
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: error.message });
  }
});

// Export project endpoint
app.post('/api/projects/:id/export', async (req, res) => {
  try {
    const { format } = req.body;
    const exportPath = await siteForge.exportProject(req.params.id, format || 'zip');
    res.json({ success: true, exportPath });
  } catch (error) {
    console.error('Error exporting project:', error);
    res.status(500).json({ error: error.message });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`SiteForge API server running on port ${PORT}`);
  });
}

export default app;
