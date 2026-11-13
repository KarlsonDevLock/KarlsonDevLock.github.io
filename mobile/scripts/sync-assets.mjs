// Copies the original website assets into assets/portfolio for Metro to bundle.
// The copy is gitignored; the source of truth stays in the repo root /assets.
import { cp, mkdir, rm, access, rename } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(appRoot, "..", "assets");
const destination = path.join(appRoot, "assets", "portfolio");

try {
  await access(source);
} catch {
  console.error(`[sync-assets] Source folder not found: ${source}`);
  process.exit(1);
}

await mkdir(path.dirname(destination), { recursive: true });
await rm(destination, { recursive: true, force: true });
await cp(source, destination, { recursive: true });

// Metro is case-sensitive about file extensions: .PNG is not in assetExts.
const legacyPng = path.join(destination, "NewImage", "HytaleCompanionTransparentSmalllogo.PNG");
const lowerPng = path.join(destination, "NewImage", "HytaleCompanionTransparentSmalllogo.png");
try {
  await access(legacyPng);
  // Windows is case-insensitive, so go through a temporary name to change case.
  const temporary = `${legacyPng}.tmp`;
  await rename(legacyPng, temporary);
  await rename(temporary, lowerPng);
} catch {
  // Already lower-case (or file removed) — nothing to do.
}

console.log(`[sync-assets] Copied ${source} -> ${destination}`);
