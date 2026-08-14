import assert from "node:assert/strict";

const origin = (process.env.ORIGIN ?? "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);
const expectIndex = process.env.EXPECT_INDEX === "true";
const canonical = "https://dotsportsmanagement.com";

const pages = {
  "/": {
    title: "Motorsport Driver Management | DOT Management",
    description:
      "DOT Management provides international motorsport driver management, coaching and career development from karting through professional racing.",
  },
  "/about": {
    title: "About DOT Management & Raul Guzman",
    description:
      "Learn about DOT Management and founder Raul Guzman, combining professional racing experience with strategic driver development and career support.",
  },
  "/services": {
    title: "Driver Management Services | DOT Management",
    description:
      "Explore DOT Management services: driver management, coaching, performance partners, brand and commercial guidance, and on-track support.",
  },
  "/contact": {
    title: "Contact DOT Management | Driver Representation",
    description:
      "Contact DOT Management to discuss driver representation, coaching, career development, commercial guidance or on-track motorsport support.",
  },
};

const serviceNames = [
  "Driver Management",
  "Driver Coaching",
  "Performance Partners",
  "Brand and Commercial",
  "On Track Support",
];

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function attributes(tag) {
  return Object.fromEntries(
    [...tag.matchAll(/([:\w-]+)=["']([^"']*)["']/g)].map(
      ([, name, value]) => [name, decodeHtml(value)],
    ),
  );
}

function findTags(html, tagName) {
  return html.match(new RegExp(`<${tagName}\\b[^>]*>`, "gi")) ?? [];
}

function metaContent(html, attribute, value) {
  const matches = findTags(html, "meta")
    .map(attributes)
    .filter((attrs) => attrs[attribute] === value)
    .map((attrs) => attrs.content);
  assert.equal(matches.length, 1, `Expected one ${attribute}=${value} meta tag`);
  return matches[0];
}

function canonicalHref(html) {
  const matches = findTags(html, "link")
    .map(attributes)
    .filter((attrs) => attrs.rel === "canonical")
    .map((attrs) => attrs.href);
  assert.equal(matches.length, 1, "Expected exactly one canonical link");
  return matches[0];
}

function titleText(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  assert.ok(match, "Expected a title element");
  return decodeHtml(match[1]);
}

function robotsTokens(html) {
  return new Set(
    metaContent(html, "name", "robots")
      .toLowerCase()
      .split(",")
      .map((token) => token.trim()),
  );
}

async function get(path, contentType) {
  const response = await fetch(`${origin}${path}`, { redirect: "follow" });
  assert.equal(response.status, 200, `${path} should return HTTP 200`);
  assert.match(
    response.headers.get("content-type") ?? "",
    contentType,
    `${path} should return the expected Content-Type`,
  );
  return response.text();
}

function referenceId(value) {
  assert.equal(typeof value, "object");
  assert.ok(value);
  assert.equal(typeof value["@id"], "string");
  return value["@id"];
}

function assertJsonLd(homeHtml, routeHtml) {
  const scripts = [
    ...homeHtml.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  assert.equal(scripts.length, 1, "Homepage should emit one JSON-LD script");

  const data = JSON.parse(scripts[0][1]);
  assert.equal(data["@context"], "https://schema.org");
  assert.ok(Array.isArray(data["@graph"]), "JSON-LD should contain @graph");

  const graph = data["@graph"];
  const nodes = new Map(graph.map((node) => [node["@id"], node]));
  assert.equal(nodes.size, graph.length, "Every JSON-LD @id should be unique");

  const ids = {
    organization: `${canonical}/#organization`,
    website: `${canonical}/#website`,
    person: `${canonical}/#raul-guzman`,
    contact: `${canonical}/#contact`,
    webpage: `${canonical}/#webpage`,
    services: `${canonical}/#services`,
  };
  const organization = nodes.get(ids.organization);
  const website = nodes.get(ids.website);
  const person = nodes.get(ids.person);
  const contact = nodes.get(ids.contact);
  const webpage = nodes.get(ids.webpage);
  const serviceList = nodes.get(ids.services);

  assert.equal(organization?.["@type"], "Organization");
  assert.equal(website?.["@type"], "WebSite");
  assert.equal(person?.["@type"], "Person");
  assert.equal(contact?.["@type"], "ContactPoint");
  assert.equal(webpage?.["@type"], "WebPage");
  assert.equal(serviceList?.["@type"], "ItemList");

  assert.equal(referenceId(organization.founder), ids.person);
  assert.equal(referenceId(organization.contactPoint), ids.contact);
  assert.equal(referenceId(person.worksFor), ids.organization);
  assert.equal(referenceId(website.publisher), ids.organization);
  assert.equal(referenceId(webpage.isPartOf), ids.website);
  assert.equal(referenceId(webpage.about), ids.organization);
  assert.deepEqual(
    webpage.mainEntity.map(referenceId),
    [ids.organization, ids.person, ids.services, ids.contact],
  );

  assert.equal(serviceList.numberOfItems, 5);
  assert.equal(serviceList.itemListElement.length, 5);
  for (const [index, item] of serviceList.itemListElement.entries()) {
    assert.equal(item["@type"], "ListItem");
    assert.equal(item.position, index + 1);
    const service = nodes.get(referenceId(item.item));
    assert.equal(service?.["@type"], "Service");
    assert.equal(service?.name, serviceNames[index]);
    assert.equal(referenceId(service.provider), ids.organization);
  }

  for (const [path, html] of Object.entries(routeHtml)) {
    assert.doesNotMatch(
      html,
      /type=["']application\/ld\+json["']/i,
      `${path} should not emit a competing JSON-LD graph`,
    );
  }
}

function assertRobotsFile(text) {
  if (!expectIndex) {
    assert.match(text, /User-Agent:\s*\*\s*\nDisallow:\s*\//i);
    return;
  }

  const expected = [
    ["*", "Allow", "/"],
    ["OAI-SearchBot", "Allow", "/"],
    ["PerplexityBot", "Allow", "/"],
    ["Claude-SearchBot", "Allow", "/"],
    ["Claude-User", "Allow", "/"],
    ["GPTBot", "Disallow", "/"],
    ["ClaudeBot", "Disallow", "/"],
  ];
  const groups = text
    .split(/\n\s*\n/)
    .map((group) => group.trim())
    .filter((group) => /^User-Agent:/i.test(group));
  assert.equal(groups.length, expected.length, "Unexpected robots rule count");
  for (const [index, [agent, directive, path]] of expected.entries()) {
    assert.equal(
      groups[index],
      `User-Agent: ${agent}\n${directive}: ${path}`,
      `Unexpected robots policy for ${agent}`,
    );
  }
  assert.match(
    text,
    /Sitemap:\s*https:\/\/dotsportsmanagement\.com\/sitemap\.xml/i,
  );
  assert.doesNotMatch(text, /^Host:/im);
}

async function assertCanonicalHostRedirects() {
  const insecure = await fetch("http://dotsportsmanagement.com/", {
    redirect: "manual",
  });
  assert.equal(insecure.status, 308, "HTTP should redirect permanently to HTTPS");
  const insecureLocation = new URL(insecure.headers.get("location"));
  assert.equal(insecureLocation.protocol, "https:");
  assert.equal(insecureLocation.hostname, "dotsportsmanagement.com");

  const www = await fetch(
    "https://www.dotsportsmanagement.com/services?source=seo-check",
    { redirect: "manual" },
  );
  assert.equal(www.status, 308, "www should redirect permanently to the apex host");
  assert.equal(
    www.headers.get("location"),
    "https://dotsportsmanagement.com/services?source=seo-check",
    "www redirect should preserve path and query",
  );
}

const htmlEntries = await Promise.all(
  Object.keys(pages).map(async (path) => [path, await get(path, /text\/html/i)]),
);
const htmlByPath = Object.fromEntries(htmlEntries);

for (const [path, expected] of Object.entries(pages)) {
  const html = htmlByPath[path];
  assert.equal(titleText(html), expected.title, `${path} title mismatch`);
  assert.equal(
    metaContent(html, "name", "description"),
    expected.description,
    `${path} description mismatch`,
  );
  assert.equal(canonicalHref(html), canonical, `${path} canonical mismatch`);
  assert.equal(metaContent(html, "property", "og:url"), canonical);
  assert.equal(metaContent(html, "property", "og:title"), expected.title);
  assert.equal(
    metaContent(html, "property", "og:description"),
    expected.description,
  );
  assert.equal(metaContent(html, "name", "twitter:card"), "summary_large_image");
  assert.equal(metaContent(html, "name", "twitter:title"), expected.title);
  assert.equal(
    metaContent(html, "name", "twitter:description"),
    expected.description,
  );
  assert.match(html, /<html\b[^>]*\blang=["']en["']/i);
  assert.equal(
    (html.match(/<h1(?:\s|>)/gi) ?? []).length,
    1,
    `${path} should contain exactly one H1`,
  );
  const robots = robotsTokens(html);
  assert.ok(robots.has(expectIndex ? "index" : "noindex"));
  assert.ok(robots.has(expectIndex ? "follow" : "nofollow"));
}

assertJsonLd(htmlByPath["/"], {
  "/about": htmlByPath["/about"],
  "/services": htmlByPath["/services"],
  "/contact": htmlByPath["/contact"],
});

const [robots, sitemap, llms, llmsFull] = await Promise.all([
  get("/robots.txt", /text\/plain/i),
  get("/sitemap.xml", /(?:application|text)\/xml/i),
  get("/llms.txt", /text\/plain/i),
  get("/llms-full.txt", /text\/plain/i),
]);

assertRobotsFile(robots);
const sitemapLocations = [
  ...sitemap.matchAll(/<loc>([\s\S]*?)<\/loc>/gi),
].map((match) => decodeHtml(match[1]));
assert.deepEqual(sitemapLocations, [canonical]);

for (const [name, text] of [
  ["llms.txt", llms],
  ["llms-full.txt", llmsFull],
]) {
  assert.match(text, /https:\/\/dotsportsmanagement\.com\//);
  assert.match(text, /info@dotsportsmanagement\.com/);
  assert.doesNotMatch(text, /\bleading\b/i, `${name} should omit leading`);
  for (const serviceName of serviceNames) {
    assert.ok(text.includes(serviceName), `${name} should list ${serviceName}`);
  }
}

if (origin === canonical) {
  await assertCanonicalHostRedirects();
}

console.log(`SEO checks passed for ${origin} (index=${expectIndex}).`);
