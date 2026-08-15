/**
 * GeneratorService - Builds data models and generates code from parsed requirements
 */
export class GeneratorService {
    constructor() {
        this.appGenerators = {
            'todo': this.generateTodoApp.bind(this),
            'calculator': this.generateCalculatorApp.bind(this),
            'quiz': this.generateQuizApp.bind(this),
            'timer': this.generateTimerApp.bind(this),
            'pomodoro': this.generatePomodoroApp.bind(this),
            'notes': this.generateNotesApp.bind(this),
            'counter': this.generateCounterApp.bind(this),
            'stopwatch': this.generateStopwatchApp.bind(this)
        };
    }

    /**
     * Generate complete project from parsed requirements
     * @param {Object} parsed - Parsed requirements from ParserService
     * @returns {Object} Generated project data
     */
    generate(parsed) {
        if (parsed.isApp && this.appGenerators[parsed.type]) {
            return this.appGenerators[parsed.type](parsed);
        }

        return this.generateWebsite(parsed);
    }

    /**
     * Generate static website
     * @param {Object} parsed 
     * @returns {Object}
     */
    generateWebsite(parsed) {
        const html = this.generateWebsiteHTML(parsed);
        const css = this.generateWebsiteCSS(parsed);
        const js = this.generateWebsiteJS(parsed);

        return {
            name: parsed.appName,
            type: parsed.type,
            theme: parsed.theme,
            accentColor: parsed.accentColor,
            sections: parsed.sections,
            generatedHTML: html,
            generatedCSS: css,
            generatedJS: js
        };
    }

