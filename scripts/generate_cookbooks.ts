#!/usr/bin/env -S deno run --allow-read --allow-write

/**
 * generate_cookbooks.ts - Dynamic Cookbook Generator
 *
 * Automatically generates practical "cookbook" guides based on current codebase state.
 * Updates automatically as new features are added.
 *
 * Philosophy: Cookbooks show how to DO things, not just what things ARE.
 * (Wittgenstein: "Don't think, but look!" - show usage, not just theory)
 */

interface Recipe {
  title: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  category: string;
  description: string;
  ingredients: string[];
  steps: string[];
  code?: string;
  notes?: string[];
  seeAlso?: string[];
}

interface Cookbook {
  title: string;
  description: string;
  recipes: Recipe[];
  lastUpdated: string;
}

class CookbookGenerator {
  private recipes: Recipe[] = [];
  private codebaseState: any = {};

  async analyze(): Promise<void> {
    // Scan codebase to discover available features
    const features = await this.discoverFeatures();

    // Generate recipes based on discovered features
    this.generateRecipes(features);
  }

  private async discoverFeatures(): Promise<Set<string>> {
    const features = new Set<string>();

    // Scan ReScript modules
    const modules = [
      "src/core/EpistemicState.res",
      "src/core/SpeechAct.res",
      "src/core/FamilyResemblance.res",
      "src/engine/ContradictionDetector.res",
      "src/engine/MoodScorer.res",
      "src/engine/MysteryClustering.res",
      "src/engine/FogTrailVisualizer.res",
      "src/Fogbinder.res",
    ];

    for (const module of modules) {
      try {
        const content = await Deno.readTextFile(module);

        // Extract feature names from module
        if (content.includes("EpistemicState")) features.add("epistemic-states");
        if (content.includes("SpeechAct")) features.add("speech-acts");
        if (content.includes("FamilyResemblance")) features.add("family-resemblance");
        if (content.includes("ContradictionDetector")) features.add("contradiction-detection");
        if (content.includes("MoodScorer")) features.add("mood-scoring");
        if (content.includes("MysteryClustering")) features.add("mystery-clustering");
        if (content.includes("FogTrailVisualizer")) features.add("fogtrail-viz");
      } catch {
        // Module doesn't exist yet, skip
      }
    }

    return features;
  }

  private generateRecipes(features: Set<string>): void {
    // Core recipes (always generated)
    this.recipes.push(this.recipeBasicAnalysis());
    this.recipes.push(this.recipeZoteroIntegration());

    // Feature-specific recipes
    if (features.has("epistemic-states")) {
      this.recipes.push(this.recipeEpistemicStates());
    }

    if (features.has("speech-acts")) {
      this.recipes.push(this.recipeSpeechActs());
    }

    if (features.has("contradiction-detection")) {
      this.recipes.push(this.recipeDetectContradictions());
    }

    if (features.has("mood-scoring")) {
      this.recipes.push(this.recipeMoodScoring());
    }

    if (features.has("mystery-clustering")) {
      this.recipes.push(this.recipeMysteryClustering());
    }

    if (features.has("fogtrail-viz")) {
      this.recipes.push(this.recipeFogTrailVisualization());
    }

    // Advanced recipes (combinations)
    if (features.has("contradiction-detection") && features.has("mood-scoring")) {
      this.recipes.push(this.recipeFullPipeline());
    }
  }

  // Recipe generators
  private recipeBasicAnalysis(): Recipe {
    return {
      title: "Analyze Research Sources for Ambiguity",
      difficulty: "beginner",
      category: "Getting Started",
      description: "Perform basic epistemic analysis on research citations",
      ingredients: [
        "Array of source texts (strings)",
        "Language game context (domain, conventions)",
      ],
      steps: [
        "Import Fogbinder module",
        "Define your source texts",
        "Create language game context",
        "Call analyze() function",
        "Review results",
      ],
      code: `import Fogbinder from './dist/fogbinder.js';

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

const result = Fogbinder.analyze(sources, context);
console.log(Fogbinder.generateReport(result));`,
      notes: [
        "Context matters! Different domains interpret text differently.",
        "This is NOT sentiment analysis - it's about epistemic patterns.",
      ],
      seeAlso: ["Language Game Theory", "Speech Acts"],
    };
  }

