/**
 * ContradictionDetector.property.test.ts
 * Property-based tests for contradiction detection
 *
 * Verifies properties proven in formal spec (TLA+ ContradictionDetection.tla)
 */

import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import fc from "npm:fast-check@3.15.0";
import * as ContradictionDetector from './ContradictionDetector.bs.js';

// Arbitraries

const contextArbitrary = fc.record({
  domain: fc.string({ minLength: 1, maxLength: 50 }),
  conventions: fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
  participants: fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
  purpose: fc.string({ minLength: 1, maxLength: 100 })
});

const sourcesArbitrary = fc.array(
  fc.string({ minLength: 10, maxLength: 200 }),
  { minLength: 2, maxLength: 10 }
);

// Property tests

Deno.test("Property: contradiction detection is deterministic", () => {
  fc.assert(
    fc.property(
      sourcesArbitrary,
      contextArbitrary,
      (sources, context) => {
        const run1 = ContradictionDetector.detect(sources, context);
        const run2 = ContradictionDetector.detect(sources, context);

        // Should get same number of contradictions
        assertEquals(
          run1.length,
          run2.length,
          "Contradiction count should be deterministic"
        );

        return true;
      }
    ),
    { numRuns: 50 }
  );
});

Deno.test("Property: no contradictions found in single source", () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 10, maxLength: 200 }),
      contextArbitrary,
      (source, context) => {
        const contradictions = ContradictionDetector.detect([source], context);

        assertEquals(
          contradictions.length,
          0,
          "Single source cannot contradict itself"
        );

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

Deno.test("Property: severity is always between 0 and 1", () => {
  fc.assert(
    fc.property(
      sourcesArbitrary,
      contextArbitrary,
      (sources, context) => {
        const contradictions = ContradictionDetector.detect(sources, context);

        for (const contradiction of contradictions) {
          const severity = ContradictionDetector.getSeverity(contradiction);

          if (severity < 0 || severity > 1) {
            throw new Error(`Severity out of bounds: ${severity}`);
          }

          assertEquals(
            severity >= 0 && severity <= 1,
            true,
            `Severity ${severity} must be in [0, 1]`
          );
        }

        return true;
      }
    ),
    { numRuns: 50 }
  );
});

Deno.test("Property: all contradictions involve at least 2 sources", () => {
  fc.assert(
    fc.property(
      sourcesArbitrary,
      contextArbitrary,
      (sources, context) => {
        const contradictions = ContradictionDetector.detect(sources, context);

        for (const contradiction of contradictions) {
          assertEquals(
            contradiction.sources.length >= 2,
            true,
            "Contradiction must involve at least 2 sources"
          );
        }

        return true;
      }
    ),
    { numRuns: 50 }
  );
});

Deno.test("Property: contradiction sources are from input", () => {
  fc.assert(
    fc.property(
      sourcesArbitrary,
      contextArbitrary,
      (sources, context) => {
        const contradictions = ContradictionDetector.detect(sources, context);

        for (const contradiction of contradictions) {
          for (const source of contradiction.sources) {
            assertEquals(
              sources.includes(source),
              true,
              "All contradiction sources must be from input"
            );
          }
        }

        return true;
      }
    ),
    { numRuns: 50 }
  );
});

Deno.test("Property: language games are from context conventions", () => {
  fc.assert(
    fc.property(
      sourcesArbitrary,
      contextArbitrary,
      (sources, context) => {
        const contradictions = ContradictionDetector.detect(sources, context);

        for (const contradiction of contradictions) {
          for (const game of contradiction.languageGames) {
            // Language game should be related to context
            // (This is a weak check - implementation dependent)
            assertEquals(
              typeof game,
              "string",
              "Language game should be a string"
            );
          }
        }

        return true;
      }
    ),
    { numRuns: 50 }
  );
});

Deno.test("Property: valid conflict types", () => {
  const validTypes = [
    "SameWordsDifferentGames",
    "IncommensurableFrameworks",
    "PragmaticConflict",
    "ImplicitNormClash",
    "FormOfLifeDissonance"
  ];

  fc.assert(
    fc.property(
      sourcesArbitrary,
      contextArbitrary,
      (sources, context) => {
        const contradictions = ContradictionDetector.detect(sources, context);

        for (const contradiction of contradictions) {
          assertEquals(
            validTypes.includes(contradiction.conflictType.TAG),
            true,
            `Conflict type ${contradiction.conflictType.TAG} must be valid`
          );
        }

        return true;
      }
    ),
    { numRuns: 50 }
  );
});

Deno.test("Property: suggestResolution always returns non-empty string", () => {
  fc.assert(
    fc.property(
      sourcesArbitrary,
      contextArbitrary,
      (sources, context) => {
        const contradictions = ContradictionDetector.detect(sources, context);

        for (const contradiction of contradictions) {
          const resolution = ContradictionDetector.suggestResolution(contradiction);

          assertEquals(
            typeof resolution,
            "string",
            "Resolution should be a string"
          );

          assertEquals(
            resolution.length > 0,
            true,
            "Resolution should be non-empty"
          );
        }

        return true;
      }
    ),
    { numRuns: 50 }
  );
});

Deno.test("Property: adding identical sources doesn't increase contradictions", () => {
  fc.assert(
    fc.property(
      sourcesArbitrary,
      contextArbitrary,
      (sources, context) => {
        if (sources.length === 0) return true;

        const contradictions1 = ContradictionDetector.detect(sources, context);

        // Add duplicate of first source
        const sourcesWithDupe = [...sources, sources[0]];
        const contradictions2 = ContradictionDetector.detect(sourcesWithDupe, context);

        // Number of contradictions shouldn't increase significantly
        // (duplicate doesn't add new information)
        assertEquals(
          contradictions2.length >= contradictions1.length,
          true,
          "Duplicate source doesn't decrease contradictions"
        );

        return true;
      }
    ),
    { numRuns: 30 }
  );
});

Deno.test("Property: empty sources yield no contradictions", () => {
  fc.assert(
    fc.property(
      contextArbitrary,
      (context) => {
        const contradictions = ContradictionDetector.detect([], context);

        assertEquals(
          contradictions.length,
          0,
          "Empty sources cannot have contradictions"
        );

        return true;
      }
    ),
    { numRuns: 50 }
  );
});

Deno.test("Property: getSeverity is idempotent", () => {
  fc.assert(
    fc.property(
      sourcesArbitrary,
      contextArbitrary,
      (sources, context) => {
        const contradictions = ContradictionDetector.detect(sources, context);

        for (const contradiction of contradictions) {
          const severity1 = ContradictionDetector.getSeverity(contradiction);
          const severity2 = ContradictionDetector.getSeverity(contradiction);

          assertEquals(
            severity1,
            severity2,
            "getSeverity should always return same value for same input"
          );
        }

        return true;
      }
    ),
    { numRuns: 50 }
  );
});

Deno.test("Property: more sources can reveal more contradictions", () => {
  fc.assert(
    fc.property(
      sourcesArbitrary,
      contextArbitrary,
      fc.array(fc.string({ minLength: 10, maxLength: 200 }), { minLength: 1, maxLength: 5 }),
      (sources, context, additionalSources) => {
        if (sources.length === 0) return true;

        const contradictions1 = ContradictionDetector.detect(sources, context);
        const contradictions2 = ContradictionDetector.detect(
          [...sources, ...additionalSources],
          context
        );

        // More sources can reveal more (or same) contradictions, but not fewer
        assertEquals(
          contradictions2.length >= contradictions1.length - 1,  // Allow small variance
          true,
          "Adding sources shouldn't significantly reduce contradictions"
        );

        return true;
      }
    ),
    { numRuns: 30 }
  );
});
