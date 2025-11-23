# Fogbinder Advanced Cookbook

**Expert-Level Analysis and Visualization**
Last updated: 2025-11-23

This cookbook contains advanced recipes for experienced Fogbinder users.

---

## Table of Contents

1. [Contradiction Detection](#recipe-1-contradiction-detection)
2. [Mystery Clustering](#recipe-2-mystery-clustering)
3. [FogTrail Visualization](#recipe-3-fogtrail-visualization)
4. [Full Analysis Pipeline](#recipe-4-full-analysis-pipeline)

---

## Recipe 1: Contradiction Detection

**Difficulty:** Advanced
**Time:** 15-20 minutes
**Prerequisites:** Understanding of language games, Wittgenstein's later philosophy

### Overview

Detect **language game contradictions** (not just logical contradictions) using ContradictionDetector. This is a philosophically sophisticated analysis that recognizes that the same words can mean different things in different frameworks.

### The Five Conflict Types

1. **SameWordsDifferentGames** - Same terminology, different meanings across frameworks
2. **IncommensurableFrameworks** - Incompatible conceptual systems (à la Kuhn)
3. **PragmaticConflict** - Conflicting purposes or goals
4. **ImplicitNormClash** - Contradictory unstated assumptions
5. **FormOfLifeDissonance** - Fundamentally different worldviews

### Code

```typescript
import * as ContradictionDetector from './src/engine/ContradictionDetector.bs.js';

// Example: Political economy contradictions
const context = {
  domain: "Political Economy",
  conventions: ["neoclassical", "marxist", "institutionalist"],
  participants: ["economists", "political theorists"],
  purpose: "Understanding value and markets"
};

const sources = [
  // Neoclassical perspective
  "Value is determined by marginal utility and individual preferences.",
  "Markets efficiently allocate resources through price signals.",
  "Rational actors maximize utility subject to constraints.",

  // Marxist perspective
  "Value is determined by socially necessary labor time.",
  "Markets systematically exploit labor and create inequality.",
  "Economic relations are shaped by class struggle.",

  // Institutionalist perspective
  "Value is socially constructed through evolving norms.",
  "Markets are embedded in social and political institutions."
];

// Detect all contradictions
const contradictions = ContradictionDetector.detect(sources, context);

console.log(`\nFound ${contradictions.length} contradictions:\n`);

// Analyze each contradiction
for (let i = 0; i < contradictions.length; i++) {
  const c = contradictions[i];

  console.log(`Contradiction ${i + 1}:`);
  console.log("─".repeat(60));

  // Show conflicting sources
  console.log("Sources in conflict:");
  for (const source of c.sources) {
    console.log(`  • ${source}`);
  }

  // Identify conflict type
  console.log(`\nConflict Type: ${c.conflictType.TAG}`);

  // Show which language games are involved
  console.log(`Language Games: ${c.languageGames.join(", ")}`);

  // Calculate severity (0.0 = trivial, 1.0 = severe)
  const severity = ContradictionDetector.getSeverity(c);
  console.log(`Severity: ${severity.toFixed(2)} / 1.00`);

  // Get pragmatic resolution suggestion
  const resolution = ContradictionDetector.suggestResolution(c);
  console.log(`\nResolution Suggestion:`);
  console.log(`  ${resolution}`);

  console.log("\n");
}
```

### Example Output

```
Found 3 contradictions:

Contradiction 1:
────────────────────────────────────────────────────────────
Sources in conflict:
  • Value is determined by marginal utility and individual preferences.
  • Value is determined by socially necessary labor time.

Conflict Type: SameWordsDifferentGames
Language Games: neoclassical, marxist
Severity: 0.85 / 1.00

Resolution Suggestion:
  Clarify which language game (neoclassical, marxist) is being used.
  The word "value" means different things in each framework:
  - Neoclassical: Subjective utility
  - Marxist: Objective labor content
  These are not contradictory - they're incommensurable definitions.
```

### Advanced Pattern: Contradiction Networks

```typescript
import * as ContradictionDetector from './src/engine/ContradictionDetector.bs.js';
import * as FogTrailVisualizer from './src/engine/FogTrailVisualizer.bs.js';

// Build a network of contradictions
function buildContradictionNetwork(sources: string[], context: any) {
  const contradictions = ContradictionDetector.detect(sources, context);

  // Create FogTrail with contradiction nodes
  let trail = FogTrailVisualizer.make("Contradiction Network", undefined);

  // Add source nodes
  for (let i = 0; i < sources.length; i++) {
    trail = FogTrailVisualizer.addNode(trail, {
      id: `source_${i}`,
      label: sources[i].substring(0, 50) + "...",
      nodeType: { TAG: "Source" },
      epistemicState: undefined,
      x: Math.cos(i * 2 * Math.PI / sources.length) * 300 + 400,
      y: Math.sin(i * 2 * Math.PI / sources.length) * 300 + 300
    });
  }

  // Add contradiction edges
  for (const contradiction of contradictions) {
    // Find source indices
    const sourceIndices = contradiction.sources.map(s =>
      sources.findIndex(source => source === s)
    );

    // Add edges between contradicting sources
    for (let i = 0; i < sourceIndices.length - 1; i++) {
      trail = FogTrailVisualizer.addEdge(trail, {
        source: `source_${sourceIndices[i]}`,
        target: `source_${sourceIndices[i + 1]}`,
        edgeType: { TAG: "Contradicts" },
        weight: ContradictionDetector.getSeverity(contradiction),
        label: contradiction.conflictType.TAG
      });
    }
  }

  return trail;
}

// Usage
const trail = buildContradictionNetwork(sources, context);
const svg = FogTrailVisualizer.toSvg(trail, 1400, 1000, undefined);
// Save or display SVG
```

### Key Insights

- **Language game analysis** is more nuanced than logical contradiction detection
- **Same words, different games** is the most common conflict type
- **Severity** considers both logical incompatibility and pragmatic impact
- **Resolution** focuses on clarifying frameworks, not forcing consistency

### See Also

- [PHILOSOPHY.md](../PHILOSOPHY.md) - Wittgenstein's language games
- [Recipe 3: FogTrail Visualization](#recipe-3-fogtrail-visualization)

---

## Recipe 2: Mystery Clustering

**Difficulty:** Advanced
**Time:** 15-20 minutes
**Prerequisites:** Understanding of epistemic states, opacity types

### Overview

Cluster and analyze epistemic resistance using MysteryClustering. This recipe helps identify patterns in what resists explanation.

### The Four Resistance Types

1. **LinguisticResistance** - Cannot be articulated in language (ineffable, unspeakable)
2. **ConceptualResistance** - Conceptually unclear or ambiguous
3. **LogicalResistance** - Paradoxical or logically problematic
4. **PhenomenologicalResistance** - Subjective experience that resists objective description

### The Four Opacity Levels

1. **Transparent** - Clear and understandable
2. **Translucent** - Partially understood
3. **Opaque** - Mostly unclear
4. **ImpenetrableMystery** - Fundamentally mysterious

### Code

```typescript
import * as MysteryClustering from './src/engine/MysteryClustering.bs.js';
import * as EpistemicState from './src/core/EpistemicState.bs.js';

const context = {
  domain: "Philosophy of Mind",
  conventions: ["phenomenological", "analytic"],
  participants: ["philosophers", "cognitive scientists"],
  purpose: "Understanding consciousness"
};

// Create mysterious epistemic states
const mysteries = [
  {
    content: "What is it like to see red?",
    state: EpistemicState.make(
      { TAG: "Mysterious" },
      context,
      ["Qualia resist objective description"],
      undefined
    )
  },
  {
    content: "Why is there something it is like to be conscious?",
    state: EpistemicState.make(
      { TAG: "Mysterious" },
      context,
      ["The hard problem of consciousness"],
      undefined
    )
  },
  {
    content: "Could philosophical zombies exist?",
    state: EpistemicState.make(
      { TAG: "Vague" },
      context,
      ["Conceptual possibility unclear"],
      undefined
    )
  },
  {
    content: "Does split-brain surgery create two consciousnesses?",
    state: EpistemicState.make(
      { TAG: "Ambiguous", _0: [
        "Yes - two separate centers",
        "No - unified consciousness persists",
        "Depends on definition of unity",
        "The question is ill-formed"
      ]},
      context,
      ["Multiple valid interpretations"],
      undefined
    )
  }
];

// Create mystery objects
const mysteryObjects = mysteries.map(m =>
  MysteryClustering.make(m.content, m.state, undefined)
);

// Cluster mysteries
const clusters = MysteryClustering.cluster(mysteryObjects);

console.log(`\n Created ${clusters.length} mystery clusters\n`);

// Analyze each mystery
for (let i = 0; i < mysteryObjects.length; i++) {
  const mystery = mysteryObjects[i];

  console.log(`Mystery ${i + 1}:`);
  console.log("─".repeat(60));
  console.log(`Content: "${mystery.content}"`);
  console.log(`Opacity: ${mystery.opacityLevel}`);
  console.log(`Resistance: ${mystery.resistanceType.TAG}`);

  // Get descriptive label
  const descriptor = MysteryClustering.getOpacityDescriptor(mystery);
  console.log(`Descriptor: ${descriptor}`);

  // Get exploration suggestion
  const suggestion = MysteryClustering.suggestExploration(mystery);
  console.log(`Exploration Strategy:`);
  console.log(`  ${suggestion}`);

  console.log("\n");
}
```

### Example Output

```
Mystery 1:
────────────────────────────────────────────────────────────
Content: "What is it like to see red?"
Opacity: ImpenetrableMystery
Resistance: PhenomenologicalResistance
Descriptor: Fundamentally mysterious and resistant to explanation
Exploration Strategy:
  This involves phenomenological resistance. Consider:
  - First-person phenomenology
  - Thought experiments (inverted spectrum)
  - Limits of third-person description
  Accept that some aspects may be ineffable.
```

### Advanced Pattern: Mystery Evolution Tracking

```typescript
// Track how mysteries evolve as research progresses

interface MysterySnapshot {
  timestamp: number;
  mystery: any;
  opacityLevel: string;
}

class MysteryTracker {
  history: Map<string, MysterySnapshot[]> = new Map();

  record(content: string, mystery: any) {
    if (!this.history.has(content)) {
      this.history.set(content, []);
    }

    this.history.get(content)!.push({
      timestamp: Date.now(),
      mystery,
      opacityLevel: mystery.opacityLevel
    });
  }

  hasBecomeClearer(content: string): boolean {
    const snapshots = this.history.get(content);
    if (!snapshots || snapshots.length < 2) return false;

    const opacityOrder = [
      "ImpenetrableMystery",
      "Opaque",
      "Translucent",
      "Transparent"
    ];

    const first = snapshots[0].opacityLevel;
    const last = snapshots[snapshots.length - 1].opacityLevel;

    return opacityOrder.indexOf(last) > opacityOrder.indexOf(first);
  }

  report() {
    console.log("\n=== MYSTERY EVOLUTION REPORT ===\n");

    for (const [content, snapshots] of this.history) {
      console.log(`"${content}"`);
      console.log(`  Initial: ${snapshots[0].opacityLevel}`);
      console.log(`  Current: ${snapshots[snapshots.length - 1].opacityLevel}`);
      console.log(`  Clearer? ${this.hasBecomeClearer(content) ? "Yes" : "No"}`);
      console.log();
    }
  }
}

// Usage
const tracker = new MysteryTracker();

// Initial analysis
const initialMystery = MysteryClustering.make(
  "What is consciousness?",
  EpistemicState.make({ TAG: "Mysterious" }, context, [], undefined),
  undefined
);
tracker.record("What is consciousness?", initialMystery);

// After more research...
const updatedMystery = MysteryClustering.make(
  "What is consciousness?",
  EpistemicState.make({ TAG: "Vague" }, context, [], undefined),
  undefined
);
tracker.record("What is consciousness?", updatedMystery);

tracker.report();
```

### Key Insights

- **Mysteries are features, not bugs** - they guide research directions
- **Resistance types** suggest different exploration strategies
- **Opacity can change** over time as understanding deepens
- **Clustering** reveals patterns in what resists explanation

### See Also

- [Intermediate: Epistemic States](./INTERMEDIATE_COOKBOOK.md#recipe-2-epistemic-states)
- [PHILOSOPHY.md](../PHILOSOPHY.md) - Epistemic resistance theory

---

## Recipe 3: FogTrail Visualization

**Difficulty:** Advanced
**Time:** 20-30 minutes
**Prerequisites:** Understanding of network graphs, SVG

### Overview

Create sophisticated network visualizations of epistemic opacity using FogTrailVisualizer.

### Node Types

- **Source** - Original citation or text (blue: #4A90E2)
- **Concept** - Derived concept or idea (green: #27AE60)
- **Mystery** - Mysterious or uncertain content (dark: #2C3E50)
- **Contradiction** - Contradictory claim (red: #E74C3C)

### Edge Types

- **Supports** - One node supports another
- **Contradicts** - Nodes are in conflict
- **Relates** - General relationship
- **Unclear** - Unclear or ambiguous relationship

### Basic Visualization

```typescript
import * as FogTrailVisualizer from './src/engine/FogTrailVisualizer.bs.js';
import * as Fogbinder from './src/Fogbinder.bs.js';

// Run analysis
const context = {
  domain: "Climate Science",
  conventions: ["empirical", "peer-reviewed"],
  participants: ["climate scientists"],
  purpose: "Understanding climate change"
};

const sources = [
  "Global temperatures have risen 1.1°C since pre-industrial times.",
  "Future warming trajectories remain highly uncertain.",
  "We must reduce emissions immediately.",
  "Economic models suggest gradual transition is more feasible."
];

const result = Fogbinder.analyze(sources, context, undefined);

// Build FogTrail from analysis
let trail = FogTrailVisualizer.buildFromAnalysis(
  "Climate Science Analysis",
  sources,
  result.contradictions,
  result.mysteries,
  undefined
);

// Calculate fog density (0.0 = clear, 1.0 = completely opaque)
const density = FogTrailVisualizer.calculateFogDensity(trail);
console.log(`Fog density: ${density.toFixed(2)}`);
console.log(`  (${(density * 100).toFixed(0)}% of nodes are mysteries)\n`);

// Export as SVG
const svg = FogTrailVisualizer.toSvg(trail, 1400, 1000, undefined);
console.log(`Generated SVG (${svg.length} characters)`);

// Save to file (Deno)
// await Deno.writeTextFile("fogtrail.svg", svg);

// Export as JSON for custom visualization
const json = FogTrailVisualizer.toJson(trail);
console.log(`Exported JSON with ${json.nodes.length} nodes and ${json.edges.length} edges`);
```

### Advanced: Custom Layouts

```typescript
// Create custom layout with positioned nodes

function createCustomLayout(sources: string[], contradictions: any[], mysteries: any[]) {
  let trail = FogTrailVisualizer.make("Custom Layout", undefined);

  // Circular layout for sources
  const radius = 300;
  const centerX = 700;
  const centerY = 500;

  for (let i = 0; i < sources.length; i++) {
    const angle = (i * 2 * Math.PI) / sources.length;

    trail = FogTrailVisualizer.addNode(trail, {
      id: `source_${i}`,
      label: sources[i].substring(0, 40),
      nodeType: { TAG: "Source" },
      epistemicState: undefined,
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    });
  }

  // Place contradictions at center
  for (let i = 0; i < contradictions.length; i++) {
    trail = FogTrailVisualizer.addNode(trail, {
      id: `contradiction_${i}`,
      label: "Contradiction",
      nodeType: { TAG: "Contradiction" },
      epistemicState: undefined,
      x: centerX + (Math.random() - 0.5) * 100,
      y: centerY + (Math.random() - 0.5) * 100
    });

    // Connect to sources involved in contradiction
    const c = contradictions[i];
    for (const source of c.sources) {
      const sourceIdx = sources.indexOf(source);
      if (sourceIdx >= 0) {
        trail = FogTrailVisualizer.addEdge(trail, {
          source: `contradiction_${i}`,
          target: `source_${sourceIdx}`,
          edgeType: { TAG: "Contradicts" },
          weight: 0.9,
          label: c.conflictType.TAG
        });
      }
    }
  }

  // Place mysteries on outer ring
  const mysteryRadius = 450;
  for (let i = 0; i < mysteries.length; i++) {
    const angle = (i * 2 * Math.PI) / mysteries.length + Math.PI / 4;

    trail = FogTrailVisualizer.addNode(trail, {
      id: `mystery_${i}`,
      label: mysteries[i].content.substring(0, 30),
      nodeType: { TAG: "Mystery" },
      epistemicState: undefined,
      x: centerX + mysteryRadius * Math.cos(angle),
      y: centerY + mysteryRadius * Math.sin(angle)
    });

    // Connect mysteries to nearest source with unclear relationship
    trail = FogTrailVisualizer.addEdge(trail, {
      source: `mystery_${i}`,
      target: `source_${i % sources.length}`,
      edgeType: { TAG: "Unclear" },
      weight: 0.5,
      label: "unclear"
    });
  }

  return trail;
}

// Usage
const customTrail = createCustomLayout(sources, result.contradictions, result.mysteries);
const customSvg = FogTrailVisualizer.toSvg(customTrail, 1400, 1000, undefined);
```

### Advanced: Interactive JSON Export

```typescript
// Export as JSON for use with D3.js, Cytoscape.js, etc.

function exportForD3(trail: any) {
  const json = FogTrailVisualizer.toJson(trail);

  // Transform to D3 force-directed graph format
  const d3Format = {
    nodes: json.nodes.map((node: any) => ({
      id: node.id,
      label: node.label,
      type: node.nodeType.TAG,
      group: node.nodeType.TAG,
      x: node.x,
      y: node.y
    })),
    links: json.edges.map((edge: any) => ({
      source: edge.source,
      target: edge.target,
      type: edge.edgeType.TAG,
      weight: edge.weight,
      label: edge.label
    }))
  };

  return d3Format;
}

const d3Data = exportForD3(trail);
console.log(JSON.stringify(d3Data, null, 2));
```

### Fog Density Interpretation

```typescript
const density = FogTrailVisualizer.calculateFogDensity(trail);

if (density < 0.2) {
  console.log("Low fog: Most claims are clear and well-understood");
} else if (density < 0.5) {
  console.log("Moderate fog: Significant uncertainty present");
} else if (density < 0.8) {
  console.log("High fog: Most claims involve mystery or ambiguity");
} else {
  console.log("Dense fog: Almost everything is epistemically opaque");
}
```

### Key Insights

- **FogTrail is a network** of epistemic relationships, not just a tree
- **Fog density** provides a single metric for overall epistemic opacity
- **Custom layouts** enable domain-specific visualizations
- **JSON export** allows integration with other tools

### See Also

- [Intermediate: Zotero Integration](./INTERMEDIATE_COOKBOOK.md#recipe-1-zotero-integration)
- [Recipe 4: Full Analysis Pipeline](#recipe-4-full-analysis-pipeline)

---

## Recipe 4: Full Analysis Pipeline

**Difficulty:** Advanced
**Time:** 30-45 minutes
**Prerequisites:** All previous recipes

### Overview

Execute the complete Fogbinder workflow from raw sources to comprehensive analysis and visualization.

### Complete Code

```typescript
import * as Fogbinder from './src/Fogbinder.bs.js';
import * as EpistemicState from './src/core/EpistemicState.bs.js';
import * as ContradictionDetector from './src/engine/ContradictionDetector.bs.js';
import * as MoodScorer from './src/engine/MoodScorer.bs.js';
import * as MysteryClustering from './src/engine/MysteryClustering.bs.js';
import * as FogTrailVisualizer from './src/engine/FogTrailVisualizer.bs.js';

// ========== CONFIGURATION ==========

const config = {
  domain: "Artificial Intelligence Ethics",
  conventions: [
    "utilitarian",
    "deontological",
    "virtue ethics",
    "care ethics"
  ],
  participants: [
    "AI researchers",
    "ethicists",
    "policymakers",
    "tech industry"
  ],
  purpose: "Understanding AI safety and alignment"
};

// ========== DATA PREPARATION ==========

const sources = [
  "AI systems must maximize human welfare and minimize harm.",
  "AI development should respect human autonomy and dignity.",
  "We cannot predict long-term consequences of superintelligent AI.",
  "AI alignment is fundamentally a technical problem.",
  "AI ethics requires considering power structures and inequality.",
  "Regulation will stifle innovation and competitiveness.",
  "Unregulated AI poses existential risks to humanity.",
  "The alignment problem may be unsolvable in principle."
];

console.log("=".repeat(70));
console.log("FOGBINDER FULL ANALYSIS PIPELINE");
console.log("=".repeat(70));
console.log(`\nDomain: ${config.domain}`);
console.log(`Sources: ${sources.length}`);
console.log("\n");

// ========== FULL ANALYSIS ==========

console.log("Running full Fogbinder analysis...\n");
const result = Fogbinder.analyze(sources, config, undefined);

// ========== EPISTEMIC STATES ==========

console.log("=== EPISTEMIC STATES ===\n");

const uncertainCount = result.epistemicStates.filter(s =>
  EpistemicState.isUncertain(s)
).length;

console.log(`Uncertain states: ${uncertainCount} / ${result.epistemicStates.length}\n`);

for (let i = 0; i < result.epistemicStates.length; i++) {
  const state = result.epistemicStates[i];
  console.log(`[${i + 1}] ${sources[i]}`);
  console.log(`    Certainty: ${state.certainty.TAG}`);
  console.log(`    Uncertain: ${EpistemicState.isUncertain(state) ? "Yes" : "No"}`);
  console.log();
}

// ========== CONTRADICTIONS ==========

console.log("\n=== CONTRADICTIONS ===\n");
console.log(`Total: ${result.contradictions.length}\n`);

const contradictionsBySeverity = result.contradictions
  .map(c => ({
    contradiction: c,
    severity: ContradictionDetector.getSeverity(c)
  }))
  .sort((a, b) => b.severity - a.severity);

for (let i = 0; i < contradictionsBySeverity.length; i++) {
  const { contradiction, severity } = contradictionsBySeverity[i];

  console.log(`Contradiction ${i + 1} [Severity: ${severity.toFixed(2)}]`);
  console.log("─".repeat(70));
  console.log(`Type: ${contradiction.conflictType.TAG}`);
  console.log(`Games: ${contradiction.languageGames.join(", ")}`);
  console.log("\nSources:");
  for (const source of contradiction.sources) {
    console.log(`  • ${source}`);
  }
  console.log(`\nResolution:`);
  console.log(`  ${ContradictionDetector.suggestResolution(contradiction)}`);
  console.log("\n");
}

// ========== MYSTERIES ==========

console.log("=== MYSTERIES ===\n");
console.log(`Total: ${result.mysteries.length}\n`);

const clusters = MysteryClustering.cluster(result.mysteries);
console.log(`Clustered into ${clusters.length} groups\n`);

// Group by resistance type
const byResistance = new Map<string, any[]>();
for (const mystery of result.mysteries) {
  const type = mystery.resistanceType.TAG;
  if (!byResistance.has(type)) {
    byResistance.set(type, []);
  }
  byResistance.get(type)!.push(mystery);
}

for (const [resistanceType, mysteries] of byResistance) {
  console.log(`${resistanceType} (${mysteries.length}):`);

  for (const mystery of mysteries) {
    console.log(`  • ${mystery.content}`);
    console.log(`    Opacity: ${mystery.opacityLevel}`);
    console.log(`    Strategy: ${MysteryClustering.suggestExploration(mystery)}`);
    console.log();
  }
}

// ========== MOOD ANALYSIS ==========

console.log("\n=== MOOD ANALYSIS ===\n");

const mood = result.overallMood;
console.log(`Descriptor: ${MoodScorer.getDescriptor(mood)}`);
console.log(`Primary: ${mood.primary.TAG}`);

if (mood.secondary) {
  console.log(`Secondary: ${mood.secondary.TAG}`);
}

console.log(`Felicitous: ${mood.felicitous}`);
console.log(`Confidence: ${mood.confidence.toFixed(2)}`);

if (mood.emotionalTone) {
  console.log(`Emotional tone: ${mood.emotionalTone}`);
}

// ========== FOGTRAIL VISUALIZATION ==========

console.log("\n\n=== FOGTRAIL VISUALIZATION ===\n");

const trail = FogTrailVisualizer.buildFromAnalysis(
  config.domain,
  sources,
  result.contradictions,
  result.mysteries,
  undefined
);

console.log(`Nodes: ${trail.nodes.length}`);
console.log(`Edges: ${trail.edges.length}`);

const density = FogTrailVisualizer.calculateFogDensity(trail);
console.log(`Fog density: ${density.toFixed(2)} (${(density * 100).toFixed(0)}%)`);

// Interpret density
if (density < 0.3) {
  console.log("Interpretation: Mostly clear - few mysteries");
} else if (density < 0.6) {
  console.log("Interpretation: Moderate fog - significant uncertainty");
} else {
  console.log("Interpretation: Dense fog - epistemic opacity dominates");
}

// Generate visualizations
const svg = FogTrailVisualizer.toSvg(trail, 1600, 1200, undefined);
const json = FogTrailVisualizer.toJson(trail);

console.log(`\nGenerated SVG: ${svg.length} characters`);
console.log(`Generated JSON: ${json.nodes.length} nodes, ${json.edges.length} edges`);

// ========== EXPORT RESULTS ==========

console.log("\n\n=== EXPORT ===\n");

const report = `
FOGBINDER ANALYSIS REPORT
Generated: ${new Date().toISOString()}

CONFIGURATION
─────────────
Domain: ${config.domain}
Conventions: ${config.conventions.join(", ")}
Participants: ${config.participants.join(", ")}
Purpose: ${config.purpose}

SUMMARY
───────
Sources analyzed: ${sources.length}
Uncertain states: ${uncertainCount} (${(uncertainCount / sources.length * 100).toFixed(0)}%)
Contradictions: ${result.contradictions.length}
Mysteries: ${result.mysteries.length}
Mystery clusters: ${clusters.length}
Overall mood: ${mood.primary.TAG}
Fog density: ${density.toFixed(2)}

TOP CONTRADICTIONS
──────────────────
${contradictionsBySeverity.slice(0, 3).map((c, i) => `
${i + 1}. ${c.contradiction.conflictType.TAG} [${c.severity.toFixed(2)}]
   Games: ${c.contradiction.languageGames.join(", ")}
   Resolution: ${ContradictionDetector.suggestResolution(c.contradiction)}
`).join("\n")}

RESISTANCE PATTERNS
───────────────────
${Array.from(byResistance.entries()).map(([type, mysteries]) =>
  `${type}: ${mysteries.length} mysteries`
).join("\n")}

INTERPRETATION
──────────────
${density < 0.3 ? "The discourse is relatively clear with few fundamental mysteries." :
  density < 0.6 ? "Significant epistemic uncertainty exists. Further research needed." :
  "Dense epistemic fog. Many fundamental questions remain open."}

For detailed visualization, see fogtrail.svg and fogtrail.json
`.trim();

console.log(report);

// Save files (Deno example)
/*
await Deno.writeTextFile("fogtrail.svg", svg);
await Deno.writeTextFile("fogtrail.json", JSON.stringify(json, null, 2));
await Deno.writeTextFile("analysis_report.txt", report);
console.log("\n✓ Files saved: fogtrail.svg, fogtrail.json, analysis_report.txt");
*/

console.log("\n" + "=".repeat(70));
console.log("✓ ANALYSIS COMPLETE");
console.log("=".repeat(70));
```

### Key Insights

This pipeline demonstrates:
1. **Comprehensive analysis** of epistemic uncertainty
2. **Multi-dimensional output**: states, contradictions, mysteries, mood, visualization
3. **Prioritization** by severity and resistance type
4. **Actionable suggestions** for resolution and exploration
5. **Quantitative metrics** (fog density, certainty ratios)
6. **Multiple export formats** (text, SVG, JSON)

### Customization Points

- **Adjust context** for different research domains
- **Filter by severity** to focus on critical contradictions
- **Group by resistance type** to identify patterns
- **Custom layouts** in FogTrail visualization
- **Integration with Zotero** for literature reviews

### See Also

- All previous recipes in this cookbook
- [API Reference](../API.md)
- [PHILOSOPHY.md](../PHILOSOPHY.md)

---

## Appendix: Performance Tips

For large-scale analysis (100+ sources):

1. **Batch processing**: Analyze in chunks of 20-50 sources
2. **Parallel analysis**: Run multiple analyses concurrently
3. **Caching**: Store intermediate results (epistemic states, contradictions)
4. **Visualization limits**: Consider subgraph extraction for very large FogTrails
5. **JSON over SVG**: Use JSON export for programmatic processing, SVG only for display

---

**License:** GNU AGPLv3
**Project:** Fogbinder v0.1.0
