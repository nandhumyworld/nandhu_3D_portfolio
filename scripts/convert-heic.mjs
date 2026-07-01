// One-shot utility: find any file under public/images/ whose extension claims
// JPEG but whose bytes are actually HEIC (iPhone default), and convert in
// place to real JPEG so browsers can render it. Backs the original up as
// <name>.HEIC.bak next to it before overwriting.
//
// Run: node scripts/convert-heic.mjs

import { readFile, writeFile, rename, readdir, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import convert from "heic-convert";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "public", "images");

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else yield p;
  }
}

function isHeic(buf) {
  // ftyp box lives at bytes 4..8; brand at 8..12. HEIC brands: heic, heix,
  // hevc, hevx, mif1, msf1, heim, heis, hevm, hevs.
  if (buf.length < 16) return false;
  const ftyp = buf.slice(4, 8).toString("ascii");
  if (ftyp !== "ftyp") return false;
  const brand = buf.slice(8, 12).toString("ascii");
  return /^(heic|heix|hevc|hevx|mif1|msf1|heim|heis|hevm|hevs)$/.test(brand);
}

let converted = 0;
let skipped = 0;
let failed = 0;

for await (const file of walk(root)) {
  const ext = path.extname(file).toLowerCase();
  if (![".jpg", ".jpeg"].includes(ext)) continue;

  const buf = await readFile(file);
  if (!isHeic(buf)) {
    skipped++;
    continue;
  }

  try {
    const jpg = await convert({ buffer: buf, format: "JPEG", quality: 0.85 });
    const backup = file + ".HEIC.bak";
    if (!existsSync(backup)) await rename(file, backup);
    await writeFile(file, Buffer.from(jpg));
    console.log(`converted: ${path.relative(root, file)}`);
    converted++;
  } catch (e) {
    console.error(`FAILED  : ${path.relative(root, file)} — ${e.message}`);
    failed++;
  }
}

console.log(`\ndone — converted ${converted}, skipped ${skipped}, failed ${failed}`);