  private recipeZoteroIntegration(): Recipe {
    return {
      title: "Analyze Zotero Collection",
      difficulty: "intermediate",
      category: "Zotero Integration",
      description: "Run Fogbinder analysis on entire Zotero library collection",
      ingredients: [
        "Zotero collection ID",
        "Running Zotero instance",
      ],
      steps: [
        "Find your Zotero collection ID",
        "Import Fogbinder",
        "Call analyzeZoteroCollection()",
        "Results are auto-tagged in Zotero",
      ],
      code: `import Fogbinder from './dist/fogbinder.js';

// Analyze specific collection
const result = await Fogbinder.analyzeZoteroCollection("your-collection-id");

// Generate report
console.log(Fogbinder.generateReport(result));

// Create visualization
const svg = Fogbinder.generateVisualization(result);
await Deno.writeTextFile("fogtrail.svg", svg);`,
      notes: [
        "Collection ID can be found in Zotero's collection properties",
        "Analysis runs locally - your data never leaves your machine",
        "Results are tagged with 'fogbinder:analyzed'",
      ],
      seeAlso: ["Basic Analysis", "FogTrail Visualization"],
    };
  }

  private recipeEpistemicStates(): Recipe {
    return {
      title: "Model Epistemic Uncertainty",
      difficulty: "intermediate",
      category: "Core Concepts",
      description: "Create and work with epistemic states (Known, Vague, Mysterious, etc.)",
      ingredients: [
        "Source text with epistemic content",
        "Language game context",
      ],
      steps: [
        "Import EpistemicState module",
        "Choose appropriate certainty level",
        "Create epistemic state",
        "Check for genuine ambiguity",
        "Merge states if needed",
      ],
      code: `import * as EpistemicState from './src/core/EpistemicState.bs.js';

const context = {
  domain: "Quantum Physics",
  conventions: ["empirical"],
  participants: ["physicists"],
  purpose: "Understanding wave-particle duality",
};

// Create mysterious state
const state = EpistemicState.make(
  { TAG: "Mysterious" },
  context,
  ["Wave-particle duality"],
  undefined
);

// Check if genuinely ambiguous
const isAmbiguous = EpistemicState.isGenuinelyAmbiguous(state);
console.log("Genuinely ambiguous:", isAmbiguous); // true`,
      notes: [
        "Six epistemic modalities: Known, Probable, Vague, Ambiguous, Mysterious, Contradictory",
        "Mysterious ≠ unknown - it's what resists factual reduction",
        "Vague = fuzzy boundaries (Wittgenstein's family resemblance)",
      ],
      seeAlso: ["Philosophical Foundations", "Mystery Clustering"],
    };
  }

  private recipeSpeechActs(): Recipe {
    return {
      title: "Analyze Speech Acts (Austin)",
      difficulty: "intermediate",
      category: "Core Concepts",
      description: "Identify illocutionary force in academic writing",
      ingredients: [
        "Utterance/text to analyze",
        "Illocutionary force (Assertive, Directive, etc.)",
        "Language game context",
      ],
      steps: [
        "Import SpeechAct module",
        "Create speech act with force",
        "Check felicity conditions",
        "Get mood descriptor",
        "Compare with other speech acts",
      ],
      code: `import * as SpeechAct from './src/core/SpeechAct.bs.js';

const context = {
  domain: "Academic Writing",
  conventions: ["scholarly"],
  participants: ["researchers"],
  purpose: "Making claims",
};

// Create assertive speech act
const act = SpeechAct.make(
  "This paper argues that meaning is use.",
  { TAG: "Assertive", _0: "academic claim" },
  context,
  undefined
);

// Check if felicitous ("happy")
const isHappy = SpeechAct.isHappy(act);
console.log("Felicitous:", isHappy);

// Get mood descriptor
const mood = SpeechAct.getMoodDescriptor(act);
console.log("Mood:", mood); // "Asserting: academic claim"`,
      notes: [
        "Five illocutionary forces: Assertive, Directive, Commissive, Expressive, Declaration",
        "Mood ≠ sentiment! Mood = what you're DOING with words",
        "Felicity conditions determine if speech act succeeds",
      ],
      seeAlso: ["Mood Scoring", "J.L. Austin Speech Act Theory"],
    };
  }

