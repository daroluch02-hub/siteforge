/**
 * Unit tests for Validator utility
 */

import { Validator } from '../../src/utils/Validator.js';

describe('Validator', () => {
  let validator;

  beforeEach(() => {
    validator = new Validator();
  });

  describe('validateText', () => {
    test('should return true for valid text', () => {
      expect(validator.validateText('Hello World')).toBe(true);
    });

    test('should return false for empty string', () => {
      expect(validator.validateText('')).toBe(false);
    });

    test('should return false for null', () => {
      expect(validator.validateText(null)).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(validator.validateText(undefined)).toBe(false);
    });

    test('should return false for non-string types', () => {
      expect(validator.validateText(123)).toBe(false);
      expect(validator.validateText({})).toBe(false);
      expect(validator.validateText([])).toBe(false);
    });

    test('should respect minLength parameter', () => {
      expect(validator.validateText('Hi', 5)).toBe(false);
      expect(validator.validateText('Hello', 5)).toBe(true);
    });

    test('should trim whitespace before validation', () => {
      expect(validator.validateText('   ')).toBe(false);
      expect(validator.validateText('  Hello  ')).toBe(true);
    });
  });

  describe('validateProjectName', () => {
    test('should return true for valid project name', () => {
      expect(validator.validateProjectName('my-project')).toBe(true);
      expect(validator.validateProjectName('MyProject')).toBe(true);
      expect(validator.validateProjectName('project_123')).toBe(true);
    });

    test('should return false for names starting with numbers', () => {
      expect(validator.validateProjectName('123project')).toBe(false);
    });

    test('should return false for names with special characters', () => {
      expect(validator.validateProjectName('my@project')).toBe(false);
      expect(validator.validateProjectName('my project')).toBe(false);
    });

    test('should return false for short names', () => {
      expect(validator.validateProjectName('a')).toBe(false);
    });

    test('should return false for empty names', () => {
      expect(validator.validateProjectName('')).toBe(false);
    });
  });

  describe('validateEmail', () => {
    test('should return true for valid email', () => {
      expect(validator.validateEmail('test@example.com')).toBe(true);
      expect(validator.validateEmail('user.name@domain.org')).toBe(true);
    });

    test('should return false for invalid email', () => {
      expect(validator.validateEmail('invalid')).toBe(false);
      expect(validator.validateEmail('missing@domain')).toBe(false);
      expect(validator.validateEmail('@missing-local.com')).toBe(false);
    });

    test('should return false for empty email', () => {
      expect(validator.validateEmail('')).toBe(false);
    });
  });

  describe('validateURL', () => {
    test('should return true for valid URLs', () => {
      expect(validator.validateURL('https://example.com')).toBe(true);
      expect(validator.validateURL('http://localhost:3000')).toBe(true);
      expect(validator.validateURL('https://www.example.com/path?query=1')).toBe(true);
    });

    test('should return false for invalid URLs', () => {
      expect(validator.validateURL('not-a-url')).toBe(false);
    });

    test('should return false for empty URL', () => {
      expect(validator.validateURL('')).toBe(false);
    });
  });

  describe('validateFilePath', () => {
    test('should return true for valid file paths', () => {
      expect(validator.validateFilePath('/home/user/file.txt')).toBe(true);
      expect(validator.validateFilePath('./relative/path')).toBe(true);
      expect(validator.validateFilePath('C:\\Windows\\file.txt')).toBe(true);
    });

    test('should return false for paths with null bytes', () => {
      expect(validator.validateFilePath('/path/\0/file.txt')).toBe(false);
    });

    test('should return false for empty path', () => {
      expect(validator.validateFilePath('')).toBe(false);
    });
  });

  describe('validateJSON', () => {
    test('should return true for valid JSON', () => {
      expect(validator.validateJSON('{"key": "value"}')).toBe(true);
      expect(validator.validateJSON('[1, 2, 3]')).toBe(true);
      expect(validator.validateJSON('"string"')).toBe(true);
    });

    test('should return false for invalid JSON', () => {
      expect(validator.validateJSON('{invalid}')).toBe(false);
      expect(validator.validateJSON('undefined')).toBe(false);
    });

    test('should return false for empty string', () => {
      expect(validator.validateJSON('')).toBe(false);
    });
  });

  describe('sanitizeHTML', () => {
    test('should remove script tags', () => {
      const malicious = '<script>alert("XSS")</script><p>Safe content</p>';
      const sanitized = validator.sanitizeHTML(malicious);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).toContain('Safe content');
    });

    test('should remove event handlers', () => {
      const malicious = '<div onclick="alert(1)">Content</div>';
      const sanitized = validator.sanitizeHTML(malicious);
      expect(sanitized).not.toContain('onclick');
    });

    test('should return empty string for invalid input', () => {
      expect(validator.sanitizeHTML(null)).toBe('');
      expect(validator.sanitizeHTML('')).toBe('');
    });

    test('should preserve safe HTML', () => {
      const safe = '<p>Hello <strong>World</strong></p>';
      const sanitized = validator.sanitizeHTML(safe);
      expect(sanitized).toContain('<p>');
      expect(sanitized).toContain('<strong>');
    });
  });

  describe('validateProjectType', () => {
    test('should return true for valid project types', () => {
      expect(validator.validateProjectType('website')).toBe(true);
      expect(validator.validateProjectType('app')).toBe(true);
      expect(validator.validateProjectType('landing-page')).toBe(true);
      expect(validator.validateProjectType('webapp')).toBe(true);
    });

    test('should be case insensitive', () => {
      expect(validator.validateProjectType('WEBSITE')).toBe(true);
      expect(validator.validateProjectType('App')).toBe(true);
    });

    test('should return false for invalid types', () => {
      expect(validator.validateProjectType('invalid')).toBe(false);
      expect(validator.validateProjectType('mobile-app')).toBe(false);
    });

    test('should return false for undefined', () => {
      expect(validator.validateProjectType(undefined)).toBe(false);
    });
  });
});
