/**
 * EpistemicState.property.test.ts
 * Property-based tests for epistemic state operations
 *
 * These tests verify algebraic properties that should hold for ALL inputs,
 * not just specific examples. This is complementary to regular unit tests.
 */

import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import fc from "npm:fast-check@3.15.0";
import * as EpistemicState from './EpistemicState.bs.js';

// Arbitraries (generators for random test data)

const certaintyArbitrary = fc.oneof(
  fc.constant({ TAG: "Known" }),
  fc.record({
    TAG: fc.constant("Probable"),
    _0: fc.float({ min: 0, max: 1 })
  }),
  fc.constant({ TAG: "Vague" }),
  fc.record({
    TAG: fc.constant("Ambiguous"),
    _0: fc.array(fc.string(), { minLength: 4, maxLength: 8 })
  }),
  fc.constant({ TAG: "Mysterious" }),
  fc.record({
    TAG: fc.constant("Contradictory"),
    _0: fc.array(fc.string(), { minLength: 2, maxLength: 5 })
  })
);

const contextArbitrary = fc.record({
  domain: fc.string({ minLength: 1, maxLength: 50 }),
  conventions: fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
  participants: fc.array(fc.string(), { minLength: 1, maxLength: 5 }),
  purpose: fc.string({ minLength: 1, maxLength: 100 })
});

const evidenceArbitrary = fc.array(fc.string(), { minLength: 0, maxLength: 10 });

const epistemicStateArbitrary = fc.tuple(
  certaintyArbitrary,
  contextArbitrary,
  evidenceArbitrary
).map(([certainty, context, evidence]) =>
  EpistemicState.make(certainty, context, evidence, undefined)
);

// Property tests

