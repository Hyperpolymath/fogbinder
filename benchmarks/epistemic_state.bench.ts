/**
 * epistemic_state.bench.ts
 * Performance benchmarks for epistemic state operations
 */

import * as EpistemicState from '../src/core/EpistemicState.bs.js';

// Helper to measure execution time
function benchmark(name: string, fn: () => void, iterations: number = 1000): void {
  const start = performance.now();

  for (let i = 0; i < iterations; i++) {
    fn();
  }

  const end = performance.now();
  const totalTime = end - start;
  const avgTime = totalTime / iterations;

  console.log(`[Benchmark] ${name}`);
  console.log(`  Total: ${totalTime.toFixed(2)}ms`);
  console.log(`  Average: ${avgTime.toFixed(4)}ms`);
  console.log(`  Iterations: ${iterations}`);
  console.log();
}

// Test data
const context = {
  domain: "Philosophy",
  conventions: ["analytic", "phenomenological"],
  participants: ["philosophers"],
  purpose: "Understanding consciousness"
};

const knownState = EpistemicState.make(
  { TAG: "Known" },
  context,
  ["Fact 1", "Fact 2", "Fact 3"],
  undefined
);

const probableState = EpistemicState.make(
  { TAG: "Probable", _0: 0.75 },
  context,
  ["Evidence 1", "Evidence 2"],
  undefined
);

const vagueState = EpistemicState.make(
  { TAG: "Vague" },
  context,
  ["Unclear claim"],
  undefined
);

const mysteriousState = EpistemicState.make(
  { TAG: "Mysterious" },
  context,
  ["Deeply mysterious"],
  undefined
);

const ambiguousState = EpistemicState.make(
  { TAG: "Ambiguous", _0: [
    "Interpretation 1",
    "Interpretation 2",
    "Interpretation 3",
    "Interpretation 4"
  ]},
  context,
  ["Multiple meanings"],
  undefined
);

// Benchmark: State creation
console.log("=== Epistemic State Benchmarks ===\n");

benchmark("Create Known state", () => {
  EpistemicState.make(
    { TAG: "Known" },
    context,
    ["Test evidence"],
    undefined
  );
}, 10000);

benchmark("Create Probable state", () => {
  EpistemicState.make(
    { TAG: "Probable", _0: 0.8 },
    context,
    ["Test evidence"],
    undefined
  );
}, 10000);

benchmark("Create Ambiguous state", () => {
  EpistemicState.make(
    { TAG: "Ambiguous", _0: ["A", "B", "C", "D"] },
    context,
    ["Test evidence"],
    undefined
  );
}, 10000);

// Benchmark: Merging operations
benchmark("Merge Known + Probable", () => {
  EpistemicState.merge(knownState, probableState);
}, 10000);

benchmark("Merge Vague + Mysterious", () => {
  EpistemicState.merge(vagueState, mysteriousState);
}, 10000);

benchmark("Merge Ambiguous + Probable", () => {
  EpistemicState.merge(ambiguousState, probableState);
}, 10000);

// Benchmark: Multiple merges (chain)
benchmark("Chain merge (5 states)", () => {
  const states = [knownState, probableState, vagueState, mysteriousState, ambiguousState];

  let result = states[0];
  for (let i = 1; i < states.length; i++) {
    result = EpistemicState.merge(result, states[i]);
  }
}, 1000);

// Benchmark: isUncertain check
benchmark("Check isUncertain (Known)", () => {
  EpistemicState.isUncertain(knownState);
}, 100000);

benchmark("Check isUncertain (Vague)", () => {
  EpistemicState.isUncertain(vagueState);
}, 100000);

benchmark("Check isUncertain (Mysterious)", () => {
  EpistemicState.isUncertain(mysteriousState);
}, 100000);

// Benchmark: Large evidence arrays
const largeEvidenceState = EpistemicState.make(
  { TAG: "Probable", _0: 0.9 },
  context,
  Array.from({ length: 100 }, (_, i) => `Evidence item ${i}`),
  undefined
);

benchmark("Create state with 100 evidence items", () => {
  EpistemicState.make(
    { TAG: "Known" },
    context,
    Array.from({ length: 100 }, (_, i) => `Evidence ${i}`),
    undefined
  );
}, 1000);

benchmark("Merge states with 100 evidence items each", () => {
  const state1 = EpistemicState.make(
    { TAG: "Probable", _0: 0.8 },
    context,
    Array.from({ length: 100 }, (_, i) => `Evidence A${i}`),
    undefined
  );

  const state2 = EpistemicState.make(
    { TAG: "Probable", _0: 0.7 },
    context,
    Array.from({ length: 100 }, (_, i) => `Evidence B${i}`),
    undefined
  );

  EpistemicState.merge(state1, state2);
}, 1000);

console.log("✓ Epistemic State benchmarks complete\n");