    /**
     * Generate website HTML
     */
    generateWebsiteHTML(parsed) {
        const sections = parsed.sections.map(section => {
            switch (section) {
                case 'hero':
                    return `
        <section class="hero">
            <div class="container">
                <h1>${parsed.appName}</h1>
                <p class="hero-subtitle">Welcome to our ${parsed.type} website</p>
                <a href="#contact" class="btn btn-primary">Get Started</a>
            </div>
        </section>`;
                case 'about':
                    return `
        <section id="about" class="section about">
            <div class="container">
                <h2>About Us</h2>
                <p>We are a dedicated team committed to providing excellent ${parsed.type} services. Our mission is to deliver quality and value to our customers.</p>
            </div>
        </section>`;
                case 'services':
                    return `
        <section id="services" class="section services">
            <div class="container">
                <h2>Our Services</h2>
                <div class="services-grid">
                    <div class="service-card">
                        <h3>Service One</h3>
                        <p>Professional service tailored to your needs.</p>
                    </div>
                    <div class="service-card">
                        <h3>Service Two</h3>
                        <p>Innovative solutions for modern challenges.</p>
                    </div>
                    <div class="service-card">
                        <h3>Service Three</h3>
                        <p>Reliable support whenever you need it.</p>
                    </div>
                </div>
            </div>
        </section>`;
                case 'features':
                    return `
        <section id="features" class="section features">
            <div class="container">
                <h2>Features</h2>
                <div class="features-grid">
                    <div class="feature-item">
                        <span class="feature-icon">⚡</span>
                        <h3>Fast Performance</h3>
                        <p>Lightning-fast load times and smooth interactions.</p>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">🔒</span>
                        <h3>Secure</h3>
                        <p>Enterprise-grade security for your peace of mind.</p>
                    </div>
                    <div class="feature-item">
                        <span class="feature-icon">📱</span>
                        <h3>Responsive</h3>
                        <p>Perfect on any device, anywhere.</p>
                    </div>
                </div>
            </div>
        </section>`;
                case 'menu':
                    return `
        <section id="menu" class="section menu">
            <div class="container">
                <h2>Our Menu</h2>
                <div class="menu-grid">
                    <div class="menu-item">
                        <h4>Signature Dish</h4>
                        <p class="menu-desc">Chef's special creation</p>
                        <span class="menu-price">$24</span>
                    </div>
                    <div class="menu-item">
                        <h4>Classic Favorite</h4>
                        <p class="menu-desc">Timeless crowd pleaser</p>
                        <span class="menu-price">$18</span>
                    </div>
                    <div class="menu-item">
                        <h4>Seasonal Special</h4>
                        <p class="menu-desc">Fresh seasonal ingredients</p>
                        <span class="menu-price">$22</span>
                    </div>
                </div>
            </div>
        </section>`;
                case 'pricing':
                    return `
        <section id="pricing" class="section pricing">
            <div class="container">
                <h2>Pricing Plans</h2>
                <div class="pricing-grid">
                    <div class="pricing-card">
                        <h3>Basic</h3>
                        <div class="price">$9<span>/mo</span></div>
                        <ul>
                            <li>5 Projects</li>
                            <li>10GB Storage</li>
                            <li>Email Support</li>
                        </ul>
                        <button class="btn btn-secondary">Choose Plan</button>
                    </div>
                    <div class="pricing-card featured">
                        <h3>Pro</h3>
                        <div class="price">$29<span>/mo</span></div>
                        <ul>
                            <li>Unlimited Projects</li>
                            <li>100GB Storage</li>
                            <li>Priority Support</li>
                        </ul>
                        <button class="btn btn-primary">Choose Plan</button>
                    </div>
                    <div class="pricing-card">
                        <h3>Enterprise</h3>
                        <div class="price">$99<span>/mo</span></div>
                        <ul>
                            <li>Everything in Pro</li>
                            <li>Unlimited Storage</li>
                            <li>24/7 Phone Support</li>
                        </ul>
                        <button class="btn btn-secondary">Choose Plan</button>
                    </div>
                </div>
            </div>
        </section>`;
                case 'testimonials':
                    return `
        <section id="testimonials" class="section testimonials">
            <div class="container">
                <h2>What Our Clients Say</h2>
                <div class="testimonials-grid">
                    <div class="testimonial-card">
                        <p>"Excellent service! Highly recommended."</p>
                        <div class="testimonial-author">- John D.</div>
                    </div>
                    <div class="testimonial-card">
                        <p>"Professional team and great results."</p>
                        <div class="testimonial-author">- Sarah M.</div>
                    </div>
                    <div class="testimonial-card">
                        <p>"Best decision we ever made!"</p>
                        <div class="testimonial-author">- Mike R.</div>
                    </div>
                </div>
            </div>
        </section>`;
                case 'faq':
                    return `
        <section id="faq" class="section faq">
            <div class="container">
                <h2>Frequently Asked Questions</h2>
                <div class="faq-list">
                    <div class="faq-item">
                        <h4>What services do you offer?</h4>
                        <p>We offer a wide range of services tailored to meet your needs.</p>
                    </div>
                    <div class="faq-item">
                        <h4>How do I get started?</h4>
                        <p>Simply contact us and we'll guide you through the process.</p>
                    </div>
                    <div class="faq-item">
                        <h4>What are your pricing options?</h4>
                        <p>We have flexible pricing plans to suit different budgets.</p>
                    </div>
                </div>
            </div>
        </section>`;
                case 'contact':
                    return `
        <section id="contact" class="section contact">
            <div class="container">
                <h2>Contact Us</h2>
                <form class="contact-form">
                    <input type="text" placeholder="Your Name" required>
                    <input type="email" placeholder="Your Email" required>
                    <textarea placeholder="Your Message" rows="5" required></textarea>
                    <button type="submit" class="btn btn-primary">Send Message</button>
                </form>
            </div>
        </section>`;
                case 'gallery':
                    return `
        <section id="gallery" class="section gallery">
            <div class="container">
                <h2>Gallery</h2>
                <div class="gallery-grid">
                    <div class="gallery-item"></div>
                    <div class="gallery-item"></div>
                    <div class="gallery-item"></div>
                    <div class="gallery-item"></div>
                    <div class="gallery-item"></div>
                    <div class="gallery-item"></div>
                </div>
            </div>
        </section>`;
                default:
                    return '';
            }
        }).join('\n');

        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${parsed.appName}</title>
    <style>${this.generateWebsiteCSS(parsed)}</style>
</head>
<body>
    <nav class="navbar">
        <div class="container">
            <div class="logo">${parsed.appName}</div>
            <ul class="nav-links">
                ${parsed.sections.map(s => `<li><a href="#${s}">${s.charAt(0).toUpperCase() + s.slice(1)}</a></li>`).join('')}
            </ul>
        </div>
    </nav>
    
    ${sections}
    
    <footer class="footer">
        <div class="container">
            <p>&copy; ${new Date().getFullYear()} ${parsed.appName}. All rights reserved.</p>
        </div>
    </footer>
    
    <script>${this.generateWebsiteJS(parsed)}<\/script>
</body>
</html>`;
    }

    /**
     * Generate website CSS
     */
    generateWebsiteCSS(parsed) {
        const isDark = parsed.theme === 'dark';
        const bgColor = isDark ? '#1a1a2e' : '#ffffff';
        const textColor = isDark ? '#eaeaea' : '#333333';
        const secondaryBg = isDark ? '#16213e' : '#f5f5f5';
        
        return `
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
    background-color: ${bgColor};
    color: ${textColor};
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2rem;
}

.navbar {
    background-color: ${secondaryBg};
    padding: 1rem 0;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.navbar .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: ${parsed.accentColor};
}

.nav-links {
    display: flex;
    list-style: none;
    gap: 2rem;
}

.nav-links a {
    color: ${textColor};
    text-decoration: none;
    transition: color 0.3s;
}

.nav-links a:hover {
    color: ${parsed.accentColor};
}

.section {
    padding: 5rem 0;
}

.section h2 {
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
    color: ${parsed.accentColor};
}

.hero {
    background: linear-gradient(135deg, ${parsed.accentColor}22, ${parsed.accentColor}44);
    padding: 8rem 0;
    text-align: center;
}

.hero h1 {
    font-size: 3.5rem;
    margin-bottom: 1rem;
}

.hero-subtitle {
    font-size: 1.25rem;
    opacity: 0.8;
    margin-bottom: 2rem;
}

.btn {
    display: inline-block;
    padding: 0.75rem 2rem;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.3s;
}

.btn-primary {
    background-color: ${parsed.accentColor};
    color: white;
}

.btn-primary:hover {
    opacity: 0.9;
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: transparent;
    border: 2px solid ${parsed.accentColor};
    color: ${parsed.accentColor};
}

.btn-secondary:hover {
    background-color: ${parsed.accentColor};
    color: white;
}

.services-grid, .features-grid, .testimonials-grid, .pricing-grid, .menu-grid, .gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.service-card, .feature-item, .testimonial-card, .pricing-card, .menu-item {
    background-color: ${secondaryBg};
    padding: 2rem;
    border-radius: 10px;
    text-align: center;
    transition: transform 0.3s;
}

.service-card:hover, .feature-item:hover, .testimonial-card:hover, .pricing-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 3rem;
    display: block;
    margin-bottom: 1rem;
}

