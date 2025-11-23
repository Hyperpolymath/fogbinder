/**
 * full_pipeline.bench.ts
 * Performance benchmarks for complete Fogbinder analysis pipeline
 */

import * as Fogbinder from '../src/Fogbinder.bs.js';
import * as FogTrailVisualizer from '../src/engine/FogTrailVisualizer.bs.js';

function benchmark(name: string, fn: () => any, iterations: number = 100): any {
  const start = performance.now();

  let result;
  for (let i = 0; i < iterations; i++) {
    result = fn();
  }

  const end = performance.now();
  const totalTime = end - start;
  const avgTime = totalTime / iterations;

  console.log(`[Benchmark] ${name}`);
  console.log(`  Total: ${totalTime.toFixed(2)}ms`);
  console.log(`  Average: ${avgTime.toFixed(4)}ms`);
  console.log(`  Iterations: ${iterations}`);
  console.log();

  return result;
}

const context = {
  domain: "Artificial Intelligence Ethics",
  conventions: ["utilitarian", "deontological", "virtue ethics"],
  participants: ["AI researchers", "ethicists", "policymakers"],
  purpose: "Understanding AI safety and alignment"
};

// Small dataset
const smallSources = [
  "AI systems must maximize human welfare.",
  "AI development should respect human autonomy.",
  "We cannot predict long-term consequences of superintelligent AI."
];

// Medium dataset
const mediumSources = [
  "AI systems must maximize human welfare and minimize harm.",
  "AI development should respect human autonomy and dignity.",
  "We cannot predict long-term consequences of superintelligent AI.",
  "AI alignment is fundamentally a technical problem.",
  "AI ethics requires considering power structures and inequality.",
  "Regulation will stifle innovation and competitiveness.",
  "Unregulated AI poses existential risks to humanity.",
  "The alignment problem may be unsolvable in principle.",
  "AI should be developed openly for democratic accountability.",
  "AI capabilities should be restricted to prevent misuse."
];

// Large dataset
const largeSources = Array.from({ length: 50 }, (_, i) =>
  `AI ethical consideration ${i + 1} regarding safety, alignment, governance, and societal impact.`
);

console.log("=== Full Pipeline Benchmarks ===\n");

// Benchmark: Complete analysis (small)
let result = benchmark("Full analysis (3 sources)", () => {
  return Fogbinder.analyze(smallSources, context, undefined);
}, 100);

console.log(`  → Found ${result.contradictions.length} contradictions, ${result.mysteries.length} mysteries\n`);

// Benchmark: Complete analysis (medium)
result = benchmark("Full analysis (10 sources)", () => {
  return Fogbinder.analyze(mediumSources, context, undefined);
}, 50);

console.log(`  → Found ${result.contradictions.length} contradictions, ${result.mysteries.length} mysteries\n`);

// Benchmark: Complete analysis (large)
result = benchmark("Full analysis (50 sources)", () => {
  return Fogbinder.analyze(largeSources, context, undefined);
}, 10);

console.log(`  → Found ${result.contradictions.length} contradictions, ${result.mysteries.length} mysteries\n`);

// Benchmark: FogTrail visualization generation
const analysisResult = Fogbinder.analyze(mediumSources, context, undefined);

benchmark("Build FogTrail from analysis", () => {
  FogTrailVisualizer.buildFromAnalysis(
    "AI Ethics Analysis",
    mediumSources,
    analysisResult.contradictions,
    analysisResult.mysteries,
    undefined
  );
}, 100);

const trail = FogTrailVisualizer.buildFromAnalysis(
  "AI Ethics Analysis",
  mediumSources,
  analysisResult.contradictions,
  analysisResult.mysteries,
  undefined
);

benchmark("Generate SVG visualization", () => {
  FogTrailVisualizer.toSvg(trail, 1400, 1000, undefined);
}, 100);

benchmark("Generate JSON visualization", () => {
  FogTrailVisualizer.toJson(trail);
}, 1000);

benchmark("Calculate fog density", () => {
  FogTrailVisualizer.calculateFogDensity(trail);
}, 10000);

// Benchmark: Complete workflow (analysis + visualization)
benchmark("Complete workflow (analysis + FogTrail + SVG)", () => {
  const result = Fogbinder.analyze(mediumSources, context, undefined);

  const trail = FogTrailVisualizer.buildFromAnalysis(
    "Analysis",
    mediumSources,
    result.contradictions,
    result.mysteries,
    undefined
  );

  const svg = FogTrailVisualizer.toSvg(trail, 1200, 800, undefined);

  return { result, trail, svg };
}, 20);

// Benchmark: Memory usage simulation
console.log("\n[Memory Stress Test]");

benchmark("Process 100 sources with full pipeline", () => {
  const sources = Array.from({ length: 100 }, (_, i) =>
    `Complex statement ${i + 1} with multiple concepts and potential contradictions.`
  );

  const result = Fogbinder.analyze(sources, context, undefined);

  const trail = FogTrailVisualizer.buildFromAnalysis(
    "Large Analysis",
    sources,
    result.contradictions,
    result.mysteries,
    undefined
  );

  return { result, trail };
}, 5);

// Benchmark: Parallel analysis simulation
console.log("\n[Throughput Test]");

const analysisCount = 10;
const startTime = performance.now();

for (let i = 0; i < analysisCount; i++) {
  Fogbinder.analyze(mediumSources, context, undefined);
}

const endTime = performance.now();
const throughput = analysisCount / ((endTime - startTime) / 1000);

console.log(`  Processed ${analysisCount} analyses in ${(endTime - startTime).toFixed(2)}ms`);
console.log(`  Throughput: ${throughput.toFixed(2)} analyses/second\n`);

// Benchmark: Scaling analysis
console.log("\n[Scaling Analysis]");

const sizes = [5, 10, 20, 50, 100];

for (const size of sizes) {
  const sources = Array.from({ length: size }, (_, i) =>
    `Statement ${i + 1} with various claims and perspectives.`
  );

  const start = performance.now();
  const result = Fogbinder.analyze(sources, context, undefined);
  const end = performance.now();

  console.log(`  ${size.toString().padStart(3)} sources: ${(end - start).toFixed(2).padStart(8)}ms ` +
              `(${result.contradictions.length} contradictions, ${result.mysteries.length} mysteries)`);
}

console.log("\n✓ Full Pipeline benchmarks complete\n");
