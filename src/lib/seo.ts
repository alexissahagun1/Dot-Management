import "server-only";

import type { Metadata } from "next";
import { services, site } from "@/lib/content";

export const SITE_ORIGIN = "https://dotsportsmanagement.com";
export const CANONICAL_URL = `${SITE_ORIGIN}/`;
export const OPEN_GRAPH_IMAGE_URL = `${SITE_ORIGIN}/opengraph-image.jpg`;

export const isIndexableDeployment =
  process.env.VERCEL_ENV === "production" ||
  (!process.env.VERCEL_ENV && process.env.NODE_ENV === "production");

export const pageSeo = {
  home: {
    title: "Motorsport Driver Management | DOT Management",
    description:
      "DOT Management provides international motorsport driver management, coaching and career development from karting through professional racing.",
  },
  about: {
    title: "About DOT Management & Raul Guzman",
    description:
      "Learn about DOT Management and founder Raul Guzman, combining professional racing experience with strategic driver development and career support.",
  },
  services: {
    title: "Driver Management Services | DOT Management",
    description:
      "Explore DOT Management services: driver management, coaching, performance partners, brand and commercial guidance, and on-track support.",
  },
  contact: {
    title: "Contact DOT Management | Driver Representation",
    description:
      "Contact DOT Management to discuss driver representation, coaching, career development, commercial guidance or on-track motorsport support.",
  },
} as const;

export type SeoPage = keyof typeof pageSeo;

export function buildPageMetadata(page: SeoPage): Metadata {
  const { title, description } = pageSeo[page];

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: CANONICAL_URL },
    openGraph: {
      type: "website",
      locale: "en_GB",
      siteName: site.name,
      url: CANONICAL_URL,
      title,
      description,
      images: [
        {
          url: OPEN_GRAPH_IMAGE_URL,
          alt: `${site.name} — Drivers Of Tomorrow`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OPEN_GRAPH_IMAGE_URL],
    },
  };
}

const schemaIds = {
  organization: `${CANONICAL_URL}#organization`,
  website: `${CANONICAL_URL}#website`,
  person: `${CANONICAL_URL}#raul-guzman`,
  contact: `${CANONICAL_URL}#contact`,
  webpage: `${CANONICAL_URL}#webpage`,
  services: `${CANONICAL_URL}#services`,
} as const;

function reference(id: string) {
  return { "@id": id };
}

function serviceId(title: string) {
  const slug = title.toLowerCase().replaceAll(" ", "-");
  return `${CANONICAL_URL}#service-${slug}`;
}

const serviceNodes = services.map((service) => ({
  "@type": "Service",
  "@id": serviceId(service.title),
  name: service.title,
  description: service.body,
  serviceType: service.title,
  provider: reference(schemaIds.organization),
  areaServed: "Worldwide",
}));

export const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": schemaIds.organization,
      name: site.name,
      alternateName: "DOT",
      url: CANONICAL_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}/logo.png`,
      },
      email: site.email,
      foundingDate: "2020",
      description: pageSeo.home.description,
      founder: reference(schemaIds.person),
      contactPoint: reference(schemaIds.contact),
      sameAs: [site.instagram.href],
      knowsAbout: [
        "Motorsport driver management",
        "Driver coaching",
        "Driver career development",
        "Motorsport performance support",
        "Driver brand and commercial guidance",
        "On-track support",
      ],
    },
    {
      "@type": "WebSite",
      "@id": schemaIds.website,
      url: CANONICAL_URL,
      name: site.name,
      inLanguage: "en",
      publisher: reference(schemaIds.organization),
    },
    {
      "@type": "Person",
      "@id": schemaIds.person,
      name: "Raul Guzman",
      jobTitle: "Founder and Driver Manager",
      description:
        "Professional driver and manager, and founder of DOT Management.",
      worksFor: reference(schemaIds.organization),
    },
    {
      "@type": "ContactPoint",
      "@id": schemaIds.contact,
      email: site.email,
      contactType: "customer inquiries",
      availableLanguage: "English",
      url: `${SITE_ORIGIN}/contact`,
    },
    {
      "@type": "WebPage",
      "@id": schemaIds.webpage,
      url: CANONICAL_URL,
      name: pageSeo.home.title,
      description: pageSeo.home.description,
      inLanguage: "en",
      isPartOf: reference(schemaIds.website),
      about: reference(schemaIds.organization),
      mainEntity: [
        reference(schemaIds.organization),
        reference(schemaIds.person),
        reference(schemaIds.services),
        reference(schemaIds.contact),
      ],
    },
    {
      "@type": "ItemList",
      "@id": schemaIds.services,
      name: "DOT Management services",
      numberOfItems: services.length,
      itemListElement: services.map((service, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: reference(serviceId(service.title)),
      })),
    },
    ...serviceNodes,
  ],
};

const directEntryLinks = [
  `[About](${SITE_ORIGIN}/about)`,
  `[Services](${SITE_ORIGIN}/services)`,
  `[Contact](${SITE_ORIGIN}/contact)`,
].join("\n- ");

const serviceList = services
  .map((service) => `- **${service.title}:** ${service.body}`)
  .join("\n");

export function buildLlmsText() {
  return `# ${site.name}

> International motorsport driver management, coaching and career development from karting through professional racing.

- Canonical website: ${CANONICAL_URL}
- Founder: Raul Guzman
- Official email: ${site.email}
- Official Instagram: ${site.instagram.href}

## Services

${services.map((service) => `- ${service.title}`).join("\n")}

## Official pages

- [Canonical homepage](${CANONICAL_URL})
- ${directEntryLinks}

The canonical homepage is the authoritative online source for ${site.name}. The other official pages are direct-entry views of content also available on the homepage.
`;
}

export function buildLlmsFullText() {
  return `# ${site.name}: Full Company and Services Overview

## Canonical source

- Website: ${CANONICAL_URL}
- Language: English
- Official email: ${site.email}
- Official Instagram: ${site.instagram.href}

${site.name} provides international motorsport driver management, coaching and career development from karting through professional racing. It supports drivers with career planning, performance development, commercial guidance and on-track assistance.

## Founder and experience

Raul Guzman has worked as a professional driver and manager in Europe since 2014. He founded ${site.name} in 2020 alongside his driving duties. His experience spans international karting, the formula ladder, GT cars and prototypes, and he worked with Lamborghini for several years.

DOT works with experienced advisors, including people with Formula 1, Road to F1 championship, major international racing series and sports car racing experience. The company combines motorsport experience with support in career development, legal advisory, networking and driver coaching.

## Services

${serviceList}

## Official direct-entry pages

- [Canonical homepage](${CANONICAL_URL})
- ${directEntryLinks}

## Contact

For driver representation, coaching, career development, commercial guidance or on-track support, email ${site.email}. The canonical homepage is the authoritative online source for ${site.name}.
`;
}
