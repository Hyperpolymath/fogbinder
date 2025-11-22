/**
 * EpistemicState.test.ts
 * Tests for epistemic state modeling
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";

// Import compiled ReScript module
import * as EpistemicState from './EpistemicState.bs.js';

Deno.test("EpistemicState - create known state", () => {
  const context = {
    domain: "Mathematics",
    conventions: ["formal proof"],
    participants: ["mathematicians"],
    purpose: "Proving theorems",
  };

  const state = EpistemicState.make(
    { TAG: "Known" },
    context,
    ["2 + 2 = 4"],
    undefined,
  );

  assertExists(state);
  assertEquals(state.context.domain, "Mathematics");
});

Deno.test("EpistemicState - detect ambiguity", () => {
  const context = {
    domain: "Philosophy",
    conventions: ["ordinary language"],
    participants: ["philosophers"],
    purpose: "Conceptual analysis",
  };

  const ambiguous = EpistemicState.make(
    { TAG: "Ambiguous", _0: ["interpretation1", "interpretation2"] },
    context,
    ["The meaning of 'bank'"],
    undefined,
  );

  const isAmbiguous = EpistemicState.isGenuinelyAmbiguous(ambiguous);
  assertEquals(isAmbiguous, true);
});

Deno.test("EpistemicState - merge states", () => {
  const context = {
    domain: "Linguistics",
    conventions: ["descriptivist"],
    participants: ["linguists"],
    purpose: "Language analysis",
  };

  const state1 = EpistemicState.make(
    { TAG: "Known" },
    context,
    ["evidence1"],
    undefined,
  );

  const state2 = EpistemicState.make(
    { TAG: "Vague" },
    context,
    ["evidence2"],
    undefined,
  );

  const merged = EpistemicState.merge(state1, state2);

  assertExists(merged);
  // Merged state should combine evidence
  assertEquals(merged.evidence.length >= 2, true);
});

Deno.test("EpistemicState - mysterious state", () => {
  const context = {
    domain: "Metaphysics",
    conventions: ["speculative"],
    participants: ["philosophers"],
    purpose: "Ontological investigation",
  };

  const mysterious = EpistemicState.make(
    { TAG: "Mysterious" },
    context,
    ["What is consciousness?"],
    undefined,
  );

  const isAmbiguous = EpistemicState.isGenuinelyAmbiguous(mysterious);
  assertEquals(isAmbiguous, true);
});