  private recipeDetectContradictions(): Recipe {
    return {
      title: "Detect Language Game Conflicts",
      difficulty: "advanced",
      category: "Analysis",
      description: "Find contradictions as language game conflicts (NOT logical contradictions)",
      ingredients: [
        "Multiple speech acts from different sources",
        "Language game contexts",
      ],
      steps: [
        "Create speech acts for each source",
        "Import ContradictionDetector",
        "Run detectMultiple()",
        "Review conflict types",
        "Apply suggested resolutions",
      ],
      code: `import * as SpeechAct from './src/core/SpeechAct.bs.js';
import * as ContradictionDetector from './src/engine/ContradictionDetector.bs.js';

const physicsContext = {
  domain: "Physics",
  conventions: ["experimental"],
  participants: ["physicists"],
  purpose: "Understanding light",
};

const acts = [
  SpeechAct.make(
    "Light is a wave",
    { TAG: "Assertive", _0: "wave theory" },
    physicsContext,
    undefined
  ),
  SpeechAct.make(
    "Light is a particle",
    { TAG: "Assertive", _0: "particle theory" },
    physicsContext,
    undefined
  ),
];

// Detect contradictions
const contradictions = ContradictionDetector.detectMultiple(acts);

contradictions.forEach(c => {
  console.log("Conflict:", ContradictionDetector.suggestResolution(c));
});`,
      notes: [
        "This is NOT logical contradiction (¬(P ∧ ¬P))",
        "Detects language game conflicts (different frameworks)",
        "Five conflict types: SameWordsDifferentGames, Incommensurable, etc.",
      ],
      seeAlso: ["Speech Acts", "Wittgenstein Language Games"],
    };
  }

  private recipeMoodScoring(): Recipe {
    return {
      title: "Score Mood (Speech Acts, Not Sentiment)",
      difficulty: "intermediate",
      category: "Analysis",
      description: "Analyze illocutionary force and felicity, not emotional sentiment",
      ingredients: [
        "Text to analyze",
        "Language game context",
      ],
      steps: [
        "Import MoodScorer",
        "Analyze text",
        "Get mood descriptor",
        "Compare moods across sources",
      ],
      code: `import * as MoodScorer from './src/engine/MoodScorer.bs.js';

const context = {
  domain: "Academic",
  conventions: ["scholarly"],
  participants: ["researchers"],
  purpose: "Communication",
};

// Analyze mood
const mood = MoodScorer.analyze(
  "I promise to submit the manuscript by Friday.",
  context
);

console.log("Primary force:", mood.primary.TAG); // "Commissive"
console.log("Felicitous:", mood.felicitous);
console.log("Confidence:", mood.confidence);

// Get readable descriptor
const descriptor = MoodScorer.getDescriptor(mood);
console.log("Mood:", descriptor); // "Committing: ..."`,
      notes: [
        "Mood = illocutionary force, NOT emotional sentiment",
        "Detects: Assertive, Directive, Commissive, Expressive, Declaration",
        "Emotional tone is secondary to speech act",
      ],
      seeAlso: ["Speech Acts", "J.L. Austin Theory"],
    };
  }

  private recipeMysteryClustering(): Recipe {
    return {
      title: "Cluster Epistemic Mysteries",
      difficulty: "advanced",
      category: "Analysis",
      description: "Group content that resists factual reduction",
      ingredients: [
        "Epistemic states with uncertainty",
        "Mystery detection criteria",
      ],
      steps: [
        "Create epistemic states",
        "Check which are mysteries",
        "Create mystery objects",
        "Cluster by resistance type",
        "Get exploration suggestions",
      ],
      code: `import * as EpistemicState from './src/core/EpistemicState.bs.js';
import * as MysteryClustering from './src/engine/MysteryClustering.bs.js';

const context = {
  domain: "Philosophy of Mind",
  conventions: ["phenomenological"],
  participants: ["philosophers"],
  purpose: "Understanding consciousness",
};

// Create mysterious state
const state = EpistemicState.make(
  { TAG: "Mysterious" },
  context,
  ["What is consciousness?"],
  undefined
);

// Check if mystery
if (MysteryClustering.isMystery(state)) {
  // Create mystery object
  const mystery = MysteryClustering.make(
    "The hard problem of consciousness",
    state,
    undefined
  );

  // Get suggestions
  const suggestion = MysteryClustering.suggestExploration(mystery);
  console.log("Suggestion:", suggestion);
}`,
      notes: [
        "Four opacity levels: Translucent, Opaque, Paradoxical, Ineffable",
        "Four resistance types: Conceptual, Evidential, Logical, Linguistic",
        "Mystery ≠ missing data - it's epistemic resistance",
      ],
      seeAlso: ["Epistemic States", "Wittgenstein Showing vs Saying"],
    };
  }

