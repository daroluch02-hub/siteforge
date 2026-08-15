/**
 * Validator Utility
 * Provides validation functions for user inputs
 */

export class Validator {
  /**
   * Validate text input
   * @param {string} text - Text to validate
   * @param {number} minLength - Minimum length required
   * @returns {boolean} True if valid
   */
  validateText(text, minLength = 1) {
    if (!text || typeof text !== 'string') {
      return false;
    }
    return text.trim().length >= minLength;
  }

  /**
   * Validate project name
   * @param {string} name - Project name to validate
   * @returns {boolean} True if valid
   */
  validateProjectName(name) {
    if (!this.validateText(name, 2)) {
      return false;
    }
    
    // Project name should only contain alphanumeric characters, hyphens, and underscores
    const validPattern = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
    return validPattern.test(name.trim());
  }

  /**
   * Validate email format
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid
   */
  validateEmail(email) {
    if (!this.validateText(email)) {
      return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email.trim());
  }

  /**
   * Validate URL format
   * @param {string} url - URL to validate
   * @returns {boolean} True if valid
   */
  validateURL(url) {
    if (!this.validateText(url)) {
      return false;
    }
    
    try {
      new URL(url.trim());
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Validate file path
   * @param {string} path - File path to validate
   * @returns {boolean} True if valid
   */
  validateFilePath(path) {
    if (!this.validateText(path)) {
      return false;
    }
    
    // Basic path validation - should not contain null bytes or start with multiple slashes
    const invalidPatterns = [/\0/, /^\/{2,}/];
    return !invalidPatterns.some(pattern => pattern.test(path));
  }

  /**
   * Validate JSON string
   * @param {string} jsonString - JSON string to validate
   * @returns {boolean} True if valid
   */
  validateJSON(jsonString) {
    if (!this.validateText(jsonString)) {
      return false;
    }
    
    try {
      JSON.parse(jsonString);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Sanitize HTML input
   * @param {string} html - HTML string to sanitize
   * @returns {string} Sanitized HTML
   */
  sanitizeHTML(html) {
    if (!this.validateText(html)) {
      return '';
    }
    
    // Basic HTML sanitization - remove script tags and event handlers
    let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    sanitized = sanitized.replace(/\son\w+\s*=\s*["'][^"']*["']/gi, '');
    sanitized = sanitized.replace(/\son\w+\s*=\s*[^\s>]+/gi, '');
    
    return sanitized;
  }

  /**
   * Validate project type
   * @param {string} type - Project type to validate
   * @returns {boolean} True if valid
   */
  validateProjectType(type) {
    const validTypes = ['website', 'app', 'landing-page', 'webapp'];
    return validTypes.includes(type?.toLowerCase());
  }
}

export default Validator;
