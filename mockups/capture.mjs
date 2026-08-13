import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const outDir = path.resolve(__dirname);
const pages = ["home", "overlay", "about", "services", "contact"];
const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];
const origin = process.env.MOCKUP_ORIGIN || "http://127.0.0.1:8766";

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ deviceScaleFactor: 2 });
  const page = await context.newPage();

  for (const name of pages) {
    const url = `${origin}/${name}.html`;
    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });
      await page.goto(url, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(400);
      const dest = path.join(outDir, `mockup-${name}-${vp.name}.png`);
      await page.screenshot({ path: dest, fullPage: false });
      console.log("wrote", dest, fs.statSync(dest).size);
    }
  }

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
