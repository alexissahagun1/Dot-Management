import type { Metadata, Viewport } from "next";
import {
  Big_Shoulders,
  Schibsted_Grotesk,
  Source_Serif_4,
} from "next/font/google";
import { Chrome } from "@/components/chrome";
import { RouteFade } from "@/components/route-fade";
import { SectionProvider } from "@/components/section-context";
import { site } from "@/lib/content";
import "./globals.css";

const display = Big_Shoulders({
  weight: "800",
  subsets: ["latin"],
  variable: "--font-display",
  adjustFontFallback: false,
});

const sans = Schibsted_Grotesk({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-sans",
});

const serif = Source_Serif_4({
  weight: "400",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-serif",
});

const metadataBase = new URL(
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://dotsportsmanagement.com",
);

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: site.name,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    locale: "en",
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0B0A",
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${serif.variable}`}
    >
      <body>
        <SectionProvider>
          <a className="skip" href="#content">
            Skip to content
          </a>
          <Chrome />
          <div id="page">
            <RouteFade>{children}</RouteFade>
          </div>
        </SectionProvider>
      </body>
    </html>
  );
}
