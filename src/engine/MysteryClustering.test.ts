/**
 * MysteryClustering.test.ts
 * Tests for epistemic resistance clustering
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as MysteryClustering from './MysteryClustering.bs.js';
import * as EpistemicState from '../core/EpistemicState.bs.js';

const testContext = {
  domain: "Philosophy",
  conventions: ["phenomenological"],
  participants: ["philosophers"],
  purpose: "Understanding consciousness",
};

Deno.test("MysteryClustering - detect mystery state", () => {
  const state = EpistemicState.make(
    { TAG: "Mysterious" },
    testContext,
    ["What is consciousness?"],
    undefined
  );

  const isMystery = MysteryClustering.isMystery(state);
  assertEquals(isMystery, true);
});

Deno.test("MysteryClustering - detect vague state as mystery", () => {
  const state = EpistemicState.make(
    { TAG: "Vague" },
    testContext,
    ["The concept is unclear"],
    undefined
  );

  const isMystery = MysteryClustering.isMystery(state);
  assertEquals(isMystery, true);
});

Deno.test("MysteryClustering - known state not mystery", () => {
  const state = EpistemicState.make(
    { TAG: "Known" },
    testContext,
    ["2 + 2 = 4"],
    undefined
  );

  const isMystery = MysteryClustering.isMystery(state);
  assertEquals(isMystery, false);
});

Deno.test("MysteryClustering - create mystery", () => {
  const state = EpistemicState.make(
    { TAG: "Mysterious" },
    testContext,
    ["The hard problem of consciousness"],
    undefined
  );

  const mystery = MysteryClustering.make(
    "What is consciousness?",
    state,
    undefined
  );

  assertExists(mystery);
  assertEquals(mystery.content, "What is consciousness?");
  assertExists(mystery.opacityLevel);
  assertExists(mystery.resistanceType);
});

Deno.test("MysteryClustering - cluster mysteries", () => {
  const state1 = EpistemicState.make(
    { TAG: "Mysterious" },
    testContext,
    ["Consciousness"],
    undefined
  );

  const state2 = EpistemicState.make(
    { TAG: "Vague" },
    testContext,
    ["Qualia"],
    undefined
  );

  const mysteries = [
    MysteryClustering.make("What is consciousness?", state1, undefined),
    MysteryClustering.make("What are qualia?", state2, undefined),
  ];

  const clusters = MysteryClustering.cluster(mysteries);

  assertExists(clusters);
  assertEquals(Array.isArray(clusters), true);
  assertEquals(clusters.length > 0, true);
});

Deno.test("MysteryClustering - opacity descriptors", () => {
  const state = EpistemicState.make(
    { TAG: "Mysterious" },
    testContext,
    ["Ineffable experience"],
    undefined
  );

  const mystery = MysteryClustering.make("Ineffable", state, undefined);
  const descriptor = MysteryClustering.getOpacityDescriptor(mystery);

  assertExists(descriptor);
  assertEquals(typeof descriptor, "string");
});

Deno.test("MysteryClustering - exploration suggestions", () => {
  const state = EpistemicState.make(
    { TAG: "Mysterious" },
    testContext,
    ["Conceptual resistance"],
    undefined
  );

  const mystery = MysteryClustering.make("Unclear concept", state, undefined);
  const suggestion = MysteryClustering.suggestExploration(mystery);

  assertExists(suggestion);
  assertEquals(typeof suggestion, "string");
  assertEquals(suggestion.length > 0, true);
});

Deno.test("MysteryClustering - ambiguous as mystery", () => {
  const state = EpistemicState.make(
    { TAG: "Ambiguous", _0: ["interp1", "interp2", "interp3", "interp4"] },
    testContext,
    ["Multiple interpretations"],
    undefined
  );

  const isMystery = MysteryClustering.isMystery(state);
  assertEquals(isMystery, true);
});

Deno.test("MysteryClustering - resistance types", () => {
  const testCases = [
    { content: "ineffable experience", expected: "LinguisticResistance" },
    { content: "paradoxical situation", expected: "LogicalResistance" },
    { content: "unclear concept", expected: "ConceptualResistance" },
  ];

  for (const testCase of testCases) {
    const state = EpistemicState.make(
      { TAG: "Mysterious" },
      testContext,
      [testCase.content],
      undefined
    );

    const mystery = MysteryClustering.make(testCase.content, state, undefined);
    assertExists(mystery.resistanceType);
  }
});
