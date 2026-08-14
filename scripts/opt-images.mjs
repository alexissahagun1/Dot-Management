import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/images");
const files = (await readdir(dir)).filter((f) => f.endsWith(".jpg"));

for (const file of files) {
  const src = path.join(dir, file);
  const img = sharp(src).rotate().resize({
    width: 1920,
    height: 1920,
    fit: "inside",
    withoutEnlargement: true,
  });
  const { data, info } = await img
    .clone()
    .jpeg({ quality: 68, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toBuffer({ resolveWithObject: true });
  await writeFile(src, data);
  const kb = (data.length / 1024).toFixed(0);
  console.log(`${file} → ${info.width}×${info.height} ${kb}KB`);
}
