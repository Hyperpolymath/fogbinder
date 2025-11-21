# CLAUDE.md - AI Assistant Guide for Fogbinder

## Project Overview

**Fogbinder** is a Zotero plugin designed to illuminate epistemic ambiguity and emotional nuance in research. Rather than treating uncertainty as a flaw, Fogbinder embraces contradiction, mood, and mystery as valuable dimensions of scholarly exploration.

### Core Philosophy
- Ambiguity is a feature, not a bug
- Contradictions invite deeper analysis
- Emotional tone matters in research
- Accessibility should never be compromised
- Privacy and security are fundamental rights

### Key Features
1. **Contradiction Detection** - Identify clashing ideas across sources
2. **Mood Scoring** - Annotate sources by emotional tone
3. **Mystery Clustering** - Surface speculative/ambiguous references
4. **FogTrail Visualization** - Network map of epistemic opacity

## Repository Structure

```
fogbinder/
├── .git/                   # Git repository metadata
├── .gitignore              # Git ignore patterns
├── assets/                 # Static assets
│   └── styles.css          # Accessibility-focused CSS
├── localization/           # Internationalization files
│   └── en-US.json          # English (US) translations
├── src/                    # Source code
│   └── main.ts             # Main entry point (TypeScript)
├── LICENSE                 # Full GNU AGPLv3 license text
├── LICENSE TLDR.md         # Plain-language license summary
├── manifest.json           # Plugin manifest
└── README.md               # Public-facing documentation
```

## Development Status

**Current Phase:** Early Development

- Core TypeScript structure established (`src/main.ts`)
- Manifest and licensing in place
- Accessibility CSS framework defined
- Localization infrastructure ready
- **Missing:** Build configuration, dependencies, implementation logic

### What Needs to Be Built
- [ ] TypeScript/JavaScript build system (webpack/rollup/esbuild)
- [ ] Core plugin logic for Zotero integration
- [ ] Contradiction detection algorithms
- [ ] Mood scoring system
- [ ] Mystery clustering logic
- [ ] FogTrail visualization engine
- [ ] Test suite
- [ ] Documentation

## Technology Stack

### Languages
- **TypeScript** - Primary language (evidenced by `main.ts`)
- **CSS** - Styling with accessibility focus
- **JSON** - Configuration and localization

### Framework
- **Zotero Plugin Architecture** - Based on `manifest.json` structure
  - `manifest_version: 2`
  - Follows standard Zotero plugin conventions

### Dependencies (To Be Added)
Expected dependencies based on project goals:
- TypeScript compiler
- Build tool (webpack/rollup/esbuild)
- Zotero API types
- Natural language processing libraries (for contradiction detection)
- Graph visualization library (for FogTrail)
- Testing framework (Jest/Vitest recommended)
- Linting/formatting (ESLint + Prettier)

## Key Conventions

### Code Style
- **TypeScript strict mode** - Enable all strict checks
- **Semantic naming** - Prioritize clarity over brevity
- **Accessibility-first** - ARIA labels, semantic HTML, keyboard navigation
- **Security-conscious** - Input sanitization, no external tracking

### Naming Conventions
Based on localization keys:
- Tags: `tag.contradiction`, `tag.mystery`, `tag.mood`
- UI elements: `ui.aria_description`
- Use dot notation for namespacing

### File Organization
- Keep source code in `src/`
- Styles in `assets/`
- Translations in `localization/` following ISO codes (`en-US`, `fr-FR`, etc.)
- Tests alongside source files or in `src/__tests__/`

## Security & Privacy Requirements

### License Compliance (AGPLv3)
- **Network copyleft** - Any hosted version must provide source code access
- **Derivative works** - Must be licensed under AGPLv3
- **Attribution** - Preserve copyright notices and author credits
- **No warranty** - Software provided "as-is"

### Security Practices
Per README.md commitments:
1. **Input sanitization** - Prevent injection attacks
2. **No API key storage** - Never persist credentials
3. **No external data collection** - Respect user privacy
4. **No tracking scripts** - Keep `.gitignore` strict
5. **Open-source transparency** - All code publicly auditable

