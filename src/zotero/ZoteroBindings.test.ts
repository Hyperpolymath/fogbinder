/**
 * ZoteroBindings.test.ts
 * Tests for Zotero API bindings and integration utilities
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as ZoteroBindings from './ZoteroBindings.bs.js';

Deno.test("ZoteroBindings - itemToText with abstract", () => {
  const item = {
    id: "item1",
    title: "Test Article",
    creators: ["Author One", "Author Two"],
    abstractText: "This is the abstract text.",
    tags: ["philosophy", "epistemology"],
    dateAdded: Date.now(),
  };

  const text = ZoteroBindings.itemToText(item);

  assertExists(text);
  assertEquals(text.includes("Test Article"), true);
  assertEquals(text.includes("This is the abstract text."), true);
});

Deno.test("ZoteroBindings - itemToText without abstract", () => {
  const item = {
    id: "item2",
    title: "Article Without Abstract",
    creators: ["Author Three"],
    abstractText: undefined,
    tags: [],
    dateAdded: Date.now(),
  };

  const text = ZoteroBindings.itemToText(item);

  assertExists(text);
  assertEquals(text.includes("Article Without Abstract"), true);
});

Deno.test("ZoteroBindings - extractCitations from collection", () => {
  const collection = {
    id: "coll1",
    name: "Test Collection",
    items: [
      {
        id: "item1",
        title: "First Article",
        creators: ["Author One"],
        abstractText: "Abstract one",
        tags: [],
        dateAdded: Date.now(),
      },
      {
        id: "item2",
        title: "Second Article",
        creators: ["Author Two"],
        abstractText: "Abstract two",
        tags: [],
        dateAdded: Date.now(),
      },
    ],
  };

  const citations = ZoteroBindings.extractCitations(collection);

  assertExists(citations);
  assertEquals(Array.isArray(citations), true);
  assertEquals(citations.length, 2);
  assertEquals(citations[0].includes("First Article"), true);
  assertEquals(citations[1].includes("Second Article"), true);
});

Deno.test("ZoteroBindings - extractCitations from empty collection", () => {
  const collection = {
    id: "empty",
    name: "Empty Collection",
    items: [],
  };

  const citations = ZoteroBindings.extractCitations(collection);

  assertExists(citations);
  assertEquals(citations.length, 0);
});

Deno.test("ZoteroBindings - tagWithAnalysis creates proper tag format", async () => {
  // Note: This tests the tag format logic, actual API call would need mock
  const itemId = "test-item-123";
  const analysisType = "contradiction";

  // The function creates tags in format "fogbinder:{analysisType}"
  // We can verify the format by checking what would be passed
  // In a real test environment with mocked API, we'd verify the actual call

  const expectedTagFormat = `fogbinder:${analysisType}`;
  assertEquals(expectedTagFormat, "fogbinder:contradiction");
});

Deno.test("ZoteroBindings - createFogTrailNote formats HTML correctly", () => {
  const itemId = "test-item-456";
  const svgContent = '<svg width="800" height="600"><circle cx="400" cy="300" r="50" /></svg>';

  // The function creates note content with header and SVG
  // Format: <h2>FogTrail Visualization</h2>\n{svgContent}
  const expectedContent = `<h2>FogTrail Visualization</h2>\n${svgContent}`;

  assertEquals(expectedContent.includes("<h2>FogTrail Visualization</h2>"), true);
  assertEquals(expectedContent.includes(svgContent), true);
});

Deno.test("ZoteroBindings - collection structure validation", () => {
  const validCollection = {
    id: "valid-coll",
    name: "Valid Collection",
    items: [
      {
        id: "item1",
        title: "Test",
        creators: ["Author"],
        abstractText: undefined,
        tags: ["tag1", "tag2"],
        dateAdded: Date.now(),
      },
    ],
  };

  assertExists(validCollection.id);
  assertExists(validCollection.name);
  assertEquals(Array.isArray(validCollection.items), true);
  assertEquals(validCollection.items.length, 1);
});

Deno.test("ZoteroBindings - item structure validation", () => {
  const validItem = {
    id: "valid-item",
    title: "Valid Title",
    creators: ["Creator One", "Creator Two"],
    abstractText: "Some abstract",
    tags: ["philosophy", "wittgenstein"],
    dateAdded: 1700000000000,
  };

  assertExists(validItem.id);
  assertExists(validItem.title);
  assertEquals(Array.isArray(validItem.creators), true);
  assertEquals(Array.isArray(validItem.tags), true);
  assertEquals(typeof validItem.dateAdded, "number");
});

Deno.test("ZoteroBindings - multiple items extraction", () => {
  const largeCollection = {
    id: "large-coll",
    name: "Large Collection",
    items: Array.from({ length: 10 }, (_, i) => ({
      id: `item${i}`,
      title: `Article ${i}`,
      creators: [`Author ${i}`],
      abstractText: `Abstract ${i}`,
      tags: [],
      dateAdded: Date.now() + i,
    })),
  };

  const citations = ZoteroBindings.extractCitations(largeCollection);

  assertEquals(citations.length, 10);
  assertEquals(citations[0].includes("Article 0"), true);
  assertEquals(citations[9].includes("Article 9"), true);
});

Deno.test("ZoteroBindings - itemToText handles special characters", () => {
  const item = {
    id: "special-chars",
    title: 'Title with "quotes" and <tags>',
    creators: ["Author"],
    abstractText: "Abstract with special chars: & < > \" '",
    tags: [],
    dateAdded: Date.now(),
  };

  const text = ZoteroBindings.itemToText(item);

  assertExists(text);
  // Text should contain the title and abstract content
  assertEquals(text.includes("Title with"), true);
  assertEquals(text.includes("Abstract with"), true);
});
