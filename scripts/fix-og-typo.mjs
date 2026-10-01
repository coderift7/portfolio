import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'public/images/og-image.png');
const destination = path.join(root, 'public/images/og-image-20261001.png');
const expectedSourceHash = '2282476fbfde6bc4c16c1eab7dc68d8e6ea5a89a6f891652565eb23042037dc9';
const region = { left: 357, top: 329, width: 59, height: 21 };
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');

async function main() {
  const sourceBytes = await readFile(source);
  assert.equal(hash(sourceBytes), expectedSourceHash, 'Unexpected original: stop rather than edit a different image.');
  const { data: original, info } = await sharp(sourceBytes).raw().toBuffer({ resolveWithObject: true });
  assert.equal(info.width, 1200);
  assert.equal(info.height, 630);
  assert.equal(info.channels, 3);
  const corrected = Buffer.from(original);
  const offset = (x, y) => (y * info.width + x) * info.channels;

  // Preserve the original I and h. Replace r with an exact copy of the existing n,
  // then move the original e/n eight pixels right to accommodate the wider glyph.
  // No font rendering, resampling, colour conversion, or portrait editing occurs.
  for (let y = region.top; y < region.top + region.height; y++) {
    for (let x = region.left; x < region.left + region.width; x++) {
      corrected.set([11, 17, 32], offset(x, y));
    }
    original.copy(corrected, offset(358, y), offset(390, y), offset(406, y));
    original.copy(corrected, offset(378, y), offset(370, y), offset(406, y));
  }

  // Decode the actual output again, so the comparison also covers PNG encoding.
  await sharp(corrected, { raw: info }).png().toFile(destination);
  const { data: decoded, info: outputInfo } = await sharp(destination).raw().toBuffer({ resolveWithObject: true });
  assert.equal(outputInfo.width, 1200);
  assert.equal(outputInfo.height, 630);
  assert.equal(outputInfo.channels, 3);
  assert.deepEqual(decoded, corrected);
  let changedPixels = 0;
  let changedOutsideRegion = 0;
  const bounds = { left: 1200, top: 630, right: -1, bottom: -1 };
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      const i = offset(x, y);
      if (original[i] === decoded[i] && original[i + 1] === decoded[i + 1] && original[i + 2] === decoded[i + 2]) continue;
      changedPixels++;
      bounds.left = Math.min(bounds.left, x);
      bounds.top = Math.min(bounds.top, y);
      bounds.right = Math.max(bounds.right, x);
      bounds.bottom = Math.max(bounds.bottom, y);
      if (x < region.left || x >= region.left + region.width || y < region.top || y >= region.top + region.height) changedOutsideRegion++;
    }
  }
  assert.ok(changedPixels > 0, 'The correction must change pixels.');
  assert.equal(changedOutsideRegion, 0, 'Pixels outside the authorised text region changed.');
  assert.equal(hash(await readFile(source)), expectedSourceHash, 'The original must remain unchanged.');
  console.log(JSON.stringify({
    source, destination, sourceSha256: expectedSourceHash,
    outputSha256: hash(await readFile(destination)),
    dimensions: [outputInfo.width, outputInfo.height],
    authorisedRegion: region, actualChangedBoundsInclusive: bounds,
    changedPixels, changedOutsideRegion,
    method: 'Exact original glyph copies: n (390..405) -> 358..373; en (370..405) -> 378..413; y 329..349. Original Ih and all remaining pixels preserved.'
  }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