### Prohibited Actions
- Storing sensitive data without encryption
- Making external API calls without explicit user consent
- Adding telemetry or analytics
- Weakening input validation
- Introducing XSS, SQL injection, or command injection vulnerabilities

## Accessibility Requirements

### WCAG Compliance
Target: **WCAG 2.1 Level AA minimum**

### Implementation Standards
1. **Semantic HTML** - Use proper heading hierarchy, landmarks, lists
2. **ARIA labels** - All interactive elements must have accessible names
3. **Keyboard navigation** - Full functionality without mouse
4. **Focus indicators** - Visible 2px solid outline (#005fcc)
5. **High contrast mode** - Support for `.high-contrast` class
6. **Screen reader testing** - Verify with NVDA/JAWS/VoiceOver
7. **Color independence** - Never rely solely on color to convey information

### CSS Accessibility Rules (assets/styles.css)
```css
:focus { outline: 2px solid #005fcc; }
.high-contrast { background-color: #000; color: #fff; }
[aria-label]::after { content: attr(aria-label); }
```

## Localization

### Current Support
- English (US) - `localization/en-US.json`

### Adding New Languages
1. Create `localization/{ISO-code}.json`
2. Copy structure from `en-US.json`
3. Translate all values, preserve keys
4. Update manifest.json if needed

### Translation Keys
```json
{
  "tag.contradiction": "Contradiction Detected",
  "tag.mystery": "Unresolved Mystery",
  "tag.mood": "Mood Score",
  "ui.aria_description": "Fogbinder helps visualize contradictions and tone in your research"
}
```

## Git Workflow

### Branch Strategy
- **Main branch** - Production-ready code
- **Feature branches** - Use descriptive names: `feature/mood-scoring`, `fix/aria-labels`
- **Claude branches** - AI-assisted work: `claude/claude-md-{session-id}`

### Commit Message Style
Based on git history analysis:
```
Update main.ts
Rename main.js to main.ts
Initial commit
```

**Preferred format:**
- Imperative mood ("Add", "Fix", "Update", not "Added", "Fixed")
- Capitalized first word
- No period at end
- Reference issue numbers when applicable: "Fix contradiction detection (#42)"

### Pre-Commit Checks
Ensure before committing:
- [ ] No secrets in code (.env, API keys)
- [ ] TypeScript compiles without errors
- [ ] All tests pass
- [ ] Linting passes
- [ ] Accessibility checks pass
- [ ] New features have tests

## AI Assistant Guidelines

### When Working on This Codebase

#### DO:
1. **Read before writing** - Always read existing files before modifying
2. **Preserve accessibility** - Maintain ARIA labels, semantic HTML, keyboard support
3. **Sanitize inputs** - Validate and escape all user-provided data
4. **Follow AGPLv3** - Ensure modifications remain open-source compatible
5. **Add localization keys** - New UI text goes in `localization/*.json`
6. **Comment complex logic** - Explain non-obvious algorithms (contradiction detection, mood scoring)
7. **Test accessibility** - Verify keyboard navigation and screen reader compatibility
8. **Use TypeScript types** - Avoid `any`, prefer strict typing
9. **Ask before major changes** - Clarify architectural decisions with the user

#### DON'T:
1. **Add telemetry** - No analytics, tracking, or external calls without explicit consent
2. **Store secrets** - Never commit API keys, credentials, or tokens
3. **Use emoji in code** - Keep professional unless explicitly requested
4. **Break accessibility** - Don't remove ARIA labels or keyboard support
5. **Ignore localization** - Hardcoded strings should be rare and documented
6. **Over-engineer** - Keep solutions simple and focused
7. **Skip security** - Input validation is not optional
8. **Assume Obsidian** - This is a **Zotero plugin**, not Obsidian

### Common Tasks

#### Adding a New Feature
1. Read relevant existing code
2. Add localization keys to `localization/en-US.json`
3. Implement in TypeScript with proper types
4. Add ARIA labels and semantic HTML
5. Write tests
6. Update README.md if user-facing
7. Commit with descriptive message

#### Fixing a Bug
1. Reproduce the issue
2. Identify root cause
3. Fix with minimal changes
4. Add regression test
5. Verify accessibility not broken
6. Commit with "Fix: {description}"

#### Refactoring
1. Ensure tests exist first
2. Make incremental changes
3. Run tests after each change
4. Preserve public API
5. Update comments/docs if needed

### TypeScript-Specific Guidance

#### Expected Patterns
```typescript
// Plugin entry point structure (main.ts)
export default class FogbinderPlugin {
  async onload() {
    // Initialize plugin
  }

  async onunload() {
    // Cleanup
  }
}

// Accessibility-first UI
function createModal(title: string): HTMLElement {
  const modal = document.createElement('div');
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-label', title);
  modal.setAttribute('tabindex', '-1');
  return modal;
}

// Input sanitization
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
```

### Testing Priorities
1. **Accessibility** - Keyboard navigation, screen reader announcements
2. **Security** - Input validation, XSS prevention
3. **Core features** - Contradiction detection, mood scoring, clustering
4. **Edge cases** - Empty inputs, malformed data, network failures
5. **Localization** - All UI strings use translation keys

### Documentation Standards
- **Code comments** - Explain "why", not "what"
- **JSDoc** - Document public APIs
- **README.md** - User-facing instructions
- **CLAUDE.md** - Technical guidance for AI assistants (this file)

## Project-Specific Terminology

- **Fogbinder** - The plugin name (not "FogBinder" or "fog-binder")
- **FogTrail** - The network visualization feature
- **Epistemic opacity** - Uncertainty or ambiguity in knowledge
- **Mood scoring** - Emotional tone annotation
- **Mystery clustering** - Grouping speculative/ambiguous content
- **Contradiction detection** - Identifying conflicting ideas across sources

## Current File Status

### Empty/Stub Files
- `src/main.ts` - Contains only newlines, needs implementation

### Complete Files
- `README.md` - User-facing documentation
- `LICENSE` - Full AGPLv3 text
- `LICENSE TLDR.md` - Plain-language summary
- `manifest.json` - Plugin metadata
- `assets/styles.css` - Basic accessibility CSS
- `localization/en-US.json` - English translations

### Missing Files (Should Be Created)
- `package.json` - Node.js dependencies and scripts
- `tsconfig.json` - TypeScript compiler configuration
- `webpack.config.js` / `rollup.config.js` / `esbuild.config.js` - Build configuration
- `.eslintrc.json` - Linting rules
- `.prettierrc` - Code formatting rules
- `src/types.ts` - TypeScript type definitions
- `src/__tests__/` - Test files

## Development Workflow

### Initial Setup (To Be Implemented)
```bash
# Install dependencies
npm install

# Build plugin
npm run build

# Watch for changes
npm run dev

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Deployment (Zotero Plugin)
1. Build production bundle
2. Create `.xpi` file (Zotero plugin package)
3. Test in local Zotero instance
4. Publish to Zotero plugin registry (when ready)

## Questions to Clarify

When implementing features, consider asking:
1. What Zotero API version should we target?
2. Should mood scoring use predefined categories or continuous scales?
3. What NLP library for contradiction detection? (spaCy, NLTK, transformers)
4. Visualization library preference? (D3.js, Cytoscape.js, Vis.js)
5. Should FogTrail be interactive or static?
6. Offline-first or require network for advanced features?

## Resources

### Zotero Development
- [Zotero Plugin Development](https://www.zotero.org/support/dev/client_coding/plugin_development)
- [Zotero JavaScript API](https://www.zotero.org/support/dev/client_coding/javascript_api)

### Accessibility
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### AGPLv3 License
- [Full License Text](https://www.gnu.org/licenses/agpl-3.0.en.html)
- [AGPLv3 FAQ](https://www.gnu.org/licenses/gpl-faq.html)

---

**Last Updated:** 2025-11-21
**Project Status:** Early Development
**License:** GNU AGPLv3
**Author:** Jonathan
