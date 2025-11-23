/**
 * SpeechAct.test.ts
 * Tests for J.L. Austin's speech act theory implementation
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as SpeechAct from './SpeechAct.bs.js';

const testContext = {
  domain: "Testing",
  conventions: ["test"],
  participants: ["testers"],
  purpose: "Testing speech acts",
};

Deno.test("SpeechAct - create assertive", () => {
  const act = SpeechAct.make(
    "The sky is blue",
    { TAG: "Assertive", _0: "observation" },
    testContext,
    undefined
  );

  assertExists(act);
  assertEquals(act.utterance, "The sky is blue");
  assertEquals(act.mood.force.TAG, "Assertive");
});

Deno.test("SpeechAct - create commissive", () => {
  const act = SpeechAct.make(
    "I promise to help",
    { TAG: "Commissive", _0: "promise" },
    testContext,
    undefined
  );

  assertExists(act);
  assertEquals(act.mood.performative, true);
});

Deno.test("SpeechAct - create directive", () => {
  const act = SpeechAct.make(
    "Please submit your work",
    { TAG: "Directive", _0: "request" },
    testContext,
    undefined
  );

  assertExists(act);
  assertEquals(act.mood.force.TAG, "Directive");
});

Deno.test("SpeechAct - create expressive", () => {
  const act = SpeechAct.make(
    "Thank you",
    { TAG: "Expressive", _0: "gratitude" },
    testContext,
    undefined
  );

  assertExists(act);
  assertEquals(act.mood.force.TAG, "Expressive");
});

Deno.test("SpeechAct - create declaration", () => {
  const act = SpeechAct.make(
    "I declare this meeting open",
    { TAG: "Declaration", _0: "opening" },
    testContext,
    undefined
  );

  assertExists(act);
  assertEquals(act.mood.performative, true);
});

Deno.test("SpeechAct - is happy (felicitous)", () => {
  const act = SpeechAct.make(
    "Test",
    { TAG: "Assertive", _0: "test" },
    testContext,
    undefined
  );

  const isHappy = SpeechAct.isHappy(act);
  assertEquals(typeof isHappy, "boolean");
});

Deno.test("SpeechAct - get mood descriptor", () => {
  const act = SpeechAct.make(
    "This is an assertion",
    { TAG: "Assertive", _0: "claim" },
    testContext,
    undefined
  );

  const descriptor = SpeechAct.getMoodDescriptor(act);

  assertExists(descriptor);
  assertEquals(typeof descriptor, "string");
  assertEquals(descriptor.includes("Asserting"), true);
});

Deno.test("SpeechAct - get emotional tone from expressive", () => {
  const act = SpeechAct.make(
    "I apologize",
    { TAG: "Expressive", _0: "apology" },
    testContext,
    undefined
  );

  const tone = SpeechAct.getEmotionalTone(act);

  if (tone) {
    assertEquals(tone, "apology");
  }
});

Deno.test("SpeechAct - emotional tone none for assertive", () => {
  const act = SpeechAct.make(
    "The sky is blue",
    { TAG: "Assertive", _0: "fact" },
    testContext,
    undefined
  );

  const tone = SpeechAct.getEmotionalTone(act);
  assertEquals(tone, undefined);
});

Deno.test("SpeechAct - conflicts detection", () => {
  const act1 = SpeechAct.make(
    "Light is a wave",
    { TAG: "Assertive", _0: "wave theory" },
    testContext,
    undefined
  );

  const act2 = SpeechAct.make(
    "Light is a particle",
    { TAG: "Assertive", _0: "particle theory" },
    testContext,
    undefined
  );

  const conflicts = SpeechAct.conflicts(act1, act2);
  assertEquals(typeof conflicts, "boolean");
});

Deno.test("SpeechAct - performative vs constative", () => {
  const performative = SpeechAct.make(
    "I promise",
    { TAG: "Commissive", _0: "promise" },
    testContext,
    undefined
  );

  const constative = SpeechAct.make(
    "The door is open",
    { TAG: "Assertive", _0: "observation" },
    testContext,
    undefined
  );

  assertEquals(performative.mood.performative, true);
  assertEquals(constative.mood.performative, false);
});

Deno.test("SpeechAct - felicity conditions", () => {
  const act = SpeechAct.make(
    "Test",
    { TAG: "Assertive", _0: "test" },
    testContext,
    undefined
  );

  assertExists(act.mood.felicity);
  assertEquals(typeof act.mood.felicity.conventionalProcedure, "boolean");
  assertEquals(typeof act.mood.felicity.appropriateCircumstances, "boolean");
  assertEquals(typeof act.mood.felicity.executedCorrectly, "boolean");
  assertEquals(typeof act.mood.felicity.executedCompletely, "boolean");
  assertEquals(typeof act.mood.felicity.sincereIntentions, "boolean");
});
