/**
 * run_all.ts
 * Runner for all Fogbinder benchmarks
 */

console.log("╔════════════════════════════════════════════════════════════════╗");
console.log("║           FOGBINDER PERFORMANCE BENCHMARK SUITE                ║");
console.log("╚════════════════════════════════════════════════════════════════╝\n");

console.log(`Timestamp: ${new Date().toISOString()}`);
console.log(`Platform: ${Deno.build.os}`);
console.log(`Arch: ${Deno.build.arch}`);
console.log(`Deno: ${Deno.version.deno}`);
console.log(`V8: ${Deno.version.v8}`);
console.log(`TypeScript: ${Deno.version.typescript}\n`);

// Track total execution time
const totalStart = performance.now();

// Benchmark suite runner
async function runBenchmark(name: string, path: string): Promise<number> {
  console.log(`\n${"═".repeat(66)}`);
  console.log(`Running: ${name}`);
  console.log(`${"═".repeat(66)}\n`);

  const start = performance.now();

  // Run benchmark in subprocess to isolate memory
  const command = new Deno.Command(Deno.execPath(), {
    args: ["run", "--allow-all", path],
    stdout: "inherit",
    stderr: "inherit",
  });

  const { code } = await command.output();

  const end = performance.now();
  const duration = end - start;

  if (code !== 0) {
    console.error(`\n✗ ${name} failed with exit code ${code}`);
    return duration;
  }

  console.log(`\n✓ ${name} completed in ${duration.toFixed(2)}ms`);

  return duration;
}

// Run all benchmarks
const benchmarks = [
  { name: "Epistemic State Operations", path: "benchmarks/epistemic_state.bench.ts" },
  { name: "Contradiction Detection", path: "benchmarks/contradiction_detection.bench.ts" },
  { name: "Full Pipeline", path: "benchmarks/full_pipeline.bench.ts" },
];

const results: { name: string; duration: number }[] = [];

for (const benchmark of benchmarks) {
  try {
    const duration = await runBenchmark(benchmark.name, benchmark.path);
    results.push({ name: benchmark.name, duration });
  } catch (error) {
    console.error(`\n✗ ${benchmark.name} failed:`, error);
    results.push({ name: benchmark.name, duration: -1 });
  }
}

const totalEnd = performance.now();
const totalDuration = totalEnd - totalStart;

// Print summary
console.log("\n" + "═".repeat(66));
console.log("BENCHMARK SUMMARY");
console.log("═".repeat(66) + "\n");

for (const result of results) {
  const status = result.duration >= 0 ? "✓" : "✗";
  const durationStr = result.duration >= 0 ? `${result.duration.toFixed(2)}ms` : "FAILED";

  console.log(`${status} ${result.name.padEnd(40)} ${durationStr.padStart(15)}`);
}

console.log("\n" + "─".repeat(66));
console.log(`Total execution time: ${totalDuration.toFixed(2)}ms`);
console.log("═".repeat(66) + "\n");

// Performance grade
const avgDuration = results
  .filter(r => r.duration >= 0)
  .reduce((sum, r) => sum + r.duration, 0) / results.length;

console.log("Performance Grade:");

if (avgDuration < 1000) {
  console.log("  🟢 EXCELLENT (< 1s per suite)");
} else if (avgDuration < 5000) {
  console.log("  🟡 GOOD (1-5s per suite)");
} else if (avgDuration < 10000) {
  console.log("  🟠 ACCEPTABLE (5-10s per suite)");
} else {
  console.log("  🔴 SLOW (> 10s per suite)");
}

console.log("\n" + "═".repeat(66) + "\n");

// Check for failures
const failedCount = results.filter(r => r.duration < 0).length;

if (failedCount > 0) {
  console.error(`⚠️  ${failedCount} benchmark(s) failed`);
  Deno.exit(1);
} else {
  console.log("✓ All benchmarks passed\n");
  Deno.exit(0);
}
