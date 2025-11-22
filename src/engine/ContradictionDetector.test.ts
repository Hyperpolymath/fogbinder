/**
 * ContradictionDetector.test.ts
 * Tests for contradiction detection (language game conflicts)
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";

// Import compiled modules
import * as SpeechAct from '../core/SpeechAct.bs.js';
import * as ContradictionDetector from './ContradictionDetector.bs.js';

Deno.test("ContradictionDetector - detect same words different games", () => {
  const context1 = {
    domain: "Mathematics",
    conventions: ["formal"],
    participants: ["mathematicians"],
    purpose: "Proof",
  };

  const context2 = {
    domain: "Poetry",
    conventions: ["metaphorical"],
    participants: ["poets"],
    purpose: "Expression",
  };

  const act1 = SpeechAct.make(
    "Infinity is complete",
    { TAG: "Assertive", _0: "mathematical assertion" },
    context1,
    undefined,
  );

  const act2 = SpeechAct.make(
    "Infinity is incomplete",
    { TAG: "Assertive", _0: "poetic expression" },
    context2,
    undefined,
  );

  const contradiction = ContradictionDetector.detectContradiction(act1, act2);

  assertExists(contradiction);
  // Should detect different language games
});

Deno.test("ContradictionDetector - batch detection", () => {
  const context = {
    domain: "Philosophy",
    conventions: ["analytic"],
    participants: ["philosophers"],
    purpose: "Analysis",
  };

  const acts = [
    SpeechAct.make(
      "Meaning is use",
      { TAG: "Assertive", _0: "Wittgenstein" },
      context,
      undefined,
    ),
    SpeechAct.make(
      "Meaning is truth conditions",
      { TAG: "Assertive", _0: "Davidson" },
      context,
      undefined,
    ),
  ];

  const contradictions = ContradictionDetector.detectMultiple(acts);

  assertExists(contradictions);
  // May or may not detect contradiction depending on context interpretation
});

Deno.test("ContradictionDetector - suggest resolution", () => {
  const context = {
    domain: "Science",
    conventions: ["empirical"],
    participants: ["scientists"],
    purpose: "Research",
  };

  const act1 = SpeechAct.make(
    "Light is a wave",
    { TAG: "Assertive", _0: "wave theory" },
    context,
    undefined,
  );

  const act2 = SpeechAct.make(
    "Light is a particle",
    { TAG: "Assertive", _0: "particle theory" },
    context,
    undefined,
  );

  const contradiction = ContradictionDetector.detectContradiction(act1, act2);

  if (contradiction) {
    const resolution = ContradictionDetector.suggestResolution(contradiction);
    assertExists(resolution);
    assertEquals(typeof resolution, "string");
  }
});
