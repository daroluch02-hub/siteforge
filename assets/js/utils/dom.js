/**
 * DOM Utility Functions
 * Helper functions for DOM manipulation
 */

/**
 * Select element by ID
 * @param {string} id - Element ID
 * @returns {HTMLElement|null}
 */
export function $(id) {
    return document.getElementById(id);
}

/**
 * Select all elements by selector
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
export function $$(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Create element with attributes and content
 * @param {string} tag - HTML tag name
 * @param {Object} attributes - Element attributes
 * @param {string|HTMLElement} content - Inner content
 * @returns {HTMLElement}
 */
export function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'dataset') {
            Object.entries(value).forEach(([dataKey, dataValue]) => {
                element.dataset[dataKey] = dataValue;
            });
        } else if (key.startsWith('on') && typeof value === 'function') {
            element.addEventListener(key.slice(2).toLowerCase(), value);
        } else {
            element.setAttribute(key, value);
        }
    });

    if (content) {
        if (typeof content === 'string') {
            element.innerHTML = content;
        } else if (content instanceof HTMLElement) {
            element.appendChild(content);
        }
    }

    return element;
}

/**
 * Set element text content safely
 * @param {HTMLElement} element 
 * @param {string} text 
 */
export function setText(element, text) {
    element.textContent = text;
}

/**
 * Set element HTML content
 * @param {HTMLElement} element 
 * @param {string} html 
 */
export function setHTML(element, html) {
    element.innerHTML = html;
}

/**
 * Add class to element
 * @param {HTMLElement} element 
 * @param {string} className 
 */
export function addClass(element, className) {
    element.classList.add(className);
}

/**
 * Remove class from element
 * @param {HTMLElement} element 
 * @param {string} className 
 */
export function removeClass(element, className) {
    element.classList.remove(className);
}

/**
 * Toggle class on element
 * @param {HTMLElement} element 
 * @param {string} className 
 * @param {boolean} force 
 */
export function toggleClass(element, className, force) {
    element.classList.toggle(className, force);
}

/**
 * Check if element has class
 * @param {HTMLElement} element 
 * @param {string} className 
 * @returns {boolean}
 */
export function hasClass(element, className) {
    return element.classList.contains(className);
}

/**
 * Append child to parent
 * @param {HTMLElement} parent 
 * @param {HTMLElement|DocumentFragment} child 
 */
export function append(parent, child) {
    parent.appendChild(child);
}

/**
 * Prepend child to parent
 * @param {HTMLElement} parent 
 * @param {HTMLElement|DocumentFragment} child 
 */
export function prepend(parent, child) {
    parent.insertBefore(child, parent.firstChild);
}

/**
 * Remove element from DOM
 * @param {HTMLElement} element 
 */
export function remove(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Clear all children from element
 * @param {HTMLElement} element 
 */
export function clear(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * Show element
 * @param {HTMLElement} element 
 */
export function show(element) {
    element.style.display = '';
}

/**
 * Hide element
 * @param {HTMLElement} element 
 */
export function hide(element) {
    element.style.display = 'none';
}

/**
 * Escape HTML to prevent XSS
 * @param {string} str 
 * @returns {string}
 */
export function escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}

/**
 * Debounce function calls
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function calls
 * @param {Function} func 
 * @param {number} limit 
 * @returns {Function}
 */
export function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

export default {
    $, $$, createElement, setText, setHTML, addClass, removeClass, toggleClass,
    hasClass, append, prepend, remove, clear, show, hide, escapeHTML, debounce, throttle
};
