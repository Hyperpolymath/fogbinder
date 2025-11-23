/**
 * MoodScorer.test.ts
 * Comprehensive tests for speech act-based mood scoring
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as MoodScorer from './MoodScorer.bs.js';
import * as SpeechAct from '../core/SpeechAct.bs.js';

const testContext = {
  domain: "Testing",
  conventions: ["test"],
  participants: ["testers"],
  purpose: "Testing mood scoring",
};

Deno.test("MoodScorer - analyze assertive statement", () => {
  const result = MoodScorer.analyze("The meaning of a word is its use.", testContext);

  assertExists(result);
  assertEquals(result.primary.TAG, "Assertive");
  assertEquals(result.felicitous, true);
});

Deno.test("MoodScorer - analyze commissive promise", () => {
  const result = MoodScorer.analyze("I promise to finish this work.", testContext);

  assertExists(result);
  assertEquals(result.primary.TAG, "Commissive");
  assertEquals(result.felicitous, true);
});

Deno.test("MoodScorer - analyze directive command", () => {
  const result = MoodScorer.analyze("You must submit your work now.", testContext);

  assertExists(result);
  assertEquals(result.primary.TAG, "Directive");
});

Deno.test("MoodScorer - analyze expressive gratitude", () => {
  const result = MoodScorer.analyze("Thank you for your contribution.", testContext);

  assertExists(result);
  assertEquals(result.primary.TAG, "Expressive");
});

Deno.test("MoodScorer - analyze declarative", () => {
  const result = MoodScorer.analyze("I hereby declare this project complete.", testContext);

  assertExists(result);
  assertEquals(result.primary.TAG, "Declaration");
});

Deno.test("MoodScorer - score speech act", () => {
  const act = SpeechAct.make(
    "This is a test",
    { TAG: "Assertive", _0: "test" },
    testContext,
    undefined
  );

  const score = MoodScorer.score(act);

  assertExists(score);
  assertEquals(score.primary.TAG, "Assertive");
  assertEquals(score.felicitous, true);
  assertEquals(typeof score.confidence, "number");
});

Deno.test("MoodScorer - get descriptor", () => {
  const mood = {
    primary: { TAG: "Assertive", _0: "statement" },
    secondary: undefined,
    felicitous: true,
    emotionalTone: undefined,
    confidence: 0.9,
  };

  const descriptor = MoodScorer.getDescriptor(mood);

  assertExists(descriptor);
  assertEquals(typeof descriptor, "string");
  assertEquals(descriptor.includes("Stating"), true);
});

Deno.test("MoodScorer - compare moods", () => {
  const mood1 = {
    primary: { TAG: "Assertive", _0: "a" },
    secondary: undefined,
    felicitous: true,
    emotionalTone: undefined,
    confidence: 0.8,
  };

  const mood2 = {
    primary: { TAG: "Assertive", _0: "b" },
    secondary: undefined,
    felicitous: true,
    emotionalTone: undefined,
    confidence: 0.7,
  };

  const comparison = MoodScorer.compare(mood1, mood2);

  assertExists(comparison);
  assertEquals(typeof comparison, "string");
});

Deno.test("MoodScorer - detect emotional tone", () => {
  const result = MoodScorer.analyze(
    "I am feeling melancholy about this research.",
    testContext
  );

  assertExists(result);
  if (result.emotionalTone) {
    assertEquals(result.emotionalTone, "melancholic");
  }
});

Deno.test("MoodScorer - confidence levels", () => {
  const result = MoodScorer.analyze("Maybe this could work.", testContext);

  assertExists(result);
  assertEquals(typeof result.confidence, "number");
  assertEquals(result.confidence >= 0.0 && result.confidence <= 1.0, true);
});