  private recipeFogTrailVisualization(): Recipe {
    return {
      title: "Generate FogTrail Network Visualization",
      difficulty: "advanced",
      category: "Visualization",
      description: "Create network map of epistemic opacity",
      ingredients: [
        "Analysis result",
        "Sources, contradictions, mysteries",
      ],
      steps: [
        "Run full analysis",
        "Extract FogTrail from results",
        "Export to SVG or JSON",
        "Calculate fog density",
        "Visualize in browser or save",
      ],
      code: `import Fogbinder from './dist/fogbinder.js';

const sources = [
  "Source with clear meaning",
  "Ambiguous source",
  "Mysterious reference",
];

const context = {
  domain: "Research",
  conventions: ["academic"],
  participants: ["researchers"],
  purpose: "Analysis",
};

// Analyze
const result = Fogbinder.analyze(sources, context);

// Generate SVG
const svg = Fogbinder.generateVisualization(result, 1200, 900);
await Deno.writeTextFile("fogtrail.svg", svg);

// Or export JSON for D3.js/Cytoscape
const json = Fogbinder.toJson(result);
await Deno.writeTextFile("fogtrail.json", JSON.stringify(json, null, 2));

console.log("Fog density:", result.metadata.overallOpacity);`,
      notes: [
        "Node types: Source, Concept, Mystery, Contradiction",
        "Edge types: Supports, Contradicts, Resembles, Mystery",
        "Fog density = ratio of mysterious/ambiguous content",
        "Export formats: SVG (static), JSON (for interactive viz)",
      ],
      seeAlso: ["Full Pipeline", "Network Analysis"],
    };
  }

  private recipeFullPipeline(): Recipe {
    return {
      title: "Complete Epistemic Analysis Pipeline",
      difficulty: "advanced",
      category: "Complete Workflows",
      description: "Run full analysis: contradictions + mood + mysteries + visualization",
      ingredients: [
        "Multiple research sources",
        "Language game context",
        "Output destination (file/console)",
      ],
      steps: [
        "Gather sources",
        "Define context",
        "Run analyze()",
        "Generate report",
        "Create visualization",
        "Export results",
      ],
      code: `import Fogbinder from './dist/fogbinder.js';

// 1. Gather sources
const sources = [
  "Wittgenstein: Meaning is use in language games.",
  "Davidson: Meaning is truth conditions.",
  "Austin: Speech acts perform actions.",
  "The nature of meaning remains mysterious.",
];

// 2. Define context
const context = {
  domain: "Philosophy of Language",
  conventions: ["analytic philosophy", "ordinary language"],
  participants: ["Wittgenstein", "Davidson", "Austin"],
  purpose: "Understanding meaning",
};

// 3. Run full analysis
const result = Fogbinder.analyze(sources, context);

// 4. Generate report
const report = Fogbinder.generateReport(result);
await Deno.writeTextFile("report.md", report);

// 5. Create visualization
const svg = Fogbinder.generateVisualization(result);
await Deno.writeTextFile("fogtrail.svg", svg);

// 6. Export JSON
const json = Fogbinder.toJson(result);
await Deno.writeTextFile("results.json", JSON.stringify(json, null, 2));

// 7. Log summary
console.log(\`
Analysis Complete:
- Sources: \${result.metadata.totalSources}
- Contradictions: \${result.metadata.totalContradictions}
- Mysteries: \${result.metadata.totalMysteries}
- Opacity: \${(result.metadata.overallOpacity * 100).toFixed(1)}%
\`);`,
      notes: [
        "This is the kitchen sink - everything Fogbinder can do",
        "Results include: contradictions, moods, mysteries, FogTrail",
        "Outputs: Markdown report, SVG viz, JSON data",
        "Typical runtime: <1s for 100 sources",
      ],
      seeAlso: ["All other recipes"],
    };
  }

