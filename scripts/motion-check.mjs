import { chromium } from "playwright";

const origin = process.env.ORIGIN ?? "http://localhost:3000";
const fail = [];
const pass = [];

function check(name, ok, detail = "") {
  const line = detail ? `${name}: ${detail}` : name;
  (ok ? pass : fail).push(line);
  console.log(ok ? "  +" : "  -", line);
}

function rgb(c) {
  return c.replace(/\s/g, "");
}

async function anims(el) {
  return el.evaluate((node) =>
    node.getAnimations().map((a) => {
      const t = a.effect?.getComputedTiming?.() ?? {};
      return {
        name: a.animationName ?? a.transitionProperty ?? a.constructor.name,
        playState: a.playState,
        current: a.currentTime,
        duration: t.duration,
        property: a.transitionProperty ?? null,
      };
    }),
  );
}

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
  hasTouch: false,
});
const page = await context.newPage();

await page.emulateMedia({ reducedMotion: "no-preference" });

await page.goto(origin + "/", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".a-home h1");

const hoverOk = await page.evaluate(
  () => matchMedia("(hover: hover) and (pointer: fine)").matches,
);
check("hover-media", hoverOk, hoverOk ? "fine pointer" : "NO hover:hover");

const homeAnims = await page.evaluate(() => {
  const nodes = [...document.querySelectorAll(".a-home main > *")];
  return nodes.map((n) => ({
    tag: n.className || n.tagName,
    names: n.getAnimations().map((a) => a.animationName),
    playing: n.getAnimations().some((a) => a.playState === "running"),
    opacity: getComputedStyle(n).opacity,
  }));
});
check(
  "home-rise-scheduled",
  homeAnims.every((n) => n.names.includes("rise")),
  JSON.stringify(homeAnims.map((n) => n.names)),
);

const cta = page.locator(".a-home .cta");
const ctaRest = await cta.evaluate((el) => ({
  color: getComputedStyle(el).color,
  transform: getComputedStyle(el).transform,
  anim: el.getAnimations().map((a) => a.animationName),
}));
await cta.hover();
await page.waitForTimeout(200);
const ctaHover = await cta.evaluate((el) => getComputedStyle(el).color);
check(
  "cta-hover-color",
  rgb(ctaHover) === "rgb(240,0,0)",
  `${ctaRest.color} -> ${ctaHover}`,
);

await page.mouse.down();
await page.waitForTimeout(50);
const ctaActive = await cta.evaluate((el) => getComputedStyle(el).transform);
await page.mouse.move(10, 10);
await page.mouse.up();
check(
  "cta-active-scale",
  ctaActive.includes("0.97") || /matrix\([^)]*0\.97/.test(ctaActive),
  ctaActive,
);

await page.hover(".brand");
await page.waitForTimeout(200);
const brandOp = await page.locator(".brand").evaluate((el) => getComputedStyle(el).opacity);
check("brand-hover-opacity", Number(brandOp) < 0.7, brandOp);

await page.hover("button.ham");
await page.waitForTimeout(200);
const hamOp = await page.locator("button.ham").evaluate((el) => getComputedStyle(el).opacity);
check("ham-hover-opacity", Number(hamOp) < 0.7, hamOp);
await page.mouse.down();
await page.waitForTimeout(50);
const hamActive = await page.locator("button.ham").evaluate((el) => getComputedStyle(el).transform);
await page.mouse.move(10, 10);
await page.mouse.up();
check(
  "ham-active-scale",
  hamActive.includes("0.97") || /matrix\([^)]*0\.97/.test(hamActive),
  hamActive,
);

const t0 = Date.now();
await page.locator("button.ham").click();
await page.waitForSelector(".a-overlay");
const overlayMid = await page.locator(".menu-layer").evaluate((el) => ({
  opacity: getComputedStyle(el).opacity,
  names: el.getAnimations().map((a) => a.animationName),
  running: el.getAnimations().some((a) => a.playState === "running"),
  elapsed: null,
}));
overlayMid.elapsed = Date.now() - t0;
check(
  "overlay-in-runs",
  overlayMid.names.includes("overlay-in"),
  JSON.stringify(overlayMid),
);

