# Justfile for Fogbinder
# Modern Make alternative - https://github.com/casey/just

# Default recipe (runs when you just type `just`)
default:
    @just --list

# ============================================================================
# Development
# ============================================================================

# Install all dependencies
install:
    @echo "📦 Installing dependencies..."
    npm install
    @echo "✅ Dependencies installed"

# Clean build artifacts
clean:
    @echo "🧹 Cleaning build artifacts..."
    rm -rf dist/
    rm -rf lib/
    rm -rf src/**/*.bs.js
    rm -rf node_modules/.cache/
    @echo "✅ Clean complete"

# Full clean including dependencies
clean-all: clean
    @echo "🧹 Removing node_modules..."
    rm -rf node_modules/
    @echo "✅ Full clean complete"

# ============================================================================
# Building
# ============================================================================

# Compile ReScript to JavaScript
compile-rescript:
    @echo "🔨 Compiling ReScript..."
    npm run res:build
    @echo "✅ ReScript compilation complete"

# Bundle with Deno
bundle: compile-rescript
    @echo "📦 Bundling with Deno..."
    deno task build
    @echo "✅ Bundle complete"

# Full build (compile + bundle)
build: compile-rescript bundle
    @echo "✅ Build complete"

# Watch mode for development
dev:
    @echo "👀 Starting watch mode..."
    npm run res:dev &
    deno task dev

# ============================================================================
# Testing
# ============================================================================

# Run all tests
test:
    @echo "🧪 Running tests..."
    deno task test

# Run tests in watch mode
test-watch:
    @echo "👀 Running tests in watch mode..."
    deno test --watch

# Run specific test file
test-file FILE:
    @echo "🧪 Running test: {{FILE}}"
    deno test {{FILE}}

# Run tests with coverage (future)
test-coverage:
    @echo "📊 Running tests with coverage..."
    @echo "⚠️  Coverage not yet implemented"
    # deno test --coverage=coverage/

# ============================================================================
# Code Quality
# ============================================================================

# Format code (Deno + ReScript)
fmt:
    @echo "✨ Formatting code..."
    deno fmt
    npx rescript format
    @echo "✅ Formatting complete"

# Check formatting without modifying files
fmt-check:
    @echo "🔍 Checking formatting..."
    deno fmt --check
    npx rescript format -check
    @echo "✅ Format check complete"

# Lint code
lint:
    @echo "🔍 Linting code..."
    deno lint
    @echo "✅ Lint complete"

# Run all quality checks
check: fmt-check lint test
    @echo "✅ All quality checks passed"

# ============================================================================
# RSR Compliance
# ============================================================================

# Verify RSR compliance
verify-rsr:
    @echo "🔍 Verifying RSR compliance..."
    deno run --allow-read scripts/verify_rsr.ts

# Run all compliance checks
compliance: verify-rsr check
    @echo "✅ Compliance verification complete"

# ============================================================================
# Documentation
# ============================================================================

# Serve documentation locally (future - mdbook)
docs-serve:
    @echo "📚 Serving documentation..."
    @echo "⚠️  Documentation server not yet implemented"
    # mdbook serve

# Build documentation (future)
docs-build:
    @echo "📚 Building documentation..."
    @echo "⚠️  Documentation build not yet implemented"
    # mdbook build

# Open API documentation
docs-api:
    @echo "📖 Opening API documentation..."
    @cat API.md

# ============================================================================
# Examples
# ============================================================================

# Run basic usage example
example-basic:
    @echo "🎯 Running basic usage example..."
    deno run --allow-all examples/basic_usage.ts

