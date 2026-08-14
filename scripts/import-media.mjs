import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import sharp from "sharp";

const SRC = "/Users/sw/Downloads/wetransfer_fotos-videos_2026-08-12_1957";
const IMG_OUT = path.resolve("public/images");
const VID_OUT = path.resolve("public/video");

const photos = [
  ["14-SKUSA-SUPERNATS-13069.jpeg", "kart-finish"],
  ["14-SKUSA-SUPERNATS-14752.jpeg", "kart-podium"],
  ["DSC04061.jpeg", "tecnica"],
  ["IMG_1195.jpeg", "renault-aerial"],
  ["IMG_1415.jpeg", "gt3"],
  ["IMG_2713.jpeg", "podium-perez"],
  ["IMG_2797.jpeg", "cortes"],
  ["IMG_3239.jpeg", "portrait-pit"],
  ["IMG_3703.jpeg", "efo-trophy"],
  ["IMG_4197.jpeg", "delatorre-paddock"],
  ["IMG_4721.jpeg", "halo"],
  ["IMG_5012.jpeg", "renault-pan"],
  ["IMG_5242.jpeg", "squadra-win"],
  ["IMG_5395.jpeg", "parc-ferme"],
  ["IMG_5446.jpeg", "grid-walk"],
  ["IMG_5468.jpeg", "misano-podium"],
  ["IMG_5997.jpeg", "efo-one"],
  ["IMG_6100.jpeg", "f4-wheel"],
  ["IMG_6608.jpeg", "paddock-walk"],
  ["IMG_7351.jpeg", "monza-hug"],
  ["IMG_7354.jpeg", "monza-podium"],
  ["IMG_7431.jpeg", "f4-chase"],
  ["IMG_9140.jpeg", "telmex-win"],
  ["IMG_9322.jpeg", "golden-hour"],
  ["IMG_9440.jpeg", "curb-jump"],
  ["IMG_9514.jpeg", "pit-bottle"],
  ["MON_GP_DL-2288.jpeg", "monaco"],
  ["Raul Guzman, DR Formula, Barcelona2019-2987.jpeg", "paddock"],
];

const videos = [
  [
    "joined_video_061f1cbf7f3b4d0591f126166821394a.mp4",
    "track.mp4",
    "scale=1920:-2",
  ],
  ["RPReplay_Final1607620349.mov", "replay.mp4", "scale=1920:-2"],
  ["RPReplay_Final1615076431.mov", "onboard.mp4", "scale=-2:1920"],
];

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit" });
    child.on("exit", (code) =>
      code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} → ${code}`)),
    );
  });
}

await mkdir(IMG_OUT, { recursive: true });
await mkdir(VID_OUT, { recursive: true });

const keep = new Set(["kart-finish.jpg", ...photos.map(([, n]) => `${n}.jpg`)]);
for (const file of await readdir(IMG_OUT)) {
  if (file.endsWith(".jpg") && !keep.has(file)) {
    await rm(path.join(IMG_OUT, file));
  }
}

for (const [srcName, destName] of photos) {
  const src = path.join(SRC, srcName);
  const dest = path.join(IMG_OUT, `${destName}.jpg`);
  const { data, info } = await sharp(src)
    .rotate()
    .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true, chromaSubsampling: "4:2:0" })
    .toBuffer({ resolveWithObject: true });
  await writeFile(dest, data);
  console.log(`img ${destName}.jpg  ${info.width}×${info.height}  ${(data.length / 1024).toFixed(0)}KB`);
}

for (const [srcName, destName, scale] of videos) {
  const dest = path.join(VID_OUT, destName);
  await run("ffmpeg", [
    "-y",
    "-i",
    path.join(SRC, srcName),
    "-an",
    "-vf",
    scale,
    "-c:v",
    "libx264",
    "-pix_fmt",
    "yuv420p",
    "-profile:v",
    "high",
    "-crf",
    "26",
    "-movflags",
    "+faststart",
    dest,
  ]);
  const poster = path.join(IMG_OUT, `${destName.replace(".mp4", "-poster")}.jpg`);
  await run("ffmpeg", [
    "-y",
    "-ss",
    "1",
    "-i",
    dest,
    "-frames:v",
    "1",
    "-q:v",
    "4",
    poster,
  ]);
  console.log(`vid ${destName}`);
}
