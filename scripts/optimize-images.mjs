// Generates responsive WebP variants for images used in the portfolio.
// Idempotent: skips files that already have all their target sizes.
// Run: node scripts/optimize-images.mjs [--delete-originals]
import { readdir, stat, unlink } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, parse } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const PUBLIC = join(ROOT, "public", "images");

// Per-folder responsive widths. Chosen to cover the actual on-screen sizes:
//   brand logos render at ~56-64px; profile portrait at 144px; galleries up to
//   full-viewport in the lightbox. 2x DPR is included.
const TARGETS = [
  { dir: "brand", widths: [128, 256], quality: 82 },
  { dir: "profile", widths: [288, 576], quality: 82 },
  { dir: "human/photography", widths: [400, 800, 1600], quality: 78 },
  { dir: "farm", widths: [400, 800, 1600], quality: 76 },
];

const IMG_RE = /\.(jpe?g|png)$/i;

async function listImages(dir) {
  const abs = join(PUBLIC, dir);
  if (!existsSync(abs)) return [];
  const entries = await readdir(abs);
  const files = [];
  for (const name of entries) {
    const full = join(abs, name);
    const s = await stat(full);
    if (s.isFile() && IMG_RE.test(name)) files.push({ full, name });
  }
  return files;
}

function outPath(full, width) {
  const { dir, name } = parse(full);
  return join(dir, `${name}-w${width}.webp`);
}

async function processFile({ full, name }, widths, quality) {
  const meta = await sharp(full).metadata();
  const src = meta.width || 0;
  const outputs = [];
  for (const w of widths) {
    const out = outPath(full, w);
    if (existsSync(out)) {
      outputs.push({ out, skipped: true });
      continue;
    }
    // Never upscale — cap at source width.
    const target = Math.min(w, src);
    await sharp(full)
      .rotate() // respect EXIF orientation
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality, effort: 5 })
      .toFile(out);
    outputs.push({ out, skipped: false });
  }
  return outputs;
}

async function main() {
  const deleteOriginals = process.argv.includes("--delete-originals");
  let total = 0;
  let made = 0;
  for (const { dir, widths, quality } of TARGETS) {
    const files = await listImages(dir);
    for (const f of files) {
      const outs = await processFile(f, widths, quality);
      const newOnes = outs.filter((o) => !o.skipped).length;
      total += outs.length;
      made += newOnes;
      const tag = newOnes ? `+${newOnes}` : "ok";
      console.log(`[${tag}] ${dir}/${f.name}`);
      if (deleteOriginals && newOnes >= 0) {
        // Only delete after all target sizes exist
        const allExist = outs.every((o) => existsSync(o.out));
        if (allExist) {
          await unlink(f.full);
        }
      }
    }
  }
  console.log(`\nDone. ${made} new, ${total - made} skipped.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
