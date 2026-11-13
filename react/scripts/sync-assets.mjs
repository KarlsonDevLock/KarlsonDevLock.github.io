// Copies the original website assets into public/assets so the Vite app ships
// them unchanged. The copies are gitignored; the source of truth stays /assets.
import { cp, mkdir, rm, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const appRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.resolve(appRoot, "..", "assets");
const destination = path.join(appRoot, "public", "assets");

try {
  await access(source);
} catch {
  console.error(`[sync-assets] Source folder not found: ${source}`);
  process.exit(1);
}

await mkdir(path.dirname(destination), { recursive: true });
await rm(destination, { recursive: true, force: true });
await cp(source, destination, { recursive: true });

console.log(`[sync-assets] Copied ${source} -> ${destination}`);