.pricing-card {
    border: 2px solid transparent;
}

.pricing-card.featured {
    border-color: ${parsed.accentColor};
    transform: scale(1.05);
}

.price {
    font-size: 3rem;
    font-weight: bold;
    color: ${parsed.accentColor};
    margin: 1rem 0;
}

.price span {
    font-size: 1rem;
}

.pricing-card ul {
    list-style: none;
    margin: 1.5rem 0;
}

.pricing-card li {
    padding: 0.5rem 0;
}

.menu-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
}

.menu-desc {
    opacity: 0.7;
    font-size: 0.9rem;
}

.menu-price {
    font-weight: bold;
    color: ${parsed.accentColor};
    font-size: 1.25rem;
}

.contact-form {
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.contact-form input,
.contact-form textarea {
    padding: 1rem;
    border: 1px solid ${isDark ? '#333' : '#ddd'};
    border-radius: 5px;
    background-color: ${bgColor};
    color: ${textColor};
    font-size: 1rem;
}

.contact-form input:focus,
.contact-form textarea:focus {
    outline: none;
    border-color: ${parsed.accentColor};
}

.gallery-item {
    background-color: ${secondaryBg};
    aspect-ratio: 1;
    border-radius: 10px;
    background-size: cover;
    background-position: center;
}

.faq-list {
    max-width: 800px;
    margin: 0 auto;
}

.faq-item {
    background-color: ${secondaryBg};
    padding: 1.5rem;
    margin-bottom: 1rem;
    border-radius: 5px;
}

.faq-item h4 {
    color: ${parsed.accentColor};
    margin-bottom: 0.5rem;
}

.footer {
    background-color: ${secondaryBg};
    padding: 2rem 0;
    text-align: center;
    margin-top: 3rem;
}

@media (max-width: 768px) {
    .nav-links {
        display: none;
    }
    
    .hero h1 {
        font-size: 2.5rem;
    }
    
    .section h2 {
        font-size: 2rem;
    }
}`;
    }

    /**
     * Generate website JS
     */
    generateWebsiteJS(parsed) {
        return `
// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Form submission handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        this.reset();
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

console.log('${parsed.appName} loaded successfully!');
`;
    }

    /**
     * Generate Todo App
     */
    generateTodoApp(parsed) {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo App</title>
    <style>${this.getTodoCSS(parsed)}</style>
</head>
<body>
    <div class="app-container">
        <header>
            <h1>📝 Todo List</h1>
            <p class="subtitle">Stay organized and productive</p>
        </header>
        
        <div class="todo-input-section">
            <input type="text" id="todoInput" placeholder="Add a new task..." autofocus>
            <button id="addBtn" class="btn-add">Add</button>
        </div>
        
        <div class="filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="active">Active</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>
        
        <ul id="todoList" class="todo-list"></ul>
        
        <div class="todo-footer">
            <span id="itemsLeft">0 items left</span>
            <button id="clearCompleted" class="btn-clear">Clear Completed</button>
        </div>
    </div>
    <script>${this.getTodoJS()}<\/script>
</body>
</html>`;

        return {
            name: 'Todo App',
            type: 'todo',
            theme: parsed.theme,
            accentColor: parsed.accentColor,
            generatedHTML: html,
            generatedCSS: this.getTodoCSS(parsed),
            generatedJS: this.getTodoJS()
        };
    }

    getTodoCSS(parsed) {
        const isDark = parsed.theme !== 'light';
        const bg = isDark ? '#1e1e1e' : '#f5f5f5';
        const cardBg = isDark ? '#2d2d2d' : '#ffffff';
        const text = isDark ? '#e0e0e0' : '#333333';
        const border = isDark ? '#404040' : '#e0e0e0';
        
        return `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, ${parsed.accentColor}22, ${isDark ? '#1e1e1e' : '#f0f0f0'});
    min-height: 100vh;
    padding: 2rem 1rem;
    color: ${text};
}
.app-container {
    max-width: 600px;
    margin: 0 auto;
    background: ${cardBg};
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
header { text-align: center; margin-bottom: 2rem; }
h1 { font-size: 2rem; margin-bottom: 0.5rem; }
.subtitle { opacity: 0.7; }
.todo-input-section { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
#todoInput {
    flex: 1;
    padding: 0.75rem 1rem;
    border: 2px solid ${border};
    border-radius: 8px;
    background: ${bg};
    color: ${text};
    font-size: 1rem;
}
#todoInput:focus { outline: none; border-color: ${parsed.accentColor}; }
.btn-add {
    padding: 0.75rem 1.5rem;
    background: ${parsed.accentColor};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
    transition: opacity 0.2s;
}
.btn-add:hover { opacity: 0.9; }
.filters { display: flex; gap: 0.5rem; margin-bottom: 1.5rem; }
.filter-btn {
    padding: 0.5rem 1rem;
    border: none;
    background: ${bg};
    color: ${text};
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
}
.filter-btn.active { background: ${parsed.accentColor}; color: white; }
.todo-list { list-style: none; }
.todo-item {
    display: flex;
    align-items: center;
    padding: 1rem;
    background: ${bg};
    border-radius: 8px;
    margin-bottom: 0.5rem;
    transition: all 0.2s;
}
.todo-item.completed .todo-text { text-decoration: line-through; opacity: 0.5; }
.todo-checkbox {
    width: 20px;
    height: 20px;
    margin-right: 1rem;
    cursor: pointer;
    accent-color: ${parsed.accentColor};
}
.todo-text { flex: 1; }
.btn-delete {
    padding: 0.25rem 0.75rem;
    background: #e74c3c;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.2s;
}
.todo-item:hover .btn-delete { opacity: 1; }
.todo-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid ${border};
    opacity: 0.7;
}
.btn-clear {
    background: none;
    border: none;
    color: ${parsed.accentColor};
    cursor: pointer;
}
.btn-clear:hover { text-decoration: underline; }
`;
    }

    getTodoJS() {
        return `
let todos = JSON.parse(localStorage.getItem('todos') || '[]');
let filter = 'all';

function render() {
    const list = document.getElementById('todoList');
    const filtered = todos.filter(t => {
        if (filter === 'active') return !t.completed;
        if (filter === 'completed') return t.completed;
        return true;
    });
    
    list.innerHTML = filtered.map((todo, index) => \`
        <li class="todo-item \${todo.completed ? 'completed' : ''}">
            <input type="checkbox" class="todo-checkbox" \${todo.completed ? 'checked' : ''} onchange="toggleTodo(\${todo.id})">
            <span class="todo-text">\${escapeHtml(todo.text)}</span>
            <button class="btn-delete" onclick="deleteTodo(\${todo.id})">Delete</button>
        </li>
    \`).join('');
    
    document.getElementById('itemsLeft').textContent = 
        todos.filter(t => !t.completed).length + ' items left';
    
    localStorage.setItem('todos', JSON.stringify(todos));
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    if (!text) return;
    
    todos.push({ id: Date.now(), text, completed: false });
    input.value = '';
    render();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        render();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    render();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('todoInput').addEventListener('keypress', e => {
    if (e.key === 'Enter') addTodo();
});

document.getElementById('addBtn').addEventListener('click', addTodo);

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filter = btn.dataset.filter;
        render();
    });
});

document.getElementById('clearCompleted').addEventListener('click', () => {
    todos = todos.filter(t => !t.completed);
    render();
});

render();
`;
    }

    // Calculator App
    generateCalculatorApp(parsed) {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator</title>
    <style>${this.getCalculatorCSS(parsed)}</style>
</head>
<body>
    <div class="calculator">
        <div class="display" id="display">0</div>
        <div class="buttons">
            <button class="btn-op" data-val="C">C</button>
            <button class="btn-op" data-val="±">±</button>
            <button class="btn-op" data-val="%">%</button>
            <button class="btn-op" data-val="/">÷</button>
            <button data-val="7">7</button>
            <button data-val="8">8</button>
            <button data-val="9">9</button>
            <button class="btn-op" data-val="*">×</button>
            <button data-val="4">4</button>
            <button data-val="5">5</button>
            <button data-val="6">6</button>
            <button class="btn-op" data-val="-">−</button>
            <button data-val="1">1</button>
            <button data-val="2">2</button>
            <button data-val="3">3</button>
            <button class="btn-op" data-val="+">+</button>
            <button data-val="0" class="zero">0</button>
            <button data-val=".">.</button>
            <button class="btn-eq" data-val="=">=</button>
        </div>
    </div>
    <script>${this.getCalculatorJS()}<\/script>
</body>
</html>`;

        return {
            name: 'Calculator',
            type: 'calculator',
            theme: parsed.theme,
            accentColor: parsed.accentColor,
            generatedHTML: html,
            generatedCSS: this.getCalculatorCSS(parsed),
            generatedJS: this.getCalculatorJS()
        };
    }

    getCalculatorCSS(parsed) {
        const isDark = parsed.theme !== 'light';
        const bg = isDark ? '#1e1e1e' : '#f0f0f0';
        const calcBg = isDark ? '#2d2d2d' : '#ffffff';
        const text = isDark ? '#ffffff' : '#333333';
        const btnBg = isDark ? '#3d3d3d' : '#f5f5f5';
        
        return `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${bg};
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
.calculator {
    background: ${calcBg};
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    width: 320px;
}
.display {
    background: ${isDark ? '#1a1a1a' : '#e8e8e8'};
    color: ${text};
    font-size: 3rem;
    padding: 1.5rem;
    text-align: right;
    border-radius: 10px;
    margin-bottom: 1rem;
    overflow: hidden;
    word-break: break-all;
}
.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.75rem;
}
.buttons button {
    padding: 1.25rem;
    font-size: 1.25rem;
    border: none;
    border-radius: 10px;
    background: ${btnBg};
    color: ${text};
    cursor: pointer;
    transition: all 0.15s;
}
.buttons button:hover { transform: scale(1.05); }
.buttons button:active { transform: scale(0.95); }
.btn-op { background: ${parsed.accentColor}44 !important; color: ${parsed.accentColor} !important; }
.btn-eq { background: ${parsed.accentColor} !important; color: white !important; }
.zero { grid-column: span 2; }
`;
    }

    getCalculatorJS() {
        return `
