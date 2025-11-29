# Fogbinder Complete Cookbook

**Auto-generated from codebase analysis**
Last updated: 2025-11-23

This cookbook contains practical recipes for using Fogbinder's epistemic ambiguity analysis features.

---

## Table of Contents

1. [Basic Analysis](#recipe-1-basic-analysis) (Beginner)
2. [Zotero Integration](#recipe-2-zotero-integration) (Intermediate)
3. [Epistemic States](#recipe-3-epistemic-states) (Intermediate)
4. [Speech Acts](#recipe-4-speech-acts) (Intermediate)
5. [Detect Contradictions](#recipe-5-detect-contradictions) (Advanced)
6. [Mood Scoring](#recipe-6-mood-scoring) (Intermediate)
7. [Mystery Clustering](#recipe-7-mystery-clustering) (Advanced)
8. [FogTrail Visualization](#recipe-8-fogtrail-visualization) (Advanced)
9. [Full Analysis Pipeline](#recipe-9-full-analysis-pipeline) (Advanced)

---

## Recipe 1: Basic Analysis

**Difficulty:** Beginner
**Category:** Getting Started
**Time:** 5 minutes

### Description

Perform a basic Fogbinder analysis on a collection of research sources to identify epistemic ambiguity.

### Ingredients

- Array of source texts (strings)
- Language game context (domain, conventions, participants, purpose)

### Steps

1. Import the Fogbinder module
2. Define your language game context
3. Pass sources and context to the analyze function
4. Inspect the results

### Code

```typescript
import * as Fogbinder from './src/Fogbinder.bs.js';

// Define language game context
const context = {
  domain: "Philosophy of Mind",
  conventions: ["phenomenological", "analytic"],
  participants: ["philosophers", "cognitive scientists"],
  purpose: "Understanding consciousness"
};

// Sources to analyze
const sources = [
  "Consciousness is fundamentally mysterious and may resist scientific explanation.",
  "Neural correlates provide a complete account of conscious experience.",
  "The hard problem of consciousness remains unsolved."
];

// Perform analysis
const result = Fogbinder.analyze(sources, context, undefined);

// Inspect results
console.log("Contradictions:", result.contradictions);
console.log("Mysteries:", result.mysteries);
console.log("Mood:", result.overallMood);
```

### Notes

- The language game context is crucial for detecting contradictions (same words, different games)
- Results include epistemic states, contradictions, mysteries, and mood analysis
- `undefined` parameter allows for optional configuration

### See Also

- [Recipe 3: Epistemic States](#recipe-3-epistemic-states)
- [Recipe 9: Full Analysis Pipeline](#recipe-9-full-analysis-pipeline)

---

## Recipe 2: Zotero Integration

**Difficulty:** Intermediate
**Category:** Integration
**Time:** 15 minutes

### Description

Extract citations from Zotero collections and analyze them with Fogbinder.

### Ingredients

- Zotero collection ID
- Fogbinder analysis pipeline
- ZoteroBindings module

### Steps

1. Import ZoteroBindings module
2. Fetch items from a Zotero collection
3. Extract citation text using `extractCitations`
4. Run Fogbinder analysis on extracted text
5. Tag items with analysis results
6. Create FogTrail visualization notes

### Code

```typescript
import * as ZoteroBindings from './src/zotero/ZoteroBindings.bs.js';
import * as Fogbinder from './src/Fogbinder.bs.js';
import * as FogTrailVisualizer from './src/engine/FogTrailVisualizer.bs.js';

async function analyzeZoteroCollection(collectionId: string) {
  // Fetch collections
  const collections = await ZoteroBindings.getCollections();

  // Find target collection
  const collection = collections.find(c => c.id === collectionId);

  if (!collection) {
    console.error("Collection not found");
    return;
  }

  // Extract citations
  const citations = ZoteroBindings.extractCitations(collection);

  // Define context
  const context = {
    domain: collection.name,
    conventions: ["academic"],
    participants: ["researchers"],
    purpose: "Literature review"
  };

  // Analyze
  const result = Fogbinder.analyze(citations, context, undefined);

  // Tag items with contradictions
  for (const contradiction of result.contradictions) {
    // Extract item IDs from sources (simplified)
    for (const item of collection.items) {
      await ZoteroBindings.tagWithAnalysis(item.id, "contradiction");
    }
  }

  // Create FogTrail visualization
  const trail = FogTrailVisualizer.buildFromAnalysis(
    collection.name,
    citations,
    result.contradictions,
    result.mysteries,
    undefined
  );

  const svg = FogTrailVisualizer.toSvg(trail, 1200, 800, undefined);

  // Save as note
  await ZoteroBindings.createFogTrailNote(collection.items[0].id, svg);

  return result;
}

// Usage
analyzeZoteroCollection("my-collection-id").then(result => {
  console.log("Analysis complete:", result);
});
```

### Notes

- Zotero integration requires the Zotero API to be available
- FogTrail visualizations are saved as HTML notes in Zotero
- Tags follow format: `fogbinder:{analysisType}`

### See Also

- [Recipe 8: FogTrail Visualization](#recipe-8-fogtrail-visualization)
- [Recipe 9: Full Analysis Pipeline](#recipe-9-full-analysis-pipeline)

---

## Recipe 3: Epistemic States

**Difficulty:** Intermediate
**Category:** Core Concepts
**Time:** 10 minutes

### Description

Work with epistemic states to model uncertainty and ambiguity in knowledge claims.

### Ingredients

- EpistemicState module
- Language game context
- Evidence array

### Steps

1. Import EpistemicState module
2. Create epistemic states with different certainty levels
3. Merge multiple epistemic states
4. Analyze resulting state

### Code

```typescript
import * as EpistemicState from './src/core/EpistemicState.bs.js';

const context = {
  domain: "Quantum Mechanics",
  conventions: ["Copenhagen interpretation"],
  participants: ["physicists"],
  purpose: "Understanding measurement problem"
};

// Create Known state
const knownState = EpistemicState.make(
  { TAG: "Known" },
  context,
  ["Wave function collapses upon measurement"],
  undefined
);

// Create Mysterious state
const mysteriousState = EpistemicState.make(
  { TAG: "Mysterious" },
  context,
  ["What causes wave function collapse?"],
  undefined
);

// Create Ambiguous state with multiple interpretations
const ambiguousState = EpistemicState.make(
  { TAG: "Ambiguous", _0: [
    "Many-worlds interpretation",
    "Copenhagen interpretation",
    "Pilot wave theory",
    "Objective collapse theory"
  ]},
  context,
  ["Measurement problem has multiple solutions"],
  undefined
);

// Create Probable state
const probableState = EpistemicState.make(
  { TAG: "Probable", _0: 0.75 },
  context,
  ["Decoherence explains apparent collapse"],
  undefined
);

// Merge states
const mergedState = EpistemicState.merge(mysteriousState, probableState);

console.log("Merged certainty:", mergedState.certainty);
console.log("Combined evidence:", mergedState.evidence);

// Check if state is uncertain
const isUncertain = EpistemicState.isUncertain(ambiguousState);
console.log("Is ambiguous state uncertain?", isUncertain); // true
```

### Notes

- Six epistemic modalities: Known, Probable, Vague, Ambiguous, Mysterious, Contradictory
- Ambiguous states require 4+ interpretations (threshold is configurable)
- Merging states combines evidence and adjusts certainty
- Uncertain states include: Vague, Ambiguous, Mysterious

### See Also

- [Recipe 7: Mystery Clustering](#recipe-7-mystery-clustering)
- [Recipe 1: Basic Analysis](#recipe-1-basic-analysis)

---

## Recipe 4: Speech Acts

**Difficulty:** Intermediate
**Category:** Core Concepts
**Time:** 10 minutes

### Description

Use J.L. Austin's speech act theory to analyze illocutionary force and felicity conditions.

### Ingredients

- SpeechAct module
- Language game context
- Utterances to analyze

### Steps

1. Import SpeechAct module
2. Create speech acts with different illocutionary forces
3. Check felicity conditions
4. Detect conflicts between speech acts

### Code

```typescript
import * as SpeechAct from './src/core/SpeechAct.bs.js';

const context = {
  domain: "Academic Discourse",
  conventions: ["peer review", "citation norms"],
  participants: ["researchers", "reviewers"],
  purpose: "Knowledge production"
};

// Assertive speech act (stating facts)
const assertive = SpeechAct.make(
  "The results demonstrate a significant correlation.",
  { TAG: "Assertive", _0: "empirical claim" },
  context,
  undefined
);

// Commissive speech act (making promises/commitments)
const commissive = SpeechAct.make(
  "We will replicate these findings in future work.",
  { TAG: "Commissive", _0: "research promise" },
  context,
  undefined
);

// Directive speech act (commanding/requesting)
const directive = SpeechAct.make(
  "Reviewers must disclose conflicts of interest.",
  { TAG: "Directive", _0: "ethical requirement" },
  context,
  undefined
);

// Expressive speech act (expressing attitudes)
const expressive = SpeechAct.make(
  "We thank the anonymous reviewers for their insightful comments.",
  { TAG: "Expressive", _0: "gratitude" },
  context,
  undefined
);

// Declaration speech act (creating new states of affairs)
const declaration = SpeechAct.make(
  "I hereby declare this paper accepted for publication.",
  { TAG: "Declaration", _0: "editorial decision" },
  context,
  undefined
);

// Check felicity (was the speech act successful?)
const isFelicitous = SpeechAct.isFelicitous(assertive);
console.log("Is assertion felicitous?", isFelicitous);

// Detect conflicts between speech acts
const conflict = SpeechAct.conflicts(assertive, directive);
console.log("Do assertive and directive conflict?", conflict);
```

### Notes

- Five illocutionary forces: Assertive, Directive, Commissive, Expressive, Declaration
- Felicity conditions determine if speech act succeeds in its purpose
- Conflicts arise when speech acts have incompatible forces or purposes
- Speech acts are foundational to mood scoring (Recipe 6)

### See Also

- [Recipe 6: Mood Scoring](#recipe-6-mood-scoring)
- [PHILOSOPHY.md](../PHILOSOPHY.md) for J.L. Austin's theory

---

## Recipe 5: Detect Contradictions

**Difficulty:** Advanced
**Category:** Analysis
**Time:** 15 minutes

### Description

Detect language game contradictions across sources using ContradictionDetector.

### Ingredients

- ContradictionDetector module
- Multiple source texts with potential conflicts
- Language game context

### Steps

1. Import ContradictionDetector module
2. Define language game context
3. Detect contradictions across sources
4. Classify contradiction types
5. Get resolution suggestions

### Code

```typescript
import * as ContradictionDetector from './src/engine/ContradictionDetector.bs.js';

const context = {
  domain: "Political Economy",
  conventions: ["neoclassical", "marxist"],
  participants: ["economists"],
  purpose: "Understanding value"
};

// Sources with language game conflicts
const sources = [
  "Value is determined by marginal utility and individual preferences.",
  "Value is determined by socially necessary labor time.",
  "Markets efficiently allocate resources through price signals.",
  "Markets systematically exploit labor and create inequality."
];

// Detect contradictions
const contradictions = ContradictionDetector.detect(sources, context);

console.log(`Found ${contradictions.length} contradictions:`);

for (const contradiction of contradictions) {
  console.log("\nContradiction:");
  console.log("  Sources:", contradiction.sources);
  console.log("  Type:", contradiction.conflictType.TAG);
  console.log("  Games:", contradiction.languageGames);

  // Get resolution suggestion
  const suggestion = ContradictionDetector.suggestResolution(contradiction);
  console.log("  Resolution:", suggestion);

  // Check severity
  const severity = ContradictionDetector.getSeverity(contradiction);
  console.log("  Severity:", severity);
}

// Example output:
// Contradiction:
//   Sources: ["Value is determined by...", "Value is determined by..."]
//   Type: SameWordsDifferentGames
//   Games: ["neoclassical", "marxist"]
//   Resolution: "Clarify which language game (neoclassical, marxist) is being used..."
//   Severity: 0.8
```

### Notes

- Five conflict types:
  - `SameWordsDifferentGames`: Same terminology, different meanings
  - `IncommensurableFrameworks`: Incompatible conceptual frameworks
  - `PragmaticConflict`: Conflicting purposes/goals
  - `ImplicitNormClash`: Contradictory unstated assumptions
  - `FormOfLifeDissonance`: Fundamentally different worldviews
- Severity ranges from 0.0 (trivial) to 1.0 (severe)
- Resolution suggestions consider pragmatic context, not just logical consistency

### See Also

- [Recipe 1: Basic Analysis](#recipe-1-basic-analysis)
- [PHILOSOPHY.md](../PHILOSOPHY.md) for Wittgenstein's language games

---

## Recipe 6: Mood Scoring

**Difficulty:** Intermediate
**Category:** Analysis
**Time:** 10 minutes

### Description

Analyze emotional tone and speech act mood using MoodScorer (NOT sentiment analysis).

### Ingredients

- MoodScorer module
- Text to analyze
- Language game context

### Steps

1. Import MoodScorer module
2. Analyze text for mood (based on speech acts)
3. Get mood descriptor
4. Compare moods across texts

### Code

```typescript
import * as MoodScorer from './src/engine/MoodScorer.bs.js';

const context = {
  domain: "Literary Criticism",
  conventions: ["close reading"],
  participants: ["critics", "scholars"],
  purpose: "Textual interpretation"
};

// Analyze different text moods
const assertiveText = "The novel demonstrates a critique of industrial capitalism.";
const moodAssertive = MoodScorer.analyze(assertiveText, context);

const expressiveText = "This passage evokes a profound sense of melancholy.";
const moodExpressive = MoodScorer.analyze(expressiveText, context);

const directiveText = "Readers must consider the historical context.";
const moodDirective = MoodScorer.analyze(directiveText, context);

// Get descriptive labels
console.log("Assertive mood:", MoodScorer.getDescriptor(moodAssertive));
console.log("Expressive mood:", MoodScorer.getDescriptor(moodExpressive));
console.log("Directive mood:", MoodScorer.getDescriptor(moodDirective));

// Compare moods
const comparison = MoodScorer.compare(moodAssertive, moodExpressive);
console.log("Mood comparison:", comparison);

// Check confidence
console.log("Assertive confidence:", moodAssertive.confidence);
console.log("Expressive confidence:", moodExpressive.confidence);

// Check emotional tone (if detected)
if (moodExpressive.emotionalTone) {
  console.log("Emotional tone:", moodExpressive.emotionalTone);
  // Possible tones: melancholic, enthusiastic, skeptical, neutral
}

// Check felicity
console.log("Is expressive mood felicitous?", moodExpressive.felicitous);
```

### Notes

- Mood is based on **speech act theory**, NOT sentiment analysis
- Primary mood reflects illocutionary force (Assertive, Directive, etc.)
- Secondary mood captures additional nuances
- Emotional tone is separate from speech act mood
- Confidence ranges from 0.0 to 1.0

### See Also

- [Recipe 4: Speech Acts](#recipe-4-speech-acts)
- [API.md](../API.md#moodscorer) for full API reference

---

## Recipe 7: Mystery Clustering

**Difficulty:** Advanced
**Category:** Analysis
**Time:** 15 minutes

### Description

Cluster epistemic resistance and mysteries using MysteryClustering.

### Ingredients

- MysteryClustering module
- EpistemicState module
- Mysterious or uncertain content
- Language game context

### Steps

1. Import MysteryClustering and EpistemicState modules
2. Create epistemic states for mysterious content
3. Create mystery objects
4. Cluster mysteries by resistance type
5. Get exploration suggestions

### Code

```typescript
import * as MysteryClustering from './src/engine/MysteryClustering.bs.js';
import * as EpistemicState from './src/core/EpistemicState.bs.js';

const context = {
  domain: "Philosophy of Mind",
  conventions: ["phenomenological"],
  participants: ["philosophers"],
  purpose: "Understanding subjective experience"
};

// Create mysterious epistemic states
const qualiaMystery = EpistemicState.make(
  { TAG: "Mysterious" },
  context,
  ["What is it like to see red?"],
  undefined
);

const consciousnessMystery = EpistemicState.make(
  { TAG: "Mysterious" },
  context,
  ["Why is there something it is like to be conscious?"],
  undefined
);

const zombieMystery = EpistemicState.make(
  { TAG: "Vague" },
  context,
  ["Could philosophical zombies exist?"],
  undefined
);

// Create mystery objects
const mystery1 = MysteryClustering.make(
  "What is it like to see red?",
  qualiaMystery,
  undefined
);

const mystery2 = MysteryClustering.make(
  "Why is there something it is like to be conscious?",
  consciousnessMystery,
  undefined
);

const mystery3 = MysteryClustering.make(
  "Could philosophical zombies exist?",
  zombieMystery,
  undefined
);

// Check if states are mysteries
console.log("Is qualia state a mystery?", MysteryClustering.isMystery(qualiaMystery)); // true
console.log("Is zombie state a mystery?", MysteryClustering.isMystery(zombieMystery)); // true

// Cluster mysteries
const mysteries = [mystery1, mystery2, mystery3];
const clusters = MysteryClustering.cluster(mysteries);

console.log(`Created ${clusters.length} mystery clusters`);

// Analyze individual mysteries
for (const mystery of mysteries) {
  console.log("\nMystery:", mystery.content);
  console.log("  Opacity level:", mystery.opacityLevel);
  console.log("  Resistance type:", mystery.resistanceType.TAG);
  console.log("  Descriptor:", MysteryClustering.getOpacityDescriptor(mystery));
  console.log("  Suggestion:", MysteryClustering.suggestExploration(mystery));
}

// Opacity levels: Transparent, Translucent, Opaque, ImpenetrableMystery
// Resistance types: LinguisticResistance, ConceptualResistance, LogicalResistance, PhenomenologicalResistance
```

### Notes

- Mystery states include: Mysterious, Vague, Ambiguous (with 4+ interpretations)
- Four opacity levels indicate degree of epistemic resistance
- Four resistance types categorize the nature of the mystery
- Clustering groups mysteries by resistance type and opacity
- Exploration suggestions provide pragmatic guidance

### See Also

- [Recipe 3: Epistemic States](#recipe-3-epistemic-states)
- [PHILOSOPHY.md](../PHILOSOPHY.md) for epistemic resistance theory

---

## Recipe 8: FogTrail Visualization

**Difficulty:** Advanced
**Category:** Visualization
**Time:** 20 minutes

### Description

Create network visualizations of epistemic opacity using FogTrailVisualizer.

### Ingredients

- FogTrailVisualizer module
- Analysis results (sources, contradictions, mysteries)
- SVG or JSON export format

### Steps

1. Import FogTrailVisualizer module
2. Build trail from analysis results
3. Add custom nodes and edges
4. Calculate fog density
5. Export as SVG or JSON

### Code

```typescript
import * as FogTrailVisualizer from './src/engine/FogTrailVisualizer.bs.js';

// Sources from analysis
const sources = [
  "Consciousness is emergent from neural activity.",
  "Consciousness is fundamental and irreducible.",
  "The hard problem remains unsolved."
];

const contradictions = [
  {
    sources: [sources[0], sources[1]],
    conflictType: { TAG: "SameWordsDifferentGames" },
    languageGames: ["physicalist", "dualist"],
    severity: 0.8
  }
];

const mysteries = [
  {
    content: "The hard problem remains unsolved.",
    opacityLevel: "Opaque",
    resistanceType: { TAG: "ConceptualResistance" }
  }
];

// Build trail from analysis
let trail = FogTrailVisualizer.buildFromAnalysis(
  "Consciousness Analysis",
  sources,
  contradictions,
  mysteries,
  undefined
);

console.log("Initial trail nodes:", trail.nodes.length);
console.log("Initial trail edges:", trail.edges.length);

// Add custom node
const customNode = {
  id: "custom1",
  label: "Integrated Information Theory",
  nodeType: { TAG: "Concept" },
  epistemicState: undefined,
  x: 500.0,
  y: 300.0
};

trail = FogTrailVisualizer.addNode(trail, customNode);

// Add custom edge
const customEdge = {
  source: "custom1",
  target: trail.nodes[0].id,
  edgeType: { TAG: "Relates" },
  weight: 0.6,
  label: "attempts to solve"
};

trail = FogTrailVisualizer.addEdge(trail, customEdge);

// Calculate fog density (ratio of mystery nodes)
const density = FogTrailVisualizer.calculateFogDensity(trail);
console.log("Fog density:", density);
// Higher density = more epistemic uncertainty

// Export as SVG
const svg = FogTrailVisualizer.toSvg(trail, 1200, 800, undefined);
console.log("SVG length:", svg.length);

// Save SVG to file (in Node.js or Deno)
// await Deno.writeTextFile("fogtrail.svg", svg);

// Export as JSON for further processing
const json = FogTrailVisualizer.toJson(trail);
console.log("JSON structure:", Object.keys(json));

// Node types: Source, Concept, Mystery, Contradiction
// Edge types: Supports, Contradicts, Relates, Unclear
// Colors: Source (#4A90E2), Mystery (#2C3E50), Contradiction (#E74C3C), Concept (#27AE60)
```

### Notes

- FogTrail is a network graph of epistemic relationships
- Nodes represent: sources, concepts, mysteries, contradictions
- Edges represent: support, contradiction, relation, uncertainty
- Fog density measures epistemic opacity (0.0 = clear, 1.0 = completely opaque)
- SVG output can be embedded in Zotero notes or documentation
- JSON export enables custom visualization with D3.js, Cytoscape, etc.

### See Also

- [Recipe 2: Zotero Integration](#recipe-2-zotero-integration)
- [Recipe 9: Full Analysis Pipeline](#recipe-9-full-analysis-pipeline)

---

## Recipe 9: Full Analysis Pipeline

**Difficulty:** Advanced
**Category:** Complete Workflow
**Time:** 30 minutes

### Description

Execute the complete Fogbinder analysis pipeline from sources to visualization.

### Ingredients

- All Fogbinder modules
- Source texts
- Language game context
- Output destination (file system, Zotero, etc.)

### Steps

1. Import all necessary modules
2. Define comprehensive language game context
3. Prepare source texts
4. Run full analysis
5. Process contradictions
6. Cluster mysteries
7. Generate FogTrail visualization
8. Export all results

### Code

```typescript
import * as Fogbinder from './src/Fogbinder.bs.js';
import * as EpistemicState from './src/core/EpistemicState.bs.js';
import * as SpeechAct from './src/core/SpeechAct.bs.js';
import * as ContradictionDetector from './src/engine/ContradictionDetector.bs.js';
import * as MoodScorer from './src/engine/MoodScorer.bs.js';
import * as MysteryClustering from './src/engine/MysteryClustering.bs.js';
import * as FogTrailVisualizer from './src/engine/FogTrailVisualizer.bs.js';

// 1. Define comprehensive context
const context = {
  domain: "Philosophy of Science",
  conventions: [
    "logical empiricism",
    "kuhnian paradigms",
    "social constructivism",
    "critical realism"
  ],
  participants: [
    "philosophers of science",
    "practicing scientists",
    "science studies scholars"
  ],
  purpose: "Understanding scientific change and theory choice"
};

// 2. Prepare sources
const sources = [
  "Science progresses through accumulation of verified facts.",
  "Scientific revolutions involve incommensurable paradigm shifts.",
  "Scientific knowledge is socially constructed.",
  "Science discovers mind-independent reality.",
  "Theory choice is determined by rational criteria.",
  "Theory choice involves subjective values and social factors.",
  "Observation is theory-laden and paradigm-dependent.",
  "The demarcation problem distinguishes science from non-science."
];

// 3. Run full Fogbinder analysis
console.log("Running full Fogbinder analysis...\n");
const result = Fogbinder.analyze(sources, context, undefined);

// 4. Process epistemic states
console.log("=== EPISTEMIC STATES ===");
for (let i = 0; i < result.epistemicStates.length; i++) {
  const state = result.epistemicStates[i];
  console.log(`\nSource ${i + 1}:`, sources[i].substring(0, 50) + "...");
  console.log("  Certainty:", state.certainty.TAG);
  console.log("  Is uncertain:", EpistemicState.isUncertain(state));
}

// 5. Analyze contradictions
console.log("\n=== CONTRADICTIONS ===");
console.log(`Found ${result.contradictions.length} contradictions:\n`);

for (const contradiction of result.contradictions) {
  console.log("Conflict Type:", contradiction.conflictType.TAG);
  console.log("Language Games:", contradiction.languageGames);
  console.log("Severity:", ContradictionDetector.getSeverity(contradiction));
  console.log("Resolution:", ContradictionDetector.suggestResolution(contradiction));
  console.log("Sources involved:");
  for (const source of contradiction.sources) {
    console.log("  -", source.substring(0, 60) + "...");
  }
  console.log();
}

// 6. Cluster mysteries
console.log("=== MYSTERIES ===");
console.log(`Found ${result.mysteries.length} mysteries:\n`);

const mysteryClusters = MysteryClustering.cluster(result.mysteries);
console.log(`Clustered into ${mysteryClusters.length} groups:\n`);

for (const mystery of result.mysteries) {
  console.log("Content:", mystery.content);
  console.log("  Opacity:", mystery.opacityLevel);
  console.log("  Resistance:", mystery.resistanceType.TAG);
  console.log("  Descriptor:", MysteryClustering.getOpacityDescriptor(mystery));
  console.log("  Exploration:", MysteryClustering.suggestExploration(mystery));
  console.log();
}

// 7. Analyze overall mood
console.log("=== MOOD ANALYSIS ===");
console.log("Primary mood:", result.overallMood.primary.TAG);
console.log("Descriptor:", MoodScorer.getDescriptor(result.overallMood));
console.log("Felicitous:", result.overallMood.felicitous);
console.log("Confidence:", result.overallMood.confidence);
if (result.overallMood.emotionalTone) {
  console.log("Emotional tone:", result.overallMood.emotionalTone);
}

// 8. Generate FogTrail visualization
console.log("\n=== FOGTRAIL VISUALIZATION ===");

const trail = FogTrailVisualizer.buildFromAnalysis(
  "Philosophy of Science Analysis",
  sources,
  result.contradictions,
  result.mysteries,
  undefined
);

console.log("Nodes:", trail.nodes.length);
console.log("Edges:", trail.edges.length);
console.log("Fog density:", FogTrailVisualizer.calculateFogDensity(trail));

// Export SVG
const svg = FogTrailVisualizer.toSvg(trail, 1400, 1000, undefined);
console.log("SVG generated:", svg.length, "characters");

// Export JSON
const json = FogTrailVisualizer.toJson(trail);
console.log("JSON exported with", json.nodes.length, "nodes");

// 9. Save results (example for Deno)
/*
await Deno.writeTextFile("fogtrail.svg", svg);
await Deno.writeTextFile("fogtrail.json", JSON.stringify(json, null, 2));
await Deno.writeTextFile("analysis.txt", `
FOGBINDER ANALYSIS REPORT

Domain: ${context.domain}
Sources analyzed: ${sources.length}
Contradictions found: ${result.contradictions.length}
Mysteries identified: ${result.mysteries.length}
Overall mood: ${result.overallMood.primary.TAG}
Fog density: ${FogTrailVisualizer.calculateFogDensity(trail)}

For detailed results, see fogtrail.svg and fogtrail.json
`);
*/

console.log("\n✓ Full analysis pipeline complete!");
```

### Notes

- This pipeline demonstrates all major Fogbinder features
- Adjust context to match your research domain
- Results can be exported to files, Zotero, or custom databases
- Consider running this as a batch process for large literature reviews
- FogTrail visualization helps identify epistemic bottlenecks

### See Also

- All other recipes in this cookbook
- [API.md](../API.md) for complete API reference
- [PHILOSOPHY.md](../PHILOSOPHY.md) for theoretical foundations
- [DEVELOPMENT.md](../DEVELOPMENT.md) for extending the pipeline

---

## Appendix: Cookbook Generation

This cookbook was automatically generated by analyzing the Fogbinder codebase. The generator:

1. Scans `src/` for available modules and functions
2. Analyzes function signatures and documentation
3. Generates practical recipes based on common use cases
4. Updates automatically when new features are added

To regenerate cookbooks:

```bash
deno run --allow-read --allow-write scripts/generate_cookbooks.ts
```

---

**Last Updated:** 2025-11-23
**Fogbinder Version:** 0.1.0
**License:** GNU AGPLv3
