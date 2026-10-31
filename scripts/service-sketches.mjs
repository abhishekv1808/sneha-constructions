// Prepares the building cut-outs for the home page's service cards.
//
//   pnpm service-sketches
//
// For every transparent PNG in src/assets/services/cutouts (except *-sketch.png):
//   1. trims the empty transparent margin and fits it to MAX_WIDTH, in place,
//      so every building sits on the bottom edge of its card;
//   2. writes <name>-sketch.png beside it: the same building as a blueprint
//      line drawing on pale paper, which the card shows before it "builds".
//
// Run it again whenever a cut-out is replaced. The sketch is derived from the
// photo, so the two always line up pixel for pixel.

import fs from 'node:fs/promises'
import path from 'node:path'

import sharp from 'sharp'

const DIR = path.join(process.cwd(), 'src/assets/services/cutouts')
const MAX_WIDTH = 1400

const INK = [42, 74, 122] // blueprint line colour
const PAPER = [246, 249, 253] // fill inside the building's silhouette
const EDGE_FLOOR = 26 // gradient strength below this is texture, not a line
const EDGE_GAIN = 3.2

async function prepare(file) {
  const src = path.join(DIR, file)

  // 1 — trim and fit, written back over the source.
  const fitted = await sharp(src)
    .ensureAlpha()
    .trim({ threshold: 1 })
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: false })
    .toBuffer()
  await fs.writeFile(src, fitted)

  // 2 — Sobel edges over the greyscale photo, kept only inside the silhouette.
  const { width: w, height: h } = await sharp(fitted).metadata()
  const alpha = await sharp(fitted).extractChannel(3).raw().toBuffer()
  const grey = await sharp(fitted)
    .flatten({ background: '#ffffff' })
    .greyscale()
    .blur(0.6)
    .raw()
    .toBuffer()

  const at = (x, y) =>
    grey[Math.min(h - 1, Math.max(0, y)) * w + Math.min(w - 1, Math.max(0, x))]
  const out = Buffer.alloc(w * h * 4)

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const gx =
        -at(x - 1, y - 1) - 2 * at(x - 1, y) - at(x - 1, y + 1) +
        at(x + 1, y - 1) + 2 * at(x + 1, y) + at(x + 1, y + 1)
      const gy =
        -at(x - 1, y - 1) - 2 * at(x, y - 1) - at(x + 1, y - 1) +
        at(x - 1, y + 1) + 2 * at(x, y + 1) + at(x + 1, y + 1)
      const line = Math.min(1, (Math.max(0, Math.hypot(gx, gy) / 4 - EDGE_FLOOR) * EDGE_GAIN) / 255)

      const p = (y * w + x) * 4
      for (let c = 0; c < 3; c++) out[p + c] = Math.round(PAPER[c] + (INK[c] - PAPER[c]) * line)
      out[p + 3] = alpha[y * w + x]
    }
  }

  const name = file.replace(/\.png$/i, '-sketch.png')
  await sharp(out, { raw: { width: w, height: h, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(path.join(DIR, name))

  console.log(`✓ ${file} (${w}×${h}) → ${name}`)
}

const files = (await fs.readdir(DIR)).filter(
  (file) => /\.png$/i.test(file) && !/-sketch\.png$/i.test(file),
)
if (files.length === 0) console.log(`No cut-outs found in ${DIR}`)
for (const file of files) await prepare(file)