const hamOpen = await page.locator("button.ham").evaluate((el) => {
  const spans = [...el.querySelectorAll("span")].map((s) => getComputedStyle(s).transform);
  return { cls: el.className, spans };
});
check(
  "ham-morph-x",
  hamOpen.cls.includes("is-open") &&
    hamOpen.spans[0] !== "none" &&
    hamOpen.spans[2] !== "none",
  JSON.stringify(hamOpen),
);

const navLink = page.locator(".a-nav .links a").nth(1);
const navRest = await navLink.evaluate((el) => getComputedStyle(el).color);
await navLink.hover();
await page.waitForTimeout(200);
const navHover = await navLink.evaluate((el) => getComputedStyle(el).color);
check(
  "nav-hover-color",
  rgb(navHover) === "rgb(240,0,0)",
  `${navRest} -> ${navHover}`,
);

const overlayStillThere = await page.locator(".a-overlay").count();
await page.locator("button.ham").click();
await page.waitForTimeout(50);
const overlayDuringClose = await page.locator(".a-overlay").count();
await page.waitForTimeout(250);
const overlayAfterClose = await page.locator(".a-overlay").count();
check(
  "overlay-exit-plays",
  overlayDuringClose === 1 && overlayAfterClose === 0,
  `during=${overlayDuringClose} after=${overlayAfterClose} (open-was=${overlayStillThere})`,
);

await page.goto(origin + "/services", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".a-pit h2");
const title = page.locator(".a-pit details:nth-of-type(2) h2");
const titleRest = await title.evaluate((el) => getComputedStyle(el).color);
await page.locator(".a-pit details:nth-of-type(2) summary").hover();
await page.waitForTimeout(200);
const titleHover = await title.evaluate((el) => getComputedStyle(el).color);
const titleTrans = await title.evaluate((el) => getComputedStyle(el).transitionProperty);
check(
  "services-hover-color",
  rgb(titleHover) === "rgb(240,0,0)",
  `${titleRest} -> ${titleHover}`,
);
check(
  "services-hover-transitions",
  titleTrans.includes("color"),
  titleTrans,
);

await page.goto(origin + "/contact", { waitUntil: "domcontentloaded" });
await page.waitForSelector('.a-contact input[name="name"]');
const input = page.locator('.a-contact input[name="name"]');
const borderRest = await input.evaluate((el) => getComputedStyle(el).borderBottomColor);
await input.focus();
await page.waitForTimeout(200);
const borderFocus = await input.evaluate((el) => getComputedStyle(el).borderBottomColor);
check(
  "input-focus-border",
  rgb(borderFocus) === "rgb(240,0,0)",
  `${borderRest} -> ${borderFocus}`,
);

const labelColor = await page.evaluate(() => {
  const label = document.querySelector('.a-contact label:not(.hp)');
  return getComputedStyle(label.querySelector("span")).color;
});
check(
  "label-focus-ink",
  rgb(labelColor) === "rgb(237,234,227)",
  labelColor,
);

const go = page.locator(".a-contact .go");
await go.hover();
await page.waitForTimeout(200);
const goHover = await go.evaluate((el) => getComputedStyle(el).color);
check("go-hover-color", rgb(goHover) === "rgb(240,0,0)", goHover);
await page.mouse.down();
await page.waitForTimeout(50);
const goActive = await go.evaluate((el) => getComputedStyle(el).transform);
await page.mouse.move(10, 10);
await page.mouse.up();
check(
  "go-active-scale",
  goActive.includes("0.97") || /matrix\([^)]*0\.97/.test(goActive),
  goActive,
);

await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(origin + "/", { waitUntil: "domcontentloaded" });
await page.waitForSelector(".a-home h1");
const reduced = await page.evaluate(() => {
  const h1 = document.querySelector(".a-home h1");
  return {
    names: h1.getAnimations().map((a) => a.animationName),
    opacity: getComputedStyle(h1).opacity,
  };
});
check(
  "reduced-kills-rise",
  reduced.opacity === "1" && !reduced.names.includes("rise"),
  JSON.stringify(reduced),
);

await browser.close();

console.log("PASS", pass.length);
for (const p of pass) console.log("  +", p);
console.log("FAIL", fail.length);
for (const f of fail) console.log("  -", f);
if (fail.length) process.exit(1);