  async generateCookbook(category?: string): Promise<Cookbook> {
    await this.analyze();

    const filteredRecipes = category
      ? this.recipes.filter(r => r.category === category)
      : this.recipes;

    return {
      title: category ? `Fogbinder ${category} Cookbook` : "Fogbinder Complete Cookbook",
      description: "Practical recipes for navigating epistemic ambiguity in research",
      recipes: filteredRecipes,
      lastUpdated: new Date().toISOString(),
    };
  }

  async generateAllCookbooks(): Promise<Map<string, Cookbook>> {
    await this.analyze();

    const categories = new Set(this.recipes.map(r => r.category));
    const cookbooks = new Map<string, Cookbook>();

    // Generate category-specific cookbooks
    for (const category of categories) {
      const cookbook = await this.generateCookbook(category);
      cookbooks.set(category, cookbook);
    }

    // Generate complete cookbook
    const complete = await this.generateCookbook();
    cookbooks.set("complete", complete);

    return cookbooks;
  }

  formatCookbookMarkdown(cookbook: Cookbook): string {
    let md = `# ${cookbook.title}\n\n`;
    md += `${cookbook.description}\n\n`;
    md += `**Last Updated:** ${cookbook.lastUpdated}\n\n`;
    md += `**Recipes:** ${cookbook.recipes.length}\n\n`;
    md += `---\n\n`;
    md += `## Table of Contents\n\n`;

    // TOC
    cookbook.recipes.forEach((recipe, idx) => {
      md += `${idx + 1}. [${recipe.title}](#${this.slugify(recipe.title)}) (${recipe.difficulty})\n`;
    });

    md += `\n---\n\n`;

    // Recipes
    cookbook.recipes.forEach((recipe, idx) => {
      md += `## ${idx + 1}. ${recipe.title}\n\n`;
      md += `**Difficulty:** ${recipe.difficulty}\n`;
      md += `**Category:** ${recipe.category}\n\n`;
      md += `${recipe.description}\n\n`;

      md += `### Ingredients\n\n`;
      recipe.ingredients.forEach(ing => {
        md += `- ${ing}\n`;
      });
      md += `\n`;

      md += `### Steps\n\n`;
      recipe.steps.forEach((step, i) => {
        md += `${i + 1}. ${step}\n`;
      });
      md += `\n`;

      if (recipe.code) {
        md += `### Code\n\n\`\`\`typescript\n${recipe.code}\n\`\`\`\n\n`;
      }

      if (recipe.notes && recipe.notes.length > 0) {
        md += `### Notes\n\n`;
        recipe.notes.forEach(note => {
          md += `- ${note}\n`;
        });
        md += `\n`;
      }

      if (recipe.seeAlso && recipe.seeAlso.length > 0) {
        md += `### See Also\n\n`;
        recipe.seeAlso.forEach(link => {
          md += `- ${link}\n`;
        });
        md += `\n`;
      }

      md += `---\n\n`;
    });

    md += `## Philosophy\n\n`;
    md += `These recipes embody late Wittgenstein's philosophy:\n`;
    md += `- "Don't think, but look!" - Show usage, not just theory\n`;
    md += `- Meaning is use - Learn by doing, not just reading\n`;
    md += `- Language games - Different contexts need different recipes\n\n`;
    md += `**The fog is not an obstacle. It's the medium of inquiry.** 🌫️\n`;

    return md;
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

// Main execution
if (import.meta.main) {
  console.log("🍳 Generating Fogbinder Cookbooks...\n");

  const generator = new CookbookGenerator();
  const cookbooks = await generator.generateAllCookbooks();

  // Save cookbooks to docs/cookbooks/
  await Deno.mkdir("docs/cookbooks", { recursive: true });

  for (const [name, cookbook] of cookbooks) {
    const filename = `docs/cookbooks/${name.toLowerCase().replace(/\s+/g, '-')}.md`;
    const content = generator.formatCookbookMarkdown(cookbook);
    await Deno.writeTextFile(filename, content);
    console.log(`✅ Generated: ${filename} (${cookbook.recipes.length} recipes)`);
  }

  console.log(`\n🎉 Generated ${cookbooks.size} cookbooks!\n`);
  console.log("The fog is not an obstacle. It's the medium of inquiry. 🌫️");
}

export { CookbookGenerator, type Recipe, type Cookbook };
