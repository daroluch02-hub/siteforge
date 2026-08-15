# SiteForge - Text to App & Website Builder

> Type it. SiteForge builds it.

SiteForge is a professional **text-to-app / text-to-website** builder. You describe what you want in plain English - "a modern coffee shop in Brooklyn, dark theme with warm orange accents" or "a todo app to keep track of my daily tasks" - and SiteForge parses your intent, detects the right template, theme, colors and sections, and renders a complete, standalone site or working interactive app in a live preview.

Built with a clean **MVC architecture** - no single-file hacks. Every concern (models, views, controllers, services, templates, event bus) lives in its own module.

## Features

### Build websites from text

- Detects business type: `restaurant`, `portfolio`, `saas`, `business`, `ecommerce`, `blog`, `landing`
- Detects theme: `dark`, `light`, `minimal`, `modern`, `professional`
- Detects accent colors: blue, red, green, purple, orange, pink, teal, yellow, indigo, cyan
- Auto-detects sections: about, features, services, menu, pricing, testimonials, faq, contact, hero, gallery, team, stats
- Renders a complete standalone HTML document into a live preview iframe

### Build working apps from text

Type "a todo app", "a calculator", "a quiz", "a pomodoro timer", "notes pad", or "a counter" - SiteForge generates a fully functional interactive app:

| Prompt keyword | App generated |
|---|---|
| `todo` / `task list` | Working todo list |
| `calculator` | Working calculator |
| `quiz` / `trivia` | Quiz with score and retry |
| `timer` / `pomodoro` / `stopwatch` | Countdown timer |
| `notes` / `journal` | Auto-saving notes pad |
| `counter` / `click counter` | Counter with plus/minus |

### UI

- Dark, professional IDE-style interface
- Template gallery cards
- Live section-detection chips (see what SiteForge understood before you generate)
- Preview / Code tabs
- Download the generated HTML with one click
- Node.js backend (optional) with code-generation services

## Architecture (MVC)

```
siteforge/
|-- index.html                          # App shell
|-- assets/
|   |-- css/
|   |   `-- styles.css                  # Global styles
|   `-- js/
|       |-- app.js                      # Entry point (ES module)
|       |-- core/
|       |   `-- EventBus.js             # Pub/sub event bus
|       |-- models/
|       |   `-- ProjectModel.js         # Project data model
|       |-- views/
|       |   |-- EditorView.js           # Prompt/template editor UI
|       |   |-- PreviewView.js          # Live preview iframe
|       |   `-- TemplateView.js         # Template gallery UI
|       |-- controllers/
|       |   |-- AppController.js        # App orchestration
|       |   `-- GeneratorController.js  # Generation flow
|       |-- services/
|       |   |-- ParserService.js        # NLP-lite intent parsing
|       |   |-- GeneratorService.js     # Model building
|       |   `-- RenderService.js        # HTML rendering
|       |-- templates/
|       |   `-- TemplateLibrary.js      # Site/app template definitions
|       `-- utils/
|           `-- dom.js                  # DOM helpers
|-- src/                                # Optional Node.js backend
|   |-- server.js                       # Express server
|   |-- services/
|   |   |-- CodeGenerator.js            # Programmatic code generation
|   |   |-- ProjectManager.js           # Project CRUD
|   |   `-- TemplateEngine.js           # Server-side template engine
|   `-- utils/
|       `-- Validator.js                # Input validation
`-- tests/
    `-- __tests__/                      # Jest test suites
```

**Flow:** `User text -> ParserService.parse() -> GeneratorService.generate() -> ProjectModel -> RenderService.render() -> preview iframe / download`

## Getting Started

### Option 1 - Just open it

Open `index.html` in any modern browser. No build step, no dependencies for the front-end.

### Option 2 - Run with the backend

```bash
npm install
npm start          # starts the Express server
npm run dev        # dev mode with nodemon
```

### Run the tests

```bash
npm test           # 94 tests across 3 suites
npm run test:coverage
npm run lint
```

## Tests

Jest test suites covering the core engine:

- **TemplateEngine** - HTML/CSS/JS template selection and rendering
- **CodeGenerator** - generated component structure
- **Validator** - input validation rules

**94 tests, 3 suites, all passing**

## How It Works

1. **Parse** - `ParserService` reads your sentence and detects type, theme, accent color, sections, app intent, and a suggested name.
2. **Generate** - `GeneratorService` turns the parsed intent into a structured `ProjectModel`.
3. **Render** - `RenderService` produces a self-contained HTML document (inline CSS, escaped output - no script injection).
4. **Preview** - the result renders instantly in the preview iframe; switch to the Code tab to inspect or copy it.

## Example Prompts

- "A modern coffee shop in Brooklyn with a menu, about us, customer reviews and contact section. Dark theme with warm orange accents."
- "A portfolio for a freelance photographer showcasing wedding, travel and portrait projects. Clean light theme with teal accents."
- "A SaaS startup landing page for an AI note-taking app with features, pricing, testimonials and FAQ. Purple gradient, dark theme."
- "A todo app to keep track of my daily tasks. Playful, bright colors."
- "A pomodoro timer app to help me focus. Minimal design."

## Tech Stack

| Layer | Tech |
|---|---|
| Front-end | Vanilla JS (ES modules), HTML5, CSS3 |
| Back-end (optional) | Node.js, Express |
| Tests | Jest |
| Lint | ESLint |

No framework lock-in. No build step required for the front-end.

## License

MIT
