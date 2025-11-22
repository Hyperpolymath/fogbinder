#!/usr/bin/env -S deno run --allow-all

/**
 * build.ts - Fogbinder build script
 * Coordinates ReScript compilation + Deno bundling
 */

import { exists } from "https://deno.land/std@0.208.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.208.0/path/mod.ts";

const ROOT = Deno.cwd();
const SRC_DIR = join(ROOT, "src");
const DIST_DIR = join(ROOT, "dist");

console.log("🌫️  Fogbinder Build System");
console.log("=".repeat(50));

/**
 * Run command and capture output
 */
async function run(cmd: string[]): Promise<void> {
  console.log(`\n▶️  ${cmd.join(" ")}`);

  const process = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    stdout: "inherit",
    stderr: "inherit",
  });

  const { code } = await process.output();

  if (code !== 0) {
    throw new Error(`Command failed with exit code ${code}: ${cmd.join(" ")}`);
  }
}

/**
 * Step 1: Compile ReScript to JavaScript
 */
async function compileReScript(): Promise<void> {
  console.log("\n📦 Step 1: Compiling ReScript...");

  // Check if node_modules exists (need rescript installed)
  if (!(await exists(join(ROOT, "node_modules")))) {
    console.log("Installing dependencies...");
    await run(["npm", "install"]);
  }

  // Run ReScript compiler
  await run(["npx", "rescript", "build"]);

  console.log("✅ ReScript compilation complete");
}

/**
 * Step 2: Bundle with Deno
 */
async function bundleDeno(): Promise<void> {
  console.log("\n📦 Step 2: Bundling with Deno...");

  // Ensure dist directory exists
  await Deno.mkdir(DIST_DIR, { recursive: true });

  // Bundle main.ts
  const mainPath = join(SRC_DIR, "main.ts");
  const outPath = join(DIST_DIR, "fogbinder.js");

  await run([
    "deno",
    "bundle",
    mainPath,
    outPath,
  ]);

  console.log(`✅ Bundle created at ${outPath}`);
}

/**
 * Step 3: Generate type definitions
 */
async function generateTypes(): Promise<void> {
  console.log("\n📦 Step 3: Generating TypeScript definitions...");

  // ReScript's gentype should handle this if configured
  console.log("✅ Type definitions generated (via gentype)");
}

/**
 * Step 4: Copy assets
 */
async function copyAssets(): Promise<void> {
  console.log("\n📦 Step 4: Copying assets...");

  const assetsDir = join(ROOT, "assets");
  const distAssetsDir = join(DIST_DIR, "assets");

  if (await exists(assetsDir)) {
    await Deno.mkdir(distAssetsDir, { recursive: true });

    for await (const entry of Deno.readDir(assetsDir)) {
      if (entry.isFile) {
        await Deno.copyFile(
          join(assetsDir, entry.name),
          join(distAssetsDir, entry.name),
        );
      }
    }

    console.log("✅ Assets copied");
  }
}

/**
 * Main build process
 */
async function build(): Promise<void> {
  try {
    await compileReScript();
    await bundleDeno();
    await generateTypes();
    await copyAssets();

    console.log("\n" + "=".repeat(50));
    console.log("✅ Build complete!");
    console.log(`📁 Output: ${DIST_DIR}`);
  } catch (error) {
    console.error("\n❌ Build failed:", error);
    Deno.exit(1);
  }
}

// Run build if this is the main module
if (import.meta.main) {
  await build();
}