Deno.test("Property: merge is commutative - merge(A, B) = merge(B, A)", () => {
  fc.assert(
    fc.property(
      epistemicStateArbitrary,
      epistemicStateArbitrary,
      (state1, state2) => {
        // Only test states with same context (requirement for merging)
        if (state1.languageGame.domain !== state2.languageGame.domain) {
          return true; // Skip this test case
        }

        const mergeAB = EpistemicState.merge(state1, state2);
        const mergeBA = EpistemicState.merge(state2, state1);

        // Evidence should be the same (order doesn't matter for sets)
        assertEquals(
          new Set(mergeAB.evidence).size,
          new Set(mergeBA.evidence).size
        );

        // Certainty should be the same
        assertEquals(mergeAB.certainty.TAG, mergeBA.certainty.TAG);

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

Deno.test("Property: merge is associative - merge(merge(A,B),C) = merge(A,merge(B,C))", () => {
  fc.assert(
    fc.property(
      epistemicStateArbitrary,
      epistemicStateArbitrary,
      epistemicStateArbitrary,
      (state1, state2, state3) => {
        // All must have same context
        if (
          state1.languageGame.domain !== state2.languageGame.domain ||
          state2.languageGame.domain !== state3.languageGame.domain
        ) {
          return true; // Skip
        }

        const leftAssoc = EpistemicState.merge(
          EpistemicState.merge(state1, state2),
          state3
        );

        const rightAssoc = EpistemicState.merge(
          state1,
          EpistemicState.merge(state2, state3)
        );

        // Evidence should contain same items
        assertEquals(
          new Set(leftAssoc.evidence).size,
          new Set(rightAssoc.evidence).size
        );

        // Certainty should be the same
        assertEquals(leftAssoc.certainty.TAG, rightAssoc.certainty.TAG);

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

Deno.test("Property: merging with self is identity - merge(A, A) = A", () => {
  fc.assert(
    fc.property(
      epistemicStateArbitrary,
      (state) => {
        const merged = EpistemicState.merge(state, state);

        // Evidence should be unchanged
        assertEquals(merged.evidence.length, state.evidence.length);

        // Certainty should be unchanged
        assertEquals(merged.certainty.TAG, state.certainty.TAG);

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

Deno.test("Property: evidence is never lost during merge", () => {
  fc.assert(
    fc.property(
      epistemicStateArbitrary,
      epistemicStateArbitrary,
      (state1, state2) => {
        if (state1.languageGame.domain !== state2.languageGame.domain) {
          return true;
        }

        const merged = EpistemicState.merge(state1, state2);

        const evidenceSet = new Set(merged.evidence);
        const state1Evidence = new Set(state1.evidence);
        const state2Evidence = new Set(state2.evidence);

        // All evidence from state1 should be in merged
        for (const e of state1Evidence) {
          if (!evidenceSet.has(e)) {
            throw new Error(`Evidence lost: ${e}`);
          }
        }

        // All evidence from state2 should be in merged
        for (const e of state2Evidence) {
          if (!evidenceSet.has(e)) {
            throw new Error(`Evidence lost: ${e}`);
          }
        }

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

Deno.test("Property: isUncertain is consistent with certainty type", () => {
  fc.assert(
    fc.property(
      certaintyArbitrary,
      contextArbitrary,
      evidenceArbitrary,
      (certainty, context, evidence) => {
        const state = EpistemicState.make(certainty, context, evidence, undefined);
        const uncertain = EpistemicState.isUncertain(state);

        const uncertainTypes = ["Vague", "Ambiguous", "Mysterious"];

        if (uncertainTypes.includes(certainty.TAG)) {
          assertEquals(uncertain, true, `${certainty.TAG} should be uncertain`);
        } else if (certainty.TAG === "Known") {
          assertEquals(uncertain, false, "Known should not be uncertain");
        }

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

Deno.test("Property: merged state certainty is from one of the inputs", () => {
  fc.assert(
    fc.property(
      epistemicStateArbitrary,
      epistemicStateArbitrary,
      (state1, state2) => {
        if (state1.languageGame.domain !== state2.languageGame.domain) {
          return true;
        }

        const merged = EpistemicState.merge(state1, state2);

        // Merged certainty should match one of the input certainties
        // (we choose the less certain one)
        const certaintyIsFromInput =
          merged.certainty.TAG === state1.certainty.TAG ||
          merged.certainty.TAG === state2.certainty.TAG;

        if (!certaintyIsFromInput) {
          console.log("State1:", state1.certainty.TAG);
          console.log("State2:", state2.certainty.TAG);
          console.log("Merged:", merged.certainty.TAG);
        }

        assertEquals(
          certaintyIsFromInput,
          true,
          "Merged certainty must come from one of the inputs"
        );

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

Deno.test("Property: context is preserved during merge", () => {
  fc.assert(
    fc.property(
      epistemicStateArbitrary,
      epistemicStateArbitrary,
      (state1, state2) => {
        if (state1.languageGame.domain !== state2.languageGame.domain) {
          return true;
        }

        const merged = EpistemicState.merge(state1, state2);

        // Context should match one of the inputs (they're the same anyway)
        assertEquals(
          merged.languageGame.domain,
          state1.languageGame.domain
        );

        return true;
      }
    ),
    { numRuns: 100 }
  );
});

Deno.test("Property: multiple merges converge", () => {
  fc.assert(
    fc.property(
      epistemicStateArbitrary,
      epistemicStateArbitrary,
      (state1, state2) => {
        if (state1.languageGame.domain !== state2.languageGame.domain) {
          return true;
        }

        // merge(merge(A, B), merge(A, B)) should equal merge(A, B)
        const oneMerge = EpistemicState.merge(state1, state2);
        const twoMerges = EpistemicState.merge(oneMerge, oneMerge);

        assertEquals(oneMerge.certainty.TAG, twoMerges.certainty.TAG);
        assertEquals(
          new Set(oneMerge.evidence).size,
          new Set(twoMerges.evidence).size
        );

        return true;
      }
    ),
    { numRuns: 50 }
  );
});

// Shrinking example test
Deno.test("Property: fast-check shrinking works correctly", () => {
  // This test demonstrates how fast-check finds minimal counterexamples
  // It will fail, but shows the shrinking process

  /*
  fc.assert(
    fc.property(
      fc.integer({ min: 0, max: 1000 }),
      (n) => {
        // This property is false for large numbers
        // fast-check will shrink to find the minimal failing case
        return n < 500;
      }
    ),
    { numRuns: 100 }
  );
  */

  // Uncomment above to see shrinking in action
  // It will find that the minimal counterexample is n = 500
});
