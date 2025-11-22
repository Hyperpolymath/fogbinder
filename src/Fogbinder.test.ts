/**
 * Fogbinder.test.ts
 * Integration tests for complete analysis pipeline
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";

// Import compiled module
import * as Fogbinder from './Fogbinder.bs.js';

Deno.test("Fogbinder - basic analysis pipeline", () => {
  const sources = [
    "The meaning of a word is its use in the language.",
    "Meaning is determined by truth conditions.",
  ];

  const context = {
    domain: "Philosophy of Language",
    conventions: ["academic discourse"],
    participants: ["philosophers"],
    purpose: "Understanding meaning",
  };

  const result = Fogbinder.analyze(sources, context, undefined);

  assertExists(result);
  assertEquals(result.metadata.totalSources, 2);
  assertExists(result.fogTrail);
});

Deno.test("Fogbinder - contradiction detection integration", () => {
  const sources = [
    "Light is a wave.",
    "Light is a particle.",
  ];

  const context = {
    domain: "Physics",
    conventions: ["experimental"],
    participants: ["physicists"],
    purpose: "Understanding light",
  };

  const result = Fogbinder.analyze(sources, context, undefined);

  assertExists(result);
  // May detect contradiction depending on context interpretation
  assertExists(result.contradictions);
});

Deno.test("Fogbinder - mystery clustering integration", () => {
  const sources = [
    "Consciousness is mysterious.",
    "The hard problem remains unclear.",
    "Qualia are ineffable.",
  ];

  const context = {
    domain: "Philosophy of Mind",
    conventions: ["phenomenological"],
    participants: ["philosophers"],
    purpose: "Understanding consciousness",
  };

  const result = Fogbinder.analyze(sources, context, undefined);

  assertExists(result);
  assertExists(result.mysteries);
  // Should cluster mysteries about consciousness
});

Deno.test("Fogbinder - generate report", () => {
  const sources = ["Test source"];

  const context = {
    domain: "Test",
    conventions: [],
    participants: [],
    purpose: "Testing",
  };

  const result = Fogbinder.analyze(sources, context, undefined);
  const report = Fogbinder.generateReport(result);

  assertExists(report);
  assertEquals(typeof report, "string");
  assertEquals(report.includes("Fogbinder Analysis Report"), true);
});

Deno.test("Fogbinder - export to JSON", () => {
  const sources = ["Test source"];

  const context = {
    domain: "Test",
    conventions: [],
    participants: [],
    purpose: "Testing",
  };

  const result = Fogbinder.analyze(sources, context, undefined);
  const json = Fogbinder.toJson(result);

  assertExists(json);
  assertExists(json.metadata);
  assertExists(json.fogTrail);
});
