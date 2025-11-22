#!/usr/bin/env -S deno run --allow-all

/**
 * examples/basic_usage.ts
 * Basic usage examples for Fogbinder
 */

// Note: In production, import from compiled bundle
// For now, this demonstrates the API surface

console.log("🌫️  Fogbinder - Basic Usage Examples");
console.log("=".repeat(60));

// Example 1: Simple Analysis
console.log("\n📚 Example 1: Analyzing Philosophical Texts\n");

const philosophySources = [
  "The meaning of a word is its use in the language.",
  "Philosophical problems arise when language goes on holiday.",
  "Meaning is determined by truth conditions.",
  "To understand a sentence is to know its verification conditions.",
];

const philContext = {
  domain: "Philosophy of Language",
  conventions: ["academic discourse", "analytic tradition"],
  participants: ["philosophers", "linguists"],
  purpose: "Understanding meaning",
};

console.log("Sources:", philosophySources);
console.log("\nContext:", philContext);

// In production:
// const result = Fogbinder.analyze(philosophySources, philContext);
// console.log("\n" + Fogbinder.generateReport(result));

console.log("\n✅ This would detect:");
console.log("  - Contradiction between use-theory and truth-conditional semantics");
console.log("  - Wittgenstein vs. Davidson language games");
console.log("  - Mystery: How does 'use' determine meaning?");

// Example 2: Scientific Research
console.log("\n\n🔬 Example 2: Analyzing Scientific Sources\n");

const scienceSources = [
  "Light exhibits wave-like properties in diffraction.",
  "Light exhibits particle-like properties in the photoelectric effect.",
  "The wave-particle duality remains fundamentally mysterious.",
];

const sciContext = {
  domain: "Quantum Physics",
  conventions: ["empirical observation", "mathematical formalism"],
  participants: ["physicists"],
  purpose: "Understanding light",
};

console.log("Sources:", scienceSources);
console.log("\nContext:", sciContext);

console.log("\n✅ This would detect:");
console.log("  - Apparent contradiction (resolved by quantum mechanics)");
console.log("  - Mystery cluster around wave-particle duality");
console.log("  - Fog density: High (fundamental quantum uncertainty)");

// Example 3: Literary Analysis
console.log("\n\n📖 Example 3: Analyzing Literary Criticism\n");

const literarySources = [
  "Hamlet is indecisive due to melancholy.",
  "Hamlet's delay is strategic, not psychological.",
  "The play resists simple psychological interpretation.",
];

const litContext = {
  domain: "Literary Criticism",
  conventions: ["close reading", "interpretive pluralism"],
  participants: ["literary critics", "scholars"],
  purpose: "Interpreting Hamlet",
};

console.log("Sources:", literarySources);
console.log("\nContext:", litContext);

console.log("\n✅ This would detect:");
console.log("  - Multiple valid interpretations (not contradiction!)");
console.log("  - Ambiguity is a feature of literary analysis");
console.log("  - Speech acts: Competing critical assertions");

// Example 4: Interdisciplinary Research
console.log("\n\n🔀 Example 4: Interdisciplinary Contradictions\n");

const interdisciplinarySources = [
  "Free will is an illusion (neuroscience perspective).",
  "Moral responsibility requires free will (philosophical perspective).",
  "Free will is a useful fiction (pragmatic perspective).",
];

const interContext = {
  domain: "Cognitive Science / Philosophy",
  conventions: ["interdisciplinary dialogue"],
  participants: ["neuroscientists", "philosophers", "psychologists"],
  purpose: "Understanding agency",
};

console.log("Sources:", interdisciplinarySources);
console.log("\nContext:", interContext);

console.log("\n✅ This would detect:");
console.log("  - Disciplinary clash: different language games");
console.log("  - Contradiction type: Incommensurable frameworks");
console.log("  - Resolution: Acknowledge different explanatory levels");

// Example 5: Mystery Clustering
console.log("\n\n🌀 Example 5: Mystery Detection\n");

const mysterySources = [
  "Consciousness cannot be reduced to neural activity.",
  "The hard problem of consciousness resists scientific explanation.",
  "What it is like to be a bat is ineffable.",
  "Qualia are intrinsically mysterious.",
];

const mysteryContext = {
  domain: "Philosophy of Mind",
  conventions: ["phenomenological analysis"],
  participants: ["philosophers"],
  purpose: "Understanding consciousness",
};

console.log("Sources:", mysterySources);
console.log("\nContext:", mysteryContext);

console.log("\n✅ This would detect:");
console.log("  - Mystery cluster: Consciousness");
console.log("  - Resistance type: Linguistic + Evidential");
console.log("  - Opacity level: Opaque / Ineffable");
console.log("  - Suggestion: Consider showing rather than saying (Wittgenstein)");

// Example 6: Mood Scoring (Speech Acts)
console.log("\n\n🎭 Example 6: Speech Act Analysis\n");

const speechActSources = [
  "I promise to complete this research by Friday.",
  "You must submit your abstract immediately.",
  "I apologize for the delay in review.",
  "This paper argues that meaning is use.",
];

const speechContext = {
  domain: "Academic Communication",
  conventions: ["professional correspondence"],
  participants: ["researchers", "reviewers"],
  purpose: "Scholarly communication",
};

console.log("Sources:", speechActSources);
console.log("\nContext:", speechContext);

console.log("\n✅ This would detect:");
console.log("  - Commissive: 'I promise...' (creates obligation)");
console.log("  - Directive: 'You must...' (commands action)");
console.log("  - Expressive: 'I apologize...' (expresses regret)");
console.log("  - Assertive: 'This paper argues...' (states claim)");

// Example 7: FogTrail Visualization
console.log("\n\n🕸️  Example 7: FogTrail Network\n");

console.log("The FogTrail visualization would show:");
console.log("  - Nodes: Sources, concepts, mysteries, contradictions");
console.log("  - Edges: Supports, contradicts, resembles, mystifies");
console.log("  - Fog density: Overall epistemic opacity (0.0-1.0)");
console.log("  - Export formats: JSON, SVG, interactive HTML");

console.log("\nVisualization colors:");
console.log("  🔵 Source nodes (blue)");
console.log("  🟣 Concept nodes (purple)");
console.log("  ⚫ Mystery nodes (dark gray)");
console.log("  🔴 Contradiction nodes (red)");

// Example 8: Batch Analysis
console.log("\n\n📦 Example 8: Batch Processing\n");

const batches = [
  { sources: philosophySources, context: philContext },
  { sources: scienceSources, context: sciContext },
  { sources: literarySources, context: litContext },
];

console.log(`Processing ${batches.length} collections...`);

// In production:
// const results = batches.map(({ sources, context }) =>
//   Fogbinder.analyze(sources, context)
// );

console.log("\n✅ Would generate comparative analysis across domains");

console.log("\n" + "=".repeat(60));
console.log("✅ Examples complete!");
console.log("\nNext steps:");
console.log("  1. npm run build");
console.log("  2. Import Fogbinder in your code");
console.log("  3. Start navigating epistemic ambiguity!");