let current = '0';
let previous = null;
let operation = null;
let shouldReset = false;

const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = current.length > 12 ? current.slice(0, 12) + '...' : current;
}

document.querySelectorAll('.buttons button').forEach(btn => {
    btn.addEventListener('click', () => {
        const val = btn.dataset.val;
        
        if (!isNaN(val) || val === '.') {
            if (shouldReset) {
                current = val === '.' ? '0.' : val;
                shouldReset = false;
            } else {
                if (val === '.' && current.includes('.')) return;
                current = current === '0' && val !== '.' ? val : current + val;
            }
        } else if (val === 'C') {
            current = '0';
            previous = null;
            operation = null;
        } else if (val === '±') {
            current = String(-parseFloat(current));
        } else if (val === '%') {
            current = String(parseFloat(current) / 100);
        } else if (['+', '-', '*', '/'].includes(val)) {
            if (previous !== null) calculate();
            previous = parseFloat(current);
            operation = val;
            shouldReset = true;
        } else if (val === '=') {
            if (previous !== null && operation) calculate();
            previous = null;
            operation = null;
            shouldReset = true;
        }
        updateDisplay();
    });
});

function calculate() {
    const prev = previous;
    const curr = parseFloat(current);
    let result;
    
    switch (operation) {
        case '+': result = prev + curr; break;
        case '-': result = prev - curr; break;
        case '*': result = prev * curr; break;
        case '/': result = curr !== 0 ? prev / curr : 'Error'; break;
    }
    
    current = String(result);
}
`;
    }

    // Quiz App
    generateQuizApp(parsed) {
        return {
            name: 'Quiz App',
            type: 'quiz',
            theme: parsed.theme,
            accentColor: parsed.accentColor,
            generatedHTML: this.getQuizHTML(parsed),
            generatedCSS: this.getQuizCSS(parsed),
            generatedJS: this.getQuizJS()
        };
    }

    getQuizHTML(parsed) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz App</title>
    <style>${this.getQuizCSS(parsed)}</style>
</head>
<body>
    <div class="quiz-container">
        <div class="quiz-header">
            <h1>🧠 Quick Quiz</h1>
            <div class="progress">
                <span id="questionCount">1/5</span>
                <div class="progress-bar"><div id="progressFill"></div></div>
            </div>
        </div>
        
        <div id="quizContent" class="quiz-content">
            <h2 id="questionText">Loading...</h2>
            <div id="options" class="options"></div>
        </div>
        
        <div id="resultScreen" class="result-screen" style="display:none;">
            <h2>Quiz Complete! 🎉</h2>
            <div class="score-circle">
                <span id="scoreValue">0</span>
                <span class="score-total">/5</span>
            </div>
            <p id="scoreMessage">Great job!</p>
            <button id="restartBtn" class="btn-restart">Play Again</button>
        </div>
    </div>
    <script>${this.getQuizJS()}<\/script>
</body>
</html>`;
    }

    getQuizCSS(parsed) {
        const isDark = parsed.theme !== 'light';
        const bg = isDark ? '#1e1e1e' : '#f5f5f5';
        const cardBg = isDark ? '#2d2d2d' : '#ffffff';
        const text = isDark ? '#e0e0e0' : '#333333';
        
        return `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${bg};
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    color: ${text};
}
.quiz-container {
    background: ${cardBg};
    border-radius: 16px;
    padding: 2rem;
    max-width: 500px;
    width: 100%;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
.quiz-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}
.progress { display: flex; align-items: center; gap: 0.5rem; }
.progress-bar {
    width: 100px;
    height: 8px;
    background: ${isDark ? '#404040' : '#e0e0e0'};
    border-radius: 4px;
    overflow: hidden;
}
#progressFill {
    height: 100%;
    background: ${parsed.accentColor};
    transition: width 0.3s;
}
#questionText { margin-bottom: 1.5rem; font-size: 1.25rem; }
.options { display: flex; flex-direction: column; gap: 0.75rem; }
.option-btn {
    padding: 1rem;
    border: 2px solid ${isDark ? '#404040' : '#e0e0e0'};
    background: transparent;
    color: ${text};
    border-radius: 8px;
    cursor: pointer;
    text-align: left;
    transition: all 0.2s;
    font-size: 1rem;
}
.option-btn:hover { border-color: ${parsed.accentColor}; }
.option-btn.correct { background: #27ae60; border-color: #27ae60; color: white; }
.option-btn.wrong { background: #e74c3c; border-color: #e74c3c; color: white; }
.result-screen { text-align: center; }
.score-circle {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background: ${parsed.accentColor}22;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 2rem auto;
    border: 4px solid ${parsed.accentColor};
}
#scoreValue { font-size: 3rem; font-weight: bold; color: ${parsed.accentColor}; }
.score-total { font-size: 1.25rem; opacity: 0.7; }
#scoreMessage { margin-bottom: 1.5rem; font-size: 1.25rem; }
.btn-restart {
    padding: 1rem 2rem;
    background: ${parsed.accentColor};
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 600;
}
`;
    }

    getQuizJS() {
        return `
const questions = [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink Text Mark Language"], correct: 0 },
    { q: "Which language runs in browsers?", options: ["Java", "Python", "JavaScript"], correct: 2 },
    { q: "What does CSS stand for?", options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"], correct: 1 },
    { q: "What year was JavaScript created?", options: ["1995", "2000", "1990"], correct: 0 },
    { q: "Which symbol is used for comments in JS?", options: ["<!-- -->", "//", "#"], correct: 1 }
];

let currentQ = 0;
let score = 0;
let answered = false;

function loadQuestion() {
    answered = false;
    const q = questions[currentQ];
    document.getElementById('questionText').textContent = q.q;
    document.getElementById('questionCount').textContent = \`\${currentQ + 1}/\${questions.length}\`;
    document.getElementById('progressFill').style.width = \`\${((currentQ) / questions.length) * 100}%\`;
    
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = q.options.map((opt, i) => 
        \`<button class="option-btn" onclick="selectOption(\${i})">\${opt}</button>\`
    ).join('');
}

function selectOption(index) {
    if (answered) return;
    answered = true;
    
    const q = questions[currentQ];
    const buttons = document.querySelectorAll('.option-btn');
    
    if (index === q.correct) {
        buttons[index].classList.add('correct');
        score++;
    } else {
        buttons[index].classList.add('wrong');
        buttons[q.correct].classList.add('correct');
    }
    
    setTimeout(() => {
        currentQ++;
        if (currentQ < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    document.getElementById('quizContent').style.display = 'none';
    document.getElementById('resultScreen').style.display = 'block';
    document.getElementById('scoreValue').textContent = score;
    
    let msg = score === 5 ? "Perfect! 🌟" : score >= 3 ? "Good job! 👍" : "Keep practicing! 💪";
    document.getElementById('scoreMessage').textContent = msg;
}

document.getElementById('restartBtn').addEventListener('click', () => {
    currentQ = 0;
    score = 0;
    document.getElementById('quizContent').style.display = 'block';
    document.getElementById('resultScreen').style.display = 'none';
    loadQuestion();
});

loadQuestion();
`;
    }

    // Timer/Pomodoro App
    generateTimerApp(parsed) {
        return this.generatePomodoroApp(parsed);
    }

    generatePomodoroApp(parsed) {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pomodoro Timer</title>
    <style>${this.getPomodoroCSS(parsed)}</style>
</head>
<body>
    <div class="pomodoro-container">
        <h1>🍅 Pomodoro Timer</h1>
        
        <div class="modes">
            <button class="mode-btn active" data-mode="work">Work</button>
            <button class="mode-btn" data-mode="short">Short Break</button>
            <button class="mode-btn" data-mode="long">Long Break</button>
        </div>
        
        <div class="timer-display" id="timer">25:00</div>
        
        <div class="controls">
            <button id="startBtn" class="btn-control btn-start">Start</button>
            <button id="resetBtn" class="btn-control btn-reset">Reset</button>
        </div>
        
        <div class="stats">
            <div class="stat">
                <span class="stat-value" id="completedPomodoros">0</span>
                <span class="stat-label">Pomodoros</span>
            </div>
            <div class="stat">
                <span class="stat-value" id="totalMinutes">0</span>
                <span class="stat-label">Minutes</span>
            </div>
        </div>
    </div>
    <script>${this.getPomodoroJS()}<\/script>
</body>
</html>`;

        return {
            name: 'Pomodoro Timer',
            type: 'pomodoro',
            theme: parsed.theme,
            accentColor: parsed.accentColor,
            generatedHTML: html,
            generatedCSS: this.getPomodoroCSS(parsed),
            generatedJS: this.getPomodoroJS()
        };
    }

    getPomodoroCSS(parsed) {
        const isDark = parsed.theme !== 'light';
        const bg = isDark ? '#1e1e1e' : '#f5f5f5';
        const cardBg = isDark ? '#2d2d2d' : '#ffffff';
        const text = isDark ? '#e0e0e0' : '#333333';
        
        return `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${bg};
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${text};
}
.pomodoro-container {
    background: ${cardBg};
    border-radius: 20px;
    padding: 2rem;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
h1 { margin-bottom: 1.5rem; }
.modes { display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 2rem; }
.mode-btn {
    padding: 0.5rem 1rem;
    border: none;
    background: ${isDark ? '#404040' : '#e0e0e0'};
    color: ${text};
    border-radius: 20px;
    cursor: pointer;
    transition: all 0.2s;
}
.mode-btn.active { background: ${parsed.accentColor}; color: white; }
.timer-display {
    font-size: 5rem;
    font-weight: bold;
    font-family: monospace;
    color: ${parsed.accentColor};
    margin: 1rem 0;
}
.controls { display: flex; gap: 1rem; justify-content: center; margin: 1.5rem 0; }
.btn-control {
    padding: 1rem 2rem;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    cursor: pointer;
    font-weight: 600;
    transition: transform 0.15s;
}
.btn-control:hover { transform: scale(1.05); }
.btn-start { background: ${parsed.accentColor}; color: white; }
.btn-reset { background: ${isDark ? '#404040' : '#e0e0e0'}; color: ${text}; }
.stats { display: flex; gap: 2rem; justify-content: center; margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid ${isDark ? '#404040' : '#e0e0e0'}; }
.stat { display: flex; flex-direction: column; }
.stat-value { font-size: 2rem; font-weight: bold; color: ${parsed.accentColor}; }
.stat-label { opacity: 0.7; font-size: 0.875rem; }
`;
    }

    getPomodoroJS() {
        return `
const modes = { work: 25, short: 5, long: 15 };
let currentTime = modes.work;
let timerId = null;
let isRunning = false;
let currentMode = 'work';
let completed = 0;
let totalMinutes = 0;

const timerEl = document.getElementById('timer');
const startBtn = document.getElementById('startBtn');

function updateDisplay() {
    const m = Math.floor(currentTime / 60).toString().padStart(2, '0');
    const s = (currentTime % 60).toString().padStart(2, '0');
    timerEl.textContent = \`\${m}:\${s}\`;
    document.title = \`\${m}:\${s} - Pomodoro\`;
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(timerId);
        startBtn.textContent = 'Start';
    } else {
        timerId = setInterval(() => {
            currentTime--;
            updateDisplay();
            
            if (currentTime <= 0) {
                clearInterval(timerId);
                new Audio('data:audio/wav;base64,UklGRnoAAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQAAAAA=').play().catch(()=>{});
                
                if (currentMode === 'work') {
                    completed++;
                    totalMinutes += modes.work;
                    document.getElementById('completedPomodoros').textContent = completed;
                    document.getElementById('totalMinutes').textContent = totalMinutes;
                }
                
                isRunning = false;
                startBtn.textContent = 'Start';
                alert(currentMode === 'work' ? 'Time for a break!' : 'Back to work!');
            }
        }, 1000);
        startBtn.textContent = 'Pause';
    }
    isRunning = !isRunning;
}

function resetTimer() {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    currentTime = modes[currentMode] * 60;
    updateDisplay();
}

function setMode(mode) {
    clearInterval(timerId);
    isRunning = false;
    startBtn.textContent = 'Start';
    currentMode = mode;
    currentTime = modes[mode] * 60;
    
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    updateDisplay();
}

startBtn.addEventListener('click', toggleTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => setMode(btn.dataset.mode));
});

updateDisplay();
`;
    }

    // Notes App
    generateNotesApp(parsed) {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Notes App</title>
    <style>${this.getNotesCSS(parsed)}</style>
</head>
<body>
    <div class="notes-container">
        <header>
            <h1>📝 Notes</h1>
            <button id="addNoteBtn" class="btn-add-note">+ New Note</button>
        </header>
        
        <div class="search-bar">
            <input type="text" id="searchInput" placeholder="Search notes...">
        </div>
        
        <div id="notesGrid" class="notes-grid"></div>
    </div>
    
    <div id="noteModal" class="modal" style="display:none;">
        <div class="modal-content">
            <input type="text" id="noteTitle" placeholder="Title">
            <textarea id="noteContent" placeholder="Write your note..."></textarea>
            <div class="modal-actions">
                <button id="saveNoteBtn" class="btn-save">Save</button>
                <button id="closeModalBtn" class="btn-cancel">Cancel</button>
            </div>
        </div>
    </div>
    <script>${this.getNotesJS()}<\/script>
</body>
</html>`;

        return {
            name: 'Notes App',
            type: 'notes',
            theme: parsed.theme,
            accentColor: parsed.accentColor,
            generatedHTML: html,
            generatedCSS: this.getNotesCSS(parsed),
            generatedJS: this.getNotesJS()
        };
    }

    getNotesCSS(parsed) {
        const isDark = parsed.theme !== 'light';
        const bg = isDark ? '#1e1e1e' : '#f5f5f5';
        const cardBg = isDark ? '#2d2d2d' : '#ffffff';
        const text = isDark ? '#e0e0e0' : '#333333';
        
        return `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${bg};
    min-height: 100vh;
    padding: 2rem;
    color: ${text};
}
.notes-container { max-width: 1200px; margin: 0 auto; }
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}
.btn-add-note {
    padding: 0.75rem 1.5rem;
    background: ${parsed.accentColor};
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}
.search-bar { margin-bottom: 2rem; }
#searchInput {
    width: 100%;
    padding: 1rem;
    border: 2px solid ${isDark ? '#404040' : '#e0e0e0'};
    border-radius: 8px;
    background: ${cardBg};
    color: ${text};
    font-size: 1rem;
}
.notes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}
.note-card {
    background: ${cardBg};
    padding: 1.5rem;
    border-radius: 12px;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    border-left: 4px solid ${parsed.accentColor};
}
.note-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}
.note-card h3 { margin-bottom: 0.5rem; }
.note-card p { opacity: 0.7; font-size: 0.9rem; line-height: 1.5; }
.note-date { margin-top: 1rem; font-size: 0.75rem; opacity: 0.5; }
.modal {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}
.modal-content {
    background: ${cardBg};
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
}
#noteTitle, #noteContent {
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 2px solid ${isDark ? '#404040' : '#e0e0e0'};
    border-radius: 8px;
    background: ${bg};
    color: ${text};
    font-family: inherit;
}
#noteTitle { font-size: 1.25rem; font-weight: 600; }
#noteContent { min-height: 200px; resize: vertical; }
.modal-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }
.btn-save, .btn-cancel {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 600;
}
.btn-save { background: ${parsed.accentColor}; color: white; }
.btn-cancel { background: ${isDark ? '#404040' : '#e0e0e0'}; color: ${text}; }
`;
    }

    getNotesJS() {
        return `
