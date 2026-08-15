/**
 * SiteForge - Main Application Entry Point
 * Text to App/Website Builder with MVC Architecture
 */
import { AppController } from './controllers/AppController.js';

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 SiteForge initializing...');
    
    // Create main application controller
    const app = new AppController();
    
    // Expose app globally for debugging (optional)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.SiteForge = {
            app,
            getVersion: () => '1.0.0'
        };
    }
    
    console.log('✅ SiteForge ready!');
});

// Service Worker registration for PWA support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment below to enable service worker
        // navigator.serviceWorker.register('/sw.js');
    });
}

export default AppController;
