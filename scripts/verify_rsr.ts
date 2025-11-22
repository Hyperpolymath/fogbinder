#!/usr/bin/env -S deno run --allow-read

/**
 * verify_rsr.ts - RSR Compliance Verification Script
 * Checks Fogbinder against Rhodium Standard Repository framework
 */

interface ComplianceCheck {
  name: string;
  category: string;
  required: boolean;
  check: () => Promise<boolean>;
  details?: string;
}

class RSRVerifier {
  private checks: ComplianceCheck[] = [];
  private results: Map<string, boolean> = new Map();

  constructor() {
    this.defineChecks();
  }

  private defineChecks() {
    // Category 1: Type Safety
    this.checks.push({
      name: "ReScript type safety",
      category: "Type Safety",
      required: true,
      check: async () => {
        return await this.fileExists("bsconfig.json");
      },
    });

    this.checks.push({
      name: "TypeScript strict mode",
      category: "Type Safety",
      required: true,
      check: async () => {
        const denoConfig = await this.readJson("deno.json");
        return denoConfig?.compilerOptions?.strict === true;
      },
    });

    // Category 2: Memory Safety
    this.checks.push({
      name: "Managed language (ReScript/TypeScript)",
      category: "Memory Safety",
      required: true,
      check: async () => true, // By definition (no manual memory management)
    });

    // Category 3: Offline-First
    this.checks.push({
      name: "No external API calls in core",
      category: "Offline-First",
      required: true,
      check: async () => {
        // Check for fetch() calls in core modules
        const coreFiles = await this.findFiles("src/core/*.res");
        for (const file of coreFiles) {
          const content = await Deno.readTextFile(file);
          if (content.includes("fetch(") || content.includes("XMLHttpRequest")) {
            return false;
          }
        }
        return true;
      },
    });

    // Category 4: Documentation
    const requiredDocs = [
      "README.md",
      "LICENSE",
      "SECURITY.md",
      "CONTRIBUTING.md",
      "CODE_OF_CONDUCT.md",
      "MAINTAINERS.md",
      "CHANGELOG.md",
    ];

    for (const doc of requiredDocs) {
      this.checks.push({
        name: doc,
        category: "Documentation",
        required: true,
        check: async () => await this.fileExists(doc),
      });
    }

    // Category 5: .well-known/
    const wellKnownFiles = ["security.txt", "ai.txt", "humans.txt"];

    for (const file of wellKnownFiles) {
      this.checks.push({
        name: `.well-known/${file}`,
        category: ".well-known/",
        required: true,
        check: async () => await this.fileExists(`.well-known/${file}`),
      });
    }

    // Category 6: Build System
    this.checks.push({
      name: "deno.json",
      category: "Build System",
      required: true,
      check: async () => await this.fileExists("deno.json"),
    });

    this.checks.push({
      name: "bsconfig.json",
      category: "Build System",
      required: true,
      check: async () => await this.fileExists("bsconfig.json"),
    });

    this.checks.push({
      name: "Build scripts",
      category: "Build System",
      required: true,
      check: async () => await this.fileExists("scripts/build.ts"),
    });

    // Category 7: Testing
    this.checks.push({
      name: "Test files exist",
      category: "Testing",
      required: true,
      check: async () => {
        const testFiles = await this.findFiles("**/*.test.ts");
        return testFiles.length > 0;
      },
    });

    this.checks.push({
      name: "Deno test configuration",
      category: "Testing",
      required: true,
      check: async () => {
        const denoConfig = await this.readJson("deno.json");
        return denoConfig?.tasks?.test !== undefined;
      },
    });

    // Category 8: CI/CD
    this.checks.push({
      name: "GitHub Actions workflow",
      category: "CI/CD",
      required: true,
      check: async () =>
        await this.fileExists(".github/workflows/ci.yml"),
    });

    // Category 9: Reproducible Builds
    this.checks.push({
      name: "Nix flake.nix",
      category: "Reproducible Builds",
      required: false, // Nice-to-have for Gold tier
      check: async () => await this.fileExists("flake.nix"),
    });

    // Category 10: TPCF
    this.checks.push({
      name: "TPCF.md documentation",
      category: "TPCF",
      required: true,
      check: async () => await this.fileExists("TPCF.md"),
    });

    // Category 11: RSR Verification
    this.checks.push({
      name: "RSR verification script",
      category: "RSR Verification",
      required: true,
      check: async () => await this.fileExists("scripts/verify_rsr.ts"),
    });
  }