let notes = JSON.parse(localStorage.getItem('notes') || '[]');
let editingId = null;

function renderNotes(filter = '') {
    const grid = document.getElementById('notesGrid');
    const filtered = notes.filter(n => 
        n.title.toLowerCase().includes(filter.toLowerCase()) ||
        n.content.toLowerCase().includes(filter.toLowerCase())
    );
    
    grid.innerHTML = filtered.map(note => \`
        <div class="note-card" onclick="editNote(\${note.id})">
            <h3>\${escapeHtml(note.title)}</h3>
            <p>\${escapeHtml(note.content.substring(0, 100))}\${note.content.length > 100 ? '...' : ''}</p>
            <div class="note-date">\${new Date(note.date).toLocaleDateString()}</div>
        </div>
    \`).join('');
}

function openModal(note = null) {
    document.getElementById('noteModal').style.display = 'flex';
    if (note) {
        editingId = note.id;
        document.getElementById('noteTitle').value = note.title;
        document.getElementById('noteContent').value = note.content;
    } else {
        editingId = null;
        document.getElementById('noteTitle').value = '';
        document.getElementById('noteContent').value = '';
    }
}

function closeModal() {
    document.getElementById('noteModal').style.display = 'none';
}

function saveNote() {
    const title = document.getElementById('noteTitle').value.trim() || 'Untitled';
    const content = document.getElementById('noteContent').value.trim();
    
    if (editingId) {
        const note = notes.find(n => n.id === editingId);
        if (note) {
            note.title = title;
            note.content = content;
            note.date = new Date().toISOString();
        }
    } else {
        notes.unshift({
            id: Date.now(),
            title,
            content,
            date: new Date().toISOString()
        });
    }
    
    localStorage.setItem('notes', JSON.stringify(notes));
    closeModal();
    renderNotes(document.getElementById('searchInput').value);
}

function editNote(id) {
    const note = notes.find(n => n.id === id);
    openModal(note);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

document.getElementById('addNoteBtn').addEventListener('click', () => openModal());
document.getElementById('closeModalBtn').addEventListener('click', closeModal);
document.getElementById('saveNoteBtn').addEventListener('click', saveNote);
document.getElementById('searchInput').addEventListener('input', e => renderNotes(e.target.value));

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

renderNotes();
`;
    }

    // Counter App
    generateCounterApp(parsed) {
        const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Counter</title>
    <style>${this.getCounterCSS(parsed)}</style>
</head>
<body>
    <div class="counter-container">
        <h1>🔢 Counter</h1>
        <div class="count-display" id="countDisplay">0</div>
        <div class="counter-controls">
            <button class="btn-count btn-decrease">−</button>
            <button class="btn-count btn-reset">⟲</button>
            <button class="btn-count btn-increase">+</button>
        </div>
        <div class="presets">
            <button class="btn-preset" data-val="1">+1</button>
            <button class="btn-preset" data-val="5">+5</button>
            <button class="btn-preset" data-val="10">+10</button>
        </div>
    </div>
    <script>${this.getCounterJS()}<\/script>
</body>
</html>`;

        return {
            name: 'Counter',
            type: 'counter',
            theme: parsed.theme,
            accentColor: parsed.accentColor,
            generatedHTML: html,
            generatedCSS: this.getCounterCSS(parsed),
            generatedJS: this.getCounterJS()
        };
    }

    getCounterCSS(parsed) {
        const isDark = parsed.theme !== 'light';
        const bg = isDark ? '#1e1e1e' : '#f5f5f5';
        const cardBg = isDark ? '#2d2d2d' : '#ffffff';
        const text = isDark ? '#e0e0e0' : '#333333';
        
        return `
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${bg};
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${text};
}
.counter-container {
    background: ${cardBg};
    padding: 3rem;
    border-radius: 20px;
    text-align: center;
    box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
h1 { margin-bottom: 2rem; }
.count-display {
    font-size: 6rem;
    font-weight: bold;
    color: ${parsed.accentColor};
    margin: 1rem 0 2rem;
    font-family: monospace;
}
.counter-controls { display: flex; gap: 1rem; justify-content: center; margin-bottom: 1.5rem; }
.btn-count {
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    transition: transform 0.15s;
}
.btn-count:hover { transform: scale(1.1); }
.btn-increase { background: ${parsed.accentColor}; color: white; }
.btn-decrease { background: ${isDark ? '#404040' : '#e0e0e0'}; color: ${text}; }
.btn-reset { background: transparent; border: 2px solid ${isDark ? '#404040' : '#e0e0e0'}; color: ${text}; }
.presets { display: flex; gap: 0.5rem; justify-content: center; }
.btn-preset {
    padding: 0.5rem 1rem;
    border: 2px solid ${isDark ? '#404040' : '#e0e0e0'};
    background: transparent;
    color: ${text};
    border-radius: 20px;
    cursor: pointer;
}
.btn-preset:hover { border-color: ${parsed.accentColor}; color: ${parsed.accentColor}; }
`;
    }

    getCounterJS() {
        return `
let count = parseInt(localStorage.getItem('counter') || '0');
const display = document.getElementById('countDisplay');

function update() {
    display.textContent = count;
    localStorage.setItem('counter', count);
    document.title = count + ' - Counter';
}

document.querySelector('.btn-increase').addEventListener('click', () => { count++; update(); });
document.querySelector('.btn-decrease').addEventListener('click', () => { count--; update(); });
document.querySelector('.btn-reset').addEventListener('click', () => { count = 0; update(); });

document.querySelectorAll('.btn-preset').forEach(btn => {
    btn.addEventListener('click', () => {
        count += parseInt(btn.dataset.val);
        update();
    });
});

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowUp' || e.key === '+') { count++; update(); }
    if (e.key === 'ArrowDown' || e.key === '-') { count--; update(); }
    if (e.key === 'r' || e.key === 'R') { count = 0; update(); }
});

update();
`;
    }

    generateStopwatchApp(parsed) {
        // Similar to timer but with lap functionality
        return this.generateTimerApp(parsed);
    }
}

export default GeneratorService;
