/**
 * FogTrailVisualizer.test.ts
 * Tests for epistemic network visualization
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as FogTrailVisualizer from './FogTrailVisualizer.bs.js';

Deno.test("FogTrailVisualizer - create empty trail", () => {
  const trail = FogTrailVisualizer.make("Test Trail", undefined);

  assertExists(trail);
  assertEquals(trail.metadata.title, "Test Trail");
  assertEquals(trail.nodes.length, 0);
  assertEquals(trail.edges.length, 0);
});

Deno.test("FogTrailVisualizer - add node", () => {
  const trail = FogTrailVisualizer.make("Test", undefined);

  const node = {
    id: "node1",
    label: "Test Node",
    nodeType: { TAG: "Source" },
    epistemicState: undefined,
    x: 100.0,
    y: 100.0,
  };

  const updatedTrail = FogTrailVisualizer.addNode(trail, node);

  assertEquals(updatedTrail.nodes.length, 1);
  assertEquals(updatedTrail.nodes[0].id, "node1");
});

Deno.test("FogTrailVisualizer - add edge", () => {
  const trail = FogTrailVisualizer.make("Test", undefined);

  const edge = {
    source: "node1",
    target: "node2",
    edgeType: { TAG: "Supports" },
    weight: 0.8,
    label: undefined,
  };

  const updatedTrail = FogTrailVisualizer.addEdge(trail, edge);

  assertEquals(updatedTrail.edges.length, 1);
  assertEquals(updatedTrail.edges[0].source, "node1");
});

Deno.test("FogTrailVisualizer - calculate fog density", () => {
  let trail = FogTrailVisualizer.make("Test", undefined);

  // Add mix of node types
  trail = FogTrailVisualizer.addNode(trail, {
    id: "mystery1",
    label: "Mystery",
    nodeType: { TAG: "Mystery" },
    epistemicState: undefined,
    x: 0.0,
    y: 0.0,
  });

  trail = FogTrailVisualizer.addNode(trail, {
    id: "source1",
    label: "Source",
    nodeType: { TAG: "Source" },
    epistemicState: undefined,
    x: 0.0,
    y: 0.0,
  });

  const density = FogTrailVisualizer.calculateFogDensity(trail);

  assertEquals(typeof density, "number");
  assertEquals(density >= 0.0 && density <= 1.0, true);
  // Should be 0.5 (1 mystery out of 2 nodes)
});

Deno.test("FogTrailVisualizer - to JSON", () => {
  const trail = FogTrailVisualizer.make("Test", undefined);
  const json = FogTrailVisualizer.toJson(trail);

  assertExists(json);
  // JSON should be serializable
  const jsonString = JSON.stringify(json);
  assertExists(jsonString);
});

Deno.test("FogTrailVisualizer - to SVG", () => {
  let trail = FogTrailVisualizer.make("Test", undefined);

  trail = FogTrailVisualizer.addNode(trail, {
    id: "n1",
    label: "Node 1",
    nodeType: { TAG: "Source" },
    epistemicState: undefined,
    x: 100.0,
    y: 100.0,
  });

  const svg = FogTrailVisualizer.toSvg(trail, 800.0, 600.0, undefined);

  assertExists(svg);
  assertEquals(typeof svg, "string");
  assertEquals(svg.includes("<svg"), true);
  assertEquals(svg.includes("</svg>"), true);
});

Deno.test("FogTrailVisualizer - build from analysis", () => {
  const sources = ["source1", "source2"];
  const contradictions: any[] = [];
  const mysteries: any[] = [];

  const trail = FogTrailVisualizer.buildFromAnalysis(
    "Analysis Trail",
    sources,
    contradictions,
    mysteries,
    undefined
  );

  assertExists(trail);
  assertEquals(trail.metadata.title, "Analysis Trail");
  assertEquals(trail.nodes.length, 2); // Two source nodes
});

Deno.test("FogTrailVisualizer - node types have correct colors", () => {
  let trail = FogTrailVisualizer.make("Test", undefined);

  const nodeTypes = ["Source", "Concept", "Mystery", "Contradiction"];

  for (const type of nodeTypes) {
    trail = FogTrailVisualizer.addNode(trail, {
      id: `node_${type}`,
      label: type,
      nodeType: { TAG: type },
      epistemicState: undefined,
      x: 0.0,
      y: 0.0,
    });
  }

  const svg = FogTrailVisualizer.toSvg(trail, 1000.0, 800.0, undefined);

  // Check that SVG contains color definitions
  assertEquals(svg.includes("#4A90E2"), true); // Source color
  assertEquals(svg.includes("#2C3E50"), true); // Mystery color
  assertEquals(svg.includes("#E74C3C"), true); // Contradiction color
});
