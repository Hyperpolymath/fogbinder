# Contributing to Fogbinder

Thank you for your interest in contributing to Fogbinder! This document provides guidelines for contributing to the project.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [TPCF Contribution Model](#tpcf-contribution-model)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Requirements](#testing-requirements)
- [Documentation](#documentation)
- [Submitting Changes](#submitting-changes)
- [Review Process](#review-process)
- [Communication](#communication)

## Code of Conduct

All contributors must adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive environment for everyone.

**TL;DR:** Be kind, be professional, be respectful.

## Getting Started

### Prerequisites

- **Deno** >= 1.40 ([Install Deno](https://deno.land/))
- **Node.js** >= 18 (for ReScript compiler) ([Install Node](https://nodejs.org/))
- **Git** ([Install Git](https://git-scm.com/))
- **ReScript** knowledge helpful but not required

### First-Time Setup

```bash
# 1. Fork the repository on GitHub
# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/fogbinder.git
cd fogbinder

# 3. Install dependencies
npm install

# 4. Build the project
npm run build

# 5. Run tests
deno task test

# 6. Verify compliance
deno run --allow-read scripts/verify_rsr.ts
```

### Finding Issues to Work On

Good first issues are tagged with:
- `good first issue` - Great for newcomers
- `help wanted` - Maintainers need help
- `documentation` - Writing and improving docs
- `bug` - Something isn't working

**Before starting:** Comment on the issue to let us know you're working on it.

## TPCF Contribution Model

Fogbinder uses the **Tri-Perimeter Contribution Framework (TPCF)** - see [TPCF.md](TPCF.md) for details.

### Perimeter 3: Community Sandbox (Default)

**Most contributors operate here:**

✅ **Can do:**
- Fork repository
- Submit pull requests
- Report issues
- Participate in discussions
- Propose new features

❌ **Cannot do:**
- Direct commits to `main` branch
- Merge pull requests
- Create releases
- Modify core architecture without approval

### Perimeter 2: Extended Team (By Invitation)

**Trusted contributors with elevated access:**

✅ **Additional privileges:**
- Triage issues
- Review pull requests
- Merge approved PRs
- Participate in roadmap discussions

**How to join:** Consistent, high-quality contributions over 3+ months.

### Perimeter 1: Core Team (Maintainers)

See [MAINTAINERS.md](MAINTAINERS.md) for current core team members.

## Development Workflow

### Branch Strategy

We use **GitHub Flow**:

```bash
# 1. Create feature branch from main
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 2. Make changes
# ... code ...

# 3. Commit frequently
git add .
git commit -m "Add feature X"

# 4. Push to your fork
git push origin feature/your-feature-name

# 5. Open pull request on GitHub
```

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation
- `refactor/description` - Code refactoring
- `test/description` - Test additions

### Commit Messages

Follow **Conventional Commits**:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting (no code change)
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Build/tooling changes

**Examples:**

```
feat(contradiction): Add language game conflict detection

Implements Wittgensteinian contradiction detection that identifies
language game conflicts rather than logical contradictions.

Closes #42
```

```
fix(mood): Correct felicity condition checking

Austin's felicity conditions were incorrectly evaluated in edge cases.
This fixes the logic to properly handle infelicitous speech acts.
```

## Coding Standards

### ReScript

```rescript
// 1. Use descriptive names
let analyzeEpistemicState = (state: t) => { /* ... */ }

// 2. Document complex logic
/**
 * Detects contradictions as language game conflicts.
 * NOTE: This is NOT logical contradiction!
 */
let detectContradiction = (act1, act2) => { /* ... */ }

// 3. Prefer pattern matching over if/else
let classify = state =>
  switch state.certainty {
  | Known => "Clear"
  | Mysterious => "Opaque"
  | _ => "Ambiguous"
  }

// 4. No Obj.magic (unsafe casts)
// If you need it, your types are wrong

// 5. Avoid imperative code
// Prefer map/filter/reduce over for loops
```

### TypeScript

```typescript
// 1. Use strict mode (already enabled)
// 2. No 'any' types
// 3. Prefer interfaces over types
// 4. Document public APIs

/**
 * Analyzes array of source texts
 * @param sources - Citation texts
 * @param context - Language game context
 * @returns Analysis result
 */
export function analyze(
  sources: string[],
  context: LanguageGame
): AnalysisResult {
  // ...
}
```

### General

- **100 characters max line length**
- **2 spaces for indentation** (ReScript, TypeScript)
- **No trailing whitespace**
- **Newline at end of file**

**Formatting:**

```bash
# Auto-format code
deno fmt
npx rescript format
```

## Testing Requirements

### All contributions must include tests

**Minimum requirements:**
- Unit tests for new functions
- Integration tests for new features
- Existing tests must pass

### Running Tests

```bash
# All tests
deno task test

# Specific test
deno test src/core/EpistemicState.test.ts

# Watch mode
deno test --watch

# Coverage (planned)
deno task coverage
```

### Writing Tests

```typescript
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as MyModule from './MyModule.bs.js';

Deno.test("MyModule - descriptive test name", () => {
  const result = MyModule.someFunction("input");
  assertEquals(result, "expected");
});
```

### Test Coverage Goals

- **New features:** 80%+ coverage
- **Bug fixes:** Add regression test
- **Refactoring:** Maintain existing coverage

## Documentation

### Code Documentation

**ReScript:**
```rescript
/**
 * Analyzes epistemic state for genuine ambiguity.
 *
 * Returns true if state represents uncertainty that cannot
 * be reduced to lack of information (Wittgenstein's sense).
 */
let isGenuinelyAmbiguous: t => bool
```

**TypeScript:**
```typescript
/**
 * Analyzes source texts for epistemic patterns
 * @param sources - Array of citation texts
 * @param context - Language game context
 * @returns Complete analysis result
 * @example
 * const result = analyze(["source 1"], { domain: "Phil" });
 */
```

### User Documentation

Update when adding user-facing features:
- `README.md` - Usage examples
- `API.md` - API reference
- `PHILOSOPHY.md` - Philosophical rationale (if applicable)
- `examples/` - Working examples

## Submitting Changes

### Before Submitting

✅ **Checklist:**
- [ ] Code follows style guide
- [ ] Tests added and passing
- [ ] Documentation updated
- [ ] Commits follow conventional format
- [ ] No merge conflicts with `main`
- [ ] CI checks passing (once pushed)

### Pull Request Process

1. **Create PR** on GitHub
2. **Fill out PR template** (see `.github/PULL_REQUEST_TEMPLATE.md`)
3. **Link related issues** ("Closes #42")
4. **Request review** from maintainers
5. **Address feedback**
6. **Wait for approval** (2 approvals required)
7. **Merge** (maintainers will merge)

### PR Title Format

```
<type>(<scope>): <description>
```

**Example:**
```
feat(mood): Add speech act analysis for Zotero notes
```

## Review Process

### What We Look For

✅ **Code Quality:**
- Follows style guide
- Well-structured and readable
- Appropriate abstractions
- No unnecessary complexity

✅ **Philosophical Alignment:**
- Respects late Wittgenstein / Austin foundations
- Types encode correct commitments
- No over-formalization

✅ **Testing:**
- Adequate test coverage
- Tests are meaningful
- Edge cases handled

✅ **Documentation:**
- Code is documented
- User docs updated if needed
- CHANGELOG.md updated

### Review Timeline

- **Initial review:** Within 3 business days
- **Subsequent reviews:** Within 2 business days
- **Merge:** After 2 approvals + CI passing

### Addressing Feedback

- **Be responsive** to review comments
- **Ask questions** if feedback is unclear
- **Don't take it personally** - we're all learning
- **Update PR** based on feedback
- **Request re-review** when ready

## Communication

### GitHub

- **Issues:** Bug reports, feature requests
- **Discussions:** General questions, ideas
- **Pull Requests:** Code contributions

### Response Times

- **Critical bugs:** 24 hours
- **Issues:** 3 business days
- **PRs:** 3 business days
- **Discussions:** Best effort

### Getting Help

**Stuck?** Ask for help!

1. Check [DEVELOPMENT.md](DEVELOPMENT.md)
2. Search existing issues/discussions
3. Ask in PR comments
4. Open a discussion thread

## Recognition

### Contributors

All contributors are listed in:
- `CONTRIBUTORS.md` (auto-generated)
- `.well-known/humans.txt`
- GitHub contributors page

### Significant Contributions

We recognize significant contributions with:
- Mention in release notes
- Featured in CHANGELOG.md
- Invitation to Perimeter 2 (Extended Team)

## License

By contributing, you agree that your contributions will be licensed under the **GNU AGPLv3** license. See [LICENSE](LICENSE) for details.

**Important:**
- Your contributions must be your original work
- You must have rights to contribute the code
- No proprietary/copyrighted code

## Questions?

- **General:** Open a GitHub Discussion
- **Security:** See [SECURITY.md](SECURITY.md)
- **Philosophical:** See [PHILOSOPHY.md](PHILOSOPHY.md)
- **Development:** See [DEVELOPMENT.md](DEVELOPMENT.md)

---

**Thank you for contributing to Fogbinder!** 🌫️

Every contribution, no matter how small, helps advance the project's mission of navigating epistemic ambiguity in research.

---

**Last Updated:** 2025-11-22
**Version:** 0.1.0
**License:** GNU AGPLv3
