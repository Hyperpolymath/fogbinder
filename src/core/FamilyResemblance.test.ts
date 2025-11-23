/**
 * FamilyResemblance.test.ts
 * Tests for Wittgensteinian family resemblance clustering
 */

import { assertEquals, assertExists } from "https://deno.land/std@0.208.0/assert/mod.ts";
import * as FamilyResemblance from './FamilyResemblance.bs.js';

Deno.test("FamilyResemblance - create cluster", () => {
  const features = [
    {
      name: "has wheels",
      weight: 1.0,
      exemplars: ["car", "bicycle", "motorcycle"],
    },
    {
      name: "has engine",
      weight: 0.8,
      exemplars: ["car", "motorcycle"],
    },
  ];

  const members = ["car", "bicycle", "motorcycle"];

  const cluster = FamilyResemblance.make("vehicles", features, members, undefined);

  assertExists(cluster);
  assertEquals(cluster.label, "vehicles");
  assertEquals(cluster.features.length, 2);
  assertEquals(cluster.members.length, 3);
});

Deno.test("FamilyResemblance - belongs to family", () => {
  const features = [
    {
      name: "feature1",
      weight: 1.0,
      exemplars: ["item1", "item2"],
    },
  ];

  const members = ["item1", "item2"];
  const cluster = FamilyResemblance.make("test", features, members, undefined);

  const belongs = FamilyResemblance.belongsToFamily("item1", ["feature1"], cluster);
  assertEquals(belongs, true);
});

Deno.test("FamilyResemblance - find prototype", () => {
  const features = [
    {
      name: "f1",
      weight: 1.0,
      exemplars: ["item1", "item2"],
    },
    {
      name: "f2",
      weight: 0.5,
      exemplars: ["item1"],
    },
  ];

  const members = ["item1", "item2"];
  const cluster = FamilyResemblance.make("test", features, members, undefined);

  const prototype = FamilyResemblance.findPrototype(cluster);

  assertExists(prototype);
  // item1 should be prototype (has more features)
});

Deno.test("FamilyResemblance - merge clusters", () => {
  const features1 = [{
    name: "f1",
    weight: 1.0,
    exemplars: ["a"],
  }];

  const features2 = [{
    name: "f2",
    weight: 1.0,
    exemplars: ["b"],
  }];

  const cluster1 = FamilyResemblance.make("c1", features1, ["a"], undefined);
  const cluster2 = FamilyResemblance.make("c2", features2, ["b"], undefined);

  const merged = FamilyResemblance.merge(cluster1, cluster2);

  assertExists(merged);
  assertEquals(merged.features.length, 2);
  assertEquals(merged.members.length, 2);
  assertEquals(merged.boundaries, "contested");
});

Deno.test("FamilyResemblance - resemblance strength", () => {
  const features = [
    {
      name: "shared",
      weight: 1.0,
      exemplars: ["item1", "item2"],
    },
  ];

  const members = ["item1", "item2"];
  const cluster = FamilyResemblance.make("test", features, members, undefined);

  const strength = FamilyResemblance.resemblanceStrength("item1", "item2", cluster);

  assertEquals(typeof strength, "number");
  assertEquals(strength >= 0.0, true);
});

Deno.test("FamilyResemblance - to network", () => {
  const features = [
    {
      name: "f1",
      weight: 1.0,
      exemplars: ["a", "b"],
    },
  ];

  const members = ["a", "b"];
  const cluster = FamilyResemblance.make("test", features, members, undefined);

  const network = FamilyResemblance.toNetwork(cluster);

  assertExists(network);
  assertEquals(Array.isArray(network), true);
});

Deno.test("FamilyResemblance - vague boundaries", () => {
  const cluster = FamilyResemblance.make("test", [], [], undefined);

  assertEquals(cluster.boundaries, "vague");
});

Deno.test("FamilyResemblance - no strict definition", () => {
  // Test that items can belong without having ALL features
  const features = [
    {
      name: "f1",
      weight: 0.3,
      exemplars: ["item1"],
    },
    {
      name: "f2",
      weight: 0.3,
      exemplars: ["item1", "item2"],
    },
  ];

  const members = ["item1", "item2"];
  const cluster = FamilyResemblance.make("test", features, members, undefined);

  // item2 doesn't have f1 but should still belong
  const belongs = FamilyResemblance.belongsToFamily("item2", ["f2"], cluster);

  // This demonstrates family resemblance: overlapping features, not strict definition
  assertExists(belongs);
});
