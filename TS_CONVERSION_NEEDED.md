# TypeScript/JavaScript → ReScript Conversion Status

**Last Updated:** 2025-12-17

## Current Status

| Type | Count | Status |
|------|-------|--------|
| ReScript files (`.res`) | 12 | Production-ready |
| JavaScript files (`.js`) | 2 | Requires migration |
| TypeScript files (`.ts`) | 0 | None |

## Remaining JavaScript Files

The following JavaScript files need to be converted to ReScript:

### 1. `src/main.js` (Entry Point)
- **Purpose:** Main entry point wrapper for ReScript-compiled modules
- **Priority:** Medium
- **Notes:** This file serves as a thin wrapper that exports ReScript functions for external consumers. Can remain as JS shim or be converted to pure ReScript entry point.

### 2. `src/zotero/zotero_api.js` (API Shim)
- **Purpose:** Mock Zotero API interface
- **Priority:** Low
- **Notes:** This is a temporary shim for development. Will be replaced by actual Zotero plugin bindings when integrating with Zotero.

## Completed Conversions (ReScript)

| File | Purpose |
|------|---------|
| `src/Fogbinder.res` | Main orchestrator |
| `src/core/EpistemicState.res` | Epistemic modalities |
| `src/core/EpistemicState.test.res` | Property-based tests |
| `src/core/SpeechAct.res` | J.L. Austin speech acts |
| `src/core/SpeechAct.test.res` | Property-based tests |
| `src/core/FamilyResemblance.res` | Wittgenstein clustering |
| `src/core/FamilyResemblance.test.res` | Property-based tests |
| `src/engine/ContradictionDetector.res` | Contradiction detection |
| `src/engine/MoodScorer.res` | Mood scoring |
| `src/engine/MysteryClustering.res` | Mystery clustering |
| `src/engine/FogTrailVisualizer.res` | FogTrail visualization |
| `src/zotero/ZoteroBindings.res` | Zotero bindings |

## Migration Steps

For each remaining JavaScript file:

1. Create ReScript equivalent (`Filename.res`)
2. Define proper types in ReScript
3. Migrate business logic
4. Update imports in dependent files
5. Test functionality
6. Delete original JS file

## Policy Enforcement

- **CI blocks new TS/JS files** via `ts-blocker.yml`
- **Existing TS/JS** should be migrated over time
- **Allowed exceptions:** `.res.js` (ReScript compiler output)
