# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- RSR (Rhodium Standard Repository) compliance framework
- Comprehensive documentation suite (SECURITY.md, CONTRIBUTING.md, CODE_OF_CONDUCT.md, MAINTAINERS.md)
- .well-known/ directory with security.txt, ai.txt, humans.txt
- TPCF (Tri-Perimeter Contribution Framework) documentation
- CI/CD pipeline (.github/workflows/ci.yml)
- RSR self-verification script

## [0.1.0] - 2025-11-22

### Added - Initial Release

#### Core Philosophical Framework
- **EpistemicState** module - 6 epistemic modalities (Known, Probable, Vague, Ambiguous, Mysterious, Contradictory)
- **SpeechAct** module - J.L. Austin's speech act theory with illocutionary forces and felicity conditions
- **FamilyResemblance** module - Wittgenstein's family resemblance clustering without strict definitions

#### Analysis Engines
- **ContradictionDetector** - Language game conflict detection (not logical contradictions)
- **MoodScorer** - Speech act-based mood analysis (not sentiment analysis)
- **MysteryClustering** - Epistemic resistance categorization (conceptual, evidential, logical, linguistic)
- **FogTrailVisualizer** - Network visualization of epistemic opacity with SVG/JSON export

#### Orchestration & Integration
- **Fogbinder** main orchestrator - Complete analysis pipeline
- **TypeScript API** (main.ts) - External API surface
- **ZoteroBindings** - ReScript bindings to Zotero API (mock data for v0.1)

#### Build System
- ReScript + Deno + TypeScript stack
- Build scripts for compilation and bundling
- WASM compilation placeholder for future optimization
- Test framework with Deno

#### Documentation
- **README.md** - User-facing project overview
- **PHILOSOPHY.md** - Comprehensive philosophical foundations (late Wittgenstein + J.L. Austin)
- **API.md** - Complete API reference
- **DEVELOPMENT.md** - Developer guide with architecture and best practices
- **CLAUDE.md** - AI assistant guide
- **SUMMARY.md** - Autonomous build report
- **LICENSE** (AGPLv3) and LICENSE TLDR.md

#### Examples & Tests
- 8 comprehensive usage examples (examples/basic_usage.ts)
- Unit tests for core modules (EpistemicState, ContradictionDetector)
- Integration tests (Fogbinder.test.ts)

#### Configuration
- deno.json - Deno configuration
- bsconfig.json - ReScript compiler configuration
- package.json - npm dependencies (ReScript only)
- .gitignore - Comprehensive ignore patterns

### Technical Details

**Languages:**
- ReScript (~1,100 lines) - Core implementation
- TypeScript (~400 lines) - API surface
- JavaScript (minimal) - Zotero API shim

**Dependencies:**
- Build-time: ReScript compiler only
- Runtime: Deno standard library only
- Zero npm runtime dependencies

**Philosophical Commitments:**
- Meaning is use (language games)
- No strict definitions (family resemblance)
- Speech acts do things (performatives)
- Ambiguity as feature (not bug)
- Context is constitutive (not optional)

### Security

- Type safety via ReScript + TypeScript
- Memory safety via managed languages
- Input sanitization throughout
- Offline-first (no network calls in core)
- Zero telemetry or tracking
- AGPLv3 license for transparency

### Known Limitations

- Mock Zotero API (needs real API integration)
- Simplified speech act detection (needs NLP)
- No WASM optimization yet
- Test coverage ~40% (needs expansion)

### Performance

- Small collections (<100 sources): <100ms
- Medium collections (100-1000): <1s
- Large collections: Not yet benchmarked

## Versioning Philosophy

Fogbinder follows **Semantic Versioning 2.0.0**:

- **MAJOR** (X.0.0): Breaking API changes, philosophical shifts
- **MINOR** (0.X.0): New features, backwards-compatible
- **PATCH** (0.0.X): Bug fixes, documentation

**Special cases:**
- **0.x.x:** Pre-1.0 versions (API may change)
- **1.0.0:** First stable release (API stability guaranteed)

## Future Roadmap

### v0.2.0 (Q1 2026)
- Real Zotero API integration
- NLP-powered speech act detection
- WASM optimization for hot paths
- 80%+ test coverage
- Interactive web UI

### v0.3.0 (Q2 2026)
- Graph database backend (Neo4j)
- Collaborative features
- Advanced CRDT support
- Browser extension

### v1.0.0 (Q3 2026)
- Production-ready Zotero plugin
- Formal verification (TLA+)
- Security audit
- Published to Zotero plugin registry

## Upgrade Guide

### From 0.1.0 to 0.2.0 (Future)

**Breaking changes:** TBD

**Deprecations:** TBD

**Migration:** TBD

## Contributors

See [CONTRIBUTORS.md](CONTRIBUTORS.md) for full contributor list.

**Special thanks to:**
- Claude (Anthropic) - Autonomous build system
- Ludwig Wittgenstein - Philosophical foundations
- J.L. Austin - Speech act theory
- Zotero Team - Citation management platform

## Links

- **Repository:** https://github.com/Hyperpolymath/fogbinder
- **Documentation:** See README.md, PHILOSOPHY.md, API.md
- **Issue Tracker:** https://github.com/Hyperpolymath/fogbinder/issues
- **Discussions:** https://github.com/Hyperpolymath/fogbinder/discussions
- **License:** GNU AGPLv3 (see LICENSE)

---

**Format:** [Keep a Changelog](https://keepachangelog.com/)
**Versioning:** [Semantic Versioning](https://semver.org/)
**Last Updated:** 2025-11-22