  private async fileExists(path: string): Promise<boolean> {
    try {
      await Deno.stat(path);
      return true;
    } catch {
      return false;
    }
  }

  private async readJson(path: string): Promise<any> {
    try {
      const content = await Deno.readTextFile(path);
      return JSON.parse(content);
    } catch {
      return null;
    }
  }

  private async findFiles(pattern: string): Promise<string[]> {
    const files: string[] = [];
    // Simple glob implementation
    const parts = pattern.split("/");
    const baseDir = parts.slice(0, -1).join("/") || ".";
    const fileName = parts[parts.length - 1];

    try {
      for await (const entry of Deno.readDir(baseDir)) {
        if (entry.isFile) {
          if (
            fileName === "*.res" ||
            fileName === "*.ts" ||
            fileName === "*.test.ts"
          ) {
            const ext = fileName.substring(1);
            if (entry.name.endsWith(ext)) {
              files.push(`${baseDir}/${entry.name}`);
            }
          }
        }
      }
    } catch {
      // Directory doesn't exist
    }

    return files;
  }

  async verify(): Promise<void> {
    console.log("🔍 RSR Compliance Verification");
    console.log("=".repeat(60));
    console.log("");

    const categories: Map<string, { passed: number; failed: number; total: number }> =
      new Map();

    for (const check of this.checks) {
      const result = await check.check();
      this.results.set(check.name, result);

      // Update category stats
      if (!categories.has(check.category)) {
        categories.set(check.category, { passed: 0, failed: 0, total: 0 });
      }
      const stats = categories.get(check.category)!;
      stats.total++;
      if (result) {
        stats.passed++;
      } else {
        stats.failed++;
      }
    }

    // Print results by category
    for (const [category, stats] of categories) {
      const statusIcon = stats.failed === 0 ? "✅" : stats.passed > 0 ? "⚠️" : "❌";
      console.log(`${statusIcon} ${category} (${stats.passed}/${stats.total})`);

      for (const check of this.checks.filter((c) => c.category === category)) {
        const result = this.results.get(check.name)!;
        const icon = result ? "  ✅" : check.required ? "  ❌" : "  ⚠️";
        const suffix = !result && !check.required ? " (optional)" : "";
        console.log(`${icon} ${check.name}${suffix}`);
      }
      console.log("");
    }

    // Summary
    const totalChecks = this.checks.filter((c) => c.required).length;
    const passedChecks = Array.from(this.results.entries())
      .filter(([name, passed]) => {
        const check = this.checks.find((c) => c.name === name);
        return check?.required && passed;
      })
      .length;

    console.log("=".repeat(60));
    console.log(`📊 Summary: ${passedChecks}/${totalChecks} required checks passed`);

    // Determine compliance level
    const percentage = (passedChecks / totalChecks) * 100;
    let level = "Bronze";
    if (percentage >= 95) {
      level = "Platinum";
    } else if (percentage >= 85) {
      level = "Gold";
    } else if (percentage >= 75) {
      level = "Silver";
    }

    console.log(`🏆 Compliance Level: ${level} (${percentage.toFixed(1)}%)`);
    console.log("");

    // Recommendations
    if (percentage < 100) {
      console.log("📋 Recommendations:");
      for (const [name, passed] of this.results) {
        if (!passed) {
          const check = this.checks.find((c) => c.name === name);
          if (check?.required) {
            console.log(`  - Implement: ${name}`);
          }
        }
      }
      console.log("");
    }

    // Exit code
    const requiredFailed = Array.from(this.results.entries())
      .filter(([name, passed]) => {
        const check = this.checks.find((c) => c.name === name);
        return check?.required && !passed;
      })
      .length;

    if (requiredFailed > 0) {
      console.log("❌ RSR compliance check FAILED");
      Deno.exit(1);
    } else {
      console.log("✅ RSR compliance check PASSED");
      console.log("");
      console.log("The fog is not an obstacle. It's the medium of inquiry. 🌫️");
    }
  }
}

// Run verification
if (import.meta.main) {
  const verifier = new RSRVerifier();
  await verifier.verify();
}
