/**
 * contradiction_detection.bench.ts
 * Performance benchmarks for contradiction detection
 */

import * as ContradictionDetector from '../src/engine/ContradictionDetector.bs.js';

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

const context = {
  domain: "Political Economy",
  conventions: ["neoclassical", "marxist", "institutionalist"],
  participants: ["economists"],
  purpose: "Understanding value"
};

// Small dataset (2 sources)
const smallSources = [
  "Value is determined by marginal utility.",
  "Value is determined by socially necessary labor time."
];

// Medium dataset (10 sources)
const mediumSources = [
  "Value is determined by marginal utility and individual preferences.",
  "Markets efficiently allocate resources through price signals.",
  "Rational actors maximize utility subject to constraints.",
  "Equilibrium emerges from free exchange.",
  "Value is determined by socially necessary labor time.",
  "Markets systematically exploit labor and create inequality.",
  "Economic relations are shaped by class struggle.",
  "Profit is unpaid labor value.",
  "Value is socially constructed through evolving norms.",
  "Markets are embedded in social and political institutions."
];

// Large dataset (50 sources)
const largeSources = Array.from({ length: 50 }, (_, i) =>
  `Economic statement ${i + 1} about value, markets, and distribution in various theoretical frameworks.`
);

// Very large dataset (200 sources)
const veryLargeSources = Array.from({ length: 200 }, (_, i) =>
  `Economic claim ${i + 1} discussing theoretical perspectives on value determination and market mechanisms.`
);

console.log("=== Contradiction Detection Benchmarks ===\n");

// Benchmark: Small dataset
benchmark("Detect contradictions (2 sources)", () => {
  ContradictionDetector.detect(smallSources, context);
}, 1000);

// Benchmark: Medium dataset
benchmark("Detect contradictions (10 sources)", () => {
  ContradictionDetector.detect(mediumSources, context);
}, 100);

// Benchmark: Large dataset
benchmark("Detect contradictions (50 sources)", () => {
  ContradictionDetector.detect(largeSources, context);
}, 10);

// Benchmark: Very large dataset
benchmark("Detect contradictions (200 sources)", () => {
  ContradictionDetector.detect(veryLargeSources, context);
}, 5);

// Benchmark: Get severity
const contradictions = ContradictionDetector.detect(mediumSources, context);

if (contradictions.length > 0) {
  benchmark("Get severity for contradiction", () => {
    ContradictionDetector.getSeverity(contradictions[0]);
  }, 10000);

  benchmark("Suggest resolution for contradiction", () => {
    ContradictionDetector.suggestResolution(contradictions[0]);
  }, 10000);
}

// Benchmark: Scaling behavior
console.log("\n[Scaling Analysis]");

const sizes = [2, 5, 10, 20, 50, 100];

for (const size of sizes) {
  const sources = Array.from({ length: size }, (_, i) =>
    `Statement ${i + 1} in various theoretical frameworks.`
  );

  const start = performance.now();
  const result = ContradictionDetector.detect(sources, context);
  const end = performance.now();

  console.log(`  ${size} sources: ${(end - start).toFixed(2)}ms (found ${result.length} contradictions)`);
}

console.log("\n✓ Contradiction Detection benchmarks complete\n");