# Run all examples
examples:
    @echo "🎯 Running all examples..."
    @for file in examples/*.ts; do \
        echo "Running $$file..."; \
        deno run --allow-all "$$file"; \
    done

# ============================================================================
# Release
# ============================================================================

# Prepare release (check everything before tagging)
release-check: clean build test compliance
    @echo "🔍 Checking release readiness..."
    @echo "Verifying CHANGELOG.md updated..."
    @git diff HEAD -- CHANGELOG.md | grep -q "^+" || (echo "❌ CHANGELOG.md not updated" && exit 1)
    @echo "✅ Release checks passed"

# Create git tag for release
release-tag VERSION:
    @echo "🏷️  Creating release tag v{{VERSION}}..."
    git tag -a "v{{VERSION}}" -m "Release v{{VERSION}}"
    git push origin "v{{VERSION}}"
    @echo "✅ Tag v{{VERSION}} created and pushed"

# Publish to npm (future)
publish:
    @echo "📤 Publishing to npm..."
    @echo "⚠️  Publishing not yet implemented"
    # npm publish

# ============================================================================
# CI/CD Simulation
# ============================================================================

# Simulate CI pipeline locally
ci: clean install build test lint verify-rsr
    @echo "✅ CI simulation complete"

# Full CI/CD simulation including security checks
ci-full: ci
    @echo "🔒 Running security checks..."
    npm audit --audit-level=moderate || true
    @echo "✅ Full CI simulation complete"

# ============================================================================
# Utilities
# ============================================================================

# Count lines of code
loc:
    @echo "📊 Lines of code:"
    @echo "ReScript:"
    @find src -name "*.res" -exec wc -l {} + | tail -1
    @echo "TypeScript:"
    @find src -name "*.ts" -not -name "*.test.ts" -exec wc -l {} + | tail -1
    @echo "Tests:"
    @find src -name "*.test.ts" -exec wc -l {} + | tail -1
    @echo "Total (src):"
    @find src -name "*.res" -o -name "*.ts" | xargs wc -l | tail -1

# Show dependency tree
deps:
    @echo "📦 Dependency tree:"
    npm list --depth=1

# Check for outdated dependencies
deps-outdated:
    @echo "📦 Checking for outdated dependencies..."
    npm outdated

# Update dependencies
deps-update:
    @echo "📦 Updating dependencies..."
    npm update
    @echo "✅ Dependencies updated"

# ============================================================================
# Git Helpers
# ============================================================================

# Show git status
status:
    @git status

# Show recent commits
log:
    @git log --oneline -10

# Create feature branch
branch NAME:
    @echo "🌿 Creating branch: feature/{{NAME}}"
    git checkout -b "feature/{{NAME}}"

# Commit with conventional commit message
commit TYPE SCOPE MESSAGE:
    @echo "💾 Committing: {{TYPE}}({{SCOPE}}): {{MESSAGE}}"
    git add -A
    git commit -m "{{TYPE}}({{SCOPE}}): {{MESSAGE}}"

# ============================================================================
# Development Tools
# ============================================================================

# Start REPL (Deno)
repl:
    @echo "🔧 Starting Deno REPL..."
    deno repl

# Type check TypeScript
typecheck:
    @echo "🔍 Type checking TypeScript..."
    deno check src/main.ts
    @echo "✅ Type check complete"

# Watch for file changes and rebuild
watch:
    @echo "👀 Watching for changes..."
    @while true; do \
        inotifywait -r -e modify,create,delete src/ && \
        just build; \
    done

# ============================================================================
# Security
# ============================================================================

# Audit dependencies for vulnerabilities
audit:
    @echo "🔒 Auditing dependencies..."
    npm audit
    @echo "✅ Audit complete"

# Fix vulnerabilities automatically
audit-fix:
    @echo "🔧 Fixing vulnerabilities..."
    npm audit fix
    @echo "✅ Vulnerabilities fixed"

# Check for hardcoded secrets
secrets-check:
    @echo "🔍 Checking for secrets..."
    @echo "⚠️  Secret scanning requires trufflehog"
    # trufflehog filesystem . --only-verified

# ============================================================================
# Benchmarking (future)
# ============================================================================

# Run benchmarks
bench:
    @echo "⚡ Running benchmarks..."
    @echo "⚠️  Benchmarks not yet implemented"
    # deno bench

# ============================================================================
# Accessibility
# ============================================================================

# Check accessibility compliance
a11y:
    @echo "♿ Checking accessibility..."
    @grep -r "outline: none" assets/ && (echo "❌ Found outline:none" && exit 1) || echo "✅ No outline:none found"
    @grep -r "focus.*outline.*0" assets/ && (echo "❌ Found focus outline disabled" && exit 1) || echo "✅ No focus outline disabled"
    @echo "✅ Accessibility check passed"

# ============================================================================
# Philosophy Checks (Fogbinder-specific)
# ============================================================================

# Verify philosophical integrity
philosophy:
    @echo "🧠 Checking philosophical integrity..."
    @grep -q "Wittgenstein" PHILOSOPHY.md || (echo "❌ Wittgenstein missing" && exit 1)
    @grep -q "Austin" PHILOSOPHY.md || (echo "❌ Austin missing" && exit 1)
    @grep -rq "language game" src/ || echo "⚠️  Warning: language game references sparse"
    @grep -rq "speech act" src/ || echo "⚠️  Warning: speech act references sparse"
    @echo "✅ Philosophical integrity verified"

# ============================================================================
# Help
# ============================================================================

# Show available commands with descriptions
help:
    @echo "Fogbinder - Just Commands"
    @echo "========================="
    @echo ""
    @just --list --unsorted
    @echo ""
    @echo "The fog is not an obstacle. It's the medium of inquiry. 🌫️"

# Show version information
version:
    @echo "Fogbinder v0.1.0"
    @echo "RSR Compliance: Silver"
    @echo "License: GNU AGPLv3"
    @echo ""
    @echo "Runtime versions:"
    @deno --version | head -1
    @node --version
    @npm --version
